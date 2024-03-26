const {
  MLModel,
  trainingDataReducer,
  TrainingDataHelper,
  TrainingDataActionTypes,
  tfvis,
  IMAGE_SIZE,
  AudioTrainingOptions,
  BACKGROUND_NOISE_TAG
} = require("@robotical/marty-machine-lib/dist/marty-machine-lib.umd");

class MartyMachine {
  constructor() {
    this.trainingDataActionTypes = TrainingDataActionTypes;
    this.tfvis = tfvis;
    this.image_size = IMAGE_SIZE;
    this.AudioTrainingOptions = AudioTrainingOptions;
    this.BACKGROUND_NOISE_TAG = BACKGROUND_NOISE_TAG;
    this.currentModel = undefined;
    this.currentTrainingReducer = undefined;
  }
  
  cleanupAfterSave() {
    this.currentModel = undefined;
    this.currentTrainingReducer = undefined;
  }

  /**
   * 
   * @param {string} modelType - "image-device" or "audio"
   * @returns {MLModel} - a new instance of MLModel
   */
  getNewModelInstance(modelType = "image-device") {
    let model = undefined;
    if (modelType === "image-device") {
      model = new MLModel("static/MLModelWorker.js");
    } else if (modelType === "audio") {
      model = new MLModel("static/MLModelWorker.js");
    }
    this.currentModel = model;
    this.currentModel.modelType = modelType;
    return model;
  }

  async loadModel(modelJSON, weightBuffers, weightInfo, modelType = "image-device", modelTrainingData = undefined) {
    // transform modelTrainingData to audioAlphabeticalWords
    let audioAlphabeticalWords = undefined;
    if (modelTrainingData) {
      audioAlphabeticalWords = modelTrainingData.classes.map((cls) => cls.name).sort();
    }
    return new Promise((resolve, reject) => {

      const model = this.getNewModelInstance(modelType);

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

      if (modelType === "image-device") {
        model.loadModel({ modelJSON, weightBuffers, weightInfo });
      } else if (modelType === "audio") {
        model.loadAudioModel({ modelJSON, weightBuffers, weightInfo, audioAlphabeticalWords });
      }
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
      }, 20000);

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
    const trainingReducer =  new TDReducerWrapper();
    this.currentTrainingReducer = trainingReducer;
    return trainingReducer;
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
