import React from 'react';
import { FormattedMessage } from 'react-intl';

const BUCKET_URL = "https://content.robotical.io/static/tutorials/cog/blocks/15/";

const cogBlocksTutorial15 = {
    'type-lesson-cog-tutorial-15': {
        id: "type-lesson-cog-tutorial-15",
        name: <FormattedMessage
            defaultMessage={"ML Gesture Sensing"}
            isRaw={true}
            description=""
            id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.name"}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        type: "lesson",
        urlId: "cog-blocks-15",
        description: <FormattedMessage
            defaultMessage={"Let's make a gesture sensing model!"}
            isRaw={true}
            description=""
            id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.description"}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        img: `${BUCKET_URL}cover_image.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['cog', 'data', 'data collection', 'data analysis', 'classification', 'lists', 'iteration', 'functions', 'statistics'],
        steps: [
            /* STEP 1 -- intro*/
            {
                type: "info",
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let's use machine learning to recognize specific movements with Cog!<br/><br/>We'll train a model to recognize gestures, and use these as part of a memory game based on learning spells!"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-1"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },

            /* STEP 2 */
            {
                type: "info",
                image: `${BUCKET_URL}step-2.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Click on the <i>Machine Learning</i> tab"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-2"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 3 */
            {
                type: "info",
                image: `${BUCKET_URL}step-3.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Select the <i>+</i> icon and click the <i>New Accelerometer Model</i> option"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-3"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 4 */
            {
                type: "info",
                image: `${BUCKET_URL}step-4.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Press <i>Continue</i>"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-4"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 5 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"The data we’ll use to train this model will be the three axes of the accelerometer. <br/><br/> You can see this data in real time on this screen, just like in the sensor dashboard"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-5"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 6 */
            {
                type: "info",
                image: `${BUCKET_URL}step-6.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Type in a Model Name of <i>gesture</i> and then put in the word <i>nothing</i> in the Create New Class box<br/>Press the + button to create this new class"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-6"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 7 */
            {
                type: "info",
                image: `${BUCKET_URL}step-7.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"That will create a class called <i>nothing</i>. <br/>We will have one class for each type of movement we want to detect - and that also means having a base case of no movement.<br/><br/>We now need to collect training data for the <i>nothing</i> class. You can collect samples of data for accelerometer models like this by holding down the button on Cog.<br/><br/>Pick up Cog, hold it steady and then push the button for a couple of seconds."}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-7"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 8 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Rotate cog into a different position, hold it steady and then push the button again for a couple of seconds to collect a new sample<br/>Repeat this with different positions until you have 10-20 samples"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-8"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 9 */
            {
                type: "info",
                image: `${BUCKET_URL}step-9.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now create another class called <i>swoosh</i>"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-9"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 10 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"This time you want to record samples of making a side-to-side slow swooshing motion.<br/>Move cog gently back and forth and hold the button down for each individual movement - letting go once that movement is finished.<br/>The movement you record here will hopefully be recognised later and classified as a swoosh."}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-10"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 11 */
            {
                type: "info",
                image: `${BUCKET_URL}step-11.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Again, make sure you have at least 10 samples"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-11"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 12 */
            {
                type: "info",
                image: `${BUCKET_URL}step-12.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now make another class called <i>flick</i>"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-12"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 13 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"This will be a short, sharp flick movement.<br/>Again, record samples by pressing the button down just long enough to capture one movement.<br/>Try to get examples of different finishing positions to make sure it’s representative of the motions you’d like to detect later"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-13"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 14 */
            {
                type: "info",
                image: `${BUCKET_URL}step-14.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Make sure you have at least 10 samples again.<br/>You’ll probably see that for the <i>nothing</i> class, the lines on the individual samples are quite flat. In the <i>swoosh</i> there’s one that makes a big curve down and up.<br/>And the lines for the <i>flick</i> are much more jagged - if you saw these samples you’d probably be able to classify them into one of our three labels - <i>nothing</i>, <i>swoosh</i> and <i>flick</i>"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-14"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 15 */
            {
                type: "info",
                image: `${BUCKET_URL}step-15.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Ok, let’s see if we can get the computer to do that!<br/>Click the <i>Train</i> button. This will look at all the labelled training data, and try to build a model that can classify new data as it comes in"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-15"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 16 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"You’ll see a notice about a Loading Loss Plot, and then a graph will appear.<br/>The loss plot shows how well the model is doing from step to step as it repeatedly tries to classify the training data. Each iteration of training is called an <i>epoch</i> - that’s what’s on the x-axis of the loss plot.<br/>A steep downwards gradient in the loss plot means that the model is changing a lot each epoch, and getting better at classifying the data.<br/>Training will finish when the level of loss isn’t changing much any more.<br/>A low loss means that it has been able to accurately classify most of the training data that we gave it - so we want the final amount of loss to be low"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-16"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 17 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now press the <i>Run</i> button to try running the model on new data.<br/>Then move Cog around - try doing the two movements you trained it on, and see if it can recognise them.<br/>The three percentage bars represent the model’s confidence level in its classification"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-17"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 18 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"You might find that sometimes movements get misclassified - or for example that it’s easy to have a <i>swoosh</i> incorrectly detected just before a <i>flick</i>.<br/>To fix that we can try adding more training data.<br/>Click on the class you want to add samples to, and then record more.<br/>If there are any that you think you messed up, you can click on the individual samples to delete them"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-18"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 19 */
            {
                type: "info",
                image: `${BUCKET_URL}step-19.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Once you’re happy, press <i>Train</i> to train the model again.<br/>Then <i>Run</i> it and see if you’re happy with the performance.<br/>I still had problems with the model detecting a <i>swoosh</i> before every <i>flick</i>, when there wasn’t one. To try and fix that I added some samples to the <i>nothing</i> class of me rotating Cog from horizontal to vertical - the kind of motion I do before a flick, that was being miscategorised as a swoosh"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-19"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 20 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Your model will be well trained when each detection is distinct and clear - like here where it goes straight from <i>nothing → swoosh</i> and back, and the same for <i>nothing → flick</i> and back."}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-20"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 21 */
            {
                type: "info",
                image: `${BUCKET_URL}step-21.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Once you’re definitely happy, click the <i>Save</i> button.<br/><b>You will not be able to make any changes or add any more samples to this model after you click save.</b><br/>That’s because the original training data is no longer needed and so is discarded"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-21"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 22 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Ok, with your model saved, you’re ready to use it in a program!"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-22"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 23 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go back to the <i>Code</i> tab"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-23"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 24 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the <i>ML</i> category"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-24"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 25 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Check the box next to the <i>accelerometer label</i> block.<br/>Once we start classification that will show us what the model is detecting"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-25"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 26 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks:<ul><li>When green flag clicked</li><li>Load Machine Learning model [gesture]</li><li>Label once every [1] seconds</li><li>Set confidence threshold [0.5]</li></ul><br/>This will start the <i>gesture</i> model that we trained up. It will update its classification of what movement it thinks is happening every 1 second.<br/><br/>Remember before how when we tested the model we saw percentage bars about how confident it was in detections? The <i>confidence threshold</i> sets a threshold for how certain the model needs to be before it will give a classification.<br/>We’ll leave it at 0.5 (or 50%) for now, but we might need to increase it later if the model is giving spurious classifications"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-26"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 27 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br/>Press the green flag and the model will start running and classifying movement.<br/>Try out your <i>swoosh</i> and <i>flick</i> movements, and you should see that they are detected!"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-27"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 28 */
            {
                type: "info",
                image: `${BUCKET_URL}step-28.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks:<ul><li>When received accelerometer label [swoosh]</li><li>Set [ring] LEDs to [green]</li><li>Broadcast [swoosh] and wait</li><li>Wait [1] seconds</li><li>Turn off all LEDs</li></ul><p>And</p><ul><li>When received accelerometer label [flick]</li><li>Set [ring] LEDs to [red]</li><li>Broadcast [flick] and wait</li><li>Wait [1] seconds</li><li>Turn off all LEDs</li></ul><br/>Now Cog will react by showing lights, and we’ll broadcast a message, whenever a swoosh or a flick is detected"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-28"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 29 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br/>Now when you do the movements Cog will light up"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-29"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 30 */
            {
                type: "info",
                image: `${BUCKET_URL}step-30.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Ok, let’s make a memory game using the motion detector!<br/>Add a <i>Witch</i> sprite and move it to the bottom left corner"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-30"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 31 */
            {
                type: "info",
                image: `${BUCKET_URL}step-31.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now select the <i>Stage</i>"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-31"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 32 */
            {
                type: "info",
                image: `${BUCKET_URL}step-32.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"And go to the <i>Costumes</i> tab"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-32"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 33 */
            {
                type: "info",
                image: `${BUCKET_URL}step-33.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add some text saying “Learn to Spell”.<br/>This will be the title screen for the game.<br/>You can also add other decoration if you like - like here where we’ve added a purple trapezoid and a white outline around the text"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-33"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 34 */
            {
                type: "info",
                image: `${BUCKET_URL}step-34.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We’ll add a few more backdrops to use in the game.<br/>Press the <i>Choose a Backdrop</i> button"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-34"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 35 */
            {
                type: "info",
                image: `${BUCKET_URL}step-35.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Select the <i>Castle 3</i> backdrop"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-35"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 36 */
            {
                type: "info",
                image: `${BUCKET_URL}step-36.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Also add <i>Castle 2</i> and <i>Witch House</i>, so that you have four backdrops total.<br/>Rename the first one to <i>title screen</i>, so that we can identify it easily"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-36"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 37 */
            {
                type: "info",
                image: `${BUCKET_URL}step-37.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go back to the code tab, with the stage still selected.<br/><br/>Add these blocks:<ul><li>When green flag clicked</li><li>Switch backdrop to [title screen]</li><li>Wait [2] seconds</li><li>Switch backdrop to [Castle 3]</li></ul><br/>Now when the game is started the player will be shown the title screen for 2 seconds, before it switches to Castle 3 - the inside of the castle"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-37"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 38 */
            {
                type: "info",
                image: `${BUCKET_URL}step-38.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We’re going to add a brief tutorial to the game, and get the player to confirm that they can do the swoosh and flick movements.<br/>We’ll make these movements be required to progress through the backdrops.<br/><br/>Add these blocks:<ul><li>When I receive [swoosh]</li><li>If [[backdrop [name]] = [Castle 3]] then<ul><li>Repeat [50]<ul><li>Change [fisheye] effect by [10]</li><li>Change [whirl] effect by [-10]</li></ul></li><li>Switch backdrop to [Castle 2]</li><li>Repeat [50]<ul><li>Change [fisheye] effect by [-10]</li><li>Change [whirl] effect by [10]</li></ul></li></ul></li></ul><br/>So now when the player makes a swoosh movement while the witch is inside the castle, it will do a fancy transition to the Castle 2 backdrop"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-38"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 39 */
            {
                type: "info",
                image: `${BUCKET_URL}step-39.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We need one for the flick movement as well.<br/><br/>Add these blocks:<ul><li>When I receive [flick]</li><li>If [[backdrop [name]] = [Castle 2]] then<ul><li>Repeat [50]<ul><li>Change [fisheye] effect by [10]</li><li>Change [whirl] effect by [-10]</li></ul></li><li>Switch backdrop to [Witch House]</li><li>Repeat [50]<ul><li>Change [fisheye] effect by [-10]</li><li>Change [whirl] effect by [10]</li></ul></li><li>Broadcast [start game]</li></ul></li></ul><br/>You might find it quicker to right click and duplicate this code, just be careful to change it in the right places and add the broadcast block!"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-39"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 40 */
            {
                type: "info",
                image: `${BUCKET_URL}step-40.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now select the <i>Witch</i> sprite"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-40"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 41 */
            {
                type: "info",
                image: `${BUCKET_URL}step-41.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We need to add some instructions to the tutorial steps.<br/><br/>Add these blocks:<ul><li>When backdrop switches to [Castle 3]</li><li>Wait [2] seconds</li><li>Say [It’s time to leave the castle] for [2] seconds</li><li>Say [Swoosh the wand to transport us outside]</li></ul><p>And</p><ul><li>When backdrop switches to [Castle 2]</li><li>Wait [2] seconds</li><li>Say [Let’s go to my house for spell practice] for [2] seconds</li><li>Say [Flick the wand to transport us there]</li></ul>"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-41"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 42 */
            {
                type: "info",
                image: `${BUCKET_URL}step-42.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Ok, let’s try it out!<br/>To run the ML model, you’ll need to select Cog again and start the program with Cog selected"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-42"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 43 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"With Cog selected, press the green flag to run the code!<br/>You’ll need to do a <i>swoosh</i> and a <i>flick</i> to help the witch magically travel from the castle to the forest, and then from the forest to her house"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-43"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 44 */
            {
                type: "info",
                image: `${BUCKET_URL}step-44.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"With the witch in her house, let’s start the game properly.<br/>This is going to be a memory game, where the witch will read out a sequence of gestures and the player will have to remember them and do them in order.<br/>Select the <i>Witch</i> sprite again"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-44"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 45 */
            {
                type: "info",
                image: `${BUCKET_URL}step-45.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks:<ul><li>When I receive [start game]</li><li>Delete all of [gestures]</li><li>Add [swoosh] to [gestures]</li><li>Add [flick] to [gestures]</li><li>Set [lives] to [3]</li><li>Set [sequenceLength] to [2]</li></ul><br/>You’ll need to make a list called <i>gestures</i>, and variables called <i>lives</i> and <i>sequenceLength</i>.<br/>The gestures list will list all the possible movements we can do - if you wanted to expand the game with more motions you could add them here once you’ve trained a model on them as well.<br/>We’ll give our player 3 lives to begin with, and they’ll lose one every time they get something wrong.<br/>And we’ll start off with a sequence of 2 movements"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-45"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 46 */
            {
                type: "info",
                image: `${BUCKET_URL}step-46.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Make a new block called <i>make a sequence of [length] gestures</i>.<br/>You’ll need to use both the <i>Add an input number or text</i> and <i>Add a label</i> options"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-46"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 47 */
            {
                type: "info",
                image: `${BUCKET_URL}step-47.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks:<ul><li>Define [make a sequence of [length] gestures]<ul><li>Delete all of [sequence]</li><li>Repeat [length]<ul><li>Add [item [pick random [1] to [length of [gestures]]] of [gestures]] to [sequence]</li></ul></li></ul></li></ul><br/>You’ll need to make another list called <i>sequence</i>"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-47"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },


            /* STEP 48 */
            {
                type: "info",
                image: `${BUCKET_URL}step-48.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now add the block <i>make a sequence of [sequenceLength] gestures</i>.<br/>The make a sequence function will take in the value of the <i>sequenceLength</i> variable as an argument for its <i>length</i> parameter"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-48"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 49 */
            {
                type: "info",
                image: `${BUCKET_URL}step-49.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks:<ul><li>When I receive [flick]</li><li>Add [flick] to [user input]</li></ul><p>And</p><ul><li>When I receive [swoosh]</li><li>Add [swoosh] to [user input]</li></ul><br/>You’ll need to make another list called <i>user input</i>.<br/>This is where we’ll keep track of the motions the player has made, so we can compare them against the ones they were supposed to make"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-49"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 50 */
            {
                type: "info",
                image: `${BUCKET_URL}step-50.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks after the <i>make a sequence of [sequenceLength] gestures</i> block:<ul><li>Say [I’m going to read out some gestures] for [2] seconds</li><li>Say [You have to do them in the same order] for [2] seconds</li><li>Say [Ready?!] for [2] seconds</li><li>Repeat [10]<ul><li>Say [sequence] for [2] seconds</li></ul></li><li>Delete all of [user input]</li><li>Wait until [[length of [user input]] = [length of [sequence]]]</li><li>If [[user input] = [sequence]] then<ul><li>Say [Well Done!] for [2] seconds</li><li>Say [Let’s make it more complicated] for [2] seconds</li><li>Change [sequenceLength] by [1]</li><li>Make a sequence of [sequenceLength] gestures</li></ul></li><li>Else<ul><li>If [[lives] > [0]] then<ul><li>Say [Oops! Not quite] for [2] seconds</li><li>Say [Try again…] for [2] seconds</li><li>Change [lives] by [-1]</li></ul></li><li>Else<ul><li>Finish game</li></ul></li></ul></li></ul><br/>You’ll need to make a new block called <i>finish game</i>"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-50"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 51 */
            {
                type: "info",
                image: `${BUCKET_URL}step-51.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks to define the finish game function:<ul><li>Define [finish game]<ul><li>Say [That’s enough for now. Well done!] for [2] seconds</li><li>Say [join [join [You learned a spell with] [[sequenceLength] - [1]]] [gestures]] for [10] seconds</li><li>Stop [all]</li></ul></li></ul><br/>Now when the player runs out of lives they’ll be told their score - how long a sequence of movements they were able to memorise and perform"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-51"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 52 */
            {
                type: "info",
                image: `${BUCKET_URL}step-52.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Select Cog again and try it out!<br/>You can still make the game fullscreen before starting it, to make it easier to see what the Witch is saying"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-52"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 53 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Well done!<br/>You’ve learned about Machine Learning, and <b>trained</b> a model to <b>classify</b> gestures from movement data.<br/>You were able to collect lots of <b>samples</b> for training the model, and test it before saving it and using it in your code.<br/>Then you used functions and lists to make a memory game!<br/><br/><b>Next steps</b><br/>• Could you add a third gesture into the game?<br/>• Experiment with adjusting the Machine Learning parameters - the confidence threshold and labelling frequency.<br/>• Make a better ending to the game if the player is able to remember really really long sequences of moves"}
                    description=""
                    id={"gui.howtos.lessons.type-lesson-cog-tutorial-15.step-53"}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            }
        ]
    }
}

export default cogBlocksTutorial15;