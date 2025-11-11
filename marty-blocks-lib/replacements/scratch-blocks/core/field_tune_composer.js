/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2024 Robotical Ltd
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
 * @fileoverview Field that opens a mini tune composer and stores the result as
 * a serialised tune bundle (model + RTTTL).
 */

"use strict";

goog.provide("Blockly.FieldTuneComposer");

goog.require("Blockly.DropDownDiv");
goog.require("Blockly.Events");
goog.require("Blockly.Field");
goog.require("Blockly.Msg");
goog.require("Blockly.utils");
goog.require("Blockly.MusicalStaffComponent");
goog.require("goog.math.Size");


/**
 * Simple helper for deep copying the tune model.
 * @param {!Object} tune
 * @return {!Object}
 */
function cloneTune(tune) {
  return JSON.parse(JSON.stringify(tune));
}

/**
 * Default tune model used when the field is constructed or when loading
 * corrupt data.
 * @return {!Object}
 */
function buildDefaultTune() {
  return {
    schemaVersion: 1,
    title: "MyTune",
    bpm: 120,
    defaultDuration: 4,
    defaultOctave: 5,
    notes: [],
    rtttl: "MyTune:d=4,o=5,b=120:"
  };
}

/**
 * Known note names supported by the composer.
 * @type {!Array<string>}
 * @const
 */
const NOTE_PITCHES = [
  "c",
  "c#",
  "d",
  "d#",
  "e",
  "f",
  "f#",
  "g",
  "g#",
  "a",
  "a#",
  "b",
];

/**
 * Valid note lengths.
 * @type {!Array<number>}
 * @const
 */
const NOTE_LENGTHS = [1, 2, 4, 8, 16, 32];

/**
 * Valid octaves exposed to the user.
 * @type {!Array<number>}
 * @const
 */
const OCTAVE_VALUES = [3, 4, 5, 6, 7];

/**
 * Clamp helper.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Sanitise a tune title so that it fits RTTTL requirements.
 * @param {string} title
 * @return {string}
 */
function sanitiseTitle(title) {
  if (!title) {
    return "MyTune";
  }
  const cleaned = title
    .toString()
    .trim()
    .replace(/[^A-Za-z0-9_-]+/g, "_");
  return cleaned.length ? cleaned : "MyTune";
}

/**
 * Clamp BPM and return integer.
 * @param {number|string} bpm
 * @return {number}
 */
function normaliseBpm(bpm) {
  const num = Number(bpm) || Blockly.FieldTuneComposer.MIN_BPM;
  return clamp(Math.round(num), Blockly.FieldTuneComposer.MIN_BPM, Blockly.FieldTuneComposer.MAX_BPM);
}

/**
 * Clamp duration to valid value.
 * @param {number|string} duration
 * @return {number}
 */
function normaliseDuration(duration) {
  const num = Number(duration) || 4;
  if (NOTE_LENGTHS.indexOf(num) !== -1) {
    return num;
  }
  return 4;
}

/**
 * Clamp octave to valid value.
 * @param {number|string} octave
 * @return {number}
 */
function normaliseOctave(octave) {
  const num = Number(octave) || 5;
  if (OCTAVE_VALUES.indexOf(num) !== -1) {
    return num;
  }
  return 5;
}

/**
 * Build an RTTTL string from a tune model. Also validates and returns the
 * computed payload length.
 * @param {!Object} tuneModel
 * @return {{rtttl: string, issues: !Array<string>}}
 */
function buildRtttl(tuneModel) {
  const issues = [];
  const safeTitle = sanitiseTitle(tuneModel.title);
  const bpm = normaliseBpm(tuneModel.bpm);
  const d = normaliseDuration(tuneModel.defaultDuration);
  const o = normaliseOctave(tuneModel.defaultOctave);

  const header = `${safeTitle}:d=${d},o=${o},b=${bpm}`;
  const events = [];

  if (!Array.isArray(tuneModel.notes)) {
    issues.push("notes");
  } else {
    if (tuneModel.notes.length > Blockly.FieldTuneComposer.MAX_EVENTS) {
      issues.push("too_many_notes");
    }
    tuneModel.notes.forEach(function (note) {
      if (!note || typeof note !== "object") {
        return;
      }
      const kind = note.kind === "rest" ? "rest" : "note";
      const parts = [];
      const len = normaliseDuration(note.length || d);
      if (len !== d) {
        parts.push(String(len));
      }
      if (kind === "rest") {
        parts.push("p");
      } else {
        const pitch = (NOTE_PITCHES.indexOf((note.pitch || "").toLowerCase()) !== -1)
          ? (note.pitch || "c").toLowerCase()
          : "c";
        parts.push(pitch);
        const octave = normaliseOctave((note.octave == null) ? o : note.octave);
        if (octave !== o) {
          parts.push(String(octave));
        }
      }
      if (note.dotted) {
        parts.push(".");
      }
      events.push(parts.join(""));
    });
  }

  const body = events.join(",");
  return {
    rtttl: `${header}:${body}`,
    issues: issues
  };
}

function parseTuneValue(rawValue) {
  let parsed = rawValue;
  if (typeof rawValue === "string") {
    try {
      parsed = JSON.parse(rawValue);
    } catch (e) {
      parsed = null;
    }
  } else if (rawValue && typeof rawValue === "object") {
    parsed = JSON.parse(JSON.stringify(rawValue));
  }

  if (!parsed || typeof parsed !== "object" || parsed.schemaVersion !== 1) {
    parsed = buildDefaultTune();
  }

  const tune = {
    schemaVersion: 1,
    title: sanitiseTitle(parsed.title || "MyTune"),
    bpm: normaliseBpm(parsed.bpm),
    defaultDuration: normaliseDuration(parsed.defaultDuration),
    defaultOctave: normaliseOctave(parsed.defaultOctave),
    notes: Array.isArray(parsed.notes)
      ? parsed.notes.map(function (event) {
        if (!event || typeof event !== "object") {
          return { kind: "rest" };
        }
        const kind = event.kind === "rest" ? "rest" : "note";
        const clean = {
          kind: kind,
          dotted: Boolean(event.dotted)
        };
        if (event.length != null) {
          clean.length = normaliseDuration(event.length);
        }
        if (kind === "note") {
          clean.pitch = NOTE_PITCHES.indexOf((event.pitch || "").toLowerCase()) !== -1
            ? event.pitch.toLowerCase()
            : "c";
          if (event.octave != null) {
            clean.octave = normaliseOctave(event.octave);
          }
        }
        return clean;
      })
      : []
  };

  if (tune.notes.length > Blockly.FieldTuneComposer.MAX_EVENTS) {
    tune.notes = tune.notes.slice(0, Blockly.FieldTuneComposer.MAX_EVENTS);
  }

  tune.rtttl = buildRtttl(tune).rtttl;
  return tune;
}

/**
 * Shallow equality between two tunes based on serialised value.
 * @param {!Object} a
 * @param {!Object} b
 * @return {boolean}
 */
function tunesEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Blockly field that draws a button labelled "edit" and opens a custom
 * composer dialog.
 * @param {?string=} opt_value
 * @param {?function(string):?string=} opt_validator
 * @constructor
 * @extends {Blockly.Field}
 */
Blockly.FieldTuneComposer = function (opt_value, opt_validator) {
  const value = opt_value || JSON.stringify(buildDefaultTune());
  Blockly.FieldTuneComposer.superClass_.constructor.call(this, value, opt_validator);
  this.size_ = new goog.math.Size(0, 24);
  this.tooltip_ = Blockly.Msg.TUNE_COMPOSER_TOOLTIP || "Compose a tune";
  this.className_ += " blocklyTuneFieldText";

  /** @type {!Object} */
  this.editingTune_ = null;

  /** @type {!Array<!Object>} */
  this.undoStack_ = [];

  /** @type {!Array<!Object>} */
  this.redoStack_ = [];

  /** @type {number} */
  this.selectedEventIndex_ = -1;

  /** @type {number} */
  this.selectedLength_ = 4;

  /** @type {boolean} */
  this.selectedDotted_ = false;

  /** @type {number} */
  this.inputOctave_ = 5;

  /** @type {?HTMLElement} */
  this.sequenceContainer_ = null;

  /** @type {?HTMLElement} */
  this.previewElement_ = null;

  /** @type {?HTMLElement} */
  this.warningElement_ = null;

  /** @type {?Blockly.MusicalStaffComponent} */
  this.staffComponent_ = null;

  /** @type {boolean} */
  this.isAdvancedMode_ = false;

  /** @type {?Object<string, !HTMLElement>} */
  this.modeButtons_ = null;

  /** @type {?HTMLElement} */
  this.toolbarElement_ = null;

  /** @type {?HTMLElement} */
  this.sequencePanelElement_ = null;

  /** @type {?HTMLElement} */
  this.titleInput_ = null;

  /** @type {?HTMLElement} */
  this.bpmInput_ = null;

  /** @type {?HTMLElement} */
  this.defaultDurationSelect_ = null;

  /** @type {?HTMLElement} */
  this.defaultOctaveSelect_ = null;

  /** @type {?HTMLElement} */
  this.dotToggle_ = null;

  /** @type {!Array<!HTMLElement>} */
  this.lengthButtons_ = [];

  /** @type {?HTMLElement} */
  this.perNoteLengthSelect_ = null;

  /** @type {?HTMLElement} */
  this.perNoteOctaveSelect_ = null;

  /** @type {?HTMLInputElement} */
  this.perNoteDottedCheckbox_ = null;

  /** @type {?HTMLElement} */
  this.perNotePitchSelect_ = null;

  /** @type {?HTMLElement} */
  this.kindSelect_ = null;

  this.setValue(value);
  this.setText(this.tuneModel_.title || "MyTune");
};

goog.inherits(Blockly.FieldTuneComposer, Blockly.Field);

/**
 * Emphasise that the tune title is clickable.
 * @type {string}
 */
Blockly.FieldTuneComposer.prototype.CURSOR = "pointer";


/**
 * Override setValue to keep tune state and block label in sync without
 * exposing the JSON payload on the block.
 * @param {?string|!Object} newValue
 * @override
 */
Blockly.FieldTuneComposer.prototype.setValue = function (newValue) {
  if (newValue === null || newValue === undefined) {
    return;
  }
  const parsed = parseTuneValue(newValue);
  const serialised = JSON.stringify(parsed);
  const oldValue = typeof this.value_ === "string" ? this.value_ : null;
  if (oldValue === serialised) {
    return;
  }
  if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
    Blockly.Events.fire(
      new Blockly.Events.BlockChange(
        this.sourceBlock_,
        "field",
        this.name,
        oldValue,
        serialised
      )
    );
  }
  this.tuneModel_ = parsed;
  this.value_ = serialised;
  this.setText(parsed.title);
  this.applyTitleToLabel_();
};


/**
 * Maximum number of note/rest events stored in a tune.
 * @type {number}
 * @const
 */
Blockly.FieldTuneComposer.MAX_EVENTS = 256;

/**
 * Minimum BPM permitted in the editor UI.
 * @type {number}
 * @const
 */
Blockly.FieldTuneComposer.MIN_BPM = 25;

/**
 * Maximum BPM permitted in the editor UI (hard limit, soft limit is 240).
 * @type {number}
 * @const
 */
Blockly.FieldTuneComposer.MAX_BPM = 900;


/**
 * Construct a FieldTuneComposer from JSON options.
 * @param {!Object} options
 * @return {!Blockly.FieldTuneComposer}
 */
Blockly.FieldTuneComposer.fromJson = function (options) {
  return new Blockly.FieldTuneComposer(options["tune"] || options["value"]);
};

/**
 * Used by Blockly to fetch the text shown on the block.
 * @return {string}
 * @override
 */
Blockly.FieldTuneComposer.prototype.getText = function () {
  return "";
};

/**
 * Updates the field when its value changes.
 * @param {string} newValue
 * @override
 */
Blockly.FieldTuneComposer.prototype.doValueUpdate_ = function (newValue) {
  const parsed = parseTuneValue(newValue);
  this.tuneModel_ = parsed;
  this.value_ = JSON.stringify(parsed);
  this.setText(parsed.title);
  this.applyTitleToLabel_();
};

/**
 * Return the serialised value stored inside the field.
 * @return {string}
 * @override
 */
Blockly.FieldTuneComposer.prototype.getValue = function () {
  return JSON.stringify(this.tuneModel_);
};

Blockly.FieldTuneComposer.prototype.updateSize_ = function () {
  this.size_.width = 16;
  this.size_.height = 24;
};

Blockly.FieldTuneComposer.prototype.init = function (block) {
  if (this.fieldGroup_) {
    return;
  }
  Blockly.FieldTuneComposer.superClass_.init.call(this, block);
  if (this.fieldGroup_) {
    Blockly.utils.addClass(this.fieldGroup_, "blocklyTuneFieldGroup");
  }
  this.box_ = Blockly.utils.createSvgElement(
    "rect",
    {
      rx: 6,
      ry: 6,
      x: 0,
      y: 0,
      width: this.size_.width,
      height: this.size_.height,
      class: "blocklyTuneFieldBorder",
      "vector-effect": "non-scaling-stroke",
    },
    null
  );
  if (this.fieldGroup_ && this.textElement_) {
    this.fieldGroup_.insertBefore(this.box_, this.textElement_);
  }
  this.setText(this.tuneModel_ ? this.tuneModel_.title : "MyTune");
  this.applyTitleToLabel_();
};

Blockly.FieldTuneComposer.prototype.applyTitleToLabel_ = function () {
  const title = this.tuneModel_ && this.tuneModel_.title ? this.tuneModel_.title : "MyTune";
  if (!this.sourceBlock_ || typeof this.sourceBlock_.setFieldValue !== "function") {
    return;
  }
  try {
    this.sourceBlock_.setFieldValue(title, "TUNE_TITLE");
  } catch (e) {
    // Field might not exist if the block is mid-disposal; ignore.
  }
};

/**
 * Show the custom composer UI.
 * @override
 */
Blockly.FieldTuneComposer.prototype.showEditor_ = function () {
  Blockly.DropDownDiv.hideWithoutAnimation();
  Blockly.DropDownDiv.clearContent();
  const div = Blockly.DropDownDiv.getContentDiv();
  div.className = "tune-composer";
  const storedTune = parseTuneValue(this.getValue());
  this.tuneModel_ = storedTune;
  this.applyTitleToLabel_();
  this.editingTune_ = cloneTune(storedTune);
  this.undoStack_ = [];
  this.redoStack_ = [];
  this.selectedEventIndex_ = -1;
  this.selectedLength_ = this.editingTune_.defaultDuration || 4;
  this.selectedDotted_ = false;
  this.inputOctave_ = this.editingTune_.defaultOctave || 5;
  this.isAdvancedMode_ = false;
  this.modeButtons_ = null;
  this.toolbarElement_ = null;
  this.sequencePanelElement_ = null;
  this.staffComponent_ = null;

  div.appendChild(this.buildHeader_());
  div.appendChild(this.buildToolbar_());
  div.appendChild(this.buildKeyboard_());
  div.appendChild(this.buildSequencePanel_());
  div.appendChild(this.buildFooter_());

  this.setEditorMode_(false);

  Blockly.DropDownDiv.setColour(
    this.sourceBlock_ ? this.sourceBlock_.getColour() : "#ffab19",
    this.sourceBlock_ ? this.sourceBlock_.getColourTertiary() : "#ffab19"
  );
  Blockly.DropDownDiv.setCategory(this.sourceBlock_ ? this.sourceBlock_.getCategory() : "sound");
  Blockly.DropDownDiv.showPositionedByBlock(this, this.sourceBlock_, this.onHide_.bind(this));

  this.refreshSequence_();
  this.updatePreview_();
};

/**
 * Create the header row containing text inputs.
 * @return {!HTMLElement}
 * @private
 */
Blockly.FieldTuneComposer.prototype.buildHeader_ = function () {
  const header = document.createElement("div");
  header.className = "tune-composer__header";

  const modeRow = document.createElement("div");
  modeRow.className = "tune-composer__mode";

  const modeLabel = document.createElement("span");
  modeLabel.className = "tune-composer__mode-label";
  modeLabel.textContent = Blockly.Msg.TUNE_COMPOSER_MODE_LABEL || "Mode";
  modeRow.appendChild(modeLabel);

  const modeToggle = document.createElement("div");
  modeToggle.className = "tune-composer__mode-toggle";
  modeToggle.setAttribute("role", "group");
  modeToggle.setAttribute("aria-label", Blockly.Msg.TUNE_COMPOSER_MODE_LABEL || "Mode");

  const beginnerBtn = document.createElement("button");
  beginnerBtn.setAttribute("type", "button");
  beginnerBtn.textContent = Blockly.Msg.TUNE_COMPOSER_MODE_BEGINNER || "Beginner";
  beginnerBtn.addEventListener("click", function (event) {
    event.preventDefault();
    this.setEditorMode_(false);
  }.bind(this));
  modeToggle.appendChild(beginnerBtn);

  const advancedBtn = document.createElement("button");
  advancedBtn.setAttribute("type", "button");
  advancedBtn.textContent = Blockly.Msg.TUNE_COMPOSER_MODE_ADVANCED || "Beethoven";
  advancedBtn.addEventListener("click", function (event) {
    event.preventDefault();
    this.setEditorMode_(true);
  }.bind(this));
  modeToggle.appendChild(advancedBtn);

  modeRow.appendChild(modeToggle);
  header.appendChild(modeRow);

  this.modeButtons_ = {
    beginner: beginnerBtn,
    advanced: advancedBtn
  };

  const titleLabel = document.createElement("label");
  titleLabel.textContent = Blockly.Msg.TUNE_COMPOSER_TITLE || "Title";
  header.appendChild(titleLabel);

  this.titleInput_ = document.createElement("input");
  this.titleInput_.setAttribute("type", "text");
  this.titleInput_.setAttribute("maxlength", "22");
  this.titleInput_.setAttribute("width", "120");
  this.titleInput_.value = this.editingTune_.title || "MyTune";
  this.titleInput_.addEventListener("input", this.onHeaderChange_.bind(this));
  header.appendChild(this.titleInput_);

  const bpmLabel = document.createElement("label");
  bpmLabel.textContent = Blockly.Msg.TUNE_COMPOSER_BPM || "BPM";
  header.appendChild(bpmLabel);

  this.bpmInput_ = document.createElement("input");
  this.bpmInput_.setAttribute("type", "number");
  this.bpmInput_.setAttribute("min", String(Blockly.FieldTuneComposer.MIN_BPM));
  this.bpmInput_.setAttribute("max", String(Blockly.FieldTuneComposer.MAX_BPM));
  this.bpmInput_.value = String(this.editingTune_.bpm || 120);
  this.bpmInput_.addEventListener("change", this.onHeaderChange_.bind(this));
  this.bpmInput_.addEventListener("input", this.onHeaderChange_.bind(this));
  header.appendChild(this.bpmInput_);

  const durationLabel = document.createElement("label");
  durationLabel.textContent = Blockly.Msg.TUNE_COMPOSER_DEFAULT_DURATION || "Default Length";
  header.appendChild(durationLabel);

  this.defaultDurationSelect_ = document.createElement("select");
  NOTE_LENGTHS.forEach(function (len) {
    const option = document.createElement("option");
    option.value = String(len);
    option.textContent = `1/${len}`;
    if (len === (this.editingTune_.defaultDuration || 4)) {
      option.selected = true;
    }
    this.defaultDurationSelect_.appendChild(option);
  }, this);
  this.defaultDurationSelect_.addEventListener("change", this.onHeaderChange_.bind(this));
  header.appendChild(this.defaultDurationSelect_);

  const octaveLabel = document.createElement("label");
  octaveLabel.textContent = Blockly.Msg.TUNE_COMPOSER_DEFAULT_OCTAVE || "Default octave";
  header.appendChild(octaveLabel);

  this.defaultOctaveSelect_ = document.createElement("select");
  [4, 5, 6].forEach(function (oct) {
    const option = document.createElement("option");
    option.value = String(oct);
    option.textContent = `o${oct}`;
    if (oct === (this.editingTune_.defaultOctave || 5)) {
      option.selected = true;
    }
    this.defaultOctaveSelect_.appendChild(option);
  }, this);
  this.defaultOctaveSelect_.addEventListener("change", this.onHeaderChange_.bind(this));
  header.appendChild(this.defaultOctaveSelect_);

  return header;
};

/**
 * Handles changes to the header inputs.
 * @private
 */
Blockly.FieldTuneComposer.prototype.onHeaderChange_ = function () {
  if (!this.editingTune_) {
    return;
  }
  this.editingTune_.title = sanitiseTitle(this.titleInput_.value);
  this.editingTune_.bpm = normaliseBpm(this.bpmInput_.value);
  this.editingTune_.defaultDuration = normaliseDuration(this.defaultDurationSelect_.value);
  this.editingTune_.defaultOctave = normaliseOctave(this.defaultOctaveSelect_.value);
  this.inputOctave_ = this.editingTune_.defaultOctave;
  this.selectedLength_ = this.editingTune_.defaultDuration;
  this.updatePreview_();
};

/**
 * Builds the toolbar containing rhythm/rest controls.
 * @return {!HTMLElement}
 * @private
 */
Blockly.FieldTuneComposer.prototype.buildToolbar_ = function () {
  const toolbar = document.createElement("div");
  toolbar.className = "tune-composer__toolbar";
  this.toolbarElement_ = toolbar;

  const lengthGroup = document.createElement("div");
  lengthGroup.className = "tune-composer__lengths";
  NOTE_LENGTHS.forEach(function (len) {
    const btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.textContent = `1/${len}`;
    btn.dataset["length"] = String(len);
    if (len === this.selectedLength_) {
      btn.classList.add("is-selected");
    }
    btn.addEventListener("click", function () {
      this.selectedLength_ = len;
      this.refreshLengthButtons_();
    }.bind(this));
    this.lengthButtons_.push(btn);
    lengthGroup.appendChild(btn);
  }, this);
  toolbar.appendChild(lengthGroup);

  this.dotToggle_ = document.createElement("button");
  this.dotToggle_.setAttribute("type", "button");
  this.dotToggle_.className = "tune-composer__dot";
  this.dotToggle_.textContent = Blockly.Msg.TUNE_COMPOSER_DOTTED || "Dotted";
  this.dotToggle_.addEventListener("click", function () {
    this.selectedDotted_ = !this.selectedDotted_;
    if (this.dotToggle_) {
      this.dotToggle_.classList.toggle("is-selected", this.selectedDotted_);
    }
  }.bind(this));
  toolbar.appendChild(this.dotToggle_);

  const restButton = document.createElement("button");
  restButton.setAttribute("type", "button");
  restButton.className = "tune-composer__rest";
  restButton.textContent = Blockly.Msg.TUNE_COMPOSER_REST || "Rest";
  restButton.addEventListener("click", function () {
    if (!this.editingTune_) {
      return;
    }
    if (this.editingTune_.notes.length >= Blockly.FieldTuneComposer.MAX_EVENTS) {
      this.showWarning_(Blockly.Msg.TUNE_COMPOSER_MAX_EVENTS_WARNING || "Too many notes");
      return;
    }
    this.pushUndo_();
    this.editingTune_.notes.push({
      kind: "rest",
      length: this.selectedLength_,
      dotted: this.selectedDotted_
    });
    this.selectedEventIndex_ = this.editingTune_.notes.length - 1;
    this.selectedDotted_ = false;
    if (this.dotToggle_) {
      this.dotToggle_.classList.remove("is-selected");
    }
    this.refreshSequence_();
    this.updatePreview_();
  }.bind(this));
  toolbar.appendChild(restButton);

  const octaveSelect = document.createElement("select");
  octaveSelect.className = "tune-composer__octave";
  OCTAVE_VALUES.forEach(function (oct) {
    const option = document.createElement("option");
    option.value = String(oct);
    option.textContent = `o${oct}`;
    if (oct === this.inputOctave_) {
      option.selected = true;
    }
    octaveSelect.appendChild(option);
  }, this);
  octaveSelect.addEventListener("change", function (event) {
    const value = Number(event.target.value);
    this.inputOctave_ = normaliseOctave(value);
  }.bind(this));
  toolbar.appendChild(octaveSelect);

  return toolbar;
};

/**
 * Highlight the selected length button.
 * @private
 */
Blockly.FieldTuneComposer.prototype.refreshLengthButtons_ = function () {
  this.lengthButtons_.forEach(function (btn) {
    btn.classList.toggle("is-selected", Number(btn.dataset["length"]) === this.selectedLength_);
  }, this);
};

/**
 * Builds the piano style keyboard.
 * @return {!HTMLElement}
 * @private
 */
Blockly.FieldTuneComposer.prototype.buildKeyboard_ = function () {
  const keyboard = document.createElement("div");
  keyboard.className = "tune-composer__keyboard";
  const piano = document.createElement("div");
  piano.className = "tune-composer__piano";

  const whiteContainer = document.createElement("div");
  whiteContainer.className = "tune-composer__piano-whites";
  const whiteKeys = ["c", "d", "e", "f", "g", "a", "b"];
  whiteKeys.forEach(function (pitch) {
    const btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.className = "piano-key piano-key--white";
    btn.dataset["pitch"] = pitch;
    btn.textContent = pitch.toUpperCase();
    btn.setAttribute("aria-label", pitch.toUpperCase());
    btn.addEventListener("click", function () {
      this.addNote_(pitch);
    }.bind(this));
    whiteContainer.appendChild(btn);
  }, this);

  const blackContainer = document.createElement("div");
  blackContainer.className = "tune-composer__piano-blacks";
  const blackKeyAnchors = [
    { pitch: "c#", anchorIndex: 0 },
    { pitch: "d#", anchorIndex: 1 },
    { pitch: "f#", anchorIndex: 3 },
    { pitch: "g#", anchorIndex: 4 },
    { pitch: "a#", anchorIndex: 5 }
  ];
  const step = 100 / whiteKeys.length;
  blackKeyAnchors.forEach(function (config) {
    const btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.className = "piano-key piano-key--black";
    btn.dataset["pitch"] = config.pitch;
    btn.textContent = config.pitch.toUpperCase();
    btn.setAttribute("aria-label", config.pitch.toUpperCase());
    btn.style.left = `${step * (config.anchorIndex + 1)}%`;
    btn.addEventListener("click", function () {
      this.addNote_(config.pitch);
    }.bind(this));
    blackContainer.appendChild(btn);
  }, this);

  piano.appendChild(whiteContainer);
  piano.appendChild(blackContainer);
  keyboard.appendChild(piano);
  return keyboard;
};

/**
 * Adds a note event using the current toolbar state.
 * @param {string} pitch
 * @private
 */
Blockly.FieldTuneComposer.prototype.addNote_ = function (pitch) {
  if (!this.editingTune_) {
    return;
  }
  if (this.editingTune_.notes.length >= Blockly.FieldTuneComposer.MAX_EVENTS) {
    this.showWarning_(Blockly.Msg.TUNE_COMPOSER_MAX_EVENTS_WARNING || "Too many notes");
    return;
  }
  const safePitch = NOTE_PITCHES.indexOf(pitch) !== -1 ? pitch : "c";
  this.pushUndo_();
  const event = {
    kind: "note",
    pitch: safePitch,
    length: this.selectedLength_,
    dotted: this.selectedDotted_
  };
  if (this.inputOctave_ !== this.editingTune_.defaultOctave) {
    event.octave = this.inputOctave_;
  }
  this.editingTune_.notes.push(event);
  this.selectedEventIndex_ = this.editingTune_.notes.length - 1;
  this.selectedDotted_ = false;
  if (this.dotToggle_) {
    this.dotToggle_.classList.remove("is-selected");
  }
  this.refreshSequence_();
  this.updatePreview_();
};

/**
 * Builds the sequence/timeline panel.
 * @return {!HTMLElement}
 * @private
 */
Blockly.FieldTuneComposer.prototype.buildSequencePanel_ = function () {
  const panel = document.createElement("div");
  panel.className = "tune-composer__sequence";
  this.sequencePanelElement_ = panel;

  this.sequenceContainer_ = document.createElement("div");
  this.sequenceContainer_.className = "tune-composer__sequence-list";
  panel.appendChild(this.sequenceContainer_);

  const perNoteControls = document.createElement("div");
  perNoteControls.className = "tune-composer__per-note";

  const kindLabel = document.createElement("label");
  kindLabel.textContent = Blockly.Msg.TUNE_COMPOSER_EVENT_KIND || "Event";
  perNoteControls.appendChild(kindLabel);

  this.kindSelect_ = document.createElement("select");
  [{ label: Blockly.Msg.TUNE_COMPOSER_KIND_NOTE || "Note", value: "note" },
  { label: Blockly.Msg.TUNE_COMPOSER_KIND_REST || "Rest", value: "rest" }]
    .forEach(function (entry) {
      const option = document.createElement("option");
      option.value = entry.value;
      option.textContent = entry.label;
      this.kindSelect_.appendChild(option);
    }, this);
  this.kindSelect_.addEventListener("change", this.onPerNoteChange_.bind(this));
  perNoteControls.appendChild(this.kindSelect_);

  const lengthLabel = document.createElement("label");
  lengthLabel.textContent = Blockly.Msg.TUNE_COMPOSER_NOTE_LENGTH || "Length";
  perNoteControls.appendChild(lengthLabel);

  this.perNoteLengthSelect_ = document.createElement("select");
  NOTE_LENGTHS.forEach(function (len) {
    const option = document.createElement("option");
    option.value = String(len);
    option.textContent = `1/${len}`;
    this.perNoteLengthSelect_.appendChild(option);
  }, this);
  this.perNoteLengthSelect_.addEventListener("change", this.onPerNoteChange_.bind(this));
  perNoteControls.appendChild(this.perNoteLengthSelect_);

  const dottedLabel = document.createElement("label");
  dottedLabel.textContent = Blockly.Msg.TUNE_COMPOSER_PERNOTE_DOTTED || "Dotted";
  perNoteControls.appendChild(dottedLabel);

  const dottedCheckbox = document.createElement("input");
  dottedCheckbox.type = "checkbox";
  dottedCheckbox.addEventListener("change", this.onPerNoteChange_.bind(this));
  this.perNoteDottedCheckbox_ = dottedCheckbox;
  perNoteControls.appendChild(dottedCheckbox);

  const pitchLabel = document.createElement("label");
  pitchLabel.textContent = Blockly.Msg.TUNE_COMPOSER_NOTE_PITCH || "Pitch";
  perNoteControls.appendChild(pitchLabel);

  this.perNotePitchSelect_ = document.createElement("select");
  NOTE_PITCHES.forEach(function (pitch) {
    const option = document.createElement("option");
    option.value = pitch;
    option.textContent = pitch.toUpperCase();
    this.perNotePitchSelect_.appendChild(option);
  }, this);
  this.perNotePitchSelect_.addEventListener("change", this.onPerNoteChange_.bind(this));
  perNoteControls.appendChild(this.perNotePitchSelect_);

  const octaveLabel = document.createElement("label");
  octaveLabel.textContent = Blockly.Msg.TUNE_COMPOSER_NOTE_OCTAVE || "Octave";
  perNoteControls.appendChild(octaveLabel);

  this.perNoteOctaveSelect_ = document.createElement("select");
  [{ label: Blockly.Msg.TUNE_COMPOSER_DEFAULT_OPTION || "default", value: "" }]
    .concat(OCTAVE_VALUES.map(function (oct) {
      return { label: `o${oct}`, value: String(oct) };
    }))
    .forEach(function (entry) {
      const option = document.createElement("option");
      option.value = entry.value;
      option.textContent = entry.label;
      this.perNoteOctaveSelect_.appendChild(option);
    }, this);
  this.perNoteOctaveSelect_.addEventListener("change", this.onPerNoteChange_.bind(this));
  perNoteControls.appendChild(this.perNoteOctaveSelect_);


  // add an empty div to push the delete button to the right
  const spacer = document.createElement("div");
  spacer.style.flex = "1";
  perNoteControls.appendChild(spacer);

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("type", "button");
  deleteBtn.className = "tune-composer__delete";
  deleteBtn.textContent = Blockly.Msg.TUNE_COMPOSER_DELETE_EVENT || "Delete";
  deleteBtn.addEventListener("click", this.deleteSelectedEvent_.bind(this));
  perNoteControls.appendChild(deleteBtn);

  const moveLeftBtn = document.createElement("button");
  moveLeftBtn.setAttribute("type", "button");
  moveLeftBtn.textContent = Blockly.Msg.TUNE_COMPOSER_MOVE_LEFT || "<";
  moveLeftBtn.addEventListener("click", this.moveEventLeft_.bind(this));
  perNoteControls.appendChild(moveLeftBtn);

  const moveRightBtn = document.createElement("button");
  moveRightBtn.setAttribute("type", "button");
  moveRightBtn.textContent = Blockly.Msg.TUNE_COMPOSER_MOVE_RIGHT || ">";
  moveRightBtn.addEventListener("click", this.moveEventRight_.bind(this));
  perNoteControls.appendChild(moveRightBtn);

  panel.appendChild(perNoteControls);

  return panel;
};

/** @private */
Blockly.FieldTuneComposer.prototype.onPerNoteChange_ = function () {
  if (!this.editingTune_ || this.selectedEventIndex_ < 0) {
    return;
  }
  const event = this.editingTune_.notes[this.selectedEventIndex_];
  if (!event) {
    return;
  }
  this.pushUndo_();
  const kind = this.kindSelect_.value === "rest" ? "rest" : "note";
  event.kind = kind;
  event.length = normaliseDuration(this.perNoteLengthSelect_.value);
  event.dotted = !!this.perNoteDottedCheckbox_.checked;
  if (kind === "note") {
    event.pitch = NOTE_PITCHES.indexOf(this.perNotePitchSelect_.value) !== -1 ? this.perNotePitchSelect_.value : "c";
    const octValue = this.perNoteOctaveSelect_.value;
    if (octValue === "") {
      delete event.octave;
    } else {
      event.octave = normaliseOctave(octValue);
    }
  } else {
    delete event.pitch;
    delete event.octave;
  }
  this.refreshSequence_();
  this.updatePreview_();
};

/**
 * Remove the selected event from the tune.
 * @private
 */
Blockly.FieldTuneComposer.prototype.deleteSelectedEvent_ = function () {
  if (!this.editingTune_ || this.selectedEventIndex_ < 0) {
    return;
  }
  this.pushUndo_();
  this.editingTune_.notes.splice(this.selectedEventIndex_, 1);
  this.selectedEventIndex_ = clamp(this.selectedEventIndex_, -1, this.editingTune_.notes.length - 1);
  this.refreshSequence_();
  this.updatePreview_();
};

/** @private */
Blockly.FieldTuneComposer.prototype.moveEventLeft_ = function () {
  if (!this.editingTune_ || this.selectedEventIndex_ <= 0) {
    return;
  }
  this.pushUndo_();
  const index = this.selectedEventIndex_;
  const temp = this.editingTune_.notes[index - 1];
  this.editingTune_.notes[index - 1] = this.editingTune_.notes[index];
  this.editingTune_.notes[index] = temp;
  this.selectedEventIndex_ = index - 1;
  this.refreshSequence_();
  this.updatePreview_();
};

/** @private */
Blockly.FieldTuneComposer.prototype.moveEventRight_ = function () {
  if (!this.editingTune_ || this.selectedEventIndex_ < 0 || this.selectedEventIndex_ >= this.editingTune_.notes.length - 1) {
    return;
  }
  this.pushUndo_();
  const index = this.selectedEventIndex_;
  const temp = this.editingTune_.notes[index + 1];
  this.editingTune_.notes[index + 1] = this.editingTune_.notes[index];
  this.editingTune_.notes[index] = temp;
  this.selectedEventIndex_ = index + 1;
  this.refreshSequence_();
  this.updatePreview_();
};

/**
 * Builds footer containing preview + controls.
 * @return {!HTMLElement}
 * @private
 */
Blockly.FieldTuneComposer.prototype.buildFooter_ = function () {
  const footer = document.createElement("div");
  footer.className = "tune-composer__footer";

  this.warningElement_ = document.createElement("div");
  this.warningElement_.className = "tune-composer__warning";
  footer.appendChild(this.warningElement_);

  this.previewElement_ = document.createElement("textarea");
  this.previewElement_.setAttribute("readonly", "readonly");
  this.previewElement_.className = "tune-composer__preview";
  footer.appendChild(this.previewElement_);

  const staffWrapper = document.createElement("div");
  staffWrapper.className = "tune-composer__staff";
  this.staffComponent_ = new Blockly.MusicalStaffComponent();
  staffWrapper.appendChild(this.staffComponent_.getElement());
  footer.appendChild(staffWrapper);

  const controls = document.createElement("div");
  controls.className = "tune-composer__actions";

  const undoBtn = document.createElement("button");
  undoBtn.setAttribute("type", "button");
  undoBtn.textContent = Blockly.Msg.TUNE_COMPOSER_UNDO || "Undo";
  undoBtn.addEventListener("click", this.undo_.bind(this));
  controls.appendChild(undoBtn);

  const redoBtn = document.createElement("button");
  redoBtn.setAttribute("type", "button");
  redoBtn.textContent = Blockly.Msg.TUNE_COMPOSER_REDO || "Redo";
  redoBtn.addEventListener("click", this.redo_.bind(this));
  controls.appendChild(redoBtn);

  const clearBtn = document.createElement("button");
  clearBtn.setAttribute("type", "button");
  clearBtn.textContent = Blockly.Msg.TUNE_COMPOSER_CLEAR || "Clear";
  clearBtn.addEventListener("click", function () {
    if (!this.editingTune_) {
      return;
    }
    this.pushUndo_();
    this.editingTune_.notes = [];
    this.selectedEventIndex_ = -1;
    this.refreshSequence_();
    this.updatePreview_();
  }.bind(this));
  controls.appendChild(clearBtn);

  const playBtn = document.createElement("button");
  playBtn.setAttribute("type", "button");
  playBtn.textContent = Blockly.Msg.TUNE_COMPOSER_PLAY || "Play";
  playBtn.addEventListener("click", this.previewTune_.bind(this));
  controls.appendChild(playBtn);

  const saveBtn = document.createElement("button");
  saveBtn.setAttribute("type", "button");
  saveBtn.className = "primary";
  saveBtn.textContent = Blockly.Msg.TUNE_COMPOSER_SAVE || "Save";
  saveBtn.addEventListener("click", this.commitEdit_.bind(this));
  controls.appendChild(saveBtn);

  const cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("type", "button");
  cancelBtn.textContent = Blockly.Msg.TUNE_COMPOSER_CANCEL || "Cancel";
  cancelBtn.addEventListener("click", function () {
    // Blockly.DropDownDiv.hideIfOwner(this);
    Blockly.DropDownDiv.hide();
  }.bind(this));
  controls.appendChild(cancelBtn);

  footer.appendChild(controls);

  return footer;
};

/**
 * Commit the edited tune back to the field value.
 * @private
 */
Blockly.FieldTuneComposer.prototype.commitEdit_ = function () {
  if (!this.editingTune_) {
    // Blockly.DropDownDiv.hideIfOwner(this);
    Blockly.DropDownDiv.hide();
    return;
  }
  const preview = buildRtttl(this.editingTune_);
  if (preview.issues.indexOf("too_many_notes") !== -1) {
    this.showWarning_(Blockly.Msg.TUNE_COMPOSER_MAX_EVENTS_WARNING || "Too many notes");
    return;
  }
  this.editingTune_.title = sanitiseTitle(this.editingTune_.title);
  this.editingTune_.bpm = normaliseBpm(this.editingTune_.bpm);
  this.editingTune_.defaultDuration = normaliseDuration(this.editingTune_.defaultDuration);
  this.editingTune_.defaultOctave = normaliseOctave(this.editingTune_.defaultOctave);
  this.editingTune_.rtttl = preview.rtttl;
  const serialised = JSON.stringify(this.editingTune_);
  if (!tunesEqual(this.tuneModel_, this.editingTune_)) {
    this.setValue(serialised);
    if (typeof this.forceRerender === "function") {
      this.forceRerender();
    }
  }
  // Blockly.DropDownDiv.hideIfOwner(this);
  Blockly.DropDownDiv.hide();
};

/**
 * Push the current edit state onto the undo stack.
 * @private
 */
Blockly.FieldTuneComposer.prototype.pushUndo_ = function () {
  if (!this.editingTune_) {
    return;
  }
  this.undoStack_.push(cloneTune(this.editingTune_));
  this.redoStack_ = [];
};

/**
 * Undo the latest change.
 * @private
 */
Blockly.FieldTuneComposer.prototype.undo_ = function () {
  if (!this.undoStack_.length) {
    return;
  }
  const previous = this.undoStack_.pop();
  this.redoStack_.push(cloneTune(this.editingTune_));
  this.editingTune_ = previous;
  this.selectedEventIndex_ = clamp(this.selectedEventIndex_, -1, this.editingTune_.notes.length - 1);
  this.refreshSequence_();
  this.updatePreview_();
};

/**
 * Redo the latest undone change.
 * @private
 */
Blockly.FieldTuneComposer.prototype.redo_ = function () {
  if (!this.redoStack_.length) {
    return;
  }
  const restored = this.redoStack_.pop();
  this.undoStack_.push(cloneTune(this.editingTune_));
  this.editingTune_ = restored;
  this.selectedEventIndex_ = clamp(this.selectedEventIndex_, -1, this.editingTune_.notes.length - 1);
  this.refreshSequence_();
  this.updatePreview_();
};

/**
 * Switch between beginner and advanced composer modes.
 * @param {boolean} advanced
 * @private
 */
Blockly.FieldTuneComposer.prototype.setEditorMode_ = function (advanced) {
  this.isAdvancedMode_ = Boolean(advanced);
  if (this.modeButtons_) {
    this.modeButtons_.beginner.classList.toggle("is-selected", !this.isAdvancedMode_);
    this.modeButtons_.advanced.classList.toggle("is-selected", this.isAdvancedMode_);
    this.modeButtons_.beginner.setAttribute("aria-pressed", String(!this.isAdvancedMode_));
    this.modeButtons_.advanced.setAttribute("aria-pressed", String(this.isAdvancedMode_));
  }
  this.applyModeVisibility_();
  if (this.isAdvancedMode_) {
    this.refreshSequence_();
  }
};

/**
 * Apply visibility rules based on the current mode.
 * @private
 */
Blockly.FieldTuneComposer.prototype.applyModeVisibility_ = function () {
  const advanced = this.isAdvancedMode_;
  if (this.toolbarElement_) {
    this.toolbarElement_.style.display = advanced ? "" : "none";
  }
  if (this.sequencePanelElement_) {
    this.sequencePanelElement_.style.display = advanced ? "" : "none";
  }
  if (this.previewElement_) {
    this.previewElement_.style.display = advanced ? "" : "none";
  }
};

/**
 * Update the preview textarea and guardrail warnings.
 * @private
 */
Blockly.FieldTuneComposer.prototype.updatePreview_ = function () {
  if (!this.editingTune_) {
    return;
  }
  const preview = buildRtttl(this.editingTune_);
  let warning = "";
  if (this.previewElement_) {
    this.previewElement_.value = preview.rtttl;
  }
  if (this.staffComponent_) {
    this.staffComponent_.renderTune(this.editingTune_);
  }
  if (preview.issues.indexOf("too_many_notes") !== -1) {
    warning = Blockly.Msg.TUNE_COMPOSER_MAX_EVENTS_WARNING || "Too many notes";
  } else if (this.editingTune_.bpm > 240) {
    warning = Blockly.Msg.TUNE_COMPOSER_HIGH_BPM_WARNING || "Fast tempos may be unreliable";
  }
  this.showWarning_(warning);
};

/**
 * Show a temporary warning message.
 * @param {string} text
 * @private
 */
Blockly.FieldTuneComposer.prototype.showWarning_ = function (text) {
  if (this.warningElement_) {
    this.warningElement_.textContent = text;
  }
};

/**
 * Refresh the sequence/timeline list.
 * @private
 */
Blockly.FieldTuneComposer.prototype.refreshSequence_ = function () {
  if (!this.sequenceContainer_) {
    return;
  }
  this.sequenceContainer_.innerHTML = "";
  if (!this.editingTune_) {
    return;
  }
  this.editingTune_.notes.forEach(function (event, index) {
    const chip = document.createElement("button");
    chip.setAttribute("type", "button");
    chip.className = "tune-composer__event-chip";
    if (index === this.selectedEventIndex_) {
      chip.classList.add("is-selected");
    }
    const summary = event.kind === "rest"
      ? (event.length ? `p (1/${event.length})` : "p")
      : `${event.pitch || "c"}${event.octave != null ? event.octave : ""}`;
    chip.textContent = event.dotted ? summary + "." : summary;
    chip.addEventListener("click", function () {
      this.selectedEventIndex_ = index;
      this.populatePerNoteControls_();
      this.refreshSequence_();
    }.bind(this));
    this.sequenceContainer_.appendChild(chip);
  }, this);
  this.populatePerNoteControls_();
};

/**
 * Update per note controls when selection changes.
 * @private
 */
Blockly.FieldTuneComposer.prototype.populatePerNoteControls_ = function () {
  if (!this.editingTune_ || this.selectedEventIndex_ < 0) {
    this.kindSelect_.value = "note";
    this.perNoteLengthSelect_.value = String(this.editingTune_ ? this.editingTune_.defaultDuration : 4);
    this.perNoteDottedCheckbox_.checked = false;
    this.perNotePitchSelect_.value = "c";
    this.perNoteOctaveSelect_.value = "";
    return;
  }
  const event = this.editingTune_.notes[this.selectedEventIndex_];
  this.kindSelect_.value = event.kind === "rest" ? "rest" : "note";
  this.perNoteLengthSelect_.value = String(event.length || this.editingTune_.defaultDuration || 4);
  this.perNoteDottedCheckbox_.checked = Boolean(event.dotted);
  this.perNotePitchSelect_.value = event.pitch || "c";
  if (event.octave != null) {
    this.perNoteOctaveSelect_.value = String(event.octave);
  } else {
    this.perNoteOctaveSelect_.value = "";
  }
};

/**
 * Naive preview by dispatching a custom Blockly event so that hosting app can
 * hook it up to hardware playback if desired.
 * @private
 */
Blockly.FieldTuneComposer.prototype.previewTune_ = function () {
  if (!this.editingTune_) {
    return;
  }
  const preview = buildRtttl(this.editingTune_);
  const workspace = this.sourceBlock_ && this.sourceBlock_.workspace;
  if (workspace) {
    Blockly.Events.fire(new Blockly.Events.Ui(this.sourceBlock_, "preview_tune", undefined, preview.rtttl));
  }
};

/**
 * When the drop-down closes, discard the editing state.
 * @override
 */
Blockly.FieldTuneComposer.prototype.onHide_ = function () {
  this.editingTune_ = null;
  this.undoStack_ = [];
  this.redoStack_ = [];
  this.sequenceContainer_ = null;
  this.previewElement_ = null;
  this.warningElement_ = null;
  this.staffComponent_ = null;
  this.modeButtons_ = null;
  this.toolbarElement_ = null;
  this.sequencePanelElement_ = null;
  this.isAdvancedMode_ = false;
};

/**
 * Register the field type.
 */
Blockly.Field.register("field_tune_composer", Blockly.FieldTuneComposer);
