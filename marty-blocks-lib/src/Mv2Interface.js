/**
 * @fileoverview
 * Functions for interacting with Marty v2 via a REST interface
 */
class EventDispatcher {
  constructor() {
    this._listeners = [];
  }

  hasEventListener(type, listener) {
    return this._listeners.some(
      (item) => item.type === type && item.listener === listener
    );
  }

  addEventListener(type, listener) {
    if (!this.hasEventListener(type, listener)) {
      this._listeners.push({ type, listener, options: { once: false } });
    }
    return this;
  }

  removeEventListener(type, listener) {
    const index = this._listeners.findIndex(
      (item) => item.type === type && item.listener === listener
    );
    if (index >= 0) this._listeners.splice(index, 1);
    return this;
  }

  removeEventListeners() {
    this._listeners = [];
    return this;
  }

  dispatchEvent(evt) {
    this._listeners
      .filter((item) => item.type === evt.type)
      .forEach((item) => {
        const {
          type,
          listener,
          options: { once },
        } = item;
        listener.call(this, evt);
        if (once === true) this.removeEventListener(type, listener);
      });
    return this;
  }
}

class Mv2Interface extends EventDispatcher {
  constructor() {
    super();
    this.isConnected = false;
    this.ip = null;
    this.demo_sensor = 0;
    this.battRemainCapacityPercent = 0;
    this.rssi = 0;
    this.servos = 0;
    this.accel = 0;
    this.commandPromise = null;
    this.systemInfo = null;
    this.mp3EncodingBitRate = null;
    this.mp3EncodingSampleRate = null;
    this.mp3EncodingAvgFlag = null;
    this.isStreamStarting = null;
    this.onCommandReply = this.onCommandReply.bind(this);
    this.sendCommand = this.sendCommand.bind(this);
    this.saveScratchFile = this.saveScratchFile.bind(this);
    this.loadScratchFile = this.loadScratchFile.bind(this);
    this.listSavedScratchFiles = this.listSavedScratchFiles.bind(this);
    this.deleteScratchFile = this.deleteScratchFile.bind(this);
    this.setRSSI = this.setRSSI.bind(this);
    this.setIsStreamStarting = this.setIsStreamStarting.bind(this);
    this.sessionDbs = null;
  }

  getMartyFwVersion() {
    if (this.systemInfo && this.systemInfo.SystemVersion) {
      return this.systemInfo.SystemVersion;
    }
    return "";
  }

  setRSSI(rssi) {
    if (rssi !== this.rssi) {
      this.rssi = rssi;
      this.dispatchEvent({ type: "onRSSIChange", rssi: this.rssi });
    }
  }

  setBattRemainCapacityPercent(battRemainCapacityPercent) {
    if (battRemainCapacityPercent !== this.battRemainCapacityPercent) {
      this.battRemainCapacityPercent = battRemainCapacityPercent;
      this.dispatchEvent({
        type: "onBattRemainCapacityPercentChange",
        battRemainCapacityPercent: this.battRemainCapacityPercent,
      });
    }
  }

  setIsConnected(isConnected) {
    if (isConnected !== this.isConnected) {
      this.isConnected = isConnected;
      this.dispatchEvent({
        type: "onIsConnectedChange",
        isConnected: this.isConnected,
      });
    }
  }

  // eslint-disable-next-line camelcase
  send_REST(cmd) {
    // eslint-disable-next-line no-console,no-alert
    console.log(`Marty REST command: ${cmd}`);
    // eslint-disable-next-line no-alert
    //        if (this.ip !== null){
    //            fetch(`http://${this.ip}/api/${cmd}`)
    //                 .then(response => {
    //                     if (response.ok)
    //                         return response.json();
    //                     }
    //                     const resp = response;
    //                     console.warn('Response not ok', resp.ok);
    //                 })
    //                 .catch(err => {
    //                     console.warn('er #2', err);
    //                 });
    //        } else {
    try {
      window.ReactNativeWebView.postMessage(cmd); // this call triggers onMessage in the app
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`Error sending to react native: ${err}`);
      // alert('You are not currently connected to a Marty. Please connect.');
    }
  }

  isAddonConnected(addonTitle) {
    let addons = [];
    try {
      addons = JSON.parse(this.addons).addons;
    } catch (err) {
      console.log(`Error parsing addons: ${err}`);
    }
    if (addons) {
      return addons.some(
        (addon) => addon.whoAmI === addonTitle || addon.name === addonTitle
      );
    }
    return false;
  }

  streamAudio(audioData, duration, clearExisting) {
    console.log(`streamAudio ${audioData.length}`);
    this.sendCommand({
      command: "audioStreaming",
      audioData: Array.from(audioData),
      duration,
      clearExisting,
    });
  }

  setIsStreamStarting(isStreamStarting) {
    this.isStreamStarting = isStreamStarting;
  }

  /**
   * Save a scratch file on the device
   * @param {string} fileName Filename to save to
   * @param {string} contents Base64 encoded project data
   * @returns {Promise} Promise
   */
  saveScratchFileOnDevice(fileName, contents) {
    if (window.ReactNativeWebView) {
      return this.sendCommand({
        command: "saveFileOnDevice",
        fileName,
        contents,
      });
    }
    // not running in react native, save on pc
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = contents;
    // the filename you want
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return Promise.resolve();
  }

  /**
   * Save a scratch file
   * @param {string} fileName Filename to save to
   * @param {string} contents Base64 encoded project data
   * @returns {Promise} Promise
   */
  saveScratchFile(fileName, contents) {
    if (window.ReactNativeWebView) {
      return this.sendCommand({
        command: "saveFile",
        fileName,
        contents,
      });
    }
    // not running in react native, fallback to web storage
    window.localStorage.setItem(`scratch_${fileName}`, contents);
    return Promise.resolve();
  }

  /**
   * Remove a scratch file from the cloud
   * @param {string} fileName Filename of the project to remove
   */
  async deleteCloudScratchFile(fileName) {
    const dbUrl = `https://martyblocks-projects-default-rtdb.europe-west1.firebasedatabase.app/projects/${fileName}.json`;
    try {
      await fetch(dbUrl, {
        method: "DELETE",
      });
      this.sendFeedbackToServer({ success: true, fileName: fileName });
    } catch (err) {
      this.sendFeedbackToServer({ success: false, error: err });
      console.log(`Error deleting file: ${err}`);
    }
  }

  /**
   * Save a scratch file on the cloud
   * @param {string} projectBase64 Base64 encoded project data
   * @returns {string} id of the saved project
   */
  async saveCloudScratchFile(projectBase64, fileName) {
    // fileName is only for testing purposes -- it is not used in the actual save
    // in reality, file names are created automatically by firebase to avoid collisions
    // however, we need to be able to test the save/load functionality, so we pass in a file name
    let dbUrl =
      "https://martyblocks-projects-default-rtdb.europe-west1.firebasedatabase.app/projects.json";
    if (fileName) {
      dbUrl = `https://martyblocks-projects-default-rtdb.europe-west1.firebasedatabase.app/projects/${fileName}.json`;
    }
    let response;
    try {
      response = await fetch(dbUrl, {
        method: fileName ? "PATCH" : "POST",
        headers: {
          Application: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: projectBase64 }),
      });
      this.sendFeedbackToServer({ success: true, fileName: fileName });
    } catch (e) {
      this.sendFeedbackToServer({ success: false, error: e });
      return mv2Interface.send_REST(
        "notification/warn-message/To save a file in the cloud internet access is needed."
      );
    }
    const projectId = await response.json();
    if (projectId && projectId.name) return projectId.name;
    return null;
  }

  /**
   * Delete a saved scratch file
   * @param {string} fileName File to delete
   * @returns {Promise} Promise
   */
  deleteScratchFile(fileName) {
    if (window.ReactNativeWebView) {
      return this.sendCommand({
        command: "deleteFile",
        fileName,
      });
    }
    // not running in react native, fallback to web storage
    window.localStorage.removeItem(`scratch_${fileName}`);
    return Promise.resolve();
  }

  /**
   * Load a scratch file
   * @param {string} fileName File to load
   * @returns {Promise} Promise
   */
  loadScratchFile(fileName) {
    if (window.ReactNativeWebView) {
      return this.sendCommand({
        command: "loadFile",
        fileName,
      });
    }
    // not running in react native, fallback to web storage
    const contents = window.localStorage.getItem(`scratch_${fileName}`);
    return Promise.resolve({ contents });
  }

  /**
   * Load a scratch file
   * @param {string} fileId File to load
   * @returns {string} projectBase64String
   */
  async loadCloudScratchFile(fileId, projectFolder = "projects") {
    try {
      const dbUrl = `https://martyblocks-projects-default-rtdb.europe-west1.firebasedatabase.app/${projectFolder}/`;
      let res;
      try {
        res = await fetch(dbUrl + fileId + ".json");
        this.sendFeedbackToServer({ success: true, fileName: fileId });
      } catch (e) {
        this.sendFeedbackToServer({ success: false, error: e });
        return mv2Interface.send_REST(
          "notification/warn-message/To load a saved file in the cloud internet access is needed."
        );
      }
      const projectBase64String = await res.json();
      if (!projectBase64String || !projectBase64String.data) {
        throw new Error("Invalid project id");
      }
      return projectBase64String.data;
    } catch (e) {
      console.log("Couldn't load cloud project:", e);
    }
  }

  /**
   * Load demo projects from the cloud
   * @returns {Array<string>} projectBase64String array
   */
  async loadCloudDemoNames() {
    try {
      const dbUrl =
        "https://martyblocks-projects-default-rtdb.europe-west1.firebasedatabase.app/demo-projects.json?shallow=true";
      let res;
      try {
        res = await fetch(dbUrl);
      } catch (e) {
        this.sendFeedbackToServer({ success: false, error: e });
        return mv2Interface.send_REST(
          "notification/warn-message/To load demo projects in the cloud internet access is needed."
        );
      }
      let demoProjectFileNames = await res.json();
      demoProjectFileNames = Object.keys(demoProjectFileNames);
      if (!demoProjectFileNames || !demoProjectFileNames.length) {
        this.sendFeedbackToServer({
          success: false,
          error: "No demo projects found",
        });
        throw new Error("No demo projects found");
      }
      this.sendFeedbackToServer({
        success: true,
        demosLength: demoProjectFileNames.length,
      });
      return demoProjectFileNames;
    } catch (e) {
      console.log("Couldn't load cloud demo projects:", e);
      this.sendFeedbackToServer({
        success: false,
        error: "Couldn't load cloud demo projects: " + e,
      });
    }
  }


  /**
   * List the saved scratch files
   * @returns {Promise} Promise
   */
  listSavedScratchFiles() {
    if (window.ReactNativeWebView) {
      return this.sendCommand({
        command: "listFiles",
      });
    }
    // not running in react native, fallback to web storage
    const fileNames = Object.keys(window.localStorage)
      .filter((key) => key.startsWith("scratch_"))
      .map((key) => key.replace(/^scratch_/, ""));
    return Promise.resolve({ fileNames });
  }

  /**
   * Sends a command to the react-native code and returns a promise that will be
   * fulfilled when the react-native code replies
   * @param {{command: string}} payload Payload to send to the react-native code
   * @returns {Promise} Promise
   */
  sendCommand(payload) {
    if (this.commandPromise) {
      // eslint-disable-next-line no-console
      console.warn("Command already in flight");
    }
    const promise = new Promise((resolve, reject) => {
      this.commandPromise = { resolve, reject };
    });
    window.ReactNativeWebView.postMessage(JSON.stringify(payload));
    return promise;
  }

  /**
   * Sends feedback to the server after a command has been executed from martyblocks
   * Usefull for debugging and testing through MST
   * @param {string} feedback Stringified JSON object with feedback
   * @param {boolean} isError Whether the feedback is an error or not (if it's an error it'll be stored to db)
   * @returns {void}
   */
  sendFeedbackToServer(feedback, isError = false) {
    if (window.ReactNativeWebView) {
      return this.sendCommand({
        command: "feedback",
        feedback,
        isError,
      });
    }
  }

  /**
   * Called by the react-native code to respond to sendCommand
   * @param {{success: boolean, error: string}} args Response from the react native side
   */
  onCommandReply(args) {
    if (this.commandPromise) {
      if (args.success) {
        this.commandPromise.resolve(args);
      } else {
        this.commandPromise.reject(new Error(args.error));
      }
      this.commandPromise = null;
    } else {
      // eslint-disable-next-line no-console
      console.warn("Unhandled command reply");
    }
  }

  /**
   * Toggle sensors dashboard
   * @returns {void}
   * Currently available only in the desktop version of MartyBlocks
   */
  toggleSensorsDashboard() {
    this.send_REST("toggle-sensors-dashboard");
  }

  /**
   * Save 'usedBlock' in MartyBlocks session
   * @param {string} usedBlock Block name
   * @returns {void}
   */
  saveUsedBlock(usedBlock) {
    this.send_REST(`save-used-block-mb/${usedBlock}`);
  }

  /**
   * Starts PythonTranslator session and sets it to active if it needs to be
   * @param {boolean} setActive Whether to set the session to active or not
   * @returns {void} 
   */
  startPythonTranslatorSession(setActive = false) {
    if (setActive) {
      this.send_REST("start-and-set-python-translator-session-active");
    } else {
      this.send_REST("start-python-translator-session");
    }
  }

  /**
   * Sets PythonTranslator session to active
   * @returns {void}
   */
  setPythonTranslatorSessionActive() {
    this.send_REST("set-python-translator-session-active");
  }

  /**
   * Ends PythonTranslator session
   * @returns {void}
   */
  endPythonTranslatorSession() {
    this.send_REST("end-python-translator-session");
  }

  /**
   * Start Machine Learning session
   * @returns {void}
   */
  startMLSession() {
    this.send_REST("start-ml-session");
  }

  /**
   * Sets ML session to active
   * @returns {void}
   */
  setMLSessionActive() {
    this.send_REST("set-ml-session-active");
  }

  /**
   * Starts and sets ML session to active in one go
   * @returns {void}
   */
  startAndSetActiveAndEndMLSession() {
    this.send_REST("start-and-set-active-and-end-ml-session");
  }

  /**
   * Starts code asses session
   * @returns {void}
   */
  startCodeAssesSession() {
    this.send_REST("start-code-asses-session");
  }

  /**
   * Ends code asses session
   * @returns {void}
   */
  endCodeAssesSession() {
    this.send_REST("end-code-asses-session");
  }

  /**
   * Sets code asses session to active
   * @returns {void}
   */
  setCodeAssesSessionActive() {
    this.send_REST("set-code-asses-session-active");
  }

  /**
   * Ends ML session
   * @returns {void}
   */
  endMLSession() {
    this.send_REST("end-ml-session");
  }

  set_demo_sensor(sensorval) {
    sensorval = parseFloat(sensorval);
    this.demo_sensor = sensorval;
  }

  set_ip(ip) {
    this.ip = ip;
  }

}

module.exports = Mv2Interface;
