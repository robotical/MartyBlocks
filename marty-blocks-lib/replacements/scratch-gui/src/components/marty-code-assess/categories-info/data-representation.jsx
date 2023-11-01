import React from "react";
import dataRepresentation1 from "../static/dr1.png";
import dataRepresentation2 from "../static/dr2.png";
import dataRepresentation3 from "../static/dr3.png";
import dataRepresentation4 from "../static/dr4.png";
import dataRepresentation5 from "../static/dr5.png";
import dataRepresentation6 from "../static/dr6.png";
import dataRepresentation7 from "../static/dr7.png";
import dataRepresentation8 from "../static/dr8.png";

import mainStyles from "./categories-styles.css";

const DataRepresentation = () => {
  return (
    <div className={mainStyles.outerContainer}>
      <h2 className={mainStyles.title}>If you get 0 points...</h2>
      <p className={mainStyles.paragraph}>
        Each character of a Scratch project has a number of features, or
        attributes, that every moment of the project have value, and can be
        modified by programs. For example, a character has a certain size that
        can be modified by block 'resize for 10', making the character appear
        slightly larger. Following is the list of attributes that each character
        and blocks that can be used to modify:
      </p>
      <p className={mainStyles.paragraph}>Position: </p>
      <img
        className={mainStyles.image}
        src={dataRepresentation1}
        alt="scratch-img"
      />
      <p className={mainStyles.paragraph}>Size: </p>
      <img
        className={mainStyles.image}
        src={dataRepresentation2}
        alt="scratch-img"
      />
      <p className={mainStyles.paragraph}>Orientation: </p>
      <img
        className={mainStyles.image}
        src={dataRepresentation3}
        alt="scratch-img"
      />
      <p className={mainStyles.paragraph}>Costume: </p>
      <img
        className={mainStyles.image}
        src={dataRepresentation4}
        alt="scratch-img"
      />
      <p className={mainStyles.paragraph}>Visibility: </p>
      <img
        className={mainStyles.image}
        src={dataRepresentation5}
        alt="scratch-img"
      />
      <h2 className={mainStyles.title}>If you get 1 points...</h2>
      <p className={mainStyles.paragraph}>
        In addition to modifying the attributes of the characters, programmers
        can use other mechanisms to store information on a Scratch project. One
        of these mechanisms are variables that can store a value to store
        different types of data that may need: at what level we are, how many
        lives you have left, how many points we, how is called the user ... To
        create a variable you have to go to the category of data, click on
        'Create a variable' and give a name. In the example shown below we have
        given the name 'Points' as use it to store the number of points you get
        our character.
      </p>
      <img
        className={mainStyles.image}
        src={dataRepresentation6}
        alt="scratch-img"
      />
      <p className={mainStyles.paragraph}>
        In the program of the top, we assign the number of points that we want
        the character has to the beginning of the game, in this case 0, for
        which we use the block 'fixing points at 0'. However in the program of
        the right, what we do is that when the character touches the blue color,
        that could be a target, you will add a point, for which we use the block
        'change Points by 1'. In this case, the block 'change' would check the
        current value of the variable points would add 1: If set to 0, I add 1
        and is now worth 1; when set to 1, I add 1 and is now worth 2 ...
      </p>
      <h2 className={mainStyles.title}>If you get 2 points...</h2>
      <p className={mainStyles.paragraph}>
        In addition to the variables, Scratch lets you use another data type to
        store project information: The lists. The lists can store more than one
        value at the same time, so they are ideal for storing rewards have been
        recovered by a character or set of names, raise a couple of examples. To
        create a list, you have to go to the data category, click on 'Create a
        List' and give a name. In the example, we have named our 'Students'
        list:
      </p>
      <img
        className={mainStyles.image}
        src={dataRepresentation7}
        alt="scratch-img"
      />
      <p className={mainStyles.paragraph}>
        What have we done with this program? The first thing we do is, to start
        execution, delete all items from the list Students, to empty it
        completely and not appear elements of an previous project
        implementation. Then we ask three times the user to enter a name, and
        each name entered insert it in the last position in the list Students.
        What we do with the list? We could, for example, use it to get a
        volunteer to carry out an exercise to the whiteboard. Look at the new
        instructions added to the program:
      </p>
      <img
        className={mainStyles.image}
        src={dataRepresentation8}
        alt="scratch-img"
      />
      <p className={mainStyles.paragraph}>
        We generated a random number between 1 and 3, which are the elements in
        the list, we selected the element that occupies that position in the
        list. Sometimes we take the name that is in position 1, others that it
        is in position 2 and the other at 3. Lists have many possibilities and
        many available operations ... you dare to investigate how they work?
      </p>
    </div>
  );
};

export default DataRepresentation;