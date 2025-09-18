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
 * @fileoverview CSS for the musical staff component used inside the tune composer.
 */

"use strict";

goog.provide("Blockly.MusicalStaffCss");

goog.require("Blockly.Css");

if (!Blockly.MusicalStaffCss.injected_) {
  Blockly.Css.CONTENT.push(
    '.musical-staff {',
    '  background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(240,240,240,0.98));',
    '  border: 1px solid rgba(0,0,0,0.1);',
    '  border-radius: 6px;',
    '  box-sizing: border-box;',
    '  margin-top: 4px;',
    '  overflow-x: auto;',
    '  padding: 12px;',
    '  position: relative;',
    '}',
    '.musical-staff__canvas {',
    '  min-height: 140px;',
    '  min-width: 320px;',
    '  position: relative;',
    '}',
    '.musical-staff__canvas svg {',
    '  display: block;',
    '}',
    '.musical-staff__empty {',
    '  align-items: center;',
    '  color: rgba(0,0,0,0.45);',
    '  display: none;',
    '  font-size: 0.8rem;',
    '  inset: 12px;',
    '  justify-content: center;',
    '  pointer-events: none;',
    '  position: absolute;',
    '  text-align: center;',
    '}'
  );
  Blockly.MusicalStaffCss.injected_ = true;
}

/**
 * Flag used to avoid pushing the CSS multiple times.
 * @type {boolean}
 */
Blockly.MusicalStaffCss.injected_ = Blockly.MusicalStaffCss.injected_ || false;
