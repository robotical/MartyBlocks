/**
 * Serialize all the assets of the given type ('sounds' or 'costumes' or 'models')
 * in the provided runtime into an array of file descriptors.
 * A file descriptor is an object containing the name of the file
 * to be written and the contents of the file, the serialized asset.
 * @param {Runtime} runtime The runtime with the assets to be serialized
 * @param {string} assetType The type of assets to be serialized: 'sounds' | 'costumes' | 'models'
 * @param {string=} optTargetId Optional target id to serialize assets for
 * @returns {Array<object>} An array of file descriptors for each asset
 */
const serializeAssets = function (runtime, assetType, optTargetId) {
    const targets = optTargetId
        ? [runtime.getTargetById(optTargetId)]
        : runtime.targets;
    const assetDescs = [];
    for (let i = 0; i < targets.length; i++) {
        const currTarget = targets[i];
        const currAssets = currTarget.sprite[assetType];
        for (let j = 0; j < currAssets.length; j++) {
            const currAsset = currAssets[j];
            const asset = currAsset.broken ? currAsset.broken.asset : currAsset.asset;
            if (asset) {
                // Serialize asset if it exists, otherwise skip
                assetDescs.push({
                    fileName: `${asset.assetId}.${asset.dataFormat}`,
                    fileContent: asset.data,
                });
            }
        }
    }
    return assetDescs;
};

/**
 * Serialize all the sounds in the provided runtime or, if a target id is provided,
 * in the specified target into an array of file descriptors.
 * A file descriptor is an object containing the name of the file
 * to be written and the contents of the file, the serialized sound.
 * @param {Runtime} runtime The runtime with the sounds to be serialized
 * @param {string=} optTargetId Optional targetid for serializing sounds of a single target
 * @returns {Array<object>} An array of file descriptors for each sound
 */
const serializeSounds = function (runtime, optTargetId) {
    return serializeAssets(runtime, "sounds", optTargetId);
};

/**
 * Serialize all the costumes in the provided runtime into an array of file
 * descriptors. A file descriptor is an object containing the name of the file
 * to be written and the contents of the file, the serialized costume.
 * @param {Runtime} runtime The runtime with the costumes to be serialized
 * @param {string} optTargetId Optional targetid for serializing costumes of a single target
 * @returns {Array<object>} An array of file descriptors for each costume
 */
const serializeCostumes = function (runtime, optTargetId) {
    return serializeAssets(runtime, "costumes", optTargetId);
};

/**
 * Serialize all the models in the provided runtime into an array of file
 * descriptors.
 * @param {Runtime} runtime The runtime with the models to be serialized
 * @returns {Array<object>} An array of file descriptors for each model
 */
const serializeModels = function (runtime, optTargetId) {
    // we first need to flatten the weights
    const targets = optTargetId
        ? [runtime.getTargetById(optTargetId)]
        : runtime.targets;
    for (let i = 0; i < targets.length; i++) {
        const currTarget = targets[i];
        const currAssets = currTarget.sprite.models;
        for (let j = 0; j < currAssets.length; j++) {
            const currAsset = currAssets[j];
            const asset = currAsset.broken ? currAsset.broken.asset : currAsset.asset;
            if (asset) {
                // Calculate the total length for the new buffer
                const totalLength = asset.data.reduce((acc, w) => acc + w.length, 0);

                // Create the new buffer
                const concatWeights = new Float32Array(totalLength);

                // Fill the new buffer with data from the old buffers
                let offset = 0;
                for (const w of asset.data) {
                    concatWeights.set(w, offset);
                    offset += w.length;
                }
                asset.data = concatWeights.buffer;
            }
        }
    }
    return serializeAssets(runtime, "models", optTargetId);
};

// // first we need to flatten the weights
// const flattenWeights = model.weights.weightBuffers.map(w => w.buffer);

// // Calculate the total length for the new buffer
// const totalLength = flattenWeights.reduce((acc, w) => acc + w.length, 0);

// // Create the new buffer
// const concatWeights = new Float32Array(totalLength);

// // Fill the new buffer with data from the old buffers
// let offset = 0;
// for (const w of flattenWeights) {
//     concatWeights.set(w, offset);
//     offset += w.length;
// }

module.exports = {
    serializeSounds,
    serializeCostumes,
    serializeModels,
};
