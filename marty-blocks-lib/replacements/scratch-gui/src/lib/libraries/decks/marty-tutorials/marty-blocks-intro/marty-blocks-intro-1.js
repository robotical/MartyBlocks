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

const BUCKET_URL = "https://content.robotical.io/static/tutorials/marty/blocks/intro/1/";

const martyBlocksIntroTutorial1 = {
    'type-lesson-marty-blocks-intro-1': {
        id: "type-lesson-marty-blocks-intro-1",
        name: "Moving with MartyBlocks",
        type: "lesson",
        urlId: "moving-with-MartyBlocks",
        description: <FormattedMessage
            isRaw={true}
            defaultMessage={"Progress from BlocksJr to MartyBlocks!"}
            description="Welcome to MartyBlocks! Time to recap what we know from MartyBlocks Jr and get used to this new setup. "
            id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-1.description`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        img: `${BUCKET_URL}blocksintro1_cover.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['marty', 'functions', 'sequencing'],
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
                    defaultMessage={`
                      Welcome to MartyBlocks! <br /><br /> Let’s recap what we know from MartyBlocks Jr to get used to this new setup. 
                        `}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-1.step-1`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },
            /* STEP 2 -- using the green flag block*/
            {
                type: "info",
                image: `${BUCKET_URL}whenflagclicked.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    We can find the “start button” in Events. <br /><br /> Drag it to the script area to start coding
                        `}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-1.step-2`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["event_whenflagclicked"]
                    },
                ],
                expectedCode: ["event_whenflagclicked"],
            },
            /* STEP 3 -- add get ready block*/
            {
                type: "info",
                image: `${BUCKET_URL}mv2_getReady.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    In Motion, we can find the “get ready!” block. <br /><br />  Remember it’s always good to add this block in before Marty starts moving.
                    <br /><br /> Place this below the green flag block.
                        `}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-1.step-3`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["mv2_getReady"]
                    },
                ],
                expectedCode: ["event_whenflagclicked=>mv2_getReady"],
            },
            /* STEP 4 -- introduce recreating challenge*/
            {
                type: "info",
                image: `${BUCKET_URL}blocksJrExample.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    Can you recreate this MartyBlocks Jr sequence in MartyBlocks? <br /><br /> 
                    We already have the green flag and get ready block, let's do the rest!
                `}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-1.step-4`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                expectedCode: ["event_whenflagclicked=>mv2_getReady"],
            },
            /* STEP 5 -- add walk forward block*/
            {
                type: "info",
                image: `${BUCKET_URL}step5.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    You can find the walk forwards block in Motion. <br /><br /> 
                    Add the block after "Get ready!" and change the number of steps Marty does in the white space. Type "4" to match the BlocksJr code.
                `}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-1.step-5`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["mv2_walk_fw"]
                    }
                ],
                expectedCode: ["event_whenflagclicked=>mv2_getReady=>mv2_walk_fw"],
            },
            /* STEP 6 -- add slide right block*/
            {
                type: "info",
                image: `${BUCKET_URL}step6.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    You can find the slide block in Motion too. <br /><br /> 
                    Add the block after "Walk 4 steps forwards", set the dropdown box to "right" and type "3" to match the BlocksJr code.
                `}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-1.step-6`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["mv2_slide"]
                    }
                ],
                expectedCode: ["event_whenflagclicked=>mv2_getReady=>mv2_walk_fw"],
            },
            /* STEP 7 -- add slide left block*/
            {
                type: "info",
                image: `${BUCKET_URL}step7.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    Use the same block to make Marty slide left. <br /><br /> 
                    Add the block after "Slide 3 times right", set the dropdown box to "left" and type "2" to match the BlocksJr code.
                `}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-1.step-7`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["mv2_slide"]
                    }
                ],
                expectedCode: ["event_whenflagclicked=>mv2_getReady=>mv2_walk_fw=>mv2_slide=>mv2_slide"],
            },
            /* STEP 8 -- add walk backwards block*/
            {
                type: "info",
                image: `${BUCKET_URL}step8.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    Finally, we'll add the walk backwards block. <br /><br /> 
                    Add the block after "Slide 2 times left", and type "1" to match the BlocksJr code.
                `}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-1.step-8`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["mv2_walk_bw"]
                    }
                ],
                expectedCode: ["event_whenflagclicked=>mv2_getReady=>mv2_walk_fw=>mv2_slide=>mv2_slide=>mv2_walk_bw"],
            },
            /* STEP 9 -- end */
            {
                type: "end",
                image: `${BUCKET_URL}jrToBlocksSolution.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"<b/>You did it! You've successfully transitioned from BlocksJr to MartyBlocks.</b> <br /><br /> Now you're ready to explore MartyBlocks and do so many cool things with Marty!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-1.step-9`}
                    values={{}}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },
        ]
    }
}

export default martyBlocksIntroTutorial1;
