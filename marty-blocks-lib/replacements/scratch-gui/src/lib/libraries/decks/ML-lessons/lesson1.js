import React from 'react';
import { FormattedMessage } from 'react-intl';
import libraryTXTSpeech from '../thumbs/text-to-speech.jpg';

const BUCKET_URL = "https://roboticalpublic.s3.eu-west-1.amazonaws.com/marty-blocks-student-led-lessons/type-lesson-ml-creating-a-simple-image-model/";
// Lesson properties
const LESSON_NAME = <FormattedMessage
    defaultMessage={"ML: Image Model with Marty"}
    description={""}
    id={`gui.howtos.lessons.type-lesson-ml-creating-a-simple-image-model.name`}
/>
const LESSON_KEY = "type-lesson-ml-creating-a-simple-image-model"; // The key needs to start with type-lesson so it can be identified as a lesson
const LESSON_TYPE = "lesson";
const LESSON_DESCRIPTION = "This lesson will guide you through creating a simple image model using Marty the Robot. Press Start to begin.";
const LESSON_TAGS = ['marty', 'machine', 'ai', 'ml', 'AI', 'ML', 'artificial', 'intelligence', 'machine', 'learning', 'lessons'];

/* Step 1 */
const STEP_1_TYPE = "info";
const STEP_1_DESCRIPTION = <FormattedMessage
    defaultMessage="Create a new image model named 'myImageModel', and create 2 classes named 'doNothing' and 'wave'. Do not collect any data for now."
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-creating-a-simple-image-model.step1.description`}
    values={{ linebreak: <br /> }}
/>;
const STEP_1_IMAGE = `${BUCKET_URL}model-class-names.png`;
const STEP_1_VIDEO = `${BUCKET_URL}visit-ml-tab.mp4`;
const STEP_1_HINT = {
    // description: <FormattedMessage
    //     defaultMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies."
    //     description=""
    //     id="gui.howtos.marty-machine-create-model.hint_create-model"
    //     values={{ linebreak: <br /> }}
    // />,
    // image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png',
    video: `${BUCKET_URL}visit-ml-tab-and-create-doNothing-class.mp4`,
    waitTime: 15000 // in milliseconds
};

/* Step 2 */
const STEP_2_TYPE = "info";
const STEP_2_DESCRIPTION = <FormattedMessage
    defaultMessage="For the doNothing class, collect at least 40 samples of you looking at the camera and doing nothing. For the wave class, collect at least 40 samples of you waving at the camera."
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-creating-a-simple-image-model.step2.description`}
    values={{ linebreak: <br /> }}
/>;
const STEP_2_IMAGE = `${BUCKET_URL}record-data.png`;
const STEP_2_HINT = {
    // description: <FormattedMessage
    //     defaultMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies."
    //     description=""
    //     id={`gui.howtos.lessons.type-lesson-ml-creating-a-simple-image-model.step2.hint.description`}
    //     values={{ linebreak: <br /> }}
    // />,
    // image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png',
    video: `${BUCKET_URL}collect-data-for-classes.mp4`
};

/* Step 3 */
const STEP_3_TYPE = "info";
const STEP_3_DESCRIPTION = <FormattedMessage
    defaultMessage="Train the model using the collected data. Once trained, run the model and test it by waving at the camera and see if the model correctly identifies the wave class. Then save the model."
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-creating-a-simple-image-model.step3.description`}
    values={{ linebreak: <br /> }}
/>;
const STEP_3_IMAGE = `${BUCKET_URL}train-run-save.png`;

/* Step 4 */
const STEP_4_TYPE = "checkpoint";
const STEP_4_QUESTION = <FormattedMessage
    defaultMessage="Visit the Code tab and look for the 'Load Machine Learning model' block. Press the green arrow on the block to see the list of available models. What is the name of the first model in the list?"
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-creating-a-simple-image-model.step4.question`}
    values={{
        linebreak: <br />,
        em: (...chunks) => <em>{chunks}</em>,
    }}
/>;
const STEP_4_QUESTION_TYPE = 'single'; // text, multiple, single
const STEP_4_CORRECT_ANSWERS = ['B'];
const STEP_4_POSSIBLE_ANSWERS = [
    { text: 'A', image: `${BUCKET_URL}model-name-marty.png` },
    { text: 'B', image: `${BUCKET_URL}model-name-myImageModel.png` },
    { text: 'C', image: `${BUCKET_URL}model-name-my_image_model.png` },
    { text: 'D', image: `${BUCKET_URL}model-name-model.png` },
];
const STEP_4_ANSWER_EXPLANATIONS = [
    <FormattedMessage
        defaultMessage="'marty' is not the correct answer. Please try again."
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-creating-a-simple-image-model.step4.answer_explanation1`}
    />,
    <FormattedMessage
        defaultMessage="Correct! The first model in the list is 'myImageModel' which is the model you created."
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-creating-a-simple-image-model.step4.answer_explanation2`}
    />,
    <FormattedMessage
        defaultMessage="'my image model' is not the correct answer. Please try again."
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-creating-a-simple-image-model.step4.answer_explanation3`}
    />,
    <FormattedMessage
        defaultMessage="'model' is not the correct answer. Please try again."
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-creating-a-simple-image-model.step4.answer_explanation4`}
    />
];

// Step 5
const STEP_5_TYPE = "info";
const STEP_5_DESCRIPTION = <FormattedMessage
    defaultMessage="Connect to Marty. Than load the model you created and use it to make Marty wave back at you."
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-creating-a-simple-image-model.step5.description`}
    values={{ linebreak: <br /> }}
/>;
const STEP_5_IMAGE = `${BUCKET_URL}load-model-wave-back.png`;


// End Step
const END_STEP_TYPE = "end";
const END_STEP_DESCRIPTION = <FormattedMessage
    defaultMessage={`You have completed the lesson. Congratulations!`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-creating-a-simple-image-model.step_end.description`}
    values={{ linebreak: <br /> }}
/>;
const END_STEP_EXTENSION_PROJECTS = ["type-lesson-ml-2"];

export default {
    [LESSON_KEY]: {
        name: LESSON_NAME,
        urlId: LESSON_KEY,
        tags: LESSON_TAGS,
        img: libraryTXTSpeech,
        type: LESSON_TYPE,
        description: LESSON_DESCRIPTION,
        internetConnectionRequired: true,
        collaborator: 'Tanya',
        steps: [
            {
                type: STEP_1_TYPE,
                description: STEP_1_DESCRIPTION,
                video: STEP_1_VIDEO,
                image: STEP_1_IMAGE,
                hint: STEP_1_HINT,
            },
            {
                type: STEP_2_TYPE,
                description: STEP_2_DESCRIPTION,
                // video: STEP_2_VIDEO,
                image: STEP_2_IMAGE,
                hint: STEP_2_HINT,
            },
            {
                type: STEP_3_TYPE,
                description: STEP_3_DESCRIPTION,
                image: STEP_3_IMAGE,
            },
            {
                type: STEP_4_TYPE,
                question: STEP_4_QUESTION,
                questionType: STEP_4_QUESTION_TYPE,
                correctAnswers: STEP_4_CORRECT_ANSWERS,
                possibleAnswers: STEP_4_POSSIBLE_ANSWERS,
                answerExplanations: STEP_4_ANSWER_EXPLANATIONS,
                // hint: STEP_4_HINT,
            },
            {
                type: STEP_5_TYPE,
                description: STEP_5_DESCRIPTION,
                image: STEP_5_IMAGE,
            },
            // {
            //     type: 'checkpoint',
            //     question: (
            //         <FormattedMessage
            //             defaultMessage="What is the name of the model you created?"
            //             description=""
            //             id="gui.howtos.marty-machine-create-model.step6_create-model"
            //             values={{
            //                 linebreak: <br />,
            //                 em: (...chunks) => <em>{chunks}</em>,
            //             }}
            //         />
            //     ),
            //     questionType: 'multiple', // text, multiple, single
            //     correctAnswers: ['marty', 'marty2'],
            //     possibleAnswers: [
            //         { text: 'marty', image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png' },
            //         { text: 'marty2', image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png' },
            //         { text: 'marty3', image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png' },
            //         { text: 'marty4', image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png' },
            //     ],
            //     answerExplanations: {
            //         correctAnswer: (
            //             <FormattedMessage
            //                 defaultMessage="Correct! You created a model named 'marty'."
            //                 description=""
            //                 id="gui.howtos.marty-machine-create-model.step5_create-model.correct_answer"
            //             />
            //         ),
            //         incorrectAnswer: (
            //             <FormattedMessage
            //                 defaultMessage="Incorrect. Multiple"
            //                 description=""
            //                 id="gui.howtos.marty-machine-create-model.step5_create-model.wrong_answer"
            //             />
            //         ),
            //     },
            // },
            {
                type: END_STEP_TYPE,
                description: END_STEP_DESCRIPTION,
                extensionProjects: END_STEP_EXTENSION_PROJECTS
            },
        ],
    },
}