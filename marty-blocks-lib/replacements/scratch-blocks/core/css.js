/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
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
 * @fileoverview Inject Blockly's CSS synchronously.
 * @author fraser@google.com (Neil Fraser)
 */
 'use strict';

 /**
  * @name Blockly.Css
  * @namespace
  */
 goog.provide('Blockly.Css');
 
 goog.require('Blockly.Colours');
 
 goog.require('goog.userAgent');
 
 /**
  * List of cursors.
  * @enum {string}
  */
 Blockly.Css.Cursor = {
   OPEN: 'handopen',
   CLOSED: 'handclosed',
   DELETE: 'handdelete'
 };
 
 /**
  * Current cursor (cached value).
  * @type {string}
  * @private
  */
 Blockly.Css.currentCursor_ = '';
 
 /**
  * Large stylesheet added by Blockly.Css.inject.
  * @type {Element}
  * @private
  */
 Blockly.Css.styleSheet_ = null;
 
 /**
  * Path to media directory, with any trailing slash removed.
  * @type {string}
  * @private
  */
 Blockly.Css.mediaPath_ = '';
 
 /**
  * Inject the CSS into the DOM.  This is preferable over using a regular CSS
  * file since:
  * a) It loads synchronously and doesn't force a redraw later.
  * b) It speeds up loading by not blocking on a separate HTTP transfer.
  * c) The CSS content may be made dynamic depending on init options.
  * @param {boolean} hasCss If false, don't inject CSS
  *     (providing CSS becomes the document's responsibility).
  * @param {string} pathToMedia Path from page to the Blockly media directory.
  */
 Blockly.Css.inject = function(hasCss, pathToMedia) {
   // Only inject the CSS once.
   if (Blockly.Css.styleSheet_) {
     return;
   }
   // Placeholder for cursor rule.  Must be first rule (index 0).
   var text = '.blocklyDraggable {}\n';
   if (hasCss) {
     text += Blockly.Css.CONTENT.join('\n');
     if (Blockly.FieldDate) {
       text += Blockly.FieldDate.CSS.join('\n');
     }
   }
   // Strip off any trailing slash (either Unix or Windows).
   Blockly.Css.mediaPath_ = pathToMedia.replace(/[\\\/]$/, '');
   text = text.replace(/<<<PATH>>>/g, Blockly.Css.mediaPath_);
   // Dynamically replace colours in the CSS text, in case they have
   // been set at run-time injection.
   for (var colourProperty in Blockly.Colours) {
     if (Blockly.Colours.hasOwnProperty(colourProperty)) {
       // Replace all
       text = text.replace(
         new RegExp('\\$colour\\_' + colourProperty, 'g'),
         Blockly.Colours[colourProperty]
       );
     }
   }
 
   // Inject CSS tag at start of head.
   var cssNode = document.createElement('style');
   document.head.insertBefore(cssNode, document.head.firstChild);
 
   var cssTextNode = document.createTextNode(text);
   cssNode.appendChild(cssTextNode);
   Blockly.Css.styleSheet_ = cssNode.sheet;
 };
 
 /**
  * Set the cursor to be displayed when over something draggable.
  * See See https://github.com/google/blockly/issues/981 for context.
  * @param {Blockly.Css.Cursor} cursor Enum.
  * @deprecated April 2017.
  */
 Blockly.Css.setCursor = function(cursor) {
   console.warn('Deprecated call to Blockly.Css.setCursor.' +
     'See https://github.com/google/blockly/issues/981 for context');
 };
 
 /**
  * Array making up the CSS content for Blockly.
  */
 Blockly.Css.CONTENT = [
   '.blocklySvg {',
     'background-color: $colour_workspace;',
     'outline: none;',
     'overflow: hidden;',  /* IE overflows by default. */
     'position: absolute;',
     'display: block;',
   '}',
 
   /* Necessary to position the drag surface */
   '.blocklyRelativeWrapper {',
     'position: relative;',
     'width: 100%;',
     'height: 100%;',
   '}',
 
   '.blocklyWidgetDiv {',
     'display: none;',
     'position: absolute;',
     'z-index: 99999;', /* big value for bootstrap3 compatibility */
   '}',
 
   '.injectionDiv {',
     'height: 100%;',
     'position: relative;',
     'overflow: hidden;', /* So blocks in drag surface disappear at edges */
     'touch-action: none',
   '}',
 
   '.blocklyNonSelectable {',
     'user-select: none;',
     '-moz-user-select: none;',
     '-webkit-user-select: none;',
     '-ms-user-select: none;',
   '}',
 
   '.blocklyWidgetDiv.fieldTextInput {',
     'overflow: hidden;',
     'border: 1px solid;',
     'box-sizing: border-box;',
     'transform-origin: 0 0;',
     '-ms-transform-origin: 0 0;',
     '-moz-transform-origin: 0 0;',
     '-webkit-transform-origin: 0 0;',
   '}',
 
   '.blocklyWidgetDiv.fieldTextInput.removableTextInput {',
     'overflow: visible;',
   '}',
 
   '.blocklyTextDropDownArrow {',
     'position: absolute;',
   '}',
 
   '.blocklyTextRemoveIcon {',
     'position: absolute;',
     'width: 24px;',
     'height: 24px;',
     'top: -40px;',
     'left: 50%;',
     'margin-left: -12px;',
     'cursor: pointer;',
   '}',
 
   '.blocklyNonSelectable {',
     'user-select: none;',
     '-moz-user-select: none;',
     '-webkit-user-select: none;',
     '-ms-user-select: none;',
   '}',
 
   '.blocklyWsDragSurface {',
     'display: none;',
     'position: absolute;',
     'top: 0;',
     'left: 0;',
   '}',
   /* Added as a separate rule with multiple classes to make it more specific
      than a bootstrap rule that selects svg:root. See issue #1275 for context.
   */
   '.blocklyWsDragSurface.blocklyOverflowVisible {',
     'overflow: visible;',
   '}',
 
   '.blocklyBlockDragSurface {',
     'display: none;',
     'position: absolute;',
     'top: 0;',
     'left: 0;',
     'right: 0;',
     'bottom: 0;',
     'overflow: visible !important;',
     'z-index: 50;', /* Display above the toolbox */
   '}',
 
   '.blocklyTooltipDiv {',
     'background-color: #ffffc7;',
     'border: 1px solid #ddc;',
     'box-shadow: 4px 4px 20px 1px rgba(0,0,0,.15);',
     'color: #000;',
     'display: none;',
     'font-family: "Helvetica Neue", Helvetica, sans-serif;',
     'font-size: 9pt;',
     'opacity: 0.9;',
     'padding: 2px;',
     'position: absolute;',
     'z-index: 100000;', /* big value for bootstrap3 compatibility */
   '}',
 
   '.blocklyDropDownDiv {',
     'position: fixed;',
     'left: 0;',
     'top: 0;',
     'z-index: 1000;',
     'display: none;',
     'border: 1px solid;',
     'border-radius: 4px;',
     'box-shadow: 0px 0px 8px 1px ' + Blockly.Colours.dropDownShadow + ';',
     'padding: 4px;',
     '-webkit-user-select: none;',
     'min-height: 15px',
   '}',
 
   '.blocklyDropDownContent {',
     'max-height: 300px;', // @todo: spec for maximum height.
     'overflow: auto;',
   '}',
 
   '.blocklyDropDownArrow {',
     'position: absolute;',
     'left: 0;',
     'top: 0;',
     'width: 16px;',
     'height: 16px;',
     'z-index: -1;',
     'background-color: inherit;',
     'border-color: inherit;',
   '}',
 
   '.blocklyDropDownButton {',
     'display: inline-block;',
     'float: left;',
     'padding: 0;',
     'margin: 4px;',
     'border-radius: 4px;',
     'outline: none;',
     'border: 1px solid;',
     'transition: box-shadow .1s;',
     'cursor: pointer;',
   '}',
 
   '.blocklyDropDownButtonHover {',
     'box-shadow: 0px 0px 0px 4px ' + Blockly.Colours.fieldShadow + ';',
   '}',
 
   '.blocklyDropDownButton:active {',
     'box-shadow: 0px 0px 0px 6px ' + Blockly.Colours.fieldShadow + ';',
   '}',
 
   '.blocklyDropDownButton > img {',
     'width: 80%;',
     'height: 80%;',
     'margin-top: 5%',
   '}',
 
   '.blocklyDropDownPlaceholder {',
     'display: inline-block;',
     'float: left;',
     'padding: 0;',
     'margin: 4px;',
   '}',
 
   '.blocklyNumPadButton {',
     'display: inline-block;',
     'float: left;',
     'padding: 0;',
     'width: 48px;',
     'height: 48px;',
     'margin: 4px;',
     'border-radius: 4px;',
     'background: $colour_numPadBackground;',
     'color: $colour_numPadText;',
     'outline: none;',
     'border: 1px solid $colour_numPadBorder;',
     'cursor: pointer;',
     'font-weight: 600;',
     'font-family: "Helvetica Neue", Helvetica, sans-serif;',
     'font-size: 12pt;',
     '-webkit-tap-highlight-color: rgba(0,0,0,0);',
   '}',
 
   '.blocklyNumPadButton > img {',
     'margin-top: 10%;',
     'width: 80%;',
     'height: 80%;',
   '}',
 
   '.blocklyNumPadButton:active {',
     'background: $colour_numPadActiveBackground;',
     '-webkit-tap-highlight-color: rgba(0,0,0,0);',
   '}',
 
   '.arrowTop {',
     'border-top: 1px solid;',
     'border-left: 1px solid;',
     'border-top-left-radius: 4px;',
     'border-color: inherit;',
   '}',
 
   '.arrowBottom {',
     'border-bottom: 1px solid;',
     'border-right: 1px solid;',
     'border-bottom-right-radius: 4px;',
     'border-color: inherit;',
   '}',
 
   '.valueReportBox {',
     'min-width: 50px;',
     'max-width: 300px;',
     'max-height: 200px;',
     'overflow: auto;',
     'word-wrap: break-word;',
     'text-align: center;',
     'font-family: "Helvetica Neue", Helvetica, sans-serif;',
     'font-size: .8em;',
   '}',
 
   '.blocklyResizeSE {',
     'cursor: se-resize;',
     'fill: #aaa;',
   '}',
 
   '.blocklyResizeSW {',
     'cursor: sw-resize;',
     'fill: #aaa;',
   '}',
 
   '.blocklyResizeLine {',
     'stroke: #888;',
     'stroke-width: 1;',
   '}',
 
   '.blocklyHighlightedConnectionPath {',
     'fill: none;',
     'stroke: #fc3;',
     'stroke-width: 4px;',
   '}',
 
   '.blocklyPath {',
     'stroke-width: 1px;',
   '}',
 
   '.blocklySelected>.blocklyPath {',
     // 'stroke: #fc3;',
     // 'stroke-width: 3px;',
   '}',
 
   '.blocklySelected>.blocklyPathLight {',
     'display: none;',
   '}',
 
   '.blocklyDraggable {',
     /* backup for browsers (e.g. IE11) that don't support grab */
     'cursor: url("<<<PATH>>>/handopen.cur"), auto;',
     'cursor: grab;',
     'cursor: -webkit-grab;',
     'cursor: -moz-grab;',
   '}',
 
    '.blocklyDragging {',
     /* backup for browsers (e.g. IE11) that don't support grabbing */
     'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
     'cursor: grabbing;',
     'cursor: -webkit-grabbing;',
     'cursor: -moz-grabbing;',
   '}',
   /* Changes cursor on mouse down. Not effective in Firefox because of
     https://bugzilla.mozilla.org/show_bug.cgi?id=771241 */
   '.blocklyDraggable:active {',
     /* backup for browsers (e.g. IE11) that don't support grabbing */
     'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
     'cursor: grabbing;',
     'cursor: -webkit-grabbing;',
     'cursor: -moz-grabbing;',
   '}',
   /* Change the cursor on the whole drag surface in case the mouse gets
      ahead of block during a drag. This way the cursor is still a closed hand.
    */
   '.blocklyBlockDragSurface .blocklyDraggable {',
     /* backup for browsers (e.g. IE11) that don't support grabbing */
     'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
     'cursor: grabbing;',
     'cursor: -webkit-grabbing;',
     'cursor: -moz-grabbing;',
   '}',
 
   '.blocklyDragging.blocklyDraggingDelete {',
     'cursor: url("<<<PATH>>>/handdelete.cur"), auto;',
   '}',
 
   '.blocklyDragging.blocklyDraggingMouseThrough {',
     'pointer-events: none;',
   '}',
 
   '.blocklyToolboxDelete {',
     'cursor: url("<<<PATH>>>/handdelete.cur"), auto;',
   '}',
 
   '.blocklyToolboxGrab {',
     'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
     'cursor: grabbing;',
     'cursor: -webkit-grabbing;',
   '}',
 
   '.blocklyDragging>.blocklyPath,',
   '.blocklyDragging>.blocklyPathLight {',
     'fill-opacity: 1.0;',
     'stroke-opacity: 1.0;',
   '}',
 
   '.blocklyDragging>.blocklyPath {',
   '}',
 
   '.blocklyDisabled>.blocklyPath {',
     'fill-opacity: .5;',
     'stroke-opacity: .5;',
   '}',
 
   '.blocklyInsertionMarker>.blocklyPath {',
     'stroke: none;',
   '}',
 
   '.blocklyText {',
     'fill: #fff;',
     'font-family: "Helvetica Neue", Helvetica, sans-serif;',
     'font-size: 12pt;',
     'font-weight: 500;',
   '}',
 
   '.blocklyTextTruncated {',
     'font-size: 11pt;',
   '}',
 
   '.blocklyNonEditableText>text {',
     'pointer-events: none;',
   '}',
   '.blocklyNonEditableText>text,',
   '.blocklyEditableText>text {',
     'fill: $colour_text;',
   '}',
 
   '.blocklyEditableText>.blocklyEditableLabel {',
     'fill: #fff;',
   '}',
 
   '.blocklyDropdownText {',
     'fill: #fff !important;',
   '}',
 
   '.blocklyBubbleText {',
     'fill: $colour_text;',
   '}',
   '.blocklyFlyout {',
     'position: absolute;',
     'z-index: 20;',
   '}',
   '.blocklyFlyoutButton {',
     'fill: none;',
     'pointer-events: all;',
   '}',
 
   '.blocklyFlyoutButtonBackground {',
       'stroke: #c6c6c6;',
   '}',
 
   '.blocklyFlyoutButton .blocklyText {',
     'fill: $colour_text;',
   '}',
 
   '.blocklyFlyoutButtonShadow {',
     'fill: transparent;',
   '}',
 
   '.blocklyFlyoutButton:hover {',
     'fill: white;',
     'cursor: pointer;',
   '}',
 
   '.blocklyFlyoutLabel {',
     'cursor: default;',
   '}',
 
   '.blocklyFlyoutLabelBackground {',
     'opacity: 0;',
   '}',
 
   '.blocklyTouchTargetBackground {',
     'fill: transparent;',
     'cursor: pointer;',
   '}',
 
   '.blocklyFlyoutLabelText {',
     'font-family: "Helvetica Neue", Helvetica, sans-serif;',
     'font-size: 14pt;',
     'fill: #575E75;',
     'font-weight: bold;',
   '}',
 
   /*
     Don't allow users to select text.  It gets annoying when trying to
     drag a block and selected text moves instead.
   */
   '.blocklySvg text, .blocklyBlockDragSurface text, .blocklyFlyout text, .blocklyToolboxDiv text {',
     'user-select: none;',
     '-moz-user-select: none;',
     '-webkit-user-select: none;',
     'cursor: inherit;',
   '}',
 
   '.blocklyHidden {',
     'display: none;',
   '}',
 
   '.blocklyFieldDropdown:not(.blocklyHidden) {',
     'display: block;',
   '}',
 
   '.blocklyIconGroup {',
     'cursor: default;',
   '}',
 
   '.blocklyIconGroup:not(:hover),',
   '.blocklyIconGroupReadonly {',
     'opacity: .6;',
   '}',
 
   '.blocklyIconShape {',
     'fill: #00f;',
     'stroke: #fff;',
     'stroke-width: 1px;',
   '}',
 
   '.blocklyIconSymbol {',
     'fill: #fff;',
   '}',
 
   '.blocklyMinimalBody {',
     'margin: 0;',
     'padding: 0;',
   '}',
 
   '.blocklyCommentForeignObject {',
     'position: relative;',
     'z-index: 0;',
   '}',
 
   '.blocklyCommentRect {',
     'fill: #E7DE8E;',
     'stroke: #bcA903;',
     'stroke-width: 1px',
   '}',
 
   '.blocklyCommentTarget {',
     'fill: transparent;',
     'stroke: #bcA903;',
   '}',
 
   '.blocklyCommentTargetFocused {',
     'fill: none;',
   '}',
 
   '.blocklyCommentHandleTarget {',
     'fill: none;',
   '}',
 
   '.blocklyCommentHandleTargetFocused {',
     'fill: transparent;',
   '}',
 
   '.blocklyFocused>.blocklyCommentRect {',
     'fill: #B9B272;',
     'stroke: #B9B272;',
   '}',
 
   '.blocklySelected>.blocklyCommentTarget {',
     'stroke: #fc3;',
     'stroke-width: 3px;',
   '}',
 
 
   '.blocklyCommentTextarea {',
     'background-color: #fef49c;',
     'border: 0;',
     'outline: 0;',
     'margin: 0;',
     'padding: 3px;',
     'resize: none;',
     'display: block;',
     'overflow: hidden;',
   '}',
 
   '.blocklyCommentDeleteIcon {',
     'cursor: pointer;',
     'fill: #000;',
     'display: none',
   '}',
 
   '.blocklySelected > .blocklyCommentDeleteIcon {',
     'display: block',
   '}',
 
   '.blocklyDeleteIconShape {',
     'fill: #000;',
     'stroke: #000;',
     'stroke-width: 1px;',
   '}',
 
   '.blocklyDeleteIconShape.blocklyDeleteIconHighlighted {',
     'stroke: #fc3;',
   '}',
 
   // Scratch Comments
 
   '.scratchCommentForeignObject {',
     'position: relative;',
   '}',
 
   '.scratchCommentBody {',
     'background-color: #fef49c;',
     'border-radius: 4px;',
   '}',
 
   '.scratchCommentRect {',
     'fill: #fef49c;',
   '}',
 
   '.scratchCommentTarget {',
     'fill: transparent;',
   '}',
 
   '.scratchWorkspaceCommentBorder {',
     'stroke: #bcA903;',
     'stroke-width: 1px;',
   '}',
 
   '.scratchCommentTargetFocused {',
     'fill: none;',
   '}',
 
   '.scratchCommentTopBar {',
     'fill: #000000;',
     'fill-opacity: 0.1',
   '}',
 
   '.scratchCommentText {',
     'font-family: "Helvetica Neue", Helvetica, sans-serif;',
     'font-size: 12pt;',
     'font-weight: 400;',
   '}',
 
   '.scratchCommentTextarea {',
     'background-color: #fef49c;',
     'border: 0;',
     'outline: 0;',
     'padding: 0;',
     'resize: none;',
     'overflow: hidden;',
   '}',
 
   '.scratchCommentTextarea::placeholder {',
     'color: rgba(0,0,0,0.5);',
     'font-style: italic;',
   '}',
 
   '.scratchCommentResizeSE {',
     'cursor: se-resize;',
     'fill: transparent;',
   '}',
 
   '.scratchCommentResizeSW {',
     'cursor: sw-resize;',
     'fill: transparent;',
   '}',
 
   '.blocklyHtmlInput {',
     'border: none;',
     'font-family: "Helvetica Neue", Helvetica, sans-serif;',
     'font-size: 12pt;',
     'height: 100%;',
     'margin: 0;',
     'outline: none;',
     'box-sizing: border-box;',
     'width: 100%;',
     'text-align: center;',
     'color: $colour_text;',
     'font-weight: 500;',
   '}',
 
   '.blocklyMainBackground {',
     'stroke-width: 1;',
     'stroke: #c6c6c6;',  /* Equates to #ddd due to border being off-pixel. */
   '}',
 
   '.blocklyMutatorBackground {',
     'fill: #fff;',
     'stroke: #ddd;',
     'stroke-width: 1;',
   '}',
 
   '.blocklyFlyoutBackground {',
     'fill: $colour_flyout;',
     'fill-opacity: .8;',
   '}',
 
   '.blocklyMainWorkspaceScrollbar {',
     'z-index: 20;',
   '}',
 
   '.blocklyFlyoutScrollbar {',
     'z-index: 30;',
   '}',
 
   '.blocklyScrollbarHorizontal, .blocklyScrollbarVertical {',
     'position: absolute;',
     'outline: none;',
   '}',
 
   '.blocklyScrollbarBackground {',
     'opacity: 0;',
   '}',
 
   '.blocklyScrollbarHandle {',
     'fill: $colour_scrollbar;',
   '}',
 
   '.blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,',
   '.blocklyScrollbarHandle:hover {',
     'fill: $colour_scrollbarHover;',
   '}',
 
   '.blocklyZoom>image {',
     'opacity: 1;',
   '}',
 
   /* Darken flyout scrollbars due to being on a grey background. */
   /* By contrast, workspace scrollbars are on a white background. */
   '.blocklyFlyout .blocklyScrollbarHandle {',
     'fill: #bbb;',
   '}',
 
   '.blocklyFlyout .blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,',
   '.blocklyFlyout .blocklyScrollbarHandle:hover {',
     'fill: #aaa;',
   '}',
 
   '.blocklyInvalidInput {',
     'background: #faa;',
   '}',
 
   '.blocklyAngleCircle {',
     'stroke: ' + Blockly.Colours.motion.tertiary + ';',
     'stroke-width: 1;',
     'fill: ' + Blockly.Colours.motion.secondary + ';',
   '}',
 
   '.blocklyAngleCenterPoint {',
     'stroke: #fff;',
     'stroke-width: 1;',
     'fill: #fff;',
   '}',
 
   '.blocklyAngleDragHandle {',
     'stroke: #fff;',
     'stroke-width: 5;',
     'stroke-opacity: 0.25;',
     'fill: #fff;',
     'cursor: pointer;',
   '}',
 
   '.blocklyAngleDragArrow {',
     'pointer-events: none',
   '}',
 
   '.blocklyAngleMarks {',
     'stroke: #fff;',
     'stroke-width: 1;',
     'stroke-opacity: 0.5;',
   '}',
 
   '.blocklyAngleGauge {',
     'fill: #fff;',
     'fill-opacity: 0.20;',
   '}',
 
   '.blocklyAngleLine {',
     'stroke: #fff;',
     'stroke-width: 1;',
     'stroke-linecap: round;',
     'pointer-events: none;',
   '}',
 
   '.blocklyContextMenu {',
     'border-radius: 4px;',
     'max-height: 100%;',
   '}',
 
   '.blocklyDropdownMenu {',
     'padding: 0 !important;',
   '}',
 
   '.blocklyDropDownNumPad {',
     'background-color: $colour_numPadBackground;',
   '}',
 
   /* Override the default Closure URL. */
   '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,',
   '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {',
     'background: url(<<<PATH>>>/sprites.png) no-repeat -48px -16px !important;',
   '}',
 
   /* Category tree in Toolbox. */
   '.blocklyToolboxDiv {',
     'background-color: $colour_toolbox;',
     'color: $colour_toolboxText;',
     'overflow-x: visible;',
     'overflow-y: auto;',
     'position: absolute;',
     'font-family: "Helvetica Neue", Helvetica, sans-serif;',
     'z-index: 40;', /* so blocks go over toolbox when dragging */
     '-webkit-tap-highlight-color: transparent;', /* issue #1345 */
   '}',
 
   '.blocklyTreeRoot {',
     'padding: 4px 0;',
   '}',
 
   '.blocklyTreeRoot:focus {',
     'outline: none;',
   '}',
 
   '.blocklyTreeRow {',
     'height: 22px;',
     'line-height: 22px;',
     'margin-bottom: 3px;',
     'padding-right: 8px;',
     'white-space: nowrap;',
   '}',
 
   '.blocklyHorizontalTree {',
     'float: left;',
     'margin: 1px 5px 8px 0;',
   '}',
 
   '.blocklyHorizontalTreeRtl {',
     'float: right;',
     'margin: 1px 0 8px 5px;',
   '}',
 
   '.blocklyToolboxDiv[dir="RTL"] .blocklyTreeRow {',
     'margin-left: 8px;',
   '}',
 
   '.blocklyTreeRow:not(.blocklyTreeSelected):hover {',
     'background-color: #e4e4e4;',
   '}',
 
   '.blocklyTreeSeparator {',
     'border-bottom: solid #e5e5e5 1px;',
     'height: 0;',
     'margin: 5px 0;',
   '}',
 
   '.blocklyTreeSeparatorHorizontal {',
     'border-right: solid #e5e5e5 1px;',
     'width: 0;',
     'padding: 5px 0;',
     'margin: 0 5px;',
   '}',
 
   '.blocklyTreeIcon {',
     'background-image: url(<<<PATH>>>/sprites.png);',
     'height: 16px;',
     'vertical-align: middle;',
     'width: 16px;',
   '}',
 
   '.blocklyTreeIconClosedLtr {',
     'background-position: -32px -1px;',
   '}',
 
   '.blocklyTreeIconClosedRtl {',
     'background-position: 0px -1px;',
   '}',
 
   '.blocklyTreeIconOpen {',
     'background-position: -16px -1px;',
   '}',
 
   '.blocklyTreeSelected>.blocklyTreeIconClosedLtr {',
     'background-position: -32px -17px;',
   '}',
 
   '.blocklyTreeSelected>.blocklyTreeIconClosedRtl {',
     'background-position: 0px -17px;',
   '}',
 
   '.blocklyTreeSelected>.blocklyTreeIconOpen {',
     'background-position: -16px -17px;',
   '}',
 
   '.blocklyTreeIconNone,',
   '.blocklyTreeSelected>.blocklyTreeIconNone {',
     'background-position: -48px -1px;',
   '}',
 
   '.blocklyTreeLabel {',
     'cursor: default;',
     'font-family: "Helvetica Neue", Helvetica, sans-serif;',
     'font-size: 16px;',
     'padding: 0 3px;',
     'vertical-align: middle;',
   '}',
 
   '.blocklyToolboxDelete .blocklyTreeLabel {',
     'cursor: url("<<<PATH>>>/handdelete.cur"), auto;',
   '}',
 
   '.blocklyTreeSelected .blocklyTreeLabel {',
     'color: #fff;',
   '}',
 
   '.blocklyDropDownDiv .goog-slider-horizontal {',
     'margin: 8px;',
     'height: 22px;',
     'width: 150px;',
     'position: relative;',
     'outline: none;',
     'border-radius: 11px;',
     'margin-bottom: 20px;',
   '}',
 
   '.blocklyDropDownDiv .goog-slider-horizontal .goog-slider-thumb {',
     'width: 26px;',
     'height: 26px;',
     'top: -1px;',
     'position: absolute;',
     'background-color: white;',
     'border-radius: 100%;',
     '-webkit-box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.15);',
     '-moz-box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.15);',
     'box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.15);',
   '}',
 
   '.scratchEyedropper {',
     'background: none;',
     'outline: none;',
     'border: none;',
     'width: 100%;',
     'text-align: center;',
     'border-top: 1px solid #ddd;',
     'padding-top: 5px;',
     'cursor: pointer;',
   '}',
 
   '.scratchColourPickerLabel {',
     'font-family: "Helvetica Neue", Helvetica, sans-serif;',
     'font-size: 0.65rem;',
     'color: $colour_toolboxText;;',
   '}',
 
   '.scratchColourPickerLabelText {',
     'font-weight: bold;',
   '}',
   '.scratchColourPickerReadout {',
      'margin-left: 10px;',
    '}',
 
   
 
   '.scratchMatrixButtonDiv {',
     'width: 50%;',
     'text-align: center;',
     'float: left;',
   '}',
 
   '.scratchNotePickerKeyLabel {',
     'font-family: "Helvetica Neue", Helvetica, sans-serif;',
     'font-size: 0.75rem;',
     'fill: $colour_text;',
     'pointer-events: none;',
   '}',
 
   /* Copied from: goog/css/menu.css */
   /*
    * Copyright 2009 The Closure Library Authors. All Rights Reserved.
    *
    * Use of this source code is governed by the Apache License, Version 2.0.
    * See the COPYING file for details.
    */
 
   /**
    * Standard styling for menus created by goog.ui.MenuRenderer.
    *
    * @author attila@google.com (Attila Bodis)
    */
 
   '.blocklyWidgetDiv .goog-menu {',
     'background: #fff;',
     'border-color: #ccc #666 #666 #ccc;',
     'border-style: solid;',
     'border-width: 1px;',
     'cursor: default;',
     'font: normal 13px "Helvetica Neue", Helvetica, sans-serif;',
     'margin: 0;',
     'outline: none;',
     'padding: 4px 0;',
     'position: absolute;',
     'overflow-y: auto;',
     'overflow-x: hidden;',
     'z-index: 20000;',  /* Arbitrary, but some apps depend on it... */
   '}',
 
   '.blocklyDropDownDiv .goog-menu {',
     'cursor: default;',
     'font: normal 13px "Helvetica Neue", Helvetica, sans-serif;',
     'outline: none;',
     'z-index: 20000;',  /* Arbitrary, but some apps depend on it... */
   '}',
 
   /* Copied from: goog/css/menuitem.css */
   /*
    * Copyright 2009 The Closure Library Authors. All Rights Reserved.
    *
    * Use of this source code is governed by the Apache License, Version 2.0.
    * See the COPYING file for details.
    */
 
   /**
    * Standard styling for menus created by goog.ui.MenuItemRenderer.
    *
    * @author attila@google.com (Attila Bodis)
    */
 
   /**
    * State: resting.
    *
    * NOTE(mleibman,chrishenry):
    * The RTL support in Closure is provided via two mechanisms -- "rtl" CSS
    * classes and BiDi flipping done by the CSS compiler.  Closure supports RTL
    * with or without the use of the CSS compiler.  In order for them not
    * to conflict with each other, the "rtl" CSS classes need to have the #noflip
    * annotation.  The non-rtl counterparts should ideally have them as well, but,
    * since .goog-menuitem existed without .goog-menuitem-rtl for so long before
    * being added, there is a risk of people having templates where they are not
    * rendering the .goog-menuitem-rtl class when in RTL and instead rely solely
    * on the BiDi flipping by the CSS compiler.  That's why we're not adding the
    * #noflip to .goog-menuitem.
    */
   '.blocklyWidgetDiv .goog-menuitem {',
     'color: #000;',
     'font: normal 13px "Helvetica Neue", Helvetica, sans-serif;',
     'list-style: none;',
     'margin: 0;',
      /* 28px on the left for icon or checkbox; 7em on the right for shortcut. */
     'padding: 4px 7em 4px 28px;',
     'white-space: nowrap;',
   '}',
 
   '.blocklyDropDownDiv .goog-menuitem {',
     'color: #fff;',
     'font: normal 13px "Helvetica Neue", Helvetica, sans-serif;',
     'font-weight: bold;',
     'list-style: none;',
     'margin: 0;',
     'min-height: 24px;',
      /* 28px on the left for icon or checkbox; 7em on the right for shortcut. */
     'padding: 4px 7em 4px 28px;',
     'white-space: nowrap;',
   '}',
 
   /* BiDi override for the resting state. */
   /* #noflip */
   '.blocklyWidgetDiv .goog-menuitem.goog-menuitem-rtl, ',
   '.blocklyDropDownDiv .goog-menuitem.goog-menuitem-rtl {',
      /* Flip left/right padding for BiDi. */
     'padding-left: 7em;',
     'padding-right: 28px;',
   '}',
 
   /* If a menu doesn't have checkable items or items with icons, remove padding. */
   '.blocklyWidgetDiv .goog-menu-nocheckbox .goog-menuitem,',
   '.blocklyWidgetDiv .goog-menu-noicon .goog-menuitem, ',
   '.blocklyDropDownDiv .goog-menu-nocheckbox .goog-menuitem,',
   '.blocklyDropDownDiv .goog-menu-noicon .goog-menuitem { ',
     'padding-left: 12px;',
   '}',
 
   /*
    * If a menu doesn't have items with shortcuts, leave just enough room for
    * submenu arrows, if they are rendered.
    */
   '.blocklyWidgetDiv .goog-menu-noaccel .goog-menuitem, ',
   '.blocklyDropDownDiv .goog-menu-noaccel .goog-menuitem {',
     'padding-right: 20px;',
   '}',
 
   '.blocklyWidgetDiv .goog-menuitem-content ',
   '.blocklyDropDownDiv .goog-menuitem-content {',
     'color: #000;',
     'font: normal 13px "Helvetica Neue", Helvetica, sans-serif;',
   '}',
 
   /* State: disabled. */
   '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-accel,',
   '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content, ',
   '.blocklyDropDownDiv .goog-menuitem-disabled .goog-menuitem-accel,',
   '.blocklyDropDownDiv .goog-menuitem-disabled .goog-menuitem-content {',
     'color: #ccc !important;',
   '}',
 
   '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-icon, ',
   '.blocklyDropDownDiv .goog-menuitem-disabled .goog-menuitem-icon {',
     'opacity: 0.3;',
     '-moz-opacity: 0.3;',
     'filter: alpha(opacity=30);',
   '}',
 
   /* State: hover. */
   '.blocklyWidgetDiv .goog-menuitem-highlight,',
   '.blocklyWidgetDiv .goog-menuitem-hover {',
     'background-color: #d6e9f8;',
      /* Use an explicit top and bottom border so that the selection is visible',
       * in high contrast mode. */
     'border-color: #d6e9f8;',
     'border-style: dotted;',
     'border-width: 1px 0;',
     'padding-bottom: 3px;',
     'padding-top: 3px;',
   '}',
 
   '.blocklyDropDownDiv .goog-menuitem-highlight,',
   '.blocklyDropDownDiv .goog-menuitem-hover {',
     'background-color: rgba(0, 0, 0, 0.2);',
   '}',
 
   /* State: selected/checked. */
   '.blocklyWidgetDiv .goog-menuitem-checkbox,',
   '.blocklyWidgetDiv .goog-menuitem-icon, ',
   '.blocklyDropDownDiv .goog-menuitem-checkbox,',
   '.blocklyDropDownDiv .goog-menuitem-icon {',
     'background-repeat: no-repeat;',
     'height: 16px;',
     'left: 6px;',
     'position: absolute;',
     'right: auto;',
     'vertical-align: middle;',
     'width: 16px;',
   '}',
 
   '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,',
   '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon,',
   '.blocklyDropDownDiv .goog-option-selected .goog-menuitem-checkbox,',
   '.blocklyDropDownDiv .goog-option-selected .goog-menuitem-icon {',
      /* Client apps may override the URL at which they serve the sprite. */
     'background: url(<<<PATH>>>/sprites.png) no-repeat -48px -16px !important;',
     'position: static;', /* Scroll with the menu. */
     'float: left;',
     'margin-left: -24px;',
   '}',
 
   /* BiDi override for the selected/checked state. */
   /* #noflip */
   '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,',
   '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon,',
   '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-checkbox,',
   '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-icon {',
      /* Flip left/right positioning. */
      'float: right;',
      'margin-right: -24px;',
   '}',
 
   /* Keyboard shortcut ("accelerator") style. */
   '.blocklyWidgetDiv .goog-menuitem-accel, ',
   '.blocklyDropDownDiv .goog-menuitem-accel {',
     'color: #999;',
      /* Keyboard shortcuts are untranslated; always left-to-right. */
      /* #noflip */
     'direction: ltr;',
     'left: auto;',
     'padding: 0 6px;',
     'position: absolute;',
     'right: 0;',
     'text-align: right;',
   '}',
 
   /* BiDi override for shortcut style. */
   /* #noflip */
   '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-accel, ',
   '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-accel {',
      /* Flip left/right positioning and text alignment. */
     'left: 0;',
     'right: auto;',
     'text-align: left;',
   '}',
 
   /* Mnemonic styles. */
   '.blocklyWidgetDiv .goog-menuitem-mnemonic-hint, ',
   '.blocklyDropDownDiv .goog-menuitem-mnemonic-hint {',
     'text-decoration: underline;',
   '}',
 
   '.blocklyWidgetDiv .goog-menuitem-mnemonic-separator, ',
   '.blocklyDropDownDiv .goog-menuitem-mnemonic-separator {',
     'color: #999;',
     'font-size: 12px;',
     'padding-left: 4px;',
   '}',
 
   /* Copied from: goog/css/menuseparator.css */
   /*
    * Copyright 2009 The Closure Library Authors. All Rights Reserved.
    *
    * Use of this source code is governed by the Apache License, Version 2.0.
    * See the COPYING file for details.
    */
 
   /**
    * Standard styling for menus created by goog.ui.MenuSeparatorRenderer.
    *
    * @author attila@google.com (Attila Bodis)
    */
 
   '.blocklyWidgetDiv .goog-menuseparator, ',
   '.blocklyDropDownDiv .goog-menuseparator {',
     'border-top: 1px solid #ccc;',
     'margin: 4px 0;',
     'padding: 0;',
   '}',
 
   '.blocklyFlyoutCheckbox {',
     'fill: white;',
     'stroke: #c8c8c8;',
   '}',
 
   '.checked > .blocklyFlyoutCheckbox {',
     'fill: ' + Blockly.Colours.motion.primary + ';',
     'stroke: ' + Blockly.Colours.motion.tertiary + ';',
   '}',
 
   '.blocklyFlyoutCheckboxPath {',
     'fill: transparent;',
     'stroke: white;',
     'stroke-width: 3;',
     'stroke-linecap: round;',
     'stroke-linejoin: round;',
   '}',
 
   '.scratchCategoryMenu {',
     'width: 60px;',
     'background: $colour_toolbox;',
     'color: $colour_toolboxText;',
     'font-size: .7rem;',
     'user-select: none;',
     '-webkit-user-select: none;',
     '-moz-user-select: none;',
     '-ms-user-select: none;',
   '}',
 
   '.scratchCategoryMenuHorizontal {',
     'width: 100%;',
     'height: 50px;',
     'background: $colour_toolbox;',
     'color: $colour_toolboxText;',
     'font-size: .7em;',
     'user-select: none;',
     '-webkit-user-select: none;',
     '-moz-user-select: none;',
     '-ms-user-select: none;',
   '}',
 
   '.scratchCategoryMenuHorizontal .scratchCategoryMenuRow {',
     'float: left;',
     'margin: 3px;',
   '}',
 
   '.scratchCategoryMenuRow {',
   '}',
 
   '.scratchCategoryMenuItem {',
     'padding: 0.375rem 0px;',
     'cursor: pointer;',
     'text-align: center;',
   '}',
 
   '.scratchCategoryMenuHorizontal .scratchCategoryMenuItem {',
     'padding: 6px 5px;',
   '}',
 
   '.scratchCategoryMenuItem.categorySelected {',
     'background: $colour_toolboxSelected;',
   '}',
 
   '.scratchCategoryItemBubble {',
     'width: 1.25rem;',
     'height: 1.25rem;',
     'border: 1px solid;',
     'border-radius: 100%;',
     'margin: 0 auto 0.125rem;',
   '}',
 
   '.scratchCategoryItemIcon {',
     'width: 1.25rem;',
     'height: 1.25rem;',
     'margin: 0 auto 0.125rem;',
     'background-size: 100%;',
   '}',
 
   '.scratchCategoryMenuItem:hover {',
     'color: $colour_toolboxHover !important;',
   '}',
   
   '.c-rng {',
     '--rng-focus: #064374;',
     '--rng-lower: #6495ed;',
     '--rng-upper: #cfd8dc;',
     '--rng-percent: 0%;',
     '--rng-percent-upper: 80%;',
   
     '--rng-bdrs: 0.375rem;',
     '--rng-bgi: linear-gradient(',
     '  to right,',
     '  var(--rng-lower) var(--rng-percent),',
     '  var(--rng-upper) var(--rng-percent)',
     ');',
 
     '--rng-h: 0.75rem;',
     '--rng-m: 2rem 0;',
     '--rng-w: 100%;',
   
     '--rng-label-c: #333;',
     '--rng-label-fz: 0.75rem;',
     '--rng-label-off: 0.25rem;',
   
     '--rng-thumb-bdrs: 50%;',
     '--rng-thumb-bxsh: none;',
     '--rng-thumb-bxsh--focus: inset 0 0 0 0.25rem var(--rng-focus);',
     '--rng-thumb-bgc: #0960a5;',
     '--rng-thumb-h: 2rem;',
     '--rng-thumb-w: 2rem;',
     '--rng-thumb-z: 1;',
   
     'background-image: var(--rng-bgi);',
     'border-radius: var(--rng-bdrs);',
     'box-sizing: border-box;',
     'font-family: inherit;',
     'height: var(--rng-h);',
     'margin: var(--rng-m);',
     'outline: none;',
     'position: relative;',
     'width: var(--rng-w);',
   '}',
   /* 
     =====
     THUMB
     =====
     */
   '.c-rng::-moz-range-thumb {',
   '  background-color: var(--rng-thumb-bgc);',
   '  border-radius: var(--rng-thumb-bdrs);',
   '  box-shadow: var(--rng-thumb-bxsh);',
   '  color: #000;',
   '  cursor: ew-resize;',
   '  height: var(--rng-thumb-h);',
   '  margin-top: calc(0px - ((var(--rng-thumb-h) - var(--rng-h)) / 2));',
   '  position: relative;',
   '  width: var(--rng-thumb-w);',
   '  z-index: var(--rng-thumb-z);',
   '}',
 
   '.c-rng::-webkit-slider-thumb {',
   '  background-color: var(--rng-thumb-bgc);',
   '  border-radius: var(--rng-thumb-bdrs);',
   '  box-shadow: var(--rng-thumb-bxsh);',
   '  cursor: ew-resize;',
   '  height: var(--rng-thumb-h);',
   '  margin-top: calc(0px - ((var(--rng-thumb-h) - var(--rng-h)) / 2));',
   '  position: relative;',
   '  width: var(--rng-thumb-w);',
   '  z-index: var(--rng-thumb-z);',
   '}',
   '.c-rng:focus::-webkit-slider-thumb {',
   '  box-shadow: var(--rng-thumb-bxsh--focus);',
   '}',
   /* 
     =====
     TRACK
     =====
     */
   '.c-rng::-moz-range-track {',
   '  background: transparent;',
   '  background-size: 100%;',
   '  border-radius: var(--rng-bdrs);',
   '  box-sizing: border-box;',
   '  height: var(--rng-h);',
   '}',
   '.c-rng::-webkit-slider-runnable-track {',
   '  background: transparent;',
   '  background-size: 100%;',
   '  border-radius: var(--rng-bdrs);',
   '  box-sizing: border-box;',
   '  height: var(--rng-h);',
   '}',
   '.c-rng,',
   '.c-rng::-webkit-slider-runnable-track,',
   '.c-rng::-webkit-slider-thumb {',
   '  -webkit-appearance: none;',
   '  appearance: none;',
   '}',
   /* 
     ======
     LABELS
     ======
     */
   '.c-rng::after,',
   '.c-rng::before {',
   '  color: var(--rng-label-c);',
   '  font-size: var(--rng-label-fz);',
   '  line-height: 1;',
   '  position: absolute;',
   '  top: calc(var(--rng-h) + var(--rng-label-off));',
   '  z-index: -1;',
   '}',
   '.c-rng[data-range*="labels"]::after {',
   '  content: attr(max);',
   '  right: 0;',
   '}',
   '.c-rng[data-range*="labels"]::before {',
   '  content: attr(min);',
   '}',
   '.c-rng--labels-above .c-rng::after,',
   '.c-rng--labels-above .c-rng::before {',
   '  top: -1rem; /* TODO */',
   '}',
   
   /* 
     ======
     OUTPUT
     ======
     */
   '.c-rng__output {',
   '  --rng-output-bgc: #444;',
   '  --rng-output-c: #eee;',
   '  --rng-output-p: 0.25rem 0 0 0;',
   '  --rng-output-t: 0.25rem;',
   '  --rng-output-w: 2rem;',
   
   '  background-color: var(--rng-output-bgc);',
   '  color: var(--rng-output-c);',
   '  display: inline-block;',
   '  font-family: sans-serif;',
   '  font-size: 0.675rem;',
   '  left: calc(',
   '    1% * var(--rng-unit) - ((var(--rng-thumb-w) / 100) * var(--rng-unit))',
   '  );',
   '  padding: var(--rng-output-p);',
   '  position: relative;',
   '  text-align: center;',
   '  top: var(--rng-output-t);',
   '  width: var(--rng-output-w);',
   '}',
   '.c-rng__output::after {',
   '  border-left: calc(var(--rng-output-w) / 2) solid transparent;',
   '  border-right: calc(var(--rng-output-w) / 2) solid transparent;',
   '  border-top: calc(var(--rng-output-w) / 3) solid var(--rng-output-bgc);',
   '  content: "";',
   '  height: 0;',
   '  left: 0;',
   '  position: absolute;',
   '  top: 100%;',
   '  width: 0;',
   '}',
   /* 
     =======
     WRAPPER
     =======
     */
   '.c-rng__wrapper .c-rng {',
   '  bottom: 1rem;',
   '  left: 0;',
   '  margin: 0;',
   '  position: absolute;',
   '}',
   '.c-rng__wrapper .c-rng__output {',
   '  position: absolute;',
   '  top: 0;',
   '}',
   '.c-rng__wrapper {',
   '  --rng-ticks-fill: #b0b0b0;',
   '  flex: 1;',
   '  height: 4rem; /* TODO */',
   '  margin-bottom: 1rem;',
   '  position: relative;',
   '}',
   /* 
     =====
     MULTI
     =====
     */
   '.c-rng__multi [data-range*="lower"] {',
   '  --rng-bgi: linear-gradient(',
   '    to right,',
   '    var(--rng-upper) var(--rng-percent),',
   '    var(--rng-lower) var(--rng-percent),',
   '    var(--rng-lower) var(--rng-percent-upper),',
   '    var(--rng-upper) var(--rng-percent-upper)',
   '  );',
   '}',
   '.c-rng__multi [data-range*="upper"] {',
   '  background: none;',
   '}',
   /*
     ========
     CIRCULAR
     ========
     */
   '.c-rng--circular {',
   '  --circle-bgc: #fff;',
   '  --circle-size: 100px;',
   '  --track-bgc: hsl(219, 20%, 85%);',
   '  --track-fill: cornflowerblue;',
   '  --thumb-size: 30px;',
   
   '  --gradient-start: 0deg;',
   '  --gradient-end: 0deg;',
   
   '  background-image: conic-gradient(',
   '    rgb(254, 26, 26),',
   '    rgb(254, 101, 26),',
   '    rgb(254, 178, 26),',
   '    rgb(254, 254, 26),',
   '    rgb(178, 254, 26),',
   '    rgb(101, 254, 26),',
   '    rgb(26, 254, 26),',
   '    rgb(26, 254, 102),',
   '    rgb(26, 254, 177),',
   '    rgb(26, 254, 254),',
   '    rgb(26, 177, 254),',
   '    rgb(26, 102, 254),',
   '    rgb(26, 26, 254),',
   '    rgb(101, 26, 254),',
   '    rgb(178, 26, 254),',
   '    rgb(254, 26, 254),',
   '    rgb(254, 26, 178),',
   '    rgb(254, 26, 101),',
   '    rgb(254, 26, 26)',
   '  );',
   '  border-radius: 50%;',
   '  display: inline-block;',
   '  height: var(--circle-size);',
   '  margin: 0.25rem;',
   '  position: relative;',
   '  touch-action: none;',
   '  width: var(--circle-size);',
   '}',
   ':c-rng--circular {',
   '  --color: #000;',
   '}',
   '.c-rng--circular::before {',
   '  align-items: center;',
   '  background-color: var(--circle-bgc);',
   '  border-radius: 50%;',
   '  content: "";',
   '  box-sizing: border-box;',
   '  border: 6px solid white;',
  //  '  content: attr(data-value);',
   '  display: flex;',
   '  font-family: ui-sans-serif, ui-system, sans-serif;',
   '  font-size: 2rem;',
   '  height: calc(var(--circle-size) - (var(--thumb-size) * 2));',
   '  justify-content: center;',
   '  left: var(--thumb-size);',
   '  position: absolute;',
   '  top: var(--thumb-size);',
   '  width: calc(var(--circle-size) - (var(--thumb-size) * 2));',
   '}',
   
   '.c-rng--circular-output {',
   '  background: transparent;',
   '  position: absolute;',
   '  top: 50%;',
   '  left: 50%;',
   '  height: var(--thumb-size);',
   '  margin-top: calc(var(--thumb-size) / -2);',
   '  transform: rotate(var(--angle));',
   '  transform-origin: center left;',
   '  width: 50%;',
   '  z-index: 1;',
   '}',
   '.c-rng--circular-output::before {',
   '  background-color: var(--thumb-bgc, #fff);',
   '  border: var(--thumb-bdw, 2px) solid var(--track-fill);',
   '  border-radius: 50%;',
   '  box-shadow: var(--thumb-bxsh, none);',
   '  box-sizing: border-box;',
   '  content: "";',
   '  cursor: grab;',
   '  display: inline-block;',
   '  height: 30px;',
   '  position: absolute;',
   '  right: 0;',
   '  width: 30px;',
   '}',
   '.c-rng--circular-output:focus {',
   '  --thumb-bxsh: inset 0 0 0 2px #fff, inset 0 0 0 10px var(--track-fill);',
   '  outline: none;',
   '}',
   /*
     ======
     TICKS
     ======
     */
   '.c-rng--ticks {',
   '  fill: var(--rng-ticks-fill);',
   '  bottom: 0;',
   '  height: 1rem; /* TODO */',
   '  left: 0;',
   '  position: absolute;',
   '  width: calc(100% - var(--rng-thumb-w));',
   '  margin-left: calc(var(--rng-thumb-w) / 2);',
   '}',
   '.c-rng--ticks rect:first-of-type {',
   '  transform: translateX(1px);',
   '}',
   '.c-rng--ticks rect:last-of-type {',
   '  transform: translateX(-1px);',
   '}',
   '.c-rng--ticks-above .c-rng--ticks {',
   '  bottom: auto;',
   '  top: 1.25rem;',
   '}',
   '.c-rng--ticks-full .c-rng--ticks {',
   '  --rng-ticks-fill: #ffccd5; /* TODO! */',
   '  height: 2.5rem;',
   '}',
   
   /* Modifiers */
   '.c-rng--grey {',
   '  --rng-focus: #a0a0a0;',
   '  --rng-lower: #b0b0b0;',
   '  --rng-upper: #dedede;',
   '  --rng-h: 8px;',
   '  --rng-thumb-bgc: #fff;',
   '  --rng-thumb-bxsh: 1px 2px 4px 1px rgba(0, 0, 0, 0.25);',
   '}',
   '.c-rng--pink {',
   '  --rng-focus: #e6002a;',
   '  --rng-lower: #ff91a6;',
   '  --rng-upper: #ffe0e5;',
   '  --rng-h: 4px;',
   '  --rng-thumb-bdrs: 0.25rem;',
   '  --rng-thumb-bgc: #ff2f56;',
   '  --rng-thumb-h: 2rem;',
   '  --rng-thumb-w: 1rem;',
   '  --rng-ticks-fill: #ffccd5;',
   '}',
   '.c-rng--hue {',
   '  --rng-value: 0;',
   '  --rng-bgi: linear-gradient(',
   '    to right,',
   '    red,',
   '    #ff8000,',
   '    #ff0,',
   '    #80ff00,',
   '    lime,',
   '    #00ff80,',
   '    cyan,',
   '    #007fff,',
   '    blue,',
   '    #7f00ff,',
   '    #f0f,',
   '    #ff0080,',
   '    red',
   '  );',
   '  --rng-thumb-bgc: hsl(var(--rng-value), 100%, 50%);',
   '  --rng-thumb-bxsh--focus: inset 0 0 0 0.125rem rgba(255, 255, 255, 0.8),',
   '    0 0 0 0.125rem hsl(var(--rng-value), 100%, 25%);',
   '  --rng-thumb-bxsh: inset 0 0 0 0.125rem hsl(var(--rng-value), 100%, 30%);',
   '}',
   '.c-rng--icons {',
   `  --ico-audio: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 32"><path d="M27.814 28.814c-0.384 0-0.768-0.146-1.061-0.439-0.586-0.586-0.586-1.535 0-2.121 2.739-2.739 4.247-6.38 4.247-10.253s-1.508-7.514-4.247-10.253c-0.586-0.586-0.586-1.536 0-2.121s1.536-0.586 2.121 0c3.305 3.305 5.126 7.7 5.126 12.374s-1.82 9.069-5.126 12.374c-0.293 0.293-0.677 0.439-1.061 0.439zM22.485 25.985c-0.384 0-0.768-0.146-1.061-0.439-0.586-0.586-0.586-1.535 0-2.121 4.094-4.094 4.094-10.755 0-14.849-0.586-0.586-0.586-1.536 0-2.121s1.536-0.586 2.121 0c2.55 2.55 3.954 5.94 3.954 9.546s-1.404 6.996-3.954 9.546c-0.293 0.293-0.677 0.439-1.061 0.439v0zM17.157 23.157c-0.384 0-0.768-0.146-1.061-0.439-0.586-0.586-0.586-1.535 0-2.121 2.534-2.534 2.534-6.658 0-9.192-0.586-0.586-0.586-1.536 0-2.121s1.535-0.586 2.121 0c3.704 3.704 3.704 9.731 0 13.435-0.293 0.293-0.677 0.439-1.061 0.439z"></path><path d="M13 30c-0.26 0-0.516-0.102-0.707-0.293l-7.707-7.707h-3.586c-0.552 0-1-0.448-1-1v-10c0-0.552 0.448-1 1-1h3.586l7.707-7.707c0.286-0.286 0.716-0.372 1.090-0.217s0.617 0.519 0.617 0.924v26c0 0.404-0.244 0.769-0.617 0.924-0.124 0.051-0.254 0.076-0.383 0.076z"></path></svg>');`,
   `  --ico-mute: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 32"><path d="M13 30c-0.26 0-0.516-0.102-0.707-0.293l-7.707-7.707h-3.586c-0.552 0-1-0.448-1-1v-10c0-0.552 0.448-1 1-1h3.586l7.707-7.707c0.286-0.286 0.716-0.372 1.090-0.217s0.617 0.519 0.617 0.924v26c0 0.404-0.244 0.769-0.617 0.924-0.124 0.051-0.254 0.076-0.383 0.076z"></path></svg>');`,
   '  align-items: center;',
   '  display: flex;',
   '  width: 100%;',
   '}',
   '.c-rng--tomato {',
   '  --circle-bgc: #fff;',
   '  --track-bgc: hsl(9, 20%, 85%);',
   '  --track-fill: tomato;',
   '}',
   '.c-rng--darkcyan {',
   '  --circle-bgc: #fff;',
   '  --track-bgc: hsl(180, 20%, 80%);',
   '  --track-fill: darkcyan;',
   '}',
   '[data-icon] {',
   '  --icon-bgc: #b0b0b0;',
   '  --icon-w: 2rem;',
   '  background-color: var(--icon-bgc);',
   '  height: var(--icon-w);',
   '  margin-top: 0.5rem;',
   '  mask: no-repeat center/var(--icon-w) var(--icon);',
   '  -webkit-mask: no-repeat center/var(--icon-w) var(--icon);',
   '  width: var(--icon-w);',
   '}',
   '[data-icon="audio"] {',
   '  --icon: var(--ico-audio);',
   '  margin-left: 1rem;',
   '}',
   '[data-icon="mute"] {',
   '  --icon: var(--ico-mute);',
   '}',
   '',
   '.goog-slider-vertical .goog-slider-thumb {',
   '  width: 18px;',
   '  height: 18px;',
   '  position: absolute;',
   '  background-color: white;',
   '  border-radius: 100%;',
   '  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 4px;',
   '  top: 94px;',
   '  transform: translateX(-4px);',
   '}',
   '.goog-slider-vertical {',
   '  width: 10px;',
   '  border-radius: 5px;',
   '}',

   '.scratchColourPickerLabelVertical {',
     'font-family: "Helvetica Neue", Helvetica, sans-serif;',
     'font-size: 0.65rem;',
     'color: white',
   '}',
 
   '.scratchColourPickerLabelTextVertical {',
     'font-weight: bold;',
     'writing-mode: vertical-rl;',
   '}',
 
   '.scratchColourPickerReadoutVertical {',
     'writing-mode: vertical-rl;',
   '}',
   '.matrix-apply-to-all-btn {',
   '  position: absolute;',
   '  bottom: 1px;',
   '  left: 1px;',
   '  width: 25px;',
   '  height: 25px;',
   '}',
   '.matrix-clear-all-btn {',
   '  position: absolute;',
   '  bottom: 0px;',
   '  left: 30px;',
   '  width: 25px;',
   '  height: 25px;',
   '}',
   '.tune-composer {',
   '  box-sizing: border-box;',
   '  color: #292929;',
   '  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;',
   '  max-width: 550px;',
   '  padding: 12px;',
   '}',
   '.tune-composer label {',
   '  font-size: 0.75rem;',
   '  margin-right: 4px;',
   '}',
   '.tune-composer input, .tune-composer select, .tune-composer button, .tune-composer textarea {',
   '  font-family: inherit;',
   '}',
   '.tune-composer__header {',
   '  align-items: center;',
   '  display: grid;',
   '  gap: 4px;',
   '  grid-template-columns: auto 1fr auto 50px auto 50px auto 50px;',
   '  margin-bottom: 8px;',
   '}',
   '.tune-composer__mode {',
   '  align-items: center;',
   '  display: flex;',
   '  gap: 6px;',
   '  grid-column: 1 / -1;',
   '  margin-bottom: 2px;',
   '}',
   '.tune-composer__mode-label {',
   '  font-size: 0.75rem;',
   '  font-weight: 600;',
   '}',
   '.tune-composer__mode-toggle {',
   '  border: 1px solid rgba(0,0,0,0.2);',
   '  border-radius: 16px;',
   '  display: inline-flex;',
   '  overflow: hidden;',
   '}',
   '.tune-composer__mode-toggle button {',
   '  background: transparent;',
   '  border: none;',
   '  color: inherit;',
   '  cursor: pointer;',
   '  font-size: 0.75rem;',
   '  padding: 4px 12px;',
   '}',
   '.tune-composer__mode-toggle button + button {',
   '  border-left: 1px solid rgba(0,0,0,0.2);',
   '}',
   '.tune-composer__mode-toggle button.is-selected {',
   '  background: #4caf50;',
   '  color: #fff;',
   '}',
   '.tune-composer__header input {',
   '  border: 1px solid rgba(0,0,0,0.2);',
   '  border-radius: 4px;',
   '  padding: 2px 6px;',
   '  padding-right: 0px;',
   '}',
   '.tune-composer__header select {',
    ' width: 50px;',
   '}',
   '.tune-composer__toolbar {',
   '  align-items: center;',
   '  display: flex;',
   '  flex-wrap: wrap;',
   '  gap: 6px;',
   '  margin-bottom: 8px;',
   '}',
   '.tune-composer__lengths button, .tune-composer__rest, .tune-composer__dot {',
   '  background: #fafafa;',
   '  border: 1px solid rgba(0,0,0,0.2);',
   '  border-radius: 4px;',
   '  cursor: pointer;',
   '  margin-right: 4px;',
   '  padding: 4px 8px;',
   '}',
   '.tune-composer__lengths button.is-selected, .tune-composer__dot.is-selected {',
   '  background: #ffb347;',
   '  border-color: #f28c28;',
   '  color: #1a1a1a;',
   '}',
   '.tune-composer__octave {',
   '  border-radius: 4px;',
   '  padding: 4px;',
   '}',
   '.tune-composer__keyboard {',
   '  background: #ffffff;',
   '  border: 1px solid rgba(0,0,0,0.1);',
   '  border-radius: 6px;',
   '  display: flex;',
   '  justify-content: center;',
   '  margin-bottom: 8px;',
   '  padding: 12px 16px;',
   '}',
   '.tune-composer__piano {',
   '  height: 140px;',
   '  max-width: 420px;',
   '  position: relative;',
   '  width: 100%;',
   '}',
   '.tune-composer__piano-whites {',
   '  display: flex;',
   '  height: 100%;',
   '}',
   '.tune-composer__piano-blacks {',
   '  height: 65%;',
   '  left: 0;',
   '  pointer-events: none;',
   '  position: absolute;',
   '  top: 0;',
   '  width: 100%;',
   '}',
   '.piano-key {',
   '  border: none;',
   '  box-sizing: border-box;',
   '  cursor: pointer;',
   '  font-size: 0.8rem;',
   '  outline: none;',
   '  position: relative;',
   '}',
   '.piano-key:focus-visible {',
   '  box-shadow: 0 0 0 2px #4caf50 inset;',
   '}',
   '.piano-key--white {',
   '  align-items: flex-end;',
   '  background: linear-gradient(#ffffff, #f2f2f2);',
   '  border: 1px solid #c0c0c0;',
   '  border-left: none;',
   '  box-shadow: inset 1px 0 0 rgba(0,0,0,0.08);',
   '  color: #333;',
   '  display: flex;',
   '  flex: 1;',
   '  height: 100%;',
   '  justify-content: center;',
   '  padding-bottom: 8px;',
   '}',
   '.piano-key--white:first-child {',
   '  border-left: 1px solid #c0c0c0;',
   '  border-top-left-radius: 6px;',
   '}',
   '.piano-key--white:last-child {',
   '  border-top-right-radius: 6px;',
   '}',
   '.piano-key--white:active {',
   '  background: linear-gradient(#f0f0f0, #dcdcdc);',
   '}',
   '.piano-key--black {',
   '  background: linear-gradient(#4a4a4a, #111);',
   '  border: 1px solid #000;',
   '  border-radius: 0 0 4px 4px;',
   '  color: #fff;',
   '  height: 100%;',
   '  left: 0;',
   '  padding-bottom: 4px;',
   '  pointer-events: auto;',
   '  position: absolute;',
   '  text-align: center;',
   '  transform: translateX(-50%);',
   '  width: 9%;',
   '}',
   '.piano-key--black:active {',
   '  background: linear-gradient(#2d2d2d, #050505);',
   '}',
   '.tune-composer__sequence {',
   '  border: 1px solid rgba(0,0,0,0.1);',
   '  border-radius: 6px;',
   '  margin-bottom: 8px;',
   '  padding: 8px;',
   '}',
   '.tune-composer__sequence-list {',
   '  display: flex;',
   '  flex-wrap: wrap;',
   '  gap: 4px;',
   '  margin-bottom: 8px;',
   '}',
   '.tune-composer__event-chip {',
   '  background: #f5f5f5;',
   '  border: 1px solid rgba(0,0,0,0.15);',
   '  border-radius: 999px;',
   '  cursor: pointer;',
   '  padding: 4px 10px;',
   '}',
   '.tune-composer__event-chip.is-selected {',
   '  background: #86cefa;',
   '  border-color: #3581d8;',
   '}',
   '.tune-composer__per-note {',
   '  align-items: center;',
   '  display: grid;',
   '  gap: 4px;',
   '  grid-template-columns: repeat(6, auto);',
   '}',
   '.tune-composer__per-note button {',
   '  background: #fafafa;',
   '  border: 1px solid rgba(0,0,0,0.2);',
   '  border-radius: 4px;',
   '  cursor: pointer;',
   '  padding: 4px 8px;',
   '}',
   '.tune-composer__footer {',
   '  display: flex;',
   '  flex-direction: column;',
   '  gap: 6px;',
   '}',
   '.tune-composer__warning {',
   '  color: #c0392b;',
   '  font-size: 0.75rem;',
   '  min-height: 16px;',
   '}',
   '.tune-composer__preview {',
   '  border: 1px solid rgba(0,0,0,0.2);',
   '  border-radius: 4px;',
   '  font-size: 0.75rem;',
   '  min-height: 64px;',
   '  padding: 6px;',
   '  resize: vertical;',
   '}',
   '.tune-composer__staff {',
   '  width: 100%;',
   '}',
   '.tune-composer__actions {',
   '  display: flex;',
   '  flex-wrap: wrap;',
   '  gap: 6px;',
   '  justify-content: flex-end;',
   '}',
   '.tune-composer__actions .primary {',
   '  background: #4caf50;',
   '  border: 1px solid #3d8c41;',
   '  color: white;',
   '}',
   '.tune-composer__actions button {',
   '  background: #fafafa;',
   '  border: 1px solid rgba(0,0,0,0.2);',
   '  border-radius: 4px;',
   '  cursor: pointer;',
   '  padding: 5px 10px;',
   '}',
   '',
 ];
 
