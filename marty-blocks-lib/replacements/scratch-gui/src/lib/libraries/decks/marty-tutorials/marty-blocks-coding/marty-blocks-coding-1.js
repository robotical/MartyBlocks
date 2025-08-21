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

const BUCKET_URL = "https://content.robotical.io/static/tutorials/marty/blocks/coding/1/";

const martyBlocksCodingTutorial1 = {
    'marty-blocks-coding-1': {
        id: "marty-blocks-coding-1",
        name: `Watch Out Marty! Pt 1: What If?`,
        type: "lesson",
        urlId: "watch-out-Marty-part-1",
        description: <FormattedMessage
            isRaw={true}
            defaultMessage={"Learn to use if statements to keep Marty safe!"}
            description="Use an if statement along with Marty's obstacle sensor to keep him from walking into things!"
            id={`gui.howtos.lessons.marty-blocks-coding-1.description`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        img: `${BUCKET_URL}blockscoding1_cover.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['marty', 'functions', 'sequencing', 'loops', 'parallel', 'sensors', 'conditionals'],
        steps: [
           /* STEP 1 -- intro*/
           {
                type: "info",
                image: `${BUCKET_URL}blockscoding1_cover.png`,
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
                      In this tutorial, we're going to learn how <b/> if statements</b> and Marty's <b/>obstacle sensors</b> work! 
                      <br /><br /> We'll use them together in a forever loop to help Marty stop walking if something's blocking his path. 
                        `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-1.step-1`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },
            /* STEP 2 -- if statement explaination*/
           {
                type: "info",
                image: `${BUCKET_URL}ifBlock.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    This is an if statement block.  <br /><br /> 
                    If-statements are really important in programming. They help us control when a code runs. 
                    <br/><br/>Sometimes we only want a part of code to run <b /> if <b /> something else is true. 
                        `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-1.step-2`}
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
            /* STEP 3 -- add if statement block*/
           {
                type: "info",
                image: `${BUCKET_URL}ifBlock.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    Code inside the if statement will only run if the code in the diamond is true - we can do so much with if-statements!
                    <br /><br /> Drag an if statement block into the scripting area to start our code.`}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-1.step-3`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["control_if"]
                    },
                ],
                expectedCode: ["control_if"],
            },
            /* STEP 4 -- IR sensor introduction*/
           {
                type: "info",
                image: `${BUCKET_URL}IRSensorsPic.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    We’re going to use Marty’s obstacle sensors for this activity - you can see them here in the red cicles. 
                    <br /><br />They can tell if something is blocking Marty’s path by using a special kind of invisible light called infrared (IR). 
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-1.step-4`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                expectedCode: ["control_if"],
            },
            /* STEP 5 -- IR diagram*/
           {
                type: "info",
                image: `${BUCKET_URL}IRDiagram.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                   IR sensors are made up of two parts: <b />transmitters and receivers.</b>  <br /><br />
                   The <b />transmitter</b> sends out invisible light, which gets reflected back if there’s an obstacle in the way. <br /> 
                   The <b />receiver</b> looks for IR light bouncing back off an obstacle.   <br /><br />
                   If the receiver detects reflected light, then the sensor knows that there’s something in the way.  <br /><br />
                   IR sensors are used to open automatic doors, park cars and help Marty robots avoid obstacles! 
                   <br/><br/><br/><i/>Click the image to expand the diagram.</i>
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-1.step-5`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                expectedCode: ["control_if"],
            },
             /* STEP 6 -- add obstacle sensing block.*/
           {
                type: "info",
                image: `${BUCKET_URL}ifObstacleSensed.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    Navigate to Sensing and select the “select foot obstacle sensed” block.<br /><br />
                    In this example, you can choose either the left or right ground sensor from the dropdown menu - but you have to pick one or the block won’t work!!<br /><br />
                    place the sensing block inside the diamond of the if-statement block like shown below. This code now says, if <i />“foot obstacle sensed” is true, then do something. </i>
                    `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-1.step-6`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["mv2_obstaclesense"]
                    }
                ],
                expectedCode: ["control_if=>mv2_obstaclesense"]
            },
                /* STEP 7 -- add stop immediately*/
           {
                type: "info",
                image: `${BUCKET_URL}stopImmediately.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    If Marty senses an obstacle, we want him to stop so we can keep him safe. Inside our if-statement, let’s put a “stop Marty immediately” block.
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-1.step-7`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["mv2_stop"]
                    }
                ],
                expectedCode: ["control_if=>mv2_obstaclesense=>mv2_stop"],
            },
             /* STEP 8 -- add forever loop*/
           {
                type: "info",
                image: `${BUCKET_URL}watchOutForeverLoop.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    We don’t want Marty to check for obstacles just once, we want him to keep checking over and over, so let’s put our if-statement inside a forever loop.
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-1.step-8`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["control_forever"]
                    }
                ],
                expectedCode: ["control_forever=>control_if=>mv2_obstaclesense=>mv2_stop"],
            },
            /* STEP 9 -- add walking block*/
            {
                type: "info",
                image: `${BUCKET_URL}walkForwards.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    Great! Now let’s test our if-statement code by making Marty walk forwards forever unless he sees an obstacle.<br /><br />
                    Select the “walk 2 steps forward” block and place it by itself, ready to run in parallel with our if statement code.
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-1.step-9`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["mv2_walk_fw"]
                    }
                ],
                expectedCode: ["control_forever=>control_if=>mv2_obstaclesense=>mv2_stop", "mv2_walk_fw"],
            },
              /* STEP 10 -- add forever loop */
              {
                type: "info",
                image: `${BUCKET_URL}walkForever.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                  Let's place our walk block inside a forever loop so Marty keeps walking unless he sees an obstacle.
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-1.step-10`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["control_forever"]
                    }
                ],
                expectedCode: ["control_forever=>control_if=>mv2_obstaclesense=>mv2_stop","control_forever=>mv2_walk_fw"],
            },
            /* STEP 11 -- add forever loop */
            {
                type: "end",
                image: `${BUCKET_URL}watchOutPt1FinalCode.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`You did it! 
                        <br /><br /> Now place Marty on the ground in front of an obstacle, click both forever loops to start your code, and see if Marty keeps himself safe! 
                        <br /><br /> Try removing the obstacle and check if Marty knows that it's safe to keep walking.`} 
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-1.step-11`}
                    values={{}}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },
        ] 
    }
}

export default martyBlocksCodingTutorial1;
