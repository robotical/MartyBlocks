import React from "react";
import interactivity1 from "../static/interactivity1.png";
import interactivity2 from "../static/interactivity2.png";
import interactivity3 from "../static/interactivity3.png";

import mainStyles from "./categories-styles.css";

const UserInteractivity = () => {
  return (
    <div className={mainStyles.outerContainer}>
      <h2 className={mainStyles.title}>If you get 0 points...</h2>
      <p className={mainStyles.paragraph}>
        The most basic block you can start working interactivity with the user
        is 'when green flag clicked'.
      </p>
      <img
        className={mainStyles.image}
        src={interactivity1}
        alt="scratch-img"
      />
      <p className={mainStyles.paragraph}>
        How this block works? When the user who wants to run your project
        Scratch clicks on the green flag, all blocks were placed under the block
        'when green flag clicked' begin to run. You can have as many programs as
        you need to start with this block.
      </p>
      <h2 className={mainStyles.title}>If you get 1 points...</h2>
      <p className={mainStyles.paragraph}>
        Now that you have begun to interact with the user running your Scratch
        project, perhaps you can try some of the following blocks:
      </p>
      <img
        className={mainStyles.image}
        src={interactivity2}
        alt="scratch-img"
      />
      <p className={mainStyles.paragraph}>
        As you see, you can allow users to interact with your characters by
        pressing keys to move, writing answers to questions and your characters
        use user responses, move characters with the mouse, or perform actions
        when the user clicks an object.
      </p>
      <h2 className={mainStyles.title}>If you get 2 points...</h2>
      <p className={mainStyles.paragraph}>
        One of the funniest Scratch possibilities in terms of user interactivity
        is the possibility that the user can use your webcam or microphone to
        interact with characters from Scratch or sound to trigger certain
        actions.
      </p>
      <img
        className={mainStyles.image}
        src={interactivity3}
        alt="scratch-img"
      />
      <p className={mainStyles.paragraph}>
        As you can see in the examples, we can make certain sets of blocks are
        executed when the ambient sound captured by the microphone is greater
        than a certain threshold, or when video motion occurs over an object or
        background. The possibilities of these blocks are very large and allows
        your creations Scratch are fully interactive with users.
      </p>
    </div>
  );
};

export default UserInteractivity;
