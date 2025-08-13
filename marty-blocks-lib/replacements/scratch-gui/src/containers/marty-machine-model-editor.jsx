import bindAll from 'lodash.bindall';
import PropTypes, { func } from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

import { connect } from 'react-redux';
import MartyMachineModelEditorComponent from '../components/marty-machine-model-editor/marty-machine-model-editor.jsx';
import { modelNameCheckExists } from './marty-machine-tab.jsx';

import { defineMessages, injectIntl } from "react-intl";

const messages = defineMessages({
    modelNameExists: {
        id: "martyMachine.modelNameExists",
        defaultMessage: "Oops! Model name already exists, please choose a different name.",
        description: "Message shown when a model name already exists",
    },
    backgroundNoiseClassNeedsSamples: {
        id: "martyMachine.backgroundNoiseClassNeedsSamples",
        defaultMessage: "Oops! The background noise class needs at least 10 samples to be trained. Please add more samples to the background noise class.",
        description: "Message shown when the background noise class does not have enough samples to be trained",
    },
    classNameExists: {
        id: "martyMachine.classNameExists",
        defaultMessage: "Oops! Class name already exists, please choose a different name.",
        description: "Message shown when a class name already exists",
    },
    selectClassAlert: {
        id: "martyMachine.selectClassAlert",
        defaultMessage: "Please add or select an existing class before recording samples.",
        description: "Alert message shown when trying to record samples without selecting a class",
    }
});
class MartyMachineModelEditor extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleChangeName',
            'handleContainerClick',
            'setRef',
            'setDeviceStreamRef',
            'setAudioCanvasRef',
            'setAccelerometerCanvasRef',
            'onClassNameChange',
            'onCreateNewClass',
            'setCanvasRef',
            'onStartRecordingSamples',
            'onRemoveClass',
            'onRemoveSample',
            'onStopRecordingSamples',
            'onTrainModel',
            'onStopTraining',
            'onRunModel',
            'onStopRunningModel',
            'onSaveModel',
            "onClassNameSelected",
            'addBackgroundNoiseClassIF',
            'checkIfBackgroundNoiseClassHasSamplesIF'
        ]);
        this.state = {
            deviceStream: null,
            className: 'Class 1',
            modelName: vm.editingTarget.sprite.models[this.props.modelIndex < vm.editingTarget.sprite.models.length ? this.props.modelIndex : vm.editingTarget.sprite.models.length - 1]?.name || 'Model 1'
        };

        this.ref = null;
        this.deviceStreamRef = null;
        this.audioCanvasRef = null;
        this.accelerometerCanvasRef = null;
        this.canvasRef = null;
        this.isRecording = false;
        this.isTraining = false;
        this.isRunning = false;
        this.hasRun = false;
        this.isTrained = false;
        this.isSaving = false;
        this.audioExtractor = null;
        this.trainingDataReducer = martyMachine.currentTrainingReducer || martyMachine.getNewTrainingDataReducer();
        this.addBackgroundNoiseClassIF();
    }
    componentDidMount() {
        const asyncFunc = async () => {
            if (this.props.modelType === 'image-device') {
                const constraints = {
                    video: {
                        width: 160,
                        height: 120,
                    }
                };
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                this.setState({ deviceStream: stream });
                if (this.deviceStreamRef) {
                    this.deviceStreamRef.srcObject = stream;
                }
            } else if (this.props.modelType === 'audio') {
                const constraints = {
                    audio: true
                };
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                const source = audioCtx.createMediaStreamSource(stream);
                const analyser = audioCtx.createAnalyser();
                analyser.fftSize = 32768;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                source.connect(analyser);

                const canvas = this.audioCanvasRef;
                const canvasCtx = canvas.getContext('2d');
                canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

                let lastDrawTime = 0;
                const drawInterval = 30;

                const drawAudioWaves = () => {
                    const currentTime = Date.now();

                    if (currentTime - lastDrawTime >= drawInterval) {

                        requestAnimationFrame(drawAudioWaves);

                        analyser.getByteTimeDomainData(dataArray);

                        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
                        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
                        canvasCtx.lineWidth = 2;
                        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

                        canvasCtx.beginPath();

                        let sliceWidth = (canvas.width * 1.0) / bufferLength;
                        let x = 0;

                        for (let i = 0; i < bufferLength; i++) {
                            const v = dataArray[i] / 128.0;
                            const y = (v * canvas.height) / 2;

                            if (i === 0) {
                                canvasCtx.moveTo(x, y);
                            } else {
                                canvasCtx.lineTo(x, y);
                            }

                            x += sliceWidth;
                        }

                        canvasCtx.lineTo(canvas.width, canvas.height / 2);
                        canvasCtx.stroke();
                        lastDrawTime = currentTime;
                    } else {
                        requestAnimationFrame(drawAudioWaves);
                    }
                };
                drawAudioWaves();
                this.setState({ deviceStream: stream });
            } else if (this.props.modelType === 'accelerometer') {
                // get the accelerometer data from the connected device
                const connectedRaft = getRaftUsingTargetId(window.vm.editingTarget.id);
                if (!connectedRaft) {
                    return;
                }
                const canvas = this.accelerometerCanvasRef;
                const canvasCtx = canvas.getContext('2d');
                canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

                // Set up a buffer to store the last N data points
                const maxPoints = 100;
                const dataBuffer = {
                    x: [],
                    y: [],
                    z: []
                };


                let lastDrawTime = 0;
                const drawInterval = 50;
                const drawAccelerometerData = () => {
                    const currentTime = Date.now();
                    if (currentTime - lastDrawTime >= drawInterval) {
                        requestAnimationFrame(drawAccelerometerData);
                        const data = connectedRaft.raftStateInfo.accelerometer;
                        const x = data.ax;
                        const y = data.ay;
                        const z = data.az;

                        // Add new data to our buffers
                        dataBuffer.x.push(x);
                        dataBuffer.y.push(y);
                        dataBuffer.z.push(z);

                        // If we exceed maxPoints, remove the oldest point
                        if (dataBuffer.x.length > maxPoints) {
                            dataBuffer.x.shift();
                            dataBuffer.y.shift();
                            dataBuffer.z.shift();
                        }

                        // Clear the canvas for the new frame
                        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

                        // Draw x, y, and z data in different colors
                        drawAccelerometerLine(dataBuffer.x, 'rgb(91, 20, 19)', canvasCtx, canvas, maxPoints);
                        drawAccelerometerLine(dataBuffer.y, 'rgb(3, 125, 60)', canvasCtx, canvas, maxPoints);
                        drawAccelerometerLine(dataBuffer.z, 'rgb(0, 170, 255)', canvasCtx, canvas, maxPoints);

                        lastDrawTime = currentTime;
                    } else {
                        requestAnimationFrame(drawAccelerometerData);
                    }
                };
                drawAccelerometerData();
                this.setState({ deviceStream: null });
            }
        }
        asyncFunc();


        // if this is an accelerometer model
        // get the connected raft
        // set an event listener that listens for button clicks and starts recording accelerometer samples
        // set it in such a way that if the model changes, or the component unmounts, the event listener is removed
        if (this.props.modelType === 'accelerometer') {
            this.connectedRaft = getRaftUsingTargetId(window.vm.editingTarget.id);
            if (!this.connectedRaft) {
                setTimeout(() => {
                    alert("Oops! Please connect the device to use the accelerometer model.");
                }, 1000);
                return;
            }
            const cogButtonClickHandler = () => {
                this.startRecordingAccelerometerSamples('continuous');
            };
            this.cogButtonClickHandler = cogButtonClickHandler;

            const pda = this.connectedRaft.publishedDataAnalyser;
            pda.on(pda.eventsMap.buttonClick.click, cogButtonClickHandler);
            pda.on(pda.eventsMap.buttonClick.release, this.onStopRecordingSamples.bind(this));

            this.cleanupPdaListeners = () => {
                pda.removeListener(pda.eventsMap.buttonClick.click, cogButtonClickHandler);
                pda.removeListener(pda.eventsMap.buttonClick.release, this.onStopRecordingSamples.bind(this));
            };
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.model !== this.props.model) { // A different model was selected
            // restore state
            this.setState({
                modelType: newProps.modelType,
                className: 'Class 1',
                modelName: newProps.modelName
            });
            this.isRecording = false;
            this.isTraining = false;
            this.isRunning = false;
            this.hasRun = false;
            this.isTrained = false;
            this.isSaving = false;
            this.audioExtractor = null;
            this.trainingDataReducer = martyMachine.getNewTrainingDataReducer();
            console.log('New model selected');
            this.addBackgroundNoiseClassIF(newProps);

            if (this.cleanupPdaListeners && this.props.modelType !== 'accelerometer') {
                this.cleanupPdaListeners();
            }
        }
    }

    addBackgroundNoiseClassIF(newProps) {
        const props = newProps || this.props;
        if (props.modelType === "audio" && !props.isModelLoaded && !this.trainingDataReducer.state.classes.find(c => c.name === martyMachine.BACKGROUND_NOISE_TAG)) {
            this.trainingDataReducer.reduce({ type: martyMachine.trainingDataActionTypes.TD_ADD_CLASS, payload: { name: martyMachine.BACKGROUND_NOISE_TAG } });
            setTimeout(() => {
                this.onClassNameSelected(martyMachine.BACKGROUND_NOISE_TAG);
            }, 200);
        }
    }

    componentWillUnmount() {
        if (this.state.deviceStream) {
            this.state.deviceStream.getTracks().forEach(track => track.stop());
        }
        this.onStopRunningModel();

        if (this.cleanupPdaListeners) {
            this.cleanupPdaListeners();
        }
    }

    handleChangeName(name) {
        const sprite = this.props.vm.editingTarget.sprite;
        const models = sprite.models ? sprite.models : [];
        const storedModel = models[this.props.modelIndex];
        const isTheSameModel = this.props.modelName === storedModel?.name && this.props.isModelLoaded;
        if (isTheSameModel) {
            this.props.setModelName(name);
        }
        this.setState({ modelName: name });
    }
    setRef(element) {
        this.ref = element;
    }
    setDeviceStreamRef(element) {
        this.deviceStreamRef = element;
    }
    setCanvasRef(element) {
        this.canvasRef = element;
    }
    setAudioCanvasRef(element) {
        this.audioCanvasRef = element;
    }
    setAccelerometerCanvasRef(element) {
        this.accelerometerCanvasRef = element;
    }
    handleContainerClick(e) {
        // If the click is on the sound editor's div (and not any other element), delesect
        if (e.target === this.ref && this.state.trimStart !== null) {

        }
    }
    onClassNameSelected = (className) => {
        this.setState({ className });
    }

    onClassNameChange = (className) => {
        this.setState({ className });
    }

    onCreateNewClass = () => {
        const className = this.state.className;
        // check if class name already exists
        if (this.trainingDataReducer.state.classes.find(c => c.name === className)) {
            alert(this.props.intl.formatMessage(messages.classNameExists));
            return;
        }
        this.trainingDataReducer.reduce({ type: martyMachine.trainingDataActionTypes.TD_ADD_CLASS, payload: { name: className } });
        this.setState({});
    }

    // A unified function to start recording accelerometer samples.
    // It accepts a 'mode' parameter: 
    // - mode === 'batch' will record batches over a fixed RECORD_TIME.
    // - mode === 'continuous' will record one long sample (until stopped by the user).
    async startRecordingAccelerometerSamples(mode, classTitle) {
        classTitle = classTitle || this.state.className;
        if (!classTitle) {
            alert(this.props.intl.formatMessage(messages.selectClassAlert));
            return;
        }
        // Find or add the class for this sample.
        let selectedClassIdx = this.trainingDataReducer.state.classes.findIndex(c => c.name === classTitle);
        if (selectedClassIdx === -1) {
            this.trainingDataReducer.reduce({
                type: martyMachine.trainingDataActionTypes.TD_ADD_CLASS,
                payload: { name: classTitle }
            });
            selectedClassIdx = this.trainingDataReducer.state.classes.length - 1;
        }
        this.isRecording = true;
        this.setState({});

        if (mode === 'batch') {
            // Batch recording configuration.
            const RECORD_TIME = 3000;        // Total recording time (ms)
            const INTERVAL_TIME = 110;         // Interval between batch samples (ms) (this is on top of the time it takes to record a sample, so 100 + 10, just to make sure we have fresh data from raft since it publishes data every 100ms)
            const BATCH_SAMPLE_SIZE = 10;      // Number of data points per sample. so we have 10 samples, each waiting for 100ms, so we have 1 second of data. if recording for 3 seconds, we have 3 samples
            let lastCaptureTime = 0;

            // This inner function records one batch sample repeatedly.
            const recordBatch = async (timestamp) => {
                if (!this.isRecording) return;

                if (!lastCaptureTime || timestamp - lastCaptureTime >= INTERVAL_TIME) {
                    await recordAccelerometerSample({
                        trainingDataReducer: this.trainingDataReducer,
                        accelerometerCanvasRef: this.accelerometerCanvasRef,
                        selectedClassIdx,
                        collectOptions: {
                            collectionMode: 'samples',
                            sampleTime: null,
                            sampleSize: BATCH_SAMPLE_SIZE,
                            getIsUserRecording: null
                        }
                    });
                    // Optionally update UI.
                    this.setState({});
                    lastCaptureTime = timestamp;
                }

                // Continue the recording loop.
                requestAnimationFrame(recordBatch);
            };

            // Start the recording loop.
            requestAnimationFrame(recordBatch);

            // Stop the recording after RECORD_TIME milliseconds.
            const stopLoopTimeout = setTimeout(() => {
                this.isRecording = false;
                this.setState({});
                clearTimeout(stopLoopTimeout);
            }, RECORD_TIME);

        } else if (mode === 'continuous') {
            // Continuous recording: record one sample that lasts until the user stops.
            await recordAccelerometerSample({
                trainingDataReducer: this.trainingDataReducer,
                accelerometerCanvasRef: this.accelerometerCanvasRef,
                selectedClassIdx,
                collectOptions: {
                    collectionMode: 'user',
                    sampleTime: null,
                    sampleSize: null,
                    getIsUserRecording: () => this.isRecording
                }
            });
            this.setState({});
        }
    }

    onStartRecordingSamples = async (classTitle) => {
        // select class 
        let selectedClassIdx = this.trainingDataReducer.state.classes.findIndex(c => c.name === classTitle);
        if (selectedClassIdx === -1) {
            this.trainingDataReducer.reduce({ type: martyMachine.trainingDataActionTypes.TD_ADD_CLASS, payload: { name: classTitle } });
            selectedClassIdx = this.trainingDataReducer.state.classes.length - 1;
            // MODEL_CLASSES.push({ name: classTitle, samples: [] });
        }
        // selectedClass = MODEL_CLASSES.find(c => c.name === classTitle);
        this.isRecording = true;
        this.setState({});

        if (this.props.modelType === 'image-device') {
            const RECORD_TIME = 2000;
            const INTERVAL_TIME = 60;
            const videoElement = this.deviceStreamRef;
            const canvas = this.canvasRef;
            const ctx = canvas.getContext('2d');

            let lastCaptureTime = 0;

            const recordFrame = (timestamp) => {
                if (!this.isRecording) return;

                if (!lastCaptureTime || timestamp - lastCaptureTime >= INTERVAL_TIME) {
                    if (!this.isRecording) return;
                    ctx.drawImage(videoElement, 0, 0, martyMachine.image_size, martyMachine.image_size);
                    let imageSrc = canvas.toDataURL('image/png');
                    imageSrc = imageSrc.replace(/^data:image\/(png|jpg);base64,/, "");
                    this.trainingDataReducer.reduce({
                        type: martyMachine.trainingDataActionTypes.TD_ADD_SAMPLE,
                        payload: {
                            id: selectedClassIdx,
                            image: martyMachine.newImage(imageSrc),
                            canvas,
                            sampleType: 'image'
                        }
                    });
                    this.setState({});

                    // Update the last capture time
                    lastCaptureTime = timestamp;
                }

                // Continue the loop
                requestAnimationFrame(recordFrame);
            };

            // Start the loop
            requestAnimationFrame(recordFrame);

            // Set a timeout to stop the loop after RECORD_TIME has passed
            const stopLoopTimeout = setTimeout(() => {
                this.isRecording = false;
                this.setState({});
                clearTimeout(stopLoopTimeout);
            }, RECORD_TIME);
        } else if (this.props.modelType === 'audio') {
            const SAMPLE_TIME = 1500;
            this.audioExtractor = new AudioExtractor();
            await this.audioExtractor.start();
            await new Promise(resolve => setTimeout(resolve, SAMPLE_TIME));
            drawAudioData(this.canvasRef, this.audioExtractor.timeDataQueue);
            let imageSrc = this.canvasRef.toDataURL('image/png');
            imageSrc = imageSrc.replace(/^data:image\/(png|jpg);base64,/, "");
            this.trainingDataReducer.reduce({
                type: martyMachine.trainingDataActionTypes.TD_ADD_SAMPLE,
                payload: {
                    id: selectedClassIdx,
                    timeDataQueue: this.audioExtractor.timeDataQueue,
                    freqDataQueue: this.audioExtractor.freqDataQueue,
                    image: martyMachine.newImage(imageSrc), // we need the image so we can print it as a sample in the UI
                    sampleType: 'audio'
                }
            });
            this.isRecording = false;
            this.setState({});
            await this.audioExtractor.stop();
        } else if (this.props.modelType === 'accelerometer') {
            await this.startRecordingAccelerometerSamples('batch', classTitle);
        }
    }

    onStopRecordingSamples = () => {
        this.isRecording = false;
        this.setState({});
        if (this.props.modelType === 'audio' && this.audioExtractor) {
            this.audioExtractor.stop();
        }
    }
    onRemoveClass = (classIndex) => {
        this.trainingDataReducer.reduce({ type: martyMachine.trainingDataActionTypes.TD_REMOVE_CLASS, payload: { id: classIndex } });
        this.setState({});
    }
    onRemoveSample = (classIndex, sampleIdx) => {
        this.trainingDataReducer.reduce({ type: martyMachine.trainingDataActionTypes.TD_REMOVE_SAMPLE, payload: { id: classIndex, sampleIdx } });
        this.setState({});
    }

    checkIfBackgroundNoiseClassHasSamplesIF() {
        // the background noise class needs at least 10 samples to be trained
        if (this.props.modelType === "audio" && !this.props.isModelLoaded) {
            const backgroundNoiseClass = this.trainingDataReducer.state.classes.find(c => c.name === martyMachine.BACKGROUND_NOISE_TAG);
            if (backgroundNoiseClass && backgroundNoiseClass.samples.length < 10) {
                alert(this.props.intl.formatMessage(messages.backgroundNoiseClassNeedsSamples));
                return false;
            }
        }
        return true;
    }

    onTrainModel = () => {
        if (!this.checkIfBackgroundNoiseClassHasSamplesIF()) return;
        this.isTraining = true;
        this.setState({});
        setTimeout(() => {
            // setTimeout because it allows the UI to update before starting training
            martyMachine.trainModel(this.props.model, this.trainingDataReducer.state, this.props.modelType)
                .then((isTrained) => {
                    this.isTrained = isTrained;
                    this.hasRun = false;
                    this.isTraining = false;
                    this.setState({});
                });
        }, 200);
    }

    onStopTraining = () => {
        this.isTraining = false;
        this.props.model.stopTraining();
        this.setState({});
    }

    onRunModel = async () => {
        this.isRunning = true;
        if (this.props.modelType === 'image-device') {
            const INTERVAL_TIME = 100;
            const videoElement = this.deviceStreamRef;
            const canvas = this.canvasRef;
            const ctx = canvas.getContext('2d');
            let lastCaptureTime = 0;

            const recordFrame = (timestamp) => {

                if (!lastCaptureTime || timestamp - lastCaptureTime >= INTERVAL_TIME) {
                    if (!this.isRunning) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        return;
                    }
                    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                    // let imageSrc = canvas.toDataURL('image/png');
                    // imageSrc = imageSrc.replace(/^data:image\/(png|jpg);base64,/, "");
                    this.props.model.runModel(canvas);
                    this.setState({});

                    // Update the last capture time
                    lastCaptureTime = timestamp;
                }

                // Continue the loop
                requestAnimationFrame(recordFrame);
            };

            // Start the loop
            requestAnimationFrame(recordFrame);
        } else if (this.props.modelType === 'audio') {
            const audioExtractor = new AudioExtractor(true, this.props.model);
            await audioExtractor.start();
            this.props.model.runAudioModel();
            this.audioExtractor = audioExtractor;
        } else if (this.props.modelType === 'accelerometer') {
            const INTERVAL_TIME = 110; // Time between samples (in milliseconds)
            const BATCH_SAMPLE_SIZE = 10;   // Number of samples in the sliding window
            let lastCaptureTime = 0;

            // Pre-fill sliding windows (you could pre-fill with zeros or the first reading)
            const slidingWindowX = new Array(BATCH_SAMPLE_SIZE).fill(-1000);
            const slidingWindowY = new Array(BATCH_SAMPLE_SIZE).fill(-1000);
            const slidingWindowZ = new Array(BATCH_SAMPLE_SIZE).fill(-1000);

            // recordFrame will be called repeatedly using requestAnimationFrame
            const recordFrame = (timestamp) => {
                // Only capture if enough time has passed
                if (!lastCaptureTime || timestamp - lastCaptureTime >= INTERVAL_TIME) {
                    if (!this.isRunning) {
                        return;
                    }

                    // Capture current accelerometer data from your connected raft
                    const connectedRaft = getRaftUsingTargetId(window.vm.editingTarget.id);
                    if (!connectedRaft) return;
                    const data = connectedRaft.raftStateInfo.accelerometer;

                    // Update the sliding window by shifting out the oldest sample and pushing the new one
                    slidingWindowX.push(data.ax);
                    slidingWindowX.shift();

                    slidingWindowY.push(data.ay);
                    slidingWindowY.shift();

                    slidingWindowZ.push(data.az);
                    slidingWindowZ.shift();

                    // Immediately request a prediction with the current window (no waiting loop)
                    this.props.model.runAccelerometerModel({ x: slidingWindowX, y: slidingWindowY, z: slidingWindowZ });

                    // Optionally update the UI or component state
                    this.setState({});

                    // Update last capture time
                    lastCaptureTime = timestamp;
                }

                // Continue the loop
                requestAnimationFrame(recordFrame);
            };

            // Start the loop
            requestAnimationFrame(recordFrame);
        }
        this.setState({});
    }

    onStopRunningModel = () => {
        this.isRunning = false;
        this.hasRun = true;
        this.setState({});
        if (this.props.modelType === 'audio' && this.audioExtractor) {
            this.audioExtractor.stop();
            this.props.model.stopAudioModel();
        }
    }
    onSaveModel = () => {
        mv2Interface.setMLSessionActive();
        this.isSaving = true;
        this.props.model.setSaveModelCallback = (model) => {
            const storage = vm.runtime.storage;
            const modelJSON = model.modelJSON;
            // first we need to flatten the weights

            const weightBuffers = model.weights.weightBuffers;
            const weightInfo = model.weights.weightInfo;

            const vmModel = {
                format: '',
                dataFormat: storage.DataFormat.BIN,
                modelType: this.props.modelType,
            };

            if (modelNameCheckExists(this.state.modelName)) {
                this.isSaving = false;
                this.setState({});
                alert(this.props.intl.formatMessage(messages.modelNameExists));
                return;
            }

            // Create an asset from the model JSON
            vmModel.asset = storage.createAsset(
                storage.AssetType.MLModelWeights,
                storage.DataFormat.BIN,
                weightBuffers,
                null,
                true // generate md5
            );
            // removing samples from training data before saving
            const trainingData = this.props.model.trainingData;
            trainingData.classes.forEach(cls => {
                cls.samples = cls.samples.map(_ => undefined);
            });
            vmModel.dependencies = [modelJSON, weightInfo, this.props.model.trainingData];
            vmModel.assetId = vmModel.asset.assetId;

            // update vmModel object with md5 property
            vmModel.md5 = `${vmModel.assetId}.${vmModel.dataFormat}`;
            // The VM will update the Model name to a fresh name
            vmModel.name = this.state.modelName;
            this.isSaving = false;
            console.log("saving:", vmModel)
            this.setState({});
            this.onStopRunningModel();
            vm.addModel(vmModel).then(() => {
                // if (callback) callback();
                console.log('Model saved', vmModel);
                this.props.onNewModel();
            });
        }
        this.props.model.saveModel(this.props.modelType);
        martyMachine.cleanupAfterSave();
        this.setState({});
    }

    render() {
        return (
            <>
                <MartyMachineModelEditorComponent
                    className={this.state.className}
                    modelClasses={this.trainingDataReducer.state.classes}
                    modelType={this.props.modelType}
                    model={this.props.model}
                    name={this.state.modelName}
                    onChangeName={this.handleChangeName}
                    onClassNameChange={this.onClassNameChange}
                    onClassNameSelected={this.onClassNameSelected}
                    onContainerClick={this.handleContainerClick}
                    onCreateNewClass={this.onCreateNewClass}
                    onStartRecordingSamples={this.onStartRecordingSamples}
                    onRemoveClass={this.onRemoveClass}
                    onRemoveSample={this.onRemoveSample}
                    onStopRecording={this.onStopRecordingSamples}
                    onStopTraining={this.onStopTraining}
                    onRun={this.onRunModel}
                    onSaveModel={this.onSaveModel}
                    onTrain={this.onTrainModel}
                    onStopRunning={this.onStopRunningModel}
                    isRecording={this.isRecording}
                    isTraining={this.isTraining}
                    isRunning={this.isRunning}
                    hasRun={this.hasRun}
                    isTrained={this.isTrained || this.props.isModelLoaded}
                    isSaving={this.isSaving}
                    isModelLoaded={this.props.isModelLoaded}
                    setRef={this.setRef}
                    setAudioCanvasRef={this.setAudioCanvasRef}
                    setAccelerometerCanvasRef={this.setAccelerometerCanvasRef}
                    setDeviceStreamRef={this.setDeviceStreamRef}
                />
                <canvas ref={this.setCanvasRef} width={martyMachine.image_size} height={martyMachine.image_size} style={{ display: 'none' }} />
            </>
        );
    }
}

MartyMachineModelEditor.propTypes = {
    sampleRate: PropTypes.number,
    samples: PropTypes.instanceOf(Float32Array),
    modelIndex: PropTypes.number,
    vm: PropTypes.instanceOf(VM).isRequired,
    model: PropTypes.object.isRequired,
    onNewModel: PropTypes.func.isRequired,
    isModelLoaded: PropTypes.bool.isRequired,
    modelType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    return {
        vm: state.scratchGui.vm
    };
};

export default injectIntl(connect(
    mapStateToProps
)(MartyMachineModelEditor));



class AudioExtractor {
    constructor(shouldStreamToWebWorker = false, model = null) {
        const trainingOptions = new martyMachine.AudioTrainingOptions();
        this.sampleRateHz = trainingOptions.sampleRateHz;
        this.fftSize = trainingOptions.fftSize;
        this.columnTruncateLength = trainingOptions.columnTruncateLength;
        this.includeRawAudio = true;
        console.log(`sampleRateHz=${this.sampleRateHz}, fftSize=${this.fftSize}, frameDurationMillis=${this.frameDurationMillis}, columnTruncateLength=${this.columnTruncateLength}, includeRawAudio=${this.includeRawAudio}`)
        this.shouldStreamToWebWorker = shouldStreamToWebWorker;
        this.mlmodel = model;
    }

    async start() {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        this.audioContext = (window.AudioContext || window.webkitAudioContext) ? new (window.AudioContext || window.webkitAudioContext)() : null;
        const streamSource = this.audioContext.createMediaStreamSource(this.stream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = this.fftSize * 2;
        this.analyser.smoothingTimeConstant = 0.0;
        streamSource.connect(this.analyser);

        // Reset the queue.
        this.freqDataQueue = [];
        this.freqData = new Float32Array(this.fftSize);
        if (this.includeRawAudio) {
            this.timeDataQueue = [];
            this.timeData = new Float32Array(this.fftSize);
        }

        this.frameIntervalTask = setInterval(
            this.onAudioFrame.bind(this), this.fftSize / this.sampleRateHz * 1e3);
    }

    async onAudioFrame() {
        this.analyser.getFloatFrequencyData(this.freqData);
        if (this.freqData[0] === -Infinity) {
            return;
        }

        const freqDataSliced = this.freqData.slice(0, this.columnTruncateLength);
        this.freqDataQueue.push([...freqDataSliced]);
        // if (this.shouldStreamToWebWorker) {
        //     martyMachine.streamAudioToWebWorker(this.mlmodel, {freqData: [...freqDataSliced]});
        // }
        if (this.includeRawAudio) {
            this.analyser.getFloatTimeDomainData(this.timeData);
            this.timeDataQueue.push(this.timeData.slice());
            // if (this.shouldStreamToWebWorker) {
            //     martyMachine.streamAudioToWebWorker(this.mlmodel, {timeData: [...this.timeData]});
            // }
        }
        if (this.shouldStreamToWebWorker) {
            martyMachine.streamAudioToWebWorker(this.mlmodel, { freqData: [...freqDataSliced], timeData: [...this.timeData] });
        }
    }

    async stop() {
        clearInterval(this.frameIntervalTask);
        this.frameIntervalTask = null;
        this.analyser.disconnect();
        if (this.stream != null && this.stream.getTracks().length > 0) {
            this.stream.getTracks()[0].stop();
        }
        console.log("this.audioContext.state", this.audioContext.state)
        if (this.audioContext.state !== 'closed') {
            this.audioContext.close();

        }
    }

}

function drawAudioData(canvas, dataQueue) {
    const flattenedData = dataQueue.reduce((acc, arr) => acc.concat(Array.from(arr)), []);
    const ctx = canvas.getContext('2d');
    const bufferLength = flattenedData.length;

    // Clear the canvas
    ctx.fillStyle = 'rgb(200, 200, 200)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Set the line properties
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(0, 0, 0)';

    // Begin a new path
    ctx.beginPath();

    const sliceWidth = ctx.canvas.width / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
        const v = (flattenedData[i] + 1) / 2;
        const y = (1 - v) * ctx.canvas.height;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

        x += sliceWidth;
    }
    // Draw the path to the canvas
    ctx.stroke();
}

// A helper function to process a single accelerometer sample.
async function recordAccelerometerSample({
    trainingDataReducer,
    accelerometerCanvasRef,
    selectedClassIdx,
    collectOptions
}) {
    // Collect the accelerometer sample.
    const { x, y, z } = await collectAccelerometerDataSample(collectOptions);
    // Draw the sample for UI feedback.
    drawAccelerometerDataSample(accelerometerCanvasRef, { x, y, z });
    // Convert the canvas to an image.
    let imageSrc = accelerometerCanvasRef.toDataURL('image/png');
    imageSrc = imageSrc.replace(/^data:image\/(png|jpg);base64,/, "");

    // Add the sample to your training data.
    trainingDataReducer.reduce({
        type: martyMachine.trainingDataActionTypes.TD_ADD_SAMPLE,
        payload: {
            id: selectedClassIdx,
            xDataQueue: x,
            yDataQueue: y,
            zDataQueue: z,
            image: martyMachine.newImage(imageSrc),
            sampleType: 'accelerometer'
        }
    });
}

async function collectAccelerometerDataSample(options) {
    const {
        collectionMode, // 'time' or 'samples' or 'user'
        sampleSize,
        sampleTime,
        getIsUserRecording
    } = options;
    const dataBuffer = {
        x: [],
        y: [],
        z: []
    };

    let lastDrawTime = 0;
    const collectDataInterval = 100;

    // decide stop condition
    let stopCondition = () => false;
    if (collectionMode === 'time') {
        stopCondition = () => Date.now() - lastDrawTime >= sampleTime;
    } else if (collectionMode === 'samples') {
        stopCondition = () => dataBuffer.x.length >= sampleSize;
    } else if (collectionMode === 'user') {
        stopCondition = () => !getIsUserRecording();
    }

    return new Promise((resolve) => {
        const _collectData = () => {
            const currentTime = Date.now();
            if (stopCondition()) {
                resolve(dataBuffer);
                return;
            }
            if (currentTime - lastDrawTime >= collectDataInterval) {
                requestAnimationFrame(_collectData);
                const connectedRaft = getRaftUsingTargetId(window.vm.editingTarget.id);
                if (!connectedRaft) return;
                const data = connectedRaft.raftStateInfo.accelerometer;
                const x = data.ax;
                const y = data.ay;
                const z = data.az;
                dataBuffer.x.push(x);
                dataBuffer.y.push(y);
                dataBuffer.z.push(z);
                lastDrawTime = currentTime;
            } else {
                requestAnimationFrame(_collectData);
            }
        };
        _collectData();
    });
}

function drawAccelerometerDataSample(canvas, accelData) {
    const canvasCtx = canvas.getContext('2d');
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    drawAccelerometerLine(accelData.x, 'rgb(91, 20, 19)', canvasCtx, canvas, accelData.x.length);
    drawAccelerometerLine(accelData.y, 'rgb(3, 125, 60)', canvasCtx, canvas, accelData.x.length);
    drawAccelerometerLine(accelData.z, 'rgb(0, 170, 255)', canvasCtx, canvas, accelData.x.length);
}

function getRaftUsingTargetId(targetId) {
    const raftId = window.raftManager.raftIdAndDeviceIdMap[targetId];
    const raft = window.applicationManager.connectedRafts[raftId];
    return raft;
}


// Function to draw a single line for a given axis
function drawAccelerometerLine(dataArray, color, canvasCtx, canvas, maxPoints = 100) {


    const centerY = canvas.height / 2; // Middle of the canvas (y-axis)
    const scale = 30; // Scale factor to magnify the acceleration values (adjust as needed)
    const xStep = canvas.width / (maxPoints - 1);


    canvasCtx.beginPath();
    canvasCtx.strokeStyle = color;
    dataArray.forEach((val, index) => {
        // Map the data point to canvas coordinates:
        // x position is based on the index and y position is centered and scaled.
        const xCoord = canvas.width - ((dataArray.length - 1 - index) * xStep);
        const yCoord = centerY - (val * scale);
        if (index === 0) {
            canvasCtx.moveTo(xCoord, yCoord);
        } else {
            canvasCtx.lineTo(xCoord, yCoord);
        }
    });
    canvasCtx.stroke();
};