#!/usr/bin/env node

/*
Generates locales/<component>-msgs.js for each component (gui, etc) from  the
current translation files for each language for that component

Translation files are expected to be in Chrome i18n json format:
'''
{
    "message.id": {
        "message": "The translated text",
        "description": "Tips for translators"
    },
    ...
}
'''
They are named by locale, for example: 'fr.json' or 'zh-cn.json'

Converts the collection of translation files to a single set of messages.
Example output:
'''
{
  "en": {
    "action.addBackdrop": "Add Backdrop",
    "action.addCostume": "Add Costume",
    "action.recordSound": "Record Sound",
    "action.addSound": "Add Sound"
  },
  "fr": {
    "action.addSound": "Ajouter Son",
    "action.addCostume": "Ajouter Costume",
    "action.addBackdrop": "Ajouter Arrière-plan",
    "action.recordSound": "Enregistrement du Son"
  }
}
'''
NOTE: blocks messages are plain key-value JSON files

Missing locales are ignored, react-intl will use the default messages for them.
 */
import * as fs from 'fs';
import * as path from 'path';
import { sync as mkdirpSync } from 'mkdirp';
import defaultsDeep from 'lodash.defaultsdeep';
import locales from '../src/supported-locales.js';

const MSGS_DIR = './locales/';
mkdirpSync(MSGS_DIR);
let missingLocales = [];

const combineJson = (component) => {
    return Object.keys(locales).reduce((collection, lang) => {
        try {
            let langData = JSON.parse(
                fs.readFileSync(path.resolve('editor', component, lang + '.json'), 'utf8')
            );
            collection[lang] = langData;
        } catch (e) {
            missingLocales.push(component + ':' + lang + '\n');
        }
        return collection;
    }, {});
};

const generateScratchMsgsFile = (component) => {
  // 1) collect all locale JSON into a map
  const locales = combineJson(component);

  // 2) build header
  const header = [
    '// This file was automatically generated.  Do not modify.',
    '',
    "'use strict';",
    '',
    "goog.provide('Blockly.ScratchMsgs.allLocales');",
    '',
    "goog.require('Blockly.ScratchMsgs');",
    ''
  ];

  // 3) build the blocks array by reading each JSON file
  const inputDir = path.resolve('editor', component);
  const files = Object.keys(locales)
    .map(lang => lang + '.json')
    .sort();

  const blocks = files.map(file => {
    const locale = path.basename(file, '.json');
    const raw    = fs.readFileSync(path.join(inputDir, file), 'utf8');
    let obj;
    try {
      obj = JSON.parse(raw);
    } catch (e) {
      console.error(`Invalid JSON in file ${file}: ${e.message}`);
      process.exit(1);
    }
    const jsonStr = JSON.stringify(obj, null, 2);
    return `Blockly.ScratchMsgs.locales["${locale}"] = ${jsonStr};`;
  });

  // 4) footer
  const footer = [
    '',
    '// End of combined translations'
  ];

  // 5) combine all parts into one string
  const fileContents = header
    .concat(blocks, footer)
    .join('\n');

  // 6) write to disk
  const outputFile = path.resolve('editor', component, 'scratch_msgs.js');
  fs.writeFileSync(outputFile, fileContents, 'utf8');
  console.log(`Generated translations: ${files.length} locales → ${outputFile}`);
};

// generate the blocks messages: files are plain key-value JSON
let blocksMessages = combineJson('blocks');
let blockData =
    '// GENERATED FILE:\n' +
    'export default ' +
    JSON.stringify(blocksMessages, null, 2) +
    ';\n';

fs.writeFileSync(MSGS_DIR + 'blocks-msgs.js', blockData);

// generate the scratch-msgs.js file for blocks
generateScratchMsgsFile('blocks');

// generate messages for gui components - all files are plain key-value JSON
let components = ['interface', 'extensions', 'paint-editor', 'custom'];
let editorMsgs = {};
components.forEach((component) => {
    let messages = combineJson(component);
    let data =
        '// GENERATED FILE:\n' +
        'export default ' +
        JSON.stringify(messages, null, 2) +
        ';\n';
    fs.writeFileSync(MSGS_DIR + component + '-msgs.js', data);
    defaultsDeep(editorMsgs, messages);
});

// generate combined editor-msgs file
let editorData =
    '// GENERATED FILE:\n' +
    'export default ' +
    JSON.stringify(editorMsgs, null, 2) +
    ';\n';
fs.writeFileSync(MSGS_DIR + 'editor-msgs.js', editorData);

if (missingLocales.length > 0) {
    process.stdout.write('missing locales:\n' + missingLocales.toString());
    // process.exit(1);
}
