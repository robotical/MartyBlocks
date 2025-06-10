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

const BUCKET_URL = "https://roboticalpublic.s3.eu-west-1.amazonaws.com/marty-blocks-student-led-lessons/type-lesson-cog-and-marty-tutorial/";

const cogAndMartyTutorial = {
    'type-lesson-cog-and-marty-tutorial': {
        id: "type-lesson-cog-and-marty-tutorial",
        name: "Cog and Marty Interaction",
        type: "lesson",
        urlId: "cog-and-marty-interaction",
        description: <FormattedMessage
            isRaw={true}
            defaultMessage={"Learn how <b>Cog</b> and Marty can interact with each other"}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-and-marty-tutorial.description`}
            values={{}}
        />,
        img: `${BUCKET_URL}cover_image.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['marty', 'cog', 'interaction'],
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
                    defaultMessage={"In this tutorial we will learn how <b>Cog</b> and Marty can interact with each other. Press 'Next' to start!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-and-marty-tutorial.step-1`}
                    values={{}}
                />,
                expectedCode: [],
            },
            /* STEP 1.1 --connect to Cog */
            {
                type: "info",
                image: `${BUCKET_URL}device_button.png`,
                description: <FormattedMessage
                    defaultMessage={"First, let's connect to Cog. Click on the 'Connect a device' button and then select Cog"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-and-marty-tutorial.step-1.1`}
                    values={{}}
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
            /* STEP 1.1.1 -- actually connect to Cog */
            {
                type: "info",
                image: `${BUCKET_URL}connect_device_button.png`,
                description: <FormattedMessage
                    defaultMessage={"Great! Now click on the 'connect' button to connect to Cog"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-and-marty-tutorial.step-1.1.1`}
                    values={{}}
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
            /* STEP 1.2 --connect to Marty */
            {
                type: "info",
                image: `${BUCKET_URL}device_button.png`,
                description: <FormattedMessage
                    defaultMessage={"Next, let's connect to Marty. Click on the 'Connect a device' button and then select Marty"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-and-marty-tutorial.step-1.2`}
                    values={{}}
                />,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "device-selector-action-menu",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightElement",
                        args: {
                            elementId: "library-item_Marty",
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: [],
            },
            /* STEP 1.2.1 -- actually connect to Marty */
            {
                type: "info",
                image: `${BUCKET_URL}connect_device_button.png`,
                description: <FormattedMessage
                    defaultMessage={"Great! Now click on the 'connect' button to connect to Marty"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-and-marty-tutorial.step-1.2.1`}
                    values={{}}
                />,
                nextStepActions: [
                    {
                        type: "HighlightConnectionButtonElement",
                        elementId: "{{dynamicId}}-Marty-connect",
                        hexColor: "#855cd659",
                        onClickAction: "NextStep",
                        delay: 5000 // Marty takes a while to load
                    }
                ],
                expectedCode: [],
            },
            /* STEP 2 -- go to cog event blocks */
            {
                type: "info",
                image: `${BUCKET_URL}cog_device_unselected.png`,
                description: <FormattedMessage
                    defaultMessage={"Now that we are connected to the robots, let's start coding! To see Cog's blocks, click on the Cog device button"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-and-marty-tutorial.step-2`}
                    values={{}}
                />,
                nextStepActions: [
                    {
                        type: "HighlightDeviceImageElement",
                        raftType: "Cog",
                        elementId: "sprite-image-outer-{{dynamicId}}",
                        hexColor: "#855cd659",
                        onClickAction: "NextStep"
                    }
                ],
            },
            /* STEP 3 -- add ontouchcog block */
            {
                type: "info",
                image: `${BUCKET_URL}cog_button_press_block.png`,
                description: <FormattedMessage
                    defaultMessage={"Once you have selected the Cog blocks, drag the 'on button press' event block to the script area. This block will listen for when Cog's button is clicked"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-and-marty-tutorial.step-3`}
                    values={{}}
                />,
                nextStepActions: [
                    // we could either highlight the category first and then the block (using the onClickAction of the HighlightElement nextStepAction type, as shown below)
                    {
                        type: "HighlightElement",
                        elementId: "category-events",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_onButtonPush"],
                            hexColor: "#855cd659",
                        }
                    },
                    // or, we could highlight the block directly without highlighting the category first (the commented-out code below)
                    // {
                    //     type: "HighlightBlocks",
                    //     blocks: ["cog_onButtonPush"]
                    // },
                ],
                hint: {
                    description: <FormattedMessage
                        defaultMessage={"The 'on click cog' event block is under the Event category. Drag it to the script area to start coding"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-and-marty-tutorial.step-3.hint`}
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
            /* STEP 4 -- add message block after the ontouchcog block */
            {
                type: "info",
                image: `${BUCKET_URL}message_broadcast_block.png`,
                description: <FormattedMessage
                    defaultMessage={"Now drag the 'broadcast message' block from the Events category to the script area. This block will broadcast a message when Cog's button is pressed"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-and-marty-tutorial.step-5`}
                    values={{}}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["event_broadcast"]
                    },
                ],
                hint: {
                    description: <FormattedMessage
                        defaultMessage={"The 'broadcast message' block is under the Events category. Drag it to the script area to start coding"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-and-marty-tutorial.step-5.hint`}
                        values={{}}
                    />,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["event_broadcast"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "event_broadcast",
                        }
                    ],
                },
                expectedCode: ["cog_onButtonPush=>event_broadcast"],
            },
            /* STEP 6 -- go to marty mode */
            {
                type: "info",
                image: `${BUCKET_URL}marty_device_unselected.png`,
                description: <FormattedMessage
                    defaultMessage={"Now let's move to Marty. We need to select Marty to see the Marty blocks. Click on the Marty device button"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-and-marty-tutorial.step-6`}
                    values={{}}
                />,
                nextStepActions: [
                    {
                        type: "HighlightDeviceImageElement",
                        raftType: "Marty",
                        elementId: "sprite-image-outer-{{dynamicId}}",
                        hexColor: "#855cd659",
                        onClickAction: "NextStep"
                    }
                ],
                expectedCode: [],
            },
            /* STEP 7 -- add onmessage block */
            {
                type: "info",
                image: `${BUCKET_URL}message_receive_block.png`,
                description: <FormattedMessage
                    defaultMessage={"Once in Marty Mode, drag the 'When I receive message' block from the Event blocks category to the script area. This block will listen for broadcasted messages"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-and-marty-tutorial.step-7`}
                    values={{}}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["event_whenbroadcastreceived"]
                    }
                ],
                hint: {
                    description: <FormattedMessage
                        defaultMessage={"The 'on message' block is under the Event category. Drag it to the script area to start coding"}
                        description=""
                        id={`gui.howtos.lessons.type-lesson-cog-and-marty-tutorial.step-7.hint`}
                        values={{}}
                    />,
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["event_whenbroadcastreceived"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "event_whenbroadcastreceived",
                        }
                    ],
                },
                expectedCode: ["event_whenbroadcastreceived"],
            },
            /* STEP 8 -- add marty dance block */
            {
                type: "info",
                image: `${BUCKET_URL}marty_dance_block.png`,
                description: <FormattedMessage
                    defaultMessage={"We're almost there! Drag the 'Dance!' block to the script area. This block will make Marty dance when the message is received"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-and-marty-tutorial.step-9`}
                    values={{}}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["mv2_dance"]
                    }
                ],
                hint: {
                    hintActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["mv2_dance"]
                        },
                        {
                            type: "DragBlockToScriptArea",
                            block: "mv2_dance",
                        }
                    ],
                },
                expectedCode: ["event_whenbroadcastreceived=>mv2_dance"],
            },
            /* STEP 10 -- end */
            {
                type: "end",
                description: <FormattedMessage
                    defaultMessage={"Great job! You have successfully coded Cog and Marty to interact with each other. Now click Cog's button to see Marty dance!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-and-marty-tutorial.step-10`}
                    values={{}}
                />,
                expectedCode: [],
            },
        ]
    }
}

export default cogAndMartyTutorial;
