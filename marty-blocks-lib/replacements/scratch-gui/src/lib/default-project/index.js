import projectData from './project-data';

/* eslint-disable import/no-unresolved */
import backdrop from '!raw-loader!./cd21514d0531fdffb22204e0ec5ed84a.svg';
import costume1 from '!raw-loader!./8e41346f9e386948096815a9b5d6b3e0.svg';
import costume2 from '!raw-loader!./8e41346f9e386948096815a9b5d6b3e1.svg';
import costume3 from '!raw-loader!./8e41346f9e386948096815a9b5d6b3e2.svg';
import confusedSound from './confused.wav';
import arcadeBeepSound from './arcade-beep.wav';
import celebrateSound from './celebrate.wav';
import disbeliefSound from './disbelief.wav';
import excitedSound from './excited.wav';
import noWaySound from './no_way.wav';
import noSound from './no.wav';
import unpluggedSound from './unplugged.wav';
import whistleSound from './whistle.wav';
/* eslint-enable import/no-unresolved */

function decodeBase64ToUint8Array(base64) {
    const binaryString = atob(base64.split(',')[1]); // Decode base64 to binary string
    const length = binaryString.length;
    const uint8Array = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }
    return uint8Array;
}

const defaultProject = translator => {
    let _TextEncoder;
    if (typeof TextEncoder === 'undefined') {
        _TextEncoder = require('text-encoding').TextEncoder;
    } else {
        /* global TextEncoder */
        _TextEncoder = TextEncoder;
    }
    const encoder = new _TextEncoder();

    const projectJson = projectData(translator);
    return [{
        id: 0,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(projectJson)
    }, {
        id: 'cd21514d0531fdffb22204e0ec5ed84a',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(backdrop)
    }, {
        id: '8e41346f9e386948096815a9b5d6b3e0',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(costume1)
    },
    {
        id: '8e41346f9e386948096815a9b5d6b3e1',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(costume2)
    },
    {
        id: '8e41346f9e386948096815a9b5d6b3e2',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(costume3)
    },
    {
        id: 'confused',
        assetType: 'Sound',
        dataFormat: 'WAV',
        data: decodeBase64ToUint8Array(confusedSound)
    },
    {
        id: 'arcade-beep',
        assetType: 'Sound',
        dataFormat: 'WAV',
        data: decodeBase64ToUint8Array(arcadeBeepSound)
    },
    {
        id: 'celebrate',
        assetType: 'Sound',
        dataFormat: 'WAV',
        data: decodeBase64ToUint8Array(celebrateSound)
    },
    {
        id: 'disbelief',
        assetType: 'Sound',
        dataFormat: 'WAV',
        data: decodeBase64ToUint8Array(disbeliefSound)
    },
    {
        id: 'excited',
        assetType: 'Sound',
        dataFormat: 'WAV',
        data: decodeBase64ToUint8Array(excitedSound)
    },
    {
        id: 'no_way',
        assetType: 'Sound',
        dataFormat: 'WAV',
        data: decodeBase64ToUint8Array(noWaySound)
    },
    {
        id: 'no',
        assetType: 'Sound',
        dataFormat: 'WAV',
        data: decodeBase64ToUint8Array(noSound)
    },
    {
        id: 'unplugged',
        assetType: 'Sound',
        dataFormat: 'WAV',
        data: decodeBase64ToUint8Array(unpluggedSound)
    },
    {
        id: 'whistle',
        assetType: 'Sound',
        dataFormat: 'WAV',
        data: decodeBase64ToUint8Array(whistleSound)
    }
];
};

export default defaultProject;