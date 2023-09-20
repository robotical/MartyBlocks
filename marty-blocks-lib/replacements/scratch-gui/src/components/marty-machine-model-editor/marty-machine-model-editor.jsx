import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import CameraFeed from '../marty-camera-feed/marty-camera-feed.jsx';
import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';

import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import IconButton from '../icon-button/icon-button.jsx';

import styles from './marty-machine-model-editor.css';

import playIcon from './icon--play.svg';
import stopIcon from './icon--stop.svg';
import deleteIcon from './icon--delete.svg';
import MartyMachineModelPredictions from './predictions/predictions.jsx';
import TfVisChart from './TfVisChart/TfVisChart.jsx';

const BufferedInput = BufferedInputHOC(Input);

const messages = defineMessages({
    model: {
        id: 'gui.martyMachineModelEditor.model',
        description: 'Label for the name of the model',
        defaultMessage: 'Model'
    },
    className: {
        id: 'gui.martyMachineModelEditor.className',
        description: 'Label for the name of the class',
        defaultMessage: 'New Class'
    },
    record: {
        id: 'gui.MartyMachineModelEditor.record',
        description: 'Title of the button to start recording samples',
        defaultMessage: 'Record'
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
});

const MartyMachineModelEditor = props => {
    let feedJSX = <CameraFeed setRef={props.setDeviceStreamRef} />;
    if (props.modelType === 'image-device') {
        feedJSX = <CameraFeed setRef={props.setDeviceStreamRef} />;
    } else if (props.modelType === 'image-marty') {
        feedJSX = <CameraFeed setRef={props.setDeviceStreamRef} />;
    } else if (props.modelType === 'audio') {
        feedJSX = <CameraFeed setRef={props.setDeviceStreamRef} />;
    }

    const canBeTrained = props.modelClasses.length > 1 && props.modelClasses.every(modelClass => modelClass.samples.length > 0) && !props.isRecording && !props.isTraining && !props.isRunning;
    const canBeRun = !props.isRecording && !props.isTraining && !props.isRunning && props.isTrained;
    const canBeRecorded = !props.isRecording && !props.isTraining && !props.isRunning;
    const canBeSaved = props.isTrained;

    let trainingOrRunningJSX = null;
    if (props.isTraining || props.isTrained) {
        trainingOrRunningJSX = <TfVisChart id="lossChart" title="Loss" xLabel="epoch" yLabel="loss" width={299} height={183} model={props.model} />;
    }
    if (props.isRunning) {
        trainingOrRunningJSX = <MartyMachineModelPredictions model={props.model} />;
    }

    return <div
        className={styles.editorContainer}
        ref={props.setRef}
        onMouseDown={props.onContainerClick}
    >
        <div className={styles.row}>
            <div className={styles.inputGroup}>
                <Label text={props.intl.formatMessage(messages.model)}>
                    <BufferedInput
                        tabIndex="1"
                        type="text"
                        value={props.name}
                        onSubmit={props.onChangeName}
                    />
                </Label>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.feedContainer}>
                {feedJSX}
            </div>
            {trainingOrRunningJSX}
        </div>
        <div className={classNames(styles.row, styles.rowReverse)}>
            <div className={styles.inputGroup}>
                <Label text={props.intl.formatMessage(messages.className)}>
                    <BufferedInput
                        tabIndex="1"
                        type="text"
                        value={props.className}
                        onSubmit={props.onClassNameChange}
                    />
                </Label>
            </div>
            <div className={styles.inputGroup}>
                {props.isRecording ? (
                    <button
                        className={classNames(styles.roundButton, styles.stopButtonn)}
                        title={props.intl.formatMessage(messages.stop)}
                        onClick={props.onStopRecording}
                    >
                        <img
                            draggable={false}
                            src={stopIcon}
                        />
                    </button>
                ) : (
                    <button
                        className={classNames(styles.roundButton, styles.playButton, canBeRecorded ? '' : styles.buttonDisabled)}
                        title={props.intl.formatMessage(messages.record)}
                        onClick={props.onStartRecordingSamples}
                        disabled={!canBeRecorded}
                    >
                        <img
                            draggable={false}
                            src={playIcon}
                        />
                    </button>
                )}
            </div>
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
                    Train
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
                    Run
                </button>}
            </div>
            <div className={styles.inputGroup}>
                {props.isSaving ? <div className={styles.saving}>Saving...</div> :
                    <button
                        className={classNames(styles.roundButton, styles.trainButton, canBeSaved ? '' : styles.buttonDisabled)}
                        title={props.intl.formatMessage(messages.save)}
                        onClick={props.onSaveModel}
                        disabled={!canBeSaved}
                    >
                        Save
                    </button>}
            </div>
        </div>

        <div className={styles.modelClassesOuterContainer}>
            <div className={styles.row}>
                <div className={styles.classesContainer}>
                    {props.modelClasses.map((modelClass, classIndex) => {
                        return <div key={classIndex} className={styles.classContainer}>
                            <div className={styles.classLabel}>{modelClass.name}<IconButton
                                title=""
                                className={styles.effectButton}
                                img={deleteIcon}
                                onClick={() => props.onRemoveClass(classIndex)}
                            /></div>

                            <div className={styles.modelSamplesContainer}>
                                <div className={styles.rowCustom}>
                                    <p className={styles.samplesLengthTitle}>{modelClass.samples.length} samples</p>
                                </div>
                                <div className={styles.rowCustom}>
                                    {modelClass.samples.map((sample, sampleIndex) => {
                                        return <div key={sampleIndex} className={styles.modelSampleContainer}>
                                            <div className={styles.modelSampleOverlay}>
                                                <div className={styles.modelSampleOverlayDelete}>
                                                    <IconButton
                                                        title=""
                                                        className={styles.effectButton}
                                                        img={deleteIcon}
                                                        onClick={() => props.onRemoveSample(classIndex, sampleIndex)}
                                                    />
                                                </div>
                                                <img className={styles.modelSample} src={"data:image/png;base64," + sample.jpegBase64} alt="sample" />
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
};

MartyMachineModelEditor.propTypes = {
    intl: intlShape,
    name: PropTypes.string.isRequired,
    onChangeName: PropTypes.func.isRequired,
    onContainerClick: PropTypes.func.isRequired,
    modelType: PropTypes.string.isRequired,
    setDeviceStreamRef: PropTypes.func,
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
    isTrained: PropTypes.bool.isRequired,
    onSaveModel: PropTypes.func.isRequired,
    isSaving: PropTypes.bool.isRequired,
    model: PropTypes.object.isRequired,
};

export default injectIntl(MartyMachineModelEditor);
