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

const BUCKET_URL = "https://content.robotical.io/static/tutorials/marty/blocks/intro/2/";

const martyBlocksIntroTutorial2 = {
    'marty-blocks-intro-2': {
        id: "marty-blocks-intro-2",
        name: "Fun with Sprites",
        type: "lesson",
        urlId: "fun-with-sprites",
        description: <FormattedMessage
            defaultMessage={"Learn how to create and control Sprites in MartyBlocks!"}
            description="learn how to create and control a sprite to explore different backdrops."
            id={`gui.howtos.lessons.marty-blocks-intro-2.description`}
            values={{}}
        />,
        img: `${BUCKET_URL}blocksintro2_cover.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['sprites', 'functions', 'loops', 'sequencing'],
        steps: [
            /* STEP 1 -- intro*/
           {
                type: "info",
                 image: `${BUCKET_URL}exampleGIF.gif`,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`We can use sprites to do so many things in MartyBlocks! From controlling Marty, to broadcasting messages and taking inputs. <br /><br />
                      <b/>Let's use our mouse to control a sprite and explore different backdrops!</b>
                        `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-2.step-1`}
                />,
                expectedCode: [],
            },
            /* STEP 2 -- creating a sprite*/
           {
                type: "info",
                image: `${BUCKET_URL}createASprite.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`Choose a sprite to work with - you can select a sprite from the library or get a surprise sprite!`}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-2.step-2`}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["FINDTHIS"]
                    },
                ],
                expectedCode: [""],
            },
            /* STEP 3 -- add green flag block*/
           {
                type: "info",
                image: `${BUCKET_URL}whenflagclicked.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                  Let's select a green flag block to begin - drag it to the script area to start coding.
                        `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-2.step-3`}
                />,
                nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["event_whenflagclicked"]
                    },
                ],
                expectedCode: ["event_whenflagclicked"],
            },            
            /* STEP 4 -- add forever loop block*/
           {
                type: "info",
                image: `${BUCKET_URL}foreverLoop.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    Let’s use the “forever” loop so that the sprite keeps following until we tell it to stop with the red stop button.
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-2.step-4`}
                />,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["control_forever"]
                    }
                ],
                expectedCode: ["event_whenflagclicked=>control_forever"],
            },
            /* STEP 5 -- add point towards block*/
           {
                type: "info",
                image: `${BUCKET_URL}pointTowards.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    In Motion, select the point towards mouse-pointer block. <br /><br /> 
                    Add this as our first block in the forever loop.
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-2.step-5`}
                />,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["motion_pointtowards"]
                    }
                ],
                expectedCode: ["event_whenflagclicked=>control_forever=>motion_pointtowards"],
            },
                       /* STEP 6 -- add move block*/
           {
                type: "info",
                image: `${BUCKET_URL}moveStepsSampleCode.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    Also in Motion, select the walk 10 steps block. <br /><br /> 
                    Let’s add this below the point towards block, and change the number of steps to 5. 
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-2.step-6`}
                />,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["motion_movesteps"]
                    }
                ],
                expectedCode: ["event_whenflagclicked=>control_forever=>motion_movesteps"],
            },
                        /* STEP 7 -- add backgrounds*/
           {
                type: "info",
                image: `${BUCKET_URL}add10Backgrounds.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    You can also change the background that your sprite sits on. <br /><br />
                    These can help us do even more things with sprites.  <br /><br /> 
                   Choose ten different backdrops (you’ll know you’ve done this when it says backdrops: 10) 
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-2.step-7`}
                />,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["FINDTHIS"]
                    }
                ],
                expectedCode: ["event_whenflagclicked=>control_forever=>motion_movesteps"],
            },
             /* STEP 8 -- switch between backdrops*/
           {
                type: "info",
                image: `${BUCKET_URL}sampleCodeFunWithSprites.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                  Let’s help our sprite switch between these backdrops to explore!  <br /><br />
                  Select a switch backdrop block, and use the dropdown menu to select “random backdrop".<br /><br />
                  Place this between the “when green flag clicked” block and the forever loop, like shown in the sample code here:
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-2.step-8`}
                />,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["looks_switchbackdropto"]
                    }
                ],
                expectedCode: ["event_whenflagclicked=>looks_switchbackdropto=>control_forever=>motion_movesteps"],
            },
              /* STEP 9 -- end */
                        {
                            type: "end",
                            image: `${BUCKET_URL}finalStep.png`,
                            description: <FormattedMessage
                                isRaw={true}
                                defaultMessage={"You did it! <br /><br /> <b/>Now every time we click the green flag, we can explore a new backdrop with our sprite! </b><br/><br /> You can use the button with four arrows to watch your sprite in full screen! "}
                                description=""
                                id={`gui.howtos.lessons.marty-blocks-intro-2.step-9`}
                                values={{}}
                            />,
                            expectedCode: [],
                        },
        ]
    }
}

export default martyBlocksIntroTutorial2;
