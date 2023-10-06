import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

import { connect } from 'react-redux';
import MartyMachineModelEditorComponent from '../components/marty-machine-model-editor/marty-machine-model-editor.jsx';

class MartyMachineModelEditor extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleChangeName',
            'handleContainerClick',
            'setRef',
            'setDeviceStreamRef',
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
            modelType: 'image-device',
            deviceStream: null,
            className: 'Class 1',
            modelName: vm.editingTarget.sprite.models[this.props.modelIndex < vm.editingTarget.sprite.models.length ? this.props.modelIndex : vm.editingTarget.sprite.models.length - 1]?.name || 'Model 1'
        };

        this.ref = null;
        this.deviceStreamRef = null;
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
            // get appropriate feed based on model type
            if (this.state.modelType === 'image-device') {
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
            }
        };
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
    handleContainerClick(e) {
        // If the click is on the sound editor's div (and not any other element), delesect
        if (e.target === this.ref && this.state.trimStart !== null) {

        }
    }
    onClassNameChange = (className) => {
        this.setState({ className });
    }

    onStartRecordingSamples = () => {
        // select class 
        let selectedClassIdx = this.trainingDataReducer.state.classes.findIndex(c => c.name === this.state.className);
        if (selectedClassIdx === -1) {
            this.trainingDataReducer.reduce({ type: martyMachine.trainingDataActionTypes.TD_ADD_CLASS, payload: { name: this.state.className } });
            selectedClassIdx = this.trainingDataReducer.state.classes.length - 1;
            // MODEL_CLASSES.push({ name: this.state.className, samples: [] });
        }
        // selectedClass = MODEL_CLASSES.find(c => c.name === this.state.className);
        this.isRecording = true;
        if (this.state.modelType === 'image-device') {
            const RECORD_TIME = 2000;
            const INTERVAL_TIME = 30;
            const videoElement = this.deviceStreamRef;
            const canvas = this.canvasRef;
            const ctx = canvas.getContext('2d');

            let lastCaptureTime = 0;

            // Flag to check if recording should continue
            this.isRecording = true;

            const recordFrame = (timestamp) => {
                if (!this.isRecording) return;

                if (!lastCaptureTime || timestamp - lastCaptureTime >= INTERVAL_TIME) {
                    if (!this.isRecording) return;
                    ctx.drawImage(videoElement, 0, 0, martyMachine.image_size, martyMachine.image_size);
                    let imageSrc = canvas.toDataURL('image/png');
                    imageSrc = imageSrc.replace(/^data:image\/(png|jpg);base64,/, "");
                    this.trainingDataReducer.reduce({ type: martyMachine.trainingDataActionTypes.TD_ADD_IMAGE, payload: { id: selectedClassIdx, image: martyMachine.newImage(imageSrc), canvas  } });
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
    onRemoveSample = (classIndex, sampleIndex) => {
        this.trainingDataReducer.reduce({ type: martyMachine.trainingDataActionTypes.TD_REMOVE_IMAGE, payload: { id: classIndex, imageIdx: sampleIndex } });
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
        if (this.state.modelType === 'image-device') {
            const INTERVAL_TIME = 30;
            const videoElement = this.deviceStreamRef;
            const canvas = this.canvasRef;
            const ctx = canvas.getContext('2d');
            let lastCaptureTime = 0;

            // Flag to check if recording should continue
            this.isRecording = true;

            const recordFrame = (timestamp) => {

                if (!lastCaptureTime || timestamp - lastCaptureTime >= INTERVAL_TIME) {
                    if (!this.isRunning) {
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
                modelType: this.state.modelType,
            };

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
                    name={this.state.modelName}
                    setRef={this.setRef}
                    onChangeName={this.handleChangeName}
                    onContainerClick={this.handleContainerClick}
                    modelType={this.state.modelType}
                    setDeviceStreamRef={this.setDeviceStreamRef}
                    modelClasses={this.trainingDataReducer.state.classes}
                    className={this.state.className}
                    onClassNameChange={this.onClassNameChange}
                    onStartRecordingSamples={this.onStartRecordingSamples}
                    onRemoveClass={this.onRemoveClass}
                    onRemoveSample={this.onRemoveSample}
                    onStopRecording={this.onStopRecordingSamples}
                    isRecording={this.isRecording}
                    isTraining={this.isTraining}
                    onTrain={this.onTrainModel}
                    onStopTraining={this.onStopTraining}
                    onRun={this.onRunModel}
                    onStopRunning={this.onStopRunningModel}
                    isRunning={this.isRunning}
                    isTrained={this.isTrained || this.props.isModelLoaded}
                    onSaveModel={this.onSaveModel}
                    isSaving={this.isSaving}
                    model={this.props.model}
                    isModelLoaded={this.props.isModelLoaded}
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
    isModelLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        vm: state.scratchGui.vm
    };
};

export default connect(
    mapStateToProps
)(MartyMachineModelEditor);
