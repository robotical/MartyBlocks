/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
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
 * @fileoverview Colour input field.
 * @author fraser@google.com (Neil Fraser)
 */

"use strict";

goog.provide("Blockly.FieldColourPickerLEDEyes");

goog.require("Blockly.Field");
goog.require("Blockly.DropDownDiv");
goog.require("goog.dom");
goog.require("goog.events");
goog.require("goog.style");
goog.require("goog.color");
goog.require("goog.ui.Slider");
goog.require("goog.ui.SliderBase");
goog.require("Blockly.FieldLEDEyeMatrix");
goog.require("Blockly.RadialHueSlider");

/**
 * Class for a slider-based colour input field.
 * @param {string} colour The initial colour in '#rrggbb' format.
 * @param {Function=} opt_validator A function that is executed when a new
 *     colour is selected.  Its sole argument is the new colour value.  Its
 *     return value becomes the selected colour, unless it is undefined, in
 *     which case the new colour stands, or it is null, in which case the change
 *     is aborted.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldColourPickerLEDEyes = function (colour, opt_validator) {
  Blockly.FieldColourPickerLEDEyes.superClass_.constructor.call(
    this,
    colour,
    opt_validator
  );
  this.addArgType("colour");

  /**
   * Eyes matrix with LEDs
   */
  this.eyeMatrix = new Blockly.FieldLEDEyeMatrix();
  // Flag to track whether or not the slider callbacks should execute
  this.sliderCallbacksEnabled_ = false;

  /**
   * Colour button on the block
   */
  this.colourBtn = null;
};
goog.inherits(Blockly.FieldColourPickerLEDEyes, Blockly.Field);

/**
 * Construct a FieldColourPickerLEDEyes from a JSON arg object.
 * @param {!Object} options A JSON object with options (colour).
 * @returns {!Blockly.FieldColourPickerLEDEyes} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldColourPickerLEDEyes.fromJson = function (options) {
  return new Blockly.FieldColourPickerLEDEyes(options["colour"]);
};

/**
 * Path to the eyedropper svg icon.
 */
Blockly.FieldColourPickerLEDEyes.EYEDROPPER_PATH = "eyedropper.svg";

/**
 * The Matrix size for the Colour button
 */
Blockly.FieldColourPickerLEDEyes.COLOUR_BTN_MATRIX_SIZE = 25;

/**
 * Matrix size in px
 */
Blockly.FieldColourPickerLEDEyes.CIRCLE_RADIUS = 90;

/**
 * Fixed corner radius for 3x4 matrix buttons, in px.
 * @type {number}
 * @const
 */
Blockly.FieldColourPickerLEDEyes.MATRIX_NODE_RADIUS = 35;


/**
 * Install this field on a block.
 * @param {!Blockly.Block} block The block containing this field.
 */
Blockly.FieldColourPickerLEDEyes.prototype.init = function (block) {
  if (block.colour_.length > 7) {
    // we loading a saved block instance with all LED colours
    // save the colours to led matrix
    const colour = block.colour_.split(",")[0];
    this.eyeMatrix.ledColours = block.colour_.split(",");
    block.colour_ = colour;
    block.colourSecondary_ = colour;
    this.colour_ = colour;
    this.colourSecondary_ = colour;
  }
  console.log("block", block);
  // block.svgPath_.remove();
  this.colourBtn = this.createColourButton_(this.colour_);
  block.svgGroup_.appendChild(this.colourBtn);

  if (this.fieldGroup_) {
    // Colour slider has already been initialized once.
    return;
  }
  Blockly.FieldColourPickerLEDEyes.superClass_.init.call(this, block);
  this.setValue(this.getValue());
};

Blockly.FieldColourPickerLEDEyes.prototype.updateColourBtn = function (colour) {
  const nodes = this.colourBtn.getElementsByTagName("rect");
  for (let i = 0; i < nodes.length; i++) {
    if (i === 0) {
      // Skip the first rectangle, which is the background
      continue;
    }
    nodes[i].setAttribute("fill", colour);
  }
};

Blockly.FieldColourPickerLEDEyes.prototype.degreesToRad = function degrees_to_radians(degrees) {
  return degrees * (Math.PI / 180);
};

/**
 * Make an svg object that resembles a 3x3 matrix to be used as a button.
 * @param {string} fill The color to fill the matrix nodes.
 * @return {SvgElement} The button svg element.
 */
Blockly.FieldColourPickerLEDEyes.prototype.createColourButton_ = function (fill) {
  const matrixSize = Blockly.FieldColourPickerLEDEyes.COLOUR_BTN_MATRIX_SIZE;
  var button = Blockly.utils.createSvgElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:html": "http://www.w3.org/1999/xhtml",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    version: "1.1",
    height: matrixSize * 1.6 + "px",
    width: matrixSize * 1.8 + "px",
    x: "-1px",
    y: "-1px",
  });
  var nodeSize = matrixSize / 4;
  const angleDistance = 360 / 6;
  const radius = Blockly.FieldColourPickerLEDEyes.CIRCLE_RADIUS / 10;
  let currAngleDist = 0;

  // Define stroke properties
  const strokeColor = "#000000";
  const strokeWidth = 1;

  // Create background rectangle
  Blockly.utils.createSvgElement("rect", {
    x: "0px",
    y: "0px",
    height: matrixSize * 1.5,
    width: matrixSize * 1.8,
    fill: "#5ba591"
  }, button);

  // Calculate the center of the SVG container
  const centerX = (matrixSize * 1.5) / 2;
  const centerY = (matrixSize * 2) / 2;

  for (let n = 0; n < 6; n++) {
    const x = radius * Math.cos(currAngleDist) + centerX - nodeSize / 2;
    const y = radius * Math.sin(currAngleDist) + centerY - nodeSize / 2;
    var attr = {
      x: x + 1 + "px",
      y: y - 8 + "px",
      width: nodeSize,
      height: nodeSize,
      rx: Blockly.FieldColourPickerLEDEyes.MATRIX_NODE_RADIUS / 7,
      ry: Blockly.FieldColourPickerLEDEyes.MATRIX_NODE_RADIUS / 7,
      fill: fill,
      stroke: strokeColor,
      "stroke-width": strokeWidth
    };
    Blockly.utils.createSvgElement("rect", attr, button);
    currAngleDist += this.degreesToRad(angleDistance);
  }

  return button;
};



/**
 * Return the current colour.
 * @return {string} Current colour in '#rrggbb' format.
 */
Blockly.FieldColourPickerLEDEyes.prototype.getValue = function () {
  return this.colour_;
};

/**
 * Set the colour.
 * @param {string} colour The new colour in '#rrggbb' format.
 */
Blockly.FieldColourPickerLEDEyes.prototype.setValue = function (colour) {
  colour = colour || this.colour_;
  if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
    const ledValues = this.eyeMatrix.getLEDValues();
    Blockly.Events.fire(
      new Blockly.Events.BlockChange(
        this.sourceBlock_,
        "field",
        this.name,
        this.colour_,
        ledValues
      )
    );
  }
  this.colour_ = colour;
  if (this.sourceBlock_) {
    // Set the primary, secondary and tertiary colour to this value.
    // The renderer expects to be able to use the secondary colour as the fill for a shadow.
    this.sourceBlock_.setColour(
      colour,
      colour,
      this.sourceBlock_.getColourTertiary()
    );
  }
  this.updateSliderHandles_();
  this.updateDom_();
};

/**
 * Create the hue, saturation or value CSS gradient for the slide backgrounds.
 * @param {string} channel - Either "hue", "saturation" or "value".
 * @return {string} Array colour hex colour stops for the given channel
 * @private
 */
Blockly.FieldColourPickerLEDEyes.prototype.createColourStops_ = function (
  channel
) {
  var stops = [];
  for (var n = 0; n <= 360; n += 20) {
    switch (channel) {
      case "hue":
        stops.push(goog.color.hsvToHex(n, this.saturation_, this.brightness_));
        break;
      case "saturation":
        stops.push(goog.color.hsvToHex(this.hue_, n / 360, this.brightness_));
        break;
      case "brightness":
        stops.push(
          goog.color.hsvToHex(this.hue_, this.saturation_, (255 * n) / 360)
        );
        break;
      default:
        throw new Error("Unknown channel for colour sliders: " + channel);
    }
  }
  return stops;
};

/**
 * Set the gradient CSS properties for the given node and channel
 * @param {Node} node - The DOM node the gradient will be set on.
 * @param {string} channel - Either "hue", "saturation" or "value".
 * @private
 */
Blockly.FieldColourPickerLEDEyes.prototype.setGradient_ = function (
  node,
  channel
) {
  var gradient = this.createColourStops_(channel).join(",");
  if (channel === "hue") {
    node.updateGradient(gradient);
  } else {
    goog.style.setStyle(
      node,
      "background",
      "-moz-linear-gradient(bottom, " + gradient + ")"
    );
    goog.style.setStyle(
      node,
      "background",
      "-webkit-linear-gradient(bottom, " + gradient + ")"
    );
    goog.style.setStyle(
      node,
      "background",
      "-o-linear-gradient(bottom, " + gradient + ")"
    );
    goog.style.setStyle(
      node,
      "background",
      "-ms-linear-gradient(bottom, " + gradient + ")"
    );
    goog.style.setStyle(
      node,
      "background",
      "linear-gradient(bottom, " + gradient + ")"
    );
  }
};

/**
 * Update the readouts and slider backgrounds after value has changed.
 * @private
 */
Blockly.FieldColourPickerLEDEyes.prototype.updateDom_ = function () {
  if (this.hueSlider_) {
    // Update the slider backgrounds
    this.setGradient_(this.hueSlider_, "hue");
    this.setGradient_(this.saturationSlider_.getElement(), "saturation");
    this.setGradient_(this.brightnessSlider_.getElement(), "brightness");

    // let hue = Math.floor(100 * this.hue_ / 360).toFixed(0);
    // let hueString = Blockly.Msg.COLOUR_RED;
    // if (hue < 7 || hue > 93) hueString = Blockly.Msg.COLOUR_RED;
    // else if (hue < 18) hueString = Blockly.Msg.COLOUR_YELLOW;
    // else if (hue < 45) hueString = Blockly.Msg.COLOUR_GREEN;
    // else if (hue < 54) hueString = Blockly.Msg.COLOUR_CYAN;
    // else if (hue < 75) hueString = Blockly.Msg.COLOUR_BLUE;
    // else if (hue < 80) hueString = Blockly.Msg.COLOUR_PURPLE;
    // else  hueString = Blockly.Msg.COLOUR_PINK;
    // hueString += " (" + hue + ")";

    // Update the readouts
    // this.hueReadout_.textContent = hueString;
    this.saturationReadout_.textContent = Math.floor(
      100 * this.saturation_
    ).toFixed(0);
    this.brightnessReadout_.textContent = Math.floor(
      (100 * this.brightness_) / 255
    ).toFixed(0);
  }
};

/**
 * Update the slider handle positions from the current field value.
 * @private
 */
Blockly.FieldColourPickerLEDEyes.prototype.updateSliderHandles_ = function () {
  if (this.hueSlider_) {
    // Don't let the following calls to setValue for each of the sliders
    // trigger the slider callbacks (which then call setValue on this field again
    // unnecessarily)
    this.sliderCallbacksEnabled_ = false;
    // this.shouldUpdateHueSlider && this.hueSlider_.updateCircle(this.hue_);
    this.saturationSlider_.setValue(this.saturation_);
    this.brightnessSlider_.setValue(this.brightness_);
    this.sliderCallbacksEnabled_ = true;
  }
};

/**
 * Get the text from this field.  Used when the block is collapsed.
 * @return {string} Current text.
 */
Blockly.FieldColourPickerLEDEyes.prototype.getText = function () {
  var colour = this.colour_;
  // Try to use #rgb format if possible, rather than #rrggbb.
  var m = colour.match(/^#(.)\1(.)\2(.)\3$/);
  if (m) {
    colour = "#" + m[1] + m[2] + m[3];
  }
  return colour;
};

/**
 * Create label and readout DOM elements, returning the readout
 * @param {string} labelText - Text for the label
 * @return {Array} The container node and the readout node.
 * @private
 */
Blockly.FieldColourPickerLEDEyes.prototype.createLabelDom_ = function (
  labelText
) {
  var labelContainer = document.createElement("div");
  labelContainer.setAttribute("class", "scratchColourPickerLabelVertical");
  var readout = document.createElement("span");
  readout.setAttribute("class", "scratchColourPickerReadoutVertical");
  readout.style.writingMode = "vertical-rl";
  var label = document.createElement("span");
  label.setAttribute("class", "scratchColourPickerLabelTextVertical");
  label.style.writingMode = "vertical-rl";
  label.textContent = labelText;
  labelContainer.appendChild(label);
  labelContainer.appendChild(readout);
  return [labelContainer, readout];
};

/**
 * Factory for creating the different slider callbacks
 * @param {number} value - The hue value
 * @private
 */
Blockly.FieldColourPickerLEDEyes.prototype.hueSliderCallback_ = function (
  value
) {
  if (!this.sliderCallbacksEnabled_) return;
  this.hue_ = +value;
  let colour = goog.color.hsvToHex(
    this.hue_,
    this.saturation_,
    this.brightness_
  );
  if (this.sourceBlock_) {
    // Call any validation function, and allow it to override.
    colour = this.callValidator(colour);
  }
  if (colour !== null) {
    this.shouldUpdateHueSlider = false;
    this.setValue(colour, true);
    this.shouldUpdateHueSlider = true;
    this.hueSlider_.fillCircleCenter(colour);
    this.eyeMatrix.updateApplyToAllBtn();
    this.updateColourBtn(colour);
    // this.eyeMatrix.updateMatrix_();
  }
};

/**
 * Factory for creating the different slider callbacks
 * @param {string} channel - One of "hue", "saturation" or "brightness"
 * @return {function} the callback for slider update
 * @private
 */
Blockly.FieldColourPickerLEDEyes.prototype.sliderCallbackFactory_ = function (
  channel
) {
  var thisField = this;
  return function (event) {
    if (!thisField.sliderCallbacksEnabled_) return;
    var channelValue = event.target.getValue();
    switch (channel) {
      case "hue":
        thisField.hue_ = channelValue;
        break;
      case "saturation":
        thisField.saturation_ = channelValue;
        break;
      case "brightness":
        thisField.brightness_ = channelValue;
        break;
    }
    var colour = goog.color.hsvToHex(
      thisField.hue_,
      thisField.saturation_,
      thisField.brightness_
    );
    if (thisField.sourceBlock_) {
      // Call any validation function, and allow it to override.
      colour = thisField.callValidator(colour);
    }
    if (colour !== null) {
      thisField.setValue(colour, true);
      thisField.hueSlider_.fillCircleCenter(colour);
      thisField.eyeMatrix.updateApplyToAllBtn();
      thisField.updateColourBtn(colour);
      // thisField.eyeMatrix.updateMatrix_();
    }
  };
};

/**
 * Create hue, saturation and brightness sliders under the colour field.
 * @private
 */
Blockly.FieldColourPickerLEDEyes.prototype.showEditor_ = function () {
  Blockly.DropDownDiv.hideWithoutAnimation();
  Blockly.DropDownDiv.clearContent();
  var outerDiv = Blockly.DropDownDiv.getContentDiv();

  const div = document.createElement("div");

  // create a grid layout to accomodate the style
  div.style.display = "grid";
  div.style.gridTemplateColumns = "1fr 20px 20px 20px 20px";
  div.style.gridTemplateRows = "1f";
  // Init color component values that are used while the editor is open
  // in order to keep the slider values stable.
  var hsv = goog.color.hexToHsv(this.getValue());
  this.hue_ = hsv[0];
  this.saturation_ = hsv[1];
  this.brightness_ = hsv[2];

  // adding eye leds matrix
  this.eyeMatrix.sourceBlock_ = this.sourceBlock_;
  this.eyeMatrix.showEditor_();
  this.eyeMatrix.matrixStage_.style.gridColumn = "1/1";
  this.eyeMatrix.matrixStage_.style.gridRow = "1/1";

  this.eyeMatrix.setColourPickerValue = this.setValue.bind(this);

  div.appendChild(this.eyeMatrix.matrixStage_);


  // var hueElements =
  //   this.createLabelDom_(Blockly.Msg.COLOUR_HUE_LABEL);
  // div.appendChild(hueElements[0]);
  // this.hueReadout_ = hueElements[1];

  const hueSliderParent = document.createElement("div");
  hueSliderParent.style.gridColumn = "1/1";
  hueSliderParent.style.gridRow = "1/1";
  hueSliderParent.style.padding = "0 5px 0  0";
  hueSliderParent.style.justifySelf = "center";
  hueSliderParent.style.alignSelf = "center";
  const hueSlider = document.createElement("input");
  hueSlider.type = "range";
  hueSlider.className = "c-rng";
  hueSlider.min = "0";
  hueSlider.max = "360";
  hueSlider.step = "1";
  hueSlider.value = "75";
  hueSlider.setAttribute("data-range", "circular");
  hueSliderParent.appendChild(hueSlider);
  div.appendChild(hueSliderParent);

  // this.hueSlider_ = new goog.ui.Slider();
  // this.hueSlider_.setUnitIncrement(5);
  // this.hueSlider_.setMinimum(0);
  // this.hueSlider_.setMaximum(360);
  // this.hueSlider_.setMoveToPointEnabled(true);
  // this.hueSlider_.render(div);

  var saturationElements = this.createLabelDom_(
    Blockly.Msg.COLOUR_SATURATION_LABEL
  );
  div.appendChild(saturationElements[0]);
  this.saturationReadout_ = saturationElements[1];
  this.saturationSlider_ = new goog.ui.Slider();
  this.saturationSlider_.setOrientation(goog.ui.SliderBase.Orientation.VERTICAL);
  this.saturationSlider_.setMoveToPointEnabled(true);
  this.saturationSlider_.setUnitIncrement(0.01);
  this.saturationSlider_.setStep(0.001);
  this.saturationSlider_.setMinimum(0);
  this.saturationSlider_.setMaximum(1.0);
  this.saturationSlider_.render(div);

  var brightnessElements = this.createLabelDom_(
    Blockly.Msg.COLOUR_BRIGHTNESS_LABEL
  );
  div.appendChild(brightnessElements[0]);
  this.brightnessReadout_ = brightnessElements[1];
  this.brightnessSlider_ = new goog.ui.Slider();
  this.brightnessSlider_.setOrientation(goog.ui.SliderBase.Orientation.VERTICAL);
  this.brightnessSlider_.setUnitIncrement(2);
  this.brightnessSlider_.setMinimum(0);
  this.brightnessSlider_.setMaximum(255);
  this.brightnessSlider_.setMoveToPointEnabled(true);
  this.brightnessSlider_.render(div);

  // Blockly.DropDownDiv.setColour("#ffffff", "#dddddd");
  Blockly.DropDownDiv.setColour("#5ba591", "#5ba591");
  Blockly.DropDownDiv.setCategory(this.sourceBlock_.parentBlock_.getCategory());
  Blockly.DropDownDiv.showPositionedByBlock(this, this.sourceBlock_);
  outerDiv.appendChild(div);
  this.hueSlider_ = new Blockly.RadialHueSlider(hueSlider, hueSlider.dataset);
  this.hueSlider_.updateCircle(this.hue_ + this.hueSlider_.settings.offset);
  this.hueSlider_.fillCircleCenter(this.getValue());
  this.eyeMatrix.updateApplyToAllBtn();
  this.updateColourBtn(this.getValue());
  // Set value updates the slider positions
  // Do this before attaching callbacks to avoid extra events from initial set
  this.setValue(this.getValue());

  // Enable callbacks for the sliders
  this.sliderCallbacksEnabled_ = true;

  const thisField = this;
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes") {
        const value = thisField.hueSlider_.wrapper.getAttribute("data-value");
        if (+value !== thisField.hue_) thisField.hueSliderCallback_(value);
      }
    });
  });

  observer.observe(this.hueSlider_.wrapper, {
    attributes: true, //configure it to listen to attribute changes
  });

  Blockly.FieldColourPickerLEDEyes.saturationChangeEventKey_ = goog.events.listen(
    this.saturationSlider_,
    goog.ui.Component.EventType.CHANGE,
    this.sliderCallbackFactory_("saturation")
  );
  Blockly.FieldColourPickerLEDEyes.brightnessChangeEventKey_ = goog.events.listen(
    this.brightnessSlider_,
    goog.ui.Component.EventType.CHANGE,
    this.sliderCallbackFactory_("brightness")
  );
};

Blockly.FieldColourPickerLEDEyes.prototype.dispose = function () {
  if (Blockly.FieldColourPickerLEDEyes.hueChangeEventKey_) {
    goog.events.unlistenByKey(
      Blockly.FieldColourPickerLEDEyes.hueChangeEventKey_
    );
  }
  if (Blockly.FieldColourPickerLEDEyes.saturationChangeEventKey_) {
    goog.events.unlistenByKey(
      Blockly.FieldColourPickerLEDEyes.saturationChangeEventKey_
    );
  }
  if (Blockly.FieldColourPickerLEDEyes.brightnessChangeEventKey_) {
    goog.events.unlistenByKey(
      Blockly.FieldColourPickerLEDEyes.brightnessChangeEventKey_
    );
  }
  if (Blockly.FieldColourPickerLEDEyes.eyedropperEventData_) {
    Blockly.unbindEvent_(Blockly.FieldColourPickerLEDEyes.eyedropperEventData_);
  }
  Blockly.Events.setGroup(false);
  Blockly.FieldColourPickerLEDEyes.superClass_.dispose.call(this);
};

Blockly.Field.register(
  "field_colour_picker_LED_eyes",
  Blockly.FieldColourPickerLEDEyes
);
