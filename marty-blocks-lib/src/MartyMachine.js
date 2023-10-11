const {
  MLModel,
  trainingDataReducer,
  TrainingDataHelper,
  TrainingDataActionTypes,
  tfvis,
  IMAGE_SIZE,
  AudioTrainingOptions
} = require("@robotical/marty-machine-lib/dist/marty-machine-lib.umd");

class MartyMachine {
  constructor() {
    this.trainingDataActionTypes = TrainingDataActionTypes;
    this.tfvis = tfvis;
    this.image_size = IMAGE_SIZE;
    this.AudioTrainingOptions = AudioTrainingOptions;
  }

  /**
   * 
   * @param {string} modelType - "image-device" or "audio"
   * @returns {MLModel} - a new instance of MLModel
   */

  getNewModelInstance(modelType = "image-device") {
    if (modelType === "image-device") {
      return new MLModel("static/MLModelWorker.js");
    } else if (modelType === "audio") {
      return new MLModel("static/MLModelWorker.js");
    }
  }

  async loadModel(modelJSON, weightBuffers, weightInfo) {
    return new Promise((resolve, reject) => {

      const model = this.getNewModelInstance();

      model.setLoadModelCallback = () => {
        console.log("model loaded");
        resolve(model);
        model.setLoadModelCallback = undefined;
      };

      const timeout = setTimeout(() => {
        reject("Model took too long to load");
        model.setLoadModelCallback = undefined;
        clearTimeout(timeout);
      }, 10000);

      model.loadModel({ modelJSON, weightBuffers, weightInfo });
    });
  }

  async loadTmModel(tmModelUrl) {
    return new Promise((resolve, reject) => {

      const model = this.getNewModelInstance();

      model.setLoadModelCallback = () => {
        console.log("tm model loaded");
        resolve(model);
        model.setLoadModelCallback = undefined;
      };

      const timeout = setTimeout(() => {
        reject("Model took too long to load");
        model.setLoadModelCallback = undefined;
        clearTimeout(timeout);
      }, 10000);

      model.loadModel({ tmModelUrl });
    });
  }

  async trainModel(model, trainingData, modelType = "image-device", trainingOptions = {}) {
    const TRAIN_CB_ID = "training-marty-machine";
    return new Promise((resolve, reject) => {
      console.log("training model")
      model.addStatusCallback(TRAIN_CB_ID, () => {
        console.log("model trained");
        resolve(true);
        model.removeStatusCallback(TRAIN_CB_ID);
      });

      const timeout = setTimeout(() => {
        reject(false);
        clearTimeout(timeout);
        model.removeStatusCallback(TRAIN_CB_ID);
      }, 200000);

      if (modelType === "image-device") {
        model.trainModel(trainingData, trainingOptions);
      } else if (modelType === "audio") {
        model.trainAudioModel(trainingData, trainingOptions);
      }
    });
  }


  /**
   * @param {MLModel} model - instance of MLModel
   * @param {object} data - {timeData?, freqData?}
   */
  streamAudioToWebWorker(model, data) {
    model.streamAudioToWebWorker(data);
  }


  getNewTrainingDataReducer() {
    return new TDReducerWrapper();
  }

  newImage(imageSrc) {
    return {
      jpegBase64: imageSrc,
      width: 160,
      height: 120,
      depth: 3,
    };
  }
}

class TDReducerWrapper {
  constructor() {
    this.state = TrainingDataHelper.newTrainingData();
  }

  reduce(action) {
    const newState = trainingDataReducer(this.state, action);
    this.state = newState;
    return newState;
  }
}

module.exports = MartyMachine;
