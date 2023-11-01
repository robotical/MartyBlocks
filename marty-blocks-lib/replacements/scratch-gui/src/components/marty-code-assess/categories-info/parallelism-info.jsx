import React from "react";
import parallelism1 from "../static/parallelism1.png";
import parallelism2 from "../static/parallelism2.png";
import parallelism3 from "../static/parallelism3.png";

import mainStyles from "./categories-styles.css";

const Parallelism = () => {
  return (
    <div className={mainStyles.outerContainer}>
      <h2 className={mainStyles.title}>If you get 0 points...</h2>
      <p className={mainStyles.paragraph}>
        The most basic and most obvious way to achieve parallelism is to have
        several programs that start with 'When green flag is clicked':
      </p>
      <img className={mainStyles.image} src={parallelism1} alt="scratch-img" />
      <p className={mainStyles.paragraph}>
        Thus, when the user clicking on the green flag, all programs that start
        with this block would begin to run simultaneously, or in parallel, as
        can also be said. You could have several programs that start with this
        block in the same character, if you want it to do several things at
        once, or in programs of different characters, if you want everyone to
        undertake an action at beginning of execution.
      </p>
      <h2 className={mainStyles.title}>If you get 1 points...</h2>
      <p className={mainStyles.paragraph}>
        Another way to achieve parallelism in your program is doing several
        things occur when the user presses a key or clicks on an object.
        Consider a couple of examples:
      </p>
      <img className={mainStyles.image} src={parallelism2} alt="scratch-img" />
      <p className={mainStyles.paragraph}>
        How these blocks works? In the first example, we see two different
        characters that, when a key is pressed, perform a certain action.
        Therefore, when the user press the a key, in this case, both the cat and
        the child run at the same time 'say A for 2 seconds' In the second
        example we see that a character has two programs that begin with 'when
        clicking this object'. Therefore, when the user clicks on this
        character, both programs will begin to run simultaneously, in parallel.
      </p>
      <h2 className={mainStyles.title}>If you get 2 points...</h2>
      <p className={mainStyles.paragraph}>
        There are several events more that can achieve parallelism:
      </p>
      <img className={mainStyles.image} src={parallelism3} alt="scratch-img" />
      <p className={mainStyles.paragraph}>
        As you see, you could create several programs that begin to run when
        changing the background to a given scenario, or to receive a particular
        message, or when the room volume exceeds a certain threshold, when the
        video motion is greater than a number pixel concrete or when the timer
        has exceeded the value you want. Therefore, there are many possibilities
        to make things happen in your programs simultaneously. Do you dare to
        investigate how works?
      </p>
    </div>
  );
};

export default Parallelism;