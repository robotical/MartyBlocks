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

const BUCKET_URL = "https://content.robotical.io/static/tutorials/marty/blocks/coding/5/";

const martyBlocksCodingTutorial5 = {
    'marty-blocks-coding-5': {
        id: "marty-blocks-coding-5",
        name: " Parallel Programs",
        type: "lesson",
        urlId: "parallel-programs-2",
        description: <FormattedMessage
            defaultMessage={"Let's use parallel programming with variable control to help Marty show off all his funny faces!"}
            description="Let's use parallel programming with variable control to help Marty show off all his funny faces!"
            id={`gui.howtos.lessons.marty-blocks-coding-5.description`}
            values={{}}
        />,
        img: `${BUCKET_URL}blockscoding5_cover.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['marty', 'functions', 'sequencing', 'parallel code', 'variables'],
        steps: [
              /* STEP 1 -- intro */
               {
                type: "info",
                image: `${BUCKET_URL}blockscoding5_cover.png`,
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
                       Now that we’re experts at variable control of parallel programs, lets put our learning into practice by helping Marty show off all his funny faces!`}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-5.step-1`}
                />,
                expectedCode: [],
                },
                /* STEP 2 -- select green flag blocks*/
                {
                type: "info",
                image: `${BUCKET_URL}greenFlagBlocks.png`,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["event_whenflagclicked","event_whenflagclicked"]
                    }
                ],
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                        Select two green flag blocks. 
                        <br/><br/>When the green flag is clicked, both of these blocks will activate and run all the code underneath them at the same time, in parallel.`}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-5.step-2`}
                />,
                expectedCode: ["event_whenflagclicked","event_whenflagclicked"],
                },
                 /* STEP 3 -- sound code explaination*/
                {
                type: "info",
                image: `${BUCKET_URL}soundCode.png`,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`Now let's add some of Marty’s expressive sounds, one after the other, underneath a green flag block.
                         <br/><br/> We want to write code that says:
                            <br/><i/> When green flag clicked
                            <br/> Play sound: Disbelief until done
                            <br/> Play sound: No! until done
                            <br/> Play sound: Excited until done</i>
                        `}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-5.step-3`}
                />,
                expectedCode: ["event_whenflagclicked","event_whenflagclicked"],
                },
                /* STEP 4 -- add first sound block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}disbeliefSound.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Let's place our first sound block underneath one of the green flag blocks. 
                        <br/><br/>Use the dropdown box to select "Disbelief", to go along with Marty's surprised face!
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-5.step-4`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["mv2_playSoundUntilDone"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_playSoundUntilDone","event_whenflagclicked"],
                },
                /* STEP 5 -- add second sound block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}disbeliefAndNoSounds.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Now let's place the second sound block.
                        <br/><br/>Use the dropdown box to select "No!", to go along with Marty's grumpy face!
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-5.step-5`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["mv2_playSoundUntilDone"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone","event_whenflagclicked"],
                },
                /* STEP 6 -- add third sound block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}soundCode.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Now let's place the final sound block.
                        <br/><br/>Use the dropdown box to select "Excited", to go along with Marty's excited face!
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-5.step-6`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["mv2_playSoundUntilDone"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone","event_whenflagclicked"],
                },
                 /* STEP 7 -- expression code explanation*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}soundCode.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Now let’s write some code to control Marty's expressions under the second green flag block. We want our code to say:
                            <br/><br/><i/>When green flag clicked
                            <br/>Eyes wide
                            <br/>Eyes angry
                            <br/>Eyes excited</i>
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-5.step-7`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightElement",
                            elementId: "lesson-nextStep-btn",
                            hexColor: "#855cd659"
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone","event_whenflagclicked"],
                },
          /* STEP 8 -- add first expression block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}eyesWide.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Let's place our first <b/>eyes</b> block underneath the second green flag block like shown.
                        <br/><br/>Use the dropdown box to select "Wide", to show off Marty's surprised face!
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-5.step-8`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["mv2_eyes"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone","event_whenflagclicked=>mv2_eyes"],
                },
                /* STEP 9 -- add second expression block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}eyesAngry.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Now let's place the second eyes block.
                        <br/><br/>Use the dropdown box to select "angry", to show off Marty's angry face!
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-5.step-9`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["mv2_eyes"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone","event_whenflagclicked=>mv2_eyes=>mv2_eyes"],
                },
                 /* STEP 10 -- add third sound block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}eyesExcited.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Now let's place the final eyes block.
                        <br/><br/>Use the dropdown box to select "Excited", to show off Marty's excited face!
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-5.step-10`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["mv2_eyes"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone","event_whenflagclicked=>mv2_eyes=>mv2_eyes=>mv2_eyes"],
                },
                 /* STEP 11 -- expression code explanation*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}eyesExcited.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Let's test our code.
                        <br/><br/>Press the green flag block and see if Marty's expressions match up with the right sound...
                        <br/><br/>Do they match up? <b/>no!</b>
                        <br/><br/>This is because the sounds and expressions take <b/>different amounts of time.</b>
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-5.step-11`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightElement",
                            elementId: "lesson-nextStep-btn",
                            hexColor: "#855cd659"
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone","event_whenflagclicked=>mv2_eyes=>mv2_eyes=>mv2_eyes"],
                },
                 /* STEP 12 -- expression code explanation*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}variableControl.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        In the last tutorial, we used variables for <b/>mutual exclusion</b>, to make sure two things <b/>didn't</b> happen at the same time.
                        <br/><br/>In this tutorial, we're going to use variables to <b/>sync</b> our parallel code, making sure the right things <b/> do happen at the same time</b>.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-5.step-12`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightElement",
                            elementId: "lesson-nextStep-btn",
                            hexColor: "#855cd659"
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone","event_whenflagclicked=>mv2_eyes=>mv2_eyes=>mv2_eyes"],
                },
                /* STEP 13 -- make Marty feels variable*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}newVariable.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Navigate to the Variables tab, and make a variable called <b/>Marty feels</b>
                        <br/><br/>We'll use this to make sure Marty makes the right expression and sound at the same time.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-5.step-13`}
                    />,
                    nextStepActions: [
                        {
                             type: "HighlightElement",
                            elementId: "lesson-nextStep-btn",
                            hexColor: "#855cd659"
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone","event_whenflagclicked=>mv2_eyes=>mv2_eyes=>mv2_eyes"],
                },
                /* STEP 14 -- add first marty feels variable*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}martyFeelsSurprised.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       In Variables, select a <b/>set Marty feels to 0</b> block and place it before the first sound block like shown.
                       <br/><br/>Fill in 0 with "suprised".
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-5.step-14`}
                    />,
                    nextStepActions: [
                        {
                             type: "HighlightElement",
                            elementId: "lesson-nextStep-btn",
                            hexColor: "#855cd659"
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone","event_whenflagclicked=>mv2_eyes=>mv2_eyes=>mv2_eyes"],
                },
                /* STEP 15 -- add second marty feels variable*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}martyFeelsAngry.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       Select another <b/>set Marty feels to 0</b> block and place it before the second sound block like shown.
                       <br/><br/>Fill in 0 with "angry".
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-5.step-15`}
                    />,
                    nextStepActions: [
                        {
                             type: "HighlightElement",
                            elementId: "lesson-nextStep-btn",
                            hexColor: "#855cd659"
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone","event_whenflagclicked=>mv2_eyes=>mv2_eyes=>mv2_eyes"],
                },
                /* STEP 16 -- add third marty feels variable*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}martyFeelsExcited.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       Select a final <b/>set Marty feels to 0</b> block and place it before the last sound block like shown.
                       <br/><br/>Fill in 0 with "excited".
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-5.step-16`}
                    />,
                    nextStepActions: [
                        {
                             type: "HighlightElement",
                            elementId: "lesson-nextStep-btn",
                            hexColor: "#855cd659"
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone","event_whenflagclicked=>mv2_eyes=>mv2_eyes=>mv2_eyes"],
                },
                 /* STEP 17 -- add wait until blocks*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}waitBlocks.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       To make our variables sync up Marty's expressions and sounds, we'll place a <b/>wait until</b> block before each expression
                       <br/><br/>Place three <b/>wait until</b> blocks like shown below:
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-5.step-17`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["control_wait_until"]
                            
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone","event_whenflagclicked=>control_wait_until=>mv2_eyes=>control_wait_until=>mv2_eyes=>control_wait_until=>mv2_eyes"],
                },
                /* STEP 18 -- create equals blocks*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}equalsBlocks.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       We want Marty to <b/>wait until</b> Marty feels = surprised to make his eyes wide, for example
                       <br/><br/>Select three equals operators, and fill them out like shown below. 
                       <br/>You can get thee <b/>Marty feels</b> blocks from the orange Variables tab.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-5.step-18`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["operator_equals"]
                            
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone","event_whenflagclicked=>control_wait_until=>mv2_eyes=>control_wait_until=>mv2_eyes=>control_wait_until=>mv2_eyes","operator_equals","operator_equals","operator_equals"],
                },
                /* STEP 19 -- fill in wait blocks*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}finalCode.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Finally, we'll in the wait blocks with the relevant equals blocks like shown below:
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-5.step-19`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["operator_equals"]
                            
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone","event_whenflagclicked=>control_wait_until=>mv2_eyes=>control_wait_until=>mv2_eyes=>control_wait_until=>mv2_eyes"],
                },
                /* STEP 20 -- end */
                {
                    type: "end",
                     image: `${BUCKET_URL}blockscoding5_cover.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        You did it - awesome! 
                        <br/>Now click the green flag and watch your code work in parallel! 
                        <br/><br/>Each expression and sound match up as we use <b/>variable control for syncing</b> Marty’s funny faces!.
                            <br/><i/>Marty is surprised! 
                            <br/>Marty is angry! 
                            <br/>Marty is excited! </i>
                        <br/><br/>Extra challenge - how many funny faces can you make Marty pull using variable control?

                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-5.step-20`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: [""]
                            
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone=>mv2_playSoundUntilDone","event_whenflagclicked=>control_wait_until=>mv2_eyes=>control_wait_until=>mv2_eyes=>control_wait_until=>mv2_eyes"],
                },
  
  
        ] 
    }
}

export default martyBlocksCodingTutorial5;
