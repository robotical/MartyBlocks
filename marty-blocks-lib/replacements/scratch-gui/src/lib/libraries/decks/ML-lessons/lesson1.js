import React from 'react';
import { FormattedMessage } from 'react-intl';
import libraryTXTSpeech from '../thumbs/text-to-speech.jpg';

export default {

    "type-lesson-ml-1": {
        name: (
            <FormattedMessage
                defaultMessage="Ml Lesson 1"
                description="Name for the 'Ml Lesson 1' lesson"
                id="gui.howtos.lessons.type-lesson-ml-1.name"
            />
        ),
        urlId: 'type-lesson-ml-1',
        tags: ['marty', 'machine', 'ai', 'ml', 'AI', 'ML', 'artificial', 'intelligence', 'machine', 'learning', 'lessons'],
        img: libraryTXTSpeech,
        type: 'lesson',
        description: 'Ml Lesson 1 Description lorem ipsum',
        internetConnectionRequired: true,
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
                ), url: 'https://userguides.robotical.io/martyv2/userguides/martyblocks/machinelearning'
            }
        }],
    },
}