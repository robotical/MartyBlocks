import PropTypes from "prop-types";
import React from "react";
import bindAll from "lodash.bindall";
import { defineMessages, intlShape, injectIntl } from "react-intl";
import VM from "scratch-vm";

import AssetPanel from "../components/asset-panel/asset-panel.jsx";
import audioIcon from "../components/asset-panel/icon--audio.svg";
import imageIcon from "../components/asset-panel/icon--image.svg";
import robotIcon from "../components/asset-panel/icon--robot.svg";
import fileUploadIcon from "../components/action-menu/icon--file-upload.svg";

import MartyMachineModelEditor from "./marty-machine-model-editor.jsx";

import errorBoundaryHOC from "../lib/error-boundary-hoc.jsx";
import DragConstants from "../lib/drag-constants";
import downloadBlob from "../lib/download-blob";

import { connect } from "react-redux";

import {
    closeAudioLibrary,
    openAudioLibrary,
    openAudioRecorder,
} from "../reducers/modals";

import { activateTab, COSTUMES_TAB_INDEX } from "../reducers/editor-tab";

import { setRestore } from "../reducers/restore-deletion";
import { showStandardAlert, closeAlertWithId } from "../reducers/alerts";

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
        ]);
        this.state = { 
            selectedModelIndex: 0,
            display_content: "image-device",// "image-device" or "image-marty" or "audio" or "saved-model" 
        };
        this.model = martyMachine.getNewModelInstance();
    }

    componentDidMount() {
        const sprite = vm.editingTarget.sprite;
        const areThereSavedModels = sprite.martyMachineModels && sprite.martyMachineModels.length > 0;
        if (areThereSavedModels) {
            this.setState({ display_content: "saved-model" });
        }
    }


    componentWillReceiveProps(nextProps) {
        const { editingTarget, sprites, stage } = nextProps;

        const target =
            editingTarget && sprites[editingTarget]
                ? sprites[editingTarget]
                : stage;
        if (!target || !target.sounds) {
            return;
        }

        // If switching editing targets, reset the sound index
        if (this.props.editingTarget !== editingTarget) {
            this.setState({ selectedModelIndex: 0 });
        } else if (this.state.selectedModelIndex > target.sounds.length - 1) {
            this.setState({
                selectedModelIndex: Math.max(target.sounds.length - 1, 0),
            });
        }
    }

    handleSelectModel(modelIndex) {
        this.setState({ selectedModelIndex: modelIndex });
    }

    handleDeleteModel(modelIndex) {
        const restoreFun = this.props.vm.deleteAudio(modelIndex);
        if (modelIndex >= this.state.selectedModelIndex) {
            this.setState({ selectedModelIndex: Math.max(0, modelIndex - 1) });
        }
        this.props.dispatchUpdateRestore({ restoreFun, deletedItem: "Audio" });
    }

    handleExportModel(modelIndex) {
        const item = this.props.vm.editingTarget.sprite.martyMachineModels[modelIndex];
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
        const sounds = sprite.martyMachineModels ? sprite.martyMachineModels : [];
        this.setState({ selectedModelIndex: Math.max(sounds.length - 1, 0) });
    }

    handleDrop(dropInfo) {
        if (dropInfo.dragType === DragConstants.SOUND) {
            const sprite = this.props.vm.editingTarget.sprite;
            const activeAudio = sprite.martyMachineModels[this.state.selectedModelIndex];

            this.props.vm.reorderAudio(
                this.props.vm.editingTarget.id,
                dropInfo.index,
                dropInfo.newIndex
            );

            this.setState({
                selectedModelIndex: sprite.martyMachineModels.indexOf(activeAudio),
            });
        } else if (dropInfo.dragType === DragConstants.BACKPACK_COSTUME) {
            this.props.onActivateCostumesTab();
            this.props.vm.addCostume(dropInfo.payload.body, {
                name: dropInfo.payload.name,
            });
        } else if (dropInfo.dragType === DragConstants.BACKPACK_SOUND) {
            this.props.vm
                .addAudio({
                    md5: dropInfo.payload.body,
                    name: dropInfo.payload.name,
                })
                .then(this.handleNewModel);
        }
    }

    setFileInput(input) {
        this.fileInput = input;
    }

    onNewModelClick = (modelType) => {
        this.setState({ display_content: modelType });
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

        const models = sprite.martyMachineModels
            ? sprite.martyMachineModels.map((model) => ({
                url: isRtl ? imageIcon : audioIcon,
                name: model.name,
                details: "(model.sampleCount / model.rate).toFixed(2)",
                dragPayload: model,
            }))
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

        let contentJSX = <MartyMachineModelEditor modelIndex={this.state.selectedModelIndex} model={this.model} />;
        if (this.state.display_content === "image-device") {
            contentJSX = <MartyMachineModelEditor modelIndex={this.state.selectedModelIndex} model={this.model} />;
        } else if (this.state.display_content === "image-marty") {
            contentJSX = <MartyMachineModelEditor modelIndex={this.state.selectedModelIndex} model={this.model} />;
        } else if (this.state.display_content === "audio") {
            contentJSX = <MartyMachineModelEditor modelIndex={this.state.selectedModelIndex} model={this.model} />;
        } else if (this.state.display_content === "saved-model") {
            contentJSX = <div>Saved model</div>
        }


        return (
            <AssetPanel
                buttons={[
                    {
                        title: intl.formatMessage(messages.newImageModelMarty),
                        img: robotIcon,
                        onClick: () => {},
                    },
                    {
                        title: intl.formatMessage(messages.newImageModelMarty),
                        img: robotIcon,
                        onClick: () => {},
                    },
                    {
                        title: intl.formatMessage(messages.newImageModelDevice),
                        img: imageIcon,
                        onClick: () => this.onNewModelClick("image-device"),
                    },
                    {
                        title: intl.formatMessage(messages.newAudioModel),
                        img: audioIcon,
                        onClick: () => {},
                    },
                    {
                        title: intl.formatMessage(messages.loadTMModel),
                        img: fileUploadIcon,
                        onClick: () => {},
                    },
                ]}
                dragType={DragConstants.SOUND}
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
        );
    }
}

MartyMachineTab.propTypes = {
    dispatchUpdateRestore: PropTypes.func,
    editingTarget: PropTypes.string,
    intl: intlShape,
    isRtl: PropTypes.bool,
    onActivateCostumesTab: PropTypes.func.isRequired,
    onCloseImporting: PropTypes.func.isRequired,
    onNewAudioFromLibraryClick: PropTypes.func.isRequired,
    onNewAudioFromRecordingClick: PropTypes.func.isRequired,
    onRequestCloseAudioLibrary: PropTypes.func.isRequired,
    onShowImporting: PropTypes.func.isRequired,
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
    onActivateCostumesTab: () => dispatch(activateTab(COSTUMES_TAB_INDEX)),
    onNewAudioFromLibraryClick: (e) => {
        e.preventDefault();
        dispatch(openAudioLibrary());
    },
    onNewAudioFromRecordingClick: () => {
        dispatch(openAudioRecorder());
    },
    onRequestCloseAudioLibrary: () => {
        dispatch(closeAudioLibrary());
    },
    dispatchUpdateRestore: (restoreState) => {
        dispatch(setRestore(restoreState));
    },
    onCloseImporting: () => dispatch(closeAlertWithId("importingAsset")),
    onShowImporting: () => dispatch(showStandardAlert("importingAsset")),
});

export default errorBoundaryHOC("Marty Machine Tab")(
    injectIntl(connect(mapStateToProps, mapDispatchToProps)(MartyMachineTab))
);
