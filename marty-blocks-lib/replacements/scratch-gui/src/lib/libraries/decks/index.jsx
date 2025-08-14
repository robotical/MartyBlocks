import React from 'react';
import { FormattedMessage } from 'react-intl';

// Tutorial thumbnails: Avoid using any text that would need to be
// translated in thumbnails.

// Text to Speech
import libraryTXTSpeech from './thumbs/text-to-speech.jpg';
// import MCH01 from './ML-lessons/MCH01-HappyOrSad';
// import MCH02 from './ML-lessons/MCH02-CaptainsOrders';
// import MCH03 from './ML-lessons/MCH03-FarmingRobots';

import cogAndMartyTutorial from './general-lessons/cog-and-marty-dummy';
import cogBlocksTutorial1 from './general-lessons/cog-blocks-1';
import cogBlocksTutorial2 from './general-lessons/cog-blocks-2';
import cogBlocksTutorial3 from './general-lessons/cog-blocks-3';
import cogBlocksTutorial4 from './general-lessons/cog-blocks-4';
import cogBlocksTutorial5 from './general-lessons/cog-blocks-5';
import cogBlocksTutorial6 from './general-lessons/cog-blocks-6';
import cogBlocksTutorial7 from './general-lessons/cog-blocks-7';
import cogBlocksTutorial8 from './general-lessons/cog-blocks-8';
import cogBlocksTutorial9 from './general-lessons/cog-blocks-9';
import cogBlocksTutorial10 from './general-lessons/cog-blocks-10';
import cogBlocksTutorial11 from './general-lessons/cog-blocks-11';

import cogBlocksTutorial13 from './general-lessons/cog-blocks-13';
import cogBlocksTutorial14 from './general-lessons/cog-blocks-14';
import cogBlocksTutorial15 from './general-lessons/cog-blocks-15';

export default {
    // ...MCH01,
    // ...MCH02,
    // ...MCH03,
    ...cogAndMartyTutorial,
    ...cogBlocksTutorial1,
    ...cogBlocksTutorial2,
    ...cogBlocksTutorial3,
    ...cogBlocksTutorial4,
    ...cogBlocksTutorial5,
    ...cogBlocksTutorial6,
    ...cogBlocksTutorial7,
    ...cogBlocksTutorial8,
    ...cogBlocksTutorial9,
    ...cogBlocksTutorial10,
    ...cogBlocksTutorial11,

    ...cogBlocksTutorial13,
    ...cogBlocksTutorial14,
    ...cogBlocksTutorial15,
    "mm-create-model": {
        name: (
            <FormattedMessage
                defaultMessage="Create AI Model"
                description="Name for the 'Create Model' how-to"
                id="gui.howtos.marty-machine-create-model.name"
            />
        ),
        urlId: 'mm-create-model',
        tags: ['marty', 'machine', 'ai', 'ml', 'AI', 'ML', 'artificial', 'intelligence', 'machine', 'learning'],
        img: libraryTXTSpeech,
        steps: [{
            title: (
                <FormattedMessage
                    defaultMessage="Create New Model"
                    description="Step name for 'Create New Model' step"
                    id="gui.howtos.marty-machine-create-model.step_create-model"
                />
            ),
            image: 'mmCreateModel',
        },
        {
            deckIds: [
                'mm-create-image-model',
                'mm-create-audio-model',
            ]
        },
        {
            externalUrl: {
                label: (
                    <FormattedMessage
                        defaultMessage="Visit our User Guide for more info"
                        description="Label for link to User Guide for more info"
                        id="gui.howtos.marty-machine-create-audio-model.step_visit-user-guide"
                    />
                ), url: 'https://userguides.robotical.io/martyv2/userguides/martyblocks/machinelearning/start'
            }
        }],
    },
    "mm-create-image-model": {
        name: (
            <FormattedMessage
                defaultMessage="Create Image Model"
                description="Name for the 'Create Image Model' how-to"
                id="gui.howtos.marty-machine-create-image-model.name"
            />
        ),
        tags: ['marty', 'machine', 'ai', 'ml', 'AI', 'ML', 'artificial', 'intelligence', 'machine', 'learning'],
        img: libraryTXTSpeech,
        steps: [{
            title: (
                <FormattedMessage
                    defaultMessage="Create New Image Model"
                    description="Step name for 'Create New Image Model' step"
                    id="gui.howtos.marty-machine-create-image-model.step_create-image-model"
                />
            ),
            image: 'mmCreateImageModel',
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Change Model Name"
                    description="Step name for 'Change Model Name' step"
                    id="gui.howtos.marty-machine-create-image-model.step_change-model-name"
                />
            ),
            image: 'mmChangeModelName',
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Collect Data"
                    description="Step name for 'Collect Data' step"
                    id="gui.howtos.marty-machine-create-image-model.step_collect-data"
                />
            ),
            image: 'mmCollectDataForClass',
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Train Model"
                    description="Step name for 'Train Model' step"
                    id="gui.howtos.marty-machine-create-image-model.step_train-model"
                />
            ),
            image: 'mmTrainModel',
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Run Model"
                    description="Step name for 'Run Model' step"
                    id="gui.howtos.marty-machine-create-image-model.step_run-model"
                />
            ),
            image: 'mmRunModel',
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Save Model"
                    description="Step name for 'Save Model' step"
                    id="gui.howtos.marty-machine-create-image-model.step_save-model"
                />
            ),
            image: 'mmSaveModel',
        },
        {
            deckIds: [
                'mm-load-and-run-image-model'
            ]
        },
        {
            externalUrl: {
                label: (
                    <FormattedMessage
                        defaultMessage="Visit our User Guide for more info"
                        description="Label for link to User Guide for more info"
                        id="gui.howtos.marty-machine-create-audio-model.step_visit-user-guide"
                    />
                ), url: 'https://userguides.robotical.io/martyv2/userguides/martyblocks/machinelearning/start'
            }
        },
        ],
    },

    "mm-create-audio-model": {
        name: (
            <FormattedMessage
                defaultMessage="Create Audio Model"
                description="Name for the 'Create Audio Model' how-to"
                id="gui.howtos.marty-machine-create-audio-model.name"
            />
        ),
        tags: ['marty', 'machine', 'ai', 'ml', 'AI', 'ML', 'artificial', 'intelligence', 'machine', 'learning'],
        img: libraryTXTSpeech,
        steps: [{
            title: (
                <FormattedMessage
                    defaultMessage="Create New Audio Model"
                    description="Step name for 'Create New Audio Model' step"
                    id="gui.howtos.marty-machine-create-audio-model.step_create-audio-model"
                />
            ),
            image: 'mmCreateAudioModel',
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Change Model Name"
                    description="Step name for 'Change Model Name' step"
                    id="gui.howtos.marty-machine-create-audio-model.step_change-model-name"
                />
            ),
            image: 'mmChangeModelName',
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Collect Data"
                    description="Step name for 'Collect Data' step"
                    id="gui.howtos.marty-machine-create-audio-model.step_collect-data"
                />
            ),
            image: 'mmCollectDataForClass',
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Train Model"
                    description="Step name for 'Train Model' step"
                    id="gui.howtos.marty-machine-create-audio-model.step_train-model"
                />
            ),
            image: 'mmTrainModel',
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Run Model"
                    description="Step name for 'Run Model' step"
                    id="gui.howtos.marty-machine-create-audio-model.step_run-model"
                />
            ),
            image: 'mmRunModel',
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Save Model"
                    description="Step name for 'Save Model' step"
                    id="gui.howtos.marty-machine-create-audio-model.step_save-model"
                />
            ),
            image: 'mmSaveModel',
        },
        {
            deckIds: [
                'mm-load-and-run-audio-model'
            ]
        },
        {
            externalUrl: {
                label: (
                    <FormattedMessage
                        defaultMessage="Visit our User Guide for more info"
                        description="Label for link to User Guide for more info"
                        id="gui.howtos.marty-machine-create-audio-model.step_visit-user-guide"
                    />
                ), url: 'https://userguides.robotical.io/martyv2/userguides/martyblocks/machinelearning/start'
            }
        },
        ],
    },

    "mm-load-tm-model": {
        name: (
            <FormattedMessage
                defaultMessage="Load Teachable Machine Model"
                description="Name for the 'Load Model' how-to"
                id="gui.howtos.marty-machine-load-tm-model.name"
            />
        ),
        tags: ['marty', 'machine', 'ai', 'ml', 'AI', 'ML', 'artificial', 'intelligence', 'machine', 'learning'],
        img: libraryTXTSpeech,
        steps: [{
            title: (
                <FormattedMessage
                    defaultMessage="Load Teachable Machine Model"
                    description="Step name for 'Load Teachable Machine Model' step"
                    id="gui.howtos.marty-machine-load-tm-model.step_load-tm-model"
                />
            ),
            image: 'mmLoadTMModel',
        },
        {
            deckIds: [
                'mm-load-and-run-audio-model',
                'mm-load-and-run-image-model'
            ]
        },
        {
            externalUrl: {
                label: (
                    <FormattedMessage
                        defaultMessage="Visit our User Guide for more info"
                        description="Label for link to User Guide for more info"
                        id="gui.howtos.marty-machine-create-audio-model.step_visit-user-guide"
                    />
                ), url: 'https://userguides.robotical.io/martyv2/userguides/martyblocks/machinelearning/start'
            }
        },
        ],
    },

    'mm-load-and-run-image-model': {
        name: (
            <FormattedMessage
                defaultMessage="Load and Run Image Model"
                description="Name for the 'Load and Run Image Model' how-to"
                id="gui.howtos.marty-machine-load-and-run-image-model.name"
            />
        ),
        tags: ['marty', 'machine', 'ai', 'ml', 'AI', 'ML', 'artificial', 'intelligence', 'machine', 'learning'],
        img: libraryTXTSpeech,
        steps: [{
            title: (
                <FormattedMessage
                    defaultMessage="Bring up the AI blocks"
                    description="Step name for 'Bring up the AI blocks' step"
                    id="gui.howtos.marty-machine-load-and-run-image-model.step_load-and-run-image-model"
                />
            ),
            image: 'mmAIBlocks',
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Load Model"
                    description="Step name for 'Load Model' step"
                    id="gui.howtos.marty-machine-load-and-run-image-model.step_load-model"
                />
            ),
            image: 'mmBlocksLoadImageModel',
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Turn Classification On"
                    description="Step name for 'Turn Classification On' step"
                    id="gui.howtos.marty-machine-load-and-run-image-model.step_classification-on"
                />
            ),
            image: 'mmBlocksClassificationOn',
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Classify Image"
                    description="Step name for 'Classify Image' step"
                    id="gui.howtos.marty-machine-load-and-run-image-model.step_classify-image"
                />
            ),
            image: 'mmBlocksClassifyImage',
        },
        // {
        //     deckIds: [
        //         'mm-create-image-model'
        //     ]
        // }
        {
            externalUrl: {
                label: (
                    <FormattedMessage
                        defaultMessage="Visit our User Guide for more info"
                        description="Label for link to User Guide for more info"
                        id="gui.howtos.marty-machine-create-audio-model.step_visit-user-guide"
                    />
                ), url: 'https://userguides.robotical.io/martyv2/userguides/martyblocks/machinelearning/start'
            }
        },
        ],
    },

    'mm-load-and-run-audio-model': {
        name: (
            <FormattedMessage
                defaultMessage="Load and Run Audio Model"
                description="Name for the 'Load and Run Audio Model' how-to"
                id="gui.howtos.marty-machine-load-and-run-audio-model.name"
            />
        ),
        tags: ['marty', 'machine', 'ai', 'ml', 'AI', 'ML', 'artificial', 'intelligence', 'machine', 'learning'],
        img: libraryTXTSpeech,
        steps: [{
            title: (
                <FormattedMessage
                    defaultMessage="Bring up the AI blocks"
                    description="Step name for 'Bring up the AI blocks' step"
                    id="gui.howtos.marty-machine-load-and-run-audio-model.step_load-and-run-audio-model"
                />
            ),
            image: 'mmAIBlocks',
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Load Model"
                    description="Step name for 'Load Model' step"
                    id="gui.howtos.marty-machine-load-and-run-audio-model.step_load-model"
                />
            ),
            image: 'mmBlocksLoadAudioModel',
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Turn Classification On"
                    description="Step name for 'Turn Classification On' step"
                    id="gui.howtos.marty-machine-load-and-run-audio-model.step_classification-on"
                />
            ),
            image: 'mmBlocksClassificationOn',
        },
        {
            title: (
                <FormattedMessage
                    defaultMessage="Classify Audio"
                    description="Step name for 'Classify Audio' step"
                    id="gui.howtos.marty-machine-load-and-run-audio-model.step_classify-audio"
                />
            ),
            image: 'mmBlocksClassifyAudio',
        },
        // {
        //     deckIds: [
        //         'mm-create-audio-model'
        //     ]
        // }
        {
            externalUrl: {
                label: (
                    <FormattedMessage
                        defaultMessage="Visit our User Guide for more info"
                        description="Label for link to User Guide for more info"
                        id="gui.howtos.marty-machine-create-audio-model.step_visit-user-guide"
                    />
                ), url: 'https://userguides.robotical.io/martyv2/userguides/martyblocks/machinelearning/start'
            }
        },
        ],
    }

};
