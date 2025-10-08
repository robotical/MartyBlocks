import React from 'react';
import { FormattedMessage } from 'react-intl';


const BUCKET_URL = "https://content.robotical.io/static/tutorials/cog/blocks/10/";


const cogBlocksTutorial10 = {
    'type-lesson-cog-tutorial-10': {
        id: "type-lesson-cog-tutorial-10",
        name: <FormattedMessage
            defaultMessage={"Flying Bat Game"}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.name`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        type: "lesson",
        urlId: "cog-blocks-10",
        description: <FormattedMessage
            defaultMessage={"Let’s make another game!<br /><br />This time we’ll make a game about a fruit bat that’s quite picky about what it eats."}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.description`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        img: `${BUCKET_URL}cover_image.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['cog', 'sensing', 'measurement', 'conditionals', 'loops', 'comparators', 'operators', 'frequencies'],
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
                    defaultMessage={"Let's make another game!<br /><br />This time we’ll make a game about a fruit bat that’s quite picky about what it eats."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-1`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },

            /* STEP 2 -- make variables */
            {
                type: "info",
                image: `${BUCKET_URL}step-2.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We’ll make the bat fly left and right using the tilt sensing on cog again.<br /><br />As you’ve done before, make a variable called <b>ay</b>.<br /><br />We’ll also be keeping score in this game, so make a variable called <b>score</b> too."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-2`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 3 -- set up */
            {
                type: "info",
                image: `${BUCKET_URL}step-3.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks:<ul><li>When green flag clicked</li><ul><li>Set score to [0]</li><li>Forever</li><ul><li>Set [ay] to [Accelerometer [Y]]</li><li>Broadcast [update position]</li></ul></ul></ul><br />They will:<ul><li>Let the user start the game by pressing the green flag</li><li>Reset the score when the game starts</li><li>Update the ay variable to the value of the accelerometer Y axis in a loop, and broadcast the update position message</li></ul><br />We’ll use the <b>ay</b> variable and the <b>update position</b> message to change the position of our sprite."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-3`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 4 -- add bat sprite */
            {
                type: "info",
                image: `${BUCKET_URL}step-4.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s add the sprite now.<br /><br />Press the <b>Choose a Sprite</b> button and then select the Bat sprite."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-4`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 5 -- update position */
            {
                type: "info",
                image: `${BUCKET_URL}step-5.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"With the Bat sprite selected, add these blocks:<ul><li>When I receive [update position]</li><ul><li>Set x to [[ay] * 200]</li></ul></ul><br />This means that every time the <b>ay</b> variable is updated, we’ll move the position of the bat too.<br /><br />The ay variable will mostly vary between -1 and 1, so by multiplying by 200 we’ll set the x position to be between -200 and 200."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-5`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 6 -- try it out */
            {
                type: "info",
                video: `${BUCKET_URL}step-6.webm`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Press the green flag, and then tilt cog from side to side, the bat will move too!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-6`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 7 -- make bat smaller and fall */
            {
                type: "info",
                image: `${BUCKET_URL}step-7.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s make our bat a little smaller, and make it fall down the screen by default.<br /><br />Add these blocks:<ul><li>When green flag clicked</li><li>Set size to [50]%</li><li>Forever</li><ul><li>Change y by [-10]</li><li>Wait [0.1] seconds</li></ul></ul></ul><br />Now when you press the green flag and run the program the bat will slowly fall down the screen!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-7`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 8 -- flap wings */
            {
                type: "info",
                image: `${BUCKET_URL}step-8.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s make a way for the bat to flap its wings and climb again.<br /><br />Select Cog again."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-8`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 9 -- add flap block */
            {
                type: "info",
                image: `${BUCKET_URL}step-9.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks:<ul><li>On object sensed [right]</li><li>Broadcast [flap]</li></ul><br />We’ll use the right IR object sensor to be the button for making the bat flap its wings, and we’ll use a new message called <b>flap</b> to send that instruction to the bat sprite."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-9`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 10 -- select bat sprite */
            {
                type: "info",
                image: `${BUCKET_URL}step-10.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Select the Bat sprite."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-10`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 11 -- add flap behavior */
            {
                type: "info",
                image: `${BUCKET_URL}step-11.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Find the next costume block in the Looks category.<br /><br />Try clicking on it - you should see that the sprite of the bat changes to one in a different pose!<br /><br />Click on it a few times - the Bat sprite has four different poses, which are called costumes in the Blocks interface.<br /><br />We can use these costumes to animate movements on the bat."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-11`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 12 -- add flapping code */
            {
                type: "info",
                image: `${BUCKET_URL}step-12.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks:<ul><li>When I receive flap</li><li>Repeat [4]</li><ul><li>Next costume</li><li>Change y by [10]</li></ul></ul><br />Since the bat has four costumes, we’ll do this loop 4 times to cycle through them all.<br /><br />At the same time, we’ll move the bat up the screen so that it floats up as it flaps its wings."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-12`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 13 -- switch costume */
            {
                type: "info",
                image: `${BUCKET_URL}step-13.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We should also make sure that the costume always starts with the right one at the start of the game.<br /><br />Add a switch costume to [bat-a] block just after the set size to [50]% block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-13`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 14 -- test the game */
            {
                type: "info",
                video: `${BUCKET_URL}step-14.webm`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Press the green flag to start the code, and then try tapping the right IR object sensor with your finger - the bat will fly up the screen!<br /><br />You can still tilt left and right to steer.<br /><br />Press the red stop sign to stop the code running."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-14`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 15 -- add background */
            {
                type: "info",
                image: `${BUCKET_URL}step-15.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s add a more fun backdrop too - bats often live in the woods and like night time, so let’s add a forest background.<br /><br />Click the <b>Choose a Backdrop</b> button.<br /><br />Then select the Woods backdrop.<br /><br />Now you can fly your bat through the woods!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-15`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 16 -- make a list */
            {
                type: "info",
                image: `${BUCKET_URL}step-16.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Ok - it’s time to make this more of a game!<br /><br />Let’s start by making a shopping list for our bat.<br /><br />Go to the <i>Variables</i> category and click the <b>Make a List</b> button."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-16`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 17 -- make a list called fruit */
            {
                type: "info",
                image: `${BUCKET_URL}step-17.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Our bat is a fruit bat, and they like to eat fruit!<br /><br />Make a list called <b>fruit</b>.<br /><br />An empty list will appear on the screen."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-17`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 18 -- empty the list */
            {
                type: "info",
                image: `${BUCKET_URL}step-18.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We can add things to the list using the new blocks that have appeared in the variables section.<br /><br />First off, we need to make sure that the bat has an empty list when the game starts.<br /><br />Add these blocks:<ul><li>When green flag clicked</li><li>Delete all of [fruit]</li></ul>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-18`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 19 -- add banana to list */
            {
                type: "info",
                image: `${BUCKET_URL}step-19.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Next we’ll add a couple of fruits to our bat’s shopping list.<br /><br />Add an <b>add [thing] to [fruit]</b> block, and change it to say <b>add [banana] to [fruit]</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-19`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 20 -- add apple to list */
            {
                type: "info",
                image: `${BUCKET_URL}step-20.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Do the same again to add an <b>apple</b> to the list."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-20`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 21 -- check the list */
            {
                type: "info",
                image: `${BUCKET_URL}step-21.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Press the green flag, now you’ll see that the banana and apple items are added to the fruit list!<br /><br />At the bottom it also tells you that the length of the list is 2 items."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-21`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 22 -- make a fruit variable */
            {
                type: "info",
                image: `${BUCKET_URL}step-22.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s get the bat to pick something that it wants off the shopping list.<br /><br />Make a new variable called <b>fruit</b>.<br /><br />You’ll note that you can have a variable called fruit and a list called fruit."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-22`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 23 -- get item from list */
            {
                type: "info",
                image: `${BUCKET_URL}step-23.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Find the <b>item [1] of [fruit]</b> block and drag it to the coding area.<br /><br />If you press on it you’ll see that it returns (outputs) the item that’s at the specified position in the list - in this case banana."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-23`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 24 -- get length of list */
            {
                type: "info",
                image: `${BUCKET_URL}step-24.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Find the <b>length of [fruit]</b> block and drag it to the coding area.<br /><br />If you press on it you’ll see that it returns the number of items in the list - in this case 2."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-24`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 25 -- get last item in list */
            {
                type: "info",
                image: `${BUCKET_URL}step-25.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"If you combine those two blocks together so they say <b>item [length of [fruit]] of [fruit]</b>, it will find the last item in the list.<br /><br />That’s because the <b>length of [fruit]</b> block is evaluated first, and returns a value of 2, like you saw before. The <b>item</b> block is evaluated next, and takes that number 2 as an input, and then returns the second item in the list."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-25`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 26 -- pick random item from list */
            {
                type: "info",
                image: `${BUCKET_URL}step-26.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"How could we make the code pick a random item off the list?<br /><br />Use the <b>pick random</b> block from the Operators category and set it to pick a random number between 1 and <b>length of [fruit]</b>. Then put the whole random block into the <b>item</b> block, like this:<br /><br />When you press that, you’ll see that it randomly chooses either banana or apple."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-26`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 27 -- set fruit variable */
            {
                type: "info",
                image: `${BUCKET_URL}step-27.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks below the <b>add [apple] to [fruit]</b> block:<ul><li>Repeat [10]</li><ul><li>Set [fruit] to [item [pick random [1] to [length of [fruit]]] of [fruit]]</li><li>Broadcast [show fruit]</li><li>Think [fruit] for [5] seconds</li></ul></ul><br />You can find the think block in the Looks section, and can add the fruit variable to it."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-27`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 28 -- test fruit picking */
            {
                type: "info",
                video: `${BUCKET_URL}step-28.webm`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Now every 5 seconds the bat will pick a fruit at random to think about!<br /><br />The code will also send the <b>show fruit</b> message, which we’ll use shortly."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-28`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 29 -- add bananas sprite */
            {
                type: "info",
                image: `${BUCKET_URL}step-29.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s add those fruit into our game.<br /><br />Click the <b>Choose a sprite</b> button and select the Bananas sprite."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-29`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 30 -- add apples sprite */
            {
                type: "info",
                image: `${BUCKET_URL}step-30.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Drag the bananas to a better place on the screen."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-30`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 31 -- bananas code */
            {
                type: "info",
                image: `${BUCKET_URL}step-31.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"With the bananas selected, add these blocks:<ul><li>When green flag clicked</li><li>Forever</li><ul><li>If [touching [Bat]] then</li></ul></ul><br />This code will also run when the game is started, and will check to see if the bat is touching the bananas."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-31`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

          
            /* STEP 32 -- bananas condition */
            {
                type: "info",
                image: `${BUCKET_URL}step-32.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"If the bat has reached the bananas, we want to check whether that was the fruit it wanted to get.<br /><br />Add an <b>if … else</b> condition nested inside the if block, and set the condition to <b>[fruit] = [banana]</b>, where fruit is the variable you created before."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-32`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 33 -- correct fruit */
            {
                type: "info",
                image: `${BUCKET_URL}step-33.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"If the fruit is correct, we’ll increase the score by 1 and send the correct message.<br /><br />Otherwise, we’ll decrease the score by 1 and send the incorrect message."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-33`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 34 -- hide bananas */
            {
                type: "info",
                image: `${BUCKET_URL}step-34.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"To avoid scoring (or losing!) points more than once, we’ll make the bananas hide once the bat has reached them.<br /><br />Add a <b>hide</b> block after the if… else block - that means the bananas will always hide when the bat touches them."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-34`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 35 -- show fruit */
            {
                type: "info",
                image: `${BUCKET_URL}step-35.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Since we’re hiding the bananas, we need to have a way of showing them again.<br /><br />Previously we added code to send a <b>show fruit</b> message every time the bat picks a new fruit. We’ll use that as a signal to show the fruit.<br /><br />Add these blocks:<ul><li>When I receive [show fruit]</li><li>Show</li></ul><br />Now when the bat picks a new fruit, the bananas will show again."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-35`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 36 -- add apple sprite */
            {
                type: "info",
                image: `${BUCKET_URL}step-36.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add another sprite - this time the Apple sprite."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-36`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 37 -- move apple */
            {
                type: "info",
                image: `${BUCKET_URL}step-37.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Move the apple sprite to be on the other side of the stage."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-37`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 38 -- copy bananas code */
            {
                type: "info",
                video: `${BUCKET_URL}step-38.webm`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Copy the code from the Bananas to the Apple sprite by dragging it to the Apple sprite."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-38`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 39 -- change apple code */
            {
                type: "info",
                image: `${BUCKET_URL}step-39.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"With the Apple sprite selected, change the code so that it checks if the fruit variable is equal to <b>apple</b> instead."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-39`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 40 -- test the game */
            {
                type: "info",
                video: `${BUCKET_URL}step-40.webm`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Press the green flag to start, then try to collect the fruit that the bat is thinking of!<br /><br />Press the red stop sign to stop the code when you’re done."}
                    description=""  
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-40`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 41 -- add feedback */
            {
                type: "info",
                image: `${BUCKET_URL}step-41.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s add some feedback about whether you get the correct fruit.<br /><br />Select Cog again."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-41`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 42 -- add feedback blocks */
            {
                type: "info",
                image: `${BUCKET_URL}step-42.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks:<ul><li>When I receive [correct]</li><li>Set [ring] LEDs to [green]</li><li>Play note [C6] for [0.5] seconds</li><li>Turn off all LEDs</li></ul><br />And<br /><br /><ul><li>Set [ring] LEDs to [red]</li><li>When I receive [incorrect]</li><li>Play note [C4] for [0.5] seconds</li><li>Turn off all LEDs</li></ul><br />These will use the correct and incorrect messages that you coded before for the fruits, and make Cog light up and play a sound whenever you collect a fruit."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-42`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 43 -- test feedback */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Now you’ll get feedback from Cog as you collect fruit."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-43`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 44 -- well done */
            {
                type: "end",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Well done!<br /><br />You’ve learned how to use costumes in Blocks to animate sprites.<br /><br />You also learned how to make a list and choose items from it, and use those as part of a game.<br /><br />Next steps:<ul><li>Can you add more fruits?</li><li>Can you add something which the bat never wants to eat?</li><li>Can you make the game get more difficult as time passes?</li><li>Can you get Cog to display the score at the end?</li></ul>"}      
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-10.step-44`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

        ]
    }
}

export default cogBlocksTutorial10;
