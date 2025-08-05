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

const BUCKET_URL = "https://content.robotical.io/static/tutorials/marty/blocks/intro/4/";

const martyBlocksIntroTutorial4 = {
    'marty-blocks-intro-4': {
        id: "marty-blocks-intro-4",
        name: "Sprites Can Party With Marty",
        type: "lesson",
        urlId: "sprites-can-party-with-marty",
        description: <FormattedMessage
            defaultMessage={"Use a sprite to tell Marty that it’s party time!"}
            description="Learn how to use messages, sprites and events to control Marty."
            id={`gui.howtos.lessons.marty-blocks-intro-4.description`}
            values={{}}
        />,
        img: `${BUCKET_URL}blocksintro4_cover.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['sprites', 'functions', 'events' , 'sequencing', 'communication', 'messages', 'broadcast'],
        steps: [
            /* STEP 1 -- intro*/
           {
                type: "info",
                image: `${BUCKET_URL}blocksintro4_cover.png`,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`We can use sprites to communicate with Marty, and with each other, by broadcasting messages.<br /><br />
                         We’re going to use a sprite to tell Marty that it’s party time!`}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-4.step-1`}
                />,
                expectedCode: [],
            },           
            
            /* STEP 2 -- select arctic backdrop*/
           {
                type: "info",
                image: `${BUCKET_URL}searchForParty.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                     First, let’s select a party backdrop. <br/>
                     Open up the backdrop menu and search <b/>party</b> to set the scene.`}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-4.step-2`}
                />,
                 nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "stage-selector-action-menu",
                        hexColor: "#855cd659",
                    }
                ],
                expectedCode: [""],
            },
                        /* STEP 3 -- creating a sprite*/
           {
                type: "info",
                image: `${BUCKET_URL}searchForSpeaker.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`Now our party needs some music! <br/>
                        Click “Choose a Sprite” and search <b/>speaker</b> to complete our party scene.`}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-4.step-3`}
                />,
                nextStepActions: [
                    {
                       type: "HighlightElement",
                        elementId: "spite-selector-action-menu",
                        hexColor: "#855cd659",
                    },
                ],
                expectedCode: [""],
            },
                /* STEP 4 -- sprites code explanation*/
           {
                type: "info",
                image: `${BUCKET_URL}spriteMenuSpeaker.png`,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`Click on the speaker in the sprites menu to navigate to the speaker's code. We want to write code that says:  <br /><br />
                                    <i> when this sprite clicked, broadcast “party time!"</i>`}
                   description=""
                                id={`gui.howtos.lessons.marty-blocks-intro-4.step-4`}
                                values={{}}
                            />,
                expectedCode: [],
            },
                        /* STEP 5 -- select when this sprite clicked*/
           {
                type: "info",
                image: `${BUCKET_URL}whenThisSpriteClicked.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`Drag this block into the coding area to begin our sprite code.
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-4.step-5`}
                />,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["event_whenthisspriteclicked"]
                    }
                ],
                expectedCode: [""],
            },
             /* STEP 6 -- add broadcast message*/
           {
                type: "info",
                image: `${BUCKET_URL}broacastMessage1.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={` Drag the "broadcast message1" block into position as shown. <br /><br /> 
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-4.step-6`}
                />,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["event_broadcast"]
                    }
                ],
                expectedCode: [""],
            },
              /* STEP 7 -- add party time message */
                        {
                        type: "info",
                        image: `${BUCKET_URL}newMessage.png`,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "lesson-nextStep-btn",
                        hexColor: "#855cd659"
                    }
                ],
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`Use the dropdown box to select "new message", then create a new message called "party time!" to broadcast.`}
                   description=""
                                id={`gui.howtos.lessons.marty-blocks-intro-4.step-7`}
                                values={{}}
                            />,
                            expectedCode: [],
                        },
            /* STEP 8 -- completed sprite code*/
           {
                type: "info",
                image: `${BUCKET_URL}broadcastWhenSpriteClicked.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`This should be your completed speaker sprite code. 
                        <br/><br/>Now let's tell Marty what to do when he hears the message <i/>party time!</i>
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-4.step- 8`}
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

             /* STEP 9 -- navigate to Marty's code*/
           {
                type: "info",
                image: `${BUCKET_URL}selectMarty.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`
                        Navigate to your Marty’s blocks by clicking on Marty in the devices menu.
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-4.step-9`}
                />,
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
                image: `${BUCKET_URL}whenIReceive.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`In events we’ll select “when I receive”, drag it to the scripting area and use the dropdown box to select "party time!" <br /><br /> 
                        We'll use this to tell Marty what to do when it's party time - play music and dance!
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-4.step-10`}
                />,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["event_whenbroadcastreceived"]
                    }
                ],
                expectedCode: [""],
                        },
            /* STEP 11 -- start sound*/
           {
                type: "info",
                image: `${BUCKET_URL}whenReceivedPlayCelebrate.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`Select the start sound block, and place it like shown below. 
                        <br/><br/>Use the dropdown box to select "Celebrate!" and start the party!
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-4.step-11`}
                />,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["sound_play"]
                    }
                ],
                expectedCode: [""],
            },

             /* STEP 12 - add Dance block*/
           {
                type: "info",
                image: `${BUCKET_URL}martyPartyFinalCode.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={`Finally, navigate to Motion, select the "Dance!" block, and place it as shown in the sample code below. 
                        <br/><br/>Now Marty can really party!
                `}
                   description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-4.step-12`}
                />,
                 nextStepActions: [
                    {
                        type: "HighlightBlocks",
                        blocks: ["mv2_dance"]
                    }
                ],
                expectedCode: [""],
            },

            /* STEP 13 -- end */
            {
                type: "end",
                image: `${BUCKET_URL}blocksintro4_cover.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={'You did it! Click on the speaker to start the music, and watch Marty party!'}
                    description=""
                    id={`gui.howtos.lessons.marty-blocks-intro-4.step-13`}
                    values={{}}
                />,
                expectedCode: [""],
                },

        ]
    }
}

export default martyBlocksIntroTutorial4;
