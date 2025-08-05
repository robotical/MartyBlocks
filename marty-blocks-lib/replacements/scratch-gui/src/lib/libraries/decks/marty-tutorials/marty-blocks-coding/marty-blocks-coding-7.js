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

const BUCKET_URL = "https://content.robotical.io/static/tutorials/marty/blocks/coding/7/";

const martyBlocksCodingTutorial7 = {
    'marty-blocks-coding-7': {
        id: "marty-blocks-coding-7",
        name: "Lists Pt.1 - Marty Memorises Colours",
        type: "lesson",
        urlId: "lists-1",
        description: <FormattedMessage
            defaultMessage={"Let's learn how programmers use lists to do so many cool things!"}
            description=""
            id={`gui.howtos.lessons.marty-blocks-coding-7.description`}
            values={{}}
        />,
        img: `${BUCKET_URL}blockscoding7_cover.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['marty', 'functions', 'sequencing', 'loops','sensors','variables','lists'],
        steps: [
              /* STEP 1 -- intro */
               {
                type: "info",
                image: `${BUCKET_URL}blockscoding7_cover.png`,
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
                       In this tutorial, we’re going to learn all about lists!`}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-7.step-1`}
                />,
                expectedCode: [],
                },
                /* STEP 2 -- understanding lists*/
                {
                type: "info",
                image: `${BUCKET_URL}sampleList.png`,
                nextStepActions: [
                    {
                       type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`So, when it comes to programming, <b/>what is a list?</b>
                        <br/><br/>Programmers use lists, sometimes called arrays, to store data in a specific order. 
                        <br/><br/>Programmers can control how data is added, removed and stored in the list, as well as talk about data by its number in the list (called an index). 
                       `}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-7.step-2`}
                />,
                expectedCode: [],
                },
                 /* STEP 3 -- People list example */
                {
                 type: "info",
                image: `${BUCKET_URL}sampleListPeople.png`,
                nextStepActions: [
                    {
                       type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`For example, in this list, we could say:
                        <br/><br/><i/>remove person number 2</i>, rather than <i/>remove Marty</i>.
                        <br/><br/><i/>swap person number 3 and number 4</i>, rather than <i/>swap Sam and Kirsty</i>.
                        <br/><br/>Lists help programmers control and store information easily, even when it changes.
                       `}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-7.step-3`}
                />,
                expectedCode: [],
                },
                /* STEP 4 -- unplugged tiles layout*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}unpluggedTilesLayout.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       In this tutorial, we'll use a list to help Marty memorise a line of colour tiles that he walks on.
                       <br/><br/>Before we start coding, you'll need 4 unplugged mode tiles laid out in a line like this:
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-7.step-4`}
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
                /* STEP 5 -- make a list*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}makeListColours.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Navigate to the Variables tab and click "Make a List"
                        <br/><br/>Call the list "colours" and click "ok"
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-7.step-5`}
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
                /* STEP 6 -- add thing block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}addThingToColours.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       Each time Marty goes on to a new tile, we're going to add the colour from his coloursensor to our "colours" list.
                       <br/><br/>Select the <b/>add thing to colours</b> block.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-7.step-6`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: [""]
                        }
                    ],
                    expectedCode: [""],
                },
                 /* STEP 7 -- add coloursensor block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}addColourSensorToList.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Select a colour sensor block and place it into the <b/>add thing to colours</b> block.
                        <br/><br/> Now our code says, <i/>whatever colour Marty is sensing, add this to the list "colours".</i>
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-7.step-7`}
                    />,
                    nextStepActions: [
                        {
                           type: "HighlightBlocks",
                            blocks: ["mv2_coloursense"]
                        }
                    ],
                    expectedCode: [""],
                },
          /* STEP 8 -- add walk block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}addWalkBlock.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        After we add a colour to our colours list, we want Marty to walk enough steps to reach the next tile along.
                        <br/><br/>Place a <b/>walk forward</b> block as shown, and change the <b/>2</b> to a <b/>7</b>.
                        <br/><br/></i>We find 7 steps enough to go from one unplugged tile to the next, but you can try this out now and change if necessary!
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-7.step-8`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["mv2_walk_fw"]
                        }
                    ],
                    expectedCode: [""],
                },
                /* STEP 9 -- add pause block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}addPauseBlock.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       Before Marty checks his coloursensor, we should tell him to pause to get an accurate reading.
                       Add a <b/>pause movement</b> block as shown below:
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-7.step-9`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["mv2_pause"]
                        }
                    ],
                    expectedCode: [""],
                },
                 /* STEP 10 -- add repeat loop*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}addRepeatBlock.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Since we want to repeat this code for each of our 4 colour tiles, let's add a <b/>repeat</b> loop around the code.
                        <br/><br/>Change <b/>10</b> to <b/>4</b> to repeat the code 4 times.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-7.step-10`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["control_repeat"]
                        }
                    ],
                    expectedCode: [""],
                },
                 /* STEP 11 -- add LED eye blocks*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}addLEDBlocks.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Now let's get Marty to use his LED eyes to tell us which colours he's seen.
                        <br/><br/>Select 4 <b/>Set select LED eyes to</b> blocks and place them after the repeat loop.
                        <br/><br/>Use the dropdown box to select <b/>both eyes</b>.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-7.step-11`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["mv2_LEDEyesColour"]
                        }
                    ],
                    expectedCode: [""],
                },
                 /* STEP 12 -- add ite of colours blocks*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}addItemOfColoursBlock.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Great job! Now let's make Marty's LEDs change to all the colours in our list.
                        <br/><br/>Navigate to the Variables tab and select the <b/>item 1 of colours</b> block.
                        <br/><br/>Replace the coloured circle with <b/>item 1 of colours</b>, and change the number to go 1,2,3 and 4 like shown here:
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-7.step-12`}
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
                /* STEP 13 -- add wait blocks*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}finalCode.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Almost done!
                        <br/><br/>Add a <b/>wait 1 seconds</b> block before each LED block like below, to give enough time for each colour change.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-7.step-13`}
                    />,
                    nextStepActions: [
                        {
                             type: "HighlightBlocks",
                            blocks: ["control_wait"]
                        }
                    ],
                    expectedCode: [""],
                },
                /* STEP 14 -- end*/
                {            
                    type: "end",
                    image: `${BUCKET_URL}blockscoding7_cover.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        You did it! 
                        <br/><br/>Now place your Marty at the beginning of your line of tiles, like shown here, and watch Marty remember each colour! 
                        
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-7.step-14`}
                    />,
                    nextStepActions: [
                        {
                             type: "HighlightBlocks",
                            blocks: [""]
                        }
                    ],
                    expectedCode: [""],
                },
                
  
        ] 
    }
}

export default martyBlocksCodingTutorial7;
