import React from 'react';
import { FormattedMessage } from 'react-intl';


const BUCKET_URL = "https://content.robotical.io/static/tutorials/cog/blocks/9/";

const cogBlocksTutorial9 = {
    'type-lesson-cog-tutorial-9': {
        id: "type-lesson-cog-tutorial-9",
        name: <FormattedMessage
            defaultMessage={"Trundle Wheel"}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.name`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        type: "lesson",
        urlId: "cog-blocks-9",
        description: <FormattedMessage
            defaultMessage={"Let’s make a trundle wheel!<br /><br />This is a special wheel that will keep track of how far it’s rolled!"}
            isRaw={true}
            description=""
            id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.description`}
            values={{}}
        >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
        img: `${BUCKET_URL}cover_image.png`,
        internetConnectionRequired: true,
        collaborator: 'Robotical',
        tags: ['cog', 'trundle wheel', 'angles', 'measurement', 'geometry', 'trigonometry', 'lists'],
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
                    defaultMessage={"In previous activities we’ve seen how we can use the accelerometer on Cog to measure which direction Cog is tilting in.<br /><br />We can also use this sensor to figure out the angle that Cog is at.<br /><br />We’ll use that to turn Cog into a trundle wheel - that’s a device for measuring distances by rolling a wheel along them."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-1`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>,
                expectedCode: [],
            },

            /* STEP 2 -- add when green flag clicked and forever loop */
            {
                type: "info",
                image: `${BUCKET_URL}step-2.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>when green flag clicked</b> block and a <b>forever</b> loop."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-2`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },

            /* STEP 3 -- make angle variable */
            {
                type: "info",
                image: `${BUCKET_URL}step-3.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Make a variable called <i>angle</i>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-3`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 4 -- set angle to atan2 of Y and X */
            {
                type: "info",
                image: `${BUCKET_URL}step-4.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"<b>Set</b> the <b>angle</b> to <b>atan2</b> of [Accelerometer [Y]] and [Accelerometer [X]].<br /><br />You can find the <b>atan2</b> block in the operators category."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-4`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 5 -- explain atan2 */
            {
                type: "info",
                image: `${BUCKET_URL}step-5.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Atan2 is a mathematical function that uses trigonometry to work out the angle inside a right angled triangle when given the lengths of the adjacent and opposite legs.<br /><br />Here, we’re putting in the Y axis and X axis acceleration, which are perpendicular to each other (at 90 degrees), and the atan2 function will tell us the angle."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-5`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 6 -- try it out */
            {
                type: "info",
                video: `${BUCKET_URL}step-6.mp4`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Press the green flag and then hold Cog vertically with the yellow arrow pointing up, and rotate it around like a steering wheel."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-6`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 7 -- explain angle */
            {
                type: "info",
                video: `${BUCKET_URL}step-7.webm`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"As you rotate Cog clockwise you’ll see that the angle changes from 0 degrees when cog is pointing up, up to 180 degrees when cog is pointing down.<br /><br />It will then jump to -180 degrees, before increasing back to 0 degrees as you continue rotating clockwise."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-7`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 8 -- add if statement to change angle */
            {
                type: "info",
                image: `${BUCKET_URL}step-8.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"For our trundle wheel we’d prefer if it counted up from 0 to 360 degrees.<br /><br />Add these blocks inside the <b>forever loop</b>:<ul><li><b>If</b> [[angle] < [0]] then</li><ul><li>Change [angle] by [360]</li></ul></ul><br />Now instead of -180 degrees, our angle will be set to +180 degrees.<br /><br />It’ll keep increasing from there up to 360, and then loop back around to 0 degrees."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-8`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 9 -- try it out */
            {
                type: "info",
                video: `${BUCKET_URL}step-9.webm`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Now when you rotate cog the angle will go from 0-360 and then loop around.<br /><br />This maths works because 360 degrees is a full turn so when we add an extra 360 degrees to the rotation we end up pointing the same way, but now with a positive angle that will be easier to deal with as we count revolutions."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-9`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 10 -- add sprite */
            {
                type: "info",
                image: `${BUCKET_URL}step-10.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s add a sprite on screen to show the rotation of Cog.<br /><br />From the <i>Choose a Sprite</i> menu select the <i>paint</i> option."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-10`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 11 -- draw cog sprite */
            {
                type: "info",
                image: `${BUCKET_URL}step-11.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s draw a sprite to represent Cog!<br /><br />Start off by adding a circle, and then use the line tool to make a hexagon around it.<br /><br />The circle is just a guide to help us get the hexagon right - don’t worry if your hexagon isn’t perfect!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-11`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 12 -- add button */
            {
                type: "info",
                image: `${BUCKET_URL}step-12.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Delete the circle, and replace it with a smaller circle in the middle to represent the button on Cog."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-12`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 13 -- add triangle */   
            {
                type: "info",
                image: `${BUCKET_URL}step-13.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"And finally draw a triangle using the Line tool, and color it yellow."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-13`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 14 -- go back to code */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Click the <i>Code</i> tab to go back to the coding screen."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-14`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 15 -- add code to sprite */
            {
                type: "info",
                image: `${BUCKET_URL}step-15.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"With the sprite selected, add these blocks:<ul><li>When green flag clicked</li><li>Forever</li><ul><li>Point in direction [angle]</li></ul>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-15`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 16 -- try it out */
            {
                type: "info",
                video: `${BUCKET_URL}step-16.webm`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Press the green flag and then rotate cog - you’ll see the sprite rotate too!<br /><br />There’s a problem though - the sprite is 90 degrees off from Cog - that’s because the Blocks interface counts point left as being 0 degrees, whereas we’re treating pointing up as being 0 degrees."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-16`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 17 -- fix sprite angle */
            {
                type: "info",
                image: `${BUCKET_URL}step-17.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"To convert between these different conventions, change the code to add 90 degrees to the angle.<br /><br />Try it again and the movement of the cog sprite will match that of your real life cog!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-17`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 18 -- select cog */
            {
                type: "info",
                image: `${BUCKET_URL}step-18.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Select Cog again."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-18`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 19 -- add LED blocks */
            {
                type: "info",
                image: `${BUCKET_URL}step-19.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s add an LED on Cog to show that the rotation sensing is working.<br /><br />Add 2 new variables called <i>LED</i> and <i>lastLED</i>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-19`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
          
           /* STEP 20 -- set LED variable */
            {
                type: "info",
                image: `${BUCKET_URL}step-20.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Our angle variable is telling us a rotation from 0 to 360 degrees, but we only have 12 LEDs around the ring on cog.<br /><br />That means the resolution will be 30 degrees per LED, since 360 degrees / 12 LEDs = 30 degrees / LED.<br /><br />Add these blocks inside the <b>forever loop</b>:<ul><li>Set [LED] to [[round [angle]/[30]] mod [12]]</li></ul><br />We divide the angle by 30 to get a number between 0 and 12, and then round it since we need a whole number (or integer) to specify which LED we’ll light up.<br /><br />Then, since our LEDs are only numbered from 0 to 11, we use the mod block like we did in the clock activity. This is the <i>modulus operator</i> and returns the remainder when the two numbers are divided - so instead of getting a number 12 for the LED id, we’ll get a 0 again instead - which is what we want because LED 0 is at the 12 o’clock position on cog."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-20`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 21 -- if statement for LED */
            {
                type: "info",
                image: `${BUCKET_URL}step-21.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now add these blocks inside the <b>forever loop</b> as well:<ul><li>If [not [[LED] = [lastLED]]] then</li><ul><li>Set LED [LED] to [blue]</li><li>Set LED [lastLED] to [black]</li><li>Set [lastLED] to [LED]</li></ul></ul><br />Can you figure out how that new section of code works and what it will do?<br /><br />We’re using the LED and lastLED variables to keep track of which LED is lit, and whether we need to change it. When the value of LED changes from one iteration of the loop to the next, the condition in the if statement will be true.<br /><br />When that happens, we turn on the new LED, and turn off the old one (by setting it to black, which is the same as being off for a light). Finally, we update the lastLED variable so that it’s set for the next time around the loop."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-21`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 22 -- try it out */
            {
                type: "info",
                video: `${BUCKET_URL}step-22.mp4`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Press the green flag and then rotate cog.<br /><br />You’ll notice that something funny is happening! Sometimes the LED that’s on is at the top, and sometimes it’s at the bottom!<br /><br />That’s a bit confusing, and not what we were going for."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-22`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 23 -- fix LED direction */
            {
                type: "info",
                image: `${BUCKET_URL}step-23.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"If you think about it, that’s because the LED is rotating clockwise at the same time as we’re rotation cog clockwise.<br /><br />What we actually want, for the LED to always be at the bottom of cog, is for it to rotate in the opposite direction to how we’re rotating cog.<br /><br />How could we make that happen?<br /><br />Change your code so that it says <b>set [LED] to [[round [[360] - [angle]] / [30]] mod [12]]</b>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-23`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 24 -- try it out */
            {
                type: "info",
                video: `${BUCKET_URL}step-24.mp4`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Now when you rotate cog, the LED will always be at the top!<br /><br />When we subtract the [angle] variable from 360, what we’re effectively doing is flipping which direction we’re rotating around the circle.<br /><br />For example, if we rotate 10 degrees clockwise from 0, we’ll be at 10 degrees. If we rotate 10 degrees anticlockwise from 0, we’ll be at 350 degrees."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-24`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 25 -- fix LED position */
            {
                type: "info",
                image: `${BUCKET_URL}step-25.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"That’s pretty close, but it’s still not quite what we were going for. It would be more intuitive if the LED was at the bottom of cog, rather than the top.<br /><br />How could we do that?<br /><br />Basically we need to add 6 to the LED variable - and just like adding 6 hours will rotate the hour hand halfway around a clock face, adding 6 to the LED variable will rotate halfway around the ring of 12 LEDs.<br /><br />We will be relying on the mod operator to loop the numbers around from 11->0."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-25`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },  
            /* STEP 26 -- try it out */
            {
                type: "info",
                video: `${BUCKET_URL}step-26.mp4`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Now when you rotate cog the LED that’s on will be at the bottom."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-26`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 27 -- reset distance */
            {
                type: "info",
                image: `${BUCKET_URL}step-27.jpg`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Ok! Now we’ve got some good user feedback that the rotation sensing is working, let’s make cog measure distance!<br /><br />For this next bit, you’ll need a card circle - this will be our wheel."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-27`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 28 -- trace around cog */
            {
                type: "info",
                image: `${BUCKET_URL}step-28.jpg`,
                additionalContent: {
                    images: [`${BUCKET_URL}step-28_2.jpg`, `${BUCKET_URL}step-28_3.jpg`, `${BUCKET_URL}step-28.jpg`],
                    videos: [],
                },
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Trace around the upper face of cog, and then cut out a hexagon in the middle of the circle.<br /><br />(you don’t need to be perfectly in the middle)<br /><br />Measure the diameter of your circle.<br /><br />The one here is about 200mm diameter, which means the radius is 100mm."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-28`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 29 -- set radius and circumference */
            {
                type: "info",
                image: `${BUCKET_URL}step-29.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Let’s plug that number into our program.<br /><br />Make two new variables called <i>radius</i> and <i>circumference</i>.<br /><br />Add new blocks to set them before the forever loop:<ul><li>Set [radius] to [100]</li><li>Set [circumference] tp [2] * [[3.14] * [radius]]]</li></ul><br />Replace the 100 there with whatever the radius of your wheel is.<br /><br />We’ll be measuring the distance covered as the wheel turns, where each revolution of the wheel will cover a distance equal to the circumference of the wheel.<br /><br />Remember that the circumference is equal to 2 * pi * radius. Here we’re approximating pi as 3.14."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-29`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 30 -- make more variables */
            {
                type: "info",
                image: `${BUCKET_URL}step-30.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We’ll need a few more variables to help us calculate the distance travelled.<br /><br />Make these new variables:<ul><li>lastAngle - we’ll use that to track what the angle was the last time around the forever loop, like we did with the lastLED variable</li><li>revolutions - we’ll use that to keep track of how many complete revolutions there have been of the wheel</li><li>totalRotation - we’ll add up the complete and partial revolutions to get the total amount rotated in degrees</li><li>distance - we’ll convert that total rotation into a distance</li></ul>"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-30`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 31 -- if statement for revolutions */
            {
                type: "info",
                image: `${BUCKET_URL}step-31.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"To let us count the number of revolutions, we’ll need to keep track of when the angle changes from 360 -> 0, and vice versa.<br /><br />We’ll use the lastAngle variable for this. When the angle goes from 360 to 0 degrees the result of [angle] - [lastAngle] will be -360.<br /><br />In practice our measurement will probably jump from something like 355 -> 5 degrees.<br /><br />Add these blocks inside the <b>forever loop</b>:<ul><li>If [[angle] - [lastAngle] < [-180]] then</li><ul><li>Change [revolutions] by [1]</li></ul></ul><br />So, if the angle decreases by a lot (180 degrees or more) suddenly, we’ll know that we should add 1 to the revolutions count."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-31`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 32 -- if statement for reverse revolutions */
            {
                type: "info",
                image: `${BUCKET_URL}step-32.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We also need to track revolutions in the opposite direction. When that happens, the angle will jump from 0 -> 360 degrees.<br /><br />Add these blocks inside the <b>forever loop</b>:<ul><li>If [[angle] - [lastAngle]] > [180]] then</li><ul><li>Change [revolutions] by [-1]</li></ul></ul><br />That means that if the angle jumps up a lot suddenly, we’ll decrease the revolutions count by 1."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-32`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 33 -- set last angle */
            {
                type: "info",
                image: `${BUCKET_URL}step-33.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Add a <b>set [lastAngle] to [angle]</b> block inside the <b>forever loop</b>.<br /><br />That will get the lastAngle variable ready for the next time around the loop."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-33`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 34 -- set total rotation */
            {
                type: "info",
                image: `${BUCKET_URL}step-34.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now it’s time to work out the distance the wheel has rolled!<br /><br />Add this block inside the <b>forever loop</b>:<ul><li>Set [totalRotation] to [[[revolutions] * [360]] + [[angle]]]</li></ul><br />This will add 360 degrees for every rotation to the current angle measurement, to get the total rotation."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-34`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 35 -- set distance */
            {
                type: "info",
                image: `${BUCKET_URL}step-35.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Now add this block:<ul><li>Set [distance] to [[[totalRotation] / [360]] * [circumference]]</li></ul><br />The totalRotation variable gives the total rotation in degrees, so by dividing it by 360 we get the number of revolutions as a rational number - one that can have things after the decimal point rather than just whole numbers.<br /><br />Multiplying that by the circumference tells us the total distance the wheel has rolled!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-35`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 36 -- try it out */
            {
                type: "info",
                image: `${BUCKET_URL}step-36.jpg`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Put cog inside the cardboard wheel and try rolling it along!"}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-36`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html:   nodes }} />}</FormattedMessage>
            },
            /* STEP 37 -- reset button */
            {
                type: "info",
                image: `${BUCKET_URL}step-37.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"It would be great to have a way to easily reset the distance counter.<br /><br />Add these blocks:<ul><li>On button press</li><li>Set [distance] to [0]</li><li>Set [revolutions] to [0]</li><li>Set [startingAngle] to [angle]</li><li>Set [lastAngle] to [angle]</li></ul><br />You’ll need to make a new variable called <i>startingAngle</i>.<br /><br />We’ll use that to make sure that we can start counting from whatever angle cog is at when you push the button, not just when cog is pointing up."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-37`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 38 -- set total rotation */
            {
                type: "info",
                image: `${BUCKET_URL}step-38.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"We’ll need to factor the startingAngle into our calculation of the total rotation, by subtracting it from the current angle.<br /><br />Change the block that sets the totalRotation variable to:<ul><li>Set [totalRotation] to [[[revolutions] * [360]] + [[angle] - [startingAngle]]]</li></ul><br />This will subtract the starting angle from the current angle, so that we can start counting from whatever angle cog is at when you push the button."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-38`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 39 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />Get a ruler and put your cog trundlewheel next to it at the 0 mark.<br /><br />Push the button to reset cog, and then rotate the wheel along the ruler - you should find that the distance variable keeps track of how far you’ve rolled."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-39`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 40 -- make a list */
            {
                type: "info",
                image: `${BUCKET_URL}step-40.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"You might have noticed that in the last video there was a list of distances.<br /><br />To make that, click the <b>Make a List</b> button and make a list called <i>distances</i>."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-40`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 41 -- add distance to list */
            {
                type: "info",
                image: `${BUCKET_URL}step-41.png`,
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Then, add an <b>add [distance] to [distances]</b> block just after the on button press block."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-41`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 42 -- try it out */
            {
                type: "info",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Try it out!<br /><br />You can measure distances and push the button to record them into the list to look at when you get back to your screen."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-42`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            },
            /* STEP 43 -- congratulations */
            {
                type: "end",
                description: <FormattedMessage
                    isRaw={true}
                    defaultMessage={"Well done!<br /><br />You’ve learned how to turn cog into a device for measuring distances! In real life, trundle wheels are used to measure long distances, and you get ones with handles that you can roll along.<br /><br />You used some maths to convert the diameter that you measured into a radius and then a circumference, and used that along with the angle measurement to calculate the distance.<br /><br />You thought a lot about angles, and used a variable to keep track of how the angle of cog was changing, and conditionals to record how the number of total revolutions changed."}
                    description=""
                    id={`gui.howtos.lessons.type-lesson-cog-tutorial-9.step-43`}
                >{(nodes) => <span dangerouslySetInnerHTML={{ __html: nodes }} />}</FormattedMessage>
            }
        ]
    }
}

export default cogBlocksTutorial9;
