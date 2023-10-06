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
            const res = await fetch(`${storageUrl}metadata.json?${timestamp}`);
            const metadata = await res.json();
            console.log("metadata", metadata);
            const modelJSON = await (await fetch(`${storageUrl}model.json?${timestamp}`)).json();
            console.log("modelJSON", modelJSON)
            const modelWeightsPaths = [];
            for (const weightManifest of modelJSON.weightsManifest) {
                for (const path of weightManifest.paths) {
                    modelWeightsPaths.push(`${storageUrl}${path}?${timestamp}`);
                }
            }
            const modelWeights = await Promise.all(modelWeightsPaths.map(async (path) => {
                const res = await fetch(path);
                return await res.arrayBuffer();
            }));
            console.log("modelWeights", modelWeights);
            const mmModel = tm2mm(modelJSON, modelWeights, metadata);
            const MLModel = await martyMachine.loadModel(mmModel.modelJSON, mmModel.weightBuffers, mmModel.weightInfo)
            MLModel.setTrainingData(mmModel.trainingData);
            console.debug('Loaded Teachable Machine model', MLModel);
            this.props.onModelLoaded(
                mmModel.modelJSON,
                mmModel.weightBuffers,
                mmModel.weightInfo,
                mmModel.trainingData,
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


// teachable machine to marty machine converter
function tm2mm(tmModelJSON, tmModelWeights, tmMetadata) {
    const mmModelJSON = JSON.stringify(tmModelJSON.modelTopology);
    const mmWeightsInfo = []
    for (let i = 0; i < tmModelJSON.weightsManifest.length; i++) {
        const tmWeightInfo = tmModelJSON.weightsManifest[i];
        for (let j = 0; j < tmWeightInfo.weights.length; j++) {
            const tmWeight = tmWeightInfo.weights[j];
            const mmWeightInfo = {
                id: j + 1,
                name: tmWeight.name,
                originalName: tmWeight.name,
                shape: tmWeight.shape,
                dtype: tmWeight.dtype,
            };
            mmWeightsInfo.push(mmWeightInfo);
        }
    }
    const mmModelWeights = deFlattenWeights(mmWeightsInfo, tmModelWeights);
    const mmMetadata = {classes: []};
    for (const className of tmMetadata.labels) {
        mmMetadata.classes.push({
            name: className,
            samples: [null],
        });
    }
    const mmModel = {
        modelJSON: mmModelJSON,
        weightBuffers: mmModelWeights,
        weightInfo: mmWeightsInfo,
        trainingData: mmMetadata,
    };
    return mmModel;
}


function deFlattenWeights(weightsInfo, weightsArr) {
    // need to de-flatten the weights
    const longArrayFloat32 = new Float32Array(weightsArr[0].buffer);

    // Calculate lengths based on the shape metadata. 
    const lengths = weightsInfo.map((weightInfo) => {
        const { shape } = weightInfo;
        const oneDArrLength = shape.reduce((acc, curr) => acc * curr, 1);
        return oneDArrLength;
    });

    // Initialize empty Float32Arrays based on these lengths.
    const weights = lengths.map((length) => new Float32Array(length));

    // populate the weights
    let offset = 0;
    for (let i = 0; i < weights.length; i++) {
        const weight = weights[i];
        const length = lengths[i];
        weight.set(longArrayFloat32.slice(offset, offset + length));
        offset += length;
    }
    return weights;
}

async function saveModelToVm(modelJSON, weightBuffers, weightInfo, trainingData, modelName, modelType) {
    const storage = vm.runtime.storage;

    const vmModel = {
        format: '',
        dataFormat: storage.DataFormat.BIN,
        modelType: modelType
    };

    // Create an asset from the model JSON
    vmModel.asset = storage.createAsset(
        storage.AssetType.MLModelWeights,
        storage.DataFormat.BIN,
        weightBuffers,
        null,
        true // generate md5
    );

    vmModel.dependencies = [modelJSON, weightInfo, trainingData];
    vmModel.assetId = vmModel.asset.assetId;

    // update vmModel object with md5 property
    vmModel.md5 = `${vmModel.assetId}.${vmModel.dataFormat}`;
    // The VM will update the Model name to a fresh name
    vmModel.name = modelName;
    await vm.addModel(vmModel);
    console.log('Model saved');
}