import { defineMessages } from "react-intl";
import sharedMessages from "../shared-messages";
import targetTypes from "../target-types-enum.js";

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
        targetType: targetTypes.stage,
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
