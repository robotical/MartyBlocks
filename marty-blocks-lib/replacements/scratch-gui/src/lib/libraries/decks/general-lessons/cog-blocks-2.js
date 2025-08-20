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

const BUCKET_URL = "https://content.robotical.io/static/tutorials/cog/blocks/2/";

const cogBlocksTutorial2 = {
    'type-lesson-cog-tutorial-2': {
        id: "type-lesson-cog-tutorial-2",
        name: "Make a 13-sided dice!",
        name: <FormattedMessage
            defaultMessage={"Make a 13-sided dice!"}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.name`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        type: "lesson",
        urlId: "cog-blocks-2",
        description: <FormattedMessage
            defaultMessage={"We'll turn Cog into a dice, showing a different number of lights each time you shake it!"}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.description`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        img: `${BUCKET_URL}cover_image.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['cog', 'sound', 'light', 'sequencing', 'parallel-code', 'variables', 'conditionals', 'for-loop'],
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
                    defaultMessage={"Let's program Cog to be something useful - a dice!<br /><br />We'll make cog react to being shaken by showing a random number of lights and making the same number of beeps<br /><br />To do that, we're going to learn about <b>Variables</b> - special blocks that can <i>vary</i> or change in value, and <b>Conditionals</b> - blocks that make a decision!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-1`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },
            /* STEP 2 -- make sure you're connected to cog */
            {
                type: "info",
                image: `${BUCKET_URL}2-connected.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"First, make sure you are connected to a cog.<br /><br />If not, add one like you did in the last tutorial by pressing the Add button in the devices panel and selecting a Cog, then clicking connect. If you need to, skip back to the last tutorial to see how"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-2`}
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
            /* STEP 3 -- add an on shake */
            {
                type: "info",
                image: `${BUCKET_URL}3-onShake.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add an <b>On Shake</b> event block from the <b>Events</b> category"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-3`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-events",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_onShake"],
                            hexColor: "#855cd659",
                        }
                    },
                ],
                expectedCode: ["cog_onShake"],
            },
            /* STEP 4 -- variables category*/
            {
                type: "info",
                image: `${BUCKET_URL}4-variables.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Select the <b>Variables</b> category"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-4`}
                    values={{}}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-variables",
                        hexColor: "#855cd659",
                        onClickAction: "NextStep",
                    }
                ],
                expectedCode: [],
            },
            /* STEP 5 -- add a variable called ledID */
            {
                type: "info",
                image: `${BUCKET_URL}5-makeVariable.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Click the <b>Make a Variable</b> button<br /><br />Set the New variable name to <b>ledID</b> and press OK"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-5`}
                    values={{}}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["make_a_variable"],
                        hexColor: "#855cd659",
                        onClickAction: "",
                    }
                ],
                expectedCode: [],
            },
            /* STEP 6 -- select the control category */
            {
                type: "info",
                image: `${BUCKET_URL}6-control.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Select the <b>Control</b> category"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-6`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                        onClickAction: "NextStep",
                    }
                ],
                hint: {
                },
                expectedCode: [],
            },
            /* STEP 7 -- add a repeat block */
            {
                type: "info",
                image: `${BUCKET_URL}7-repeat.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>repeat</b> block"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-7`}
                    values={{}}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["control_repeat"]
                    },
                ],
                hint: {
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={"The 'repeat' block is under the Control category. Drag it to the script area and connect it to the On Shake block"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-7.hint`}
                    >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["control_repeat"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "control_repeat",
                        }
                    ],
                },
                expectedCode: ["cog_onShake=>control_repeat"],
            },
            /* STEP 8 -- Add set LED [id] to color block*/
            {
                type: "info",
                image: `${BUCKET_URL}8-setLED.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the <b>Looks</b> category and add a <b>Set LED [1] to [color]</b> block inside of the repeat block<br /><br />Change the color to your favorite color :-)"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-8`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                    type: "HighlightElement",
                        elementId: "category-looks",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_setLEDToColour"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                hint: {
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={"The 'set LED [1] to [color]' block is in the Looks category. Drag it to the script area and place it so it snaps inside the repeat block"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-8.hint`}
                    >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["cog_setLEDToColour"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "cog_setLEDToColour",
                        }
                    ],
                },
                expectedCode: ["cog_onShake=>control_repeat=>cog_setLEDToColour"],
            },
            /* STEP 9 -- try it out! */
            {
                type: "info",
                image: `${BUCKET_URL}9-tryItOut.gif`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out! <br /><br />What happens if you shake cog?"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-9`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: [],
            },
            /* STEP 10 -- increment the ledID variable */
            {
                type: "info",
                image: `${BUCKET_URL}10-changeVariable.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go back to the <b>Variables</b> category and add a <b>Change [ledID] by [1]</b> block just after the LED block"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-10`}
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
                hint: {
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={"The 'Change [ledID] by [1]' block is in the Variables category. Drag it to the script area and place it so it snaps inside the repeat block, just after the Set LED block"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-10.hint`}
                    >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["data_changevariableby"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "data_changevariableby",
                        }
                    ],
                },
                expectedCode: ["cog_onShake=>control_repeat=>cog_setLEDToColour=>data_changevariableby"],
            },
            /* STEP 11 -- add the variable in as the LED ID  */
            {
                type: "info",
                image: `${BUCKET_URL}11-ledID.gif`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Drag the <b>ledID variable</b> over into the <b>Set LED</b> block, so that it reads <b>Set LED <i>ledID</i> to [color]</b>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-11`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: [],
            },
            // Step 12 - Try it out
            {
                type: "info",
                image: `${BUCKET_URL}12-tryItOut.gif`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />What happens if you shake Cog?"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-12`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            // Step 13 - Try it again?
            {
                type: "info",
                image: `${BUCKET_URL}13-tryItOut.gif`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it again - more LEDs will turn on!<br /><br />But if you shake Cog <i>again</i> after that, nothing new happens. Let's change that!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-13`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            // Step 14 - reset variable
            {
                type: "info",
                image: `${BUCKET_URL}14-resetVariable.gif`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>Set [ledID] to [0]</b> block straight after the <b>On Shake</b> block, before the repeat block"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-14`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                    type: "HighlightElement",
                        blocks: ["data_setvariableto"],
                        hexColor: "#855cd659",
                    }
                ],
                hint: {
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={"The 'Set [ledID] to [0]' block is in the Variables category. Drag it to the script area and place it so it snaps just after the 'On Shake' block, before the repeat block"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-14.hint`}
                    >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["data_setvariableto"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "data_setvariableto",
                        }
                    ],
                },
                expectedCode: ["cog_onShake=>data_setvariableto=>control_repeat=>cog_setLEDToColour=>data_changevariableby"],
            },

            // Step 15 - turn off the LEDs at the start
            {
                type: "info",
                image: `${BUCKET_URL}15-turnOffLEDs.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Also add a <b>Turn off all LEDs</b> block from the <b>Looks</b> category<br /><br />Add it just before the repeat block, after the <i>set [ledID] to [0]</i> block you just added"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-15`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                    type: "HighlightElement",
                        elementId: "category-looks",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_turnOffLEDs"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                hint: {
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={"The 'Turn off all LEDs' block is in the Looks category.<br /><Br />Make sure you add it between the 'set [ledID] to [0]'' block and the 'repeat' block"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-15.hint`}
                    >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
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
                expectedCode: ["cog_onShake=>data_setvariableto=>cog_turnOffLEDs=>control_repeat=>cog_setLEDToColour=>data_changevariableby"],
            },

            // step 16 - try it out
            {
                type: "info",
                image: `${BUCKET_URL}16-tryItOut.gif`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now try it again! <br /><br />Now when you shake cog it'll reset both the lights and the <i>value</i> of the <b>variable</b> <i>ledID</i>, so that it counts up from 1 to 10"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-16`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 17 - go to the operators category
            {
                type: "info",
                image: `${BUCKET_URL}17-operators.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the <b>Operators</b> category"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-17`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-operators",
                        hexColor: "#855cd659",
                        onClickAction: "NextStep",
                    }
                ],
                expectedCode: [],
            },

            // step 18 - make repeat use a random number
            {
                type: "info",
                image: `${BUCKET_URL}18-random.gif`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Drag the <b>pick random [1] to [10]</b> block to replace the number in the repeat block<br /><br />Now, the repeat block will loop a random number of times from 1 to 10, changing each time!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-18`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 19 - add a pattern
            {
                type: "info",
                image: `${BUCKET_URL}19-13.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Cog has 13 programmable LEDs - 12 in the ring and one in the button<br /><br />Change the <b>pick random</b> block to pick a number between 1 and <b>13</b> instead"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-19`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            // step 20 - try it out!
            {
                type: "info",
                image: `${BUCKET_URL}20-tryItOut.gif`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out! <br /><br />Now every time you shake Cog you'll get a different number of lights<br /><Br />You've programmed Cog to be a dice!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-20`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 21 - explain variables
            {
                type: "info",
                image: `${BUCKET_URL}21-variable.gif`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"<i>ledID</i> is a <b>variable</b> - it has a value which can be changed or <i>varied</i><br /><br />In this code it counts up to turn on a different LED each time through the loop!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-21`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 22 - add sound feedback
            {
                type: "info",
                image: `${BUCKET_URL}22-sound.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let's add some sound feedback too.<br /><Br />Go to the <b>Sounds</b> category and add a <b>Play note [C4] for [1] seconds</b> block<br /><br />Change it to play the note for <b>0.1 seconds</b>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-22`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                    type: "HighlightElement",
                        elementId: "category-sound",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_playNoteForTime"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                hint: {
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={"The 'Play note [C4] for [1] seconds' block is in the Sounds category.<br /><Br />Make sure you add it inside the Repeat loop!"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-22.hint`}
                    >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
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
                expectedCode: ["cog_onShake=>data_setvariableto=>cog_turnOffLEDs=>control_repeat=>cog_setLEDToColour=>data_changevariableby=>cog_playNoteForTime"],
            },

            // step 23 - add a short pause
            {
                type: "info",
                image: `${BUCKET_URL}23-pause.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Also add a short pause by adding a <b>Wait [1] seconds</b> block from the <b>Control</b> category<br /><br />Change the length of the pause to be <b>0.1 seconds</b> as well<br /><br />If we don't add a pause then we won't be able to tell how many beeps there are, as they'll all merge into one long beep!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-23`}
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
                hint: {
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={"The 'Wait [1] seconds' block is in the Control category. Add it to the code by dragging it inside of the repeat loop"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-23.hint`}
                    >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
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
                expectedCode: ["cog_onShake=>data_setvariableto=>cog_turnOffLEDs=>control_repeat=>cog_setLEDToColour=>data_changevariableby=>cog_playNoteForTime=>control_wait"],
            },

            // step 24 - try it out!
            {
                type: "info",
                image: `${BUCKET_URL}shakeCog.gif`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><Br />Now you'll also hear a number of beeps that matches the number of lights!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-24`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: ["cog_onButtonPush", "cog_onShake=>cog_turnOffLEDs"],
            },

            // step 25 - add an if block
            {
                type: "info",
                image: `${BUCKET_URL}25-if.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let's make something special happen <b>if</b> you roll the top score - 13<br /><br />Go to the <b>Control</b> category and add an <b>If __ then</b> block"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-25`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                    type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["control_if"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                hint: {
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={"The 'if __ then' block is in the Control category. Add it to the code by dragging it so it connects after the repeat loop"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-25.hint`}
                    >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["control_if"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "control_if",
                        }
                    ],
                },
                expectedCode: ["cog_onShake=>data_setvariableto=>cog_turnOffLEDs=>control_repeat=>cog_setLEDToColour=>data_changevariableby=>cog_playNoteForTime=>control_wait=>control_if"],
            },

            // step 26 - operators
            {
                type: "info",
                image: `${BUCKET_URL}26-operators.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the <b>Operators</b> category"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-26`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-operators",
                        hexColor: "#855cd659",
                        onClickAction: "NextStep",
                    }
                ],
                expectedCode: [],
            },

            // step 27 - add an = block
            {
                type: "info",
                image: `${BUCKET_URL}27-equals.gif`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Drag the <b>=</b> block <b>into the <i>if</i> block</b><br /><br />This is where we'll set the <b>condition</b>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-27`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["operator_equals"]
                    },
                ],
                hint: {
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={"The '=' block is under the Operators category. Drag it to the matching shape in the if block"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-27.hint`}
                    >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["operator_equals"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "operator_equals",
                        }
                    ],
                },
            },

            // step 28 - set the condition
            {
                type: "info",
                image: `${BUCKET_URL}28-ledID.gif`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go back to the <b>Variables</b> category and drag the <b>ledID variable</b> into the <b>first box of the equals block</b><br /><br />Then <b>set the second box to 13</b>, so that the whole line reads <b>if ledID = 13 then</b>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-28`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 29 - control
            {
                type: "info",
                image: `${BUCKET_URL}29-if.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"The code inside this <b>if</b> block will only be run <b>if</b> the <b>variable</b> ledID is <b>equal</b> to 13<br /><br />It will check this after the <b>repeat</b> block has finished repeating, as the code continues down the sequence<br /><br />If the ledID <b>variable</b> is anything else other than 13 then the whole <b>if</b> block and any code in it will be skipped<br /><br />The <b>if</b> block is a type of <b>conditional</b> - the code inside it will only be run if the <b>condition</b> you set is true"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-29`}
                    values={{}}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
            },

            // step 30 - add a play tune
            {
                type: "info",
                image: `${BUCKET_URL}30-sound.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let's add something inside the <b>if</b> block!<br /><br />Go to the <b>sounds</b> category and add a <b>Play tune</b> block"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-30`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                    type: "HighlightElement",
                        elementId: "category-sound",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_playRtttlTune"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                hint: {
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={"The 'Play tune' block is in the Sounds category. Add it to the code by dragging it so it connects inside the if condition"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-30.hint`}
                    >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["cog_playRtttlTune"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "cog_playRtttlTune",
                        }
                    ],
                },
                expectedCode: ["cog_onShake=>data_setvariableto=>cog_turnOffLEDs=>control_repeat=>cog_setLEDToColour=>data_changevariableby=>cog_playNoteForTime=>control_wait=>control_if=>cog_playRtttlTune"],
            },

            // step 31 - change the tune
            {
                type: "info",
                image: `${BUCKET_URL}31-changeTune.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Change the tune to <b>whistle</b> from the dropdown menu"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-31`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            // step 32 - add some lights
            {
                type: "info",
                image: `${BUCKET_URL}32-lights.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Also add some lighting effects from the looks menu<br /><br />For example we can make the ring and button LEDs show a pattern"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-32`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                    type: "HighlightElement",
                        elementId: "category-looks",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_setLEDPattern"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                hint: {
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={"The 'Set [ring] LED to pattern [Flash]' block is in the Looks category. Add two of them inside the if condition, and change one to set the button pattern"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-32.hint`}
                    >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
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
                expectedCode: ["cog_onShake=>data_setvariableto=>cog_turnOffLEDs=>control_repeat=>cog_setLEDToColour=>data_changevariableby=>cog_playNoteForTime=>control_wait=>control_if=>cog_setLEDPattern=>cog_setLEDPattern=>cog_playRtttlTune"],
            },

            // step 33 - try it out
            {
                type: "info",
                image: `${BUCKET_URL}shakeCog.gif`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />See if you can roll a 13 on the dice by shaking Cog!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-33`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            /* STEP 34 -- end */
            {
                type: "end",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Well done!<br /><br />You've learned that a <b>variable</b> is something that can change in <b>value</b>. We can use them to make our code do different things without needing to change the code<br /><br />We learned about <b>if</b> blocks - these can be used to make code only run if a certain <b>condition</b> is met<br /><br />And we learned how to use a repeat <b>loop</b> to do something lots of times - in this case turning on a different LED each time"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-2.step-42`}
                    values={{}}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },
        ]
    }
}

export default cogBlocksTutorial2;
