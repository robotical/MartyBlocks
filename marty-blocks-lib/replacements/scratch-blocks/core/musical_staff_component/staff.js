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
 * @fileoverview Lightweight musical staff renderer used by the tune composer.
 */

"use strict";

goog.provide("Blockly.MusicalStaffComponent");

goog.require("Blockly.Msg");
goog.require("Blockly.MusicalStaffCss");
goog.require("Blockly.utils");
goog.require("goog.dom");

/**
 * Lightweight VexFlow-backed staff renderer for the tune composer preview.
 * @constructor
 */
Blockly.MusicalStaffComponent = function () {
  const root = document.createElement("div");
  root.className = "musical-staff";

  const canvas = document.createElement("div");
  canvas.className = "musical-staff__canvas";
  canvas.id = `musical-staff-${Blockly.utils.genUid()}`;
  root.appendChild(canvas);

  this.defaultEmptyText_ = (Blockly.Msg && Blockly.Msg.TUNE_COMPOSER_EMPTY_STAFF_HINT)
    ? Blockly.Msg.TUNE_COMPOSER_EMPTY_STAFF_HINT
    : "Add notes to preview";

  const empty = document.createElement("div");
  empty.className = "musical-staff__empty";
  empty.textContent = this.defaultEmptyText_;
  root.appendChild(empty);

  this.root_ = root;
  this.canvas_ = canvas;
  this.emptyLabel_ = empty;
  this.currentTune_ = null;
};

/**
 * Minimum width for the staff canvas.
 * @type {number}
 * @const
 */
Blockly.MusicalStaffComponent.MIN_WIDTH_PX = 340;

/**
 * Height of the rendered staff in pixels.
 * @type {number}
 * @const
 */
Blockly.MusicalStaffComponent.STAFF_HEIGHT_PX = 160;

/**
 * Horizontal spacing per rendered event when estimating width.
 * @type {number}
 * @const
 */
Blockly.MusicalStaffComponent.NOTE_SPACING_PX = 42;

/**
 * Default pitch used for rendering rests.
 * @type {string}
 * @const
 */
Blockly.MusicalStaffComponent.REST_PITCH = "B";

/**
 * Allowed pitch letters.
 * @type {!Array<string>}
 * @const
 */
Blockly.MusicalStaffComponent.VALID_PITCH_LETTERS = ["c", "d", "e", "f", "g", "a", "b"];

/**
 * Mapping from composer duration denominators to VexFlow durations.
 * @type {!Object<number, string>}
 * @const
 */
Blockly.MusicalStaffComponent.DURATION_MAP = {
  1: "w",
  2: "h",
  4: "q",
  8: "8",
  16: "16",
  32: "32"
};

/**
 * @return {!HTMLElement}
 */
Blockly.MusicalStaffComponent.prototype.getElement = function () {
  return this.root_;
};

/**
 * Render the provided tune on the staff using VexFlow EasyScore.
 * @param {!Object} tuneModel
 */
Blockly.MusicalStaffComponent.prototype.renderTune = function (tuneModel) {
  this.currentTune_ = tuneModel;
  goog.dom.removeChildren(this.canvas_);

  const events = (tuneModel && Array.isArray(tuneModel.notes)) ? tuneModel.notes : [];
  const defaultDuration = tuneModel && tuneModel.defaultDuration ? tuneModel.defaultDuration : 4;
  const defaultOctave = tuneModel && tuneModel.defaultOctave ? tuneModel.defaultOctave : 5;

  if (!events.length) {
    this.canvas_.style.width = "auto";
    this.showEmptyLabel_(true, null);
    return;
  }

  if (!this.isVexFlowAvailable_()) {
    this.canvas_.style.width = "auto";
    const unavailable = (Blockly.Msg && Blockly.Msg.TUNE_COMPOSER_STAFF_UNAVAILABLE)
      ? Blockly.Msg.TUNE_COMPOSER_STAFF_UNAVAILABLE
      : "Staff preview unavailable (VexFlow missing).";
    this.showEmptyLabel_(true, unavailable);
    return;
  }

  const payload = this.buildEasyScoreTokens_(events, defaultDuration, defaultOctave);
  const tokens = payload.tokens;
  if (!tokens.length) {
    this.canvas_.style.width = "auto";
    this.showEmptyLabel_(true, null);
    return;
  }

  const width = this.computeStaffWidth_(tokens.length);
  const height = Blockly.MusicalStaffComponent.STAFF_HEIGHT_PX;
  this.canvas_.style.width = `${width}px`;

  try {
    const vex = goog.global.Vex.Flow;
    const factory = new vex.Factory({
      renderer: {
        elementId: this.canvas_.id,
        width: width,
        height: height,
        background: "transparent"
      }
    });

    const context = factory.getContext();
    if (context && typeof context.setBackgroundFillStyle === "function") {
      context.setBackgroundFillStyle("transparent");
    }

    const score = factory.EasyScore();
    const staveWidth = Math.max(width - 32, Blockly.MusicalStaffComponent.MIN_WIDTH_PX - 32);
    const system = factory.System({ width: staveWidth });

    const notes = score.notes(tokens.join(", "), { clef: "treble" });
    const capacityBeats = this.computeBeatCapacity_(payload.totalBeats);
    const voice = score.voice(notes, { time: `${capacityBeats}/4` });
    voice.setMode(vex.Voice.Mode.SOFT);

    const stave = system.addStave({ voices: [voice] })
      .addClef("treble");
    if (capacityBeats === 4) {
      stave.addTimeSignature("4/4");
    }

    factory.draw();
    this.applyBeams_(notes, events, defaultDuration, context);
    this.showEmptyLabel_(false, null);
  } catch (error) {
    console.warn("Failed to render staff preview", error);
    goog.dom.removeChildren(this.canvas_);
    const message = (Blockly.Msg && Blockly.Msg.TUNE_COMPOSER_STAFF_ERROR)
      ? Blockly.Msg.TUNE_COMPOSER_STAFF_ERROR
      : "Unable to render staff preview.";
    this.showEmptyLabel_(true, message);
  }
};

/**
 * Compute target width for the staff based on note density.
 * @param {number} count
 * @return {number}
 * @private
 */
Blockly.MusicalStaffComponent.prototype.computeStaffWidth_ = function (count) {
  if (!count) {
    return Blockly.MusicalStaffComponent.MIN_WIDTH_PX;
  }
  const estimated = Blockly.MusicalStaffComponent.MIN_WIDTH_PX +
    (Math.max(0, count - 4) * Blockly.MusicalStaffComponent.NOTE_SPACING_PX);
  return Math.max(Blockly.MusicalStaffComponent.MIN_WIDTH_PX, estimated);
};

/**
 * Toggle the empty hint label visibility and text.
 * @param {boolean} visible
 * @param {?string} message
 * @private
 */
Blockly.MusicalStaffComponent.prototype.showEmptyLabel_ = function (visible, message) {
  if (!this.emptyLabel_) {
    return;
  }
  this.emptyLabel_.textContent = message || this.defaultEmptyText_;
  this.emptyLabel_.style.display = visible ? "flex" : "none";
};

/**
 * Convert the composer events into EasyScore tokens.
 * @param {!Array<!Object>} events
 * @param {number} defaultDuration
 * @param {number} defaultOctave
 * @return {{tokens: !Array<string>, totalBeats: number}}
 * @private
 */
Blockly.MusicalStaffComponent.prototype.buildEasyScoreTokens_ = function (events, defaultDuration, defaultOctave) {
  const tokens = [];
  let totalBeats = 0;
  events.forEach(function (event) {
    if (!event || typeof event !== "object") {
      return;
    }
    const kind = event.kind === "rest" ? "rest" : "note";
    const lengthValue = this.getEffectiveLength_(event.length, defaultDuration);
    const duration = this.mapDuration_(lengthValue, lengthValue);
    const dotted = event.dotted ? "." : "";
    totalBeats += this.durationToBeats_(lengthValue, Boolean(event.dotted));

    if (kind === "rest") {
      const restOctave = this.clampOctave_(defaultOctave);
      tokens.push(`${Blockly.MusicalStaffComponent.REST_PITCH}${restOctave}/${duration}${dotted}/r`);
      return;
    }

    const pitchName = this.buildPitchName_(event.pitch, event.octave, defaultOctave);
    tokens.push(`${pitchName}/${duration}${dotted}`);
  }, this);
  return {
    tokens: tokens,
    totalBeats: totalBeats
  };
};

/**
 * Map the tune duration to a VexFlow duration string.
 * @param {?number|string} length
 * @param {number} fallback
 * @return {string}
 * @private
 */
Blockly.MusicalStaffComponent.prototype.mapDuration_ = function (length, fallback) {
  const numeric = Number(length) || Number(fallback) || 4;
  return Blockly.MusicalStaffComponent.DURATION_MAP[numeric] || "q";
};

/**
 * Build a VexFlow pitch token from tune data.
 * @param {?string} pitch
 * @param {?number|string} octave
 * @param {number} defaultOctave
 * @return {?string}
 * @private
 */
Blockly.MusicalStaffComponent.prototype.buildPitchName_ = function (pitch, octave, defaultOctave) {
  const safePitch = (pitch || "c").toString().toLowerCase();
  const letter = safePitch.charAt(0);
  const hasLetter = Blockly.MusicalStaffComponent.VALID_PITCH_LETTERS.indexOf(letter) !== -1;
  const accidental = hasLetter && safePitch.indexOf("#") !== -1 ? "#" : "";
  const resolvedOctave = this.clampOctave_(octave != null ? octave : defaultOctave);
  const baseLetter = hasLetter ? letter.toUpperCase() : "C";
  return baseLetter + accidental + resolvedOctave;
};

/**
 * Clamp the octave value to a sensible range.
 * @param {?number|string} octave
 * @return {number}
 * @private
 */
Blockly.MusicalStaffComponent.prototype.clampOctave_ = function (octave) {
  const value = Number(octave);
  if (isNaN(value)) {
    return 4;
  }
  return Math.min(Math.max(Math.round(value), 1), 8);
};

/**
 * Determine if VexFlow is ready for use.
 * @return {boolean}
 * @private
 */
Blockly.MusicalStaffComponent.prototype.isVexFlowAvailable_ = function () {
  const global = goog.global;
  return Boolean(global && global.Vex && global.Vex.Flow && global.Vex.Flow.Factory);
};

/**
 * Compute the beat capacity to allow the full sequence to render.
 * @param {number} totalBeats
 * @return {number}
 * @private
 */
Blockly.MusicalStaffComponent.prototype.computeBeatCapacity_ = function (totalBeats) {
  if (!(totalBeats > 0)) {
    return 4;
  }
  const normalized = totalBeats + 1e-6;
  const measures = Math.max(1, Math.ceil(normalized / 4));
  return measures * 4;
};

/**
 * Compute the effective denominator for an event.
 * @param {?number|string} length
 * @param {number} defaultDuration
 * @return {number}
 * @private
 */
Blockly.MusicalStaffComponent.prototype.getEffectiveLength_ = function (length, defaultDuration) {
  const numeric = Number(length);
  if (!isNaN(numeric) && numeric > 0) {
    return numeric;
  }
  return Math.max(1, Number(defaultDuration) || 4);
};

/**
 * Convert a duration denominator into beats, applying dotted adjustments.
 * @param {number} length
 * @param {boolean} dotted
 * @return {number}
 * @private
 */
Blockly.MusicalStaffComponent.prototype.durationToBeats_ = function (length, dotted) {
  const denominator = Math.max(1, Number(length) || 4);
  let beats = 4 / denominator;
  if (dotted) {
    beats *= 1.5;
  }
  return beats;
};

/**
 * Determine if the given event should be grouped into a beam.
 * @param {!Object} event
 * @param {number} defaultDuration
 * @return {boolean}
 * @private
 */
Blockly.MusicalStaffComponent.prototype.shouldBeamEvent_ = function (event, defaultDuration) {
  if (!event || event.kind !== "note") {
    return false;
  }
  const lengthValue = this.getEffectiveLength_(event.length, defaultDuration);
  return lengthValue >= 8;
};

/**
 * Render beam groups for qualifying notes.
 * @param {!Array<!Object>} notes
 * @param {!Array<!Object>} events
 * @param {number} defaultDuration
 * @param {!Object} context
 * @private
 */
Blockly.MusicalStaffComponent.prototype.applyBeams_ = function (notes, events, defaultDuration, context) {
  if (!notes || !events || !context) {
    return;
  }
  const vex = goog.global.Vex.Flow;
  const beams = [];
  let group = [];
  const flushGroup = function () {
    if (group.length > 1) {
      beams.push(new vex.Beam(group));
    }
    group = [];
  };

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const event = events[i];
    if (!note || !event) {
      flushGroup();
      continue;
    }
    if (this.shouldBeamEvent_(event, defaultDuration)) {
      group.push(note);
    } else {
      flushGroup();
    }
  }
  flushGroup();

  beams.forEach(function (beam) {
    beam.setContext(context).draw();
  });
};
