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

const BUCKET_URL = "https://content.robotical.io/static/tutorials/marty/blocks/intro/3/";

const martyBlocksIntroTutorial3 = {
    'type-lesson-marty-blocks-intro-3': {
        id: "type-lesson-marty-blocks-intro-3",
        name: "Arctic Marty",
        type: "lesson",
        urlId: "arctic-marty",
        description: <FormattedMessage
            isRaw={true}
            defaultMessage={"Let's explore Events and Sprites, and how they can control Marty's movements!"}
            description="Learn how to use event blocks along with sprites and backdrops to control Marty's movements in MartyBlocks."
            id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-3.description`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        img: `${BUCKET_URL}blocksintro3_cover.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['sprites', 'functions', 'events' , 'sequencing', 'communication'],
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
                    defaultMessage={`Now that we know how to control a Sprite, lets use a Sprite, a backdrop and some Event blocks to control Marty in the Arctic!`}
                   description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-3.step-1`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },
            /* STEP 2 -- creating a sprite*/
           {
                type: "info",
                image: `${BUCKET_URL}searchForPolarBear.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`First things first, let's open up the sprite menu to choose our arctic sprite. <br /><br />
                        <b/>Search for "polar-bear"</b> and select the sprite to place it in the backdrop.`}
                   description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-3.step-2`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                       type: "HighlightElement",
                        elementId: "sprite-selector-action-menu",
                        hexColor: "#855cd659",
                    },
                ],
                expectedCode: [""],
            },           
            
            /* STEP 3 -- select arctic backdrop*/
           {
                type: "info",
                image: `${BUCKET_URL}searchForArctic.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                     Great! Now let’s make sure our polar bear feels at home. <br /><br />
                     Open up the backdrops menu, then select the arctic backdrop to give our polar bear a home!`}
                   description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-3.step-3`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "stage-selector-action-menu",
                        hexColor: "#855cd659",
                    }
                ],
                expectedCode: [""],
            },
                /* STEP 4 -- navigate to sprite code*/
           {
                type: "info",
                image: `${BUCKET_URL}polarBearSpriteMenu.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                    Click on the polar bear in the sprite menu to bring up its code.
                `}
                   description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-3.step-4`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["FINDTHIS"]
                    }
                ],
                expectedCode: [""],
            },
                        /* STEP 5 -- navigate to events*/
           {
                type: "info",
                image: `${BUCKET_URL}eventsCategory.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                   Then navigate to events. <br /><br />
                   These blocks say <b/>“when this happens, do that”</b>. They can help us make sure our code only runs when we want it to. 
                `}
                   description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-3.step-5`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "BKY_CATEGORY_EVENTS",
                        hexColor: "#855cd659",
                    }
                ],
                expectedCode: [""],
            },
             /* STEP 6 -- add event blocks*/
           {
                type: "info",
                image: `${BUCKET_URL}eventBlocksStep.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={` To start coding, we need two seperate event blocks. <br /><br />
                  Select the green flag event block and the “when this sprite clicked” event block. 
                `}
                   description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-3.step-6`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["event_whenflagclicked","event_whenthisspriteclicked"]
                    }
                ],
                expectedCode: [""],
            },
              /* STEP 7 -- code explaination */
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
                    defaultMessage={`We want to write code that says:  <br /> <br />
                                    <i> When this sprite clicked, switch backdrop to arctic.  <br />
                                    When green flag clicked, switch backdrop back to default.</i>
`}
                   description=""
                                id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-3.step-7`}
                                values={{}}
                            >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                            expectedCode: [],
                        },
            /* STEP 8 -- add switch backdrop to blocks*/
           {
                type: "info",
                image: `${BUCKET_URL}spriteSampleCode.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`Lets get two “switch backdrop” blocks from Looks, and add them underneath the event blocks as shown <br /><br />
                  Use the dropdown menu to choose arctic for one, and backdrop1 (the default) for the other.
                `}
                   description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-3.step-8`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["looks_switchbackdropto"]
                    }
                ],
                expectedCode: [""],
            },

             /* STEP 9 -- navigate to Marty's code*/
           {
                type: "info",
                image: `${BUCKET_URL}selectMarty.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`Now let’s use Marty’s event blocks to make him react to this code. <br /><br />
                        Navigate to your Marty’s blocks by clicking on Marty in the devices menu.
                `}
                   description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-3.step-9`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                        type: "HighlightDeviceImageElement",
                        raftType: "Marty",
                        elementId: "sprite-image-outer-{{dynamicId}}",
                        hexColor: "#855cd659",
                        onClickAction: "NextStep"
                    }
                ],
                expectedCode: [""],
            },
            /* STEP 10 -- Marty's code explaination */
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
                    defaultMessage={`We want to write code that says:  <br />
                                    <i> When backdrop switches to arctic, wiggle! </i>
                    `}
                   description=""
                                id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-3.step-10`}
                                values={{}}
                            >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                            expectedCode: [],
                        },
            /* STEP 11 -- select when backdrop switches to block*/
           {
                type: "info",
                image: `${BUCKET_URL}whenBackdropSwitchesTo.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`In events, select a “when backdrop switches to” block. <br /> Use the dropdown menu to select Arctic.
                `}
                   description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-3.step-11`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["event_whenbackdropswitchesto"]
                    }
                ],
                expectedCode: [""],
            },

             /* STEP 12 - add Wiggle block*/
           {
                type: "info",
                image: `${BUCKET_URL}martySampleCode.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`Finally, navigate to Motion, select the "Wiggle!" block, and place it as shown in the sample code:
                `}
                   description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-3.step-12`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["mv2_wiggle"]
                    }
                ],
                expectedCode: [""],
            },

            /* STEP 13 -- end */
            {
                type: "end",
                image: `${BUCKET_URL}blocksintro3_cover.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={'You did it! Click the green flag to reset the scene, then click the polar bear to make an arctic scene, and watch Marty wiggle!'}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-marty-blocks-intro-3.step-13`}
                    values={{}}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [""],
                },

        ]
    }
}

export default martyBlocksIntroTutorial3;
