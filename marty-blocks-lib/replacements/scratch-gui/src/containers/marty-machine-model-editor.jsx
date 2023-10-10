import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

import { connect } from 'react-redux';
import MartyMachineModelEditorComponent from '../components/marty-machine-model-editor/marty-machine-model-editor.jsx';
import { modelNameCheckExists } from './marty-machine-tab.jsx';

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
            'setCanvasRef',
            'onStartRecordingSamples',
            'onRemoveClass',
            'onRemoveSample',
            'onStopRecordingSamples',
            'onTrainModel',
            'onStopTraining',
            'onRunModel',
            'onStopRunningModel',
            'onSaveModel'
        ]);
        this.state = {
            deviceStream: null,
            className: 'Class 1',
            modelName: vm.editingTarget.sprite.models[this.props.modelIndex < vm.editingTarget.sprite.models.length ? this.props.modelIndex : vm.editingTarget.sprite.models.length - 1]?.name || 'Model 1'
        };

        this.ref = null;
        this.deviceStreamRef = null;
        this.audioCanvasRef = null;
        this.canvasRef = null;
        this.isRecording = false;
        this.isTraining = false;
        this.isRunning = false;
        this.isTrained = false;
        this.isSaving = false;
        this.trainingDataReducer = martyMachine.getNewTrainingDataReducer();
    }
    componentDidMount() {
        const asyncFunc = async () => {
            if (this.props.modelType === 'image-device') {
                const constraints = {
                    video: {
                        facingMode: 'user',
                        width: 160,
                        height: 120,
                    }
                };
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                this.setState({ deviceStream: stream });
                this.deviceStreamRef.srcObject = stream;
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
            this.isTrained = false;
            this.isSaving = false;
            this.trainingDataReducer = martyMachine.getNewTrainingDataReducer();
            console.log('New model selected', this);
        }
    }
    componentWillUnmount() {
        if (this.state.deviceStream) {
            this.state.deviceStream.getTracks().forEach(track => track.stop());
        }
    }
    handleChangeName(name) {
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
    onClassNameChange = (className) => {
        this.setState({ className });
    }

    onStartRecordingSamples = async () => {
        // select class 
        let selectedClassIdx = this.trainingDataReducer.state.classes.findIndex(c => c.name === this.state.className);
        if (selectedClassIdx === -1) {
            this.trainingDataReducer.reduce({ type: martyMachine.trainingDataActionTypes.TD_ADD_CLASS, payload: { name: this.state.className } });
            selectedClassIdx = this.trainingDataReducer.state.classes.length - 1;
            // MODEL_CLASSES.push({ name: this.state.className, samples: [] });
        }
        // selectedClass = MODEL_CLASSES.find(c => c.name === this.state.className);
        this.isRecording = true;
        this.setState({});
        if (this.props.modelType === 'image-device') {
            const RECORD_TIME = 2000;
            const INTERVAL_TIME = 30;
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
                    this.trainingDataReducer.reduce({ type: martyMachine.trainingDataActionTypes.TD_ADD_SAMPLE, payload: { id: selectedClassIdx, image: martyMachine.newImage(imageSrc), canvas, sampleType: 'image' } });
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
            const SAMPLE_TIME = 1000;

            const audioExtractor = new AudioExtractor();
            await audioExtractor.start();
            await new Promise(resolve => setTimeout(resolve, SAMPLE_TIME));
            drawData(this.canvasRef, audioExtractor.timeDataQueue);
            let imageSrc = this.canvasRef.toDataURL('image/png');
            imageSrc = imageSrc.replace(/^data:image\/(png|jpg);base64,/, "");
            this.trainingDataReducer.reduce({
                type: martyMachine.trainingDataActionTypes.TD_ADD_SAMPLE,
                payload: {
                    id: selectedClassIdx,
                    audioData: audioExtractor.timeDataQueue,
                    image: martyMachine.newImage(imageSrc),
                    sampleType: 'audio'
                }
            });
            this.isRecording = false;
            this.setState({});
            await audioExtractor.stop();
            // const recordFrame = (timestamp) => {
            //     if (!this.isRecording) return;

            //     if (!lastCaptureTime || timestamp - lastCaptureTime >= INTERVAL_TIME) {
            //         if (!this.isRecording) return;

            //         // Capture the current audio data
            //         analyser.getByteTimeDomainData(dataArray);
            //         console.log("dataArray", dataArray);
            //         audioData.push([...dataArray]);

            //         // Update the last capture time
            //         lastCaptureTime = timestamp;

            //         if (timestamp - lastSampleTime >= SAMPLE_TIME) {
            //             // Process the 1-second chunk of audio data
            // let imageSrc = canvas.toDataURL('image/png');
            // imageSrc = imageSrc.replace(/^data:image\/(png|jpg);base64,/, "");
            // this.trainingDataReducer.reduce({
            //     type: martyMachine.trainingDataActionTypes.TD_ADD_SAMPLE,
            //     payload: {
            //         id: selectedClassIdx,
            //         audioData: [...audioData],
            //         image: martyMachine.newImage(imageSrc),
            //         sampleType: 'audio'
            //     }
            // });
            // this.setState({});

            //             // Reset last sample time and clear audioData
            //             lastSampleTime = timestamp;
            //             audioData = [];
            //         }
            //     }

            //     // Continue the loop
            //     requestAnimationFrame(recordFrame);
            // };

            // // Start the loop
            // requestAnimationFrame(recordFrame);

            // // Set a timeout to stop the loop after RECORD_TIME has passed
            // const stopLoopTimeout = setTimeout(() => {
            //     this.isRecording = false;
            //     this.setState({});
            //     clearTimeout(stopLoopTimeout);
            // }, RECORD_TIME);
        }
    }
    onStopRecordingSamples = () => {
        this.isRecording = false;
        this.setState({});
    }
    onRemoveClass = (classIndex) => {
        this.trainingDataReducer.reduce({ type: martyMachine.trainingDataActionTypes.TD_REMOVE_CLASS, payload: { id: classIndex } });
        this.setState({});
    }
    onRemoveSample = (classIndex, sampleIdx) => {
        this.trainingDataReducer.reduce({ type: martyMachine.trainingDataActionTypes.TD_REMOVE_SAMPLE, payload: { id: classIndex, sampleIdx } });
        this.setState({});
    }
    onTrainModel = () => {
        this.isTraining = true;
        martyMachine.trainModel(this.props.model, this.trainingDataReducer.state).then(res => {
            this.isTrained = res;
            this.isTraining = false;
            this.setState({});
        });
        this.setState({});
    }
    onStopTraining = () => {
        this.isTraining = false;
        this.props.model.stopTraining();
        this.setState({});
    }
    onRunModel = () => {
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
        }
        this.setState({});
    }

    onStopRunningModel = () => {
        this.isRunning = false;
        this.setState({});
    }
    onSaveModel = () => {
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
            this.setState({});
            vm.addModel(vmModel).then(() => {
                // if (callback) callback();
                console.log('Model saved');
                this.props.onNewModel();
            });
        }
        this.props.model.saveModel();
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
                    onContainerClick={this.handleContainerClick}
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
                    isTrained={this.isTrained || this.props.isModelLoaded}
                    isSaving={this.isSaving}
                    isModelLoaded={this.props.isModelLoaded}
                    setRef={this.setRef}
                    setAudioCanvasRef={this.setAudioCanvasRef}
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

export default connect(
    mapStateToProps
)(MartyMachineModelEditor);



class AudioExtractor {
    constructor() {
        this.sampleRateHz = 48000;
        this.fftSize = 2048;
        this.frameDurationMillis = this.fftSize / this.sampleRateHz * 1e3;
        this.columnTruncateLength = this.fftSize;
        this.includeRawAudio = true;
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
        const period =
            Math.max(1, Math.round(this.numFrames * (1 - this.overlapFactor)));
        this.tracker = new Tracker(
            period,
            Math.round(this.suppressionTimeMillis / this.frameDurationMillis));
        this.frameIntervalTask = setInterval(
            this.onAudioFrame.bind(this), this.fftSize / this.sampleRateHz * 1e3);
    }

    async onAudioFrame() {
        this.analyser.getFloatFrequencyData(this.freqData);
        if (this.freqData[0] === -Infinity) {
            return;
        }

        this.freqDataQueue.push(this.freqData.slice(0, this.columnTruncateLength));
        if (this.includeRawAudio) {
            this.analyser.getFloatTimeDomainData(this.timeData);
            this.timeDataQueue.push(this.timeData.slice());
        }
        if (this.freqDataQueue.length > this.numFrames) {
            // Drop the oldest frame (least recent).
            this.freqDataQueue.shift();
        }
        // const shouldFire = this.tracker.tick();
        // if (shouldFire) {
        //     const freqData = flattenQueue(this.freqDataQueue);
        //     const freqDataTensor = getInputTensorFromFrequencyData(
        //         freqData, [1, this.numFrames, this.columnTruncateLength, 1]);
        //     let timeDataTensor;
        //     if (this.includeRawAudio) {
        //         const timeData = flattenQueue(this.timeDataQueue);
        //         timeDataTensor = getInputTensorFromFrequencyData(
        //             timeData, [1, this.numFrames * this.fftSize]);
        //     }
        //     const shouldRest =
        //         await this.spectrogramCallback(freqDataTensor, timeDataTensor);
        //     if (shouldRest) {
        //         this.tracker.suppress();
        //     }
        //     tf.dispose([freqDataTensor, timeDataTensor]);
        // }
    }

    async stop() {
        if (this.frameIntervalTask == null) {
            throw new Error(
                'Cannot stop because there is no ongoing streaming activity.');
        }
        clearInterval(this.frameIntervalTask);
        this.frameIntervalTask = null;
        this.analyser.disconnect();
        this.audioContext.close();
        if (this.stream != null && this.stream.getTracks().length > 0) {
            this.stream.getTracks()[0].stop();
        }
    }

}


/**
 * A class that manages the firing of events based on periods
 * and suppression time.
 */
export class Tracker {
    /**
     * Constructor of Tracker.
     *
     * @param period The event-firing period, in number of frames.
     * @param suppressionPeriod The suppression period, in number of frames.
     */
    constructor(period, suppressionPeriod) {
        this.period = period;
        this.suppressionTime = suppressionPeriod == null ? 0 : suppressionPeriod;
        this.counter = 0;

    }

    /**
     * Mark a frame.
     *
     * @returns Whether the event should be fired at the current frame.
     */
    tick() {
        this.counter++;
        const shouldFire = (this.counter % this.period === 0) &&
            (this.suppressionOnset == null ||
                this.counter - this.suppressionOnset > this.suppressionTime);
        return shouldFire;
    }

    /**
     * Order the beginning of a supression period.
     */
    suppress() {
        this.suppressionOnset = this.counter;
    }
}

function flattenQueue(queue) {
    const frameSize = queue[0].length;
    const freqData = new Float32Array(queue.length * frameSize);
    queue.forEach((data, i) => freqData.set(data, i * frameSize));
    return freqData;
}


export function getInputTensorFromFrequencyData(
    freqData, shape) {
    const vals = new Float32Array(tf.util.sizeFromShape(shape));
    // If the data is less than the output shape, the rest is padded with zeros.
    vals.set(freqData, vals.length - freqData.length);
    return tf.tensor(vals, shape);
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