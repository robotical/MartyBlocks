import React from 'react';
import { FormattedMessage } from 'react-intl';


const BUCKET_URL = "https://content.robotical.io/static/tutorials/cog/blocks/4/";

const cogBlocksTutorial4 = {
    'type-lesson-cog-tutorial-4': {
        id: "type-lesson-cog-tutorial-4",
        name: <FormattedMessage
            defaultMessage={"Reactive light show!"}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.name`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        type: "lesson",
        urlId: "cog-blocks-4",
        description: <FormattedMessage
            defaultMessage={"Let's make a light show that reacts as you interact with Cog!</br></br>We'll learn how to make animations on Cog's LEDs, respond to objects being sensed, the amount of force on the button, and to light being sensed."}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.description`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        img: `${BUCKET_URL}cover_image.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['cog', 'blocks', 'animation', 'sensors', 'variables'],
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
                    defaultMessage={"Let's make a light show that reacts as you interact with Cog!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-1`}
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
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-2`}
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
                    defaultMessage={"Go to the <b>Events</b> category and add an <b>on object sensed [left]</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-3`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-events",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_onObjectSense"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["cog_onObjectSense"],
            },

            /* STEP 4 -- add a set LEDs using the colorpicker block */
            {
                type: "info",
                image: `${BUCKET_URL}step-4.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the <b>Looks</b> category and add a <b>set LEDs using the colorpicker</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-4`}
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
                expectedCode: ["cog_onObjectSense=>cog_setLEDColourPicker"],
            },

            /* STEP 5 -- set the colors */
            {
                type: "info",
                image: `${BUCKET_URL}step-5.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Set the colors to be whatever you'd like."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-5`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            /* STEP 6 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out! Put an object on the left obstacle sensor."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-6`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            /* STEP 7 -- add another on object sensed block */
            {
                type: "info",
                image: `${BUCKET_URL}step-7.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add another <b>on object sensed</b> block from the <b>Events</b> category."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-7`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-events",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_onObjectSense"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["cog_onObjectSense=>cog_setLEDColourPicker", "cog_onObjectSense"],
            },

            /* STEP 8 -- change the sensor to the right */
            {
                type: "info",
                image: `${BUCKET_URL}step-8.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Change the sensor to the right, using the dropdown menu."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-8`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 9 -- add another set LEDs using the colorpicker block */
            {
                type: "info",
                image: `${BUCKET_URL}step-9.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go back to the <b>Looks</b> category and add another <b>set LEDs using the colorpicker</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-9`}
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
                expectedCode: ["cog_onObjectSense=>cog_setLEDColourPicker", "cog_onObjectSense=>cog_setLEDColourPicker"],
            },

            /* STEP 10 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out! Put an object on the right obstacle sensor."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-10`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 11 -- make an animation */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"You can make animations on Cog by using multiple colorpicker blocks connected together."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-11`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 12 -- animation frames */
            {
                type: "info",
                image: `${BUCKET_URL}step-12.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"That animation was made up of 9 <b>frames</b>, each one in a separate Colorpicker block, with a turn off LEDs block at the end."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-12`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 13 -- plan your own animation */
            {
                type: "info",
                image: `${BUCKET_URL}step-13.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Here are the individual frames for that animation.<br /><br />Can you plan an animation of your own and have it play when cog senses an object?"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-13`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 14 -- make an animation that changes smoothly */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Can you make an animation that changes smoothly as you move Cog from being sat on one object sensor to being sat on the other?"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-14`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 15 -- button force as an analogue input */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"So far, whenever we've used the button on Cog, it's been detecting whether it is pressed or not.<br /><br />We call this type of information a <b>boolean</b> - something that is either true or false.<br /><br />As well as thinking of the button as a boolean input, we can also use it as an <b>analogue</b> input - one that can have lots of different values."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-15`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 16 -- check the box next to the Button force value block */
            {
                type: "info",
                image: `${BUCKET_URL}step-16.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the <b>Sensing</b> category and check the box next to the <b>Button force value %</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-16`}
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

            /* STEP 17 -- monitor the button force value */
            {
                type: "info",
                image: `${BUCKET_URL}step-17.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"You'll see a monitor appear showing the value of the button force sensor.<br /><br />If you push the button the value will change.<br /><br />Let's use that value to get the lights on cog to change color as you push the button harder."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-17`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 18 -- add a when flag clicked block */
            {
                type: "info",
                image: `${BUCKET_URL}step-18.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the <b>Events</b> category and add a <b>When flag clicked</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-18`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-events",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["event_whenflagclicked"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenflagclicked"],
            },

            /* STEP 19 -- add a forever loop */
            {
                type: "info",
                image: `${BUCKET_URL}step-19.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now go to the <b>Control</b> category and add a <b>forever</b> loop.<br /><br />Unlike the <b>repeat</b> loop that only repeated a certain number of times, the <b>forever</b> loop will keep looping until you press the red stop button."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-19`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["forever"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenflagclicked=>control_forever"],
            },

            /* STEP 20 -- add a set [ring] LEDs to [color] block */
            {
                type: "info",
                image: `${BUCKET_URL}step-20.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the <b>Looks</b> category, and add a <b>set [ring] LEDs to [color]</b> block into the forever loop."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-20`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-looks",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_setLEDs"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenflagclicked=>control_forever=>cog_setLEDs"],
            },

            /* STEP 21 -- drag the hue [360] saturation [100] lightness [100] block */
            {
                type: "info",
                image: `${BUCKET_URL}step-21.png`,
                additionalContent: {
                    images: [],
                    videos: [`${BUCKET_URL}step-21.webm`],
                },
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now drag the block that says <b>hue [360] saturation [100] lightness [100]</b> into the spot for the color in the <b>set [ring] LEDs to [color]</b> block.<br /><br />There are a couple of different ways to describe colors, and Hue, Saturation and Lightness (or Value) is one of them.<br /><br />With these three numbers we can describe any color."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-21`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-looks",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["mv2_HSLOperator"],
                        }
                    }
                ],
                expectedCode: [],
            },

            /* STEP 22 -- explain hue */
            {
                type: "info",
                image: `${BUCKET_URL}step-22.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"The <b>Hue</b> is a number between 0 and 360 (like the degrees on a circle) that says which basic color we want.<br /><br />It can be shown in a circle - and you've seen that already when using the colorpicker!<br /><br />0 degrees is at the top and represents red. 90 degrees is a greeney-yellow, 180 degrees is a cyan blue, 270 degrees is purple, and 360 degrees is back to red!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-22`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 23 -- explain saturation */
            {
                type: "info",
                image: `${BUCKET_URL}step-23.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"<b>Saturation</b> says how vivid you want the color to be.<br /><br />In this example for a hue of 360, a saturation of 100 will be the reddest red there is.<br /><br />A saturation of 0 will be white - the least red there is.<br /><br />And a saturation of 50 will be in the middle - pink."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-23`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 24 -- explain lightness */
            {
                type: "info",
                image: `${BUCKET_URL}step-24.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Lastly, <b>lightness</b> (or brightness, or value) says how light you want the color to be.<br /><br />In this example, with a hue of 360 and a saturation of 100, a brightness of 100 again gives the reddest red.<br /><br />A brightness of 0 gives no red at all - in this case the LED on Cog would just be turned off!<br /><br />A brightness of 50 will be in the middle - a dark red."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-24`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 25 -- use button force to set lightness */
            {
                type: "info",
                image: `${BUCKET_URL}step-25.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let's use the <b>button force</b> to set one of these!<br /><br />Go back to the <b>Sensing</b> category and drag the <b>button force value</b> block into the lightness space in the <b>hue, saturation, lightness</b> block.<br /><br />Also add a <b>wait 0.1 seconds</b> at the end of the forever loop so that the lights don't change too quickly."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-25`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-sensing",
                        hexColor: "#855cd659",
                        onClickAction: "NextStep",
                    },
                ],
                expectedCode: ["event_whenflagclicked=>control_forever=>cog_setLEDs=>control_wait"],
            },

            /* STEP 26 -- turn on the button light */
            {
                type: "info",
                image: `${BUCKET_URL}step-26.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let's turn on the light in the button on Cog as well for fun!<br /><br />Add a <b>Set [ring] LEDs to [color]</b> block before the forever loop, and change it to set the <b>button</b>. Pick any color you like."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-26`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-looks",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_setLEDs"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenflagclicked=>cog_setLEDs=>control_forever=>cog_setLEDs=>control_wait"],
            },

            /* STEP 27 -- try it out */
            {
                type: "info",
                video: `${BUCKET_URL}step-27.mp4`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out! As you push down on the button the LEDs will turn on brighter and brighter red!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-27`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 28 -- try it with the button force setting the saturation instead of the lightness */
            {
                type: "info",
                image: `${BUCKET_URL}step-28.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it with the button force setting the saturation instead of the lightness."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-28`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 29 -- now the lights will change from white to red as you push the button! */
            {
                type: "info",
                video: `${BUCKET_URL}step-29.mp4`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now the lights will change from white to red as you push the button!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-29`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 30 -- lastly try setting the hue instead */
            {
                type: "info",
                image: `${BUCKET_URL}step-30.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Lastly try setting the hue instead.<br /><br />The value for hue needs to go from 0 to 360, so we’ll need to do some maths.<br /><br />Go to the <b>Operators</b> category and drag a <b>multiple</b> block into the hue value."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-30`}
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
                expectedCode: [],
            },

            /* STEP 31 -- set it to multiply the button force value by 3.6 */
            {
                type: "info",
                video: `${BUCKET_URL}step-31.mp4`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Set it to multiply the button force value by 3.6.<br /><br />This will mean that instead of giving numbers from 0 to 100, we’ll get numbers from 0 to 360 (3.6 x 100).<br /><br />Try it out!<br /><br />Now as you push the button the color of the lights will change from red to green to blue and back to red!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-31`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 32 -- see if you can make the color of the button change too! */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"See if you can make the color of the button change too!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-32`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 33 -- next up, lets see if we can make Cog react to bright lights by glowing for a bit */
            {
                type: "info",
                image: `${BUCKET_URL}step-33.png`,
                additionalContent: {
                    images: [],
                    videos: [`${BUCKET_URL}step-33.webm`],
                },
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Next up, lets see if we can make Cog react to bright lights by glowing for a bit.<br /><br />Delete the code that you made to change the colors based on button force, by dragging it into the blocks palette."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-33`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: ["event_whenflagclicked"],
            },

            /* STEP 34 -- go to the sensing category and check the box next to the ambient light value block */
            {
                type: "info",
                image: `${BUCKET_URL}step-34.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the <b>Sensing</b> category and check the box next to the <b>Ambient light value</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-34`}
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

            /* STEP 35 -- make a note of what the ambient light value is normally */
            {
                type: "info",
                image: `${BUCKET_URL}step-35.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Make a note of what the ambient light value is normally.<br /><br />Then, get a torch and shine it on Cog, make a note of what values you get.<br /><br />You’ll probably be able to reach the maximum value the sensor can give - 4095!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-35`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 36 -- add a wait until block */
            {
                type: "info",
                image: `${BUCKET_URL}step-36.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the <b>Control</b> category and add a <b>wait until</b> block under the <b>When flag clicked</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-36`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["wait_until"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenflagclicked=>control_wait_until"],
            },

            /* STEP 37 -- add a greater than block */
            {
                type: "info",
                image: `${BUCKET_URL}step-37.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Next, go to <b>Operators</b> and add a <b>greater than</b> block into the <b>wait until</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-37`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-operators",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["operator_gt"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenflagclicked=>control_wait_until=>operator_gt"],
            },

            /* STEP 38 -- drag the ambient light value block */
            {
                type: "info",
                image: `${BUCKET_URL}step-38.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go back to the <b>Sensing</b> category and drag the <b>Ambient light value</b> block into the left side of the <b>&gt;</b> block.<br /><br />Change the right side to a number that will only be reached when you shine a torch on Cog.<br /><br />You don’t need to put in the maximum number, just one that’s higher than what you see without a torch.<br /><br />Here I’ve picked 1500, so the whole line reads <b>wait until ambient light value &gt; 1500</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-38`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-sensing",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_getAmbientLightValue"],
                        }
                    }
                ],
                expectedCode: [],
            },

            /* STEP 39 -- add a set [ring] LEDs to [color] block */
            {
                type: "info",
                image: `${BUCKET_URL}step-39.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>Set [ring] LEDs to [color]</b> block under the <b>wait until</b> block.<br /><br />Also add a <b>Turn off all LEDs</b> block at the top, to make sure things are reset."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-39`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-looks",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            elementId: ["cog_turnOffLEDs", "cog_setLEDs"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        },
                    },
                ],
                expectedCode: ["event_whenflagclicked=>cog_turnOffLEDs=>control_wait_until=>cog_setLEDs"],
            },

            /* STEP 40 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Click the green flag to begin the code.<br /><br />Then, when you shine a torch on Cog the lights will turn on!<br /><br />The <b>wait until</b> block will make execution of the code stop until the condition that you put in it is met.<br /><br />In this case that’s checking if the light sensor value is bright enough.<br /><br />Once the condition is true, the <b>wait until</b> block is satisfied, and execution moves on to the <b>set [ring] LEDs to [color]</b> block to turn on the LEDs."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-40`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 41 -- make the lights on cog turn on gradually */
            {
                type: "info",
                image: `${BUCKET_URL}step-41.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s make the lights on Cog turn on gradually when it detects a torch.<br /><br />To do that we’ll use a variable again!<br /><br />Go to the <b>Variables</b> category and make a variable called <b>brightness</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-41`}
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
                        }
                    }
                ],
                expectedCode: [],
            },

            /* STEP 42 -- add a set brightness to 0 block */
            {
                type: "info",
                image: `${BUCKET_URL}step-42.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a block to <b>set brightness to 0</b> at the start of the code."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-42`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-variables",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["data_setvariableto"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                expectedCode: ["event_whenflagclicked=>data_setvariableto=>cog_turnOffLEDs=>control_wait_until=>cog_setLEDs"],
            },

            /* STEP 43 -- add a repeat until block */
            {
                type: "info",
                image: `${BUCKET_URL}step-43.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now add a <b>repeat until</b> block under the <b>wait until</b> block, and make it surround the <b>Set [ring] LEDs to [color]</b> block.<br /><br />You can find the <b>repeat until</b> block in the <b>Control</b> category."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-43`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["repeat_until"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                expectedCode: ["event_whenflagclicked=>data_setvariableto=>cog_turnOffLEDs=>control_wait_until=>repeat_until=>cog_setLEDs"],
            },

            /* STEP 44 -- change the repeat until block */
            {
                type: "info",
                image: `${BUCKET_URL}step-44.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Using the <b>brightness</b> variable that you just made, change it so that the line reads <b>repeat until brightness &gt; 100</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-44`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 45 -- add a change brightness by 10 block */
            {
                type: "info",
                image: `${BUCKET_URL}step-45.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now add a <b>change brightness by 10</b> block inside the <b>repeat until</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-45`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-variables",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["data_changevariableby"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                expectedCode: ["event_whenflagclicked=>data_setvariableto=>cog_turnOffLEDs=>control_wait_until=>repeat_until=>data_changevariableby=>cog_setLEDs"],
            },

            /* STEP 46 -- change the set [ring] LEDs to [color] block */
            {
                type: "info",
                image: `${BUCKET_URL}step-46.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Change the <b>set [ring] LEDs to [color]</b> block to use a <b>hue, saturation, lightness</b> block.<br /><br />Use the <b>brightness</b> variable for lightness.<br /><br />Also change the color to a nice blue by setting the hue to 180."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-46`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 47 -- add a wait block */
            {
                type: "info",
                image: `${BUCKET_URL}step-47.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Then add a <b>wait</b> block from the <b>Control</b> category and change it to <b>wait 0.1 seconds</b>.<br /><br />This will slow down the fade in a bit."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-47`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["control_wait"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                expectedCode: ["event_whenflagclicked=>data_setvariableto=>cog_turnOffLEDs=>control_wait_until=>repeat_until=>data_changevariableby=>cog_setLEDs=>control_wait"],
            },

            /* STEP 48 -- explain repeat until */
            {
                type: "info",
                image: `${BUCKET_URL}step-48.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"The <b>repeat until</b> block is a bit like a combination of the <b>repeat</b> block you used before, that repeated a particular number of times, and the <b>wait until</b> block you just used.<br /><br />In this case it will keep on repeating until the condition is met, and then it will stop repeating and code execution will move on.<br /><br />In this example, it will keep repeating the loop and gradually increasing the brightness until the brightness reaches the maximum value of 100."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-48`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 49 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Click the green flag to run the code.<br /><br />Now when you shine a torch on Cog the lights will gradually turn on!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-49`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 50 -- make the lights fade out again */
            {
                type: "info",
                image: `${BUCKET_URL}step-50.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s make the lights fade out again when you take the torch away!<br /><br />Add another <b>wait until</b> block, but this time set it to wait until the ambient light value is less than a threshold.<br /><br />Do this by using a <b>&lt;</b> (less than) block from the <b>Operators</b> category."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-50`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: ["event_whenflagclicked=>data_setvariableto=>cog_turnOffLEDs=>control_wait_until=>repeat_until=>data_changevariableby=>cog_setLEDs=>control_wait=>control_wait_until"],
            },

            /* STEP 51 -- add another repeat until block */
            {
                type: "info",
                image: `${BUCKET_URL}step-51.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now add another <b>repeat until</b> block and make it repeat until the brightness is less than (<) 0."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-51`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                    }
                ],
                expectedCode: ["event_whenflagclicked=>data_setvariableto=>cog_turnOffLEDs=>control_wait_until=>repeat_until=>data_changevariableby=>cog_setLEDs=>control_wait=>control_wait_until=>repeat_until"],
            },

            /* STEP 52 -- duplicate the code from inside the previous repeat until loop */
            {
                type: "info",
                image: `${BUCKET_URL}step-52.png`,
                additionalContent: {
                    images: [],
                    videos: [`${BUCKET_URL}step-52.webm`],
                },
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Duplicate the code from inside the previous <b>repeat until</b> loop.<br /><br />You can do this by right clicking (or pressing and holding) and then selecting <b>Duplicate</b>.<br /><br />Put the new code into the new <b>repeat until</b> loop."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-52`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: ["event_whenflagclicked=>data_setvariableto=>cog_turnOffLEDs=>control_wait_until=>repeat_until=>data_changevariableby=>cog_setLEDs=>control_wait=>control_wait_until=>repeat_until=>data_changevariableby=>cog_setLEDs=>control_wait"],
            },

            /* STEP 53 -- fix the bug */
            {
                type: "info",
                image: `${BUCKET_URL}step-53.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"This code will nearly work, but can you spot the bug?<br /><br />The brightness will keep on increasing instead of decreasing!<br /><br />Change it so that it says <b>change brightness by -5</b> instead.<br /><br />The <b>-5</b> here will subtract 5 from the brightness variable each time.<br /><br />This will fade out the lights at half the speed that we faded them in."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-53`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 54 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out! Now when you take the torch away the lights on Cog will fade out again!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-54`}
                />
            },

            /* STEP 55 -- add a forever loop */
            {
                type: "info",
                image: `${BUCKET_URL}step-55.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s make it so you don’t need to click the green flag every time you want Cog to react.<br /><br />Add a <b>forever</b> loop so that it starts after the <b>Turn off all LEDs</b> block and surrounds all the other code.<br /><br />Now Cog will carry on reacting to bright lights until you press the red stop sign!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-55`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["control_forever"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                expectedCode: ["event_whenflagclicked=>data_setvariableto=>cog_turnOffLEDs=>control_forever=>control_wait_until=>repeat_until=>data_changevariableby=>cog_setLEDs=>control_wait=>control_wait_until=>repeat_until=>data_changevariableby=>cog_setLEDs=>control_wait"],
            },

            /* STEP 56 -- recap */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Well done - you’ve learned loads!<br /><br />You learned how to make animations from lots of individual frames.<br /><br />You learned how to make Cog react to the object sensors.<br /><br />We learned about analogue values that can vary, and used the lights on Cog to indicate how much force was pushing the button.<br /><br />We learned about how to describe colors using Hue, Saturation and Brightness (or Value).<br /><br />We also learned how to use the light sensor on Cog, and did a really quick experiment to take some readings from the sensor to help us write our code.<br /><br />Using <b>wait until</b>, <b>repeat until</b> blocks, variables and comparison operators, we made Cog light up to respond to bright lights!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-56`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 57 -- next steps */
            {
                type: "end",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Next steps - if you’re in a class with other people with Cogs, or if you have more than one, try putting lots of them together while they’re running the code you just made.<br /><br />Can you use a torch to write things on them and paint with light?"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-4.step-57`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },
        ]
    }
}

export default cogBlocksTutorial4;
