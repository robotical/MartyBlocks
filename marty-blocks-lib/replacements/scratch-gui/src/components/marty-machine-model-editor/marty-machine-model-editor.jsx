import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import CameraFeed from '../marty-camera-feed/marty-camera-feed.jsx';
import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';

import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';

import styles from './marty-machine-model-editor.css';

import stopIcon from './icon--stop.svg';
import MartyMachineModelPredictions from './predictions/predictions.jsx';
import TfVisChart from './TfVisChart/TfVisChart.jsx';
import SoundFeed from '../marty-sound-feed/marty-sound-feed.jsx';
import MartyAccelerometerFeedEditor from '../mm-accelerometer-data-feed/mm-accelerometer-data-feed.jsx';
import ModelClass from './model-class/model-class.jsx';
import MoreInfoButton from "../more-info-button/more-info-button.jsx";
import MMCreateNewClass from '../more-info-components/marty-machine-create-new-class/marty-machine-create-new-class.jsx';
import addNewIcon from "../action-menu/icon--plus.svg";

const BufferedInput = BufferedInputHOC(Input);

const messages = defineMessages({
    model: {
        id: 'gui.martyMachineModelEditor.model',
        description: 'Label for the name of the model',
        defaultMessage: 'Model Name'
    },
    className: {
        id: 'gui.martyMachineModelEditor.className',
        description: 'Label for the name of the class',
        defaultMessage: 'Collect data for'
    },
    createNewClass: {
        id: 'gui.martyMachineModelEditor.createNewClass',
        description: 'Label for the name of the class',
        defaultMessage: 'Create class'
    },
    samples: {
        id: 'gui.martyMachineModelEditor.samples',
        description: 'Label for the number of samples collected for a class',
        defaultMessage: 'Samples'
    },
    record: {
        id: 'gui.MartyMachineModelEditor.record',
        description: 'Title of the button to start recording samples',
        defaultMessage: 'Record Data'
    },
    stop: {
        id: 'gui.MartyMachineModelEditor.stop',
        description: 'Title of the button to stop recording samples',
        defaultMessage: 'Stop'
    },
    train: {
        id: 'gui.MartyMachineModelEditor.train',
        description: 'Title of the button to train the model',
        defaultMessage: 'Train'
    },
    run: {
        id: 'gui.MartyMachineModelEditor.run',
        description: 'Title of the button to run the model',
        defaultMessage: 'Run'
    },
    save: {
        id: 'gui.MartyMachineModelEditor.save',
        description: 'Title of the button to save the model',
        defaultMessage: 'Save'
    },
    saving: {
        id: 'gui.MartyMachineModelEditor.saving',
        description: 'Text shown when the model is being saved',
        defaultMessage: 'Saving...'
    },
    requiresAtLeast10Samples: {
        id: 'gui.MartyMachineModelEditor.requiresAtLeast10Samples',
        description: 'Message shown when a class requires at least 10 samples',
        defaultMessage: 'Requires at least 10 samples'
    },
    createNewClass: {   
        id: 'gui.MartyMachineModelEditor.createNewClass',
        description: 'Label for the button to create a new class',
        defaultMessage: 'Create New Class'  
    },
});

const PLOT_WIDTH = 299;
const PLOT_HEIGHT = 183;

class MartyMachineModelEditor extends React.Component {
    constructor(props) {
        super(props);
        this.handleClassNameChangeFromSelect = this.handleClassNameChangeFromSelect.bind(this);
        this.setModelClassesOuterContainerRef = this.setModelClassesOuterContainerRef.bind(this);
        this.modelClassesOuterContainer = null;
    }

    handleClassNameChangeFromSelect(event) {
        if (event.target.value === '') {
            return;
        }
        this.props.onClassNameChange(event.target.value);
    }

    setModelClassesOuterContainerRef = (element) => {
        this.modelClassesOuterContainer = element;
    }

    componentDidUpdate() {
        if (this.modelClassesOuterContainer) {
            this.modelClassesOuterContainer.scrollTo({
                top: this.modelClassesOuterContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
    }

    render() {
        const { props } = this;
        let feedJSX = <CameraFeed setRef={props.setDeviceStreamRef} isRecording={props.isRecording} />;
        if (props.modelType === 'image-device') {
            feedJSX = <CameraFeed setRef={props.setDeviceStreamRef} isRecording={props.isRecording} />;
        } else if (props.modelType === 'image-marty') {
            feedJSX = <CameraFeed setRef={props.setDeviceStreamRef} isRecording={props.isRecording} />;
        } else if (props.modelType === 'audio') {
            feedJSX = <SoundFeed setRef={props.setAudioCanvasRef} isRecording={props.isRecording} />;
        } else if (props.modelType === 'accelerometer') {
            feedJSX = <MartyAccelerometerFeedEditor setRef={props.setAccelerometerCanvasRef} isRecording={props.isRecording} />;
        }

        const canBeTrained = (props.modelClasses.length > 1 && props.modelClasses.every(modelClass => modelClass.samples.length > 0) && !props.isRecording && !props.isTraining && !props.isRunning) && !props.isModelLoaded;
        const canBeRun = !props.isRecording && !props.isTraining && !props.isRunning && props.isTrained;
        const canBeRecorded = (!props.isRecording && !props.isTraining && !props.isRunning) && !props.isModelLoaded;
        const canBeSaved = props.isTrained && !props.isModelLoaded;

        let trainingOrRunningJSX = null;
        if ((props.isTraining || props.isTrained) && !props.isModelLoaded && !props.hasRun) {
            trainingOrRunningJSX = <TfVisChart id="lossChart" title="Loss" xLabel="epoch" yLabel="loss" width={PLOT_WIDTH} height={PLOT_HEIGHT} model={props.model} />;
        }
        if (props.isRunning) {
            trainingOrRunningJSX = <MartyMachineModelPredictions model={props.model} />;
        }

        const handleClassNameChangeFromSelect = (event) => {
            if (event.target.value === '') {
                return;
            }
            props.onClassNameChange(event.target.value);
        };

        return (
            <div
                className={styles.editorContainer}
                ref={props.setRef}
                onMouseDown={props.onContainerClick}
            >
                <div className={styles.row}>
                    <div className={styles.feedContainer}>
                        {feedJSX}
                    </div>
                    <div className={styles.trainingRunningContainer} style={{ width: PLOT_WIDTH, height: PLOT_HEIGHT }}>
                        {trainingOrRunningJSX}
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <Label text={props.intl.formatMessage(messages.model)}>
                            <BufferedInput
                                style={{ width: '100px' }}
                                tabIndex="1"
                                type="text"
                                value={props.name}
                                onSubmit={props.onChangeName}
                            />
                        </Label>
                    </div>

                    {!props.isModelLoaded && <>
                        <div className={styles.inputGroup}>
                            <Label text={props.intl.formatMessage(messages.createNewClass)} spanStyle={{ marginRight: 0 }}>
                                <MoreInfoButton modalTitle={this.props.intl.formatMessage(messages.createNewClass)} contentComponent={MMCreateNewClass}>
                                    <div className={styles.moreInfoIconContainer}>
                                        <div className={styles.moreInfoIcon}>?</div>
                                    </div>
                                </MoreInfoButton>
                                <BufferedInput
                                    style={{ width: '100px' }}
                                    tabIndex="1"
                                    type="text"
                                    value={props.className}
                                    onSubmit={props.onClassNameChange}
                                />
                            </Label>
                        </div>
                        <div className={styles.inputGroup}>
                            <button
                                className={classNames(styles.roundButton, styles.trainButton)}
                                title={props.intl.formatMessage(messages.createNewClass)}
                                onClick={props.onCreateNewClass}
                            >
                                <img
                                    draggable={false}
                                    src={addNewIcon}
                                />
                            </button>
                        </div>

                    </>}
                    <div className={styles.inputGroup}>
                        {props.isTraining ? <button
                            className={classNames(styles.roundButton, styles.stopButtonn)}
                            title={props.intl.formatMessage(messages.stop)}
                            onClick={props.onStopTraining}
                        >
                            <img
                                draggable={false}
                                src={stopIcon}
                            />
                        </button> : <button
                            className={classNames(styles.roundButton, styles.trainButton, canBeTrained ? '' : styles.buttonDisabled)}
                            title={props.intl.formatMessage(messages.train)}
                            onClick={props.onTrain}
                            disabled={!canBeTrained}
                        >
                            {props.intl.formatMessage(messages.train)}
                        </button>}
                    </div>
                    <div className={styles.inputGroup}>
                        {props.isRunning ? <button
                            className={classNames(styles.roundButton, styles.stopButtonn)}
                            title={props.intl.formatMessage(messages.stop)}
                            onClick={props.onStopRunning}
                        >
                            <img
                                draggable={false}
                                src={stopIcon}
                            />
                        </button> : <button
                            className={classNames(styles.roundButton, styles.trainButton, canBeRun ? '' : styles.buttonDisabled)}
                            title={props.intl.formatMessage(messages.run)}
                            onClick={props.onRun}
                            disabled={!canBeRun}
                        >
                            {props.intl.formatMessage(messages.run)}
                        </button>}
                    </div>
                    <div className={styles.inputGroup}>
                        {props.isSaving ? <div className={styles.saving}>{props.intl.formatMessage(messages.saving)}</div> :
                            <button
                                className={classNames(styles.roundButton, styles.trainButton, canBeSaved ? '' : styles.buttonDisabled)}
                                title={props.intl.formatMessage(messages.save)}
                                onClick={props.onSaveModel}
                                disabled={!canBeSaved}
                            >
                                {props.intl.formatMessage(messages.save)}
                            </button>}
                    </div>

                    {/* <p className={styles.betaTag}>
                        BETA<span className={styles.betaTagSpan}>{" "}(may contain bugs!)</span>
                    </p> */}
                </div>


                <div className={styles.modelClassesOuterContainer} ref={this.setModelClassesOuterContainerRef}>
                    {/* the model is not loaded (we are creating it), so the classes should have samples etc */}
                    {!props.isModelLoaded ? <div className={styles.row}>
                        <div className={styles.classesContainer}>
                            {props.modelClasses.map((modelClass, classIndex) => {
                                let onRemoveClass = props.onRemoveClass.bind(this, classIndex);
                                let subtitle = null;
                                if (modelClass.name === martyMachine.BACKGROUND_NOISE_TAG) {
                                    onRemoveClass = null;
                                    subtitle = <span style={{
                                        backgroundColor: modelClass.samples.length >= 10 ? 'green' : 'rgb(255, 171, 25)',
                                        fontWeight: modelClass.samples.length >= 10 ? '500' : 'bold',
                                        color: modelClass.samples.length >= 10 ? 'white' : 'black',
                                        fontSize: '0.8em',
                                        alignSelf: 'self-start',
                                        padding: '2px 10px',
                                        borderRadius: '4px',
                                    }}>{this.props.intl.formatMessage(messages.requiresAtLeast10Samples) + ` (${modelClass.samples.length})`}</span>;
                                }
                                return <ModelClass
                                    onClassNameSelected={props.onClassNameSelected}
                                    key={classIndex}
                                    subtitle={subtitle}
                                    canBeRecorded={canBeRecorded}
                                    isRecording={props.isRecording}
                                    modelClass={modelClass}
                                    onRemoveClass={onRemoveClass}
                                    onStartRecordingSamples={props.onStartRecordingSamples}
                                    onStopRecording={props.onStopRecording}
                                    onRemoveSample={props.onRemoveSample.bind(this, classIndex)}
                                    modelType={props.modelType} />
                            })}
                        </div>
                    </div> : <div className={styles.row}>
                        {/* // the model is loaded, so we can only show the classe names from the model (no samples) */}
                        <div className={styles.classesContainer}>
                            {props.model.trainingData.classes.map((modelClass, classIndex) => {
                                return <div key={classIndex} className={styles.classContainer}>
                                    <div className={styles.classLabel}>{modelClass.name}</div>
                                    <div className={styles.modelSamplesContainer}>
                                        <div className={styles.rowCustom}>
                                            <p className={styles.samplesLengthTitle}>{modelClass.samples.length} {props.intl.formatMessage(messages.samples)}</p>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>}
                </div>
            </div>
        );
    }
}

MartyMachineModelEditor.propTypes = {
    intl: intlShape,
    name: PropTypes.string.isRequired,
    onChangeName: PropTypes.func.isRequired,
    onContainerClick: PropTypes.func.isRequired,
    onCreateNewClass: PropTypes.func.isRequired,
    modelType: PropTypes.string.isRequired,
    setDeviceStreamRef: PropTypes.func,
    setAudioCanvasRef: PropTypes.func,
    setAccelerometerCanvasRef: PropTypes.func,
    modelClasses: PropTypes.arrayOf(PropTypes.object),
    onClassNameChange: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    onStartRecordingSamples: PropTypes.func.isRequired,
    onRemoveClass: PropTypes.func.isRequired,
    onRemoveSample: PropTypes.func.isRequired,
    onStopRecording: PropTypes.func.isRequired,
    isRecording: PropTypes.bool.isRequired,
    isTraining: PropTypes.bool.isRequired,
    onTrain: PropTypes.func.isRequired,
    onStopTraining: PropTypes.func.isRequired,
    onRun: PropTypes.func.isRequired,
    onStopRunning: PropTypes.func.isRequired,
    isRunning: PropTypes.bool.isRequired,
    hasRun: PropTypes.bool.isRequired,
    isTrained: PropTypes.bool.isRequired,
    onSaveModel: PropTypes.func.isRequired,
    isSaving: PropTypes.bool.isRequired,
    model: PropTypes.object.isRequired,
    isModelLoaded: PropTypes.bool.isRequired,
    onClassNameSelected: PropTypes.func.isRequired,
};

export default injectIntl(MartyMachineModelEditor);
