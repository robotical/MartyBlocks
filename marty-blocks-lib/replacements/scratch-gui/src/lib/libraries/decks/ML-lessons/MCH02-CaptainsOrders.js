import React from 'react';
import { FormattedMessage } from 'react-intl';

const BUCKET_URL = "https://roboticalpublic.s3.eu-west-1.amazonaws.com/marty-blocks-student-led-lessons/type-lesson-ml-captains-orders/";
const LESSON_COVER_IMG = `${BUCKET_URL}Cover+Image.png`;
// Lesson properties
const LESSON_NAME = <FormattedMessage
    defaultMessage={"Captain's Orders"}
    description={""}
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.name`}
/>
const LESSON_KEY = "type-lesson-ml-captains-orders"; // The key needs to start with type-lesson so it can be identified as a lesson
const LESSON_TYPE = "lesson";
const LESSON_DESCRIPTION = <FormattedMessage
    defaultMessage={`{bold1} {linebreak}{linebreak}
    {boldRequirements} Marty the Robot and a computer or tablet that has access to a microphone. {linebreak}{linebreak}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.description`}
    values={{
        linebreak: <br />,
        bold1: <b>Use voice commands to control Marty’s movements and consider how remotely operated robotics can be used in the real world.</b>,
        boldRequirements: <b>For this activity you will need the following:</b>,
        boldTargetAudience: <b>Target Audience (age/stage):</b>,
        boldEstimatedTime: <b>Estimated time to complete:</b>
    }}
/>;
const LESSON_TAGS = ['machineLearningLesson', 'Audio', 'Command', 'Training', 'Data Model', 'Prediction', 'Accuracy', 'Remotely Operated Vehicle/Robot'];

/* Step 1 */
const STEP_1_TYPE = "info";
const STEP_1_DESCRIPTION = <FormattedMessage
    defaultMessage={`Let’s get started by making sure that Marty has been connected correctly and is ready to move. {linebreak}{linebreak}
    
    Click on the {boldEvents} category and drag out the {boldGreenFlag} block into the centre of the screen. Then attach a block from the {boldMotion} category that tells Marty to {boldGetReady}. {linebreak}{linebreak}
    
    💡 {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step1.description`}
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
    defaultMessage={`Using the menu along the top of the screen, click on the tab called {boldMachineLearning}.{linebreak}{linebreak}

    Hover over the {boldBluePlusButton} on the bottom left to create a new model and click on the {boldIconOfSound}. 
    Then click {boldContinue} if a popup appears asking you to check for any unsaved changes.{linebreak}{linebreak}

    you may also be asked if MartyBlocks can have access to your microphone, when this appears click on {boldAllow}. 
`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step2.description`}
    values={{
        linebreak: <br />,
        boldMachineLearning: <b>Machine Learning</b>,
        boldAllow: <b>Allow</b>,
        boldContinue: <b>Continue</b>,
        boldIconOfSound: <b>icon of a sound wave</b>,
        boldBluePlusButton: <b>blue + button</b>,
    }}
/>;
const STEP_2_IMAGE = `${BUCKET_URL}Step2.png`;

/* Step 3 */
const STEP_3_TYPE = "info";
const STEP_3_DESCRIPTION = <FormattedMessage
    defaultMessage={`Now we need to start thinking about what audio we need to record. {linebreak}{linebreak}

    ✨ This is the section where we will be creating a new {emModel} that will be used to teach Marty what the different 
    commands will sound like. To do this we will need to create groups or {emClasses} of data for each command that
     we want Marty to be able to recognise. Each class will be made up of a {emDataset} with examples 
     of someone saying the command word. {linebreak}{linebreak}

    Fill in the {boldModelName} to be {boldCommands} as shown in the image below and you will notice that 
    there is already one class that has been created for us called {boldBackgroundNoise}{linebreak}{linebreak}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step3.description`}
    values={{
        linebreak: <br />,
        emModel: <em>model</em>,
        emClasses: <em>classes</em>,
        emDataset: <em>dataset</em>,
        boldModelName: <b>Model Name</b>,
        boldCommands: <b>Commands</b>,
        boldBackgroundNoise: <b>_background_noise_</b>,
    }}
/>;
const STEP_3_IMAGE = `${BUCKET_URL}Step3.png`;

/* Step 4 */
const STEP_4_TYPE = "checkpoint";
const STEP_4_QUESTION = <FormattedMessage
    defaultMessage="What type of media will be used to create datasets for training this model?"
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step4.question`}
    values={{
        linebreak: <br />,
    }}
/>;
const STEP_4_QUESTION_TYPE = 'single'; // text, multiple, single
const STEP_4_CORRECT_ANSWERS = ['B'];
const STEP_4_POSSIBLE_ANSWERS = [
    { text: 'A', textOption: 'Image' },
    { text: 'B', textOption: 'Audio' },
    { text: 'C', textOption: 'Video' },
    { text: 'D', textOption: 'Text' },
];

/* Step 5 */
const STEP_5_TYPE = "info";
const STEP_5_DESCRIPTION = <FormattedMessage
    defaultMessage={`The first set of audio recordings that we need to capture is of any background noise based on where you are sitting. {linebreak}{linebreak}

    ✨ Recording the background noise of where you are will help the data model with ignoring this noise so 
    that Marty and the computer can focus on the command words that you will be speaking. {linebreak}{linebreak}

    Click on the {boldBlueRecordingButton} to record some audio of the background noise of where you are. 
    Repeat this 10 times so that you have 10 audio recordings of your background noise.{linebreak}{linebreak}
    
    💡 {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step5.description`}
    values={{
        linebreak: <br />,
        boldBlueRecordingButton: <b>blue recording button</b>,
        em1: <em>Remember that since we are recording the background noise, you do not need to speak or make any extra noise!</em>
    }}
/>;
const STEP_5_HINT = {
    description: <FormattedMessage
        defaultMessage="When you have captured 10 audio recordings, this is what the first audio class should look like."
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step4.hint.description`}
        values={{ linebreak: <br />, }}
    />,
    image: `${BUCKET_URL}Hint4.png`,
    // video: `${BUCKET_URL}collect-data-for-classes.mp4`
};

/* Step 6 */
const STEP_6_TYPE = "checkpoint";
const STEP_6_QUESTION = <FormattedMessage
    defaultMessage="What is the purpose of gathering examples of background noise for the model?"
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step6.question`}
    values={{
        linebreak: <br />,
    }}
/>;
const STEP_6_QUESTION_TYPE = 'single'; // text, multiple, single
const STEP_6_CORRECT_ANSWERS = ['A'];
const STEP_6_POSSIBLE_ANSWERS = [
    { text: 'A', textOption: 'To help the model focus on the command words being said by the user' },
    { text: 'B', textOption: 'Sets the background noise to be the most important noise to listen for' },
    { text: 'C', textOption: 'To pick out all of the different voices in the room ' },
    { text: 'D', textOption: 'It is part of the training process' },
];

/* Step 7 */
const STEP_7_TYPE = "info";
const STEP_7_DESCRIPTION = <FormattedMessage
    defaultMessage={`We will now add another class for the first command we want Marty to recognise us saying. {linebreak}{linebreak}

    Change the name of the class to {boldForward} as shown in the image and click on the {boldBluePlusButton} to create a class for this first command. `}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step7.description`}
    values={{
        linebreak: <br />,
        boldForward: <b>Forward</b>,
        boldBluePlusButton: <b>blue + button</b>
    }}
/>;
const STEP_7_IMAGE = `${BUCKET_URL}Step5.png`;

/* Step 8 */
const STEP_8_TYPE = "info";
const STEP_8_DESCRIPTION = <FormattedMessage
    defaultMessage={`Like with the background noise, we need to record some sample audio for the {boldForward} command. 
    Except this time, you will need to say the command out loud when recording. {linebreak}{linebreak}

    Click on the blue recording button to record an audio clip of you saying the first command – {boldForward}. 
    Repeat this process at least 10 times so that you have 10 audio recordings of you saying the command word. {linebreak}{linebreak}

    💡 {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step8.description`}
    values={{
        linebreak: <br />,
        boldRun: <b>Run</b>,
        boldForward: <b>Forward</b>,
        em1: <em>Not happy with one of the recordings? Hover over that audio recording and click on the delete button to remove it.</em>
    }}
/>;
const STEP_8_IMAGE = `${BUCKET_URL}Step6.png`;

/* Step 9 */
const STEP_9_TYPE = "checkpoint";
const STEP_9_QUESTION = <FormattedMessage
    defaultMessage="Each command word that we want the model to identify must have its own class"
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step9.question`}
    values={{
        linebreak: <br />,
    }}
/>;
const STEP_9_QUESTION_TYPE = 'single'; // text, multiple, single
const STEP_9_CORRECT_ANSWERS = ['A'];
const STEP_9_POSSIBLE_ANSWERS = [
    { text: 'A', textOption: 'True' },
    { text: 'B', textOption: 'False' },
];

/* Step 10 */
const STEP_10_TYPE = "info";
const STEP_10_DESCRIPTION = <FormattedMessage
    defaultMessage={`Repeat these steps again to add at least two more different commands to your data model. 
    Each command will need a new class to be created. {linebreak}{linebreak}

    For example, we have created three more classes for the following commands – {boldBackwards}, {boldLeft} and {boldRight}. 
    But you could create commands for other actions that Marty can do like dancing or kicking.{linebreak}{linebreak}

    When you are finished, you should have at least four different classes of datasets 
    containing audio clips of the background noise and your voice saying the command words out loud.`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step10.description`}
    values={{
        linebreak: <br />,
        boldBackwards: <b>Backwards</b>,
        boldLeft: <b>Left</b>,
        boldRight: <b>Right</b>
    }}
/>;
const STEP_10_HINT = {
    description: <FormattedMessage
        defaultMessage="Remember to click on the blue recording button after you have created the class to record your voice saying the command word."
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step9.hint.description`}
        values={{
            linebreak: <br />,
        }}
    />,
    image: `${BUCKET_URL}Hint7.png`,
    // video: `${BUCKET_URL}collect-data-for-classes.mp4`
};

/* Step 11 */
const STEP_11_TYPE = "info";
const STEP_11_DESCRIPTION = <FormattedMessage
    defaultMessage={`Now we have created and recorded audio clips for each class in our data model, it’s time to begin training our computers. {linebreak}{linebreak} 
    
    💡 {em1}{linebreak}{linebreak}
    
    Click on the Train button to begin this process. This may take a few minutes.`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step11.description`}
    values={{
        linebreak: <br />,
        em1: <em>Training is the process of feeding the datasets into the computer so that it can begin to tell the difference between your voice saying Forward or Left. All audio recordings that have been captured for the Forward class are labelled with the class name and the computer can begin to identify patterns so that it can tell the difference between the different sound waves. </em>
    }}
/>;
const STEP_11_IMAGE = `${BUCKET_URL}Step8.png`;

/* Step 12 */
const STEP_12_TYPE = "info";
const STEP_12_DESCRIPTION = <FormattedMessage
    defaultMessage={`Let’s check our data model has been trained correctly! {linebreak}{linebreak}

    ✨ {emTesting} our data model before we start coding is important so that we can see how accurate our data 
    model is and will help you with deciding if the datasets need more data to increase accuracy.{linebreak}{linebreak}

    Click on the {boldRun} button where you will see the computer predict which command word you are currently saying. 
    The higher the percentage, the more confident the computer is that you are saying that command word.
    Say each command word out loud and make sure the correct command word increases in confidence. {linebreak}{linebreak}

    Click on the {boldStopButton} when you are finished testing.`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step12.description`}
    values={{
        linebreak: <br />,
        boldCode: <b>Code</b>,
        boldML: <b>ML</b>,
        emTesting: <em>Testing</em>,
        emAccurate: <em>accurate</em>,
        boldRun: <b>Run</b>,
        boldStopButton: <b>blue stop button</b>
    }}
/>;
const STEP_12_HINT = {
    description: <FormattedMessage
        defaultMessage={`If a command word has a high percentage, this means the computer is more confident that this is the 
        command word that you have said out loud. After you say the word Forward, you want to make sure that the confidence 
        for this word is above 70% as shown below.`}
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step12.hint.description`}
        values={{
            linebreak: <br />,

        }}
    />,
    image: `${BUCKET_URL}Hint9.png`,
};

/* Step 13 */
const STEP_13_TYPE = "checkpoint";
const STEP_13_QUESTION = <FormattedMessage
    defaultMessage="What does it mean if the percentage for a command word is low?"
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step13.question`}
    values={{
        linebreak: <br />,
    }}
/>;
const STEP_13_QUESTION_TYPE = 'single'; // text, multiple, single
const STEP_13_CORRECT_ANSWERS = ['C'];
const STEP_13_POSSIBLE_ANSWERS = [
    { text: 'A', textOption: 'The model is confident that this is the command being said' },
    { text: 'B', textOption: 'The model has previously heard this command word ' },
    { text: 'C', textOption: 'The model is less confident that this is the command being said' },
    { text: 'D', textOption: 'The model has not previously heard this command word' },
];

/* Step 14 */
const STEP_14_TYPE = "info";
const STEP_14_DESCRIPTION = <FormattedMessage
    defaultMessage={`Not happy with the predictions that your data model is making?{linebreak}{linebreak}

    ✨ Even after training, the data model may not always be accurate with the predictions that it makes. 
    This can be because there is not enough data for each class or the data recorded for that command 
    word may not be clear or different enough to the other classes. {linebreak}{linebreak}
    
    If there is a class that wasn’t working very well when you were testing, review the audio recordings 
    for that class and consider adding some more data by recording new clips by clicking on the 
    {blueRecordButton} for that class. `}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step14.description`}
    values={{
        linebreak: <br />,
        blueRecordButton: <b>blue record button</b>
    }}
/>;
const STEP_14_HINT = {
    description: <FormattedMessage
        defaultMessage={`You may not need to add data to all classes but if there is one that wasn’t working very well, 
        you should look at adding some more data to this class. 
        Remember for each class you will need to say the command word out loud when recording. `}
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step14.hint.description`}
        values={{
            linebreak: <br />,
        }}
    />,
    image: `${BUCKET_URL}Hint10.png`,
};

/* Step 15 */
const STEP_15_TYPE = "info";
const STEP_15_DESCRIPTION = <FormattedMessage
    defaultMessage={`When you are happy with the datasets for each class, click on the {boldTrain} 
    button again to update your model with the latest data.{linebreak}{linebreak}

    When you are finished and happy with your trained data model, click on the {boldSave} button. {linebreak}{linebreak}
    
    💡 {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step15.description`}
    values={{
        linebreak: <br />,
        boldTrain: <b>Train</b>,
        boldSave: <b>Save</b>,
        em1: <em>Once you have clicked the Save button, you cannot return and edit your data model.</em>
    }}
/>;
const STEP_15_IMAGE = `${BUCKET_URL}Step11.png`;

/* Step 16 */
const STEP_16_TYPE = "info";
const STEP_16_DESCRIPTION = <FormattedMessage
    defaultMessage={`Time for some coding! {linebreak}{linebreak}

    Click on the Code tab near the top of the screen. {linebreak}{linebreak}

    For this activity we will need to use some coding blocks from the ML (machine learning) section. 
    Click on the {boldML} section on the left-hand side to see what coding blocks we can use to interact with our trained data model.
`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step16.description`}
    values={{
        linebreak: <br />,
        boldML: <b>ML</b>,
        boldCode: <b>Code</b>
    }}
/>;
const STEP_16_HINT = {
    description: <FormattedMessage
        defaultMessage={`On the left-hand side are all the different types of coding blocks that you can use with Marty in MartyBlocks. 
        Near the bottom of the list is one called ML with a pair of Marty eyes as the icon. Click on this button to see the machine learning coding blocks.`}
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step16.hint.description`}
        values={{
            linebreak: <br />,
            boldML: <b>ML</b>,
        }}
    />,
    image: `${BUCKET_URL}Hint12.png`,
};

/* Step 17 */
const STEP_17_TYPE = "info";
const STEP_17_DESCRIPTION = <FormattedMessage
    defaultMessage={`We’re going to be adding to the program that we started creating at the beginning of this activity. {linebreak}{linebreak}

    Add the {boldLoadML} block onto the end of the current program. Make sure to select the name of your model which is Commands.{linebreak}{linebreak}
    
    Then drag out the {boldConfThresh} block and attach this to the bottom of the program. Change the value to {boldPointEight}{linebreak}{linebreak}
    
    ✨ The {emConfidenceThreshold} means that the model must be at least 80% sure of the {emPrediction} of what command the 
    computer thinks has been said before it will use the prediction in our program. This will stop any predictions 
    being sent to our program that might not be very accurate.`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step17.description`}
    values={{
        linebreak: <br />,
        boldLoadML: <b>Load Machine Learning model</b>,
        boldConfThresh: <b>set confidence threshold</b>,
        boldPointEight: <b>0.8</b>,
        emConfidenceThreshold: <em>confidence threshold</em>,
        emPrediction: <em>prediction</em>
    }}
/>;
const STEP_17_HINT = {
    // description: <FormattedMessage
    //     defaultMessage={``}
    //     description=""
    //     id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step17.hint.description`}
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
    defaultMessage={`To avoid Marty being given predictions from the data model all the time, we can set it to only send a prediction every second. 
    This will mean we are not constantly sending Marty instructions to respond and move.{linebreak}{linebreak}

    Add the {boldLabel} block to your program and make sure the drop down is set to 1.{linebreak}{linebreak}
    
    Click on the {boldGreenFlag} in Scratch to run your code and ensure that the model has been loaded into the program. `}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step18.description`}
    values={{
        linebreak: <br />,
        boldLabel: <b>Label once every … seconds</b>,
        boldGreenFlag: <b>green flag</b>
    }}
/>;
const STEP_18_HINT = {
    // description: <FormattedMessage
    //     defaultMessage={``}
    //     description=""
    //     id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step18.hint.description`}
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
    defaultMessage={`Now we need to decide how Marty will respond to the different command words being said. {linebreak}{linebreak}

    Staying in the ML coding block category, drag out the {boldWhenReceivedSoundLabel} block. 
    This is an {boldEvent} block so does not need to attach to any of the other blocks we currently have in our program. 
    Change the dropdown option to {boldForward}.{linebreak}{linebreak}
    
    Go to the {boldMotion} blocks and drag out the {boldWalk2StepsForward} block and attach this to the new {boldEvent} block we have just found. 
    When the command {boldForward} has been detected, Marty will then take 2 steps forwards. `}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step19.description`}
    values={{
        linebreak: <br />,
        boldWhenReceivedSoundLabel: <b>when received sound label</b>,
        boldEvent: <b>event</b>,
        boldForward: <b>Forward</b>,
        boldMotion: <b>Motion</b>,
        boldWalk2StepsForward: <b>Walk 2 steps forwards</b>,
    }}
/>;
const STEP_19_HINT = {
    // description: <FormattedMessage
    //     defaultMessage={``}
    //     description=""
    //     id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step19.hint.description`}
    //     values={{
    //         linebreak: <br />,
    //         b: (...chunks) => <b>{chunks}</b>,
    //     }}
    // />,
    image: `${BUCKET_URL}Hint15.png`,
};

/* Step 20 */
const STEP_20_TYPE = "checkpoint";
const STEP_20_QUESTION = <FormattedMessage
    defaultMessage="Which of the following is an example of an event coding block?"
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step20.question`}
    values={{
        linebreak: <br />,
    }}
/>;
const STEP_20_QUESTION_TYPE = 'single'; // text, multiple, single
const STEP_20_CORRECT_ANSWERS = ['C'];
const STEP_20_POSSIBLE_ANSWERS = [
    { text: 'A', textOption: 'Get ready' },
    { text: 'B', textOption: 'Walk 2 steps forwards' },
    { text: 'C', textOption: 'When received sound label forward' },
    { text: 'D', textOption: 'Slide 1 times to the left' },
];


/* Step 21 */
const STEP_21_TYPE = "info";
const STEP_21_DESCRIPTION = <FormattedMessage
    defaultMessage={`✨ By using voice commands, you are creating a {em1} where we are in full control of 
    Marty’s movements rather than using sensors to make decisions about what direction to move in. 
    These robotic systems are widely used, particularly for {emExploration} of environments that may not be easy or 
    safe for humans to go to such as deep underwater!{linebreak}{linebreak}

    Repeat the previous step for each of the command words that you have trained your model to identify. {linebreak}{linebreak}
    
    💡 {em2}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step21.description`}
    values={{
        linebreak: <br />,
        em1: <em>remotely operated vehicle/robot</em>,
        emExploration: <em>exploration</em>,
        em2: <em>Remember that each command word will require a new event block with the correct label so it 
        does not need to attach to any of the previous blocks that have been added to your program.</em>,

    }}
/>;
const STEP_21_HINT = {
    description: <FormattedMessage
        defaultMessage={`Each program may look different based on the command words that the model has been trained with. 
        The image below is how Marty should respond to the following command words – Forward, Back, Left and Right.`}
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step21.hint.description`}
        values={{
            linebreak: <br />,
            boldML: <b>Machine Learning</b>,
            boldImageIcon: <b>image icon</b>,
        }}
    />,
    image: `${BUCKET_URL}Hint16.png`,
    waitTime: 3000
};

/* Step 22 */
const STEP_22_TYPE = "info";
const STEP_22_DESCRIPTION = <FormattedMessage
    defaultMessage={`Test your program! {linebreak}{linebreak}
    Click on the {boldGreenFlag} in Scratch to run your program. Check how Marty responds when you say the different command words!{linebreak}{linebreak}
    
    {bold1}{linebreak}{linebreak}

    💡 {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step22.description`}
    values={{
        linebreak: <br />,
        boldGreenFlag: <b>green flag</b>,
        em1: <em>Click on the checkbox beside the sound label block to see the live predictions being used in your program, 
            this might help you with debugging your code to make sure it is working correctly!</em>,
        bold1: <b>Remember that your program uses the microphone on your device so your voice needs to be heard clearly by your device and not by Marty!</b>,

    }}
/>;
const STEP_22_HINT = {
    // description: <FormattedMessage
    //     defaultMessage={`Each program may look different based on the command words that the model has been trained with. 
    //     The image below is how Marty should respond to the following command words – Forward, Back, Left and Right.`}
    //     description=""
    //     id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step22.hint.description`}
    //     values={{
    //         linebreak: <br />,
    //         boldML: <b>Machine Learning</b>,
    //         boldImageIcon: <b>image icon</b>,
    //     }}
    // />,
    image: `${BUCKET_URL}Hint17.png`,
    waitTime: 3000
};

/* Step 23 */
const STEP_23_TYPE = "info";
const STEP_23_DESCRIPTION = <FormattedMessage
    defaultMessage={`🎉 {bold1} {linebreak}{linebreak}

    Extend this project further by creating a maze for Marty to escape from using your voice commands. 
    This can be drawn on paper with pen or pencil or you could get creative and use some cardboard to build a 3D maze. {linebreak}{linebreak}

    ⚡️ If you’re working in a group, try swapping mazes with someone else and see how quickly you can use your voice commands to help Marty escape! {linebreak}{linebreak}

    ⚡️ The people in charge of remotely operated vehicles/robots do not have a bird’s eye view of the environment the robot is in like we do. 
    They must rely on a live camera feed from the front of the robot! Try sitting level with Marty so that you can’t 
    see the full maze all at once to make it harder to escape the maze. `}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step23.description`}
    values={{
        linebreak: <br />,
        bold1: <b>Excellent work! You have made a machine learning model that can identify command words that you say out loud that controls Marty’s movements!</b>,
    }}
/>;

// End Step
const END_STEP_TYPE = "end";
const END_STEP_IMAGE = `${BUCKET_URL}Final+Solution.png`;
const END_STEP_DESCRIPTION = <FormattedMessage
    defaultMessage={`{em1} {linebreak}{linebreak}

    {em2}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-captains-orders.step_end.description`}
    values={{
        linebreak: <br />,
        em1: <em>When the green flag is clicked and the program starts up, the machine learning model is 
            loaded with a confidence threshold set so that only predictions with a confidence of 
            80% or greater are used in the program to control Marty. Every second the program will label live audio data.</em>,
        em2: <em>The other sections of the program contain event blocks that identify what Marty should do when each command has 
            been identified using motion blocks. This section may look different for each person depending on the 
            command words that have been trained in the data model.</em>
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
            },
            {
                type: STEP_5_TYPE,
                description: STEP_5_DESCRIPTION,
                hint: STEP_5_HINT,
            },
            {
                type: STEP_6_TYPE,
                question: STEP_6_QUESTION,
                questionType: STEP_6_QUESTION_TYPE,
                correctAnswers: STEP_6_CORRECT_ANSWERS,
                possibleAnswers: STEP_6_POSSIBLE_ANSWERS,
            },
            {
                type: STEP_7_TYPE,
                description: STEP_7_DESCRIPTION,
                image: STEP_7_IMAGE,
            }, 
            {
                type: STEP_8_TYPE,
                description: STEP_8_DESCRIPTION,
                image: STEP_8_IMAGE,
            }, 
            {
                type: STEP_9_TYPE,
                question: STEP_9_QUESTION,
                questionType: STEP_9_QUESTION_TYPE,
                correctAnswers: STEP_9_CORRECT_ANSWERS,
                possibleAnswers: STEP_9_POSSIBLE_ANSWERS,
            },
            {
                type: STEP_10_TYPE,
                description: STEP_10_DESCRIPTION,
                hint: STEP_10_HINT
            }, 
            {
                type: STEP_11_TYPE,
                description: STEP_11_DESCRIPTION,
                image: STEP_11_IMAGE,
            },
            {
                type: STEP_12_TYPE,
                description: STEP_12_DESCRIPTION,
                hint: STEP_12_HINT
            }, 
            {
                type: STEP_13_TYPE,
                question: STEP_13_QUESTION,
                questionType: STEP_13_QUESTION_TYPE,
                correctAnswers: STEP_13_CORRECT_ANSWERS,
                possibleAnswers: STEP_13_POSSIBLE_ANSWERS,
            },
            {
                type: STEP_14_TYPE,
                description: STEP_14_DESCRIPTION,
                hint: STEP_14_HINT
            }, 
            {
                type: STEP_15_TYPE,
                description: STEP_15_DESCRIPTION,
                image: STEP_15_IMAGE
            },
            {
                type: STEP_16_TYPE,
                description: STEP_16_DESCRIPTION,
                hint: STEP_16_HINT
            },
            {
                type: STEP_17_TYPE,
                description: STEP_17_DESCRIPTION,
                hint: STEP_17_HINT
            },
            {
                type: STEP_18_TYPE,
                description: STEP_18_DESCRIPTION,
                hint: STEP_18_HINT
            },
            {
                type: STEP_19_TYPE,
                description: STEP_19_DESCRIPTION,
                hint: STEP_19_HINT
            },
            {
                type: STEP_20_TYPE,
                question: STEP_20_QUESTION,
                questionType: STEP_20_QUESTION_TYPE,
                correctAnswers: STEP_20_CORRECT_ANSWERS,
                possibleAnswers: STEP_20_POSSIBLE_ANSWERS, 
            },
            {
                type: STEP_21_TYPE,
                description: STEP_21_DESCRIPTION,
                hint: STEP_21_HINT
            },
            {
                type: STEP_22_TYPE,
                description: STEP_22_DESCRIPTION,
                hint: STEP_22_HINT
            },
            {
                type: END_STEP_TYPE,
                image: END_STEP_IMAGE,
                description: END_STEP_DESCRIPTION,
            },
            {
                type: STEP_23_TYPE,
                description: STEP_23_DESCRIPTION,
            },

        ]
    },
}
