import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import { defineMessages, injectIntl, FormattedMessage, intl } from 'react-intl';
import Box from '../box/box.jsx';
import bindAll from "lodash.bindall";

import styles from './teachable-machine-url-modal.css';

const messages = defineMessages({
    label: {
        id: 'gui.teachablemachineurlmodal.label',
        defaultMessage: 'Load Teachable Machine Model',
        description: 'Label for the Teachable Machine URL modal',
    }
});

class TeachableMachineUrlModal extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleChange',
            'handleLoad',
            'handleBack',
        ]);
        this.state = {
            url: '',
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    handleChange(event) {
        this.setState({ url: event.target.value });
    }

    async handleLoad() {
        const url = this.state.url.trim();
        if (url) {
            const modelId = url.match(/\/models\/([^/]+)\/?$/)[1];
            const storageUrl = `https://storage.googleapis.com/tm-model/${modelId}/`;
            const timestamp = new Date().getTime();
            const modelMetadataRes = await fetch(`${storageUrl}metadata.json?${timestamp}`);
            const metadata = await modelMetadataRes.json();
            console.log("metadata", metadata);
            const trainingData = getTrainingDataFromMeta(metadata);
            const tmModelUrl = `${storageUrl}model.json`;
            const MLModel = await martyMachine.loadTmModel(tmModelUrl);
            MLModel.setTrainingData(trainingData);
            console.debug('Loaded Teachable Machine model', MLModel);
            this.props.onModelLoaded(
                tmModelUrl,
                trainingData,
                "tmModel",
                'image-device'
            );
            this.props.onBack();
        } else {
            this.setState({ error: true });
        }
    }

    handleBack() {
        this.props.onBack();
    }

    render() {
        const label = messages.label;
        return (
            <ReactModal
                isOpen
                className={styles.modalContent}
                contentLabel={label}
                overlayClassName={styles.modalOverlay}
                onRequestClose={this.props.onBack}
            >
                <div dir={'ltr'} >
                    {/* <Box className={styles.illustration}>
                        Load Teachable Machine Model
                    </Box> */}

                    <Box className={styles.body}>
                        <h2>
                            <FormattedMessage {...label} />
                        </h2>
                        <input
                            autoFocus
                            className={styles.input}
                            placeholder="Paste TM model URL here"
                            type="text"
                            value={this.state.url}
                            onChange={this.handleChange}
                        />
                        <Box justifyContent="space-between" className={styles.buttonRow}>

                            <button
                                className={styles.button}
                                onClick={this.handleLoad}
                            >
                                Load
                            </button>
                            <button
                                className={styles.button}
                                onClick={this.handleBack}
                            >
                                Close
                            </button>
                        </Box>
                    </Box>
                </div>
            </ReactModal>

        );
    }
};

TeachableMachineUrlModal.propTypes = {
    onModelLoaded: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};

const WrappedTeachableMachineUrlModal = injectIntl(TeachableMachineUrlModal);

WrappedTeachableMachineUrlModal.setAppElement = ReactModal.setAppElement;

export default WrappedTeachableMachineUrlModal;


// tmMetadata to trainingData
function getTrainingDataFromMeta(tmMetadata) {
    const mmMetadata = {classes: []};
    for (const className of tmMetadata.labels) {
        mmMetadata.classes.push({
            name: className,
            samples: [],
        });
    }
    return mmMetadata;
}

