import React from 'react';
import { FormattedMessage } from 'react-intl';


const BUCKET_URL = "https://content.robotical.io/static/tutorials/cog/blocks/6/";


const cogBlocksTutorial6 = {
    'type-lesson-cog-tutorial-6': {
        id: "type-lesson-cog-tutorial-6",
        name: <FormattedMessage
            defaultMessage={"Let’s make a skiing game!"}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.name`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        type: "lesson",
        urlId: "cog-blocks-6",
        description: <FormattedMessage
            defaultMessage={"Let’s make a game where we use Cog and Sprites on screen!<br /><br />We’ll make a skiing game where the player has to avoid hitting trees and rocks."}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.description`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        img: `${BUCKET_URL}cover_image.png`, // todo: add the image
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['cog', 'fractions', 'multiplication', 'coordinates', 'random numbers'],
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
                    defaultMessage={"Let’s make a game where we use Cog and Sprites on screen!<br /><br />We’ll make a skiing game where the player has to avoid hitting trees and rocks."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-1`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },
            /* STEP 1.2 -- make sure you're connected to cog */
            {
                type: "info",
                image: `${BUCKET_URL}connected.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"First, make sure you are connected to a cog.<br /><br />If not, add one like you did in the last tutorial by pressing the Add button in the devices panel and selecting a Cog, then clicking connect. If you need to, skip back to the last tutorial to see how"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-1.2`}
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

            /* STEP 2 -- go to the events category */
            {
                type: "info",
                image: `${BUCKET_URL}step-2.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the Events category and add an <b>On object sensed [left]</b> block.<br /><br />We’ll use this as our start button."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-2`}
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

            /* STEP 3 -- add a forever loop */
            {
                type: "info",
                image: `${BUCKET_URL}step-3.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>forever</b> loop from the Control category."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-3`}
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
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["cog_onObjectSense=>control_forever"],
            },

            /* STEP 4 -- make a variable called ay */
            {
                type: "info",
                image: `${BUCKET_URL}step-4.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the variables category and make a variable called <b>ay</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-4`}
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
            },

            /* STEP 5 -- set ay to accelerometer Y */
            {
                type: "info",
                image: `${BUCKET_URL}step-5.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add blocks to <i>set [ay] to [accelerometer [Y]]</i> inside the forever loop.<br /><br />You’ll need to use a <b>set</b> block from the Variables category, the <b>Accelerometer</b> block from the Sensors category, and to change the axis to <b>Y</b> using the dropdown menu."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-5`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: ["cog_onObjectSense=>control_forever=>data_setvariableto"]
            },

            /* STEP 6 -- add a broadcast update position */
            {
                type: "info",
                image: `${BUCKET_URL}step-6.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>broadcast [message 1]</b> block, and set it to broadcast a <b>New Message</b> called <i>update position</i>.<br /><br />We’ll use this as a signal to move our sprite around."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-6`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-events",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["event_broadcast"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["cog_onObjectSense=>control_forever=>data_setvariableto=>event_broadcast"]
            },

            /* STEP 7 -- add a broadcast start */
            {
                type: "info",
                image: `${BUCKET_URL}step-7.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add another <b>broadcast [message1]</b> block before the forever loop, and set it to broadcast a <b>New Message</b> called <i>start</i>.<br /><br />We’ll use this to make sure everything resets at the beginning of a game."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-7`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-events",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["event_broadcast"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["cog_onObjectSense=>event_broadcast=>control_forever=>data_setvariableto=>event_broadcast"]
            },

            /* STEP 8 -- choose a sprite */
            {
                type: "info",
                image: `${BUCKET_URL}step-8.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Click the button to choose a sprite to add."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-8`}
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

            /* STEP 9 -- add the penguin sprite */
            {
                type: "info",
                image: `${BUCKET_URL}step-9.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add the <b>Penguin 2</b> sprite."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-9`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 10 -- when I receive start */
            {
                type: "info",
                image: `${BUCKET_URL}step-10.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"With the penguin sprite selected, add a <b>when I receive [start]</b> block from the Events category."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-10`}
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

            /* STEP 11 -- set size to 20% */
            {
                type: "info",
                image: `${BUCKET_URL}step-11.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the Looks category and add a <b>set size to [100]%</b> block.<br /><br />Change the size to 20%."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-11`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-looks",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["looks_setsizeto"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenbroadcastreceived=>looks_setsizeto"],
            },

            /* STEP 12 -- when I receive update position */
            {
                type: "info",
                image: `${BUCKET_URL}step-12.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go back to the Events category and add a <b>when I receive [update position]</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-12`}
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
                expectedCode: ["event_whenbroadcastreceived=>looks_setsizeto", "event_whenbroadcastreceived"],
            },

            /* STEP 13 -- go to x: y: */
            {
                type: "info",
                image: `${BUCKET_URL}step-13.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Go to the Motion category and add a <b>go to x: [] y: []</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-13`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-motion",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["motion_gotoxy"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenbroadcastreceived=>looks_setsizeto=>motion_gotoxy"],
            },

            /* STEP 14 -- change to x: [ay] x 200 */
            {
                type: "info",
                image: `${BUCKET_URL}step-14.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Change it to say <b>go to x: [[ay] x 200] y:0</b>.<br /><br />You’ll need to use a <b>multiply (*)</b> block from the Operators category, and the <b>ay</b> variable from the Variables category."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-14`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },

            /* STEP 15 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Cover the left object sensor to start the game, then tilt Cog left and right to move the penguin left and right."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-15`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 16 -- add the tree sprite */
            {
                type: "info",
                image: `${BUCKET_URL}step-16.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s add some obstacles!<br /><br />Add the <b>Tree1</b> sprite."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-16`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },

            /* STEP 17 -- when I receive start */
            {
                type: "info",
                image: `${BUCKET_URL}step-17.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"With the Tree sprite selected, add a <b>when I receive [start]</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-17`}
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

            /* STEP 18 -- set size to 30% and hide */
            {
                type: "info",
                image: `${BUCKET_URL}step-18.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"From the Looks category, add a <b>set size to [30]%</b> block, and a <b>hide</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-18`}
                />,
                id: `gui.howtos.lessons.type-lesson-cog-tutorial-6.step-18`,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-looks",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["looks_setsizeto", "looks_hide"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenbroadcastreceived=>looks_setsizeto=>looks_hide"],
            },

            /* STEP 19 -- add a forever loop */
            {
                type: "info",
                image: `${BUCKET_URL}step-19.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>forever</b> loop from the Control category."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-19`}
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
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenbroadcastreceived=>looks_setsizeto=>looks_hide=>control_forever"],
            },

            /* STEP 20 -- create clone of myself */
            {
                type: "info",
                image: `${BUCKET_URL}step-20.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Inside the forever loop, add a <b>create clone of [myself]</b> block.<br /><br />A clone is an identical copy of something.<br /><br />In this case the create clone block will make a copy of the tree sprite, and all the code that is linked to it."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-20`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["control_create_clone_of"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenbroadcastreceived=>looks_setsizeto=>looks_hide=>control_forever=>control_create_clone_of"]
            },

            /* STEP 21 -- wait 1 second */
            {
                type: "info",
                image: `${BUCKET_URL}step-21.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"After that block, add a <b>wait [1] seconds</b> block.<br /><br />This will mean that a new tree will be made every 1 second."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-21`}
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
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenbroadcastreceived=>looks_setsizeto=>looks_hide=>control_forever=>control_create_clone_of=>control_wait"]
            },

            /* STEP 22 -- when I start as clone */
            {
                type: "info",
                image: `${BUCKET_URL}step-22.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now add a <b>when I start as clone</b> block.<br /><br />Any code attached to this will be run when the clone is created."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-22`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["control_start_as_clone"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenbroadcastreceived=>looks_setsizeto=>looks_hide=>control_forever=>control_create_clone_of=>control_wait=>control_start_as_clone"]
            },

            /* STEP 23 -- go to x: pick random */
            {
                type: "info",
                image: `${BUCKET_URL}step-23.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>go to x: [pick random [-240] to [240] y: [-200]</b> block.<br /><br />You can find the <b>pick random</b> block in the Operators category.<br /><br />This will make the new clone of the tree start at a random place on the bottom of the screen."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-23`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: ["event_whenbroadcastreceived=>looks_setsizeto=>looks_hide=>control_forever=>control_create_clone_of=>control_wait", "control_start_as_clone=>motion_gotoxy"]
            },

            /* STEP 24 -- glide 2 secs to */
            {
                type: "info",
                image: `${BUCKET_URL}step-24.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>glide [1] secs to: x[] y:[]</b> block.<br /><br />The glide blocks makes a smooth movement over a certain amount of time."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-24`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-motion",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["motion_glidesecstoxy"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenbroadcastreceived=>looks_setsizeto=>looks_hide=>control_forever=>control_create_clone_of=>control_wait", "control_start_as_clone=>motion_gotoxy=>motion_glidesecstoxy"]
            },

 

            /* STEP 25 -- glide to x position */
            {
                type: "info",
                image: `${BUCKET_URL}step-25.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Change it to say <b>glide [2] secs to x: [x position] y: [200]</b>.<br /><br />You can find the x position block in the Motion category.<br /><br />This will make the tree move from the bottom to the top of the screen over 2 seconds, keeping the x position (the left and right position) the same."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-25`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: ["event_whenbroadcastreceived=>looks_setsizeto=>looks_hide=>control_forever=>control_create_clone_of=>control_wait", "control_start_as_clone=>motion_gotoxy=>motion_glidesecstoxy"]
            },

            /* STEP 26 -- show the clone */
            {
                type: "info",
                image: `${BUCKET_URL}step-26.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Before the glide block, add a <b>show</b> block from the Looks category.<br /><br />The clone will start hidden, since the sprite it was copied from was hidden, so we’ll need to show it before we start moving it."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-26`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-looks",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["looks_show"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenbroadcastreceived=>looks_setsizeto=>looks_hide=>control_forever=>control_create_clone_of=>control_wait", "control_start_as_clone=>motion_gotoxy=>looks_show=>motion_glidesecstoxy"]
            },

            /* STEP 27 -- delete this clone */
            {
                type: "info",
                image: `${BUCKET_URL}step-27.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We want each clone of the tree to disappear when it reaches the top of the screen.<br /><br />To do this, add a <b>delete this clone</b> block from the Control category, under the glide block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-27`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["control_delete_this_clone"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenbroadcastreceived=>looks_setsizeto=>looks_hide=>control_forever=>control_create_clone_of=>control_wait", "control_start_as_clone=>motion_gotoxy=>looks_show=>motion_glidesecstoxy=>control_delete_this_clone"]
            },

            /* STEP 28 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />A new tree will appear every second and move up the screen.<br /><br />To stop the program, press the red Stop sign."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-28`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 29 -- detect collision */
            {
                type: "info",
                image: `${BUCKET_URL}step-29.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s make the game detect if the penguin crashes into a tree.<br /><br />With the Tree sprite still selected, add another <b>when I start as clone</b> block, and a <b>forever</b> loop under it."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-29`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [
                    "event_whenbroadcastreceived=>looks_setsizeto=>looks_hide=>control_forever=>control_create_clone_of=>control_wait",
                    "control_start_as_clone=>motion_gotoxy=>looks_show=>motion_glidesecstoxy=>control_delete_this_clone",
                    "control_start_as_clone=>control_forever"
                ]
            },

            /* STEP 30 -- if touching penguin */
            {
                type: "info",
                image: `${BUCKET_URL}step-30.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add an <b>if [] then</b> block inside the forever loop."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-30`}
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
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["control_start_as_clone=>control_forever=>control_if"]
            },

            /* STEP 31 -- if touching penguin */
            {
                type: "info",
                image: `${BUCKET_URL}step-31.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Change it to say <b>if [touching [Penguin 2]] then</b>.<br /><br />You can find the touching block in the Sensing category, and can select Penguin 2 from the dropdown menu.<br /><br />This if condition will be true if the tree is touching the penguin."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-31`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-sensing",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["sensing_touchingobject"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: []
            },

            /* STEP 32 -- stop all */
            {
                type: "info",
                image: `${BUCKET_URL}step-32.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Inside the if condition, add a <b>stop [all]</b> block.<br /><br />This will make the game finish if the penguin bumps into a tree."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-32`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["control_stop"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["control_start_as_clone=>control_forever=>control_if=>control_stop"]
            },

            /* STEP 33 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Cover the left object sensor to start the game, and tilt Cog to steer the penguin to avoid the trees.<br /><br />When you touch a tree the game will finish!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-33`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 34 -- add score */
            {
                type: "info",
                image: `${BUCKET_URL}step-34.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s add a score!<br /><br />Make another variable called <b>score</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-34`}
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

            /* STEP 35 -- set score to 0 */
            {
                type: "info",
                image: `${BUCKET_URL}step-35.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"With the Tree sprite still selected, add a <b>set [score] to [0]</b> block after the <b>when I receive [start]</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-35`}
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
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["event_whenbroadcastreceived=>data_setvariableto=>looks_setsizeto=>looks_hide=>control_forever=>control_create_clone_of=>control_wait"]
            },

            /* STEP 36 -- change score by 1 */
            {
                type: "info",
                image: `${BUCKET_URL}step-36.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"And add a <b>change [score] by [1]</b> block between the glide and delete this clone blocks.<br /><br />This will make the score increase by 1 for every tree that we successfully avoid."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-36`}
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
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: ["control_start_as_clone=>motion_gotoxy=>looks_show=>motion_glidesecstoxy=>data_changevariableby=>control_delete_this_clone"]
            },

            /* STEP 37 -- add delay variable */
            {
                type: "info",
                image: `${BUCKET_URL}step-37.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s make the game get harder as it goes on.<br /><br />Add another variable called <b>delay</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-37`}
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

            /* STEP 38 -- set delay to 1 */
            {
                type: "info",
                image: `${BUCKET_URL}step-38.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks alongside the other ones for the Tree sprite.<br /><br />When the game starts, the delay will be set to 1.<br /><br />Then, every 5 seconds the delay will be set to ¾ (three quarters) of what it was before.<br /><br />It will go from 1 second, to 0.75 seconds (three quarters of a second), to 0.56 (just over half a second), to 0.42, to 0.3 seconds, and so on!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-38`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 39 -- use delay variable */
            {
                type: "info",
                image: `${BUCKET_URL}step-39.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now use the delay variable to set the time between the trees being created."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-39`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 40 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />You’ll notice that the trees start appearing much more quickly the further you go!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-40`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 41 -- add stop broadcast */
            {
                type: "info",
                image: `${BUCKET_URL}step-41.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s add some lights on Cog to make things more exciting.<br /><br />Add a <b>broadcast [stop] and wait</b> block before the <b>stop [all]</b> block.<br /><br />You will need to create a New Message called <b>stop</b>.<br /><br />The <b>broadcast [stop] and wait</b> block will make sure that whatever code runs when the stop message is sent will get to finish before the code continues and the <b>stop [all]</b> block runs."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-41`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 42 -- select Cog */
            {
                type: "info",
                image: `${BUCKET_URL}step-42.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Select Cog."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-42`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 43 -- set ring LEDs to green */
            {
                type: "info",
                image: `${BUCKET_URL}step-43.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>set [ring] LEDs to [green]</b> block and a <b>set [ring] LEDs to pattern [Spin1]</b> block as shown here.<br /><br />That will start the lights spinning on Cog when the game starts."}
                    description=""  
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-43`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 44 -- set ring LEDs to red */
            {
                type: "info",
                image: `${BUCKET_URL}step-44.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>when I receive [stop]</b> block and a block to <b>set [ring] LEDs to [red]</b>.<br /><br />They will make the lights turn red when the game finishes."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-6.step-44`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 45 -- well done next steps */
            {
                type: "end",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Well done!<br /><br />You’ve learned how to make a game in Blocks! We’ve used the clone functionality to make lots of copies of trees to avoid, and made Cog control a character on the screen.<br /><br />Next steps:<ul><li>Can you make another type of obstacle to avoid - maybe rocks?</li><li>Can you make the penguin jump when you press the button on Cog?</li><li>Can you make it so that you can jump over the rock obstacles to get bonus points?</li></ul>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-5.step-56`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },
        ]
    }
}

export default cogBlocksTutorial6;
