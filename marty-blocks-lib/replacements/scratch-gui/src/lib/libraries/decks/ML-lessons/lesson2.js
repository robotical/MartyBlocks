import React from 'react';
import { FormattedMessage } from 'react-intl';
import libraryTXTSpeech from '../thumbs/text-to-speech.jpg';
const BUCKET_URL = "https://roboticalpublic.s3.eu-west-1.amazonaws.com/marty-blocks-student-led-lessons/type-lesson-ml-creating-a-simple-image-model/";

export default {

    "type-lesson-ml-2": {
        name: (
            <FormattedMessage
                defaultMessage="Ml Activity 1"
                description="Name for the 'Ml Lesson 2' lesson"
                id="gui.howtos.lessons.type-lesson-ml-1.name"
            />
        ),
        urlId: 'type-lesson-ml-1',
        tags: ['marty', 'machine', 'ai', 'ml', 'AI', 'ML', 'artificial', 'intelligence', 'machine', 'learning', 'lessons'],
        img: libraryTXTSpeech,
        type: 'lesson',
        description: 'Ml Lesson 2 Description lorem ipsum',
        internetConnectionRequired: true,
        steps: [
            {
                type: 'info',
                description: (
                    <FormattedMessage
                        defaultMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies."
                        description="Step name for 'Create New Model' step"
                        id="gui.howtos.marty-machine-create-model2.step1_create-model"
                        values={{ linebreak: <br /> }}
                    />
                ),
                video: "https://roboticalpublic.s3.eu-west-1.amazonaws.com/getting-started-v2-guide/get-started-step-3.mp4",
                image: `${BUCKET_URL}model-class-names.png`
            },
            {
                type: 'end',
                description: (
                    <FormattedMessage
                        defaultMessage="You have completed the 'Create New Model' lesson."
                        description="Step name for 'Create New Model' step"
                        id="gui.howtos.marty-machine-create-model2.step7_create-model"
                        values={{ linebreak: <br /> }}
                    />
                )
            },
        ],
    },
}