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

const BUCKET_URL = "https://content.robotical.io/static/tutorials/marty/blocks/coding/6/";

const martyBlocksCodingTutorial5 = {
    'marty-blocks-coding-5': {
        id: "marty-blocks-coding-6",
        name: "Coding Unplugged",
        type: "lesson",
        urlId: "coding-unplugged",
        description: <FormattedMessage
            defaultMessage={"Let's recreate unplugged mode using everything we've learned so far! If-statements, loops, parallel code, operator blocks and more..."}
            description=""
            id={`gui.howtos.lessons.marty-blocks-coding-4.description`}
            values={{}}
        />,
        img: `${BUCKET_URL}blockscoding6_cover.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['marty', 'functions', 'sequencing', 'parallel code', 'variables', 'operators', 'events', 'sensors'],
        steps: [
              /* STEP 1 -- intro */
               {
                type: "info",
                image: `${BUCKET_URL}blockscoding6_cover.png`,
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
                       In this tutorial, we’re going to recreate unplugged mode using everything we’ve learned so far! `}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-6.step-1`}
                />,
                expectedCode: [],
                },
                /* STEP 2 -- understanding unplugged*/
                {
                type: "info",
                image: `${BUCKET_URL}unpluggedMode.png`,
                nextStepActions: [
                    {
                       type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`Before you start this tutorial, have a play with unplugged mode to remember how it works.
                        <br/><br/>Disconnect your Marty from the app and click “mode” on the back of your Marty to switch to unplugged mode. 
                        <br/><br/>Collect one of each colour tile to test out your Marty’s colour sensor, see how unplugged works, then reconnect your Marty and come back to this tutorial!
                       `}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-6.step-2`}
                />,
                expectedCode: [],
                },
                 /* STEP 3 -- unplugged code explaination*/
                {
                type: "info",
                image: `${BUCKET_URL}unpluggedTiles.png`,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`Let’s get started! 
                        <br/><br/>We’re going to make 5 parallel programs to control each colour in unplugged mode: 
                        <br/><b/>green</b> means walk <b/>forwards</b>,
                        <br/><b/>yellow</b> means walk <b/>backwards</b>,
                        <br/><b/>purple</b> means slide <b/>right</b>,
                        <br/><b/>blue</b> means slide <b/>left</b>,
                        <br/><b/>red</b> means <b/>stop & celebrate!</b>,
                        `}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-6.step-3`}
                />,
                expectedCode: [""],
                },
                /* STEP 4 -- 5 green flag blocks*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}whenFlagClicked.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       First, place 5 green flag blocks in the scripting area, one for each colour tile in unplugged.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-4`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["event_whenflagclicked"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked","event_whenflagclicked","event_whenflagclicked","event_whenflagclicked","event_whenflagclicked"],
                },
                /* STEP 5 -- forever loop*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}foreverLoops.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        We don’t want Marty to check his colour sensor just once, we want him to keep checking over and over to do the right action.
                        <br/><br/>So, let’s place a forever loop below each green flag block.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-5`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["control_forever"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>control_forever","event_whenflagclicked=>control_forever","event_whenflagclicked=>control_forever","event_whenflagclicked=>control_forever","event_whenflagclicked=>control_forever"],
                },
                /* STEP 6 -- add if statements*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}foreverLoopsWithIfs.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       For each block of code, we want to say:
                       <br/><br/><i/><b/>If</b> Marty senses the colour green/blue/red/purple/yellow, <b/>then</b> do the relevant action.</i>
                       <br/><br/>So let's place an if-statement in every forever loop.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-6`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["control_if"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>control_forever=>control_if","event_whenflagclicked=>control_forever=>control_if","event_whenflagclicked=>control_forever=>control_if","event_whenflagclicked=>control_forever=>control_if","event_whenflagclicked=>control_forever=>control_if"],
                },
                 /* STEP 7 -- equals operators*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}emptyEqualsOperators.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        In each block of code, we want to check if, for example <b/>colour sensor = green</b> before we tell Marty to walk forward.
                        <br/><br/> To do this, we'll place an equals operator in every if-statement, and fill them out with one unplugged colour each.
                        <br/><br/>Your code should look like this:
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-7`}
                    />,
                    nextStepActions: [
                        {
                           type: "HighlightBlocks",
                            blocks: ["operator_equals"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>control_forever=>control_if=>operator_equals","event_whenflagclicked=>control_forever=>control_if=>operator_equals","event_whenflagclicked=>control_forever=>control_if=>operator_equals","event_whenflagclicked=>control_forever=>control_if=>operator_equals","event_whenflagclicked=>control_forever=>control_if=>operator_equals"],
                },
          /* STEP 8 -- add colour sensor blocks*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}ifColourSensor.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        To complete each if-statement, place a colour sense block in each equals operator like shown.
                        <br/><br/>Make sure you use the dropdown menu to select <i/>LeftColorSensor</i>.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-8`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["mv2_coloursense"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense","event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense","event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense","event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense","event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense"],
                },
                /* STEP 9 -- add repeat until blocks*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}emptyRepeatUntil.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       Great! Now, we want Marty to <b/>repeat</b> the right action <b/>until</b> he’s on a different card. 
                       <br/><br/>To do this, we’ll use a <b/>repeat until</b> block.
                       <br/><br/>Place one inside each if-statement like shown here:
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-9`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["control_repeat_until"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense=>control_repeat_until","event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense=>control_repeat_until","event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense=>control_repeat_until","event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense=>control_repeat_until","event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense=>control_repeat_until"],
                },
                 /* STEP 10 -- add not operators*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}emptyNotOperators.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        To fill in the repeat block, we want to say:
                        <br/><br/><i/>repeat until <b/>Not</b> colour sensor = green</i>, for example.
                        <br/><br/>Add a not operator in each code block like shown below:
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-10`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["operator_not"]
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense=>control_repeat_until=>operator_not","event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense=>control_repeat_until=>operator_not","event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense=>control_repeat_until=>operator_not","event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense=>control_repeat_until=>operator_not","event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense=>control_repeat_until=>operator_not"],
                },
                 /* STEP 11 -- fill in not operators*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}notColourSensorEquals.gif`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        To fill in each not operator, we want to essentially copy what's in the if-statement, like shown below.
                        <br/><br/>We end up with code that says <i/>repeat until <b/>Not</b> colour sensor = green</i> and so on.
                        <br/><br/>You can do this quickly by left clicking on the green equals block in the if-statement, clicking duplicate, and dragging it down into the <b/>not</b> operator.
                        <br/><br/><br/><i/>Alternatively, go back to steps 7 and 8 to give you a hint on how to fill them in correctly!
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-11`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightElement",
                            elementId: "lesson-nextStep-btn",
                            hexColor: "#855cd659"
                        }
                    ],
                    expectedCode: ["event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense=>control_repeat_until=>operator_not","event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense=>control_repeat_until=>operator_not","event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense=>control_repeat_until=>operator_not","event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense=>control_repeat_until=>operator_not","event_whenflagclicked=>control_forever=>control_if=>operator_equals=>mv2_coloursense=>control_repeat_until=>operator_not"],
                },
                 /* STEP 12 -- add walk block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}walkIfGreen.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Great job! Now let's place the right action in each block of code.
                        <br/><br/>Inside the code block that detects green, place <b/>walk forwards two steps</b> inside the repeat until block, like shown here:
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-12`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["mv2_walk_fw"]
                        }
                    ],
                    expectedCode: [""],
                },
                /* STEP 13 -- add slide right*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}slideIfPurple.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Inside the code block that detects purple, place <b/>slide 1 time to the right</b> inside the repeat until block, like shown here.
                        <br/><br/><br/><i/>Remember to use the dropdown box to change left to right!
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-13`}
                    />,
                    nextStepActions: [
                        {
                             type: "HighlightBlocks",
                            blocks: ["mv2_slide"]
                        }
                    ],
                    expectedCode: [""],
                },
                /* STEP 14 -- add slide left*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}slideIfBlue.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Inside the code block that detects blue, place <b/>slide 1 time to the left</b> inside the repeat until block, like shown here.
                        
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-14`}
                    />,
                    nextStepActions: [
                        {
                             type: "HighlightBlocks",
                            blocks: ["mv2_slide"]
                        }
                    ],
                    expectedCode: [""],
                },
                /* STEP 15 -- add backwards block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}backwardsIfYellow.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       Inside the code block that detects yellow, place <b/>walk backwards two steps</b> inside the repeat until block, like shown here:
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-15`}
                    />,
                    nextStepActions: [
                        {
                              type: "HighlightBlocks",
                            blocks: ["mv2_walk_fw"]
                        }
                    ],
                    expectedCode: [""],
                },
                /* STEP 16 -- add stop & dance*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}stopAndDance.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       Almost done!
                       <br/><br/>Inside the code block that detects red, place a <b/>pause movement</b> and a <b/>dance</b> block inside the repeat until block, like shown here:
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-16`}
                    />,
                    nextStepActions: [
                        {
                              type: "HighlightBlocks",
                            blocks: ["mv2_pause","mv2_dance"]
                        }
                    ],
                    expectedCode: [""],
                },
                 /* STEP 17 -- add start sound*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}stopAndCelebrate.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       But wait - Marty can't dance without music!
                       <br/><br/>In between the pause and dance blocks, place <b/>start sound</b> and use the dropdown box to select </b>celebrate</b>!
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-17`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["mv2_playSound"]
                        }
                    ],
                    expectedCode: [""],
                },
                /* STEP 18 -- add stop all*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}celebrateThenStop.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       Finally, we want Marty to stop all code once he's finished celebrating.
                       <br/><br/>Place a <b/>stop all</b> block after the dance block.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-18`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["control_stop"]
                        }
                    ],
                    expectedCode: [""],
                },
                /* STEP 19 -- final code pieces explained*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}beepAndLight.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        There's two more things we need to do if we want to properly recreate unplugged mode.
                        <br/><br/>When Marty senses a new colour, he changes his eye LEDs to that colour and makes a "beep beep!" noise.
                        <Let's put this into our code!><>
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-19`}
                    />,
                    nextStepActions: [
                        {
                            
                            type: "HighlightElement",
                            elementId: "lesson-nextStep-btn",
                            hexColor: "#855cd659"
                            
                        }
                    ],
                    expectedCode: [""],
                },
                /* STEP 20 -- add eye LED block*/
                {
                    type: "info",
                    image: `${BUCKET_URL}LEDBlocks.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Place a <b/>set Select LED eyes to</b> block <b/>inside the if-statement, but above the repeat until block</b> in each piece of code.
                        <br/><br/>Change the LED colour to the relevant colour for that block, and make sure to use the dropdown box to select <b/>both eyes</b>.
                        <br/><br/>Your code should look like this:

                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-20`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["mv2_LEDEyesColour"]
                            
                        }
                    ],
                    expectedCode: [""],
                },
                /* STEP 21 -- add arcade beep*/
                {
                    type: "info",
                    image: `${BUCKET_URL}addArcadeBeep.gif`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       We can find Marty's "beep beep!" noise in the Sound library, called <b/>Arcade Beep</b>.
                       <br/><br/>Copy the clip below to locate the <b/>Arcade Beep</b> function in Sounds.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-20`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightElement",
                            elementId: "lesson-nextStep-btn",
                            hexColor: "#855cd659"
                            
                        }
                    ],
                    expectedCode: [""],
                },
                /* STEP 22 -- add start Sound*/
                {
                    type: "info",
                    image: `${BUCKET_URL}finalCode.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Place a <b/>set Select LED eyes to</b> block <b/>inside the if-statement, but above the repeat until block</b> in each piece of code.
                        <br/><br/>Change the LED colour to the relevant colour for that block, and make sure to use the dropdown box to select <b/>both eyes</b>.
                        <br/><br/>Your code should look like this:

                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-6.step-22`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["mv2_LEDEyesColour"]
                            
                        }
                    ],
                    expectedCode: [""],
                },
  
  
        ] 
    }
}

export default martyBlocksCodingTutorial4;
