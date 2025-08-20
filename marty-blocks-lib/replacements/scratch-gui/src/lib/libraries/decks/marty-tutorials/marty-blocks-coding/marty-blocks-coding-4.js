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

const BUCKET_URL = "https://content.robotical.io/static/tutorials/marty/blocks/coding/4/";

const martyBlocksCodingTutorial4 = {
    'marty-blocks-coding-4': {
        id: "marty-blocks-coding-4",
        name: " Parallel Programs",
        type: "lesson",
        urlId: "parallel-programs-1",
        description: <FormattedMessage
            defaultMessage={"Learn how computers control code that happens at the same time!"}
            description="An introduction to parallel programs, and how programs handle doing lots of things at once! "
            id={`gui.howtos.lessons.marty-blocks-coding-4.description`}
            values={{}}
        />,
        img: `${BUCKET_URL}blockscoding4_cover.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['marty', 'functions', 'sequencing', 'parallel code'],
        steps: [
              /* STEP 1 -- intro */
               {
                type: "info",
                image: `${BUCKET_URL}blockscoding4_cover.png`,
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
                        In this tutorial, we're going to learn how programmers use <b/>parallel programs, race conditions and mutual exclusion</b> to control the order that pieces of code runs in!`}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-4.step-1`}
                />,
                expectedCode: [],
                },
                /* STEP 2 -- introduce race conditions */
                {
                type: "info",
                image: `${BUCKET_URL}raceConditionExample.png`,
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
                        Parallel programs are seperate pieces of code that we ask a computer to run at the same time. 
                        <br/><br/>Just like humans, there are some things that computers, and Martys, can't do at the same time. 
                        <br/><br/>For example, <b/>humans can't walk forwards and backwards at the same time - and neither can Marty!</b>
                        <br/><br/>Trying to do this creates what we call a <b/>race condition</b>, where our program can't actually run all our parallel code at once.
                        <br/><br/>This can cause unpredictable behaviour - bad news for programmers!
                        <br/><br/><br/><i/>Click the image to expand the diagram.</i>`}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-4.step-2`}
                />,
                expectedCode: [],
                },
                 /* STEP 3 -- introduce mutual exclusion*/
                {
                type: "info",
                image: `${BUCKET_URL}mutualExclusionExample.png`,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`So, how do programmers take back control when race conditions pop up?
                         <br/><br/> They use <b/>mutual exclusion</b> to say things like, <i/>don't walk backwards until I walk forwards first.</i>
                         <br/><br/> Mutual exclusion can be implemented using lots of different methods, such as if-statements, wait blocks, variable control and lots more!
                        <br/><br/><br/><i/>Click the image to expand the diagram.</i>`}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-4.step-3`}
                />,
                expectedCode: [],
                },
                /* STEP 4 -- add first flag block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}whenFlagClicked.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        To demonstrate a race condition, we're going to ask Marty to walk forwards and backwards at the same time. 
                        <br/><br/>First, we'll write our "walk forwards" code.
                        <br/><br/> Select a <b/>when green flag clicked</b> block and drag it into the scripting area.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-4.step-4`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["event_whenflagclicked"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked"],
                },
                /* STEP 5 -- add first walk forward block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}walkForwards.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       Place a <b/>walk 2 steps forward</b> block after the green flag block.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-4.step-5`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["mv2_walk_fw"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_walk_fw"],
                },
                   /* STEP 6 -- second green flag block*/
                {            
                    type: "info", 
                    image: `${BUCKET_URL}whenFlagClicked.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                      Select a second <b/>when green flag clicked</b> block and drag it into the scripting area to create our parallel "walk backwards" code.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-4.step-6`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["event_whenflagclicked"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_walk_fw","event_whenflagclicked"],
                },
                  /* STEP 7 -- walk backwards block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}parallelCode.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Finally, add a <b/>walk backwards</b> block to complete our parallel code. 
                        <br/><br/>Now, can Marty walk forwards and backwards at the same time? <b/>No!</b> We've created a race condition. 
                        <br/><br/><i/>Click the green flag and see what Marty will do first...</i>
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-4.step-7`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["mv2_walk_bw"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_walk_fw","event_whenflagclicked=>mv2_walk_bw"],
                },
                /* STEP 8 -- what happened? */
               {
                type: "info",
                image: `${BUCKET_URL}whatToDo.png`,
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
                        Did you notice that Marty walked <b/>forward first, and then backwards?</b> Let's investigate why. 
                        <br/><br/>First, delete all of your code so we have a blank slate.`}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-4.step-8`}
                />,
                expectedCode: ["event_whenflagclicked=>mv2_walk_fw","event_whenflagclicked=>mv2_walk_bw"],
                },
                /* STEP 9 -- recreate walk backwards block */
               {
                type: "info",
                image: `${BUCKET_URL}walkBackwards.png`,
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
                     Now we're going to recreate our parallel code, but make our <b/>walk backwards</b> code first. 
                    <br/><br/> Recreate the code shown in the image below.
                    <br/><br/><i/>If you need some help just skip back to steps 6 and 7!</i>`}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-4.step-9`}
                />,
                expectedCode: ["event_whenflagclicked=>mv2_walk_bw"],
                },
                /* STEP 10 -- recreate walk forwards block */
               {
                type: "info",
                image: `${BUCKET_URL}parallelCode.png`,
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
                     Now let's recreate our <b/>walk forwards</b> code as well. Your parallel code should look like this:
                     <br/><br/><i/>If you need some help, just skip back to steps 4 and 5!</i>`}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-4.step-10`}
                />,
                expectedCode: ["event_whenflagclicked=>mv2_walk_bw","event_whenflagclicked=>mv2_walk_fw"],
                },
                /* STEP 11 -- what's different? */
                {
                    type: "info",
                    image: `${BUCKET_URL}whatToDoOldest.png`,
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
                        Click the green flag and watch what Marty does now... <b/>he walks backwards first!</b>
                        <br/><br/> This is because Marty's software handles race conditions by accessing and running the <b/>oldest</b> code first.
                        <br/><br/>The problem is, we can't just tell by looking what code was created first, and as we write more complicated code, things can get confusing!
                        <br/><br/>Let's explore how we can use <b/>wait functions and variables</b> to control our parallel code!
                        <br/><br/><br/><i/>Click the image to expand the diagram.</i>
                        `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-4.step-11`}
                    />,
                    expectedCode: ["event_whenflagclicked=>mv2_walk_bw","event_whenflagclicked=>mv2_walk_fw"],
                },
                /* STEP 12 -- mutual exclusion reminder*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}mutualExclusionExample.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       Like we learned before, programmers get around race conditions by using mutual exclusion. 
                       <br/><br/>This means that we can press "go" on both pieces of code at the same time, but we can control what action <b/>actually</b> happens first.
                       <br/><br/>First, we'll use a wait block to mutually exclude our code.
                       <br/><br/><br/><i/>Click the image to expand the diagram.</i>
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-4.step-12`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightElement",
                            elementId: "lesson-nextStep-btn",
                            hexColor: "#855cd659"
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_walk_bw","event_whenflagclicked=>mv2_walk_fw"],
                },
                  /* STEP 13 -- add wait block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}waitThenBackwards.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       Let's tell Marty to walk forwards, then backwards.
                       <br/><br/>It takes Marty around 3 seconds to walk forwards, so we'll place a wait block before "walk backwards" and change the parameter to 3 seconds, matching the sample code below.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-4.step-13`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["control_wait"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_walk_bw","event_whenflagclicked=>control_wait=>mv2_walk_fw"],
                },
                 /* STEP 14 -- watch results*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}waitThenBackwards.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       Click the green flag and watch how Marty walks forward first, exactly like we wanted him to!
                       <br/><br/>So, we know that using wait blocks can help us with mutual exclusion, but for longer, more complicated code they aren't so great.
                       <br/><br/>The length of time code takes to run can be varied and complex, making it difficult to accurately predict a wait time.
                       <br/><br/>Let's look at using <b/>variable control</b> for a more accurate method of mutual exclusion.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-4.step-14`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightElement",
                            elementId: "lesson-nextStep-btn",
                            hexColor: "#855cd659"
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_walk_bw","event_whenflagclicked=>control_wait=>mv2_walk_fw"],
                },

                   /* STEP 15 -- mutual exclusion reminder*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}nextMoveExplanation.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                      We're going to use a variable called "next move" to mutually exclude our "walk backwards" and "walk forwards" code. 
                      <br/><br/>Even though both blocks of code will run when we click the green flag, we can say:
                      <br/><br/>Don't <i/>actually</i> take a step forward<b/> until next move = forward.</b>
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-4.step-15`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightElement",
                            elementId: "lesson-nextStep-btn",
                            hexColor: "#855cd659"
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_walk_bw","event_whenflagclicked=>control_wait=>mv2_walk_fw"],
                },

                  /* STEP 16 -- make next move variable*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}makeVariableNextMove.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       Create a variable called next move. We'll use this to control which move Marty makes next.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-4.step-16`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightElement",
                            elementId: "lesson-nextStep-btn",
                            hexColor: "#855cd659"
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_walk_bw","event_whenflagclicked=>control_wait=>mv2_walk_fw"],
                },
                 /* STEP 17 -- remove wait block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}readyToImplementNextMove.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       Remove the wait block we previously added so your code matches the example below. <br/><br/>Now you're ready to implement variable control!
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-4.step-17`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightElement",
                            elementId: "lesson-nextStep-btn",
                            hexColor: "#855cd659"
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>mv2_walk_bw","event_whenflagclicked=>mv2_walk_fw"],
                },

                /* STEP 18 -- add wait until blocks */
                {            
                    type: "info",
                    image: `${BUCKET_URL}waitUntil.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       Instead of waiting an amount of seconds before walking, we want Marty to <b/>wait until</b> next move is set to the right value: forwards or backwards.
                       <br/><br/>Add a wait until block before each walk block, like shown here:
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-4.step-18`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["control_wait_until"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>control_wait_until=>mv2_walk_bw","event_whenflagclicked=>control_wait_until=>mv2_walk_fw"],
                },
                /* STEP 19 -- create equals blocks*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}equalsBlocks.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       We want Marty to <b/>wait until</b> next move=forwards or next move=backwards to do the relevant move.
                       <br/><br/>Select two <b/>equals operators</b>, and fill them out like shown below. 
                       <br/><br/>You can get two next move blocks from the orange Variables tab.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-4.step-19`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["operator_equals"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>control_wait_until=>mv2_walk_bw","event_whenflagclicked=>control_wait_until=>mv2_walk_fw","operator_equals","operator_equals"],
                }, 
                /* STEP 20 -- fill in wait until blocks*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}waitUntilEquals.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                    Now use the green equals blocks to fill in the empty <b/>wait until</b> blocks, so they match the sample code below:
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-4.step-20`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightElement",
                            elementId: "lesson-nextStep-btn",
                            hexColor: "#855cd659"
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>operator_equals=>control_wait_until=>mv2_walk_bw","event_whenflagclicked=>operator_equals=>control_wait_until=>mv2_walk_fw"],
                },
                /* STEP 21 -- add two set next move blocks*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}twoCompletedBlocks.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                    If we want Marty to walk forwards first, he should walk backwards next, and vice versa.
                    <br/><br/>So, we want use the set <b/>next move</b> block to change next move after we walk.
                    <br/><br/>Place two of these blocks at the end of each piece of code, and type "forwards" or "backwards" in each one, to match the sample code below:
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-4.step-21`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: [""]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>operator_equals=>control_wait_until=>mv2_walk_bw","event_whenflagclicked=>operator_equals=>control_wait_until=>mv2_walk_fw"],
                },
                /* STEP 22 -- add final set move block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}controller.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                    Finally, select a <b/>set next move to</b> block to set whether we want Marty to go forwards or backwards first.
                   <br/><br/> Let's say we want Marty to walk backwards first - type "backwards" into the parameter space, and click the block so that next move is set to backwards.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-4.step-22`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: [""]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>operator_equals=>control_wait_until=>mv2_walk_bw","event_whenflagclicked=>operator_equals=>control_wait_until=>mv2_walk_fw"],
                },
                /* STEP 23 -- end */
                {
                    type: "end",
                    image: `${BUCKET_URL}twoCompletedBlocks.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                    You did it! You can now use <b/>variable control</b> and wait functions to mutually exclude parallel code!
                    <br/> Click the green flag and watch your parallel code work together.
                    <br/><br/>Both code blocks run at the same time, but your "next move" variable makes sure we always know what's coming next!
                    <br/><br/><i/>For an extra challenge, why not try changing next move to "forwards" (or even something random like "banana") and see how Marty walks now...
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-4.step-23`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: [""]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>operator_equals=>control_wait_until=>mv2_walk_bw","event_whenflagclicked=>operator_equals=>control_wait_until=>mv2_walk_fw"],
                },




          
  
  
        ] 
    }
}

export default martyBlocksCodingTutorial4;
