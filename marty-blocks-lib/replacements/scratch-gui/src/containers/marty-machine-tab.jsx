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
import fileUploadIcon from "../components/action-menu/icon--file-upload.svg";
import addNewIcon from "../components/action-menu/icon--plus.svg";
import helpIcon from "../lib/assets/icon--tutorials.svg";

import MartyMachineModelEditor from "./marty-machine-model-editor.jsx";

import errorBoundaryHOC from "../lib/error-boundary-hoc.jsx";
import DragConstants from "../lib/drag-constants";
import downloadBlob from "../lib/download-blob";

import { connect } from "react-redux";

import { setRestore } from "../reducers/restore-deletion";
import Modal from "./modal.jsx";
import WrappedTeachableMachineUrlModal from "../components/teachable-machine-url-modal/teachable-machine-url-modal.jsx";
import WrappedMartyMachineNewModelConfirmationModal from "../components/marty-machine-new-model-confirmation-modal/marty-machine-new-model-confirmation-modal.jsx";
import { activateDeck } from "../reducers/cards.js";

const TUTORIALS_COOKIE = "ROBOTICAL_MARTYBLOCKS_hasSeenTutorials";

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
            "confirmDialogForNewModel"
        ]);

        // console.debug("MartyMachineTab stored model:", props.vm.editingTarget.sprite.models[0]);
        // console.debug("MartyMachineTab modelType:", props.vm.editingTarget.sprite.models[0]?.modelType);
        const modelToLoad = {
            modelType: martyMachine.currentModel?.modelType || props.vm.editingTarget.sprite.models[0]?.modelType || "image-device",// "image-device" or "image-marty" or "audio" or "saved-model" 
            isModelLoaded: !martyMachine.currentModel && !!props.vm.editingTarget.sprite.models[0],
            modelName: martyMachine.currentModel?.name || props.vm.editingTarget.sprite.models[0]?.name || "New Model",
            MLModel: martyMachine.currentModel || props.vm.editingTarget.sprite.models[0]?.MLModel || martyMachine.getNewModelInstance()
        };
        console.debug("modelToLoad", modelToLoad)

        this.state = {
            selectedModelIndex: 0,
            modelType: modelToLoad.modelType,
            isModelLoaded: modelToLoad.isModelLoaded,
            modelName: modelToLoad.modelName,
            loadTMModelModalVisible: false,
            newModelConfirmationModalVisible: false,
            newModelModelType: null
        };
        if (martyMachine.currentModel) {
            martyMachine.currentModel.name = modelToLoad.modelName;
        }
        this.model = modelToLoad.MLModel;
    }

    componentDidMount() {
        mv2Interface.sessionDbs?.MachineLearning.startSession();
        this.shouldShowTutorialsCard();
        const sprite = vm.editingTarget.sprite;
        const areThereSavedModels = sprite.models && sprite.models.length > 0;
        if (areThereSavedModels) {
            this.setState({ modelType: sprite.models[0].modelType });
        }
    }

    componentWillUnmount() {
        mv2Interface.sessionDbs?.MachineLearning.endSession();
    }

    shouldShowTutorialsCard() {
        const MAX_TUTORIALS_COUNT = 10000; // we essentially always show the tutorials card
        // we check to see if the user has seen the tutorials by checking the localStorage
        // if the user has never seen the tutorials card, show it
        // if the user has seen the tutorials card less than MAX_TUTORIALS_COUNT times, show it
        // set a cookie to indicate that the user has seen the tutorials card
        // increment the counter

        const hasSeenTutorials = localStorage.getItem(TUTORIALS_COOKIE);
        if (hasSeenTutorials === null) {
            localStorage.setItem(TUTORIALS_COOKIE, 1);
            return this.props.showTutorialCard();
        }
        const hasSeenTutorialsCount = parseInt(hasSeenTutorials);
        if (hasSeenTutorialsCount < MAX_TUTORIALS_COUNT) {
            localStorage.setItem(TUTORIALS_COOKIE, hasSeenTutorialsCount + 1);
            return this.props.showTutorialCard();
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
        console.log("setting isModelLoaded to true in handleSelectModel")
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
            newModelConfirmationModalVisible: false,
            newModelModelType: null
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
        martyMachine.cleanupAfterSave();
        this.setState({ modelType: modelType, isModelLoaded: false });
        console.log("setting isModelLoaded to false in marty-machine-tab")
        this.model = martyMachine.getNewModelInstance(modelType);
    };

    confirmDialogForNewModel = (modelType) => {
        this.setState({ newModelConfirmationModalVisible: true, newModelModelType: modelType });
    }

    setModelName = (newModelName) => {
        const doesExist = modelNameCheckExists(newModelName);
        if (doesExist) {
            return alert("Model name already exists, please choose another name.");
        }
        const storedModel = this.props.vm.editingTarget.sprite.models[this.state.selectedModelIndex];
        storedModel.name = newModelName;
        this.model.name = newModelName;
        this.setState({ modelName: newModelName });
    }

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
            addNewModel: {
                defaultMessage: "Add New Model",
                description: "Button to add a new model",
                id: "gui.martyMachineTab.addNew",
            },
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
            tutorials: {
                defaultMessage: "Tutorials",
                description: "Button to open the tutorials page",
                id: "gui.martyMachineTab.tutorials",
            }
        });


        let contentJSX = <MartyMachineModelEditor
            key={this.state.modelName + this.state.modelType}
            modelIndex={this.state.selectedModelIndex}
            model={this.model}
            setModelName={(newModelName) => this.setModelName(newModelName)}
            onNewModel={this.handleNewModel}
            modelType={this.state.modelType}
            modelName={this.state.modelName}
            isModelLoaded={this.state.isModelLoaded}
        />;

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
                {this.state.newModelConfirmationModalVisible &&
                    <Modal>
                        <WrappedMartyMachineNewModelConfirmationModal
                            onBack={() => this.setState({ newModelConfirmationModalVisible: false })}
                            onProceed={() => {
                                this.setState({ newModelConfirmationModalVisible: false });
                                this.onNewModelClick(this.state.newModelModelType);
                            }}
                        />
                    </Modal>
                }
                <AssetPanel
                    buttons={[
                        {
                            title: intl.formatMessage(messages.addNewModel),
                            img: addNewIcon,
                            onClick: (e) => e.stopPropagation(),
                        },
                        // {
                        //     title: intl.formatMessage(messages.newImageModelMarty),
                        //     img: robotIcon,
                        //     onClick: () => { },
                        // },
                        {
                            title: intl.formatMessage(messages.newImageModelDevice),
                            img: imageIcon,
                            onClick: () => this.confirmDialogForNewModel("image-device"),
                        },
                        {
                            title: intl.formatMessage(messages.newAudioModel),
                            img: audioIcon,
                            onClick: () => this.confirmDialogForNewModel("audio"),
                        },
                        {
                            title: intl.formatMessage(messages.loadTMModel),
                            img: fileUploadIcon,
                            onClick: () => this.setState({ loadTMModelModalVisible: true }),
                        },
                        {
                            title: intl.formatMessage(messages.tutorials),
                            img: helpIcon,
                            onClick: () => this.props.showTutorialCard(),
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
    scratchGui: state.scratchGui,
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
    showTutorialCard: () => {
        dispatch(activateDeck("mm-create-model"));
    }
});

export default errorBoundaryHOC("Machine Learning Tab")(
    injectIntl(connect(mapStateToProps, mapDispatchToProps)(MartyMachineTab))
);



