import PropTypes from "prop-types";
import React from "react";
import bindAll from "lodash.bindall";
import { defineMessages, intlShape, injectIntl } from "react-intl";
import VM from "scratch-vm";

import AssetPanel from "../components/asset-panel/asset-panel.jsx";
import audioIcon from "../components/asset-panel/icon--audio.svg";
import audioIconBlack from "../components/asset-panel/icon--audio-black.svg";
import imageIcon from "../components/asset-panel/icon--image.svg";
import imageIconBlack from "../components/asset-panel/icon--image-black.svg";
import robotIcon from "../components/asset-panel/icon--robot.svg";
import fileUploadIcon from "../components/action-menu/icon--file-upload.svg";

import MartyMachineModelEditor from "./marty-machine-model-editor.jsx";

import errorBoundaryHOC from "../lib/error-boundary-hoc.jsx";
import DragConstants from "../lib/drag-constants";
import downloadBlob from "../lib/download-blob";

import { connect } from "react-redux";

import { setRestore } from "../reducers/restore-deletion";
import Modal from "./modal.jsx";
import WrappedTeachableMachineUrlModal from "../components/teachable-machine-url-modal/teachable-machine-url-modal.jsx";

export const modelNameCheckExists = (name) => {
    const allTargets = vm.runtime.targets;
    let allModels = [];
    for (let targetId in allTargets) {
        allModels = allModels.concat(allTargets[targetId].sprite.models);
    }
    const allModelNames = allModels.map((model) => model.name);
    return allModelNames.includes(name);
};

function generateUniqueModelName(modelName, vmModel) {
    if (!modelNameCheckExists(modelName)) {
        vmModel.name = modelName;
        return modelName;
    }

    // Model name already exists, try to increment
    const counter = modelName[modelName.length - 1];

    // Check if the last character is a number
    if (!isNaN(counter)) {
        const newCounter = parseInt(counter) + 1;
        const newModelName = modelName.slice(0, -1) + newCounter;
        return generateUniqueModelName(newModelName, vmModel);
    } else {
        const newModelName = modelName + "1";
        return generateUniqueModelName(newModelName, vmModel);
    }
}

class MartyMachineTab extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            "handleSelectModel",
            "handleDeleteModel",
            "handleDuplicateModel",
            "handleExportModel",
            "handleNewModel",
            "handleDrop",
            "setFileInput",
            "onNewModelClick",
            "onTMModelLoaded",
        ]);

        // console.debug("MartyMachineTab stored model:", props.vm.editingTarget.sprite.models[0]);
        // console.debug("MartyMachineTab modelType:", props.vm.editingTarget.sprite.models[0]?.modelType);
        this.state = {
            selectedModelIndex: 0,
            modelType: props.vm.editingTarget.sprite.models[0]?.modelType || "image-device",// "image-device" or "image-marty" or "audio" or "saved-model" 
            isModelLoaded: !!props.vm.editingTarget.sprite.models[0],
            modelName: props.vm.editingTarget.sprite.models[0]?.name || "New Model",
        };
        this.model = props.vm.editingTarget.sprite.models[0]?.MLModel || martyMachine.getNewModelInstance();
    }

    componentDidMount() {
        const sprite = vm.editingTarget.sprite;
        const areThereSavedModels = sprite.models && sprite.models.length > 0;
        if (areThereSavedModels) {
            this.setState({ modelType: sprite.models[0].modelType });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { editingTarget, sprites, stage } = nextProps;

        const target =
            editingTarget && sprites[editingTarget]
                ? sprites[editingTarget]
                : stage;
        if (!target || !target.models) {
            return;
        }

        // If switching editing targets, reset the model index
        if (this.props.editingTarget !== editingTarget) {
            this.setState({ selectedModelIndex: 0 });
        } else if (this.state.selectedModelIndex > target.models.length - 1) {
            this.setState({
                selectedModelIndex: Math.max(target.models.length - 1, 0),
            });
        }
    }

    handleSelectModel(modelIndex) {
        this.setState({
            selectedModelIndex: modelIndex,
            isModelLoaded: true,
            modelType: this.props.vm.editingTarget.sprite.models[modelIndex].modelType,
            modelName: this.props.vm.editingTarget.sprite.models[modelIndex].name
        });
        this.model = this.props.vm.editingTarget.sprite.models[modelIndex].MLModel;
    }

    handleDeleteModel(modelIndex) {
        const restoreFun = this.props.vm.deleteModel(modelIndex);
        if (modelIndex >= this.state.selectedModelIndex) {
            this.setState({ selectedModelIndex: Math.max(0, modelIndex - 1) });
        }
        // if there are no other models, create a new one
        if (this.props.vm.editingTarget.sprite.models.length === 0) {
            this.onNewModelClick("image-device");
            this.setState({ isModelLoaded: false });
        }
        this.props.dispatchUpdateRestore({ restoreFun, deletedItem: "Model" });
    }

    handleExportModel(modelIndex) {
        const item = this.props.vm.editingTarget.sprite.models[modelIndex];
        const blob = new Blob([item.asset.data], {
            type: item.asset.assetType.contentType,
        });
        downloadBlob(`${item.name}.${item.asset.dataFormat}`, blob);
    }

    handleDuplicateModel(modelIndex) {
        this.props.vm.duplicateAudio(modelIndex).then(() => {
            this.setState({ selectedModelIndex: modelIndex + 1 });
        });
    }

    handleNewModel() {
        if (!this.props.vm.editingTarget) {
            return null;
        }
        const sprite = this.props.vm.editingTarget.sprite;
        const models = sprite.models ? sprite.models : [];
        const selectedModelIndex = Math.max(models.length - 1, 0);
        const model = models[selectedModelIndex];
        this.model = model.MLModel;
        this.setState({
            selectedModelIndex,
            isModelLoaded: true,
            modelType: model.modelType,
            modelName: model.name,
            loadTMModelModalVisible: false,
        });
    }

    onTMModelLoaded = (tmModelUrl, trainingData, modelName, modelType) => {
        const storage = vm.runtime.storage;

        const vmModel = {
            format: '',
            dataFormat: storage.DataFormat.JSON,
            modelType: modelType,
            dependencies: [null, null, trainingData],
            tmModelUrl: tmModelUrl,
            name: modelName,
        };

        generateUniqueModelName(modelName, vmModel);

        vm.addModel(vmModel).then(() => {
            console.log('Model saved');
            this.handleNewModel();
        });
    }
    handleDrop(dropInfo) {
        if (dropInfo.dragType === DragConstants.MODEL) {
            const sprite = this.props.vm.editingTarget.sprite;
            const activeModel = sprite.models[this.state.selectedModelIndex];

            this.props.vm.reorderModel(
                this.props.vm.editingTarget.id,
                dropInfo.index,
                dropInfo.newIndex
            );

            this.setState({
                selectedModelIndex: sprite.models.indexOf(activeModel),
            });
        }
    }

    setFileInput(input) {
        this.fileInput = input;
    }

    onNewModelClick = (modelType) => {
        this.setState({ modelType: modelType, isModelLoaded: false });
        this.model = martyMachine.getNewModelInstance(modelType);
    };

    render() {
        const {
            dispatchUpdateRestore, // eslint-disable-line no-unused-vars
            intl,
            isRtl,
            vm,
        } = this.props;

        if (!vm.editingTarget) {
            return null;
        }

        const sprite = vm.editingTarget.sprite;

        const models = sprite.models
            ? sprite.models.map((model) => {
                // console.log("model", model);
                return ({
                    url: model.modelType === 'audio' ? audioIconBlack : imageIconBlack,
                    name: model.name,
                    details: model.modelType,
                    dragPayload: model,
                })
            })
            : [];

        const messages = defineMessages({
            newImageModelMarty: {
                defaultMessage: "New Image Model (Marty)",
                description:
                    "Button to create a new image model using the Marty Camera",
                id: "gui.martyMachineTab.newImageModelMarty",
            },
            newImageModelDevice: {
                defaultMessage: "New Image Model (Device)",
                description: "Button to create a new image model using the device camera",
                id: "gui.martyMachineTab.newImageModelDevice",
            },
            newAudioModel: {
                defaultMessage: "New Audio Model",
                description: "Button to create a new sound model",
                id: "gui.martyMachineTab.newAudioModel",
            },
            loadTMModel: {
                defaultMessage: "Load TM Model",
                description: "Button to load a Teachable Machine model",
                id: "gui.martyMachineTab.loadTMModel",
            },
        });

        let contentJSX = null;
        if (this.state.modelType === "image-device") {
            contentJSX = <MartyMachineModelEditor
                key={this.state.modelName + this.state.modelType}
                modelIndex={this.state.selectedModelIndex}
                model={this.model}
                onNewModel={this.handleNewModel}
                modelType={this.state.modelType}
                modelName={this.state.modelName}
                isModelLoaded={this.state.isModelLoaded}
            />;
        } else if (this.state.modelType === "image-marty") {
            contentJSX = null;
        } else if (this.state.modelType === "audio") {
            contentJSX = <MartyMachineModelEditor
                key={this.state.modelName + this.state.modelType}
                modelIndex={this.state.selectedModelIndex}
                model={this.model}
                onNewModel={this.handleNewModel}
                modelType={this.state.modelType}
                modelName={this.state.modelName}
                isModelLoaded={this.state.isModelLoaded}
            />;
        }

        return (
            <>
                {this.state.loadTMModelModalVisible &&
                    <Modal>
                        <WrappedTeachableMachineUrlModal
                            onModelLoaded={this.onTMModelLoaded}
                            onBack={() => this.setState({ loadTMModelModalVisible: false })}
                        />
                    </Modal>
                }
                <AssetPanel
                    buttons={[
                        {
                            title: intl.formatMessage(messages.newImageModelDevice),
                            img: imageIcon,
                            onClick: () => this.onNewModelClick("image-device"),
                        },
                        {
                            title: intl.formatMessage(messages.newImageModelMarty),
                            img: robotIcon,
                            onClick: () => { },
                        },
                        {
                            title: intl.formatMessage(messages.newImageModelDevice),
                            img: imageIcon,
                            onClick: () => this.onNewModelClick("image-device"),
                        },
                        {
                            title: intl.formatMessage(messages.newAudioModel),
                            img: audioIcon,
                            onClick: () => this.onNewModelClick("audio"),
                        },
                        {
                            title: intl.formatMessage(messages.loadTMModel),
                            img: fileUploadIcon,
                            onClick: () => this.setState({ loadTMModelModalVisible: true }),
                        },
                    ]}
                    dragType={DragConstants.MODEL}
                    isRtl={isRtl}
                    items={models}
                    selectedItemIndex={this.state.selectedModelIndex}
                    onDeleteClick={this.handleDeleteModel}
                    onDrop={this.handleDrop}
                    onDuplicateClick={this.handleDuplicateModel}
                    onExportClick={this.handleExportModel}
                    onItemClick={this.handleSelectModel}
                >
                    {contentJSX}
                </AssetPanel>
            </>
        );
    }
}

MartyMachineTab.propTypes = {
    dispatchUpdateRestore: PropTypes.func,
    editingTarget: PropTypes.string,
    intl: intlShape,
    isRtl: PropTypes.bool,
    soundLibraryVisible: PropTypes.bool,
    soundRecorderVisible: PropTypes.bool,
    sprites: PropTypes.shape({
        id: PropTypes.shape({
            sounds: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                })
            ),
        }),
    }),
    stage: PropTypes.shape({
        sounds: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
            })
        ),
    }),
    vm: PropTypes.instanceOf(VM).isRequired,
};

const mapStateToProps = (state) => ({
    editingTarget: state.scratchGui.targets.editingTarget,
    isRtl: state.locales.isRtl,
    sprites: state.scratchGui.targets.sprites,
    stage: state.scratchGui.targets.stage,
    soundLibraryVisible: state.scratchGui.modals.soundLibrary,
    soundRecorderVisible: state.scratchGui.modals.soundRecorder,
});

const mapDispatchToProps = (dispatch) => ({
    dispatchUpdateRestore: (restoreState) => {
        dispatch(setRestore(restoreState));
    },
});

export default errorBoundaryHOC("Marty Machine Tab")(
    injectIntl(connect(mapStateToProps, mapDispatchToProps)(MartyMachineTab))
);



