import React from 'react';
import { FormattedMessage } from 'react-intl';

const BUCKET_URL = "https://roboticalpublic.s3.eu-west-1.amazonaws.com/marty-blocks-student-led-lessons/type-lesson-ml-farming-robots/";
const LESSON_COVER_IMG = `${BUCKET_URL}Cover+Image.png`;
// Lesson properties
const LESSON_NAME = <FormattedMessage
    defaultMessage={"Farming Robots"}
    description={""}
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.name`}
/>
const LESSON_KEY = "type-lesson-ml-farming-robots"; // The key needs to start with type-lesson so it can be identified as a lesson
const LESSON_TYPE = "lesson";
const LESSON_DESCRIPTION = <FormattedMessage
    defaultMessage={`{bold1} {linebreak}{linebreak}
    {boldRequirements} Marty the Robot, a computer or tablet that has access to a camera/webcam, some paper and colouring in pens/pencils. {linebreak}{linebreak}
    {boldTargetAudience} 10-14 years / Intermediate. {linebreak}{linebreak}
    {boldEstimatedTime} 50-60 minutes.`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.description`}
    values={{
        linebreak: <br />,
        bold1: <b>Use the power of machine learning to help Marty carefully move around a field to water crops and plants without stepping on them!</b>,
        boldRequirements: <b>For this activity you will need the following:</b>,
        boldTargetAudience: <b>Target Audience (age/stage):</b>,
        boldEstimatedTime: <b>Estimated time to complete:</b>
    }}
/>;
//Machine Learning, Image Modelling, Agri-Tech, Training, Dataset, Conditions
const LESSON_TAGS = ['Machine Learning', 'Image Modelling', 'Agri-Tech', 'Training', 'Dataset', 'Conditions']

/* Step 1 */
const STEP_1_TYPE = "info";
const STEP_1_DESCRIPTION = <FormattedMessage
    defaultMessage={`Let’s get started by making sure that Marty has been connected correctly and is ready to move. {linebreak}{linebreak}
    
    Click on the {boldEvents} category and drag out the {boldGreenFlag} block into the centre of the screen. Then attach a block from the {boldMotion} category that tells Marty to {boldGetReady}. {linebreak}{linebreak}
    
    💡 {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step1.description`}
    values={{
        linebreak: <br />,
        boldGreenFlag: <b>when green flag clicked</b>,
        boldEvents: <b>Events</b>,
        boldMotion: <b>Motion</b>,
        boldGetReady: <b>get ready</b>,
        em1: <em>Test your program by clicking on the green flag in Scratch, Marty should then stand to attention by straightening their arms and legs, ready for the next instruction! If Marty does not move, then please check you have correctly connected your robot.</em>,
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
    defaultMessage={`Using the menu along the top of the screen, click on the tab called {boldMachineLearning} 
    and click {boldAllow} on the popup so that your webcam can be used for this activity.{linebreak}{linebreak}

    ✨ This is the section where we will be creating a new model that will be used to teach Marty what different
     crops look like that will need to be watered. To do this we will need to create groups or classes of data 
     for each crop/plant that we want Marty to be able to recognise. Each class will be made up of a dataset 
     showing examples of these crops and plants. {linebreak}{linebreak}

     Fill in the {boldModelName} to be {boldFarm} as shown in the image below and the first class we are going to create is going 
     to be called {boldCarrots}. Now click on the {boldBluePlusButton} to create this class for our farm model. 
`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step2.description`}
    values={{
        linebreak: <br />,
        boldMachineLearning: <b>Machine Learning</b>,
        boldAllow: <b>Allow</b>,
        boldBluePlusButton: <b>blue + button</b>,
        boldModelName: <b>Model Name</b>,
        boldFarm: <b>Farm</b>,
        boldCarrots: <b>Carrots</b>,
    }}
/>;
const STEP_2_IMAGE = `${BUCKET_URL}Step2.png`;
const STEP_2_HINT = {
    description: <FormattedMessage
        defaultMessage="You will find this information and buttons underneath the live camera on your screen."
        description=""
        id="gui.howtos.lessons.type-lesson-ml-farming-robots.step2.hint.description"
        values={{ linebreak: <br />, }}
    />,
    // image: 'https://roboticalpublic.s3.eu-west-1.amazonaws.com/martyblocks-tutorials/create-model.png',
    waitTime: 15000 // in milliseconds
};
/* Step 3 */
const STEP_3_TYPE = "info";
const STEP_3_DESCRIPTION = <FormattedMessage
    defaultMessage={`The first crop we will be teaching Marty to recognise is carrots. {linebreak}{linebreak}

    ✨ You are going to capture lots of images of carrots. These images will create a
     dataset that Marty will use to predict when there is a carrot in front of them. 
     To do this, we will be training Marty using the dataset you are about to create. 
     The bigger the dataset for training, the more accurate Marty’s predictions will be 
     when we test our data model later. {linebreak}{linebreak}
    
    Draw a picture of a carrot on some paper – this will be what you will hold 
    up to the camera to help create a dataset of carrot images. If you are working in a group, 
    you could each draw your own carrot that can be used to create the dataset.`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step3.description`}
    values={{
        linebreak: <br />,
    }}
/>;

/* Step 4 */
const STEP_4_TYPE = "info";
const STEP_4_DESCRIPTION = <FormattedMessage
    defaultMessage={`When you are ready, click on the {boldBlueRecordingButton} beside {boldCarrots} and you 
    will see this box fill up with images from your camera. You can stop adding data to the {boldCarrots} 
    class by clicking on the {boldStopButton}. Not happy with some of the images? Hover over them and 
    click on the {boldDeleteButton} to remove them from the dataset.{linebreak}{linebreak}

    💡 {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step4.description`}
    values={{
        linebreak: <br />,
        boldBlueRecordingButton: <b>blue recording button</b>,
        boldCarrots: <b>Carrots</b>,
        boldStopButton: <b>stop button</b>,
        boldDeleteButton: <b>delete button</b>,
        em1: <em>Remember to hold up your drawing of carrots to the camera when you click record.
            We recommend that you record at least 30 images of your drawings.</em>
    }}
/>;
const STEP_4_IMAGE = `${BUCKET_URL}Step4.png`;
const STEP_4_HINT = {
    description: <FormattedMessage
        defaultMessage="Remember that the images you are capturing should be of the carrot drawing you made earlier!"
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step4.hint.description`}
        values={{
            linebreak: <br />,
        }}
    />,
};

/* Step 5 -- check */
const STEP_5_TYPE = "checkpoint";
const STEP_5_QUESTION = <FormattedMessage
    defaultMessage="What type of media is being used to create the datasets for our machine learning model?"
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step5.question`}
    values={{
        linebreak: <br />,
    }}
/>;
const STEP_5_QUESTION_TYPE = 'single'; // text, multiple, single
const STEP_5_CORRECT_ANSWERS = ['C'];
const STEP_5_POSSIBLE_ANSWERS = [
    { text: 'A', textOption: 'Audio' },
    { text: 'B', textOption: 'Text' },
    { text: 'C', textOption: 'Images' },
    { text: 'D', textOption: 'Video' },
];

/* Step 6 */
const STEP_6_TYPE = "info";
const STEP_6_DESCRIPTION = <FormattedMessage
    defaultMessage={`Repeat that step for one more type of crop or plant of your choice. Here are some examples of 
    crops and plants you could choose – sunflowers, tomatoes, sweetcorn, or cucumber. {linebreak}{linebreak}

    Remember to give the class a name first before clicking on the blue + button to create it. {linebreak}{linebreak}
    
    You are then ready to record images that will form the dataset for this class using the {boldBlueRecordingButton}.`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step6.description`}
    values={{
        linebreak: <br />,
        boldBlueRecordingButton: <b>blue recording button</b>,
    }}
/>;
const STEP_6_HINT = {
    description: <FormattedMessage
        defaultMessage="To add images to the class dataset, click on the blue record button"
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step6.hint.description`}
        values={{ linebreak: <br />, }}
    />,
    image: `${BUCKET_URL}Hint5.png`,
    // video: `${BUCKET_URL}collect-data-for-classes.mp4`
};

/* Step 7 */
const STEP_7_TYPE = "info";
const STEP_7_DESCRIPTION = <FormattedMessage
    defaultMessage={`There’s one more class that we need to add to our data model. {linebreak}{linebreak}

    ✨ As we are holding up paper to the camera to show what crops like carrots look like, 
    we should also include a class to show what the camera feed looks like when we are not 
    holding up any drawings of crops. Otherwise, even if when we are not holding up any drawings, 
    the model will still be trying to predict which crop it can see! {linebreak}{linebreak}
    
    Add one more class called {boldNothing} and add images to that class where you are not holding up any drawings of crops/plants. `}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step7.description`}
    values={{
        linebreak: <br />,
        boldNothing: <b>Nothing</b>
    }}
/>;
const STEP_7_IMAGE = `${BUCKET_URL}Step6.png`;
const STEP_7_HINT = {
    description: <FormattedMessage
        defaultMessage="Remember that for the Nothing class, this should include images of you without holding up any drawings of crops."
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step7.hint.description`}
        values={{ linebreak: <br />, }}
    />,
    // video: `${BUCKET_URL}collect-data-for-classes.mp4`
};

/* Step 8 */
const STEP_8_TYPE = "checkpoint";
const STEP_8_QUESTION = <FormattedMessage
    defaultMessage="How many classes have been created for this project?"
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step8.question`}
    values={{
        linebreak: <br />,
    }}
/>;
const STEP_8_QUESTION_TYPE = 'single'; // text, multiple, single
const STEP_8_CORRECT_ANSWERS = ['B'];
const STEP_8_POSSIBLE_ANSWERS = [
    { text: 'A', textOption: '2' },
    { text: 'B', textOption: '3' },
    { text: 'C', textOption: '4' },
    { text: 'D', textOption: '5' },
];

/* Step 9 */
const STEP_9_TYPE = "info";
const STEP_9_DESCRIPTION = <FormattedMessage
    defaultMessage={`Now that we have our classes of data created, we need to train Marty using this data. {linebreak}{linebreak}

    ✨ {emTraining} is the process of feeding the computer the data that has been collected and grouped. 
    In our case, we have images of different crops and plants. Every image in the datasets have been 
    {emLabelled} based on the class they are in so that the computer knows when we give it each image what 
    it is an example of. {linebreak}{linebreak}
    
    Click on the {boldTrain} button to begin the training process – be patient as this may take a few minutes!`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step9.description`}
    values={{
        linebreak: <br />,
        emTraining: <em>Training</em>,
        emLabelled: <em>labelled</em>,
        boldTrain: <b>Train</b>
    }}
/>;
const STEP_9_IMAGE = `${BUCKET_URL}Step7.png`;

/* Step 10 */
const STEP_10_TYPE = "info";
const STEP_10_DESCRIPTION = <FormattedMessage
    defaultMessage={`Testing time!{linebreak}{linebreak}

    ✨ {emTesting} will allow us to quickly see how {emAccurate} our model is for predicting what crop is being shown through the camera. 
    The model will tell us how {emConfident} it is about whether the current image from your camera is a crop or plant 
    based on the data from the training process. {linebreak}{linebreak}
    
    Click on the {boldRun} button and try holding up your pictures of different crops and plants to make sure it predicts 
    the outcome correctly. Don’t forget to also check what the prediction is when you are not holding up any 
    drawings of crops! {linebreak}{linebreak}

    💡 {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step10.description`}
    values={{
        linebreak: <br />,
        boldRun: <b>Run</b>,
        emTesting: <em>Testing</em>,
        emAccurate: <em>accurate</em>,
        emConfident: <em>confident</em>,

        em1: <em>Don’t worry if your model is not very accurate, you will have a chance to make changes to it in the next step!</em>
    }}
/>;
const STEP_10_IMAGE = `${BUCKET_URL}Step8.png`;

/* Step 11 */
const STEP_11_TYPE = "info";
const STEP_11_DESCRIPTION = <FormattedMessage
    defaultMessage={`After testing you may have found that your model is not very accurate!{linebreak}{linebreak}

    Click on the {boldStop} so that your model is no longer being tested. {linebreak}{linebreak}
    
    You can now return to the classes that you previously made to add more images or 
    remove any that you think might be confusing your data model from making an accurate prediction.{linebreak}{linebreak}
    
    When you are happy with the datasets, remember to click on the {boldTrain} button again to update your model.`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step11.description`}
    values={{
        linebreak: <br />,
        boldStop: <b>stop button</b>,
        boldTrain: <b>Train</b>
    }}
/>;
const STEP_11_HINT = {
    description: <FormattedMessage
        defaultMessage="To add more images to a class in your model, click on the {boldBlueRecordButton}."
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step11.hint.description`}
        values={{
            linebreak: <br />,
            boldBlueRecordButton: <b>blue record button</b>
        }}
    />,
    image: `${BUCKET_URL}Hint9.png`,
};

/* Step 12 */
const STEP_12_TYPE = "checkpoint";
const STEP_12_QUESTION = <FormattedMessage
    defaultMessage="What happens to the accuracy of the model as the amount of data used to train it increases?"
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step12.question`}
    values={{
        linebreak: <br />,
    }}
/>;
const STEP_12_QUESTION_TYPE = 'single'; // text, multiple, single
const STEP_12_CORRECT_ANSWERS = ['C'];
const STEP_12_POSSIBLE_ANSWERS = [
    { text: 'A', textOption: 'Accuracy decreases' },
    { text: 'B', textOption: 'Accuracy stays the same' },
    { text: 'C', textOption: 'Accuracy increases' },
];

/* Step 13 */
const STEP_13_TYPE = "info";
const STEP_13_DESCRIPTION = <FormattedMessage
    defaultMessage={`When you are happy with your model, it’s time to save it so that we can begin coding.{linebreak}{linebreak}

    Click on the {boldSave} button.{linebreak}{linebreak}
    
    💡 {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step13.description`}
    values={{
        linebreak: <br />,
        boldSave: <b>Save</b>,
        em1: <em>Once you have done this step, you cannot change your model so make sure you have tested it again using the Run button.</em>
    }}
/>;
const STEP_13_IMAGE = `${BUCKET_URL}Step10.png`

/* Step 14 */
const STEP_14_TYPE = "info";
const STEP_14_DESCRIPTION = <FormattedMessage
    defaultMessage={`It’s time to start coding!{linebreak}{linebreak}

    Click on the {boldCode} tab near the top of the screen.{linebreak}{linebreak}
    
    For this activity we will need to use some coding blocks from the ML (machine learning) section. 
    Click on the {boldML} section on the left-hand side to see what coding blocks we can use to 
    interact with our trained data model.`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step14.description`}
    values={{
        linebreak: <br />,
        boldCode: <b>Code</b>,
        boldML: <b>ML</b>
    }}
/>;
const STEP_14_HINT = {
    description: <FormattedMessage
        defaultMessage={`On the left-hand side are all the different types of coding 
        blocks that you can use with Marty in Scratch. Near the bottom of the list 
        is one called {boldML} with a pair of Marty eyes as the icon. Click on this button to 
        see the machine learning coding blocks.`}
        description=""
        id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step14.hint.description`}
        values={{
            linebreak: <br />,
            boldML: <b>ML</b>
        }}
    />,
    image: `${BUCKET_URL}Hint11.png`,
}

/* Step 15 */
const STEP_15_TYPE = "info";
const STEP_15_DESCRIPTION = <FormattedMessage
    defaultMessage={`We are going to add 2 blocks to the program that we have started creating earlier.  {linebreak}{linebreak}

    Drag out the {boldLoadML} block and select the Farm data model from the drop down. 
    Attach this to the Get Ready block we added earlier. {linebreak}{linebreak}
    
    Then drag out the {boldConfThresh} block and attach this to the bottom of our program. 
    Change the value to {boldPointEight} {linebreak}{linebreak}
    
    ✨ The {emConfidenceThreshold} means that the model must be at least 80% sure of the {emPrediction} it’s about 
    to make before it shares this prediction with the program. This reduces the chance of the program 
    receiving any predictions that are not very accurate.`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step15.description`}
    values={{
        linebreak: <br />,
        boldLoadML: <b>Load Machine Learning model</b>,
        boldConfThresh: <b>set confidence threshold</b>,
        boldPointEight: <b>0.8</b>,
        emConfidenceThreshold: <em>confidence threshold</em>,
        emPrediction: <em>prediction</em>
    }}
/>;
const STEP_15_HINT = {
    // description: <FormattedMessage
    //     defaultMessage={`If a command word has a high percentage, this means the computer is more confident that this is the 
    //     command word that you have said out loud. After you say the word Forward, you want to make sure that the confidence 
    //     for this word is above 70% as shown below.`}
    //     description=""
    //     id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step15.hint.description`}
    //     values={{
    //         linebreak: <br />,

    //     }}
    // />,
    image: `${BUCKET_URL}Hint12.png`,
};

/* Step 16 */
const STEP_16_TYPE = "info";
const STEP_16_DESCRIPTION = <FormattedMessage
    defaultMessage={`Add the {boldTurnVideoOn} block to our program.{linebreak}{linebreak}

    This will let you see the image that is being used by the data model to make a 
    prediction on what crop is being shown, if any! To see the video feed from your 
    camera click on the button in the top right corner that has been highlighted 
    in the image below.`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step16.description`}
    values={{
        linebreak: <br />,
        boldTurnVideoOn: <b>turn video on</b>
    }}
/>;
const STEP_16_IMAGE = `${BUCKET_URL}Step13.png`;
const STEP_16_HINT = {
    // description: <FormattedMessage
    //     defaultMessage={`You may not need to add data to all classes but if there is one that wasn’t working very well, 
    //     you should look at adding some more data to this class. 
    //     Remember for each class you will need to say the command word out loud when recording. `}
    //     description=""
    //     id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step16.hint.description`}
    //     values={{
    //         linebreak: <br />,
    //     }}
    // />,
    image: `${BUCKET_URL}Hint13.png`,
};

/* Step 17 */
const STEP_17_TYPE = "info";
const STEP_17_DESCRIPTION = <FormattedMessage
    defaultMessage={`To avoid Marty being given predictions from the data model all the time, we 
    can set it to only send a prediction every second. This will mean we are not constantly 
    sending Marty instructions to respond.{linebreak}{linebreak}

    Add the {boldLabel} block to your program and make sure the drop down is set to {boldOne}{linebreak}{linebreak}
    
    Click on the {boldGreenFlag} in Scratch to run your code so that the {boldFarm} model is correctly loaded into your program.`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step17.description`}
    values={{
        linebreak: <br />,
        boldLabel: <b>Label once every … seconds</b>,
        boldOne: <b>1</b>,
        boldGreenFlag: <b>green flag</b>,
        boldFarm: <b>Farm</b>
    }}
/>;
const STEP_17_HINT = {
    // description: <FormattedMessage
    //     defaultMessage={`You may not need to add data to all classes but if there is one that wasn’t working very well, 
    //     you should look at adding some more data to this class. 
    //     Remember for each class you will need to say the command word out loud when recording. `}
    //     description=""
    //     id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step17.hint.description`}
    //     values={{
    //         linebreak: <br />,
    //     }}
    // />,
    image: `${BUCKET_URL}Hint14.png`,
};

/* Step 18 */
const STEP_18_TYPE = "info";
const STEP_18_DESCRIPTION = <FormattedMessage
    defaultMessage={`There are two things we need to tell Marty to do. 
    Either walk forwards through the field because there are no crops that need watered, 
    or Marty must stop walking and move their arms to water the crop before sliding 
    to the side so not to step on top of the crop that has just been watered. {linebreak}{linebreak}

    To get us started we will need a {boldForever} loop to keep Marty moving. 
    ]Drag out another {boldGreenFlag} block. Remember that since 
    this is an {boldEvent} block it does not need to attach onto the other coding 
    blocks that are currently on the screen. {linebreak}{linebreak}
    
    Attach a forever block from the {boldControl} category to the {boldGreenFlag} 
    block we have just added. `}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step18.description`}
    values={{
        linebreak: <br />,
        boldEvent: <b>event</b>,
        boldGreenFlag: <b>when green flag clicked</b>,
        boldForever: <b>forever</b>,
        boldControl: <b>Control</b>,
    }}
/>;
const STEP_18_HINT = {
    // description: <FormattedMessage
    //     defaultMessage={`On the left-hand side are all the different types of coding blocks that you can use with Marty in Scratch. 
    //     Near the bottom of the list is one called ML with a pair of Marty eyes as the icon. Click on this button to see the machine learning coding blocks.`}
    //     description=""
    //     id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step18.hint.description`}
    //     values={{
    //         linebreak: <br />,
    //         boldML: <b>ML</b>,
    //     }}
    // />,
    image: `${BUCKET_URL}Hint15.png`,
};

/* Step 19 */
const STEP_19_TYPE = "checkpoint";
const STEP_19_QUESTION = <FormattedMessage
    defaultMessage="When will the forever loop start running?"
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step19.question`}
    values={{
        linebreak: <br />,
    }}
/>;
const STEP_19_QUESTION_TYPE = 'single'; // text, multiple, single
const STEP_19_CORRECT_ANSWERS = ['B'];
const STEP_19_POSSIBLE_ANSWERS = [
    { text: 'A', textOption: 'As soon as Marty is turned on' },
    { text: 'B', textOption: 'When the green flag is clicked' },
    { text: 'C', textOption: 'When the user clicks on the space bar' },
    { text: 'D', textOption: 'When the model predicts that there is a crop on the camera' },
];


/* Step 20 */
const STEP_20_TYPE = "info";
const STEP_20_DESCRIPTION = <FormattedMessage
    defaultMessage={`Then we need to make a decision. Either Marty should walk forwards or prepare 
    to water the crop they have come across. {linebreak}{linebreak}

    To do this when coding, we need an if statement to help us decide which action to choose. 
    Add an {boldIfThenElse} block from the {boldControl} category to the {boldForever} loop.`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step20.description`}
    values={{
        linebreak: <br />,
        boldForever: <b>forever</b>,
        boldControl: <b>Control</b>,
        boldIfThenElse: <b>if .. then .. else</b>
    }}
/>;
const STEP_20_HINT = {
    // description: <FormattedMessage
    //     defaultMessage={``}
    //     description=""
    //     id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step20.hint.description`}
    //     values={{
    //         linebreak: <br />,
    //         b: (...chunks) => <b>{chunks}</b>,
    //     }}
    // />,
    image: `${BUCKET_URL}Hint16.png`,
};

/* Step 21 */
const STEP_21_TYPE = "info";
const STEP_21_DESCRIPTION = <FormattedMessage
    defaultMessage={`There are 3 different classes that we trained our model to recognise – Nothing, 
    Carrots and another crop/plant of your choice. {linebreak}{linebreak}

    We need to check whether the current image from the camera is a crop to help us decide what 
    movement Marty should do. There are 3 blocks we need to add to create a {boldCondition} in our {boldIfStatement}. 
    Between the {boldIfThen} add an or block from the {boldOperators} category.{linebreak}.{linebreak}
    
    The or block has two gaps either side of it. This is where we will place the labels for the 
    image we want our model to identify. Drag out two image any {boldDetected} blocks and place one into each 
    gap in the or block. Then change the dropdown for these blocks from any to the names of the 
    crops you trained your model to identify. {linebreak}{linebreak}
    
    💡 {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step21.description`}
    values={{
        linebreak: <br />,
        boldCondition: <b>condition</b>,
        boldIfStatement: <b>if statement</b>,
        boldIfThen: <b>if .. then</b>,
        boldOperators: <b>Operators</b>,
        boldDetected: <b>detected</b>,
        em1: <em>Wait for the gap to be highlighted with a yellow outline so that you place the coding block into the correct space!</em>
    }}
/>;
const STEP_21_HINT = {
    // description: <FormattedMessage
    //     defaultMessage={``}
    //     description=""
    //     id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step21.hint.description`}
    //     values={{
    //         linebreak: <br />,
    //         b: (...chunks) => <b>{chunks}</b>,
    //     }}
    // />,
    image: `${BUCKET_URL}Hint17.png`,
};

/* Step 22 */
const STEP_22_TYPE = "info";
const STEP_22_DESCRIPTION = <FormattedMessage
    defaultMessage={`Use the coding blocks from the {boldMotion} category to complete the if statement and program.{linebreak}.{linebreak} 

    If the crops have been detected by our model, then Marty should {boldWaveLeftArm} and {boldSlide} 
    to get out of the way of the crop after watering it. Else, 
    Marty should {boldWalk}. {linebreak}{linebreak}
    
    ✨ {emAgriTech}, also known as {emAgriculturalTechnology}, is becoming popular to help 
    farmers look after their crops and plants with the help of machines and drones to
     water or pick fruit and vegetables just like you have started to do with Marty in this activity!`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step22.description`}
    values={{
        linebreak: <br />,
        boldMotion: <b>Motion</b>,
        boldWaveLeftArm: <b>wave left arm</b>,
        boldSlide: <b>slide 2 times to the right</b>,
        boldWalk: <b>walk 2 steps forward</b>,
        emAgriTech: <em>Agri-tech</em>,
        emAgriculturalTechnology: <em>agricultural technology</em>,
    }}
/>;
const STEP_22_HINT = {
    // description: <FormattedMessage
    //     defaultMessage={``}
    //     description=""
    //     id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step22.hint.description`}
    //     values={{
    //         linebreak: <br />,
    //         b: (...chunks) => <b>{chunks}</b>,
    //     }}
    // />,
    image: `${BUCKET_URL}Hint18.png`,
};

/* Step 23 */
const STEP_23_TYPE = "checkpoint";
const STEP_23_QUESTION = <FormattedMessage
    defaultMessage="What is used when programming to help the computer make decisions?"
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step23.question`}
    values={{
        linebreak: <br />,
    }}
/>;
const STEP_23_QUESTION_TYPE = 'single'; // text, multiple, single
const STEP_23_CORRECT_ANSWERS = ['D'];
const STEP_23_POSSIBLE_ANSWERS = [
    { text: 'A', textOption: 'Event blocks' },
    { text: 'B', textOption: 'Logic blocks (or)' },
    { text: 'C', textOption: 'Forever loops' },
    { text: 'D', textOption: 'If statements' },
];


/* Step 24 */
const STEP_24_TYPE = "info";
const STEP_24_DESCRIPTION = <FormattedMessage
    defaultMessage={`Test your program! {linebreak}{linebreak}

    Click on the {boldGreenFlag} in Scratch to run your program. Check how Marty 
    responds when you hold up the pictures of different crops to the camera. {linebreak}{linebreak}
    
    💡 {em1}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step24.description`}
    values={{
        linebreak: <br />,
        boldGreenFlag: <b>green flag</b>,
        em1: <em>Click on the checkbox beside the <b>image label</b> block to see the live predictions being used in your program, 
            this might help you with debugging your code to make sure it is working correctly!</em>

    }}
/>;
const STEP_24_IMAGE = `${BUCKET_URL}Step19.png`;


/* Step 25 - Extention */
const STEP_25_TYPE = "info";
const STEP_25_DESCRIPTION = <FormattedMessage
    defaultMessage={`🎉 {bold1}{linebreak}{linebreak}

    You can test out your program further by creating a large grid using bits 
    of paper where some squares on the grid have a drawing of the crop you 
    have taught Marty to identify. Then use your program to control Marty’s 
    movements to move around the field you have designed. {linebreak}{linebreak}
    
    If you’re feeling extra creative, create a watering can that Marty can 
    hold whilst walking around. Remember that anything heavy being held 
    with one hand could cause Marty to become unbalanced!{linebreak}{linebreak}
    
    ⚡️ Does the current program help Marty to successfully water all crops 
    in the field you have designed without standing on any of them? {linebreak}{linebreak}
    
    ⚡️ Can you code Marty to respond to different crops in different ways? 
    Maybe sunflowers need more water than carrots!`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step25.description`}
    values={{
        linebreak: <br />,
        bold1: <b>Excellent work! You have used machine learning to help 
        Marty decide whether there is a crop in front of them that needs watering 
        as they walk through a field!</b>,
    }}
/>;
const STEP_25_IMAGE = `${BUCKET_URL}Step+Extension.png`

// End Step
const END_STEP_TYPE = "end";
const END_STEP_IMAGE = `${BUCKET_URL}Final+Solution.png`;
const END_STEP_DESCRIPTION = <FormattedMessage
    defaultMessage={`{em1} {linebreak}{linebreak}

    {em2}`}
    description=""
    id={`gui.howtos.lessons.type-lesson-ml-farming-robots.step_end.description`}
    values={{
        linebreak: <br />,
        em1: <em>There are two sections to this program. The first loads in the model that has been trained 
            and sets up the program to ensure that only predictions with a confidence level 80% or greater 
            are used in the program for each image that is predicted every second. </em>,
        em2: <em>The second section handles Marty’s movements. If the model identifies that there is currently a 
            crop being displayed through the camera, then Marty moves their arm to simulate watering the 
            crop and moves to the side so not to step on it. Otherwise, Marty will keep walking forwards 
            until another crop is found. </em>
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
            },
            {
                type: STEP_4_TYPE,
                description: STEP_4_DESCRIPTION,
                image: STEP_4_IMAGE,
                hint: STEP_4_HINT,
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
                hint: STEP_6_HINT,
            },
            {
                type: STEP_7_TYPE,
                description: STEP_7_DESCRIPTION,
                image: STEP_7_IMAGE,
                hint: STEP_7_HINT,
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
                image: STEP_9_IMAGE,
            },
            {
                type: STEP_10_TYPE,
                description: STEP_10_DESCRIPTION,
                image: STEP_10_IMAGE,
            },
            {
                type: STEP_11_TYPE,
                description: STEP_11_DESCRIPTION,
                hint: STEP_11_HINT,
            },
            {
                type: STEP_12_TYPE,
                question: STEP_12_QUESTION,
                questionType: STEP_12_QUESTION_TYPE,
                correctAnswers: STEP_12_CORRECT_ANSWERS,
                possibleAnswers: STEP_12_POSSIBLE_ANSWERS,
            },
            {
                type: STEP_13_TYPE,
                description: STEP_13_DESCRIPTION,
                image: STEP_13_IMAGE,
            },
            {
                type: STEP_14_TYPE,
                description: STEP_14_DESCRIPTION,
                hint: STEP_14_HINT,
            },
            {
                type: STEP_15_TYPE,
                description: STEP_15_DESCRIPTION,
                hint: STEP_15_HINT,
            },
            {
                type: STEP_16_TYPE,
                description: STEP_16_DESCRIPTION,
                image: STEP_16_IMAGE,
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
                question: STEP_19_QUESTION,
                questionType: STEP_19_QUESTION_TYPE,
                correctAnswers: STEP_19_CORRECT_ANSWERS,
                possibleAnswers: STEP_19_POSSIBLE_ANSWERS,
            },
            {
                type: STEP_20_TYPE,
                description: STEP_20_DESCRIPTION,
                hint: STEP_20_HINT,
            },
            {
                type: STEP_21_TYPE,
                description: STEP_21_DESCRIPTION,
                hint: STEP_21_HINT,
            },
            {
                type: STEP_22_TYPE,
                description: STEP_22_DESCRIPTION,
                hint: STEP_22_HINT,
            },
            {
                type: STEP_23_TYPE,
                question: STEP_23_QUESTION,
                questionType: STEP_23_QUESTION_TYPE,
                correctAnswers: STEP_23_CORRECT_ANSWERS,
                possibleAnswers: STEP_23_POSSIBLE_ANSWERS,
            },
            {
                type: STEP_24_TYPE,
                description: STEP_24_DESCRIPTION,
                image: STEP_24_IMAGE,
            },
            {
                type: STEP_25_TYPE,
                description: STEP_25_DESCRIPTION,
                image: STEP_25_IMAGE,
            },
            {
                type: END_STEP_TYPE,
                description: END_STEP_DESCRIPTION,
                image: END_STEP_IMAGE,
            },
        ]
    },
}
