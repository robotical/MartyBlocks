const {
  MLModel,
  trainingDataReducer,
  TrainingDataHelper,
  TrainingDataActionTypes,
  tfvis
} = require("@robotical/marty-machine-lib/dist/marty-machine-lib.umd");

class MartyMachine {
  constructor() {
    this.trainingDataActionTypes = TrainingDataActionTypes;
    this.tfvis = tfvis;
  }

  getNewModelInstance() {
    return new MLModel("static/MLModelWorker.js");
  }

  async loadModel(modelJSON, weightBuffers, weightInfo) {
    return new Promise((resolve, reject) => {

      const model = this.getNewModelInstance();
  
      model.setLoadModelCallback = () => {
        console.log("model loaded");
        resolve(model); // Resolve the promise when the model is loaded
      };

      const timeout = setTimeout(() => {
        reject("Model took too long to load");
        clearTimeout(timeout);
      }, 10000);
  
      model.loadModel(modelJSON, weightBuffers, weightInfo);
    });
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
