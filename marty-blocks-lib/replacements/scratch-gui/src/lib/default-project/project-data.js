import { defineMessages } from "react-intl";
import sharedMessages from "../shared-messages";

let messages = defineMessages({
  meow: {
    defaultMessage: "Meow",
    description: "Name for the meow sound",
    id: "gui.defaultProject.meow",
  },
  variable: {
    defaultMessage: "my variable",
    description: "Name for the default variable",
    id: "gui.defaultProject.variable",
  },
});

messages = { ...messages, ...sharedMessages };

// use the default message if a translation function is not passed
const defaultTranslator = (msgObj) => msgObj.defaultMessage;

/**
 * Generate a localized version of the default project
 * @param {function} translateFunction a function to use for translating the default names
 * @return {object} the project data json for the default project
 */
const projectData = (translateFunction) => {
  const translator = translateFunction || defaultTranslator;
  return {
    targets: [
      {
        isStage: true,
        name: "Stage",
        variables: {
          "`jEk@4|i[#Fk?(8x)AV.-my variable": [
            translator(messages.variable),
            0,
          ],
        },
        lists: {},
        broadcasts: {},
        blocks: {},
        currentCostume: 0,
        costumes: [
          {
            assetId: "cd21514d0531fdffb22204e0ec5ed84a",
            name: translator(messages.backdrop, { index: 1 }),
            md5ext: "cd21514d0531fdffb22204e0ec5ed84a.svg",
            dataFormat: "svg",
            rotationCenterX: 240,
            rotationCenterY: 180,
          },
        ],
        sounds: [],
        volume: 100,
      },
      {
        isStage: false,
        name: "Marty", //translator(messages.sprite, {index: 1}),
        variables: {},
        lists: {},
        broadcasts: {},
        blocks: {},
        currentCostume: 0,
        costumes: [
          {
            assetId: "8e41346f9e386948096815a9b5d6b3e0",
            name: translator(messages.costume, { index: 1 }),
            bitmapResolution: 1,
            md5ext: "8e41346f9e386948096815a9b5d6b3e0.svg",
            dataFormat: "svg",
            rotationCenterX: 48,
            rotationCenterY: 50,
          },
        ],
        sounds: [
          {
              name: "Celebrate",
              assetId: "celebrate",
              md5ext: "celebrate.wav",
              dataFormat: 'wav',
          },
          {
              name: "Confusion",
              assetId: "confused",
              md5ext: "confused.wav",
              dataFormat: 'wav',
          },
          {
              name: "Disbelief",
              assetId: "disbelief",
              dataFormat: "wav",
              md5ext: "disbelief.wav",
          },
          {
              name: "Excited",
              assetId: "excited",
              dataFormat: "wav",
              md5ext: "excited.wav",
          },
          {
              name: "No Way!",
              assetId: "no_way",
              dataFormat: "wav",
              md5ext: "no_way.wav",
          },
          {
              name: "No!",
              assetId: "no",
              dataFormat: "wav",
              md5ext: "no.wav",
          },
          {
              name: "Whistle",
              assetId: "whistle",
              dataFormat: "wav",
              md5ext: "whistle.wav",
          },
        ],
        volume: 100,
        visible: true,
        x: -100,
        y: 0,
        size: 100,
        direction: 90,
        draggable: false,
        rotationStyle: "all around",
      },
    ],
    meta: {
      semver: "3.0.0",
      vm: "0.1.0",
      agent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36", // eslint-disable-line max-len
    },
  };
};

export default projectData;
