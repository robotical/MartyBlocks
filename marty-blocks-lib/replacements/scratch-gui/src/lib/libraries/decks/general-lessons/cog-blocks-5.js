import React from 'react';
import { FormattedMessage } from 'react-intl';


const BUCKET_URL = "https://content.robotical.io/static/tutorials/cog/blocks/5/";

const cogBlocksTutorial5 = {
    'type-lesson-cog-tutorial-5': {
        id: "type-lesson-cog-tutorial-5",
        name: <FormattedMessage
            defaultMessage={"Spirit Level"}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.name`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        type: "lesson",
        urlId: "cog-blocks-5",
        description: <FormattedMessage
            defaultMessage={"Let's make another useful thing with Cog! <br /><br />This time we'll use Cog's tilt sensing to make a spirit level - something that shows if something is level or whether it is tilting. <br /><br />Lots of spirit levels only work in one dimension, but we'll make ours work in two!"}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.description`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        img: `${BUCKET_URL}cover_image.png`, // todo: add the image
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['cog', 'variables', 'loops', 'conditionals', 'sensors', 'physics & maths'],
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
                    defaultMessage={"<b>Let's make a spirit level</b> that shows if something is level or tilting!<br /><br />We'll use Cog's tilt sensing to make it work in two dimensions."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-1`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },
            /* STEP 2 -- make sure you're connected to cog */
            {
                type: "info",
                image: `${BUCKET_URL}connected.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"First, make sure you are connected to a cog.<br /><br />If not, add one like you did in the last tutorial by pressing the Add button in the devices panel and selecting a Cog, then clicking connect. If you need to, skip back to the last tutorial to see how"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-2`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "device-selector-action-menu",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightElement",
                        args: {
                            elementId: "library-item_Cog",
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: [],
            },

            /* STEP 3 -- go to the events category */
            {
                type: "info",
                image: `${BUCKET_URL}step-3.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the <b>Events</b> category and add an <b>on tilt [left]</b> event block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-3`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-events",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_onTilt"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["cog_onTilt"],
            },

            /* STEP 4 -- add a set LEDs using the colorpicker block */
            {
                type: "info",
                image: `${BUCKET_URL}step-4.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now go to the <b>Looks</b> category and add a <b>set LEDs using the colorpicker</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-4`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-looks",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_setLEDColourPicker"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["cog_onTilt=>cog_setLEDColourPicker"],
            },

            /* STEP 5 -- turn all the lights off */
            {
                type: "info",
                image: `${BUCKET_URL}step-5.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Click the <b>lights off</b> icon to turn all the lights off."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-5`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 6 -- set just one LED on the left to be on */
            {
                type: "info",
                image: `${BUCKET_URL}step-6.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Then set just one LED on the left to be on.<br /><br />Try it out! Tilt cog to the left."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-6`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 7 -- add another on tilt [left] block */
            {
                type: "info",
                image: `${BUCKET_URL}step-7.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add another <b>on tilt [left]</b> block from the control category and change it so that it says <b>on tilt [right]</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-7`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_onTilt"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["cog_onTilt=>cog_setLEDColourPicker", "cog_onTilt"],
            },

            /* STEP 8 -- connect that on tilt [right] block to another set LEDs using the colorpicker block */
            {
                type: "info",
                image: `${BUCKET_URL}step-8.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Connect that <b>on tilt [right]</b> block to another <b>set LEDs using the colorpicker</b> block and set it to have only the LED on the right on."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-8`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-looks",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_setLEDColourPicker"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["cog_onTilt=>cog_setLEDColourPicker", "cog_onTilt=>cog_setLEDColourPicker"],
            },

            /* STEP 9 -- try it out! */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Tilt cog left and right."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-9`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 10 -- add another set of on tilt and colorpicker blocks */
            {
                type: "info",
                image: `${BUCKET_URL}step-10.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add another set of <b>on tilt</b> and <b>colorpicker</b> blocks.<br /><br />Set it to react on <b>tilt [backward]</b> and to make only the LED at the 6 o’clock position turn on."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-10`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [
                    "cog_onTilt=>cog_setLEDColourPicker",
                    "cog_onTilt=>cog_setLEDColourPicker",
                    "cog_onTilt=>cog_setLEDColourPicker"
                ],
            },

            /* STEP 11 -- add a fourth set of blocks */
            {
                type: "info",
                image: `${BUCKET_URL}step-11.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Finally add a fourth set of blocks and set them to <b>on tilt [forward]</b>, and to turn on the LED at the front of cog."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-11`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [
                    "cog_onTilt=>cog_setLEDColourPicker",
                    "cog_onTilt=>cog_setLEDColourPicker",
                    "cog_onTilt=>cog_setLEDColourPicker",
                    "cog_onTilt=>cog_setLEDColourPicker"
                ],
            },

            /* STEP 12 -- try it out! */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Tilt cog in all four directions and see how the light moves around!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-12`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 13 -- go to the sensing category */
            {
                type: "info",
                image: `${BUCKET_URL}step-13.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let's show this information on the screen as well!<br /><br />Go to the <b>Sensing</b> category."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-13`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-sensing",
                        hexColor: "#855cd659",
                        onClickAction: "NextStep"
                    }
                ],
                expectedCode: [],
            },

            /* STEP 14 -- select the checkbox next to Accelerometer X */
            {
                type: "info",
                image: `${BUCKET_URL}step-14.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Select the checkbox next to <b>Accelerometer X</b>.<br /><br />Then change X to Y from the dropdown menu, and select the checkbox next to that."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-14`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 15 -- tilt cog around and look at how the numbers change */
            {
                type: "info",
                image: `${BUCKET_URL}step-15.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Tilt cog around and look at how the numbers change!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-15`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 16 -- open the sensor dashboard */
            {
                type: "info",
                image: `${BUCKET_URL}step-16.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let's look at that in a bit more detail, click the <b>Sensor Dashboard</b> button."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-16`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [{
                    type: "HighlightElement",
                    elementId: "sensor-dashboard-button",
                    hexColor: "#855cd659",
                    onClickAction: "NextStep"
                }],
                expectedCode: [],
            },

            /* STEP 17 -- add a new graph */
            {
                type: "info",
                image: `${BUCKET_URL}step-17.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Then click the button to <b>add a new graph</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-17`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 18 -- select your cog */
            {
                type: "info",
                image: `${BUCKET_URL}step-18.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"And select your Cog."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-18`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 19 -- select the accelerometer sensors */
            {
                type: "info",
                image: `${BUCKET_URL}step-19.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"A graph will appear!<br /><br />We need to select the sensors we want to display. Click to expand the <b>Accelerometer</b> category, and then check the boxes next to <b>X</b> and <b>Y</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-19`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 20 -- press the play button */
            {
                type: "info",
                image: `${BUCKET_URL}step-20.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Press the <b>play</b> button to start showing the sensor data."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-20`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 21 -- tilt cog and look at how the values change */
            {
                type: "info",
                image: `${BUCKET_URL}step-21.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Tilt cog and look at how the values for the X-axis and Y-axis change."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-21`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 22 -- close the sensor dashboard */
            {
                type: "info",
                image: `${BUCKET_URL}step-22.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Click the <b>x</b> button to close the sensor dashboard."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-22`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 23 -- do some science */
            {
                type: "info",
                image: `${BUCKET_URL}step-23.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let's do some science! You'll need some paper to take some notes.<br /><br />Tilt cog to the right and note down what value the accelerometer ax and accelerometer ay sensors have.<br /><br />Then do the same for tilting forwards, backwards, and to the left.<br /><br />We'll use this data in a little bit!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-23`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 24 -- make two variables */
            {
                type: "info",
                image: `${BUCKET_URL}step-24.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now go to the <b>Variables</b> category and make two variables called <b>ax</b> (for accelerometer x) and <b>ay</b> (for accelerometer y)."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-24`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-variables",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["make_a_variable"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: [],
            },

            /* STEP 25 -- add these blocks */
            {
                type: "info",
                image: `${BUCKET_URL}step-25.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks to your project:<br /><br /><ul><li>When flag clicked:</li><ul><li>Forever:</li><ul><li>Set ax to Accelerometer X</li><li>Set ay to Accelerometer Y</li></ul></ul></ul>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-25`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: ["event_whenflagclicked=>control_forever=>data_setvariableto=>data_setvariableto"],
            },

            /* STEP 26 -- go to the Events category */
            {
                type: "info",
                image: `${BUCKET_URL}step-26.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now go to the <b>Events</b> category."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-26`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-events",
                        hexColor: "#855cd659",
                        onClickAction: "NextStep"
                    }
                ],
                expectedCode: [],
            },

            /* STEP 27 -- add a broadcast [message1] block */
            {
                type: "info",
                image: `${BUCKET_URL}step-27.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>broadcast [message1]</b> block inside the forever loop."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-27`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["event_broadcast"],
                        hexColor: "#855cd659",
                        onClickAction: "NextStep"
                    }
                ],
                expectedCode: ["event_whenflagclicked=>control_forever=>data_setvariableto=>data_setvariableto=>event_broadcast"],
            },

            /* STEP 28 -- give the message a better name */
            {
                type: "info",
                image: `${BUCKET_URL}step-28.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let's give the message a better name, select <b>New message</b> from the dropdown."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-28`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 29 -- name the message "update position" */
            {
                type: "info",
                image: `${BUCKET_URL}step-29.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Then give the new message the name <b>update position</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-29`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 30 -- go to the sprites tab */
            {
                type: "info",
                image: `${BUCKET_URL}step-30.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now click on the <b>Sprites</b> tab at the top."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-30`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "sprite-selector-action-menu",
                        hexColor: "#855cd659",
                    }
                ],
                expectedCode: [],
            },

            /* STEP 31 -- add a new sprite */
            {
                type: "info",
                image: `${BUCKET_URL}step-31.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Click the <b>Add sprite</b> button and select the <b>Ball</b> sprite (or any other sprite you like)."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-31`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 32 -- your code will disappear */
            {
                type: "info",
                image: `${BUCKET_URL}step-32.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Your code will disappear! Don’t worry - it’s still there, just linked to cog rather than to this sprite.<br /><br />Go to the <b>Events</b> category and add a <b>when I receive [update position]</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-32`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-events",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["event_whenbroadcastreceived"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenbroadcastreceived"],
            },

            /* STEP 33 -- change it to when I receive "update position" */
            {
                type: "info",
                image: `${BUCKET_URL}step-33.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Change it so that it says <b>when I receive [update position]</b> - that’s the message we just made."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-33`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 34 -- go to the motion category */
            {
                type: "info",
                image: `${BUCKET_URL}step-34.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now go to the <b>Motion</b> category."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-34`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-motion",
                        hexColor: "#855cd659",
                        onClickAction: "NextStep"
                    }
                ],
                expectedCode: [],
            },

            /* STEP 35 -- add a go to x: [] y: [] block */
            {
                type: "info",
                image: `${BUCKET_URL}step-35.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>go to x: [] y: []</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-35`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["motion_gotoxy"],
                        hexColor: "#855cd659",
                        onClickAction: "NextStep"
                    }
                ],
                expectedCode: ["event_whenbroadcastreceived=>motion_gotoxy"],
            },

            /* STEP 36 -- explain coordinates */
            {
                type: "info",
                image: `${BUCKET_URL}step-36.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"The middle of the screen has the coordinates [0,0].<br /><br />Coordinates to the right of the middle have x values above 0.<br />Coordinates to the left of the middle have x values below 0.<br />Coordinates above the middle have y values above 0.<br />Coordinates below the middle have y values below 0."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-36`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 37 -- move the ball around */
            {
                type: "info",
                image: `${BUCKET_URL}step-37.gif`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We want to move the ball around to show how much Cog is tilted.<br /><br />Look back at the notes you made on which accelerometer readings you got when you tilted cog in each of the four directions.<br /><br />We want the ball to move left and right when you tilt cog left and right. For the sprite, left and right are set by its x coordinate.<br /><br />You should see that when you tilted cog to the right, the ay value was above 0, while the ax value was nearly 0. When you tilted to the left the ay value was below 0.<br /><br />This means we should use the ay value to set the x coordinate of the sprite."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-37`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },


            /* STEP 38 -- multiply the value */
            {
                type: "info",
                image: `${BUCKET_URL}step-38.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We’ll also need to make the number bigger by multiplying it.<br /><br />Go to the <b>Operators</b> category and drag a <b>multiplication</b> block into the x coordinate box."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-38`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-operators",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["operator_multiply"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
            },

            /* STEP 39 -- add the ay variable */
            {
                type: "info",
                image: `${BUCKET_URL}step-39.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the <b>Variables</b> category and add the <b>ay</b> variable to the multiplication block.<br /><br />Type <b>100</b> in the other side of the multiplication block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-39`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 40 -- look at your notes */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Look again at your notes on the accelerometer readings.<br /><br />Which number changed when you tilted cog backward and forwards?"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-40`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 41 -- use ax for y */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"You should see that <b>ax</b> changed - so we’ll use that to set the y coordinate.<br /><br />Add another multiplication block and put the <b>ax</b> variable inside it."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-41`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-operators",
                        hexColor: "#855cd659",
                    }
                ],
                expectedCode: [],
            },

            /* STEP 42 -- fix the y value */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"But there’s a problem! We want the sprite to move up when you tilt cog forwards, which would mean it needed a y coordinate above 0.<br /><br />But when you tilted cog forwards the ay value was below 0!<br /><br />To fix this, we’ll need to multiply it by <b>-100</b> rather than <b>100</b>. The extra minus sign will flip it from being below 0 to above 0, and vice versa."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-42`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 43 -- go back to cog */
            {
                type: "info",
                image: `${BUCKET_URL}step-43.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go back to your cog code by clicking on the cog symbol in the devices panel.<br /><br />Cog will light up and beep when you select it!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-43`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 44 -- run your code */
            {
                type: "info",
                image: `${BUCKET_URL}step-44.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now press the <b>green flag</b> to run your code.<br /><br />You should see the ball move around as you tilt cog!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-44`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 45 -- add a background */
            {
                type: "info",
                image: `${BUCKET_URL}step-45.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s add a background behind the ball to better indicate what we’re displaying.<br /><br />Select the <b>Stage</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-45`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 46 -- select the Backdrops tab */
            {
                type: "info",
                image: `${BUCKET_URL}step-46.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Then select the <b>Backdrops</b> tab."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-46`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],    
                expectedCode: [],
            },

            /* STEP 47 -- draw some circles */
            {
                type: "info",
                image: `${BUCKET_URL}step-47.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Draw a few circles around the middle point.<br /><br />Feel free to make them colorful if you’d like!<br /><br />Hint - if you’re on a computer you can hold shift to make sure you get a circle instead of an ellipse."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-47`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 48 -- go back to the code tab */
            {
                type: "info",
                image: `${BUCKET_URL}step-48.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"You can select the <b>Code</b> tab at the top to go back to the coding screen, and select Cog again."}
                    description=""  
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-48`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 49 -- try it out */
            {
                type: "info",
                image: `${BUCKET_URL}step-49.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Now as you tilt Cog you’ll be able to see a guide of how close you are to being level!<br /><br />When Cog is stationary, there’s always 1G of gravity acting on it. If you tilt cog a lot you’ll see that you can get ax or ay to be equal to 1 - that’ll happen when the indicator is as far as it’ll go from the middle."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-49`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 50 -- tilt at 45 degrees */
            {
                type: "info",
                image: `${BUCKET_URL}step-50.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"If you tilt at a 45 degree angle the indicator will be the same distance from the middle, but ax and ay will now be around 0.7 - can you think why that is?"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-50`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 51 -- pythagoras' theorem */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"If we think of the amount of tilt as a right-angled triangle, pythagoras’ theorem tells us that if the sides of the triangle are both about 0.7, the hypotenuse will be 1!<br /><br />That’s what’s happening here, where 1G of gravity at 45 degrees is being made up of 0.7G in the X direction and 0.7G in the Y direction."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-51`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 52 -- well done! */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Well done!<br /><br />You’ve learned how to use the tilt sensing on Cog to make a spirit level - a device that shows if something is level or tilted.<br /><br />We learned about sprites in the Blocks interface, and used variables and a message to communicate between cog and the sprite.<br /><br />We thought about how to represent data - the amount of tilt in x and y - in a way that would be easy to understand - using lights on cog and the movement of the sprite against a gauge in the background."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-52`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],   
            },

            /* STEP 53 -- make cog indicate when it's flat */
            {
                type: "info",
                image: `${BUCKET_URL}step-53.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s make Cog also indicate when it’s flat!<br /><br />Go back to the <b>Sensing</b> category and select the checkbox next to <b>Tilt direction</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-53`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-sensing",
                        hexColor: "#855cd659",
                    }
                ],
                expectedCode: [],
            },

            /* STEP 54 -- look at the tilt direction */
            {
                type: "info",
                image: `${BUCKET_URL}step-54.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Look at what happens to the <b>Tilt direction</b> as you move Cog around.<br /><br />When it is nearly flat the tilt direction will be <b>none</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-54`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 55 -- add an if block */
            {
                type: "info",
                image: `${BUCKET_URL}step-55.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add this code.<br /><br />It uses a couple of new blocks.<br /><br />The <b>if … else</b> block works really similarly to the <b>if</b> block we used before. If the condition is true then the code inside the if part will be executed, however if the condition is false, then the code in the else part will be executed instead.<br /><br />Using the <b>if … else</b> block we can write alternative code that only runs if the condition is not true.<br /><br />The other new block is an <b>=</b> block. This is another type of comparator - it compares two things. Here we’re comparing the <b>Tilt direction</b> sensor and the word <b>none</b>.<br /><br />If the Tilt direction is exactly the same as the word <b>none</b>, then the condition will be true and the button LED will be set to green, and the ring LEDs turned off!<br /><br />If the Tilt direction is equal to anything apart from <b>none</b>, then the button LED will be turned off instead."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-55`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 56 -- try it out */
            {
                type: "end",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Now you’ll get a signal on Cog as well when it’s level 🙂"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-56`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },
        ]
    }
}

export default cogBlocksTutorial5;
