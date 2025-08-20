/**
 * @fileoverview
 * Utility functions to return json corresponding to default empty assets.
 */

/**
 * Generate a blank costume object for vm.addCostume with the provided name.
 * @param {string} name the name to use for the costume, caller should localize
 * @return {object} vm costume object
 */
const emptyCostume = name => ({
    name: name,
    md5: 'cd21514d0531fdffb22204e0ec5ed84a.svg',
    rotationCenterX: 0,
    rotationCenterY: 0,
    bitmapResolution: 1,
    skinId: null
});

/**
 * Generate a new empty sprite. The caller should provide localized versions of the
 * default names.
 * @param {string} name the name to use for the sprite
 * @param {string} soundName the name to use for the default sound
 * @param {string} costumeName the name to use for the default costume
 * @return {object} object expected by vm.addSprite
 */
// {
//     name: name,
//     isStage: false,
//     targetType: 'SPRITE',
//     variables: {},
//     sounds: [
//         {
//             name: soundName,
//             assetId: -1,
//             md5ext: '83a9787d4cb6f3b7632b4ddfebf74367.wav',
//             dataFormat: 'wav',
//             sampleCount: 258,
//             rate: 11025,
//             format: ''
//         }
//     ],
//     costumes: [
//         {
//             name: costumeName,
//             assetId: -1,
//             md5ext: 'cd21514d0531fdffb22204e0ec5ed84a.svg',
//             dataFormat: 'svg',
//             bitmapResolution: 1,
            // rotationCenterX: 0,
            // rotationCenterY: 0
//         }
//     ],
    // x: 36,
    // y: 28,
// }
const emptySprite = (name, soundName, costumeName) => ({
    "name": name,
    "tags": [
        "fantasy",
        "ipzy",
        "things"
    ],
    "isStage": false,
    "targetType": "SPRITE",
    "variables": {},
    "costumes": [
        {
            "assetId": "-1",
            "name": costumeName,
            "bitmapResolution": 1,
            "md5ext": "cd21514d0531fdffb22204e0ec5ed84a.svg",
            "dataFormat": "svg",
            rotationCenterX: 0,
            rotationCenterY: 0
        }
    ],
    "sounds": [
        {
            "assetId": "-1",
            "name": soundName,
            "dataFormat": "wav",
            "format": "adpcm",
            "rate": 11025,
            "sampleCount": 258,
            "md5ext": "83a9787d4cb6f3b7632b4ddfebf74367.wav"
        }
    ],
    "blocks": {},
    x: 0,
    y: 0,
});

export {
    emptyCostume,
    emptySprite
};
