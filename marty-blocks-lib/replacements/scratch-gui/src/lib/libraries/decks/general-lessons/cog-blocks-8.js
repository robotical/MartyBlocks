import React from 'react';
import { FormattedMessage } from 'react-intl';


const BUCKET_URL = "https://content.robotical.io/static/tutorials/cog/blocks/8/";

const cogBlocksTutorial8 = {
    'type-lesson-cog-tutorial-8': {
        id: "type-lesson-cog-tutorial-8",
        name: <FormattedMessage
            defaultMessage={"Clock"}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.name`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        type: "lesson",
        urlId: "cog-blocks-8",
        description: <FormattedMessage
            defaultMessage={"Let’s turn Cog into a clock!<br /><br />There are 12 LEDs in the ring on Cog, so we can use things like this hands on a clock to indicate hours, minutes and seconds!<br /><br />We’ll think a bit about the mathematics needed, and get creative with different ways to show the time!"}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.description`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        img: `${BUCKET_URL}cover_image.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['cog', 'time', 'maths', 'fractions', 'remainders', 'modulo', 'rounding'],
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
                    defaultMessage={"Let’s turn Cog into a clock!<br /><br />There are 12 LEDs in the ring on Cog, so we can use things like this hands on a clock to indicate hours, minutes and seconds!<br /><br />We’ll think a bit about the mathematics needed, and get creative with different ways to show the time!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-1`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },

            /* STEP 2 -- turn off all LEDs and set LED 1 to red */
            {
                type: "info",
                image: `${BUCKET_URL}step-2.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add the following blocks to your code:<br /><br /><b>when green flag clicked</b><ul><li>turn off all LEDs</li><li>set LED [1] to [red]</li></ul>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-2`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: ["event_whenflagclicked=>cog_turnOffLEDs=>cog_setLEDToColour"],
            },

            /* STEP 3 -- current hour */
            {
                type: "info",
                image: `${BUCKET_URL}step-3.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the <i>sensing</i> category and drag the <b>current [year]</b> block into the coding area.<br /><br />Change it to say <b>current [hour]</b> and click on it.<br /><br />Just like the sensors on Cog change value, this block will change to represent the current time."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-3`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [{
                    type: "HighlightElement",
                    elementId: "category-sensing",
                    hexColor: "#855cd659",
                    onClickAction: "HighlightBlocks",
                    args: {
                        blocks: ["current"]
                    }
                }],
                expectedCode: ["current"],
            },

            /* STEP 4 -- 24 hour clock */
            {
                type: "info",
                image: `${BUCKET_URL}step-4.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"The Blocks interface, like most computers, uses a 24 hour clock.<br /><br />If it’s in the morning, the current hour will be between 0 and 11.<br /><br />If it’s the afternoon, the current hour will be between 12 and 23.<br /><br />Normal analog clocks or watches use a 12-hour clock instead, where there are two 12 hour segments (am and pm) in a 24 hour day.<br /><br />Cog has 12 LEDs in the ring, so we’ll also use a 12 hour clock. How can we change the number in the Blocks interface from a 24 hour clock to a 12 hour clock?<br /><br />We could check if the hour is greater than 11, and if so then subtract 12.<br /><br />Or we could use the modulus operator, which gives you the remainder after you do a division.<br /><br />So here, if we divide 17 by 12, we get an answer of 1 with a remainder of 5 (or 1r5). 17:00 in the 24 hour clock is 5:00pm in the 12 hour clock, so that checks out!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-4`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 5 -- set LED */
            {
                type: "info",
                image: `${BUCKET_URL}step-5.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Put the <b>[[current [hour]] mod [12]]</b> in as the LED id in the <b>set LED</b> block.<br /><br />Try running the code by pressing the green flag - Cog will show a single red light that shows where the hour hand would be on a clock!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-5`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 6 -- current minute */
            {
                type: "info",
                image: `${BUCKET_URL}step-6.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We probably want to show more than just the hour on our clock, so let’s figure out how to display the minutes too.<br /><br />The <b>current [minute]</b> block will give you the minute as a number between 0 and 59!<br /><br />Drag it into the code area and click it to see the current minute."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-6`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [{
                    type: "HighlightElement",
                    elementId: "category-sensing",
                    hexColor: "#855cd659",
                    onClickAction: "HighlightBlocks",
                    args: {
                        blocks: ["current"]
                    }
                }],
                expectedCode: [],
            },

            /* STEP 7 -- minutes on a clock */
            {
                type: "info",
                image: `${BUCKET_URL}step-7.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"There’s another problem though, we need to show 60 minutes on only 12 LEDs!<br /><br />On a clock the minute hand makes one rotation every hour, starting at the 12 o’clock position. When the time is 30 minutes past the hour, the minute hand is in the 6 o’clock position, halfway through a rotation.<br /><br />The LEDs on Cog are numbered like the hour marks on a clock. The minute hand moves 5 minutes between each of the numbers on a clock. That makes sense because 60 minutes / 12 numbers = 5 minutes per number.<br /><br />So, if we use the division operator to divide the <b>current [minute]</b> by 5, we’ll know which LED to turn on to show the minute hand on our clock.<br /><br />There’s yet another problem though - just dividing the minute by 5 will normally not give a whole number, and we need to specify the LED as a whole number (or integer).<br /><br />To go from the number with a decimal point to a whole number we need to round it. If just round then Blocks will either round up or down, depending on whether the fraction is below .5, or .5 or above."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-7`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 8 -- round down */
            {
                type: "info",
                image: `${BUCKET_URL}step-8.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"For our clock though, we don’t want the minute hand to move to the next position until the minute hand should be fully there. For example at 5:09pm, we’d still want the minute hand to be at the “1” position.<br /><br />To do that, we’ll need to always round down. There is a way of doing that in Blocks - using the <b>floor</b> operator. You can find that on the operator which says <b>[abs]</b> by default, in the dropdown list."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-8`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 9 -- set LED floor */
            {
                type: "info",
                image: `${BUCKET_URL}step-9.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a block to <b>set LED [[floor] of [[current [minute]] / [5]] to [blue]</b>.<br /><br />Try it out! Press the green flag and now Cog will show the minute hand as a blue light, as well as the hour hand as a red light."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-9`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [""],
            },

            /* STEP 10 -- set LED seconds */
            {
                type: "info",
                image: `${BUCKET_URL}step-10.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"How would you show the seconds too?<br /><br />Add another <b>Set LED</b> block but this time make it set LED <b>[[floor] of [[current [second]] / [5]] to [green]</b>.<br /><br />Remember that you can right click, or press and hold, a block to get the option to duplicate it - that can save a lot of time."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-10`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 11 -- try it out */
            {
                type: "info",
                image: `${BUCKET_URL}step-11.jpg`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Now you’ll get three “hands” on the clock - red for hours, blue for minutes, and green for seconds!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-11`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 12 -- forever loop */
            {
                type: "info",
                image: `${BUCKET_URL}step-12.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s make it so that the time updates automatically. Add a <b>forever</b> loop and a <b>wait [5] seconds</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-12`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 13 -- try it out */
            {
                type: "info",
                video: `${BUCKET_URL}step-13.mp4`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Now every 5 seconds the time will update and the hands will move around the clock!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-13`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 14 -- pause between LEDs */
            {
                type: "info",
                image: `${BUCKET_URL}step-14.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"It’s a bit confusing if the different hands are in the same place, try adding a small pause between each LED, and changing the pause at the end to only 3 seconds."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-14`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 15 -- try it out */
            {
                type: "info",
                video: `${BUCKET_URL}step-15.mp4`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Now it’ll show the hours, minutes and seconds one at a time."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-15`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 16 -- am or pm */
            {
                type: "info",
                image: `${BUCKET_URL}step-16.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"It would be cool to be able to show whether it was am or pm too.<br /><br />We could do this by changing the background color of the clock depending on whether the hour is less than 12.<br /><br />Replace the <b>Turn off all LEDs</b> block with an <b>if … else</b> block that checks whether the current hour is < 12.<br /><br />Then choose two different colors to set the ring LEDs for pm and am. In this example we’ve chosen orange for am and purple for pm - the colors must be different from the ones you’re using to show the hands on the clock."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-16`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 17 -- try it out */
            {
                type: "info",
                image: `${BUCKET_URL}step-17.jpg`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Now your clock will show you whether it’s am or pm by changing color!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-17`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 18 -- show hours */
            {
                type: "info",
                image: `${BUCKET_URL}step-18.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"How else could we show the time?<br /><br />This code will show the hour by how turning on all the LEDs from the 12 o’clock position to the current hour - so as the time gets later more LEDs will turn on.<br /><br />Delete your previous clock code and try it out!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-18`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 19 -- three Cogs */
            {
                type: "info",
                video: `${BUCKET_URL}step-19.mp4`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"If you have friends who also have a Cog, can you use three of them to show the time - one showing hours, one minutes, and one seconds, like this?"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-19`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 20 -- slow clock */
            {
                type: "info",
                image: `${BUCKET_URL}step-20.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"You could also use one cog to show the hours progressing more slowly, by gradually turning on the next LED as the minutes pass.<br /><br />Delete your previous clock code and try it out!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-20`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 21 -- try it out */
            {
                type: "info",
                image: `${BUCKET_URL}step-21.jpg`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />The LEDs will slowly turn on as time passes - for example in this picture our clock is showing half past 6!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-21`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 22 -- animate seconds */
            {
                type: "info",
                video: `${BUCKET_URL}step-22.mp4`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"If you have time, we can try and make our original clock more sophisticated.<br /><br />We can animate the second hand to flash every second, like this - then it won’t matter if it covers up the other hands."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-22`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 23 -- make a list */
            {
                type: "info",
                image: `${BUCKET_URL}step-23.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"To do this, we’re going to use a list to keep track of which color each LED should be.<br /><br />Go to the <b>Variables</b> category and click the <b>Make a List</b> button to make a list called <b>leds</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-23`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [{
                    type: "HighlightElement",
                    elementId: "category-variables",
                    hexColor: "#855cd659",
                    onClickAction: "HighlightBlocks",
                    args: {
                        blocks: ["make_a_list"]
                    }
                }],
                expectedCode: [],
            },

            /* STEP 24 -- delete previous code */
            {
                type: "info",
                image: `${BUCKET_URL}step-24.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Lists are special variables that can contain an ordered list of individual variables.<br /><br />Delete your previous code and add the blocks shown in the image."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-24`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 25 -- run code */
            {
                type: "info",
                image: `${BUCKET_URL}step-25.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Press the green flag to run the code, the <b>leds</b> list will get 12 color codes put in it - one for each LED on Cog."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-25`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 26 -- make variables */
            {
                type: "info",
                image: `${BUCKET_URL}step-26.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Make two new variables called <b>hour</b> and <b>minute</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-26`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 27 -- set hour and minute */
            {
                type: "info",
                image: `${BUCKET_URL}step-27.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add blocks to set these variables to the positions of the hour and minute hands, using the same mathematics that you did before."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-27`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 28 -- replace item in list */
            {
                type: "info",
                image: `${BUCKET_URL}step-28.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now we’ll change the items in the list to set the colors for the hour and minute hands.<br /><br />The <b>replace item</b> block will change the item at the specified position in the list. Since the list starts numbering its items at 1 we need to add 1 to the hour and minute variables."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-28`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 29 -- try it out */
            {
                type: "info",
                image: `${BUCKET_URL}step-29.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try running the code by pressing the green flag.<br /><br />Now the list will update with different color codes for the hour and minute hands."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-29`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 30 -- if statement */
            {
                type: "info",
                image: `${BUCKET_URL}step-30.png`,
                description: <FormattedMessage
                    isRaw={true}    
                    defaultMessage={"Let’s make something to cope better when the hour and minute hands are in the same place.<br /><br />Add an <b>if</b> statement to check if the hour and minute variables are the same (i.e. if the hour and minute hands are in the same place).<br /><br />If so, change the item in the list to a different color - in this case we’ve chosen purple by setting red and blue to 255 and green to 0."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-30`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 31 -- set LEDs */
            {
                type: "info",
                image: `${BUCKET_URL}step-31.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Ok, so we’ve now got a list that represents the colors we’d like to show on the LEDs on Cog - it’s time to display them!<br /><br />Make another variable called <b>ledID</b> and use it in a loop to set the 12 LEDs on Cog.<br /><br />To set the different colors we’ll refer to the items on the <b>leds</b> list using the <b>item</b> block - remembering to add 1."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-31`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 32 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />The 12 color codes in the <b>leds</b> list will be shown as colors on Cog."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-32`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 33 -- wait until minute hand changes */ 
            {
                type: "info",
                image: `${BUCKET_URL}step-33.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s put the code into a loop so it updates automatically.<br /><br />Add a <b>wait until</b> block at the end, and set it to wait until the minute hand needs to change, by checking the value of where the minute hand should be against the value stored in the <b>minute</b> variable."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-33`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 34 -- forever loop */
            {
                type: "info",
                image: `${BUCKET_URL}step-34.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Then put the code into a <b>forever</b> loop so that it runs repeatedly."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-34`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 35 -- second hand */
            {
                type: "info",
                image: `${BUCKET_URL}step-35.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now it’s time to add the second hand!<br /><br />We’ll do this in a parallel section of code, so add another <b>when green flag clicked</b> block."}
                    description=""  
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-35`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 36 -- second variable */
            {
                type: "info",
                image: `${BUCKET_URL}step-36.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Make another variable called <b>second</b>, and set it in the same way we’ve set the second hand position before."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-36`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 37 -- set second hand */
            {
                type: "info",
                image: `${BUCKET_URL}step-37.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now add blocks to set the second hand LED to green, wait for a second, then change it back to the color that’s in the <b>leds</b> list.<br /><br />In this way, we’ve remembered what color the LED should be after we change it. The <b>leds</b> list is being used to remember the state of the hour and minute hands on our clock."}
                    description=""  
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-37`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 38 -- second hand forever loop */
            {
                type: "info",
                image: `${BUCKET_URL}step-38.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Put the second hand code in a <b>forever</b> loop too."}
                    description=""          
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-38`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 39 -- try it out */
            {
                type: "info",
                image: `${BUCKET_URL}step-39.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Your code should now look like this - Try it out!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-39`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 40 -- well done */
            {
                type: "end",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Well done!<br /><br />You’ve used a lot of math to make a clock with Cog! You thought about different ways you could display the time.<br /><br />If you made it to the end, you also learned about lists as a way to store ordered information such as the state of each LED on Cog.<br /><br />Next Steps:<ul><li>Can you make this new clock change the background color depending on whether it’s am or pm?</li><li>Would it make more sense if the “second” hand actually rotated once every 5 minutes, to show the time more accurately? What would you change to make that happen?</li></ul>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-8.step-40`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },
        ]
    }
}

export default cogBlocksTutorial8;
