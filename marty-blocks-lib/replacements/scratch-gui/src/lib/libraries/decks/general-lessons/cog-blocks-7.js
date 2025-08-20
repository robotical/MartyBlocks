import React from 'react';
import { FormattedMessage } from 'react-intl';


const BUCKET_URL = "https://content.robotical.io/static/tutorials/cog/blocks/7/";

const cogBlocksTutorial7 = {
    'type-lesson-cog-tutorial-7': {
        id: "type-lesson-cog-tutorial-7",
        name: <FormattedMessage
            defaultMessage={"Musical Instrument"}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.name`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        type: "lesson",
        urlId: "cog-blocks-7",
        description: <FormattedMessage
            defaultMessage={"Let’s turn Cog into a musical instrument!<br /><br />We’ll make Cog play notes that change based on how you interact with it, and learn about musical keys."}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.description`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        img: `${BUCKET_URL}cover_image.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['cog', 'sensing', 'measurement', 'conditionals', 'loops', 'comparators', 'operators', 'frequencies'],
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
                    defaultMessage={"Let’s turn Cog into a musical instrument!<br /><br />We’ll make Cog play notes that change based on how you interact with it, and learn about musical keys."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-1`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },

            /* STEP 2 -- measure */
            {
                type: "info",
                image: `${BUCKET_URL}step-2.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"First of all, let’s measure what Cog “sees” when you interact with the object sensor.<br /><br />Get a blank sheet of paper and use a ruler to make marks every centimeter from 0-5cm. Number the marks from 0-5."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-2`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },

            /* STEP 3 -- place cog */
            {
                type: "info",
                image: `${BUCKET_URL}step-3.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Place Cog on the 0 mark with the right object sensor pointing towards the distance marks.<br /><br />Change the IR Sensor value [left] block to the <i>right</i> sensor, and check the box next to it.<br /><br />That will display the reading from the IR sensor - another name for the object sensor since it uses infrared light to work."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-3`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-sensing",
                        hexColor: "#855cd659",
                    }
                ],
            },

            /* STEP 4 -- write down reading */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Write down the value of the IR Sensor Right with nothing in front of it.<br /><br />Then put your hand on the 5cm mark, note down the number the sensor reads now.<br /><br />It’s normal for the values to move up and down a bit - try to write down a number that’s in the middle of these variations."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-4`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },

            /* STEP 5 -- repeat */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Repeat this with your hand on the 4cm, 3cm, 2cm, 1cm and 0cm marks.<br /><br />You should end up with a table of measurements.<br /><br />You might notice that the numbers change a lot when your hand is close to Cog, but less the further away your hand gets."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-5`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },

            /* STEP 6 -- on button press */
            {
                type: "info",
                image: `${BUCKET_URL}step-6.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s make Cog play a note when the button is pressed.<br /><br />Add an <b>on button press</b> block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-6`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-events",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_onButtonPush"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                expectedCode: ["cog_onButtonPush"],
            },

            /* STEP 7 -- set reading */
            {
                type: "info",
                image: `${BUCKET_URL}step-7.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We’re going to use the right IR sensor to choose which note to play. Let’s take a snapshot of it by making a variable called <b>reading</b> and setting it to the value of the right IR sensor."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-7`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
            },


            /* STEP 8 -- if less than */
            {
                type: "info",
                image: `${BUCKET_URL}step-8.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now we need to use conditionals to select which note to play.<br /><br />We only want to play one note, so we’ll use the <b>if … else</b> block.<br /><br />For the condition, add a <b>less than</b> (<) comparator, and set it to <b>reading &lt; [2100]</b>. Instead of 2100, set this number to the one you measured when your hand was on the 4cm line."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-8`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 9 -- start note C4 */
            {
                type: "info",
                image: `${BUCKET_URL}step-9.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>Start note [C4]</b> block inside the if part of the if … else block.<br /><br />This is the lowest note we’ll make, and we’ll make it when the reading from the IR sensor is low - i.e. your hand is far away from it."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-9`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-sound",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["cog_startNote"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                expectedCode: ["cog_onButtonPush=>data_setvariableto=>control_if_else=>cog_startNote"]
            },

            /* STEP 10 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Push the button with nothing in front of Cog - you should hear a note.<br /><br />Push the button again with your hand a couple of cm in front of cog - nothing should happen because we went to the else part of the conditional instead."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-10`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: []
            },

            /* STEP 11 -- add another if */
            {
                type: "info",
                image: `${BUCKET_URL}step-11.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s code up more notes!<br /><br />We’ll add another <b>if … else</b> block inside the else part of the first one.<br /><br />Putting conditionals inside each other like this is called nesting."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-11`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["control_if_else"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                expectedCode: ["cog_onButtonPush=>data_setvariableto=>control_if_else=>cog_startNote=>control_if_else"]
            },

            /* STEP 12 -- set condition */
            {
                type: "info",
                image: `${BUCKET_URL}step-12.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Set the condition of the second if … else block to say <b>[reading] &lt; 2200</b>, but instead of 2200 use the number you measured with your hand on the 3cm line.<br /><br />Add another <b>Start note</b> block inside the if part of the second conditional, and set it to play the note <b>D4</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-12`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 13 -- repeat */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Do that twice more, so you end up with four if … else blocks.<br /><br />You can do this more quickly if you right click, or press and hold the last if… else block and select the <b>Duplicate</b> option."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-13`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 14 -- set conditions */
            {
                type: "info",
                image: `${BUCKET_URL}step-14.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"For the third conditional, set the number to the one you measured at the 2cm mark.<br /><br />For the fourth conditional, set the number to the one you measured at the 1cm mark."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-14`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 15 -- change notes */
            {
                type: "info",
                image: `${BUCKET_URL}step-15.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Change the third note to <b>E4</b>.<br /><br />Change the fourth note to <b>G4</b>.<br /><br />You might notice that we skipped a note! We’re only going to play five notes, and we’re selecting them from something called the pentatonic C scale.<br /><br />Pentatonic means it has 5 notes per octave, and C is the musical key. A key tells you about the sharps and flats that are used in a song - they’re the black notes on a piano."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-15`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },


            /* STEP 16 -- fifth note */
            {
                type: "info",
                image: `${BUCKET_URL}step-16.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now it’s time for the fifth note.<br /><br />There’s no need to use another if … else block as this is the only option left!<br /><br />Add a <b>Start note [A4]</b> block into the else part of the last if … else conditional."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-16`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: ["cog_onButtonPush=>data_setvariableto=>control_if_else=>cog_startNote=>control_if_else=>cog_startNote=>control_if_else=>cog_startNote=>control_if_else=>cog_startNote=>cog_startNote"]
            },

            /* STEP 17 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Can you get Cog to make all 5 notes?<br /><br />You can change the numbers a bit if you want to make any adjustments."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-17`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 18 -- stop playing */
            {
                type: "info",
                image: `${BUCKET_URL}step-18.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s make Cog stop playing the note when you stop pressing the button.<br /><br />After all the if .. else blocks, add a <b>wait until [[button clicked] = [False]]</b> block, and a <b>Stop sounds</b> block.<br /><br />You’ll need to look in the Control category for the wait until block, the Operators category for the = block, The Sensing category for the button clicked block, and the Sounds category for the Stop sounds block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-18`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 19 -- try it again */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it again!<br /><br />Now Cog will stop playing the note when you stop pressing the button."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-19`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 20 -- repeat until */
            {
                type: "info",
                image: `${BUCKET_URL}step-20.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"It would be fun if you could change note while you had the button held down.<br /><br />Put a <b>repeat until</b> block around all the code just after the on button press block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-20`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-control",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["control_repeat_until"],
                            hexColor: "#855cd659",
                        }
                    }
                ],
                expectedCode:[],
            },

            /* STEP 21 -- set condition */
            {
                type: "info",
                image: `${BUCKET_URL}step-21.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Set the condition in the repeat until block to be <b>[[button clicked] = False]</b>.<br /><br />Move the <b>Stop sounds</b> block outside of the repeat until loop, and replace the <b>wait until</b> block with a <b>wait [0.1] seconds</b> block."}          
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-21`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],   
            },

            /* STEP 22 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Pick up Cog and move your hand back and forth in front of the sensor while you have the button pushed - you should hear the note go up and down!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-22`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 23 -- play along */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We’ve made Cog play notes in the key of C, so we should be able to play along with any song that’s also in the key of C!<br /><br />For example, try playing along to “Let it Be” by The Beatles."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-23`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html:   nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 24 -- variables */
            {
                type: "info",
                image: `${BUCKET_URL}step-24.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"It would be even cooler if we could change notes more quickly, but we need to make sure we don’t send too many commands to Cog and overwhelm it.<br /><br />Let’s use variables to keep track of which note we’re playing, and only change it when we need to.<br /><br />Make two new variables called <b>note</b> and <b>lastNote</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-24`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [
                    {
                        type: "HighlightElement",
                        elementId: "category-variables",
                        hexColor: "#855cd659",
                        onClickAction: "HighlightBlocks",
                        args: {
                            blocks: ["make_a_variable"],
                            hexColor: "#855cd659",
                            onClickAction: "NextStep"
                        }
                    }
                ],
                expectedCode: [],
            },

            /* STEP 25 -- set note */
            {
                type: "info",
                image: `${BUCKET_URL}step-25.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Replace each of the <b>Start note</b> blocks with a <b>set [note] to [notec4]</b> block.<br /><br />You’ll need to type <b>notec4</b> exactly like that for this to work. For the other notes you’ll use <b>noted4</b>, <b>notee4</b>, <b>noteg4</b> and <b>notea4</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-25`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 26 -- if block */
            {
                type: "info",
                image: `${BUCKET_URL}step-26.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Replace the <b>wait [0.1] seconds</b> block after all the conditionals with an <b>if</b> block like this:<br /><br />The condition should be <b>if [not [[note] = [lastNote]] then</b>.<br /><br />You can find the <b>not</b> block in the Operators category. As you might expect, it’s only true if the thing inside it is false. So here, the condition is only true if the value of the note variable is not equal to the value of the lastNote variable.<br /><br />If that’s the case, there’s a new note to play, so inside the if block add a <b>Start note [note]</b> block.<br /><br />Also add <b>set [lastNote] to [note]</b>. This will make sure the program remembers what the last note was the next time around the loop."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-26`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 27 -- bug */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Can you spot what the little bug would be if we finished the code here?<br /><br />A bug is a mistake - in this case there’s one more thing we need to do to make sure that we always play a note when the button is pushed - and that’s to clear the lastNote variable when we stop the sounds.<br /><br />Do this by adding a <b>set [lastNote] to [0]</b> block at the end of the code."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-27`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 28 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Now when you move your hand the note should change more quickly!"}
                    description=""  
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-28`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 29 -- well done */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Well done!<br /><br />You’ve made a musical instrument that you can use to play along with songs!<br /><br />Using the pentatonic scale for a song that’s in the same key, you can play along while staying in tune!"}     
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-29`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 30 -- other sensors */
            {
                type: "info",
                image: `${BUCKET_URL}step-30.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"How else could you change the note?<br /><br />What about using how Cog is tilted? Then you could change the note just by twisting Cog left and right!<br /><br />You can modify your code to try that out - here’s a little hint for how to do that:"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-30`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },

            /* STEP 31 -- end */
            {
                type: "end",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Which do you prefer - using the IR sensor or the tilt to set the note?<br /><br />What other sensors could you use?<br /><br />Try playing along to other songs in the key of C.<br /><br />You could also change the notes to play the pentatonic scale for a different key instead. Many songs are all in the same key, although some have key changes - how could you make Cog change the key it’s playing in?"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-7.step-31`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                nextStepActions: [],
                expectedCode: [],
            },
        ]
    }
}

export default cogBlocksTutorial7;
