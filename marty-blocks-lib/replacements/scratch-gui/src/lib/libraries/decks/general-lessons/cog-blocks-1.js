import React from 'react';
import { FormattedMessage } from 'react-intl';

/**
    * actions
        * HighlightBlocks
        * HighlightElement
        * DragBlockToScriptArea
    * onclick actions
        * NextStep 
 */

const BUCKET_URL = "https://content.robotical.io/static/tutorials/cog/blocks/1/";

const cogBlocksTutorial1 = {
    'type-lesson-cog-tutorial-1': {
        id: "type-lesson-cog-tutorial-1",
        name: "Intro to Cog Lights and Sounds",
        type: "lesson",
        urlId: "cog-blocks-1",
        description: <FormattedMessage
            defaultMessage={"Learn how to program Cog with Blocks, make sounds and lights triggered by interacting with Cog"}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.description`}
            values={{}}
        />,
        img: `${BUCKET_URL}cover_image.jpg`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['cog', 'sound', 'light', 'sequencing', 'parallel-code'],
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
                    defaultMessage="Let's learn how to program Cog with Blocks! {newline} We'll connect to Cog, and make it light up and make sounds when the button is pushed!{newline} We'll also learn about {series} code that runs as a sequence, and {parallel} code that runs at the same time"
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-1`}
                    values={{
                        newline: <span><br /><br /></span>,
                        series: <b><FormattedMessage id="gui.howtos.lessons.series" defaultMessage="series" /></b>,
                        parallel: <b><FormattedMessage id="gui.howtos.lessons.parallel" defaultMessage="parallel" /></b>

                    }}
                />,
                expectedCode: [],
            },
            /* STEP 2 -- add a Cog */
            {
                type: "info",
                image: `${BUCKET_URL}device_button.png`,
                description: <FormattedMessage
                    defaultMessage={"First, let's connect to Cog. Click on the 'Connect a device' button and then select Cog. {newline} You can skip this step if a Cog is already connected"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-2`}
                    values={{
                        newline: <span><br /><br /></span>,
                    }}
                />,
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
            /* STEP 3 -- actually connect to Cog */
            {
                type: "info",
                image: `${BUCKET_URL}connect_device_button.png`,
                description: <FormattedMessage
                    defaultMessage={"Great! Now click on the 'connect' button to connect to Cog{newline}Again, you can skip this if you're already connected to a Cog"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-3`}
                    values={{
                        newline: <span><br /><br /></span>,
                    }}
                />,
                nextStepActions: [
                    {
                        type: "HighlightConnectionButtonElement",
                        elementId: "{{dynamicId}}-Cog-connect",
                        hexColor: "#855cd659",
                        onClickAction: "NextStep"
                    }
                ],
                expectedCode: [],
            },
            /* STEP 4 -- Check that cog is connected and selected */
            {
                type: "info",
                image: `${BUCKET_URL}4-cogConnected.png`,
                description: <FormattedMessage
                    defaultMessage={"Awesome! You should now have one Cog added, and it should be connected to your cog"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-4`}
                    values={{}}
                />,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                expectedCode: [],
            },
            /* STEP 5 -- Select the Events Category */
            {
                type: "info",
                image: `${BUCKET_URL}5-events.png`,
                description: <FormattedMessage
                    defaultMessage={"Select the Events category"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-5`}
                    values={{}}
                />,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-events",
                        hexColor: "#855cd659",
                        onClickAction: "NextStep",
                    }
                ],
                expectedCode: [],
            },
            /* STEP 6 -- add on button push */
            {
                type: "info",
                image: `${BUCKET_URL}6-onButtonPush.png`,
                description: <FormattedMessage
                    defaultMessage={"Add an {onButtonPress} block"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-6`}
                    values={{
                        onButtonPress: <b><FormattedMessage id="gui.howtos.lessons.onButtonPress" defaultMessage="On Button Press" /></b>
                    }}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["cog_onButtonPush"]
                    },
                ],
                hint: {
                    description: <FormattedMessage
                        defaultMessage={"The 'on button press' event block is under the Event category. Drag it to the script area to start coding"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-6.hint`}
                        values={{}}
                    />,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["cog_onButtonPush"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "cog_onButtonPush",
                        }
                    ],
                },
                expectedCode: ["cog_onButtonPush"],
            },
            /* STEP 7 -- Select the looks category */
            {
                type: "info",
                image: `${BUCKET_URL}7-looks.png`,
                description: <FormattedMessage
                    defaultMessage={"Select the Looks category"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-7`}
                    values={{}}
                />,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-looks",
                        hexColor: "#855cd659",
                        onClickAction: "NextStep",
                    }
                ],
            },
            /* STEP 8 -- Add set LEDs to color block */
            {
                type: "info",
                image: `${BUCKET_URL}8-setLeds.png`,
                description: <FormattedMessage
                    defaultMessage={"Add a {setLEDs} block, by dragging it to connect with the On Button Press block"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-8`}
                    values={{
                        setLEDs: <b><FormattedMessage id="gui.howtos.lessons.setLEDs" defaultMessage="Set [ring] LEDs to [color]" /></b>
                    }}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["cog_setLEDs"]
                    },
                ],
                hint: {
                    description: <FormattedMessage
                        defaultMessage={"The 'set [ring] LEDs to [color]' block is under the Looks category. Drag it to the script area and connect it to the On Button Press block"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-8.hint`}
                        values={{}}
                    />,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["cog_setLEDs"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "cog_setLEDs",
                        }
                    ],
                },
                expectedCode: ["cog_onButtonPush=>cog_setLEDs"],
            },
            /* STEP 9 -- try it out! */
            {
                type: "info",
                image: `${BUCKET_URL}pushCogButton.jpg`,
                description: <FormattedMessage
                    defaultMessage={"Try it out! {newline}Push the button on Cog and the lights should come on!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-9`}
                    values={{
                        newline: <span><br /><br /></span>,
                    }}
                />,
                nextStepActions: [
                ],
                expectedCode: [],
            },
            /* STEP 10 -- change the color */
            {
                type: "info",
                image: `${BUCKET_URL}10-changeColor.png`,
                description: <FormattedMessage
                    defaultMessage={"Change the color of the LEDs by clicking or pressing on the color blob, then dragging the Color bar. {newline}You can also change the Saturation (how vivid a color is) and the Brightness - if you set that to 0 the LEDs will be off"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-10`}
                    values={{
                        newline: <span><br /><br /></span>,
                    }}
                />,
                nextStepActions: [
                ],
                hint: {
                },
                expectedCode: [],
            },
            /* STEP 11 -- try it out! */
            {
                type: "info",
                image: `${BUCKET_URL}pushCogButton.jpg`,
                description: <FormattedMessage
                    defaultMessage={"Try it out! {newline}Push the button on Cog and the lights should change to the new color you selected!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-11`}
                    values={{
                        newline: <span><br /><br /></span>,
                    }}
                />,
                nextStepActions: [
                ],
                expectedCode: [],
            },
            // Step 12 - Add on Shake
            {
                type: "info",
                image: `${BUCKET_URL}12-onShake.png`,
                description: <FormattedMessage
                    defaultMessage={"Add an {onShake} block"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-12`}
                    values={{
                        onShake: <b><FormattedMessage id="gui.howtos.lessons.onShake" defaultMessage="On Shake" /></b>
                    }}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["cog_onShake"]
                    },
                ],
                hint: {
                    description: <FormattedMessage
                        defaultMessage={"The 'on shake' event block is under the Event category. Drag it to the script area away from the code that's already there"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-12.hint`}
                        values={{}}
                    />,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["cog_onShake"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "cog_onShake",
                        }
                    ],
                },
                expectedCode: ["cog_onButtonPush=>cog_setLEDs", "cog_onShake"],
            },

            // Step 13 - add turn off LEDs
            {
                type: "info",
                image: `${BUCKET_URL}13-turnOffLeds.png`,
                description: <FormattedMessage
                    defaultMessage={"Add a {turnOffLEDs} block under the On Shake block"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-13`}
                    values={{
                        turnOffLEDs: <b><FormattedMessage id="gui.howtos.lessons.turnOffLEDs" defaultMessage="Turn off LEDs" /></b>
                    }}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["cog_turnOffLEDs"]
                    },
                ],
                hint: {
                    description: <FormattedMessage
                        defaultMessage={"The 'Turn off LEDs' block is under the Looks category. Drag it to the script area and connect it to the On Shake block"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-13.hint`}
                        values={{}}
                    />,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["cog_turnOffLEDs"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "cog_turnOffLEDs",
                        }
                    ],
                },
                expectedCode: ["cog_onButtonPush=>cog_setLEDs", "cog_onShake=>cog_turnOffLEDs"],
            },

            // Step 14 - try it out!
            {
                type: "info",
                image: `${BUCKET_URL}shakeCog.gif`,
                description: <FormattedMessage
                    defaultMessage={"Try it out! {newline}Shake Cog and the lights should turn off!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-14`}
                    values={{
                        newline: <span><br /><br /></span>,
                    }}
                />,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // Step 15 - control the button color
            {
                type: "info",
                image: `${BUCKET_URL}15-button.png`,
                description: <FormattedMessage
                    defaultMessage={"Change the {setLEDs} block to control the button LED instead, by selecting 'button' from the dropdown menu"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-15`}
                    values={{
                        setLEDs: <b><FormattedMessage id="gui.howtos.lessons.setLEDs" defaultMessage="Set [ring] LEDs to [color]" /></b>
                    }}
                />,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 16 - try it out
            {
                type: "info",
                image: `${BUCKET_URL}pushCogButton.jpg`,
                description: <FormattedMessage
                    defaultMessage={"Try it out! {newline}Push the button on Cog and now the light in the button should turn on!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-16`}
                    values={{
                        newline: <span><br /><br /></span>
                    }}
                />,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 17 - change to all
            {
                type: "info",
                image: `${BUCKET_URL}17-all.png`,
                description: <FormattedMessage
                    defaultMessage={"Shake Cog to turn off the LEDs{newline}Now change the same dropdown to select 'all' instead."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-17`}
                    values={{
                        newline: <span><br /><br /></span>
                    }}
                />,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 18 - try it out
            {
                type: "info",
                image: `${BUCKET_URL}pushCogButton.jpg`,
                description: <FormattedMessage
                    defaultMessage={"Try it out! {newline}Push the button on Cog and all the lights should turn on!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-18`}
                    values={{
                        newline: <span><br /><br /></span>
                    }}
                />,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 19 - add a pattern
            {
                type: "info",
                image: `${BUCKET_URL}19-pattern.png`,
                description: <FormattedMessage
                    defaultMessage={"Add a {setLEDPattern} block under the Set LED color block"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-19`}
                    values={{
                        setLEDPattern: <b><FormattedMessage id="gui.howtos.lessons.setLEDPattern" defaultMessage="Set [ring] LEDs to pattern [Flash]" /></b>
                    }}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["cog_setLEDPattern"]
                    },
                ],
                hint: {
                    description: <FormattedMessage
                        defaultMessage={"The 'Set [ring] LEDs to pattern [Flash]' block is under the Looks category. Drag it to the script area and connect it to the block that sets the LED colors"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-19.hint`}
                        values={{}}
                    />,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["cog_setLEDPattern"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "cog_setLEDPattern",
                        }
                    ],
                },
                expectedCode: ["cog_onButtonPush=>cog_setLEDs=>cog_setLEDPattern", "cog_onShake=>cog_turnOffLEDs"],
            },

            // step 20 - try it out!
            {
                type: "info",
                image: `${BUCKET_URL}20-tryItOut.gif`,
                description: <FormattedMessage
                    defaultMessage={"Try it out! {newline}Push the button on Cog and now the ring of LEDs should start flashing!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-20`}
                    values={{
                        newline: <span><br /><br /></span>
                    }}
                />,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 21 - change to a spin pattern
            {
                type: "info",
                image: `${BUCKET_URL}21-spin1.png`,
                description: <FormattedMessage
                    defaultMessage={"Change the pattern to 'Spin1' and try it out!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-21`}
                    values={{}}
                />,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 22 - try the other patterns
            {
                type: "info",
                image: `${BUCKET_URL}22-otherPatterns.gif`,
                description: <FormattedMessage
                    defaultMessage={"Try out the other patterns in the list"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-22`}
                    values={{}}
                />,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 23 - make the button flash too
            {
                type: "info",
                image: `${BUCKET_URL}23-buttonPattern.png`,
                description: <FormattedMessage
                    defaultMessage={"Add another {setLEDPattern} block under the previous one, and change it so that it sets the button to flash.{newline}Try it out by pushing the button on Cog"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-23`}
                    values={{
                        setLEDPattern: <b><FormattedMessage id="gui.howtos.lessons.setLEDPattern" defaultMessage="Set [ring] LEDs to pattern [Flash]" /></b>,
                        newline: <span><br /><br /></span>
                    }}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["cog_setLEDPattern"]
                    },
                ],
                hint: {
                    description: <FormattedMessage
                        defaultMessage={"The 'Set [ring] LEDs to pattern [Flash]' block is under the Looks category. Drag it to the script area and connect it to the block that sets the LED colors"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-23.hint`}
                        values={{}}
                    />,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["cog_setLEDPattern"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "cog_setLEDPattern",
                        }
                    ],
                },
                expectedCode: ["cog_onButtonPush=>cog_setLEDs=>cog_setLEDPattern=>cog_setLEDPattern", "cog_onShake=>cog_turnOffLEDs"],
            },

            // step 24 - remove the code from the on button press event
            {
                type: "info",
                image: `${BUCKET_URL}24-removeCode.gif`,
                description: <FormattedMessage
                    defaultMessage={"Delete the code from under the On Button Press block by dragging it back to the blocks palette"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-24`}
                    values={{}}
                />,
                nextStepActions: [
                ],
                expectedCode: ["cog_onButtonPush", "cog_onShake=>cog_turnOffLEDs"],
            },

            // step 25 - add a colorpicker
            {
                type: "info",
                image: `${BUCKET_URL}25-colorPicker.png`,
                description: <FormattedMessage
                    defaultMessage={"Add a {setLEDColourPicker} block connected to the On Button Press block"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-25`}
                    values={{
                        setLEDColourPicker: <b><FormattedMessage id="gui.howtos.lessons.setLEDColourPicker" defaultMessage="Set LEDs using the ColorPicker" /></b>
                    }}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["cog_setLEDColourPicker"]
                    },
                ],
                hint: {
                    description: <FormattedMessage
                        defaultMessage={"The 'Set LEDs using the ColorPicker' block is under the Looks category. Drag it to the script area and connect it to the On Button Press event"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-25.hint`}
                        values={{}}
                    />,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["cog_setLEDColourPicker"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "cog_setLEDColourPicker",
                        }
                    ],
                },
                expectedCode: ["cog_onButtonPush=>cog_setLEDColourPicker", "cog_onShake=>cog_turnOffLEDs"],
            },

            // step 26 - change the colors
            {
                type: "info",
                image: `${BUCKET_URL}26-changeColors.gif`,
                description: <FormattedMessage
                    defaultMessage={"Change the individual LED colors using the color picker.{newline}First select a color using the color wheel and the saturation and brightness sliders, then select the LEDs you want to set to that color"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-26`}
                    values={{
                        newline: <span><br /><br /></span>
                    }}
                />,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 27 - set the button color
            {
                type: "info",
                image: `${BUCKET_URL}27-buttonColor.png`,
                description: <FormattedMessage
                    defaultMessage={"Set the button color too by adding a {setLEDs} block and changing it to set the button to your favorite color"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-27`}
                    values={{
                        setLEDs: <b><FormattedMessage id="gui.howtos.lessons.setLEDs" defaultMessage="Set [ring] LEDs to [color]" /></b>
                    }}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["cog_setLEDs"]
                    },
                ],
                hint: {
                    description: <FormattedMessage
                        defaultMessage={"The 'Set [ring] LEDs to [color]' block is under the Looks category. Drag it to the script area and connect it to the Set LEDs using the ColorPicker block"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-27.hint`}
                        values={{}}
                    />,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["cog_setLEDs"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "cog_setLEDs",
                        }
                    ],
                },
                expectedCode: ["cog_onButtonPush=>cog_setLEDColourPicker=>cog_setLEDs", "cog_onShake=>cog_turnOffLEDs"],
            },

            // step 28 - try it out!
            {
                type: "info",
                image: `${BUCKET_URL}pushCogButton.jpg`,
                description: <FormattedMessage
                    defaultMessage={"Try it out! Press the button and the lights will each change to the colors that you picked"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-28`}
                    values={{}}
                />,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 29 - control
            {
                type: "info",
                image: `${BUCKET_URL}29-control.png`,
                description: <FormattedMessage
                    defaultMessage={"Select the Control category"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-29`}
                    values={{}}
                />,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                        onClickAction: "NextStep",
                    }
                ],
            },

            // step 30 - add a wait block
            {
                type: "info",
                image: `${BUCKET_URL}30-wait.png`,
                description: <FormattedMessage
                    defaultMessage={"Add a {wait} block under the LED blocks"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-30`}
                    values={{
                        wait: <b><FormattedMessage id="gui.howtos.lessons.wait" defaultMessage="wait [1] seconds" /></b>
                    }}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["control_wait"]
                    },
                ],
                hint: {
                    description: <FormattedMessage
                        defaultMessage={"The 'wait [1] seconds' block is under the Control category. Drag it to the script area and connect it underneath the two blocks that set the LED colors"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-30.hint`}
                        values={{}}
                    />,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["control_wait"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "control_wait",
                        }
                    ],
                },
                expectedCode: ["cog_onButtonPush=>cog_setLEDColourPicker=>cog_setLEDs=>control_wait", "cog_onShake=>cog_turnOffLEDs"],
            },

            // step 31 - add another colorpicker
            {
                type: "info",
                image: `${BUCKET_URL}31-colorPicker.png`,
                description: <FormattedMessage
                    defaultMessage={"Add another {setLEDColourPicker} block under the wait block, then change the colors to whatever you choose"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-31`}
                    values={{
                        setLEDColourPicker: <b><FormattedMessage id="gui.howtos.lessons.setLEDColourPicker" defaultMessage="Set LEDs using the ColorPicker" /></b>
                    }}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["cog_setLEDColourPicker"]
                    },
                ],
                hint: {
                    description: <FormattedMessage
                        defaultMessage={"The 'Set LEDs using the ColorPicker' block is under the Looks category. Drag it to the script area and connect it to the wait block you just added, then change the colors"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-31.hint`}
                        values={{}}
                    />,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["cog_setLEDColourPicker"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "cog_setLEDColourPicker",
                        }
                    ],
                },
                expectedCode: ["cog_onButtonPush=>cog_setLEDColourPicker=>cog_setLEDs=>control_wait=>cog_setLEDColourPicker", "cog_onShake=>cog_turnOffLEDs"],
            },

            // step 32 - change the button color
            {
                type: "info",
                image: `${BUCKET_URL}32-buttonColor.png`,
                description: <FormattedMessage
                    defaultMessage={"Change the button color too by adding a {setLEDs} block and changing it to set the button to your favorite color"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-32`}
                    values={{
                        setLEDs: <b><FormattedMessage id="gui.howtos.lessons.setLEDs" defaultMessage="Set [ring] LEDs to [color]" /></b>
                    }}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["cog_setLEDs"]
                    },
                ],
                hint: {
                    description: <FormattedMessage
                        defaultMessage={"The 'Set [ring] LEDs to [color]' block is under the Looks category. Drag it to the script area and connect it to the last Set LEDs using the ColorPicker block, then select 'button' from the dropdown menu"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-32.hint`}
                        values={{}}
                    />,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["cog_setLEDs"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "cog_setLEDs",
                        }
                    ],
                },
                expectedCode: ["cog_onButtonPush=>cog_setLEDColourPicker=>cog_setLEDs=>control_wait=>cog_setLEDColourPicker=>cog_setLEDs", "cog_onShake=>cog_turnOffLEDs"],
            },

            // step 33 - try it out
            {
                type: "info",
                image: `${BUCKET_URL}33-tryItOut.gif`,
                description: <FormattedMessage
                    defaultMessage={"Try it out! Press the button and the lights will turn on, then change after 1 second!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-33`}
                    values={{}}
                />,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 34 - add another on button press block
            {
                type: "info",
                image: `${BUCKET_URL}34-onButtonPress.png`,
                description: <FormattedMessage
                    defaultMessage={"Add another {onButtonPress} block"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-34`}
                    values={{
                        onButtonPress: <b><FormattedMessage id="gui.howtos.lessons.onButtonPress" defaultMessage="On Button Press" /></b>
                    }}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["cog_onButtonPush"]
                    },
                ],
                hint: {
                    description: <FormattedMessage
                        defaultMessage={"The 'on button press' event block is under the Event category. Drag it to the script area to start coding"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-34.hint`}
                        values={{}}
                    />,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["cog_onButtonPush"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "cog_onButtonPush",
                        }
                    ],
                },
                expectedCode: ["cog_onButtonPush=>cog_setLEDColourPicker=>cog_setLEDs=>control_wait=>cog_setLEDColourPicker=>cog_setLEDs", "cog_onShake=>cog_turnOffLEDs", "cog_onButtonPush"],
            },

            // step 35 - sounds
            {
                type: "info",
                image: `${BUCKET_URL}35-sound.png`,
                description: <FormattedMessage
                    defaultMessage={"Select the Sound category"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-35`}
                    values={{}}
                />,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-sound",
                        hexColor: "#855cd659",
                        onClickAction: "NextStep",
                    }
                ],
            },

            // step 36 - add play note
            {
                type: "info",
                image: `${BUCKET_URL}36-playNote.png`,
                description: <FormattedMessage
                    defaultMessage={"Add a {playNoteForTime} block under the On Button Press block you just added"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-36`}
                    values={{
                        playNoteForTime: <b><FormattedMessage id="gui.howtos.lessons.playNoteForTime" defaultMessage="Play note [C4] for [1] seconds" /></b>
                    }}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["cog_playNoteForTime"]
                    },
                ],
                hint: {
                    description: <FormattedMessage
                        defaultMessage={"The 'Play note [C4] for [1] seconds' block is under the Sound category. Drag it to the script area and connect it to the new On Button Press block you added in the last step"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-36.hint`}
                        values={{}}
                    />,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["cog_playNoteForTime"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "cog_playNoteForTime",
                        }
                    ],
                },
                expectedCode: ["cog_onButtonPush=>cog_setLEDColourPicker=>cog_setLEDs=>control_wait=>cog_setLEDColourPicker=>cog_setLEDs", "cog_onShake=>cog_turnOffLEDs", "cog_onButtonPush=>cog_playNoteForTime"],
            },

            // step 37 - change the note
            {
                type: "info",
                image: `${BUCKET_URL}37-changeNote.png`,
                description: <FormattedMessage
                    defaultMessage={"Change the note to C5 and try it out by pressing the button on Cog!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-37`}
                    values={{}}
                />,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 38 - play tone block
            {
                type: "info",
                image: `${BUCKET_URL}38-playTone.gif`,
                description: <FormattedMessage
                    defaultMessage={"Add a {playTone} block between the On Button Push block and the Play Note block"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-38`}
                    values={{
                        playTone: <b><FormattedMessage id="gui.howtos.lessons.playTone" defaultMessage="Play tone from [200] to [300] Hz for [3] seconds" /></b>
                    }}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["cog_playTone"]
                    },
                ],
                hint: {
                    description: <FormattedMessage
                        defaultMessage={"The 'Play tone from [200] to [300]Hz for [3] seconds' block is under the Sound category. Drag it to the script area and connect it in between the On Button Press block and the play note you added in the last step"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-38.hint`}
                        values={{}}
                    />,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["cog_playTone"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "cog_playTone",
                        }
                    ],
                },
                expectedCode: ["cog_onButtonPush=>cog_setLEDColourPicker=>cog_setLEDs=>control_wait=>cog_setLEDColourPicker=>cog_setLEDs", "cog_onShake=>cog_turnOffLEDs", "cog_onButtonPush=>cog_playTone=>cog_playNoteForTime"],
            },

            // step 39 - change the frequencies
            {
                type: "info",
                image: `${BUCKET_URL}39-playTone.png`,
                description: <FormattedMessage
                    defaultMessage={"Change the numbers in the Play Tone block to go from 260 to 523 Hz for 1 second.{newline}Every musical note has a frequency, and 523Hz is the frequency of C5 - C in the fifth octave.{newline}Try it out by pushing the button on Cog"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-39`}
                    values={{
                        newline: <span><br /><br /></span>
                    }}
                />,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 40 - parallel explanation
            {
                type: "info",
                image: `${BUCKET_URL}parallel.png`,
                description: <FormattedMessage
                    defaultMessage={"When you push the button, the sounds and lights happen at the same time - we say that they are running in {parallel}"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-40`}
                    values={{
                        parallel: <b><FormattedMessage id="gui.howtos.lessons.parallel" defaultMessage="parallel" /></b>
                    }}
                />,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 41 - series explanation
            {
                type: "info",
                image: `${BUCKET_URL}series.png`,
                description: <FormattedMessage
                    defaultMessage={"The individual sounds and lights happen one after another - we say they are running in {series} or in a sequence"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-41`}
                    values={{
                        series: <b><FormattedMessage id="gui.howtos.lessons.series" defaultMessage="series" /></b>,
                    }}
                />,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            /* STEP 42 -- end */
            {
                type: "end",
                description: <FormattedMessage
                    defaultMessage={"Great job! You've learned how to program Cog, to make it respond to button pushes and shakes, and make sounds and lights!'"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-1.step-42`}
                    values={{}}
                />,
                expectedCode: [],
            },
        ]
    }
}

export default cogBlocksTutorial1;
