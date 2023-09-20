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
        };

        this.ref = null;
        this.deviceStreamRef = null;
        this.canvasRef = null;
        this.isRecording = false;
        this.isTraining = false;
        this.isRunning = false;
        this.isTrained = false;
        this.trainingDataReducer = martyMachine.getNewTrainingDataReducer();
    }
    componentDidMount() {
        const asyncFunc = async () => {
            // get appropriate feed based on model type
            if (this.state.modelType === 'image-device') {
                const constraints = {
                    video: {
                        facingMode: 'user',
                        width: { min: 265, ideal: 1280 },
                        height: { min: 200, ideal: 720 }
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
        if (newProps.soundId !== this.props.soundId) { // A different sound has been selected
        }
    }
    componentWillUnmount() {
        if (this.state.deviceStream) {
            this.state.deviceStream.getTracks().forEach(track => track.stop());
        }
    }
    handleChangeName(name) {
        this.props.vm.renameSound(this.props.modelIndex, name);
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
            const INTERVAL_TIME = 100;
            const videoElement = this.deviceStreamRef;
            const canvas = this.canvasRef;
            const ctx = canvas.getContext('2d');

            const captureInterval = setInterval(() => {
                if (!this.isRecording) return;
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                let imageSrc = canvas.toDataURL('image/png');
                imageSrc = imageSrc.replace(/^data:image\/(png|jpg);base64,/, "");
                this.trainingDataReducer.reduce({ type: martyMachine.trainingDataActionTypes.TD_ADD_IMAGE, payload: { id: selectedClassIdx, image: martyMachine.newImage(imageSrc) } });
                this.setState({});
            }, INTERVAL_TIME);

            const cleanUpTimeout = setTimeout(() => {
                clearInterval(captureInterval);
                clearTimeout(cleanUpTimeout);
                this.isRecording = false;
                this.setState({});
            }, RECORD_TIME);
        }
    }
    onStopRecordingSamples = () => {
        this.isRecording = false;
        this.model.stopTraining();
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
        this.props.model.trainModel(this.trainingDataReducer.state).then(res => {
            this.isTrained = res;
            this.isTraining = false;
            this.setState({});
        });
        this.setState({});
    }
    onStopTraining = () => {
        this.isTraining = false;
        this.setState({});
    }
    onRunModel = () => {
        this.isRunning = true;
        if (this.state.modelType === 'image-device') {
            const INTERVAL_TIME = 200;
            const videoElement = this.deviceStreamRef;
            const canvas = this.canvasRef;
            const ctx = canvas.getContext('2d');

            const captureInterval = setInterval(async () => {
                if (!this.isRunning) {
                    clearInterval(captureInterval);
                    return;
                }
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                let imageSrc = canvas.toDataURL('image/png');
                imageSrc = imageSrc.replace(/^data:image\/(png|jpg);base64,/, "");
                await this.props.model.runModel(martyMachine.newImage(imageSrc));
                this.setState({});
            }, INTERVAL_TIME);
        }
        this.setState({});
    }

    onStopRunningModel = () => {
        this.isRunning = false;
        this.setState({});
    }
    onSaveModel = () => {
        // const model = {
        //     modelType: this.state.modelType,
        // };
        // const modelJson = JSON.stringify(model);
        // const blob = new Blob([modelJson], { type: 'application/json' });
        // const url = URL.createObjectURL(blob);
        // const link = document.createElement('a');
        // link.download = `${this.props.name}.json`;
    }

    render() {
        return (
            <>
                <MartyMachineModelEditorComponent
                    name={this.props.name}
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
                    isTrained={this.isTrained}
                    onSaveModel={this.onSaveModel}
                    model={this.props.model}
                />
                <canvas ref={this.setCanvasRef} width={1280} height={720} style={{ display: 'none' }} />
            </>
        );
    }
}

MartyMachineModelEditor.propTypes = {
    isFullScreen: PropTypes.bool,
    name: PropTypes.string.isRequired,
    sampleRate: PropTypes.number,
    samples: PropTypes.instanceOf(Float32Array),
    soundId: PropTypes.string,
    modelIndex: PropTypes.number,
    vm: PropTypes.instanceOf(VM).isRequired,
    model: PropTypes.object.isRequired
};

const mapStateToProps = (state, { modelIndex }) => {
    const sprite = state.scratchGui.vm.editingTarget.sprite;
    const index = modelIndex < sprite.sounds.length ? modelIndex : sprite.sounds.length - 1;
    const sound = state.scratchGui.vm.editingTarget.sprite.sounds[index];
    return {
        soundId: sound.soundId,
        isFullScreen: state.scratchGui.mode.isFullScreen,
        name: sound.name,
        vm: state.scratchGui.vm
    };
};

export default connect(
    mapStateToProps
)(MartyMachineModelEditor);
