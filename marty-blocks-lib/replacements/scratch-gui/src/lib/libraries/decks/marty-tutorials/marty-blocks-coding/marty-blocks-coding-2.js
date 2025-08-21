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

const BUCKET_URL = "https://content.robotical.io/static/tutorials/marty/blocks/coding/2/";

const martyBlocksCodingTutorial1 = {
    'marty-blocks-coding-2': {
        id: "marty-blocks-coding-2",
        name: " Watch Out Marty! Pt 2: What Else?",
        type: "lesson",
        urlId: "watch-out-Marty-part-2",
        description: <FormattedMessage
            isRaw={true}
            defaultMessage={"Learn to use if else statements to keep Marty safe!"}
            description="Use an if else statement along with Marty's ground sensors to keep him from walking off a ledge!"
            id={`gui.howtos.lessons.marty-blocks-coding-2.description`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        img: `${BUCKET_URL}blockscoding2_cover.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['marty', 'functions', 'sequencing', 'loops', 'sensors', 'conditionals', 'variables', 'operations'],
        steps: [
            /* STEP 1 -- intro*/
            {
                type: "info",
                image: `${BUCKET_URL}blockscoding2_cover.png`,
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
                      In this tutorial, we're going to learn how <b/> if-else statements</b> work! 
                      <br /><br /> We'll use Marty's ground sensors in an if-else statement to stop Marty walking off of an edge.
                        `}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-2.step-1`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },
            /* STEP 2 -- if statement explaination*/
            {
                type: "info",
                image: `${BUCKET_URL}ifAndIfElse.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    We already know how to use an if statement. <br /><br /> Code inside the if statement will only run <b/>if</b> the code in the diamond is true - but what if we want to control what happens when the code is NOT true? <br /><br /> 
                    If-else statements help us say <b /> if </b> this is true, run some code, <b/>else</b> run some other code.
                        `}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-2.step-2`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    },
                ],
                expectedCode: [""],
            },
            /* STEP 3 -- add if-else statement block*/
            {
                type: "info",
                image: `${BUCKET_URL}ifElse.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    Select an if-else statement. <br /><br /> Drag it into the scripting area to start our code.`}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-2.step-3`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["control_if_else"]
                    },
                ],
                expectedCode: ["control_if_else"],
            },
            /* STEP 4 -- add ground sensor blocks*/
            {
                type: "info",
                image: `${BUCKET_URL}groundSensors.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    We’re going to use Marty’s ground sensors for this activity. They can tell if Marty's foot is on a surface or not.
                    <br /><br /> We want to make sure he only walks forward <b/> if BOTH feet are on the ground.<b/> 
                    <br /><br /> Select <b/>two</b> “select foot sensor on the ground” blocks. Use the dropdown menu to set one to the right foot, and one to the left. 
                    <br /><br /> We want to tell Marty to walk forward <b/>IF</b> both feet on the ground is true.
                `}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-2.step-4`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["mv2_groundsense"]
                    }
                ],
                expectedCode: ["control_if_else", "mv2_groundsense", "mv2_groundsense"],
            },
            /* STEP 5 -- add and block, fill with ground sensor blocks*/
            {
                type: "info",
                image: `${BUCKET_URL}andBlockWithGroundSensors.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                   To make sure our code checks both sensors at once, we’ll use the and block in Operators.   <br /><br />
                   Place both sensor blocks inside the and block like shown in the sample code:
                `}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-2.step-5`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-operators",
                        hexColor: "#855cd659",

                        type: "HighlightBlocks",
                        blocks: ["operator_and"]
                    }
                ],
                expectedCode: ["control_if_else", "operator_and=>mv2_groundsense=>mv2_groundsense"],
            },
            /* STEP 6 -- add and to if-else block.*/
            {
                type: "info",
                image: `${BUCKET_URL}ifElseWithAnd.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                   Now let’s put the and block into our if-else block, so it matches the sample code below.<br /><br />
                   This code now says: <i/>If “left foot and right foot on the ground” is true, do something. If that’s not true, do something else.<i/>`}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-2.step-6`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                expectedCode: ["control_if_else=>operator_and=>mv2_groundsense=>mv2_groundsense"]
            },
            /* STEP 7 -- add walk forward block*/
            {
                type: "info",
                image: `${BUCKET_URL}ifElseWithWalk.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    Let’s fill in our if-else statement. If both feet are on the ground, we want Marty to walk forward. Place a walk forward block in the top space like shown.
                    <br /><br /> Since we want Marty to check both feet are safely on the ground after <b/>every step</b>, change the "2" to "1" in the walk block.
                    `}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-2.step-7`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["mv2_walk_fw"]
                    }
                ],
                expectedCode: ["control_if_else=>operator_and=>mv2_groundsense=>mv2_groundsense=>mv2_walk_fw"],
            },
            /* STEP 8 --  add get ready*/
            {
                type: "info",
                image: `${BUCKET_URL}completedIfElse.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    If one or both feet are off the ground, we want to stop Marty safely - to do this, we’ll use the get ready block to straighten up his legs. <br /><br />
                    Place a get ready block after "else", like shown below:
                `}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-2.step-8`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["mv2_getReady"]
                    }
                ],
                expectedCode: ["control_if_else=>operator_and=>mv2_groundsense=>mv2_groundsense=>mv2_walk_fw=>mv2_getReady"],
            },
            /* STEP 9 -- add forever loop*/
            {
                type: "info",
                image: `${BUCKET_URL}watchOutPt2FinalCode.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    Almost done! Except we don’t want our code to just run once, we want it to run over and over, so lets put it all inside a <b/>forever loop.</b>
                `}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-2.step-9`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["control_forever"]
                    }
                ],
                expectedCode: ["control_forever=>control_if_else=>operator_and=>mv2_groundsense=>mv2_groundsense=>mv2_walk_fw=>mv2_getReady"],
            },

            /* STEP 10 -- end */
            {
                type: "end",
                image: `${BUCKET_URL}testSetup.jpg`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`You did it! Now let’s put your code to the test!
                        <br /><br /> <b/>  Important:</b> we recommend placing your Marty on an edge <b/>no higher than 5 inches</b>, to prevent damage if any falls occur. 
                        <br/>We recommend using a <b/>white surface</b> (like a piece of paper) for Marty to walk on, as this can help with the accuracy of his ground detection.
                        <br /><br /> Place your Marty on a small ledge and click the forever loop to test Marty’s fall prevention! `}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-2.step-10`}
                    values={{}}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: ["control_forever=>control_if_else=>operator_and=>mv2_groundsense=>mv2_groundsense=>mv2_walk_fw=>mv2_getReady"],
            },
        ]
    }
}

export default martyBlocksCodingTutorial1;
