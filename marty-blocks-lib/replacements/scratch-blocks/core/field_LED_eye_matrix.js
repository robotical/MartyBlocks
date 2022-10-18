/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview 3x4 matrix input field.
 * Displays an editable 3x4 matrix for controlling LED arrays.
 * @author khanning@gmail.com (Kreg Hanning)
 */
"use strict";

goog.provide("Blockly.FieldLEDEyeMatrix");

goog.require("Blockly.DropDownDiv");

/**
 * Class for a matrix field.
 * @param {number} matrix The default matrix value represented by a 25-bit integer.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldLEDEyeMatrix = function (matrix) {
  Blockly.FieldLEDEyeMatrix.superClass_.constructor.call(this, matrix);
  this.addArgType("matrix");
  /**
   * Array of SVGElement<rect> for matrix thumbnail image on block field.
   * @type {!Array<SVGElement>}
   * @private
   */
  this.ledThumbNodes_ = [];
  /**
   * Array of SVGElement<rect> for matrix editor in dropdown menu.
   * @type {!Array<SVGElement>}
   * @private
   */
  this.ledButtons_ = [];

  /**
   * Colour representing a cleared node
   */
  this.clearColour = "#5ba591";

  /**
   * String for storing current matrix value.
   * @type {!String]
   * @private
   */
  this.matrix_ = "";
  /**
   * SVGElement for LED matrix in editor.
   * @type {?SVGElement}
   * @private
   */
  this.matrixStage_ = null;
  /**
   * SVG image for dropdown arrow.
   * @type {?SVGElement}
   * @private
   */
  this.arrow_ = null;
  /**
   * String indicating matrix paint style.
   * value can be [null, 'fill', 'clear'].
   * @type {?String}
   * @private
   */
  this.paintStyle_ = null;
  /**
   * Touch event wrapper.
   * Runs when the field is selected.
   * @type {!Array}
   * @private
   */
  this.mouseDownWrapper_ = null;
  /**
   * Touch event wrapper.
   * Runs when the clear button editor button is selected.
   * @type {!Array}
   * @private
   */
  this.clearButtonWrapper_ = null;
  /**
   * Touch event wrapper.
   * Runs when the fill button editor button is selected.
   * @type {!Array}
   * @private
   */
  this.fillButtonWrapper_ = null;
  /**
   * Touch event wrapper.
   * Runs when the matrix editor is touched.
   * @type {!Array}
   * @private
   */
  this.matrixTouchWrapper_ = null;
  /**
   * Touch event wrapper.
   * Runs when the matrix editor touch event moves.
   * @type {!Array}
   * @private
   */
  this.matrixMoveWrapper_ = null;
  /**
   * Touch event wrapper.
   * Runs when the matrix editor is released.
   * @type {!Array}
   * @private
   */
  this.matrixReleaseWrapper_ = null;

  /**
   * Matrix saved LED colours
   * @type {string[]}
   */
  this.ledColours = [];

  /**
   * Apply to all button
   */
  this.applyToAllButton = null;
};
goog.inherits(Blockly.FieldLEDEyeMatrix, Blockly.Field);

/**
 * Construct a FieldLEDEyeMatrix from a JSON arg object.
 * @param {!Object} options A JSON object with options (matrix).
 * @returns {!Blockly.FieldLEDEyeMatrix} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldLEDEyeMatrix.fromJson = function (options) {
  return new Blockly.FieldLEDEyeMatrix(options["matrix"]);
};

/**
 * Fixed size of the matrix thumbnail in the input field, in px.
 * @type {number}
 * @const
 */
Blockly.FieldLEDEyeMatrix.THUMBNAIL_SIZE = 26;

/**
 * Fixed size of each matrix thumbnail node, in px.
 * @type {number}
 * @const
 */
Blockly.FieldLEDEyeMatrix.THUMBNAIL_NODE_SIZE = 4;

/**
 * Fixed size of each matrix thumbnail node, in px.
 * @type {number}
 * @const
 */
Blockly.FieldLEDEyeMatrix.THUMBNAIL_NODE_PAD = 1;

/**
 * Fixed size of arrow icon in drop down menu, in px.
 * @type {number}
 * @const
 */
Blockly.FieldLEDEyeMatrix.ARROW_SIZE = 12;

/**
 * Fixed size of each button inside the 3x4 matrix, in px.
 * @type {number}
 * @const
 */
Blockly.FieldLEDEyeMatrix.MATRIX_NODE_SIZE = 22;

/**
 * Fixed corner radius for 3x4 matrix buttons, in px.
 * @type {number}
 * @const
 */
Blockly.FieldLEDEyeMatrix.MATRIX_NODE_RADIUS = 20;

/**
 * Fixed padding for 3x4 matrix buttons, in px.
 * @type {number}
 * @const
 */
Blockly.FieldLEDEyeMatrix.MATRIX_NODE_PAD = 5;

/**
 * String with 12 '0' chars.
 * Used for clearing a matrix or filling an LED node array.
 * @type {string}
 * @const
 */
Blockly.FieldLEDEyeMatrix.ZEROS = "000000000000";

/**
 * String with 12 '1' chars.
 * Used for filling a matrix.
 * @type {string}
 * @const
 */
Blockly.FieldLEDEyeMatrix.ONES = "111111111111";

/**
 * Function that converts degrees to radians
 * @param {number} degrees
 * @returns {number}
 */
Blockly.FieldLEDEyeMatrix.degreesToRad = function degrees_to_radians(degrees) {
  return degrees * (Math.PI / 180);
};

/**
 * Number of LED eyes nodes
 */
Blockly.FieldLEDEyeMatrix.NODES_NUM = 12;

/**
 * Matrix size in px
 */
Blockly.FieldLEDEyeMatrix.MATRIX_SIZE = 200;

/**
 * Matrix size in px
 */
Blockly.FieldLEDEyeMatrix.CIRCLE_RADIUS = 75;

/**
 * Called when the field is placed on a block.
 * @param {Block} block The owning block.
 */
Blockly.FieldLEDEyeMatrix.prototype.init = function () {
  if (this.fieldGroup_) {
    // Matrix menu has already been initialized once.
    return;
  }

  // Build the DOM.
  this.fieldGroup_ = Blockly.utils.createSvgElement("g", {}, null);
  this.size_.width =
    Blockly.FieldLEDEyeMatrix.THUMBNAIL_SIZE +
    Blockly.FieldLEDEyeMatrix.ARROW_SIZE +
    Blockly.BlockSvg.DROPDOWN_ARROW_PADDING * 1.5;

  this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);

  var thumbX = Blockly.BlockSvg.DROPDOWN_ARROW_PADDING / 2;
  var thumbY =
    (this.size_.height - Blockly.FieldLEDEyeMatrix.THUMBNAIL_SIZE) / 2;
  var thumbnail = Blockly.utils.createSvgElement(
    "g",
    {
      transform: "translate(" + thumbX + ", " + thumbY + ")",
      "pointer-events": "bounding-box",
      cursor: "pointer",
    },
    this.fieldGroup_
  );
  this.ledThumbNodes_ = [];
  var nodeSize = Blockly.FieldLEDEyeMatrix.THUMBNAIL_NODE_SIZE;
  var nodePad = Blockly.FieldLEDEyeMatrix.THUMBNAIL_NODE_PAD;
  for (var i = 0; i < 3; i++) {
    for (var n = 0; n < 4; n++) {
      var attr = {
        x: (nodeSize + nodePad) * n + nodePad,
        y: (nodeSize + nodePad) * i + nodePad,
        width: nodeSize,
        height: nodeSize,
        rx: nodePad,
        ry: nodePad,
      };
      this.ledThumbNodes_.push(
        Blockly.utils.createSvgElement("rect", attr, thumbnail)
      );
    }
    thumbnail.style.cursor = "default";
    this.updateMatrix_();
  }

  if (!this.arrow_) {
    var arrowX =
      Blockly.FieldLEDEyeMatrix.THUMBNAIL_SIZE +
      Blockly.BlockSvg.DROPDOWN_ARROW_PADDING * 1.5;
    var arrowY = (this.size_.height - Blockly.FieldLEDEyeMatrix.ARROW_SIZE) / 2;
    this.arrow_ = Blockly.utils.createSvgElement(
      "image",
      {
        height: Blockly.FieldLEDEyeMatrix.ARROW_SIZE + "px",
        width: Blockly.FieldLEDEyeMatrix.ARROW_SIZE + "px",
        transform: "translate(" + arrowX + ", " + arrowY + ")",
      },
      this.fieldGroup_
    );
    this.arrow_.setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "xlink:href",
      Blockly.mainWorkspace.options.pathToMedia + "dropdown-arrow.svg"
    );
    this.arrow_.style.cursor = "default";
  }

  this.mouseDownWrapper_ = Blockly.bindEventWithChecks_(
    this.getClickTarget_(),
    "mousedown",
    this,
    this.onMouseDown_
  );
};

/**
 * Set the value for this matrix menu.
 * @param {string} matrix The new matrix value represented by a 25-bit integer.
 * @override
 */
Blockly.FieldLEDEyeMatrix.prototype.setValue = function (matrix) {
  if (!matrix || matrix === this.matrix_) {
    return; // No change
  }
  if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
    Blockly.Events.fire(
      new Blockly.Events.Change(
        this.sourceBlock_,
        "field",
        this.name,
        this.matrix_,
        matrix
      )
    );
  }
  matrix =
    matrix + Blockly.FieldLEDEyeMatrix.ZEROS.substr(0, 12 - matrix.length);
  this.matrix_ = matrix;
  // this.updateMatrix_();
};

/**
 * Get the value from this matrix menu.
 * @return {string} Current matrix value.
 */
Blockly.FieldLEDEyeMatrix.prototype.getValue = function () {
  return String(this.matrix_);
};

/**
 * Get the color values from this matrix menu.
 * @return {string[]} led colours array
 */
Blockly.FieldLEDEyeMatrix.prototype.getLEDValues = function () {
  return this.ledButtons_.map((led) => {
    try {
      return led.attributes.fill.nodeValue;
    } catch (e) {
      return "";
    }
  });
};

/**
 * Show the drop-down menu for editing this field.
 * @private
 */
Blockly.FieldLEDEyeMatrix.prototype.showEditor_ = function () {
  // If there is an existing drop-down someone else owns, hide it immediately and clear it.
  Blockly.DropDownDiv.hideWithoutAnimation();
  Blockly.DropDownDiv.clearContent();
  var div = Blockly.DropDownDiv.getContentDiv();

  // apply to all button
  this.applyToAllButton = document.createElement("div");
  this.applyToAllButton.className = "matrix-apply-to-all-btn";
  this.applyToAllButton.onclick = this.fillMatrix_.bind(this);
  this.applyToAllButton.appendChild(this.createButton_("white"));

  // clear all button
  const clearAllButton = document.createElement("div");
  clearAllButton.className = "matrix-clear-all-btn";
  clearAllButton.onclick = this.clearMatrix_.bind(this);
  clearAllButton.appendChild(this.createButton_("#467569"));

  div.appendChild(this.applyToAllButton);
  div.appendChild(clearAllButton);
  // Build the SVG DOM.
  // var matrixSize = (Blockly.FieldLEDEyeMatrix.MATRIX_NODE_SIZE * 5) +
  // (Blockly.FieldLEDEyeMatrix.MATRIX_NODE_PAD * 6);
  var matrixSize = Blockly.FieldLEDEyeMatrix.MATRIX_SIZE;
  this.matrixStage_ = Blockly.utils.createSvgElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:html": "http://www.w3.org/1999/xhtml",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      version: "1.1",
      height: matrixSize + "px",
      width: matrixSize + "px",
    },
    div
  );
  // Create eye matrix
  const hasBeenInitialised = !!this.ledButtons_.length;
  const isLoaded = !!this.ledColours.length;
  const ledColours = isLoaded ? [...this.ledColours] : this.getLEDValues();
  this.ledColours = [];
  this.ledButtons_ = [];
  const numNodes = Blockly.FieldLEDEyeMatrix.NODES_NUM;
  const angleDistance = 360 / 12;
  const radius = Blockly.FieldLEDEyeMatrix.CIRCLE_RADIUS;
  let currAngleDist = 0;

  for (let n = 0; n < 100; n++) {
    const x = radius * Math.cos(currAngleDist) + matrixSize / 2.3;
    const y = radius * Math.sin(currAngleDist) + matrixSize / 2.3;
    var attr_ = {
      x: x - 4 + "px",
      y: y - 4 + "px",
      width: Blockly.FieldLEDEyeMatrix.MATRIX_NODE_SIZE + 8,
      height: Blockly.FieldLEDEyeMatrix.MATRIX_NODE_SIZE + 8,
      rx: Blockly.FieldLEDEyeMatrix.MATRIX_NODE_RADIUS,
      ry: Blockly.FieldLEDEyeMatrix.MATRIX_NODE_RADIUS,
      fill: "#ebfcef",
    };
    var led_ = Blockly.utils.createSvgElement("rect", attr_, this.matrixStage_);
    this.matrixStage_.appendChild(led_);
    currAngleDist += Blockly.FieldLEDEyeMatrix.degreesToRad(360 / 100);
  }

  currAngleDist = 0;
  for (let n = 0; n < numNodes; n++) {
    const x = radius * Math.cos(currAngleDist) + matrixSize / 2.3;
    const y = radius * Math.sin(currAngleDist) + matrixSize / 2.3;
    var attr = {
      x: x + "px",
      y: y + "px",
      width: Blockly.FieldLEDEyeMatrix.MATRIX_NODE_SIZE,
      height: Blockly.FieldLEDEyeMatrix.MATRIX_NODE_SIZE,
      rx: Blockly.FieldLEDEyeMatrix.MATRIX_NODE_RADIUS,
      ry: Blockly.FieldLEDEyeMatrix.MATRIX_NODE_RADIUS,
      fill: ledColours[n],
    };
    var led = Blockly.utils.createSvgElement("rect", attr, this.matrixStage_);
    this.matrixStage_.appendChild(led);
    this.ledButtons_.push(led);
    currAngleDist += Blockly.FieldLEDEyeMatrix.degreesToRad(angleDistance);
  }

  Blockly.DropDownDiv.setColour(
    this.sourceBlock_.getColour(),
    this.sourceBlock_.getColourTertiary()
  );
  Blockly.DropDownDiv.setCategory(this.sourceBlock_.getCategory());
  Blockly.DropDownDiv.showPositionedByBlock(this, this.sourceBlock_);
  this.matrixTouchWrapper_ = Blockly.bindEvent_(
    this.matrixStage_,
    "mousedown",
    this,
    this.onMouseDown
  );

  // Update the matrix for the current value
  if (isLoaded) {
    this.matrix_ = ledColours.map(colour => colour === this.clearColour ? "0" : "1").join("");
  } else {
    if (!hasBeenInitialised) this.fillMatrix_();
  }
  this.updateMatrix_();
};

this.nodeCallback_ = function (e, num) {
  console.log(num);
};

/**
 *
 */
Blockly.FieldLEDEyeMatrix.prototype.updateApplyToAllBtn = function () {
  const nodes = this.applyToAllButton.getElementsByTagName("rect");
  for (const node of nodes) {
    node.setAttribute("fill", this.sourceBlock_.colour_);
  }
};

/**
 * Make an svg object that resembles a 3x3 matrix to be used as a button.
 * @param {string} fill The color to fill the matrix nodes.
 * @return {SvgElement} The button svg element.
 */
Blockly.FieldLEDEyeMatrix.prototype.createButton_ = function (fill) {
  const matrixSize = Blockly.FieldLEDEyeMatrix.MATRIX_NODE_SIZE;
  var button = Blockly.utils.createSvgElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:html": "http://www.w3.org/1999/xhtml",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    version: "1.1",
    height: matrixSize + "px",
    width: matrixSize + "px",
  });
  var nodeSize = matrixSize / 4;
  const angleDistance = 360 / 6;
  const radius = Blockly.FieldLEDEyeMatrix.CIRCLE_RADIUS / 10;
  let currAngleDist = 0;

  for (let n = 0; n < 6; n++) {
    const x = radius * Math.cos(currAngleDist) + matrixSize / 2.3;
    const y = radius * Math.sin(currAngleDist) + matrixSize / 2.3;
    var attr = {
      x: x + "px",
      y: y + "px",
      width: nodeSize,
      height: nodeSize,
      rx: Blockly.FieldLEDEyeMatrix.MATRIX_NODE_RADIUS / 7,
      ry: Blockly.FieldLEDEyeMatrix.MATRIX_NODE_RADIUS / 7,
      fill: fill,
    };
    Blockly.utils.createSvgElement("rect", attr, button);
    // this.matrixStage_.appendChild(led);
    // this.ledButtons_.push(led);
    currAngleDist += Blockly.FieldLEDEyeMatrix.degreesToRad(angleDistance);
  }

  return button;
};

/**
 * Redraw the matrix with the current value.
 * @private
 */
Blockly.FieldLEDEyeMatrix.prototype.updateMatrix_ = function () {
  for (var i = 0; i < this.matrix_.length; i++) {
    this.selectMatrixNode_(this.ledButtons_, i, this.matrix_[i] === "1");
  }
};

/**
 * Redraw the matrix with the current value.
 * @private
 */
Blockly.FieldLEDEyeMatrix.prototype.updateMatrixWithSelectedNodes_ = function () {
  for (var i = 0; i < this.matrix_.length; i++) {
    if (this.matrix_[i] === "0") {
      this.selectMatrixNode_(this.ledButtons_, i);
      this.selectMatrixNode_(this.ledThumbNodes_, i);
    } else {
      this.selectMatrixNode_(this.ledButtons_, i, true);
      this.selectMatrixNode_(this.ledThumbNodes_, i, true);
    }
  }
};

/**
 * Clear the matrix.
 * @param {!Event} e Mouse event.
 */
Blockly.FieldLEDEyeMatrix.prototype.clearMatrix_ = function () {
  // if (e.button != 0) return;
  this.setValue(Blockly.FieldLEDEyeMatrix.ZEROS);
  for (var i = 0; i < this.matrix_.length; i++) {
    if (this.matrix_[i] === "0") {
      this.selectMatrixNode_(this.ledButtons_, i);
      this.fillMatrixNode_(this.ledButtons_, i, this.clearColour);
      this.fillMatrixNode_(this.ledThumbNodes_, i, this.clearColour);
    }
  }
};

/**
 * Fill the matrix.
 * @param {!Event} e Mouse event.
 */
Blockly.FieldLEDEyeMatrix.prototype.fillMatrix_ = function () {
  // if (e.button != 0) return;
  this.setValue(Blockly.FieldLEDEyeMatrix.ONES);
  for (var i = 0; i < this.matrix_.length; i++) {
    if (this.matrix_[i] === "1") {
      this.selectMatrixNode_(this.ledButtons_, i, true);
      this.fillMatrixNode_(
        this.ledButtons_,
        i,
        this.sourceBlock_.colourSecondary_
      );
      this.fillMatrixNode_(this.ledThumbNodes_, i, this.sourceBlock_.colour_);
    }
  }
};

/**
 * Fill matrix node with specified colour.
 * @param {!Array<SVGElement>} node The array of matrix nodes.
 * @param {!number} index The index of the matrix node.
 * @param {!string} fill The fill colour in '#rrggbb' format.
 */
Blockly.FieldLEDEyeMatrix.prototype.fillMatrixNode_ = function (
  node,
  index,
  fill
) {
  if (!node || !node[index] || !fill) return;
  node[index].setAttribute("fill", fill);
};

/**
 * Select node by filling matrix node border with specific colour.
 * @param {!Array<SVGElement>} node The array of matrix nodes.
 * @param {!number} index The index of the matrix node.
 */
Blockly.FieldLEDEyeMatrix.prototype.selectMatrixNode_ = function (
  node,
  index,
  select
) {
  if (!node || !node[index]) return;
  node[index].setAttribute(
    "style",
    `stroke-width:2px;stroke:${select ? "rgb(255,218,97)" : "#FFFFFF"}`
    );
};

Blockly.FieldLEDEyeMatrix.prototype.setLEDNode_ = function (led, state) {
  if (led < 0 || led > 24) return;
  var matrix =
    this.matrix_.substr(0, led) + state + this.matrix_.substr(led + 1);
  this.setValue(matrix);
};

Blockly.FieldLEDEyeMatrix.prototype.fillLEDNode_ = function (led) {
  if (led < 0 || led > 24) return;
  this.setLEDNode_(led, "1");
};

Blockly.FieldLEDEyeMatrix.prototype.clearLEDNode_ = function (led) {
  if (led < 0 || led > 24) return;
  this.setLEDNode_(led, "0");
};

Blockly.FieldLEDEyeMatrix.prototype.toggleLEDNode_ = function (led) {
  if (led < 0 || led > 24) return;
  if (this.matrix_.charAt(led) === "0") {
    this.fillMatrixNode_(
      this.ledButtons_,
      led,
      this.sourceBlock_.colourSecondary_
    );
    this.fillMatrixNode_(this.ledThumbNodes_, led, this.sourceBlock_.colour_);
    this.setLEDNode_(led, "1");
  } else {
    // if the colour of the enabled led is the same as the selected colour, then turn off
    // otherwise (colours differ) fill the node with the selected colour
    if (
      this.sourceBlock_.colour_ ===
      this.ledButtons_[led].attributes.fill.nodeValue
    ) {
      this.setLEDNode_(led, "0");
      this.fillMatrixNode_(this.ledThumbNodes_, led, this.clearColour);
      this.fillMatrixNode_(this.ledButtons_, led, this.clearColour);
    } else {
      this.fillMatrixNode_(
        this.ledButtons_,
        led,
        this.sourceBlock_.colourSecondary_
      );
      this.fillMatrixNode_(this.ledThumbNodes_, led, this.sourceBlock_.colour_);
    }
  }
  this.selectMatrixNode_(
    this.ledButtons_,
    led,
    this.matrix_.charAt(led) === "1"
  );
};

/**
 * Toggle matrix nodes on and off.
 * @param {!Event} e Mouse event.
 */
Blockly.FieldLEDEyeMatrix.prototype.onMouseDown = function (e) {
  this.matrixMoveWrapper_ = Blockly.bindEvent_(
    document.body,
    "mousemove",
    this,
    this.onMouseMove
  );
  this.matrixReleaseWrapper_ = Blockly.bindEvent_(
    document.body,
    "mouseup",
    this,
    this.onMouseUp
  );
  var ledHit = this.checkForLED_(e);
  if (ledHit > -1) {
    if (this.matrix_.charAt(ledHit) === "0") {
      this.paintStyle_ = "fill";
    } else {
      this.paintStyle_ = "clear";
    }
    this.toggleLEDNode_(ledHit);
    // this.updateMatrixWithSelectedNodes_();
  } else {
    this.paintStyle_ = null;
  }
};

/**
 * Unbind mouse move event and clear the paint style.
 * @param {!Event} e Mouse move event.
 */
Blockly.FieldLEDEyeMatrix.prototype.onMouseUp = function () {
  Blockly.unbindEvent_(this.matrixMoveWrapper_);
  Blockly.unbindEvent_(this.matrixReleaseWrapper_);
  this.paintStyle_ = null;
};

/**
 * Toggle matrix nodes on and off by dragging mouse.
 * @param {!Event} e Mouse move event.
 */
Blockly.FieldLEDEyeMatrix.prototype.onMouseMove = function (e) {
  e.preventDefault();
  if (this.paintStyle_) {
    var led = this.checkForLED_(e);
    if (led < 0) return;
    if (this.paintStyle_ === "clear") {
      // this.this.ledButtons_[led].setAttribute("filter", "drop-shadow( 0px 0px 0px rgba(0, 0, 0, .7))");
    } else if (this.paintStyle_ === "fill") {
      // this.this.ledButtons_[led].setAttribute("filter", "drop-shadow( 1px 1px 3px rgba(0, 0, 0, .7))");
    }
  }
};

/**
 * Check if mouse coordinates collide with a matrix node.
 * @param {!Event} e Mouse move event.
 * @return {number} The matching matrix node or -1 for none.
 */
Blockly.FieldLEDEyeMatrix.prototype.checkForLED_ = function (e) {
  var bBox = this.matrixStage_.getBoundingClientRect();
  var nodeSize = Blockly.FieldLEDEyeMatrix.MATRIX_NODE_SIZE;
  var nodePad = Blockly.FieldLEDEyeMatrix.MATRIX_NODE_PAD;
  var dx = e.clientX - bBox.left;
  var dy = e.clientY - bBox.top;
  var min = nodePad / 2;
  var max = bBox.width - nodePad / 2;
  if (dx < min || dx > max || dy < min || dy > max) {
    return -1;
  }
  const matrixSize = bBox.width;
  const numNodes = Blockly.FieldLEDEyeMatrix.NODES_NUM;
  const angleDistance = 360 / 12;
  const radius = Blockly.FieldLEDEyeMatrix.CIRCLE_RADIUS;
  let currAngleDist = 0;
  for (var n = 0; n < numNodes; n++) {
    const x = radius * Math.cos(currAngleDist) + matrixSize / 2.3;
    const y = radius * Math.sin(currAngleDist) + matrixSize / 2.3;

    if (
      dx < x + nodeSize &&
      dx > x - nodeSize / 2 &&
      dy < y + nodeSize &&
      dy > y - nodeSize / 2
    ) {
      return n;
    }
    currAngleDist += Blockly.FieldLEDEyeMatrix.degreesToRad(angleDistance);
  }
  return -1;
};

/**
 * Clean up this FieldLEDEyeMatrix, as well as the inherited Field.
 * @return {!Function} Closure to call on destruction of the WidgetDiv.
 * @private
 */
Blockly.FieldLEDEyeMatrix.prototype.dispose_ = function () {
  var thisField = this;
  return function () {
    Blockly.FieldLEDEyeMatrix.superClass_.dispose_.call(thisField)();
    thisField.matrixStage_ = null;
    if (thisField.mouseDownWrapper_) {
      Blockly.unbindEvent_(thisField.mouseDownWrapper_);
    }
    if (thisField.matrixTouchWrapper_) {
      Blockly.unbindEvent_(thisField.matrixTouchWrapper_);
    }
    if (thisField.matrixReleaseWrapper_) {
      Blockly.unbindEvent_(thisField.matrixReleaseWrapper_);
    }
    if (thisField.matrixMoveWrapper_) {
      Blockly.unbindEvent_(thisField.matrixMoveWrapper_);
    }
    // if (thisField.clearButtonWrapper_) {
    //   Blockly.unbindEvent_(thisField.clearButtonWrapper_);
    // }
    // if (thisField.fillButtonWrapper_) {
    //   Blockly.unbindEvent_(thisField.fillButtonWrapper_);
    // }
  };
};

Blockly.Field.register("field_LED_eye_matrix", Blockly.FieldLEDEyeMatrix);
