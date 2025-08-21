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

const BUCKET_URL = "https://content.robotical.io/static/tutorials/marty/blocks/coding/3/";

const martyBlocksCodingTutorial3 = {
    'marty-blocks-coding-3': {
        id: "marty-blocks-coding-3",
        name: "What Is A Variable?",
        type: "lesson",
        urlId: "what-is-a-variable",
        description: <FormattedMessage
            isRaw={true}
            defaultMessage={"Learn how programmers use variables and loops to supercharge their code!"}
            description="Learn about variables and an iterative loop to help Marty count to ten!"
            id={`gui.howtos.lessons.marty-blocks-coding-3.description`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        img: `${BUCKET_URL}blockscoding3_cover.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['marty', 'functions', 'sequencing', 'loops', 'conditionals', 'variables', 'operations'],
        steps: [
           /* STEP 1 -- intro*/
           {
                type: "info",
                image: `${BUCKET_URL}blockscoding3_cover.png`,
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
                      In this tutorial, we're going to learn how programmers use <b/>variables</b> to supercharge their code! 
                      <br /><br />Variables are really important in programming. They help computers <b/>remember and manipulate</b> data so we can do more complicated tasks in less lines of code.
                        `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-3.step-1`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },
            /* STEP 2 -- variable explaination*/
           {
                type: "info",
                image: `${BUCKET_URL}variablesAnalogy.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    Imagine a variable as a labelled storage box. A variable has three parts: a name, a type and a value.
                    <br /><br /> The <b/>name</b> tells us <i/>"what do we call this box?"</i> 
                    <br /> The <b/>type</b> tells us <i/>"what kind of thing do we keep in this box?"</i>
                    <br /> The <b/>value</b> tells us <i/>"what exactly are we currently keeping in the box?"</i>
                     <br /><br /> In this exercise, we’re going to make and use a variable called <b/>my counter</b> to help Marty count to ten!  `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-3.step-2`}
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
            /* STEP 3 -- make the variable*/
           {
                type: "info",
                image: `${BUCKET_URL}makeMyCounter.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                   First let’s make our variable <b/>my counter</b>. 
                   <br /><br />Select "Make a Variable" and call it <b/>my counter</b>. Click "ok" and watch how the variable pops us in the top left corner, with a current value of 0`}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-3.step-3`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "BKY_CATEGORY_VARIABLES",
                        hexColor: "#855cd659"
                       
                    },
                ],
                expectedCode: [""],
            },
            /* STEP 4 -- Select my counter variable*/
           {
                type: "info",
                image: `${BUCKET_URL}addMyCounter.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                   To code with our <b/>my counter</b> variable, we can drag it from the Variables category into the scripting area.
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-3.step-4`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                       type: "HighlightElement",
                        elementId: "BKY_CATEGORY_VARIABLES",
                        hexColor: "#855cd659"
                    }
                ],
                expectedCode: [""],
            },
            /* STEP 5 --  add Marty speak block*/
           {
                type: "info",
                image: `${BUCKET_URL}martySpeakMyCounter.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    Let’s make Marty read out our variable!
                    <br /><br />Select the “Marty speak” block, and replace “hello” with the <b/>my counter</b> variable like below. Click on this block and you should hear your Marty say “zero”.
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-3.step-5`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                        //FIND
                    }
                ],
                expectedCode: [""],
            },
            /* STEP 6 --  add "change variable by 1"*/
           {
                type: "info",
                image: `${BUCKET_URL}changeCounterByOne.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    If we want Marty to count up from 0 to 10, we need to +1 to <b/>my counter</b> before each time we tell Marty to say a number.
                    <br /><br />In variables, we can select the <b/>change my counter by 1</b> block, which will +1 to <b/>my counter</b>.
                    <br /><br />Place this before "Marty speak" like below. Click these blocks and hear Marty say "one"!
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-3.step-6`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                        //FIND
                    }
                ],
                expectedCode: [""],
            },
             /* STEP 7 --  marty counts*/
           {
                type: "info",
                image: `${BUCKET_URL}martyCounts.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    Click the code block again, and Marty says “two”. 
                    <br/><br/>Click the code block until Marty counts from 1 to 10!
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-3.step-7`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                         type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                expectedCode: [""],
            },
                /* STEP 8 --  reset to zero*/
           {
                type: "info",
                image: `${BUCKET_URL}setToZero.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    Hmm... What if we want to count to ten again? We need to reset <b/>my counter</b> to zero! 
                     <br /><br />Select “set my counter to 0” to the scripting area, click it and <b/>my counter</b> should be reset to 0.

                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-3.step-8`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                         //FIND THIS
                    }
                ],
                expectedCode: [""],
            },
            /* STEP 9 --  repeat until*/
           {
                type: "info",
                image: `${BUCKET_URL}repeatUntilEmpty.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                   Let's try an extra challenge - what if we wanted to make Marty count from 0 to 10 just by clicking the green flag button?
                  <br /><br /> We'd need Marty to repeat our code lots of times until he reaches ten.
                  <br /><br /> We can control this using a <b/>repeat until</b> block - place our existing code inside it like this:

                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-3.step-9`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                         type: "HighlightBlocks",
                        blocks: ["control_repeat_until"]
                    }
                ],
                expectedCode: [""],
            },
            /* STEP 10 --  repeat until*/
           {
                type: "info",
                image: `${BUCKET_URL}repeatUntilGreaterThan.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                   We want to repeat this process until <b/>my counter</b> becomes more than 10.
                    <br /><br /> Select the more than block. Place it into the diamond of <b/>repeat until</b>, and change 50 to 10.

                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-3.step-10`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                         type: "HighlightBlocks",
                        blocks: ["control_repeat_until"]
                    }
                ],
                expectedCode: [""],
            },
             /* STEP 11 --  repeat until*/
           {
                type: "info",
                image: `${BUCKET_URL}repeatUntilMyCounter.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                   Let's complete our <b/>repeat until</b> statement.
                    <br /><br /> We want to continue the loop until my counter is greater than ten.
                    <br /><br /> Navigate to variables, and fill in the repeat statement with <b/>my counter</b> just like this:

                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-3.step-11`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                         type: "HighlightElement",
                        elementId: "BKY_CATEGORY_VARIABLES",
                        hexColor: "#855cd659"
                    }
                ],
                expectedCode: [""],
            },
             /* STEP 12 --  connect reset block*/
           {
                type: "info",
                image: `${BUCKET_URL}fullCodeNoFlag.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                   Think back to step 8, we want to set <b/>my counter</b> to zero each time we want to start counting. 
                    <br /><br /> Drag the <b/>set my counter to 0</b> block and place it before our repeat block like this.
                    <br /><br /> Now Marty will always start from 0.
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-3.step-12`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                         type: "HighlightElement",
                        elementId: "BKY_CATEGORY_VARIABLES",
                        hexColor: "#855cd659"
                    }
                ],
                expectedCode: [""],
            },
             /* STEP 13 --  add green flag*/
           {
                type: "info",
                image: `${BUCKET_URL}finalCode.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                   Great work! You're almost there! 
                   <br/><br/>Finally, add a <b/>when green flag clicked</b> block at the top of our code to finish it off.
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-coding-3.step-13`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                          type: "HighlightBlocks",
                        blocks: ["event_whenflagclicked"]
                    }
                ],
                expectedCode: [""],
            },

              /* STEP 14 -- end */
                {
                    type: "end",
                    image: `${BUCKET_URL}blockscoding3_cover.png`,
                    description: <FormattedMessage
                        isRaw={true}
                        defaultMessage={`You did it! 
                            You now know how to use variables, manipulate them, and make an <b/> iterative loop </b> to help Marty count to ten! `} 
                        description=""
                        id={`gui.howtos.lessons.marty-blocks-coding-2.step-14`}
                        values={{}}
                    >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                    expectedCode: [""],
                },
  
  
        ] 
    }
}

export default martyBlocksCodingTutorial3;
