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
                    fileContent: assetType === "models" ? serializeWeights(asset.data) : asset.data,
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
    return serializeAssets(runtime, "models", optTargetId);
};

const serializeWeights = function (weights) {
    // Calculate the total length for the new buffer
    const totalLength = weights.reduce((acc, w) => acc + w.length, 0);

    // Create the new buffer
    const concatWeights = new Float32Array(totalLength);

    // Fill the new buffer with data from the old buffers
    let offset = 0;
    for (const w of weights) {
        concatWeights.set(w, offset);
        offset += w.length;
    }
    return concatWeights.buffer;
}
module.exports = {
    serializeSounds,
    serializeCostumes,
    serializeModels,
};
