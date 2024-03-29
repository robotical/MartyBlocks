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
        steps: [
            {
                type: 'info',
                description: (
                    <FormattedMessage
                        defaultMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies."
                        description="Step name for 'Create New Model' step"
                        id="gui.howtos.marty-machine-create-model.step1_create-model"
                        values={{ linebreak: <br /> }}
                    />
                ),
                video: "https://roboticalpublic.s3.eu-west-1.amazonaws.com/getting-started-v2-guide/get-started-step-3.mp4",
                image: 'mmCreateModel',
                hint: {
                    description: <FormattedMessage
                        defaultMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies."
                        description="Hint for 'Create New Model' step"
                        id="gui.howtos.marty-machine-create-model.hint_create-model"
                        values={{ linebreak: <br /> }}
                    />,
                    image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png',
                    video: "https://roboticalpublic.s3.eu-west-1.amazonaws.com/getting-started-v2-guide/get-started-step-3.mp4",
                }
            },
            {
                type: 'info',
                description: (
                    <FormattedMessage
                        defaultMessage="Lorem ipsum dolor sit amet, {linebreak} consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies."
                        description="Step name for 'Create New Model' step"
                        id="gui.howtos.marty-machine-create-model.step2_create-model"
                        values={{
                            linebreak: <br />,
                            em: (...chunks) => <em>{chunks}</em>,
                        }}
                    />
                ),
                video: "https://roboticalpublic.s3.eu-west-1.amazonaws.com/getting-started-v2-guide/get-started-step-3.mp4",
            },
            {
                type: 'info',
                description: (
                    <FormattedMessage
                        defaultMessage="Create New Model"
                        description="Step name for 'Create New Model' step"

                        id="gui.howtos.marty-machine-create-model.step3_create-model"
                    />
                ),
                image: 'mmCreateModel',
            },
            // {
            //     type: 'checkpoint',
            //     question: (
            //         <FormattedMessage
            //             defaultMessage="What is the name of the model you created?"
            //             description="Step name for 'Create New Model' step"
            //             id="gui.howtos.marty-machine-create-model.step4_create-model"
            //             values={{
            //                 linebreak: <br />,
            //                 em: (...chunks) => <em>{chunks}</em>,
            //             }}
            //         />
            //     ),
            //     questionType: 'text', // text, multiple, single
            //     correctAnswers: ['marty'],
            //     answerExplanations: {
            //         correctAnswer: (
            //             <FormattedMessage
            //                 defaultMessage="Correct! You created a model named 'marty'."
            //                 description="Answer explanation for 'Create New Model' step"
            //                 id="gui.howtos.marty-machine-create-model.step4_create-model.correct_answer"
            //             />
            //         ),
            //         incorrectAnswer: (
            //             <FormattedMessage
            //                 defaultMessage="Incorrect. Your model must be named 'marty'."
            //                 description="Answer explanation for 'Create New Model' step"
            //                 id="gui.howtos.marty-machine-create-model.step4_create-model.wrong_answer"
            //             />
            //         ),
            //     },
            // },
            {
                type: 'checkpoint',
                question: (
                    <FormattedMessage
                        defaultMessage="What is the name of the model you created?"
                        description="Step name for 'Create New Model' step"
                        id="gui.howtos.marty-machine-create-model.step5_create-model"
                        values={{
                            linebreak: <br />,
                            em: (...chunks) => <em>{chunks}</em>,
                        }}
                    />
                ),
                questionType: 'single', // text, multiple, single
                correctAnswers: ['marty'],
                possibleAnswers: [
                    { text: 'marty', image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png' },
                    { text: 'marty2', image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png' },
                    { text: 'marty3', image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png' },
                    { text: 'marty4', image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png' },
                ],
                answerExplanations: [
                    <FormattedMessage
                        defaultMessage="Correct! You created a model named 'marty'."
                        description="Answer explanation for 'Create New Model' step"
                        id="gui.howtos.marty-machine-create-model.step6_create-model.correct_answer"
                    />,
                    <FormattedMessage
                        defaultMessage="Incorrect. marty2"
                        description="Answer explanation for 'Create New Model' step"
                        id="gui.howtos.marty-machine-create-model.step6_create-model.wrong_answer"
                    />,
                    <FormattedMessage
                        defaultMessage="Incorrect. marty3"
                        description="Answer explanation for 'Create New Model' step"
                        id="gui.howtos.marty-machine-create-model.step6_create-model.wrong_answer2"
                    />,
                    <FormattedMessage
                        defaultMessage="Incorrect. marty4"
                        description="Answer explanation for 'Create New Model' step"
                        id="gui.howtos.marty-machine-create-model.step6_create-model.wrong_answer3"
                    />
                ],
            },
            {
                type: 'checkpoint',
                question: (
                    <FormattedMessage
                        defaultMessage="What is the name of the model you created?"
                        description="Step name for 'Create New Model' step"
                        id="gui.howtos.marty-machine-create-model.step6_create-model"
                        values={{
                            linebreak: <br />,
                            em: (...chunks) => <em>{chunks}</em>,
                        }}
                    />
                ),
                questionType: 'multiple', // text, multiple, single
                correctAnswers: ['marty', 'marty2'],
                possibleAnswers: [
                    { text: 'marty', image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png' },
                    { text: 'marty2', image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png' },
                    { text: 'marty3', image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png' },
                    { text: 'marty4', image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png' },
                ],
                answerExplanations: {
                    correctAnswer: (
                        <FormattedMessage
                            defaultMessage="Correct! You created a model named 'marty'."
                            description="Answer explanation for 'Create New Model' step"
                            id="gui.howtos.marty-machine-create-model.step5_create-model.correct_answer"
                        />
                    ),
                    incorrectAnswer: (
                        <FormattedMessage
                            defaultMessage="Incorrect. Multiple"
                            description="Answer explanation for 'Create New Model' step"
                            id="gui.howtos.marty-machine-create-model.step5_create-model.wrong_answer"
                        />
                    ),
                },
            },
            {
                type: 'end',
                description: (
                    <FormattedMessage
                        defaultMessage="You have completed the 'Create New Model' lesson."
                        description="Step name for 'Create New Model' step"
                        id="gui.howtos.marty-machine-create-model.step7_create-model"
                        values={{ linebreak: <br /> }}
                    />
                ),
                extensionProjects: ["type-lesson-ml-2"]
            },
        ],
    },
}