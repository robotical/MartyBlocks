import React from "react";
import logic1 from "../static/logic1.png";
import logic2 from "../static/logic2.png";
import logic3 from "../static/logic3.png";

import mainStyles from "./categories-styles.css";

const Logic = () => {
  return (
    <div className={mainStyles.outerContainer}>
      <h2 className={mainStyles.title}>If you get 0 points...</h2>
      <p className={mainStyles.paragraph}>
        The most basic block you can start working logical thinking is this:
      </p>
      <img className={mainStyles.image} src={logic1} alt="scratch-img" />
      <p className={mainStyles.paragraph}>
        How this block works? When execution reaches this point, the condition
        on the block is evaluated, and if this is true, the set of blocks that
        are within the if executed. In the example, if the character is touching
        the blue color, he says 'I reached the goal.'
      </p>
      <h2 className={mainStyles.title}>If you get 1 points...</h2>
      <p className={mainStyles.paragraph}>
        Now that you know the instructions if, perhaps you can start using
        blocks if / else, which can be very practical in many types of projects.
        The blocks if / else are very similar to the block if, but contain two
        sets of blocks inside.
      </p>
      <img className={mainStyles.image} src={logic2} alt="scratch-img" />
      <p className={mainStyles.paragraph}>
        How this block works? When execution reaches this point, the condition
        on the block is evaluated, and if this is true, the set of blocks that
        are within the 'if' is executed, but if the condition is false, then the
        set of blocks that are within the 'else' is executed. In the example, if
        the character is touching the blue color, he says 'I reached the goal!',
        but ,if you are not touching the purple color, says 'I have not reached
        the goal'.
      </p>
      <h2 className={mainStyles.title}>If you get 2 points...</h2>
      <p className={mainStyles.paragraph}>
        To make decisions on some projects sometimes is necessary to evaluate
        more than one condition at the same time to know what to execute. In
        these situations it is very helpful to use logical operations that
        combine the conditions. Logical operations are available in Scratch AND,
        OR and No.
      </p>
      <img className={mainStyles.image} src={logic3} alt="scratch-img" />
      <p className={mainStyles.paragraph}>
        The operation AND is true when both conditions are true evaluated. The
        OR operation is true when one of two conditions are true evaluated. And
        the operation otherwise not worth the condition, ie, if the condition is
        true, not returns false and vice versa.
      </p>
    </div>
  );
};

export default Logic;