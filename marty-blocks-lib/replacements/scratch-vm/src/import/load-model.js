const StringUtil = require('../util/string-util');
const log = require('../util/log');

/**
 * Initialize a model from an asset asynchronously.
 * @param {!object} model - the Marty model object.
 * @property {string} md5 - the MD5 and extension of the model to be loaded.
 * @property {Buffer} data - model data will be written here once loaded.
 * @param {!Asset} modelAsset - the asset loaded from storage.
 * @param {!Runtime} runtime - Scratch runtime, used to access the storage module.
 * @returns {!Promise} - a promise which will resolve to the model when ready.
 */
const loadModelFromAsset = function (model, modelAsset, runtime) {
    model.assetId = modelAsset.assetId;
    if (!runtime.audioEngine) {
        log.warn('No audio engine present; cannot load model asset: ', model.md5);
        return Promise.resolve(model);
    }
    return runtime.audioEngine.decodeModelPlayer(Object.assign(
        {},
        model,
        {data: modelAsset.data}
    )).then(modelPlayer => {
        model.modelId = modelPlayer.id;
        // Set the model sample rate and sample count based on the
        // the audio buffer from the audio engine since the model
        // gets resampled by the audio engine
        const modelBuffer = modelPlayer.buffer;
        model.rate = modelBuffer.sampleRate;
        model.sampleCount = modelBuffer.length;

        if (modelBank !== null) {
            modelBank.addModelPlayer(modelPlayer);
        }

        return model;
    });
};

// Handle model loading errors by replacing the runtime model with the
// default model from storage, but keeping track of the original model metadata
// in a `broken` field
const handleModelLoadError = function (model, runtime) {
    // Keep track of the old asset information until we're done loading the default model
    const oldAsset = model.asset; // could be null
    const oldAssetId = model.assetId;
    const oldSample = model.sampleCount;
    const oldRate = model.rate;
    const oldFormat = model.format;
    const oldDataFormat = model.dataFormat;
                
    // Use default asset if original fails to load
    model.assetId = runtime.storage.defaultAssetId.Model;
    model.asset = runtime.storage.get(model.assetId);
    model.md5 = `${model.assetId}.${model.asset.dataFormat}`;

    return loadModelFromAsset(model, model.asset, runtime).then(loadedModel => {
        loadedModel.broken = {};
        loadedModel.broken.assetId = oldAssetId;
        loadedModel.broken.md5 = `${oldAssetId}.${oldDataFormat}`;

        // Should be null if we got here because the model was missing
        loadedModel.broken.asset = oldAsset;
        
        loadedModel.broken.sampleCount = oldSample;
        loadedModel.broken.rate = oldRate;
        loadedModel.broken.format = oldFormat;
        loadedModel.broken.dataFormat = oldDataFormat;
        
        return loadedModel;
    });
};

/**
 * Load a model's asset into memory asynchronously.
 * @param {!object} model - the Scratch model object.
 * @property {string} md5 - the MD5 and extension of the model to be loaded.
 * @property {Buffer} data - model data will be written here once loaded.
 * @param {!Runtime} runtime - Scratch runtime, used to access the storage module.
 * @returns {!Promise} - a promise which will resolve to the model when ready.
 */
const loadModel = function (model, runtime) {
    if (!runtime.storage) {
        log.warn('No storage module present; cannot load model asset: ', model.md5);
        return Promise.resolve(model);
    }
    const idParts = StringUtil.splitFirst(model.md5, '.');
    const md5 = idParts[0];
    const ext = idParts[1].toLowerCase();
    model.dataFormat = ext;

    return (
        (model.asset && Promise.resolve(model.asset)) ||
        runtime.storage.load(runtime.storage.AssetType.Model, md5, ext)
    )
        .then(modelAsset => {
            model.asset = modelAsset;

            if (!modelAsset) {
                log.warn('Failed to find model data: ', model.md5);
                return handleModelLoadError(model, runtime);
            }

            return loadModelFromAsset(model, modelAsset, runtime);
        })
        .catch(e => {
            log.warn(`Failed to load model: ${model.md5} with error: ${e}`);
            return handleModelLoadError(model, runtime);
        });
};

module.exports = {
    loadModel,
    loadModelFromAsset
};
