import React from 'react';
import { FormattedMessage } from 'react-intl';


const BUCKET_URL = "https://content.robotical.io/static/tutorials/cog/blocks/11/";

const cogBlocksTutorial11 = {
    'type-lesson-cog-tutorial-11': {
        id: "type-lesson-cog-tutorial-11",
        name: <FormattedMessage
            defaultMessage={"Interval Timer Stopwatch"}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.name`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        type: "lesson",
        urlId: "cog-blocks-11",
        description: <FormattedMessage
            defaultMessage={"Let’s make a stopwatch with a lap timer!<br /><br />This is a special stopwatch that will keep track of as many lap times as we want<br />We’ll use a list to store these."}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.description`}
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
                    defaultMessage={"Let’s make a stopwatch with a lap timer!<br /><br />This is a special stopwatch that will keep track of as many lap times as we want<br />We’ll use a list to store these."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-1`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },

            /* STEP 2 -- make a list */
            {
                type: "info",
                image: `${BUCKET_URL}step-2.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Start off by making a list called <b>times</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-2`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 3 -- add blocks */
            {
                type: "info",
                image: `${BUCKET_URL}step-3.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks:<br /><ul><li>On button press</li><li>Add <b>timer</b> to <b>times</b></li><li>Reset timer</li></ul>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-3`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 4 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Push the button on cog - every time you push it a new time will be added to the list!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-4`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 5 -- add variable */
            {
                type: "info",
                image: `${BUCKET_URL}step-5.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"There are a couple of problems though, the first time that we added was a bit random as we hadn’t set up the timer first.<br /><br />We also have no way of stopping the timer and clearing the list of lap times.<br /><br />Let’s fix that!<br /><br />Add a variable called <b>started</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-5`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },  

            /* STEP 6 -- on shake */
            {
                type: "info",
                image: `${BUCKET_URL}step-6.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We’ll make shaking cog stop the timer running.<br /><br />Add these blocks:<br /><ul><li>On shake</li><li>Set <b>started</b> to <b>false</b></li></ul>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-6`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 7 -- change button code */
            {
                type: "info",
                image: `${BUCKET_URL}step-7.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now let’s change what the button does based on the state of the stopwatch - i.e. depending on whether it is started or not.<br /><br />Change the code under the <b>on button press</b> block to be:<br /><ul><li>On button press</li><li>If <b>started</b> = <b>true</b> then</li><ul><li>Add <b>timer</b> to <b>times</b></li></ul><li>Else</li><ul><li>Delete all of <b>times</b></li></ul><li>Reset timer</li></ul><br />So, if the stopwatch has been started then the lap time will be added to the list. If not, the list of old times will be cleared ready to start a new list.<br /><br />In both cases the timer will be reset, ready to record the next lap time.<br /><br />Can you spot what’s missing from this code?"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-7`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 8 -- set started to true */
            {
                type: "info",
                image: `${BUCKET_URL}step-8.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Well done if you spotted that we also need to set the <b>started</b> variable to <b>true</b> once the stopwatch has been started!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-8`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 9 -- try it out */
            {
                type: "info",
                video: `${BUCKET_URL}step-9.webm`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Shake cog to reset everything, then push the button to start the timer - that will clear the old times from the list and reset the timer.<br /><br />Every time you push the button after that a new time will be added to the list!<br /><br />If you shake cog again after the last time has been recorded you’ll reset it so that the next button push will start a new set of times."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-9`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 10 -- add feedback */
            {
                type: "info",
                image: `${BUCKET_URL}step-10.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"That works well as a stopwatch!<br /><br />But it’s a little tricky for our users to know what state the stopwatch is in - is it started or stopped?<br /><br />Let’s add some feedback for that.<br /><br />In the <b>on shake</b> blocks, under the <b>set started to false</b> block, add these blocks:<br /><ul><li>Turn off all LEDs</li><li>Set <b>button</b> LEDs to <b>red</b></li></ul><br />Now whenever you shake cog to reset it, it’ll stop whatever the LEDs were doing and just light the button up showing that it’s stopped and ready to be started."}    
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-10`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 11 -- add light and sound feedback */
            {
                type: "info",
                image: `${BUCKET_URL}step-11.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We also need to add feedback to show when the button is successfully pushed and when the stopwatch is running.<br /><br />At the end of the <b>on button press</b> blocks, add these blocks:<br /><ul><li>Set <b>ring</b> LEDs to <b>green</b></li><li>Play note <b>C6</b> for <b>0.5</b> seconds</li><li>Set <b>ring</b> LEDs to <b>blue</b></li><li>Set <b>ring</b> LEDs to pattern <b>Spin1</b></li></ul><br />Now whenever you press the button you’ll get a confirmatory noise and the light will flash green, before they start spinning blue to indicate that the stopwatch is running."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-11`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },  


            /* STEP 12 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />It’s much easier now to see whether the stopwatch is stopped or started."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-12`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 13 -- spot the bug */
            {
                type: "info",
                video: `${BUCKET_URL}step-13.webm`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Can you spot the bug in our code though?<br /><br />What happens if you try and record times less than 0.5 seconds?<br /><br />You won’t be able to - because the code from the previous button press will still be executing and playing the note.<br /><br />How could we fix this, while still playing the note for 0.5 seconds?"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-13`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 14 -- broadcast block */
            {
                type: "info",
                image: `${BUCKET_URL}step-14.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"One way of fixing this is to use the broadcast block to send a message to trigger the lights and sound instead.<br /><br />Remember how the broadcast and wait block wouldn’t finish executing until all the code that it triggered was finished? The broadcast block doesn’t do that, so as soon as it has sent the button push message it will finish executing."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-14`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 15 -- try it out */
            {
                type: "info",
                video: `${BUCKET_URL}step-15.webm`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />It’s much easier now to see whether the stopwatch is stopped or started."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-15`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 16 -- add variables */
            {
                type: "info",
                image: `${BUCKET_URL}step-16.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Cool, now our stopwatch is working pretty well!<br /><br />Often when we’re doing circuits we want to know our average time. Let’s make our stopwatch calculate that too!<br /><br />Add two variables, one called <b>average</b> and once called <b>counter</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-16`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 17 -- set up variables */
            {
                type: "info",
                image: `${BUCKET_URL}step-17.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We’ll calculate the average after we stop the stopwatch by shaking cog.<br /><br />Add these blocks below the <b>Set button LEDs to red</b> block:<br /><ul><li>Set <b>average</b> to 0</li><li>Set <b>counter</b> to 0</li></ul><br />That will get our variables ready for calculating the average.<br /><br />Have a think now about how you’d work out the average of a list of numbers?"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-17`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 18 -- repeat loop */
            {
                type: "info",
                image: `${BUCKET_URL}step-18.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"To get the average you add up all the numbers in the list, and then divide by the number of items.<br /><br />We’ll iterate through the list using a repeat loop, and add up all the items.<br /><br />Add a repeat block and set the number of repeats to <b>length of times</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-18`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 19 -- change counter */
            {
                type: "info",
                image: `${BUCKET_URL}step-19.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We’ll use the counter variable to keep track of where we are in the list as we add up all the times.<br /><br />Inside the repeat loop add a block to <b>change counter by 1</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-19`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 20 -- calculate average */
            {
                type: "info",
                image: `${BUCKET_URL}step-20.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"In blocks, the first item on the list is item 1, so on the first time through the repeat loop the counter variable will be changed from 0 to 1. On the second time through the loop it’ll be changed to 2, etc.<br /><br />We’ll then use that counter to increase the average variable by the next number in the list.<br /><br />Add the block <b>change average by item counter of times</b>.<br /><br />When the repeat loop has finished, it will have iterated through every item in the list, and added each number to the average variable."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-20`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 21 -- divide by counter */
            {
                type: "info",
                image: `${BUCKET_URL}step-21.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Ok, it’s going well, but now the average variable is actually storing the sum of all our times.<br /><br />To get the average we’ll need to divide it by the number of items in the list.<br /><br />Add a <b>set average to [average / counter]</b> block.<br /><br />The counter variable is currently set to have counted how many items were in the list, so we can use it as the divisor to get the average."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-21`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 22 -- try it out */
            {
                type: "info",
                video: `${BUCKET_URL}step-22.webm`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Now when you shake cog the average variable will be set to the average of all the times you recorded!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-22`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            {
                type: "end",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Well done!<br /><br />You’ve made a very fancy stopwatch that can record loads of lap times, tell you how many lap times it’s recorded, and even calculate the average for you!<br /><br />What could you use the lap timer to time?<br /><br />Can you use the lights on cog to give more feedback when the stopwatch is running? Maybe show seconds passing by turning on LEDs on cog?"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-11.step-23`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            }
        ]
    }
}

export default cogBlocksTutorial11;
