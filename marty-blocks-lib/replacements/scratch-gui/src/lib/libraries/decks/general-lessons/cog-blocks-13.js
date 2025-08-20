import React from 'react';
import { FormattedMessage } from 'react-intl';


const BUCKET_URL = "https://content.robotical.io/static/tutorials/cog/blocks/13/";

const cogBlocksTutorial13 = {
    'type-lesson-cog-tutorial-13': {
        id: "type-lesson-cog-tutorial-13",
        name: <FormattedMessage
            defaultMessage={"Quiz Game"}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.name`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        type: "lesson",
        urlId: "cog-blocks-13",
        description: <FormattedMessage
            defaultMessage={"Let’s make a quiz game!"}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.description`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        img: `${BUCKET_URL}cover_image.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['cog', 'blocks', 'timer', 'stopwatch', 'lap timer', 'list', 'variables', 'state', 'debugging'],
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
                    defaultMessage={"Let’s make a quiz game! <br/><br/>We’ll put in a list of questions and answers, and use cogs as buzzers for contestants. <br/><br/>This activity uses multiple Cogs connected to one program. If possible, take turns to share cogs between small groups to run the program. <br/><br/>If you only have access to one cog, think about how you could change the code to use the IR sensors on cog as buzzers too, to let three people play on one cog."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-1`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },

            /* STEP 2 -- make a list */
            {
                type: "info",
                image: `${BUCKET_URL}step-2.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s begin by getting things set up for the quiz. <br/><br/>We’ll need a sprite to act as the host - pick you favourite one from the options, this example will use a crab but you could use any sprite, or draw your own."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-2`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 3 -- make a list */
            {
                type: "info",
                image: `${BUCKET_URL}step-3.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We’ll need to make three lists - one for <i>questions</i>, one for <i>answers</i>, and one to track the <i>scores</i> of the contestants. <br/><br/>Add three lists called questions, answers and scores."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-3`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 4 -- fill in the questions */
            {
                type: "info",
                image: `${BUCKET_URL}step-4.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks to fill in the list of questions. <br/><ul><li>When green flag clicked</li><li>Delete all of [questions]</li><li>Add [What is 2+2?] to [questions]</li></ul>Put in as many questions as you’d like by adding more <i>add [] to [questions]</i> blocks. <br/><br/>Then do the same thing for the answers, making sure that your questions line up with your answers."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-4`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 5 -- try it out */
            {
                type: "info",
                image: `${BUCKET_URL}step-5.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out by pressing the green flag. <br/><br/>The questions and answers lists will fill in - take a minute to check that the answers all correspond to the right questions. <br/><br/>Once you’re happy, click the checkboxes next to the answers and questions lists to hide them."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-5`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 6 -- scoreboard */
            {
                type: "info",
                image: `${BUCKET_URL}step-6.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now let’s get the scoreboard ready. <br/><br/>Make a new variable called <i>number of players</i>, and add these blocks: <ul><li>When green flag clicked</li><li>Set [number of players] to [2]</li><li>Delete all of [scores]</li><li>Repeat [number of players]</li><ul><li>Add [0] to scores</li></ul>Change the setting for number of players to the number you intend to have - you can always change it again later."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-6`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 7 -- repeat through questions */
            {
                type: "info",
                image: `${BUCKET_URL}step-7.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We'll iterate through the list of questions and have the sprite ask each of them. <br/><br/>To do this we’ll use a repeat loop. Add these blocks: <ul><li>When green flag clicked</li><li>Repeat [length of [questions]]</li></ul>There’s a slight problem though - what if that code we’ve just run is executed before the other code fills in the list of questions? <br/><br/>It’s a bit uncertain what exactly would happen - this is another type of bug, and we can code things a bit differently ensure the code runs in the order we want."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-7`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 8 -- make a block */
            {
                type: "info",
                image: `${BUCKET_URL}step-8.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We could just add a wait block before the repeat loop, but that’s not very neat. <br/><br/>We could also add all the code into one big long sequence, but that will become quite difficult to manage. <br/><br/>Alternatively, we can make our own blocks and make sure we run them in the order we want. <br/><br/>Click the Make a Block button."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-8`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 9 -- define fill in questions */
            {
                type: "info",
                image: `${BUCKET_URL}step-9.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Give the block the title <i>Fill in questions</i>, and click OK."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-9`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 10 -- new block */
            {
                type: "info",
                image: `${BUCKET_URL}step-10.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"A new block will appear in the block palette, and in the coding area you’ll see a hat block titled <i>define [fill in questions]</i>. <br/><br/>Whatever code we put under that block will be run whenever we call the <i>Fill in questions</i> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-10`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 11 -- replace green flag */
            {
                type: "info",
                image: `${BUCKET_URL}step-11.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Replace the <i>When green flag clicked</i> block with the new <i>define [Fill in questions]</i> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-11`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 12 -- put the block before repeat */
            {
                type: "info",
                image: `${BUCKET_URL}step-12.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Put the new <i>Fill in questions</i> block before the repeat loop. <br/><br/>Now, we know for sure that the questions list will be filled in before we evaluate its length and start iterating through it."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-12`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 13 -- ask questions */
            {
                type: "info",
                image: `${BUCKET_URL}step-13.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Inside the repeat loop, add these blocks: <ul><li>Say [item [1] of [questions]] for [2] seconds</li><li>Broadcast [answer now]</li><li>Delete [1] of [questions]</li><li>Delete [1] of [answers]</li></ul>After each question has been asked, both it and its answer will be removed from their lists."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-13`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 14 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out - the sprite will read out the questions one by one. <br/><br/>You might need to move the sprite to the bottom left corner of the screen to give more room for the questions."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-14`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 15 -- add a buzzer */
            {
                type: "info",
                image: `${BUCKET_URL}step-15.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s add a way to buzz in and answer the question. <br/><br/>Select Cog."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-15`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 16 -- make a local variable */
            {
                type: "info",
                image: `${BUCKET_URL}step-16.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Make a new variable called <i>player number</i>. <br/><br/>This time, be sure to select the <i>For this sprite only</i> option. <br/><br/>This new variable will be what we call a <b>local variable</b>, it’s only available for this sprite (or this cog, in this case). <br/><br/>If you change back to the sprite the variable will disappear from the variable list in the block palette, and will reappear when you select cog."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-16`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 17 -- set player number */
            {
                type: "info",
                image: `${BUCKET_URL}step-17.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks: <ul><li>When green flag clicked</li><li>Set [player number] to [1]</li></ul>Later on, we’ll add more cogs, and set their player numbers differently."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-17`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 18 -- enable buzzers */
            {
                type: "info",
                image: `${BUCKET_URL}step-18.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We only want to enable the buzzers when a question has been asked, so we’ll use the <i>answer now</i> message that was broadcast when the sprite asked a question. <br/><br/>Add these blocks: <ul><li>When I receive [answer now]</li><li>Set [ring] LEDs to [blue]</li><li>Set [ring] LEDs to pattern [Spin1]</li><li>Wait until [[[button clicked] = [true]] or [[buzzer] > [0]]]]</li></ul>You’ll need to make a new variable called <b>buzzer</b> - we’ll use this to track which buzzer is pushed first. <br/><br/>You can find the <i>or</i> block in the Operators category. <br/><br/>The condition in the wait until block is either that the button is clicked or the buzzer variable is greater than 0. <br/><br/>That way, we can wait until either the button on this cog is pressed, or a different buzzer is pressed and the buzzer variable is set elsewhere."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-18`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 19 -- set buzzer */
            {
                type: "info",
                image: `${BUCKET_URL}step-19.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks: <ul><li>If [[button clicked] = [true]] then</li><ul><li>Set [buzzer] to [player number]</li><li>Set [ring] LEDs to [green]</li></ul>Else</li><ul><li>Turn off all LEDs</li></ul></ul>With this code, if it was the button on this cog that was pressed first, we’ll set the <i>buzzer</i> variable to this <i>player number</i>, and turn the lights on cog green. <br/><br/>Otherwise, it’ll mean that someone else got there first, or we ran out of time, and we will just turn the lights off instead."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-19`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 20 -- go back to sprite */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go back to the sprite you added before."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-20`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 21 -- set buzzer to 0 */
            {
                type: "info",
                image: `${BUCKET_URL}step-21.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Change the code so that inside the repeat loop for the questions it says: <ul><li>Set [buzzer] to [0]</li><li>Reset timer</li><li>Say [item [1] of [questions]</li><li>Broadcast [answer now]</li><li>Wait until [[[buzzer] > [0]] or [[timer] > [10]]]</li><li>Delete [1] of [questions]</li><li>Delete [1] of [answers]</li></ul>We’ve used another <i>wait until</i> with an <i>or</i> condition. <br/><br/>Now, each time after asking a question the code will wait either for the buzzer variable to be set, or for 10 seconds to elapse."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-21`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 22 -- try it out */
            {
                type: "info",
                image: `${BUCKET_URL}step-22.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now every time when a question is asked it’ll proceed to the next one either after 10 seconds or as soon as a buzzer (the button on cog) is pushed. <br/><br/>We still need to give our contestant a chance to actually answer the question before moving on to the next one. <br/><br/>Make a new block called <i>check answer</i> and put it after the <i>wait until</i> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-22`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 23 -- if buzzer is pressed */
            {
                type: "info",
                image: `${BUCKET_URL}step-23.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Under the <i>define [check answer]</i> block, add an <i>if … else</i> block with the condition <i>[buzzer] > [0]</i>. <br/><br/>This will check whether a buzzer was pushed in time or not."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-23`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 24 -- say player number */
            {
                type: "info",
                image: `${BUCKET_URL}step-24.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"If the buzzer is pushed, we’ll give the person who pushed it a few seconds to answer the question. <br/><br/>Add these blocks inside the if condition: <ul><li>Broadcast [buzzed]</li><li>Say [join [Yes, player number] [buzzer]] for [6] seconds</li></ul>The <i>join</i> block can be found in the Operators category, it joins together two lumps (or strings) of text."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-24`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 25 -- add more blocks */
            {
                type: "info",
                image: `${BUCKET_URL}step-25.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks in too: <ul><li>Say [join [join [Did you say] [item [1] of [answers]] [? Press green for yes and red for no]]</li><li>Broadcast [confirm answer] and wait</li></ul>Remember how we’ve previously <i>nested if</i> conditions, you can also <i>nest join</i> operators if you want to join together more than two strings of text. <br/><br/>So, after giving 6 seconds for the player to say their answer out load for the other contestants to hear, the sprite will ask them if they said the correct answer, taken from the answers list. It will then ask them to press green for yes and red for no, send the <i>confirm answer</i> message and wait before proceeding."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-25`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 26 -- select cog */
            {
                type: "info",
                image: `${BUCKET_URL}step-26.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s do something with the <i>confirm answer</i> message. <br/><br/>Select Cog again."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-26`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 27 -- add blocks */
            {
                type: "info",
                image: `${BUCKET_URL}step-27.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks: <ul><li>When I receive [confirm answer]</li><li>If [[buzzer] = [player number] then</li></ul>. <br/><br/>Later on we’ll have more cogs connected and running this code. This if condition will check if it was this cog that was the successful buzzer."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-27`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 28 -- set LEDs */
            {
                type: "info",
                image: `${BUCKET_URL}step-28.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <i>set LEDs</i> using the ColorPicker block inside the if condition and set it to show a red LED beside the left IR object sensor, and a green one beside the right IR object sensor."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-28`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 29 -- wait for IR sensors */
            {
                type: "info",
                image: `${BUCKET_URL}step-29.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks: <ul><li>Wait until [[[obstacle sensed [left]] = [true]] or [[obstacle sensed [right]] = [true]]]</li><li>If [[obstacle sensed [right]] = [true]] then</li></ul>Replace item [player number] of [scores] with [[item [1] of [scores]] + [1]]<br/><br/>Else<br/><ul><li>Replace item [player number] of [scores] with [[item [1] of [scores]] - [1]]</li></ul>Turn off all LEDs. <br/><br/>The <i>wait until</i> block will wait until either the left or right IR sensors sense an object - this is where we’re waiting for the player to select whether they got the answer right or wrong. <br/><br/>If they got it right they’ll have covered the right IR sensor, since that’s where we put the green light. <br/><br/>If so, we’ll replace their score on the scoreboard with the same number plus 1. <br/><br/>If not, we’ll replace their score on the scoreboard with the same number minus 1. <br/><br/>In this way we’ll increment their score if they get the question right, and decrement it if they get it wrong. <br/><br/>So be careful - if you buzz in but don’t know the answer you’ll lose points!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-29`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 30 -- add countdown */
            {
                type: "info",
                image: `${BUCKET_URL}step-30.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We should also add a countdown so the player knows how long they have to answer. <br/><br/>We’ll use the <i>buzzed</i> message that we set up before to do this. <br/><br/>Make another variable called <i>ledID</i>, and again make it <i>For this sprite only</i>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-30`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 31 -- countdown blocks */
            {
                type: "info",
                image: `${BUCKET_URL}step-31.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks: <ul><li>When I receive [buzzed]</li><li>If [[buzzer] = [player number]] then</li><ul><li>Set [ledID] to [0]</li><li>Repeat [6]</li><ul><li>Set LED [ledID] to [purple]</li><li>Set LED [[ledID] + [1]] to [purple]</li><li>Wait [1] seconds</li><li>Change [ledID] by [2]</li></ul></ul></ul>Now during the 6 seconds the player is given to answer the question, they’ll see a countdown on the LEDs on cog."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-31`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 32 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out! <br/><br/>The questions will be asked one after another. If you buzz in you’ll get 6 seconds to answer while cog shows a countdown, and then you’ll be asked to select red or green depending on whether you got the question wrong or right."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-32`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 33 -- no buzzers */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We still need to do something if no-one buzzes in in time for a question, and we need to say who the winner is at the end. <br/><br/>Go back to the sprite."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-33`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 34 -- too slow */
            {
                type: "info",
                image: `${BUCKET_URL}step-34.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"In the empty <i>else</i> condition in the <i>check answer</i> definition, add these blocks: <ul><li>Say [Too slow!] for [2] seconds</li><li>Say [join [The answer was] [item [1] of [answers]] for [5] seconds</li></ul>This way, if no-one buzzes in time, the sprite will read out the correct answer for everyone."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-34`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 35 -- add more cogs */
            {
                type: "info",
                image: `${BUCKET_URL}step-35.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"It's time to add more cogs in so we can have more players!<br/><br/>Right click on cog and select <i>duplicate</i>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-35`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>

            },
            /* STEP 36 -- add more questions */
            {
                type: "info",
                image: `${BUCKET_URL}step-36.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"A new cog has been added with the same code as the first!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-36`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>

            },
            /* STEP 37 -- local variables */
            {
                type: "info",
                image: `${BUCKET_URL}step-37.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"As well as the code being duplicated, the <i>local</i> variables we made will have been as well. <br/><br/>With this new cog selected, change the player number to 2."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-37`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>

            },
            /* STEP 38 -- test your quiz */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Connect a second cog and try it out!<br/><br/>Now whichever cog buzzes first after a question was asked will get the chance to answer<br/><br/>You can add more players by duplicating cog more times!<br/><br/>Remember to update the <i>player number</i> variable on each cog<br/><br/>You’ll also need to set the number of players variable to match the <i>number</i> of players"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-38`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>

            },
            /* STEP 39 -- work out the winner */
            {
                type: "info",
                image: `${BUCKET_URL}step-39.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Ok!<br/><br/>Now we need to work out who the winner is at the end of the quiz. <br/><br/>Go back to the sprite code <br/><br/>Make another block called <i>announce winners</i>, and call it after the main question loop"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-39`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>

            },
            /* STEP 40 -- max score */
            {
                type: "info",
                image: `${BUCKET_URL}step-40.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Firstly, we'll work out what the highest score is. <br/><br/>Make another block called <i>find max score</i>. <br/><br/> Under the <i>define [find max score]</i> block, add these blocks:<ul><li>set [maxScore] to [item [1] of [scores]]</li><li>set [playerID] to [1]</li><li>repeat [length of [scores]]</li><ul>if [[item [playerID] of [scores]] > [maxScore]] then</li><ul><li>set [maxScore] to [item [playerID] of [scores]]</li><ul><li>change [playerID] by [1]</li></ul></li></ul></li></ul><br/><br/> You'll need to make the <i>maxScore</i> and <i>playerID</i> variables. <br/><br/>This code will <li>iterate</li> through the scoreboard - step through it one entry at a time - and will set the <i>maxScore</i> variable to the highest score it finds along the way.<br/><br/>Click on that section of code to run it - the <i>maxScore</i> variable should end up set to whatever the highest value is in the scores list"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-40`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>

            },
            /* STEP 41 -- how many players with score */
            {
                type: "info",
                image: `${BUCKET_URL}step-41.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now we know what the highest score is, we need to know how many players got that score. <br/><br/>Make another new block called <i>how many players with score [score]</i> - you can do this by pressing the <i>Add an input number or text</i> button in the Make a Block window."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-41`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>

            },
            /* STEP 42 -- add blocks */
            {
                type: "info",
                image: `${BUCKET_URL}step-42.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks to the <i>define [how many players with score [score]]</i> block:<ul><li>set [result] to [0]</li><li>set [playerID] to [0]</li><li>repeat [length of [scores]]</li><ul><li>change [playerID] by [1]</li><li>if [[item [playerID] of [scores]] = [score]] then</li><ul><li>change [result] by [1]</li></ul></ul></ul>This new block (or function) is a little different from the ones we made before, because it takes in a parameter - the score we want to look for. <br/><br/>You can drag that <i>score</i> parameter down from the define block to use it in your code. It's like a variable, but it can only be used in this function."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-42`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>

            },
            /* STEP 43 -- try it out */
            {
                type: "info",
                image: `${BUCKET_URL}step-43.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"To try that out, try running the how many players with score [] block with the score parameter set to a number that is in your scores list. The result variable will be set to the number of players with that score."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-43`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>

            },
            /* STEP 44 -- announce winners */
            {
                type: "info",
                image: `${BUCKET_URL}step-44.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s start building the <i>announce winners</i> function that we created earlier. Add these blocks to the <i>define [announce winners]</i> block:<ul><li>Find max score</li><li>How many players with score [maxScore]</li><li>If [[result] = [1] then</li><ul><li>Say [ join [The winner, with a score of ] [maxScore]] for [5] seconds</li><li>Say [join [is Player ] [item # of [maxScore] in [scores]]</li></ul></ul>Now when this runs, the <i>maxScore</i> variable will be set to the highest score by the <i>find max score</i> function. Then, the <i>result</i> variable will be set to the number of players with that score by the <i>how many players with score [maxScore]</i> block. If there’s only one winner, it’s very easy just to say who they are - and we can use the <i>item # of [maxScore] in [scores]</i> block to look up where that score is on the scoreboard. But if there is a tie and there is more than one winner, things are a little more complicated."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-44`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>

            },
            /* STEP 45 -- announce winners (continued) */
            {
                type: "info",
                image: `${BUCKET_URL}step-45.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Inside the <i>else</i> part of the <i>if … else</i> block, add these blocks<ul><li>Say [join [join [There are ] [result]] [ winners!]] for [5] seconds</li><li>Say [join [With scores of ] [maxScore]] for [5] seconds</li><li>Set [winners] to [join [Player] [item # of [maxScore] in [scores]]</li><li>Set [playerID] to [item # of [maxScore] in [scores]</li><li>Repeat until [[playerID] = [length of [scores]]</li><li>Change [playerID] by [1]</li><li>If [[item [playerID] of [scores] = [maxScore]] then</li><li>Set [winners] to [join [join [winners] [ and Player]] [playerID]</li><li>Say [winners]</li></ul>Now if there is more than one winner, the sprite will say how many there are, and then list them Variables can store more than just numbers - here the <i>winners</i> variable is used to build up a string of text that lists all the winners</br></br>The <i>repeat until</i> loop iterates through from the first score in the list that matches the <i>maxScore</i> variable through to the end. Every time it finds another score that matches, it adds that player to the <i>winners</i> variable."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-45`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>

            },
            /* STEP 46 -- try it out! */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out! <br/> Now at the end of the quiz the winners will be listed, even if there is a tie!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-46`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>

            },

            /* STEP 47 -- wrap up */
            {
                type: "end",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Well done! You coded up a game show using cogs as the contestants buzzers!<br/><br/>You used <b>lists</b> to store the questions, answers, and the scoreboards<br/><br/>You used <b>local variables</b> so that each cog could keep track of its player number separately.<br/><br/>We learned about using <b>functions</b> (making our own blocks) to keep our code neat and more easy to read. Easy to read code is easier to debug - and breaking down long complicated sections of code into smaller chunks is called <b>Functional Decomposition</b><br/><br/>Functions are also super useful where you might want to run code more than once and you don’t want to copy and paste it over and over again<br/><br/>You also learned how functions can have parameters. The how many players with score function takes in a score to look for<br/><br/>Next steps<ul><li>Can you add more questions and answers (and maybe more cogs) to your quiz?</li></ul>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-13.step-47`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>

            }
        ]
    }
}

export default cogBlocksTutorial13;