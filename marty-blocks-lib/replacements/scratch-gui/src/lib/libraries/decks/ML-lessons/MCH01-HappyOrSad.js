import React from 'react';
import { FormattedMessage } from 'react-intl';

const BUCKET_URL = "https://roboticalpublic.s3.eu-west-1.amazonaws.com/marty-blocks-student-led-lessons/type-lesson-ml-happy-or-sad/";
const LESSON_COVER_IMG = `${BUCKET_URL}Cover+Image.png`;
// Lesson properties
const LESSON_NAME = <FormattedMessage
    defaultMessage={"Happy or Sad?"}
    description={""}
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.name`}
/>
const LESSON_KEY = "type-lesson-ml-happy-or-sad"; // The key needs to start with type-lesson so it can be identified as a lesson
const LESSON_TYPE = "lesson";
const LESSON_DESCRIPTION = <FormattedMessage
    defaultMessage={`{bold1} {linebreak}{linebreak}
    {boldRequirements} Marty the Robot and a computer or tablet that has access to a camera/webcam. {linebreak}{linebreak}
    `}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.description`}
    values={{
        linebreak: <br />,
        bold1: <b>Get started with machine learning by teaching Marty how to spot when someone looks happy or sad!</b>,
        boldRequirements: <b>For this activity you will need the following:</b>,
        boldTargetAudience: <b>Target Audience (age/stage):</b>,
        boldEstimatedTime: <b>Estimated time to complete:</b>
    }}
/>;
const LESSON_TAGS = ['machineLearningLesson', 'Image Modelling', 'Emotions', 'Training', 'Dataset', 'Prediction', 'Accuracy'];

/* Step 1 */
const STEP_1_TYPE = "info";
const STEP_1_DESCRIPTION = <FormattedMessage
    defaultMessage={`Let’s get started by making sure that Marty has been connected correctly and is ready to move. {linebreak}{linebreak}
    
    Click on the {boldEvents} category and drag out the {boldGreenFlag} block into the centre of the screen. Then attach a block from the {boldMotion} category that tells Marty to {boldGetReady}. {linebreak}{linebreak}
    
    💡 {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step1.description`}
    values={{
        linebreak: <br />,
        boldGreenFlag: <b>when green flag clicked</b>,
        boldEvents: <b>Events</b>,
        boldMotion: <b>Motion</b>,
        boldGetReady: <b>get ready</b>,
        em1: <em>Test your program by clicking on the green flag in MartyBlocks, Marty should then stand to attention by straightening their arms and legs, ready for the next instruction! If Marty does not move, then please check you have correctly connected your robot.</em>,
    }}
/>;
const STEP_1_HINT = {
    // description: <FormattedMessage
    //     defaultMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies."
    //     description=""
    //     id="gui.howtos.marty-machine-create-model.hint_create-model"
    //     values={{ linebreak: <br />, }}
    // />,
    // image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png',
    image: `${BUCKET_URL}Hint1.png`,
    waitTime: 15000 // in milliseconds
};

/* Step 2 */
const STEP_2_TYPE = "info";
const STEP_2_DESCRIPTION = <FormattedMessage
    defaultMessage={`Using the menu along the top of the screen, click on the tab called {boldMachineLearning} and click {boldAllow} on the popup so that your webcam can be used for this activity.{linebreak}{linebreak}

✨ This is the section where we will be creating a new model that will be used to teach Marty what different emotions can look like. 
To do this we will need to create groups or classes of data for each emotion that we want Marty to be able to recognise. Each class will be made up of a dataset showing examples of someone who is happy or sad. {linebreak}{linebreak}

Fill in the {boldModel} to be {boldEmotions} as shown in the image below and the first class we are going to create is going to be called {boldHappy}. Now click on the {boldBluePlusButton} to create this class for our emotions model. 
`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step2.description`}
    values={{
        linebreak: <br />,
        boldMachineLearning: <b>Machine Learning</b>,
        boldAllow: <b>Allow</b>,
        boldModel: <b>Model Name</b>,
        boldEmotions: <b>Emotions</b>,
        boldHappy: <b>Happy</b>,
        boldBluePlusButton: <b>blue + button</b>,
    }}
/>;
const STEP_2_IMAGE = `${BUCKET_URL}Step2.png`;
const STEP_2_HINT = {
    description: <FormattedMessage
        defaultMessage="You will find this information and buttons underneath the live camera on your screen."
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step2.hint.description`}
        values={{ linebreak: <br />, }}
    />,
    // image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png',
    // video: `${BUCKET_URL}collect-data-for-classes.mp4`
};

/* Step 3 */
const STEP_3_TYPE = "info";
const STEP_3_DESCRIPTION = <FormattedMessage
    defaultMessage={`The first emotion we will be teaching Marty to recognise is happiness. {linebreak}{linebreak}

    ✨ You are going to capture lots of images of someone who looks happy. 
    These images will create a dataset that Marty will use to predict when someone looks happy. 
    To do this, we will be training Marty using the dataset you are about to create. 
    The bigger the dataset for training, the more accurate Marty’s predictions will be when we test our data model later. {linebreak}{linebreak}

    When you are ready, click on the {boldBlueRecording} button beside {boldHappy} and you will see this box fill up with images from your camera. 
    You can stop adding data to the Happy class by clicking on the {boldStopButton}. Not happy with some of the images? 
    Hover over them and click on the {boldDeleteButton} to remove them from the dataset.{linebreak}{linebreak}
    
    💡 {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step3.description`}
    values={{
        linebreak: <br />,
        boldBlueRecording: <b>blue recording</b>,
        boldHappy: <b>Happy</b>,
        boldStopButton: <b>stop button</b>,
        boldDeleteButton: <b>delete button</b>,
        em1: <em>Have you captured enough images of someone looking happy? We recommend that you have at least 30 images.</em>
    }}
/>;
const STEP_3_IMAGE = `${BUCKET_URL}Step3.png`;
const STEP_3_HINT = {
    description: <FormattedMessage
        defaultMessage="Remember that the images you capture should be of someone who looks happy!"
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step3.hint.description`}
        values={{ linebreak: <br />, }}
    />,
    // image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png',
    // video: `${BUCKET_URL}collect-data-for-classes.mp4`
};

/* Step 4 */
const STEP_4_TYPE = "info";
const STEP_4_DESCRIPTION = <FormattedMessage
    defaultMessage={`Let’s do that again but for sadness this time. {linebreak}{linebreak}

    Change the name of the class to {boldSad} and click on the {boldBluePlusButton} to create our second class. {linebreak}{linebreak}

    Now repeat what we did in the last step to record images of someone who looks sad.`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step4.description`}
    values={{
        linebreak: <br />,
        boldSad: <b>Sad</b>,
        boldBluePlusButton: <b>blue + button</b>,
    }}
/>;
const STEP_4_IMAGE = `${BUCKET_URL}Step4.png`;
const STEP_4_HINT = {
    description: <FormattedMessage
        defaultMessage="Remember that the images you take this time should be of someone who looks sad!"
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step4.hint.description`}
        values={{ linebreak: <br />, }}
    />,
    // image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png',
    // video: `${BUCKET_URL}collect-data-for-classes.mp4`
};


/* Step 5 */
const STEP_5_TYPE = "checkpoint";
const STEP_5_QUESTION = <FormattedMessage
    defaultMessage="What type of media have we used to create our datasets for the Happy and Sad classes?"
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step5.question`}
    values={{
        linebreak: <br />,
    }}
/>;
const STEP_5_QUESTION_TYPE = 'single'; // text, multiple, single
const STEP_5_CORRECT_ANSWERS = ['B'];
const STEP_5_POSSIBLE_ANSWERS = [
    { text: 'A', textOption: 'Audio' },
    { text: 'B', textOption: 'Images' },
    { text: 'C', textOption: 'Text' },
    { text: 'D', textOption: 'Videos' },
];
// const STEP_5_ANSWER_EXPLANATIONS = [
//     <FormattedMessage
//         defaultMessage="'marty' is not the correct answer. Please try again."
//         description=""
//         id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step5.answer_explanation1`}
//     />,
//     <FormattedMessage
//         defaultMessage="Correct! The first model in the list is 'myImageModel' which is the model you created."
//         description=""
//         id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step5.answer_explanation2`}
//     />,
//     <FormattedMessage
//         defaultMessage="'my image model' is not the correct answer. Please try again."
//         description=""
//         id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step5.answer_explanation3`}
//     />,
//     <FormattedMessage
//         defaultMessage="'model' is not the correct answer. Please try again."
//         description=""
//         id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step5.answer_explanation4`}
//     />
// ];

/* Step 6 */
const STEP_6_TYPE = "info";
const STEP_6_DESCRIPTION = <FormattedMessage
    defaultMessage={`Now that we have our classes of data created, we need to train Marty using this data. {linebreak}{linebreak}

    ✨ Training is the process of feeding the computer the data that has been collected and grouped. In our case, we have images of someone looking happy and someone looking sad. 
    They have been grouped into two classes so that the computer knows when we give it each image whether it is an example of happiness or sadness. {linebreak}{linebreak}

    Click on the {boldTrain} button to begin the training process – be patient as this may take a few minutes!`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step6.description`}
    values={{
        linebreak: <br />,
        boldTrain: <b>Train</b>,
    }}
/>;
const STEP_6_IMAGE = `${BUCKET_URL}Step5.png`;

/* Step 7 */
const STEP_7_TYPE = "info";
const STEP_7_DESCRIPTION = <FormattedMessage
    defaultMessage={`Time to test our model!{linebreak}{linebreak}

    ✨ Testing will allow us to quickly see how accurate our model is for predicting whether someone looks happy or sad. The model will tell us how confident it is about whether the current image from your camera is someone who looks happy or sad based on the data from the training process. {linebreak}{linebreak}
    Click on the {boldRun} button and try pulling different faces to see whether the computer thinks you are currently happy or sad. {linebreak}{linebreak}

    💡 {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step7.description`}
    values={{
        linebreak: <br />,
        boldRun: <b>Run</b>,
        em1: <em>Don’t worry if your model is not very accurate, you will have a chance to make changes to it in the next step!</em>
    }}
/>;
const STEP_7_IMAGE = `${BUCKET_URL}Step6.png`;

/* Step 8 */
const STEP_8_TYPE = "checkpoint";
const STEP_8_QUESTION = <FormattedMessage
    defaultMessage="Having a bigger dataset can lead to more accurate predictions after training."
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step8.question`}
    values={{
        linebreak: <br />,
    }}
/>;
const STEP_8_QUESTION_TYPE = 'single'; // text, multiple, single
const STEP_8_CORRECT_ANSWERS = ['A'];
const STEP_8_POSSIBLE_ANSWERS = [
    { text: 'A', textOption: 'True' },
    { text: 'B', textOption: 'False' },
];

/* Step 9 */
const STEP_9_TYPE = "info";
const STEP_9_DESCRIPTION = <FormattedMessage
    defaultMessage={`After testing you may have found that your model is not very accurate! {linebreak}{linebreak}

    Click on the {boldStopButton} so that your model is no longer being tested. {linebreak}{linebreak}

    You can now return to either your Happy or Sad datasets to add more images or remove any that you 
    think might be confusing your data model from making an accurate prediction.{linebreak}{linebreak}
    
    When you are happy with the datasets, remember to click on the Train button again to update your model.`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step9.description`}
    values={{
        linebreak: <br />,
        boldStopButton: <b>stop button</b>,
    }}
/>;
const STEP_9_HINT = {
    description: <FormattedMessage
        defaultMessage="To add more images to a class in your model, click on the {boldBlueRecordButton}"
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step9.hint.description`}
        values={{
            linebreak: <br />,
            boldBlueRecordButton: <b>blue record button.</b>,
        }}
    />,
    image: `${BUCKET_URL}Hint7.png`,
    // video: `${BUCKET_URL}collect-data-for-classes.mp4`
};

/* Step 10 */
const STEP_10_TYPE = "info";
const STEP_10_DESCRIPTION = <FormattedMessage
    defaultMessage={`When you are happy with your data model, it’s time to save it so that we can begin coding. {linebreak}{linebreak}

    Click on the {boldSave} button.{linebreak}{linebreak}
    
    💡 {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step10.description`}
    values={{
        linebreak: <br />,
        boldSave: <b>Save</b>,
        em1: <em>Once you have done this step, you cannot change your model so make sure you have tested it again using the Run button.</em>
    }}
/>;
const STEP_10_IMAGE = `${BUCKET_URL}Step8.png`;

/* Step 11 */
const STEP_11_TYPE = "checkpoint";
const STEP_11_QUESTION = <FormattedMessage
    defaultMessage="Training a data model is the process of…"
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step11.question`}
    values={{
        linebreak: <br />,
    }}
/>;
const STEP_11_QUESTION_TYPE = 'single'; // text, multiple, single
const STEP_11_CORRECT_ANSWERS = ['C'];
const STEP_11_POSSIBLE_ANSWERS = [
    { text: 'A', textOption: 'Adding new data to a class or group' },
    { text: 'B', textOption: 'Grouping data into different classes' },
    { text: 'C', textOption: 'Feeding the datasets for each class into the model giving examples of each class' },
    { text: 'D', textOption: 'Testing the accuracy of the data model' },
];

/* Step 12 */
const STEP_12_TYPE = "info";
const STEP_12_DESCRIPTION = <FormattedMessage
    defaultMessage={`It’s time to start coding!{linebreak}{linebreak}

    Click on the {boldCode} tab near the top of the screen.{linebreak}{linebreak}
    
    For this activity we will need to use some coding blocks from the {boldML} (machine learning) section. 
    Click on the ML section on the left-hand side to see what coding blocks we can use to interact with our trained data model.`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step12.description`}
    values={{
        linebreak: <br />,
        boldCode: <b>Code</b>,
        boldML: <b>ML</b>
    }}
/>;
const STEP_12_HINT = {
    description: <FormattedMessage
        defaultMessage={`On the left-hand side are all the different types of coding blocks that you can use with Marty in MartyBlocks. 
        Near the bottom of the list is one called {boldML} with a pair of Marty eyes as the icon. 
        Click on this button to see the machine learning coding blocks. `}
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step12.hint.description`}
        values={{
            linebreak: <br />,
            boldML: <b>ML</b>
        }}
    />,
    image: `${BUCKET_URL}Hint9.png`,
};

/* Step 13 */
const STEP_13_TYPE = "info";
const STEP_13_DESCRIPTION = <FormattedMessage
    defaultMessage={`We are going to add 2 blocks to the program that we have started creating earlier. {linebreak}{linebreak}

    Drag out the {boldLoadML} block and select the {boldEmotions} data model from the drop down. Attach this to the {boldGetReady} block we added earlier.{linebreak}{linebreak}
    
    Then drag out the {boldConfThresh} block and attach this to the bottom of our program. Change the value to {boldPointEight}{linebreak}{linebreak}
    
    Click on the {boldGreenFlag} in Scratch to run your code so that the {boldEmotions} model is correctly loaded into your program.{linebreak}{linebreak}
    
    ✨ {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step13.description`}
    values={{
        linebreak: <br />,
        boldLoadML: <b>Load Machine Learning model</b>,
        boldEmotions: <b>Emotions</b>,
        boldGetReady: <b>Get Ready</b>,
        boldConfThresh: <b>set confidence threshold</b>,
        boldPointEight: <b>0.8</b>,
        boldGreenFlag: <b>green flag</b>,
        em1: <em>The confidence threshold means that the model must be at least 80% sure of the prediction of whether someone is happy or sad before it will tell us this prediction.
            This will stop any predictions being sent to our program that might not be very accurate.</em>
    }}
/>;
const STEP_13_HINT = {
    // description: <FormattedMessage
    //     defaultMessage={``}
    //     description=""
    //     id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step13.hint.description`}
    //     values={{
    //         linebreak: <br />,
    //         b: (...chunks) => <b>{chunks}</b>,
    //     }}
    // />,
    image: `${BUCKET_URL}Hint10.png`,
};

/* Step 14 */
const STEP_14_TYPE = "info";
const STEP_14_DESCRIPTION = <FormattedMessage
    defaultMessage={`Next add the turn {boldVideoOn} block to our program. {linebreak}{linebreak}

    This will let you see the image that is being used by the data model to make a prediction on whether someone is happy or sad. 
    To see the live feed from your camera click on the button in the top right corner that has been highlighted in the image below.`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step14.description`}
    values={{
        linebreak: <br />,
        boldVideoOn: <b>video on</b>,

    }}
/>;
const STEP_14_IMAGE = `${BUCKET_URL}Step11.png`;
const STEP_14_HINT = {
    // description: <FormattedMessage
    //     defaultMessage={``}
    //     description=""
    //     id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step14.hint.description`}
    //     values={{
    //         linebreak: <br />,
    //         b: (...chunks) => <b>{chunks}</b>,
    //     }}
    // />,
    image: `${BUCKET_URL}Hint11.png`,
};

/* Step 15 */
const STEP_15_TYPE = "checkpoint";
const STEP_15_QUESTION = <FormattedMessage
    defaultMessage="What is the confidence threshold used for in our program?"
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step15.question`}
    values={{
        linebreak: <br />,
        em: (...chunks) => <em>{chunks}</em>,
    }}
/>;
const STEP_15_QUESTION_TYPE = 'single'; // text, multiple, single
const STEP_15_CORRECT_ANSWERS = ['B'];
const STEP_15_POSSIBLE_ANSWERS = [
    { text: 'A', textOption: 'To check how many images the model has been trained with' },
    { text: 'B', textOption: 'To make sure the model is confident with the prediction before it is used by the program' },
    { text: 'C', textOption: 'To change the prediction that the model is about to make ' },
    { text: 'D', textOption: 'To tell the user that more images are needed to make the model more accurate' },
];

/* Step 16 */
const STEP_16_TYPE = "info";
const STEP_16_DESCRIPTION = <FormattedMessage
    defaultMessage={`To avoid Marty being given predictions from the data model all the time, we can set it to only send a prediction every second. 
    This will mean we are not constantly sending Marty instructions to respond.{linebreak}{linebreak}

    Add the {boldLabel} block to your program and make sure the drop down is set to {boldOne}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step16.description`}
    values={{
        linebreak: <br />,
        boldLabel: <b>Label once every … seconds</b>,
        boldOne: <b>1</b>
    }}
/>;
const STEP_16_HINT = {
    // description: <FormattedMessage
    //     defaultMessage={``}
    //     description=""
    //     id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step16.hint.description`}
    //     values={{
    //         linebreak: <br />,
    //         b: (...chunks) => <b>{chunks}</b>,
    //     }}
    // />,
    image: `${BUCKET_URL}Hint12.png`,
};

/* Step 17 */
const STEP_17_TYPE = "info";
const STEP_17_DESCRIPTION = <FormattedMessage
    defaultMessage={`Now it’s time to tell Marty how to respond based on the predictions given from the trained data model! {linebreak}{linebreak}

    Staying in the ML coding block category, drag out the {boldImageLabel} block. 
    This is an {boldEvent} block so does not need to attach to any of the other blocks we currently have in our program. 
    Change the dropdown option to {boldHappy}.{linebreak}{linebreak}
    
    Go to the {boldMotion} blocks and decide how Marty will respond when they see someone happy. 
    For example, you could get Marty to Dance! Attach the chosen block to the new event block that we have just added. `}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step17.description`}
    values={{
        linebreak: <br />,
        boldImageLabel: <b>when received image label</b>,
        boldEvent: <b>event</b>,
        boldHappy: <b>Happy</b>,
        boldMotion: <b>Motion</b>,
    }}
/>;
const STEP_17_HINT = {
    // description: <FormattedMessage
    //     defaultMessage={``}
    //     description=""
    //     id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step17.hint.description`}
    //     values={{
    //         linebreak: <br />,
    //         b: (...chunks) => <b>{chunks}</b>,
    //     }}
    // />,
    image: `${BUCKET_URL}Hint13.png`,
};

/* Step 18 */
const STEP_18_TYPE = "info";
const STEP_18_DESCRIPTION = <FormattedMessage
    defaultMessage={`Repeat the previous step, except this time change the label to {boldSad} and decide what action Marty should do when they see someone who is sad.{linebreak}{linebreak}

    For example, Marty could set their eyes to be wide or could give them a wave to try and cheer them up!{linebreak}{linebreak}
    
    💡 {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step18.description`}
    values={{
        linebreak: <br />,
        boldSad: <b>Sad</b>,
        em1: <em>Remember that this is another event block that is being added so it does not need to attach to any of the previous blocks that have been added to your program.</em>
    }}
/>;
const STEP_18_HINT = {
    // description: <FormattedMessage
    //     defaultMessage={``}
    //     description=""
    //     id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step18.hint.description`}
    //     values={{
    //         linebreak: <br />,
    //         b: (...chunks) => <b>{chunks}</b>,
    //     }}
    // />,
    image: `${BUCKET_URL}Hint14.png`,
};

/* Step 19 */
const STEP_19_TYPE = "info";
const STEP_19_DESCRIPTION = <FormattedMessage
    defaultMessage={`Test your program! {linebreak}{linebreak}
    Click on the {boldGreenFlag} in Scratch to run your program. Check how Marty responds when you look happy or sad on the camera.{linebreak}{linebreak}
    
    💡 {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step19.description`}
    values={{
        linebreak: <br />,
        boldGreenFlag: <b>green flag</b>,
        em1: <em>Click on the checkbox beside the image label block to see the live predictions being used in your program, this might help
            you with debugging your code to make sure it is working correctly!</em>
    }}
/>;
const STEP_19_IMAGE = `${BUCKET_URL}Step15.png`;

/* Step 20 */
const STEP_20_TYPE = "info";
const STEP_20_DESCRIPTION = <FormattedMessage
    defaultMessage={`🎉 {bold1} {linebreak}{linebreak}

    Try changing some of the settings in your program such as decreasing the confidence threshold and check how accurate Marty’s reactions become. {linebreak}{linebreak}

    ⚡️ Ask someone else in the room to test your program – does it still work for other people’s faces and why? Remember the model 
    was only trained using images of your face! {linebreak}{linebreak}

    ⚡️ If you’re ready for something a little more challenging, try creating a {boldNewData} to identify {boldSignLanguage}
    that is being used and change your program so that Marty can respond to sign language.{linebreak}{linebreak}
    
    💡 {bEm1} {ndcsLink}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step20.description`}
    values={{
        linebreak: <br />,
        bold1: <b>Great job! You have made a machine learning model that predicts when someone looks happy or sad!</b>,
        boldNewData: <b>new data model</b>,
        boldSignLanguage: <b>sign language</b>,
        bEm1: <b><em>If you are looking for resources to support you with extending this activity to use sign language, there are many
            resources online that have flashcards that can be used to learn sign language such as </em></b>,
        ndcsLink: <b><em><a href="https://www.ndcs.org.uk/documents-and-resources/lets-sign-flashcards-for-emotions-routines-and-senses/" target="_blank">this one from the National Deaf Children’s Society</a></em></b>
    }}
/>;
const STEP_20_HINT = {
    description: <FormattedMessage
        defaultMessage={`To create a new data model, return to the {boldML} tab and hover over the + sign in the bottom left corner. 
        Click on the {boldImageIcon} to create a new data model using images and begin creating your classes for different types of sign 
        language to train your model to identify. Then update your code in MartyBlocks so Marty responds correctly depending on the sign language detected.`}
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step18.hint.description`}
        values={{
            linebreak: <br />,
            boldML: <b>Machine Learning</b>,
            boldImageIcon: <b>image icon</b>,
        }}
    />,
    image: `${BUCKET_URL}Hint+Extension.png`,
    waitTime: 3000
};


// End Step
const END_STEP_TYPE = "end";
const END_STEP_IMAGE = `${BUCKET_URL}Final Solution.png`;
const END_STEP_DESCRIPTION = <FormattedMessage
    defaultMessage={`{em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-happy-or-sad.step_end.description`}
    values={{
        linebreak: <br />,
        em1: <em>There should be three sections to the final program. The first setting up the program so that when the green
            flag is clicked Marty gets ready and the data model is set up to label new images coming from the camera.
            The final two sections tell Marty how to respond when the image is labelled as happy or sad.</em>,
    }}
/>;


export default {
    [LESSON_KEY]: {
        name: LESSON_NAME,
        urlId: LESSON_KEY,
        tags: LESSON_TAGS,
        img: LESSON_COVER_IMG,
        type: LESSON_TYPE,
        description: LESSON_DESCRIPTION,
        internetConnectionRequired: true,
        collaborator: 'Tanya Howden',
        steps: [
            {
                type: STEP_1_TYPE,
                description: STEP_1_DESCRIPTION,
                hint: STEP_1_HINT,
            },
            {
                type: STEP_2_TYPE,
                description: STEP_2_DESCRIPTION,
                image: STEP_2_IMAGE,
                hint: STEP_2_HINT,
            },
            {
                type: STEP_3_TYPE,
                description: STEP_3_DESCRIPTION,
                image: STEP_3_IMAGE,
                hint: STEP_3_HINT,
            },
            {
                type: STEP_4_TYPE,
                description: STEP_4_DESCRIPTION,
                hint: STEP_4_HINT,
                image: STEP_4_IMAGE,
            },
            {
                type: STEP_5_TYPE,
                question: STEP_5_QUESTION,
                questionType: STEP_5_QUESTION_TYPE,
                correctAnswers: STEP_5_CORRECT_ANSWERS,
                possibleAnswers: STEP_5_POSSIBLE_ANSWERS,
            },
            {
                type: STEP_6_TYPE,
                description: STEP_6_DESCRIPTION,
                image: STEP_6_IMAGE,
            },
            {
                type: STEP_7_TYPE,
                description: STEP_7_DESCRIPTION,
                image: STEP_7_IMAGE,
            },
            {
                type: STEP_8_TYPE,
                question: STEP_8_QUESTION,
                questionType: STEP_8_QUESTION_TYPE,
                correctAnswers: STEP_8_CORRECT_ANSWERS,
                possibleAnswers: STEP_8_POSSIBLE_ANSWERS,
            },
            {
                type: STEP_9_TYPE,
                description: STEP_9_DESCRIPTION,
                hint: STEP_9_HINT,
            },
            {
                type: STEP_10_TYPE,
                description: STEP_10_DESCRIPTION,
                image: STEP_10_IMAGE,
            },
            {
                type: STEP_11_TYPE,
                question: STEP_11_QUESTION,
                questionType: STEP_11_QUESTION_TYPE,
                correctAnswers: STEP_11_CORRECT_ANSWERS,
                possibleAnswers: STEP_11_POSSIBLE_ANSWERS,
            },
            {
                type: STEP_12_TYPE,
                description: STEP_12_DESCRIPTION,
                hint: STEP_12_HINT,
            },
            {
                type: STEP_13_TYPE,
                description: STEP_13_DESCRIPTION,
                hint: STEP_13_HINT,
            },
            {
                type: STEP_14_TYPE,
                description: STEP_14_DESCRIPTION,
                image: STEP_14_IMAGE,
                hint: STEP_14_HINT,
            },
            {
                type: STEP_15_TYPE,
                question: STEP_15_QUESTION,
                questionType: STEP_15_QUESTION_TYPE,
                correctAnswers: STEP_15_CORRECT_ANSWERS,
                possibleAnswers: STEP_15_POSSIBLE_ANSWERS,
            },
            {
                type: STEP_16_TYPE,
                description: STEP_16_DESCRIPTION,
                hint: STEP_16_HINT,
            },
            {
                type: STEP_17_TYPE,
                description: STEP_17_DESCRIPTION,
                hint: STEP_17_HINT,
            },
            {
                type: STEP_18_TYPE,
                description: STEP_18_DESCRIPTION,
                hint: STEP_18_HINT,
            },
            {
                type: STEP_19_TYPE,
                description: STEP_19_DESCRIPTION,
                image: STEP_19_IMAGE,
            },
            {
                type: END_STEP_TYPE,
                description: END_STEP_DESCRIPTION,
                image: END_STEP_IMAGE,
                // extensionProjects: END_STEP_EXTENSION_PROJECTS
            },
            {
                type: STEP_20_TYPE,
                description: STEP_20_DESCRIPTION,
                hint: STEP_20_HINT,
            },
        ],
    },
}