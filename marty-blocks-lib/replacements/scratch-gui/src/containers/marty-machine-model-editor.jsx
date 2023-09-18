import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

import { connect } from 'react-redux';
import MartyMachineModelEditorComponent from '../components/marty-machine-model-editor/marty-machine-model-editor.jsx';

const MODEL_CLASSES = [
    { name: 'Class 1', samples: [] },
];

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
        let selectedClass = MODEL_CLASSES.find(c => c.name === this.state.className);
        if (!selectedClass) {
            MODEL_CLASSES.push({ name: this.state.className, samples: [] });
        }
        selectedClass = MODEL_CLASSES.find(c => c.name === this.state.className);
        this.isRecording = true;
        if (this.state.modelType === 'image-device') {
            const RECORD_TIME = 2000; // 2000ms = 2 seconds
            const INTERVAL_TIME = 100; // 100ms = 0.1 second between captures
            const videoElement = this.deviceStreamRef;
            const canvas = this.canvasRef;
            const ctx = canvas.getContext('2d');
            let capturedImages = [];

            const captureInterval = setInterval(() => {
                if (!this.isRecording) return;
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                const imageSrc = canvas.toDataURL('image/png');
                capturedImages.push(imageSrc);
                selectedClass.samples.push(imageSrc);
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
        this.setState({});
    }
    onRemoveClass = (classIndex) => {
        MODEL_CLASSES.splice(classIndex, 1);
        this.setState({});
    }
    onRemoveSample = (classIndex, sampleIndex) => {
        MODEL_CLASSES[classIndex].samples.splice(sampleIndex, 1);
        this.setState({});
    }
    onTrainModel = () => {
        this.isTraining = true;
        this.setState({});
    }
    onStopTraining = () => {
        this.isTraining = false;
        this.setState({});
    }
    onRunModel = () => {
        this.isRunning = true;
        this.setState({});
    }
    onStopRunningModel = () => {
        this.isRunning = false;
        this.setState({});
    }
    onSaveModel = () => {
        const model = {
            modelType: this.state.modelType,
            modelClasses: MODEL_CLASSES
        };
        const modelJson = JSON.stringify(model);
        const blob = new Blob([modelJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${this.props.name}.json`;
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
                    modelClasses={MODEL_CLASSES}
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
