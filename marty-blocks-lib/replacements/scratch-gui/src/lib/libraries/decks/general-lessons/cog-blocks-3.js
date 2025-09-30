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

const BUCKET_URL = "https://content.robotical.io/static/tutorials/cog/blocks/3/";

const cogBlocksTutorial3 = {
    'type-lesson-cog-tutorial-3': {
        id: "type-lesson-cog-tutorial-3",
        name: <FormattedMessage
            isRaw={true}
            defaultMessage={"Reaction test game!"}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.name`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        type: "lesson",
        urlId: "cog-blocks-3",
        description: <FormattedMessage
            isRaw={true}
            defaultMessage={"Let's make a reaction test game!<br /><br />We'll program Cog to light up randomly and the player will have a short amount of time to hit the button and score a point<br /><br />We'll use a <i>variable</i> to keep the score, and a timer to check if they're fast enough"}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.description`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        img: `${BUCKET_URL}cover_image.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['cog', 'variables', 'for-loop', 'conditionals', 'timer', 'operators'],
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
                    defaultMessage={"Let's make a reaction test game!<br /><br />We'll program Cog to light up randomly and the player will have a short amount of time to hit the button and score a point<br /><br />We'll use a <i>variable</i> to keep the score, and a timer to check if they're fast enough"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-1`}
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
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-2`}
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
            /* STEP 3 -- add a when flag clicked */
            {
                type: "info",
                image: `${BUCKET_URL}step-3.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>When flag clicked</b> block from the <b>Events</b> category<br /><br />This will be the start of our program, and will run when we press the green flag at the top of the screen"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-3`}
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
                        }
                    },
                ],
                expectedCode: ["event_whenflagclicked"],
            },
            /* STEP 4 --  add a set ring leds to color block from the looks...*/
            {
                type: "info",
                image: `${BUCKET_URL}step-4.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"<b>Add a</b> <i>set [ring] LEDs to [color]</i> <b>block</b> from the <b>Looks</b> category,<br /><br />Change it to set the <i>button</i> color"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-4`}
                    values={{}}
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
                        }
                    }
                ],
                expectedCode: ["event_whenflagclicked=>cog_setLEDs"],
            },
            /* STEP 5 -- add a wait second block*/
            {
                type: "info",
                image: `${BUCKET_URL}step-5.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>wait [1] seconds</b> block from the <b>Control</b> category"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-5`}
                    values={{}}
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
                expectedCode: ["event_whenflagclicked=>cog_setLEDs=>control_wait"]
            },
            /* STEP 6 -- go back to the looks and add a turn off all leds block */
            {
                type: "info",
                image: `${BUCKET_URL}step-6.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go back to the <b>Looks</b> category and add a <b>Turn off all LEDs</b> block<br /><br />Add it just after the wait block, so that Cog turns off the button LED after 1 second"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-6`}
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
                },
                expectedCode: ["event_whenflagclicked=>cog_setLEDs=>control_wait=>cog_turnOffLEDs"],
            },
            /* STEP 7 -- try it out */
            {
                type: "info",
                image: `${BUCKET_URL}step-7.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"<b>Try it out!</b> Click the green flag to start the program! The button on Cog will light up for 1 second then turn off"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-7`}
                    values={{}}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [

                ],
                hint: {
                },
                expectedCode: [""],
            },
            /* STEP 8 -- check if they player can press the button in time -- go to the events add on button press*/
            {
                type: "info",
                image: `${BUCKET_URL}step-8.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"<b>Check if you can press the button in time!</b> Go to the <b>Events</b> category and add an <b>On button pressed</b> block<br /><br />"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-8`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-events",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_onButtonPush"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                hint: {
                },
                expectedCode: ["event_whenflagclicked=>cog_setLEDs=>control_wait=>cog_turnOffLEDs", "cog_onButtonPush"],
            },
            /* STEP 9 -- now go to the control category and add an if then block under the on button press block... */
            {
                type: "info",
                image: `${BUCKET_URL}step-9.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add an <b>If __ then</b> block under the <b>On button pressed</b> block from the <b>Control</b> category<br /><br />We'll use this if block to check if the player has pressed the button in time"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-9`}
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
                expectedCode: ["event_whenflagclicked=>cog_setLEDs=>control_wait=>cog_turnOffLEDs", "cog_onButtonPush=>control_if"],
            },
            /* STEP 10 -- operators category  and drag a < block into the if block */
            {
                type: "info",
                image: `${BUCKET_URL}step-10.png`,
                additionalContent: {
                    images: [],
                    videos: [`${BUCKET_URL}step-10.webm`],
                },
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Drag a < block into the if block from the <b>Operators</b> category<br /><br />The < symbol means 'less than' and will only be true if the number on the left is smaller than the number on the right"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-10`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-operators",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["operator_lt"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                hint: {

                },
                expectedCode: [],
            },
            /* STEP 11 -- now go to the sensing category and drag the timer block into the first box on the < block  */
            {
                type: "info",
                image: `${BUCKET_URL}step-11.png`,
                additionalContent: {
                    images: [],
                    videos: [`${BUCKET_URL}step-11.webm`],
                },
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Drag the <b>timer</b> block from the <b>Sensing</b> category into the first box on the < block<br /><br />Then set the second box to 1, so that the line says <i>if timer &lt; 1 then</i>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-11`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-sensing",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["timer"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                expectedCode: [],
            },
            // Step 12 - explain the timer
            {
                type: "info",
                image: `${BUCKET_URL}step-12.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"The timer is a special variable which measures time in seconds.<br /><br />Whatever code we put in the if block will only be run if the timer variable is less than 1 second"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-12`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            // Step 13 - Now add a reset timer block
            {
                type: "info",
                image: `${BUCKET_URL}step-13.png`,
                additionalContent: {
                    images: [],
                    videos: [`${BUCKET_URL}step-13.webm`],
                },
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>Reset timer</b> block under the <b>When flag clicked</b> block<br /><br />This will reset the timer variable back to 0 just before the button LED is turned on"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-13`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-sensing",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["sensing_resettimer"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                expectedCode: ["event_whenflagclicked=>sensing_resettimer=>cog_setLEDs=>control_wait=>cog_turnOffLEDs", "cog_onButtonPush=>control_if"],
            },

            // Step 14 - go back to the looks category and add a set [ledID] to [0] block
            {
                type: "info",
                image: `${BUCKET_URL}step-14.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go back to the <b>Looks</b> category and add a <b>Set [ring] LEDs to [color]</b> block inside the if block<br /><br />Change the color to whatever you like, and make sure you add it inside the if statement!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-14`}
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
                        }
                    }
                ],
                hint: {

                },
                expectedCode: ["event_whenflagclicked=>sensing_resettimer=>cog_setLEDs=>control_wait=>cog_turnOffLEDs", "cog_onButtonPush=>control_if=>cog_setLEDs"],
            },

            // Step 15 - add a play note c4 for 1 seconds block
            {
                type: "info",
                image: `${BUCKET_URL}step-15.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>Play note [C4] for [1] seconds</b> block from the <b>Sound</b> category<br /><br />Place it straight after the <b>Set LED</b> block, and change it to play <b>C6</b> for <b>0.25 seconds</b>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-15`}
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

                },
                expectedCode: ["event_whenflagclicked=>sensing_resettimer=>cog_setLEDs=>control_wait=>cog_turnOffLEDs", "cog_onButtonPush=>control_if=>cog_setLEDs=>cog_playNoteForTime"],
            },

            // step 16 - add a turn off all leds block
            {
                type: "info",
                image: `${BUCKET_URL}step-16.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>Turn off all LEDs</b> block after the <b>Play note</b> block<br /><br />The code inside the if statement will only be run (and so Cog will only light up and beep) if the button is pressed within 1 second of the timer being reset"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-16`}
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
                expectedCode: ["event_whenflagclicked=>sensing_resettimer=>cog_setLEDs=>control_wait=>cog_turnOffLEDs", "cog_onButtonPush=>control_if=>cog_setLEDs=>cog_playNoteForTime=>cog_turnOffLEDs"],
            },

            // step 17 - Try it out!
            {
                type: "info",
                // image: `${BUCKET_URL}`, 
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"<b>Try it out!</b> Press the green flag to start, then if you press the button within 1 second the lights will turn on and you'll hear the beep!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-17`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 18 - make the light turn on more than once
            {
                type: "info",
                image: `${BUCKET_URL}step-18.png`,
                additionalContent: {
                    images: [],
                    videos: [`${BUCKET_URL}step-18.webm`],
                },
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now let's make the light turn on more than once!<br /><br />Go to the <b>Control</b> category and add a <b>Repeat</b> block around the code under the <b>When flag clicked</b> block<br /><br />This will make Cog light up multiple times!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-18`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["control_repeat"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                expectedCode: ["event_whenflagclicked=>control_repeat=>sensing_resettimer=>cog_setLEDs=>control_wait=>cog_turnOffLEDs", "cog_onButtonPush=>control_if=>cog_setLEDs=>cog_playNoteForTime=>cog_turnOffLEDs"],
            },

            // step 19 - add another wait seconds block
            {
                type: "info",
                image: `${BUCKET_URL}step-19.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Also add another <b>Wait [1] seconds</b> block inside the repeat loop"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-19`}
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
                expectedCode: ["event_whenflagclicked=>control_repeat=>sensing_resettimer=>cog_setLEDs=>control_wait=>cog_turnOffLEDs=>control_wait", "cog_onButtonPush=>control_if=>cog_setLEDs=>cog_playNoteForTime=>cog_turnOffLEDs"],
            },

            // step 20 - change the time to a random number
            {
                type: "info",
                image: `${BUCKET_URL}step-20.png`,
                additionalContent: {
                    images: [],
                    videos: [`${BUCKET_URL}step-20.webm`],
                },
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the <b>Operators</b> category, and change the time on that wait block to a random number between 1 and 5 seconds"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-20`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-operators",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["operator_random"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                expectedCode: [],
            },

            // step 21 - try it out!
            {
                type: "info",
                image: `${BUCKET_URL}step-21.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now when you press the green flag you'll have 10 chances to hit the button while it's lit up!<br /><br />There will be a random pause between each one, and during each iteration through the loop, the timer is reset, so we don't need to change the code that reacts to the button press. <br /><br />Try it out! How many of the lights can you catch?"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-21`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 22 - keeping track of your score
            {
                type: "info",
                image: `${BUCKET_URL}step-22.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Keeping track of your score in your head is a bit boring. Let's add code to keep score automatically!<br /><br />Go to the <b>Variables</b> category and make a variable called <b>score</b>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-22`}
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
                hint: {},
                expectedCode: [],
            },

            // step 23 - set score to 0
            {
                type: "info",
                image: `${BUCKET_URL}step-23.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>Set [my variable] to [0]</b> block straight after the <b>When flag clicked</b> block, before the repeat loop"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-23`}
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
                hint: {},
                expectedCode: ["event_whenflagclicked=>data_setvariableto=>control_repeat=>sensing_resettimer=>cog_setLEDs=>control_wait=>cog_turnOffLEDs=>control_wait", "cog_onButtonPush=>control_if=>cog_setLEDs=>cog_playNoteForTime=>cog_turnOffLEDs"],
            },

            // step 24 - change the variable to score so that it says set score to 0
            {
                type: "info",
                image: `${BUCKET_URL}step-24.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Change the variable to <b>score</b> so that it says <i>Set score to 0</i><br /><br />Now whenever you start the game the score will be reset to 0"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-24`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 25 - add a change my variable by 1 block
            {
                type: "info",
                image: `${BUCKET_URL}step-25.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Inside the if statement, add a change [my variable] by 1 block and select the <b>score</b> variable from the menu, so it says 'change score by 1'"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-25`}
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
                expectedCode: [
                    "event_whenflagclicked=>data_setvariableto=>control_repeat=>sensing_resettimer=>cog_setLEDs=>control_wait=>cog_turnOffLEDs=>control_wait",
                    "cog_onButtonPush=>control_if=>data_changevariableby=>cog_setLEDs=>cog_playNoteForTime=>cog_turnOffLEDs"
                ],
            },

            // step 26 - try it out!
            {
                type: "info",
                // image: `${BUCKET_URL}`, 
                video: `${BUCKET_URL}step-26.webm`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Now every time you press in time the score will increase by 1!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-26`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 27 - let's make it a bit more difficult
            {
                type: "info",
                image: `${BUCKET_URL}step-27.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now let's make it a bit more difficult!<br /><br />What if the lights go faster as you went on?<br /><br />Make another variable and call it <i>delay</i>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-27`}
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
                hint: {},
                expectedCode: [],
            },

            // step 28 - set delay to 1
            {
                type: "info",
                image: `${BUCKET_URL}step-28.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Set 'delay' to 1 at the start of the program, right after you reset the score"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-28`}
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
                expectedCode: [
                    "event_whenflagclicked=>data_setvariableto=>data_setvariableto=>control_repeat=>sensing_resettimer=>cog_setLEDs=>control_wait=>cog_turnOffLEDs=>control_wait",
                    "cog_onButtonPush=>control_if=>data_changevariableby=>cog_setLEDs=>cog_playNoteForTime=>cog_turnOffLEDs"
                ],
            },

            // step 29 - decrease the delay each time through the repeat loop
            {
                type: "info",
                image: `${BUCKET_URL}step-29.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let's decrease the delay each time through the repeat loop!<br /><br />Add a <b>Change [delay] by [1]</b> block inside the repeat loop.<br /><br />We don't wait the delay to decrease too much, so set it to change 'delay' by -0.05. That will decrease it by 1/20th of a second each time"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-29`}
                    values={{}}
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
                expectedCode: [
                    "event_whenflagclicked=>data_setvariableto=>data_setvariableto=>control_repeat=>sensing_resettimer=>cog_setLEDs=>control_wait=>cog_turnOffLEDs=>control_wait=>data_changevariableby",
                    "cog_onButtonPush=>control_if=>data_changevariableby=>cog_setLEDs=>cog_playNoteForTime=>cog_turnOffLEDs"
                ],
            },

            // step 30 - over the 10 iterations of the repeat loop..
            {
                type: "info",
                // image: `${BUCKET_URL}`, 
                video: `${BUCKET_URL}step-30.webm`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Over the 10 iterations of the repeat loop, the delay will decrease from 1 second to 0.5 (or half a second)"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-30`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [

                ],
                hint: {

                },
                expectedCode: [],
            },

            // step 31 -  use the delay variable  in the < block so that it says if timer < delay then...
            {
                type: "info",
                image: `${BUCKET_URL}step-31.png`,
                additionalContent: {
                    images: [],
                    videos: [`${BUCKET_URL}step-31.webm`],
                },
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now let's use the delay variable<br /><br />One nice thing about variables is that we can use them in more than one place<br /><br />Drag the delay variable into the '<' block so that it says <i>if timer &lt; delay then</i><br /><br />Also drag it into the 'wait [1] second' block, so that it says 'wait [delay] seconds'"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-31`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            // step 32 - Try it out!
            {
                type: "info",
                // image: `${BUCKET_URL}`, 
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Do you notice the game speeding up?"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-32`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [

                ],
                hint: {

                },
                expectedCode: [],
            },

            // step 33 - show the score to the player at the end 
            {
                type: "info",
                image: `${BUCKET_URL}step-33.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let's make cog show the score to the player at the end.<br /><br />We can do that like we did with the dice in the last activity.<br /><br />First of all, make a variable called <b>ledID</b>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-33`}
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

            // step 34 -  add a set variable block after the repeat loop, and set ledID to 0
            {
                type: "info",
                image: `${BUCKET_URL}step-34.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Then add a <b>set variable</b> block after the repeat loop, and set <b>ledID</b> to 0."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-34`}
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
                expectedCode: [
                    "event_whenflagclicked=>data_setvariableto=>data_setvariableto=>control_repeat=>sensing_resettimer=>cog_setLEDs=>control_wait=>cog_turnOffLEDs=>control_wait=>data_changevariableby=>data_setvariableto",
                    "cog_onButtonPush=>control_if=>data_changevariableby=>cog_setLEDs=>cog_playNoteForTime=>cog_turnOffLEDs"
                ]
            },

            // step 35 -  next, go to the control category and add another repeat loop
            {
                type: "info",
                image: `${BUCKET_URL}step-35.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Next, go to the <b>Control</b> category and add another <b>repeat</b> loop.<br /><br />Replace the number in it with the 'score' variable, so that it says 'repeat [score]'"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-35`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                        // onClickAction: "HighlightBlocks",
                        // args: {
                        //     blocks: ["control_repeat"],
                        //     hexColor: "#855cd659",

                        // }
                    }
                ],
                expectedCode: [
                    "event_whenflagclicked=>data_setvariableto=>data_setvariableto=>control_repeat=>sensing_resettimer=>cog_setLEDs=>control_wait=>cog_turnOffLEDs=>control_wait=>data_changevariableby=>data_setvariableto=>control_repeat",
                    "cog_onButtonPush=>control_if=>data_changevariableby=>cog_setLEDs=>cog_playNoteForTime=>cog_turnOffLEDs"
                ]
            },

            // step 36 -  add a set led [1] to [color] block inside this new repeat loop
            {
                type: "info",
                image: `${BUCKET_URL}step-36.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>Set LED [1] to [color]</b> block inside this new repeat loop<br /><br />Replace the number with the 'ledID' variable, so that it says 'Set LED [ledID] to [color]'<br /><br />Then set the color to whatever you like!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-36`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-looks",
                        hexColor: "#855cd659",
                        // onClickAction: "HighlightBlocks",
                        // args: {
                        //     blocks: ["cog_setLEDToColour"],
                        //     hexColor: "#855cd659",
                        // }
                    }
                ],
                expectedCode: [
                    "event_whenflagclicked=>data_setvariableto=>data_setvariableto=>control_repeat=>sensing_resettimer=>cog_setLEDs=>control_wait=>cog_turnOffLEDs=>control_wait=>data_changevariableby=>data_setvariableto=>control_repeat=>cog_setLEDToColour",
                    "cog_onButtonPush=>control_if=>data_changevariableby=>cog_setLEDs=>cog_playNoteForTime=>cog_turnOffLEDs"
                ]
            },

            // step 37 -  and finally add a change [variable] by [1] block after that set LED block, and make it change ledID by 1
            {
                type: "info",
                image: `${BUCKET_URL}step-37.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"And finally, add a <b>Change [variable] by [1]</b> block after that set LED block, and make it change <b>ledID</b> by 1"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-37`}
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
                expectedCode: [
                    "event_whenflagclicked=>data_setvariableto=>data_setvariableto=>control_repeat=>sensing_resettimer=>cog_setLEDs=>control_wait=>cog_turnOffLEDs=>control_wait=>data_changevariableby=>data_setvariableto=>control_repeat=>cog_setLEDToColour=>data_changevariableby",
                    "cog_onButtonPush=>control_if=>data_changevariableby=>cog_setLEDs=>cog_playNoteForTime=>cog_turnOffLEDs"
                ]
            },

            // step 38 -  try it out!
            {
                type: "info",
                // image: `${BUCKET_URL}`, 
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Now when you finish, Cog will display your score!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-38`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: [],
            },

            // step 39 -  Well done!
            {
                type: "info",
                // image: `${BUCKET_URL}`, 
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Well done - you've done some pretty advanced coding!<br /><br />You've learned how to use variables to keep track of things during a game<br /><br />We used a timer and a less than operator to make a comparison, along with an if statement to decide whether the player pressed the button in time."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-39`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: [],
            },


            // step 40 -  Well done!
            {
                type: "end",
                // image: `${BUCKET_URL}`, 
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Next steps!<ul><li>Could you make the game more difficult? What about adding a few more levels that will be even faster?</li><li>Using what you learned in the dice tutorial, could you make Cog celebrate if the player gets a perfect score?</li><li>If you have friends or classmates with cogs, take turns to play a game of whack-a-mole using more than one cog at a time! Everyone should press the green flag at the same time, and then players should take turns to try and score as many points as possible across all the cogs. At the end, add up your score by adding the number of lights on each of the cogs</li></ul>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-3.step-40`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                ],
                expectedCode: [],
            },
        ]
    }
}

export default cogBlocksTutorial3;
