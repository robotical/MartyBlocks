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
