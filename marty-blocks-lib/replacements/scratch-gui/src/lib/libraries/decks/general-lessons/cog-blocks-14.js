import React from 'react';
import { FormattedMessage } from 'react-intl';

const BUCKET_URL = "https://content.robotical.io/static/tutorials/cog/blocks/14/";

const cogBlocksTutorial14 = {
    'type-lesson-cog-tutorial-14': {
        id: "type-lesson-cog-tutorial-14",
        name: <FormattedMessage
            defaultMessage={"Motion Tracker"}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.name`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        type: "lesson",
        urlId: "cog-blocks-14",
        description: <FormattedMessage
            defaultMessage={"Let’s make a motion tracker!"}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.description`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        img: `${BUCKET_URL}cover_image.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['cog', 'data', 'data collection', 'data analysis', 'classification', 'lists', 'iteration', 'functions', 'statistics'],
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
                    defaultMessage={"Let's build a motion tracker with Cog!<br/><br/>We'll use the accelerometer to collect data on movement, and then use that to classify each minute that passes as an active one or not.<br/><br/>We can then show a dashboard of physical activity, and prompt the user to move around if they haven't been very active."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-1`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },
            /*
            CONTEXT FOR THE STEPS:
            
            */
            /* STEP 2 - ax variable */
            {
                type: "info",
                image: `${BUCKET_URL}step-2.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Make a list called <i>ax</i><br/><br/>We'll use this to store recent readings from the accelerometer x-axis"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-2`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },
            /* STEP 3 - add blocks */
            {
                type: "info",
                image: `${BUCKET_URL}step-3.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks:<ul><li>When green flag clicked</li><li>Set [numSamples] to [10]</li><li>Delete all of [ax]</li><li>Repeat [numSamples]</li><ul><li>Add [Accelerometer [X]] to [ax]</li></ul><li>Forever</li><ul><li>Set [sampleCounter] to [[[sampleCounter] mod [numSamples]] + [1]]</li><li>Replace item [sampleCounter] of [ax] with [Accelerometer [X]]</li><li>Wait [0.1] seconds</li></ul></ul><br/>You'll need to create the <i>numSamples</i> and <i>sampleCounter</i> variables.<br/><br/>What do you think this code will do?"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-3`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },
            /* STEP 4 - try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br/><br/>Press the green flag to run the code, and then move cog around<br/><br/>You'll see the ax list being updated every 0.1 seconds with the latest reading (or <i>sample</i>) from the accelerometer x-axis.<br/><br/>Each new sample in the ax list replaces the oldest one, and we use the <i>mod</i> operator to ensure that the <i>sampleCounter</i> variable loops around from the end of the list back to the beginning of it."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-4`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },
            /* STEP 5 - determine cog movement */
            {
                type: "info",
                image: `${BUCKET_URL}step-5.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We need a way to determine whether the data we’ve collected shows if cog is moving or not.<br/><br/>One simple way of doing that is to look at how much it is changing - movement should mean acceleration, which the accelerometer will measure.<br/><br/>We'll make a new block called <i>get range</i>, which will figure out how much the data in the ax list varies.<br/><br/>Add these blocks:<ul><li>Define [get range]</li><li>Set [rangeCounter] to [0]</li><li>Set [min] to [item [1] of [ax]]</li><li>Set [max] to [item [1] of [ax]]</li><li>Repeat [length of [ax]]</li><ul><li>Change [rangeCounter] by [1]</li><li>Set [sample] to [item [rangeCounter] of [ax]]</li><li>If [[sample] < [min]] then</li><ul><li>Set [min] to [sample]</li></ul><li>If [[sample] > [max]] then</li><ul><li>Set [max] to [sample]</li></ul><li>Set [result] to [[max] - [min]]</li></ul></ul><br/>This function will now iterate through the entire ax list one sample at a time, and pick out the minimum and maximum values.<br/>At the end, it’ll set the result variable to the difference between the two.<br/>More movement will mean that a bigger range of values is recorded."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-5`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },
            /* STEP 6 - classify movement */
            {
                type: "info",
                image: `${BUCKET_URL}step-6.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s add blocks to interpret that range and classify it as motion or not.<br/><br/>Add these blocks:<ul><li>When green flag clicked</li><li>Set [motionThreshold] to [0.2]</li><li>Forever</li><ul><li>Wait [1] seconds</li><li>Get range</li><li>If [[result] > [motionThreshold]] then</li><ul><li>Set [motionDetected] to true</li></ul><li>Else</li><ul><li>Set [motionDetected] to false</li></ul></ul></ul><br/>Here we’ve defined a threshold - a value which we’re comparing the range of accelerometer samples against. If the range is higher than this threshold we’ll say that we’ve detected motion, and if not then we’ll say that we haven’t."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-6`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
            },
            /* STEP 7 - try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br/>Now once every second the program will look at the list of samples from the accelerometer and determine whether it thinks there’s been movement or not.<br/><br/>It takes the 10 individual accelerometer readings (or samples) and works out a single true or false detection for movement.<br/><br/>We could change the variables we’ve set to adjust this behaviour.<br/><br/>For example, we could change the <i>motionThreshold</i> to make the program more or less sensitive to movements.<br/><br/>We could also change the <i>numSamples</i> to vary how long a snapshot of movement we’re looking at each time. With 10 samples taken at 0.1 second intervals we’re looking to see if there’s been movement over the last 1 second, but if you increased <i>numSamples</i> it would check for movement over a longer window."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-7`}
                >
                    {(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}
                </FormattedMessage>
            },
            /* STEP 8 */
            {
                type: "info",
                image: `${BUCKET_URL}step-8.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Ok, so we’ve built a program that will try and determine, second by second, whether cog has been moved at all.<br/><br/>Let’s do more with that data!<br/><br/>It would be good to determine whether we think a minute has been active or not in general.<br/><br/>To do that, let’s count the number of active seconds in every minute.<br/><br/>Add a new variable called <i>activeSecondsThreshold</i> and a <i>set [activeSecondsThreshold] to [30]</i> block just after the <i>set [motionThreshold]</i> block and before the forever loop."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-8`}
                >
                    {(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}
                </FormattedMessage>
            },
            /* STEP 9 */
            {
                type: "info",
                image: `${BUCKET_URL}step-9.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add another variable called activeSeconds<br/>Just inside that <i>forever</i> loop, add a <i>set [activeSeconds] to [0]</i> block, and then a <i>repeat [60]</i> block that surrounds the rest of the code in the forever loop."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-9`}
                >
                    {(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}
                </FormattedMessage>
            },
            /* STEP 10 */
            {
                type: "info",
                image: `${BUCKET_URL}step-10.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Inside the <i>if [[result] > [motionThreshold] then</i> conditional, add a <i>change [activeSeconds] by [1]</i> block<br/>With this code, we’ll be counting how many seconds out of every 60 we think are active."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-10`}
                >
                    {(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}
                </FormattedMessage>
            },
            /* STEP 11 */
            {
                type: "info",
                image: `${BUCKET_URL}step-11.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Make a new list called activeMinutes<br/>Just after the <i>repeat [60]</i> loop (but still inside the forever loop), add these blocks:<ul><li>If [[activeSeconds] > [activeSecondsThreshold]] then</li><ul><li>Add [true] to [activeMinutes]</li></ul><li>Else</li><ul><li>Add [false] to [activeMinutes]</li></ul></ul><br/>Now, after every 60 seconds - so once a minute - we’ll compare the total number of active seconds in that minute to the <i>activeSecondThreshold</i> variable, to classify whether we think that minute as a whole has been active or not."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-11`}
                >
                    {(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}
                </FormattedMessage>
            },
            /* STEP 12 */
            {
                type: "info",
                image: `${BUCKET_URL}step-12.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s not forget to clear the <i>activeMinutes</i> list at the start of the program!<br/>Add a <i>delete all of [activeMinutes]</i> block after the <i>set [activeSecondsThreshold]</i> block<br/>You should always remember to reset all your variables and lists at the start of a program - this is called initialising your variables, and if you forget to do it that’s another place where bugs can come in!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-12`}
                >
                    {(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}
                </FormattedMessage>
            },
            /* STEP 13 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br/><br/>Every time motion is detected for more than 30 seconds during each 60 second window, that minute will be recorded as true in the <i>activeMinutes</i> list.<br/><br/>Otherwise, a <i>false</i> will be recorded."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-13`}
                >
                    {(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}
                </FormattedMessage>
            },
            /* STEP 14 */
            {
                type: "info",
                image: `${BUCKET_URL}step-14.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s get some other useful information to show to the user<br/>Make two new variables called <i>totalActiveSeconds</i> and <i>totalSeconds</i><br/>Initialise them both by setting them to 0 at the start of the program"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-14`}
                >
                    {(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}
                </FormattedMessage>
            },
            /* STEP 15 */
            {
                type: "info",
                image: `${BUCKET_URL}step-15.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Can you think where you should add blocks to increase these new variables?<br/><br/>One potential place is as shown here, where <i>totalActiveSeconds</i> is increased every time <i>activeSeconds</i> is increased, and <i>totalSeconds</i> is increased every iteration of the <i>repeat [60]</i> loop."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-15`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 16 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br/>Now the program will also record the proportion of active seconds."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-16`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 17 */
            {
                type: "info",
                image: `${BUCKET_URL}step-17.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s report some of this information in a more user-friendly way.<br/><br/>Add a <i>broadcast [report stats]</i> block just before the end of the <i>forever</i> loop."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-17`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 18 */
            {
                type: "info",
                image: `${BUCKET_URL}step-18.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a new sprite — you can pick any one you like. In this example we’ve picked a robot."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-18`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 19 */
            {
                type: "info",
                image: `${BUCKET_URL}step-19.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks:<ul><li>When I receive [report stats]</li><li>Say [join [join [join [join [You have been active for ] [totalActiveSeconds]] [ out of ]] [totalSeconds]] [ seconds]] for [5] seconds</li><li>Say [join [join [That is [round [[[totalActiveSeconds] / [totalSeconds]] * 100]]] [% of the time]] for [5] seconds</li></ul><br/>Now, once a minute the sprite will tell the user how active they’ve been and what that is as a percentage of the time that’s passed."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-19`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 20 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-20`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 21 */
            {
                type: "info",
                image: `${BUCKET_URL}step-21.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks:<ul><li>Set [minuteCounter] to [0]</li><li>Set [totalActiveMinutes] to [0]</li><li>Repeat [length of [activeMinutes]]</li><ul><li>Change [minuteCounter] by [1]</li><li>If [[item [minuteCounter] of [activeMinutes]] = [true]] then</li><ul><li>Change [totalActiveMinutes] by [1]</li></ul></ul><li>Say [join [join [join [join [And] [totalActiveMinutes]] [ out of ]] [length of [activeMinutes]]] [ minutes]] for [5] seconds</li><li>Say [join [join [That’s] [[round [[[totalActiveMinutes] / [length of [activeMinutes]] * 100]]] [% of the minutes]] for [5] seconds</li></ul><br/>Now the sprite will also say how many of the minutes we’ve classified as active."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-21`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 22 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br/><br/>You will probably find that the two percentages reported differ from each other — that’s down to the two different ways that we grouped and classified the data.<br/><br/>Every time someone programs a system to convert lots of individual readings into simpler statistics, they have to make decisions about how to do it — it’s our job as programmers to try and make sure the summary is as accurate as possible and not misleading."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-22`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 23 */
            {
                type: "info",
                image: `${BUCKET_URL}step-23.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"The percentage of active seconds definitely feels like a more accurate summary of how active our user has been overall, but that doesn’t mean that the list of active minutes isn’t useful. It’s a more pessimistic estimate of activity, but it does show if someone isn’t moving around much.<br/><br/>Let’s add something to prompt the user to get some exercise if they haven’t moved much in the last 5 minutes.<br/><br/>Add these blocks:<ul><li>If [[length of [activeMinutes]] > [4]] then</li><ul><li>Set [totalActiveMinutes] to [0]</li><li>Repeat [5]</li><ul><li>If [[item [minuteCounter] of [activeMinutes]] = [true]] then</li><ul><li>Change [totalActiveMinutes] by [1]</li></ul><li>Change [minuteCounter] by [-1]</li></ul><li>If [[totalActiveMinutes] = [0]] then</li><ul><li>Broadcast [signal user]</li><li>Say [You haven’t moved much in the last 5 minutes]</li></ul></ul></ul><br/>After reading out the main stats, the code will check whether there are at least 5 minutes recorded in the <i>activeMinutes</i> list.<br/>If there are, it will step backwards through the 5 most recent minutes in the list, and count how many of them were active minutes.<br/>If none of them were, then the <i>signal user</i> message will be sent, and the sprite will let the user know that they haven’t been moving much."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-23`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 24 */
            {
                type: "info",
                image: `${BUCKET_URL}step-24.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Change back to Cog."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-24`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 25 */
            {
                type: "info",
                image: `${BUCKET_URL}step-25.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add these blocks:<ul><li>When I receive [signal user]</li><li>Repeat [3]</li><ul><li>Set [ring] LEDs to [red]</li><li>Play note [A5] for [0.5] seconds</li><li>Set [ring] LEDs to [white]</li><li>Wait [0.5] seconds</li></ul><li>Turn off all LEDs</li></ul><br/>Now Cog will also beep and light up to let the user know that they should move around more."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-25`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 26 */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br/>Put cog in your pocket and leave your code running while you do some other work or play — see what it reports."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-26`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 27 */
            {
                type: "end",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Well done!<br/>You’ve turned cog into a fitness tracker!<br/>It will measure how active you are, and remind you to move around if you’re stationary for too long.<br/><br/>In real life, sitting still for 5 minutes is definitely ok, but it is important to stay active and move regularly.<br/><br/>How much of the day do you think you should be active for? And how frequently?<br/><br/>You learned about how to collect and analyse data, and classify it from a large set of samples into a simple true or false measurement of activity. For every minute, 600 measurements were taken from the accelerometer, and we reduced all that down into a single note on whether that minute was active or not.<br/><br/>Think about the other software and systems that make decisions and classifications. What kinds of decisions did the programmers have to make when designing them, and what could potentially go wrong?<br/><br/><b>Next steps<ul><li>Think about whether you would change any of the various thresholds and other variables that control the behaviour of our fitness tracker.</li><li>Think about what other summary stats you’d like your fitness tracker to report, and how you might calculate them.</li></ul>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-14.step-27`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

        ]
    }
}

export default cogBlocksTutorial14;