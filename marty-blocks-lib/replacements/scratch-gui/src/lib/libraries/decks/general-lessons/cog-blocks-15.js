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
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-15.name`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        type: "lesson",
        urlId: "cog-blocks-15",
        description: <FormattedMessage
            defaultMessage={"Let's make a gesture sensing model!"}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-15.description`}
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
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-15.step-1`}
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
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-15.step-2`}
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
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-15.step-3`}
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
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-15.step-4`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 5 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"The data we’ll use to train this model will be the three axes of the accelerometer. <br/><br/> You can see this data in real time on this screen, just like in the sensor dashboard"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-15.step-5`}
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
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-15.step-6`}
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
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-15.step-7`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 8 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Rotate cog into a different position, hold it steady and then push the button again for a couple of seconds to collect a new sample<br/>Repeat this with different positions until you have 10-20 samples"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-15.step-8`}
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
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-15.step-9`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 10 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"This time you want to record samples of making a side-to-side slow swooshing motion.<br/>Move cog gently back and forth and hold the button down for each individual movement - letting go once that movement is finished.<br/>The movement you record here will hopefully be recognised later and classified as a swoosh."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-15.step-10`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },


            /* CONTEXT:
            11
            Again, make sure you have at least 10 samples
            12
            Now make another class called flick
            13
            This will be a short, sharp flick movement
            Again, record samples by pressing the button down just long enough to capture one movement
            Try to get examples of different finishing positions to make sure it’s representative of the motions you’d like to detect later
            14
            Make sure you have at least 10 samples again
            You’ll probably see that for the nothing class, the lines on the individual samples are quite flat. In the swoosh there’s one that makes a big curve down and up
            And the lines for the flick are much more jagged - if you saw these samples you’d probably be able to classify them into one of our three labels - nothing, swoosh and flick
            15
            Ok, let’s see if we can get the computer to do that!
            Click the Train button. This will look at all the labelled training data, and try to build a model that can classify new data as it comes in
            16
            You’ll see a notice about a Loading Loss Plot, and then a graph will appear
            The loss plot shows how well the model is doing from step to step as it repeatedly tries to classify the training data. Each iteration of training is called an epoch - that’s what’s on the x-axis of the loss plot
            A steep downwards gradient in the loss plot means that the model is changing a lot each epoch, and getting better at classifying the data
            Training will finish when the level of loss isn’t changing much any more
            A low loss means that it has been able to accurately classify most of the training data that we gave it - so we want the final amount of loss to be low
            17
            Now press the Run button to try running the model on new data
            Then move Cog around - try doing the two movements you trained it on, and see if it can recognise them
            The three percentage bars represent the model’s confidence level in its classification
            18
            You might find that sometimes movements get misclassified - or for example that it’s easy to have a swoosh incorrectly detected just before a flick
            To fix that we can try adding more training data 
            Click on the class you want to add samples to, and then record more
            If there are any that you think you messed up, you can click on the individual samples to delete them
            19
            Once you’re happy, press Train to train the model again
            Then Run it and see if you’re happy with the performance
            I still had problems with the model detecting a swoosh before every flick, when there wasn’t one. To try and fix that I added some samples to the nothing class of me rotating cog from horizontal to vertical - the kind of motion I do before a flick, that was being miscategorised as a swoosh
            20
            Your model will be well trained when each detection is distinct and clear - like here where it goes straight from nothing -> swoosh and back, and the same for nothing -> flick and back.
            21
            Once you’re definitely happy, click the save button
            You will not be able to make any changes or add any more samples to this model after you click save.
            That’s because the original training data is no longer needed and so is discarded
            22
            Ok, with your model saved, you’re ready to use it in a program!
            23
            Go back to the Code tab
            24
            Go to the ML category
            25
            Check the box next to the accelerometer label block
            Once we start classification that will show us what the model is detecting
            26
            Add these blocks
            When green flag clicked
            Load Machine Learning model [gesture]
            Label once every [1] seconds
            Set confidence threshold [0.5]
            This will start the gesture model that we trained up. It will update its classification of what movement it thinks is happening every 1 second
            Remember before how when we tested the model we saw percentage bars about how confident it was in detections? The confidence threshold sets a threshold for how certain the model needs to be before it will give a classification
            We’ll leave it at 0.5 (or 50%) for now, but we might need to increase it later if the model is giving spurious classifications
            27
            Try it out!
            Press the green flag and the model will start running and classifying movement
            Try out your swoosh and flick movements, and you should see that they are detected!
            28
            Add these blocks
            When received accelerometer label [swoosh]
            Set [ring] LEDs to [green]
            Broadcast [swoosh] and wait
            Wait [1] seconds
            Turn off all LEDs
            And
            When received accelerometer label [flick]
            Set [ring] LEDs to [red]
            Broadcast [flick] and wait
            Wait [1] seconds
            Turn off all LEDs
            Now Cog will react by showing lights, and we’ll broadcast a message, whenever a swoosh or a flick is detected
            29
            Try it out!
            Now when you do the movements Cog will light up
            30
            Ok, let’s make a memory game using the motion detector!
            Add a Witch sprite and move it to the bottom left corner
            31
            Now select the Stage
            32
            And go to the Backdrops tab
            33
            Add some text saying “Learn to Spell”
            This will be the title screen for the game
            You can also add other decoration if you like - like here where we’ve added a purple trapezoid and a white outline around the text
            34
            We’ll add a few more backdrops to use in the game
            Press the Choose a Backdrop button
            35
            Select the Castle 3 backdrop
            36
            Also add Castle 2 and Witch House, so that you have four backdrops total
            Rename the first one to title screen, so that we can identify it easily
            37
            Go back to the code tab, with the stage still selected
            Add these blocks
            When green flag clicked
            Switch backdrop to [title screen]
            Wait [2] seconds
            Switch backdrop to [Castle 3]
            Now when the game is started the player will be shown the title screen for 2 seconds, before it switches to Castle 3 - the inside of the castle
            38
            We’re going to add a brief tutorial to the game, and get the player to confirm that they can do the swoosh and flick movements
            We’ll make these movements be required to progress through the backdrops
            Add these blocks
            When I receive [swoosh]
            If [[backdrop [name]] = [Castle 3]] then
            Repeat [50]
            Change [fisheye] effect by [10]
            Change [whirl] effect by [-10]
            Switch backdrop to [Castle 2]
            Repeat [50]
            Change [fisheye] effect by [-10]
            Change [whirl] effect by [10]
            So now when the player makes a swoosh movement while the witch is inside the castle, it will do a fancy transition to the Castle 2 backdrop
            39
            We need one for the flick movement as well
            Add these blocks
            When I receive [flick]
            If [[backdrop [name]] = [Castle 2]] then
            Repeat [50]
            Change [fisheye] effect by [10]
            Change [whirl] effect by [-10]
            Switch backdrop to [Witch House]
            Repeat [50]
            Change [fisheye] effect by [-10]
            Change [whirl] effect by [10]
            Broadcast [start game]
            You might find it quicker to right click and duplicate this code, just be careful to change it in the right places and add the broadcast block!
            40
            Now select the Witch sprite
            41
            We need to add some instructions to the tutorial steps
            Add these blocks
            When backdrop switches to [Castle 3]
            Wait [2] seconds
            Say [It’s time to leave the castle] for [2] seconds
            Say [Swoosh the wand to transport us outside]
            And
            When backdrop switches to [Castle 2]
            Wait [2] seconds
            Say [Let’s go to my house for spell practice] for [2] seconds
            Say [Flick the wand to transport us there]
            42
            Ok, let’s try it out!
            To run the ML model, you’ll need to select Cog again and start the program with Cog selected
            43
            With Cog selected, press the green flag to run the code!
            You’ll need to do a swoosh and a flick to help the witch magically travel from the castle to the forest, and then from the forest to her house
            44
            With the witch in her house, let’s start the game properly
            This is going to be a memory game, where the witch will read out a sequence of gestures and the player will have to remember them and do them in order
            Select the Witch sprite again
            45
            Add these blocks
            When I receive [start game]
            Delete all of [gestures]
            Add [swoosh] to [gestures]
            Add [flick] to [gestures]
            Set [lives] to [3]
            Set [sequenceLength] to [2]
            You’ll need to make a list called gestures, and variables called lives and sequenceLength
            The gestures list will list all the possible movements we can do - if you wanted to expand the game with more motions you could add them here once you’ve trained a model on them as well
            We’ll give our player 3 lives to begin with, and they’ll lose one every time they get something wrong
            And we’ll start off with a sequence of 2 movements
            46
            Make a new block called make a sequence of [length] gestures
            You’ll need to use both the Add an input number or text and Add a label options
            47
            Add these blocks
            Define [make a sequence of [length] gestures]
            Delete all of [sequence]
            Repeat [length]
            Add [item [pick random [1] to [length of [gestures]]] of [gestures]] to [sequence]
            You’ll need to make another list called sequence
            48
            Now add the block make a sequence of [sequenceLength] gestures 
            The make a sequence function will take in the value of the sequenceLength variable as an argument for its length parameter
            49
            Add these blocks
            When I receive [flick]
            Add [flick] to [user input]
            And
            When I receive [swoosh]
            Add [swoosh] to [user input]
            You’ll need to make another list called user input
            This is where we’ll keep track of the motions the player has made, so we can compare them against the ones they were supposed to make
            50
            Add these blocks after the make a sequence of [sequenceLength] gestures block
            Say [I’m going to read out some gestures] for [2] seconds
            Say [You have to do them in the same order] for [2] seconds
            Say [Ready?!] for [2] seconds
            Repeat [10]
            Say [sequence] for [2] seconds
            Delete all of [user input]
            Wait until [[length of [user input]] = [length of [sequence]]]
            If [[user input] = [sequence]] then
            Say [Well Done!] for [2] seconds
            Say [Let’s make it more complicated] for [2] seconds
            Change [sequenceLength] by [1]
            Make a sequence of [sequenceLength] gestures
            Else
            If [[lives] > [0]] then
            Say [Oops! Not quite] for [2] seconds
            Say [Try again…] for [2] seconds
            Change [lives] by [-1]
            Else
            Finish game
            You’ll need to make a new block called finish game
            51
            Add these blocks to define the finish game function
            Define [finish game]
            Say [That’s enough for now. Well done!] for [2] seconds
            Say [join [join [You learned a spell with] [[sequenceLength] - [1]]] [gestures]] for [10] seconds
            Stop [all]
            Now when the player runs out of lives they’ll be told their score - how long a sequence of movements they were able to memorise and perform
            52
            Select cog again and try it out!
            You can still make the game fullscreen before starting it, to make it easier to see what the Witch is saying
            53
            Well done!
            You’ve learned about Machine Learning, and trained a model to classify gestures from movement data
            You were able to collect lots of samples for training the model, and test it before saving it and using it in your code
            Then you used functions and lists to make a memory game!
            Next steps
            Could you add a third gesture into the game?
            Experiment with adjusting the Machine Learning parameters - the confidence threshold and labelling frequency
            Make a better ending to the game if the player is able to remember really really long sequences of moves
            
            */

        ]
    }
}

export default cogBlocksTutorial15;