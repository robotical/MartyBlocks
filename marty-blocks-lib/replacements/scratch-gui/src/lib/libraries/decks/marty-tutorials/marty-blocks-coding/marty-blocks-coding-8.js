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

const BUCKET_URL = "https://content.robotical.io/static/tutorials/marty/blocks/coding/8/";

const martyBlocksCodingTutorial8 = {
    'marty-blocks-coding-8': {
        id: "marty-blocks-coding-8",
        name: "Lists Pt.2 - Marty's Shopping List",
        type: "lesson",
        urlId: "lists-2",
        description: <FormattedMessage
            defaultMessage={"Let's learn how programmers use lists to do so many cool things!"}
            description=""
            id={`gui.howtos.lessons.marty-blocks-coding-8.description`}
            values={{}}
        />,
        img: `${BUCKET_URL}blockscoding8_cover.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['marty', 'functions', 'sequencing', 'loops','variables','lists','conditionals','operators'],
        steps: [
              /* STEP 1 -- intro */
               {
                type: "info",
                image: `${BUCKET_URL}blockscoding8_cover.png`,
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
                       In this tutorial,In this tutorial, we’re going to use a <b/>list</b> to write Marty’s shopping list.
                       <br/><br/>Then, we're going to write some code in an <b/>iterative loop</b> to get Marty to read his shopping list out loud!`}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-8.step-1`}
                />,
                expectedCode: [],
                },
                /* STEP 2 -- making the list*/
                {
                type: "info",
                image: `${BUCKET_URL}makeList.png`,
                nextStepActions: [
                    {
                       type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`First of all, let's create our list.
                        <br/><br/> Navigate to the Variables tab and click "Make a List"
                        <br/><br/>Call the list "colours" and click "ok"  `}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-8.step-2`}
                />,
                expectedCode: [],
                },
                 /* STEP 3 -- add first item to list */
                {
                 type: "info",
                image: `${BUCKET_URL}addBatteries.png`,
                nextStepActions: [
                    {
                       type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`The first thing Marty needs to buy is batteries.
                        <br/><br/>Select the <b/>add thing to Marty's Shopping List</b> block.
                        <br/><br/>Instead of <b/>thing</b>, write <b/>batteries</b>. Click on the block and watch batteries appear on the list
                       `}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-8.step-3`}
                />,
                expectedCode: [],
                },
                /* STEP 4 -- add wires to list*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}addWires.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       The next thing Marty needs is wires!
                       <br/><br/>Keeping the same block as before, change <b/>batteries</b> to <b/>wires</b> and click on the block.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-8.step-4`}
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
                /* STEP 5 -- add nuts and bolts*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}addNutsAndBolts.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Marty also needs nuts and bolts!
                        <br/><br/>Use the same block to add nuts and bolts to the list.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-8.step-5`}
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
                /* STEP 6 -- add candy*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}addCandy.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                      Marty says the most important thing he needs to buy is candy!
                       <br/><br/>Select the <b/>insert thing at 1 of Marty's Shopping List</b> block.
                       <br/><br/>Instead of <b/>thing</b>, write <b/>candy</b>, click on the block and watch candy appear at number 1 on the list!
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-8.step-6`}
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
                 /* STEP 7 -- explain lists and loops*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}codeComparison.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        The cool thing about lists is they make it super easy to write code!
                        <br/><br/>Both of these code blocks read out Marty's shopping.
                        <br/><br/>However, not using a list, like on the left, we'd have to change this code every time Marty's shopping changed.
                        <br/><br/>If we use a list, like on the right, we can write code that works all the time - no matter how long the list is, or what gets added/removed!
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-8.step-7`}
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
          /* STEP 8 -- explain iterative loops*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}iterationExplained.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        We're going to write this code that we can use for any list!
                        <br/><br/>No matter how we change the list, Marty can still read the list out loud with this code!
                        <br/><br/>This repeat loop is special - programmers call them <b/>iterative loops</b>
                        <br/><br/>Iteration means to repeat the same task, changing something each time until a condition is met.
                        <br/><br/>Here you can see the <b/>repeated task</b>, the <b/>condition</b> and the <b/>repeated change</b>.

                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-8.step-8`}
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
                /* STEP 9 -- repeat until*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}repeatUntil.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       To start our iterative loop, select a repeat until block.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-8.step-9`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: ["control_repeat_until"]
                        }
                    ],
                    expectedCode: [""],
                },
                 /* STEP 10 -- make variable*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}makeVariable.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       Let's make the variable <b/>item number</b> which we'll use to loop through Marty's shopping list.
                        <br/><br/>Navigate to the variables tab, select Make a Variable, call it <b/>item number</b>, and click "ok".
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-8.step-10`}
                    />,
                    nextStepActions: [
                        {
                            type: "HighlightBlocks",
                            blocks: [""]
                        }
                    ],
                    expectedCode: [""],
                },
                 /* STEP 11 -- add Marty speak block*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}martySpeak.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Let's set up the repeated task inside our iterative loop: Marty reading out items from his list.
                        <br/><br/>Navigate to the Speak tab, select a <b/>Marty speak</b> block and place it inside the repeat loop.
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-8.step-11`}
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
                 /* STEP 12 -- add number of list*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}itemNumberOfShoppingList.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        We don't want Marty to say hello, we want him to read out an item from the list.
                        <br/><br/>Navigate to the Variables tab, and select <b/>item 1 of Marty's Shopping List</b> block and place it as shown
                        <br/><br/>Replace the number 1 with the <b/>item number</b> variable.
                        <br/><br/>Great work! Now if item number = 3, Marty would say "wires".
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-8.step-12`}
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
                /* STEP 13 -- add plus one*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}changeByOne.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                       Now let's add the repeated change into our loop.
                       <br/><br/>Each loop, we want to add one to the <b/>item number</b> variable.
                       <br/><br/>Place the <b/>change item number by 1</b> block after the speak block like shown:
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-8.step-13`}
                    />,
                    nextStepActions: [
                        {
                             type: "HighlightBlocks",
                            blocks: [""]
                        }
                    ],
                    expectedCode: [""],
                },
                /* STEP 14 -- add greater than*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}emptyGreaterThan.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Finally, we'll set up the condition of our iterative loop - <i/>repeat until: item number is greater than Marty's Shopping List</i>
                        <br/><br/>Place a greater than operator inside the repeat until statement like shown.
                        
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-8.step-14`}
                    />,
                    nextStepActions: [
                        {
                             type: "HighlightBlocks",
                            blocks: ["operator_gt"]
                        }
                    ],
                    expectedCode: [""],
                },
                /* STEP 15 -- fill in greater than*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}finalCode.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Navigate to the Variables tab and fill in the greater than block like shown, so it reads:
                        <br/><br/><i/>repeat until: item number is greater than Marty's Shopping List</i>
                     
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-8.step-15`}
                    />,
                    nextStepActions: [
                        { type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                        }
                    ],
                    expectedCode: [""],
                },
                /* STEP 16 -- set to zero and test*/
                {            
                    type: "info",
                    image: `${BUCKET_URL}setToZero.gif`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        You did it!
                        <br/><br/>Before we test our code,  make sure the item number variable is set to zero - if not, you can reset it using this block.
                     
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-8.step-16`}
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
                /* STEP 17 -- end*/
                {            
                    type: "end",
                    image: `${BUCKET_URL}blockscoding8_cover.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`
                        Awesome, now click your code and listen to Marty tell us his shopping list!
                        <br/><br/>You've learned all about lists, adding and removing elements, using their item numbers in code, and even how to iterate through them!
                     
                    `}
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-8.step-17`}
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
                
  
        ] 
    }
}

export default martyBlocksCodingTutorial8;
