import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import { connect } from 'react-redux';
import MartyMachineModelEditorComponent from '../components/marty-machine-model-editor/marty-machine-model-editor.jsx';
import { modelNameCheckExists } from './marty-machine-tab.jsx';
import CameraFeed from '../components/marty-camera-feed/marty-camera-feed.jsx';

class MartyMachineModelEditor extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleChangeName',
            'handleContainerClick',
            'setRef',
            'setDeviceStreamRef',
            'setAudioCanvasRef',
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
            modelName: "model 1"// vm.editingTarget.sprite.models[this.props.modelIndex < vm.editingTarget.sprite.models.length ? this.props.modelIndex : vm.editingTarget.sprite.models.length - 1]?.name || 'Model 1'
        };

        this.ref = null;
        this.deviceStreamRef = null;
        this.audioCanvasRef = null;
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
        const timerElement = document.getElementById("timer");
        let timer = 8;
        const timerInterval = setInterval(() => {
            if (timer > 0) {
                timerElement.innerText = "기다리세요... " + timer;
                timer--;
            } else {
                clearInterval(timerInterval);
                timerElement.innerText = "이제 페이지를 나갈 수 있습니다"
            }
        }, 1000);

        setInterval(() => mv2Interface.captureScreen(), 3000);
        const asyncFunc = async () => {
            if (this.props.modelType === 'image-device') {
                const constraints = {
                    video: {
                        width: 160,
                        height: 120,
                    },
                    audio: false
                };
                console.log("before get user media")
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                console.log('Got stream', {id: stream.id, active: stream.active, tracks: stream.getTracks().map(t => ({id: t.id, kind: t.kind, label: t.label}))});
                this.setState({ deviceStream: stream });
                this.deviceStreamRef.srcObject = stream;
                this.deviceStreamRef.play();
                console.log("this.deviceStreamRef.srcObject", {id: this.deviceStreamRef.srcObject.id, active: this.deviceStreamRef.srcObject.active, tracks: this.deviceStreamRef.srcObject.getTracks().map(t => ({id: t.id, kind: t.kind, label: t.label}))});
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
            }
        }
        asyncFunc();
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
            alert("Oops! Class name already exists, please choose a different name.");
            return;
        }
        this.trainingDataReducer.reduce({ type: martyMachine.trainingDataActionTypes.TD_ADD_CLASS, payload: { name: className } });
        this.setState({});
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
            drawData(this.canvasRef, this.audioExtractor.timeDataQueue);
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
                alert("Oops! The background noise class needs at least 10 samples to be trained. Please add more samples to the background noise class.");
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
            martyMachine.trainModel(this.props.model, this.trainingDataReducer.state, this.props.modelType).then((isTrained) => {
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
            const INTERVAL_TIME = 30;
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
            this.setState({});
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
                alert('Oops! Model name already exists, please choose a different name.');
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
                <div id="timer" style={{
                    zIndex: 1000,
                    position: "absolute",
                    top: "40px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "40px",
                    textAlign: "center"
                }}></div>
                <CameraFeed setRef={this.setDeviceStreamRef} isRecording={false} />
                {/* <canvas ref={this.setCanvasRef} width={martyMachine.image_size} height={martyMachine.image_size} style={{ display: 'none' }} /> */}
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

export default connect(
    mapStateToProps
)(MartyMachineModelEditor);



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



function drawData(canvas, dataQueue) {
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


  