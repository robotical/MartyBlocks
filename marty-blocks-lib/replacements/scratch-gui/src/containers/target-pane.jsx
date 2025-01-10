import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';

import {
    openSpriteLibrary,
    closeSpriteLibrary,
    closeDeviceLibrary,
    openDeviceLibrary
} from '../reducers/modals';
import { activateTab, COSTUMES_TAB_INDEX, BLOCKS_TAB_INDEX } from '../reducers/editor-tab';
import { setReceivedBlocks } from '../reducers/hovered-target';
import { showStandardAlert, closeAlertWithId } from '../reducers/alerts';
import { setRestore } from '../reducers/restore-deletion';
import DragConstants from '../lib/drag-constants';
import TargetPaneComponent from '../components/target-pane/target-pane.jsx';
import { BLOCKS_DEFAULT_SCALE } from '../lib/layout-constants';
import spriteLibraryContent from '../lib/libraries/sprites.json';
import deviceLibraryContent from '../lib/libraries/devices.json';
import { handleFileUpload, spriteUpload } from '../lib/file-uploader.js';
import sharedMessages from '../lib/shared-messages';
import { emptySprite } from '../lib/empty-assets';
import { highlightTarget } from '../reducers/targets';
import { fetchSprite, fetchCode } from '../lib/backpack-api';
import randomizeSpritePosition from '../lib/randomize-sprite-position';
import downloadBlob from '../lib/download-blob';
import target_types_enum from "../lib/target-types-enum";

class TargetPane extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleActivateBlocksTab',
            'handleBlockDragEnd',
            'handleChangeSpriteRotationStyle',
            'handleChangeSpriteDirection',
            'handleChangeSpriteName',
            'handleChangeSpriteSize',
            'handleChangeSpriteVisibility',
            'handleChangeSpriteX',
            'handleChangeSpriteY',
            'handleDeleteSprite',
            'handleDrop',
            'handleDuplicateSprite',
            'handleExportSprite',
            'handleNewSprite',
            'handleSelectSprite',
            'handleSurpriseSpriteClick',
            'handlePaintSpriteClick',
            'handleFileUploadClick',
            'handleSpriteUpload',
            'setFileInput',
            'handleNewDeviceByConnection',
            'handleDeleteDevice'
        ]);
    }
    componentDidMount() {
        this.props.vm.addListener('BLOCK_DRAG_END', this.handleBlockDragEnd);

        setTimeout(() => {
            const devicesArray = deviceLibraryContent;
            const connectedRaftsObject = window.applicationManager?.connectedRafts || {};
            for (const raftId in connectedRaftsObject) {
                const raft = connectedRaftsObject[raftId];
                const connectedRaftType = raft.type;
                const deviceToBeConnected = devicesArray.find(device => device.raftType === connectedRaftType);
                if (!deviceToBeConnected) {
                    return;
                }
                // if the device is already connected, dont add it again
                if (window.raftManager.raftIdAndDeviceIdMap[raftId]) {
                    return;
                }
                // deviceToBeConnected.name = raft.getFriendlyName();

                // before adding the device, check if there is an already loaded device that's available for connection (i.e. not connected)
                let wasDeviceAlreadyLoaded = false;
                for (const deviceId in this.props.devices) {
                    const device = this.props.devices[deviceId];
                    if (device.raftType === connectedRaftType && !window.raftManager.raftIdAndDeviceIdMap[raftId]) {
                        // this type of device is already loaded and is not connected
                        // so we can just assign the connection to it
                        window.raftManager.updateDeviceIdRaftIdMap(deviceId, raft.id);
                        const connectionButtonState = window.raftManager.getConnectionButtonState(deviceId);
                        window.raftManager.setupDisconnectSubscription(raft, (raft_) => {
                            if (connectionButtonState) {
                                connectionButtonState.setState({
                                    isConnected: false
                                });
                                try {
                                    connectionButtonState.props.onChangeDeviceName(raft.type);
                                } catch (e) {
                                    console.warn("Device was removed before name could be changed");
                                }
                            }
                        });
                        if (connectionButtonState) {
                            connectionButtonState.setState({
                                isConnected: true
                            });
                            connectionButtonState.props.onChangeDeviceName(raft.getFriendlyName() || "Unknown Name");
                        }
                        wasDeviceAlreadyLoaded = true;
                    }
                }

                if (!wasDeviceAlreadyLoaded) {
                    this.props.vm.addDevice(JSON.stringify(deviceToBeConnected)).then(async (res) => {
                        const editingTarget = this.props.editingTarget;
                        window.raftManager.updateDeviceIdRaftIdMap(editingTarget, raft.id);
                        await new Promise(resolve => setTimeout(resolve, 800)); // making sure the button for that device is rendered
                        const deviceId = editingTarget;
                        const connectionButtonState = window.raftManager.getConnectionButtonState(deviceId);
                        window.raftManager.setupDisconnectSubscription(raft, (raft_) => {
                            if (connectionButtonState) {
                                connectionButtonState.setState({
                                    isConnected: false
                                });
                                try {
                                    connectionButtonState.props.onChangeDeviceName(raft.type);
                                } catch (e) {
                                    console.warn("Device was removed before name could be changed");
                                }
                            }
                        });
                        console.log("connectionButtonState", editingTarget);
                        if (connectionButtonState) {
                            connectionButtonState.setState({
                                isConnected: true
                            });
                            connectionButtonState.props.onChangeDeviceName(raft.getFriendlyName() || "Unknown Name");
                        }
                    });
                }
            }
            this.handleActivateBlocksTab();
        }, 5000);
    }
    componentWillUnmount() {
        window.raftManager.clearAllSubscriptions();
        this.props.vm.removeListener('BLOCK_DRAG_END', this.handleBlockDragEnd);
    }
    handleChangeSpriteDirection(direction) {
        this.props.vm.postSpriteInfo({ direction });
    }
    handleChangeSpriteRotationStyle(rotationStyle) {
        this.props.vm.postSpriteInfo({ rotationStyle });
    }
    handleChangeSpriteName(name) {
        this.props.vm.renameSprite(this.props.editingTarget, name);
    }
    handleChangeSpriteSize(size) {
        this.props.vm.postSpriteInfo({ size });
    }
    handleChangeSpriteVisibility(visible) {
        this.props.vm.postSpriteInfo({ visible });
    }
    handleChangeSpriteX(x) {
        this.props.vm.postSpriteInfo({ x });
    }
    handleChangeSpriteY(y) {
        this.props.vm.postSpriteInfo({ y });
    }
    handleDeleteSprite(id) {
        const areTheySure = confirm('If you delete this sprite, all the blocks connected to it will disappear too. Are you sure you want to do that?')
        if (!areTheySure) return;
        const restoreSprite = this.props.vm.deleteSprite(id);
        const restoreFun = () => restoreSprite().then(this.handleActivateBlocksTab);

        this.props.dispatchUpdateRestore({
            restoreFun: restoreFun,
            deletedItem: 'Sprite'
        });
    }
    handleDeleteDevice(id) {
        const areTheySure = confirm('If you delete this device, all the blocks connected to it will disappear as well, and will get disconnected from the device. Are you sure you want to do that?');
        if (!areTheySure) return;
        const restoreDevice = this.props.vm.deleteDevice(id);
        const restoreFun = () => restoreDevice().then(this.handleActivateBlocksTab);

        this.props.dispatchUpdateRestore({
            restoreFun: restoreFun,
            deletedItem: 'Device'
        });
        const raftId = window.raftManager.raftIdAndDeviceIdMap[id];
        if (raftId) {
            window.applicationManager.disconnectFromRaft(raftId);
        }
    }
    handleDuplicateSprite(id) {
        this.props.vm.duplicateSprite(id);
    }

    handleSelectSprite(target) {
        this.props.vm.setEditingTarget(target.id);
        // making sure we highlight the target only if it's a sprite
        if ((this.props.stage && target.id !== this.props.stage.id) && target.targetType !== target_types_enum.device) {
            this.props.onHighlightTarget(target.id);
        }

        // if the target is a device, we need to highlight the device visually (send an LED command or something like that)
        if (target.targetType === target_types_enum.device) {
            window.raftManager.highlightDevice(target.id);
        }
    }
    handleExportSprite(id) {
        const spriteName = this.props.vm.runtime.getTargetById(id).getName();
        const saveLink = document.createElement('a');
        document.body.appendChild(saveLink);

        this.props.vm.exportSprite(id).then(content => {
            downloadBlob(`${spriteName}.sprite3`, content);
        });
    }
    handleSurpriseSpriteClick() {
        const surpriseSprites = spriteLibraryContent.filter(sprite =>
            (sprite.tags.indexOf('letters') === -1) && (sprite.tags.indexOf('numbers') === -1)
        );
        const item = surpriseSprites[Math.floor(Math.random() * surpriseSprites.length)];
        randomizeSpritePosition(item);
        this.props.vm.addSprite(JSON.stringify(item))
            .then(this.handleActivateBlocksTab);
    }
    handlePaintSpriteClick() {
        const formatMessage = this.props.intl.formatMessage;
        const emptyItem = emptySprite(
            formatMessage(sharedMessages.sprite, { index: 1 }),
            formatMessage(sharedMessages.pop),
            formatMessage(sharedMessages.costume, { index: 1 })
        );
        this.props.vm.addSprite(JSON.stringify(emptyItem)).then(() => {
            setTimeout(() => { // Wait for targets update to propagate before tab switching
                this.props.onActivateTab(COSTUMES_TAB_INDEX);
            });
        });
    }
    handleActivateBlocksTab() {
        this.props.onActivateTab(BLOCKS_TAB_INDEX);
    }
    handleNewSprite(spriteJSONString) {
        return this.props.vm.addSprite(spriteJSONString)
            .then(this.handleActivateBlocksTab);
    }
    handleFileUploadClick() {
        this.fileInput.click();
    }
    handleSpriteUpload(e) {
        const storage = this.props.vm.runtime.storage;
        this.props.onShowImporting();
        handleFileUpload(e.target, (buffer, fileType, fileName, fileIndex, fileCount) => {
            spriteUpload(buffer, fileType, fileName, storage, newSprite => {
                this.handleNewSprite(newSprite)
                    .then(() => {
                        if (fileIndex === fileCount - 1) {
                            this.props.onCloseImporting();
                        }
                    })
                    .catch(this.props.onCloseImporting);
            }, this.props.onCloseImporting);
        }, this.props.onCloseImporting);
    }
    setFileInput(input) {
        this.fileInput = input;
    }
    handleBlockDragEnd(blocks) {
        if (this.props.hoveredTarget.sprite && this.props.hoveredTarget.sprite !== this.props.editingTarget) {
            this.shareBlocks(blocks, this.props.hoveredTarget.sprite, this.props.editingTarget);
            this.props.onReceivedBlocks(true);
        }
    }
    shareBlocks(blocks, targetId, optFromTargetId) {
        // Position the top-level block based on the scroll position.
        const topBlock = blocks.find(block => block.topLevel);
        if (topBlock) {
            let metrics;
            if (this.props.workspaceMetrics.targets[targetId]) {
                metrics = this.props.workspaceMetrics.targets[targetId];
            } else {
                metrics = {
                    scrollX: 0,
                    scrollY: 0,
                    scale: BLOCKS_DEFAULT_SCALE
                };
            }

            // Determine position of the top-level block based on the target's workspace metrics.
            const { scrollX, scrollY, scale } = metrics;
            const posY = -scrollY + 30;
            let posX;
            if (this.props.isRtl) {
                posX = scrollX + 30;
            } else {
                posX = -scrollX + 30;
            }

            // Actually apply the position!
            topBlock.x = posX / scale;
            topBlock.y = posY / scale;
        }

        return this.props.vm.shareBlocksToTarget(blocks, targetId, optFromTargetId);
    }
    handleDrop(dragInfo) {
        const { sprite: targetId } = this.props.hoveredTarget;
        if (dragInfo.dragType === DragConstants.SPRITE) {
            // Add one to both new and target index because we are not counting/moving the stage
            this.props.vm.reorderTarget(dragInfo.index + 1, dragInfo.newIndex + 1);
        } else if (dragInfo.dragType === DragConstants.BACKPACK_SPRITE) {
            // TODO storage does not have a way of loading zips right now, and may never need it.
            // So for now just grab the zip manually.
            fetchSprite(dragInfo.payload.bodyUrl)
                .then(sprite3Zip => this.props.vm.addSprite(sprite3Zip));
        } else if (targetId) {
            // Something is being dragged over one of the sprite tiles or the backdrop.
            // Dropping assets like sounds and costumes duplicate the asset on the
            // hovered target. Shared costumes also become the current costume on that target.
            // However, dropping does not switch the editing target or activate that editor tab.
            // This is based on 2.0 behavior, but seems like it keeps confusing switching to a minimum.
            // it allows the user to share multiple things without switching back and forth.
            if (dragInfo.dragType === DragConstants.COSTUME) {
                this.props.vm.shareCostumeToTarget(dragInfo.index, targetId);
            } else if (targetId && dragInfo.dragType === DragConstants.SOUND) {
                this.props.vm.shareSoundToTarget(dragInfo.index, targetId);
            } else if (dragInfo.dragType === DragConstants.BACKPACK_COSTUME) {
                // In scratch 2, this only creates a new sprite from the costume.
                // We may be able to handle both kinds of drops, depending on where
                // the drop happens. For now, just add the costume.
                this.props.vm.addCostume(dragInfo.payload.body, {
                    name: dragInfo.payload.name
                }, targetId);
            } else if (dragInfo.dragType === DragConstants.BACKPACK_SOUND) {
                this.props.vm.addSound({
                    md5: dragInfo.payload.body,
                    name: dragInfo.payload.name
                }, targetId);
            } else if (dragInfo.dragType === DragConstants.BACKPACK_CODE) {
                fetchCode(dragInfo.payload.bodyUrl)
                    .then(blocks => this.shareBlocks(blocks, targetId))
                    .then(() => this.props.vm.refreshWorkspace());
            }
        }
    }
    handleNewDeviceByConnection() {
        window.raftManager.connect(
            (raft) => { // on connect cb
                const devicesArray = deviceLibraryContent;
                const connectedRaftType = raft.type;
                const connectedDevice = devicesArray.find(device => device.raftType === connectedRaftType);
                this.props.vm.addDevice(JSON.stringify(connectedDevice)).then(() => {
                    window.raftManager.updateDeviceIdRaftIdMap(this.props.editingTarget, raft.id);
                    try {
                        window.raftManager.getConnectionButtonState(this.props.editingTarget).setState({
                            isConnected: true
                        });
                        window.raftManager.getConnectionButtonState(this.props.editingTarget).props.onChangeDeviceName(raft.getFriendlyName());
                    } catch (e) {
                        console.warn("Device was removed before name could be changed");
                    }
                    this.handleActivateBlocksTab();
                });
            },
            (raft) => { // on disconnect cb
                try {
                    window.raftManager.getConnectionButtonState(this.props.editingTarget).setState({
                        isConnected: false
                    });
                    window.raftManager.getConnectionButtonState(this.props.editingTarget).props.onChangeDeviceName(raft.type);
                } catch (e) {
                    console.warn("Device was removed before name could be changed");
                }
                this.handleActivateBlocksTab();
            },
        );
    }
    render() {
        /* eslint-disable no-unused-vars */
        const {
            dispatchUpdateRestore,
            isRtl,
            onActivateTab,
            onCloseImporting,
            onHighlightTarget,
            onReceivedBlocks,
            onShowImporting,
            workspaceMetrics,
            ...componentProps
        } = this.props;
        /* eslint-enable no-unused-vars */
        return (
            <TargetPaneComponent
                {...componentProps}
                fileInputRef={this.setFileInput}
                onActivateBlocksTab={this.handleActivateBlocksTab}
                onAddDeviceByConnecting={this.handleNewDeviceByConnection}
                onChangeSpriteDirection={this.handleChangeSpriteDirection}
                onChangeSpriteName={this.handleChangeSpriteName}
                onChangeSpriteRotationStyle={this.handleChangeSpriteRotationStyle}
                onChangeSpriteSize={this.handleChangeSpriteSize}
                onChangeSpriteVisibility={this.handleChangeSpriteVisibility}
                onChangeSpriteX={this.handleChangeSpriteX}
                onChangeSpriteY={this.handleChangeSpriteY}
                onDeleteSprite={this.handleDeleteSprite}
                onDeleteDevice={this.handleDeleteDevice}
                onDrop={this.handleDrop}
                onDuplicateSprite={this.handleDuplicateSprite}
                onExportSprite={this.handleExportSprite}
                onFileUploadClick={this.handleFileUploadClick}
                onPaintSpriteClick={this.handlePaintSpriteClick}
                onSelectSprite={this.handleSelectSprite}
                onSpriteUpload={this.handleSpriteUpload}
                onSurpriseSpriteClick={this.handleSurpriseSpriteClick}
            />
        );
    }
}

const {
    onSelectSprite, // eslint-disable-line no-unused-vars
    onActivateBlocksTab, // eslint-disable-line no-unused-vars
    ...targetPaneProps
} = TargetPaneComponent.propTypes;

TargetPane.propTypes = {
    intl: intlShape.isRequired,
    onCloseImporting: PropTypes.func,
    onShowImporting: PropTypes.func,
    ...targetPaneProps
};

const mapStateToProps = state => ({
    editingTarget: state.scratchGui.targets.editingTarget,
    hoveredTarget: state.scratchGui.hoveredTarget,
    isRtl: state.locales.isRtl,
    spriteLibraryVisible: state.scratchGui.modals.spriteLibrary,
    deviceLibraryVisible: state.scratchGui.modals.deviceLibrary,
    sprites: state.scratchGui.targets.sprites,
    devices: state.scratchGui.targets.devices,
    stage: state.scratchGui.targets.stage,
    raiseSprites: state.scratchGui.blockDrag,
    workspaceMetrics: state.scratchGui.workspaceMetrics
});

const mapDispatchToProps = dispatch => ({
    onNewSpriteClick: e => {
        e.preventDefault();
        dispatch(openSpriteLibrary());
    },
    onNewDeviceClick: e => {
        e.preventDefault();
        dispatch(openDeviceLibrary());
    },
    onRequestCloseSpriteLibrary: () => {
        dispatch(closeSpriteLibrary());
    },
    onRequestCloseDeviceLibrary: () => {
        dispatch(closeDeviceLibrary());
    },
    onActivateTab: tabIndex => {
        dispatch(activateTab(tabIndex));
    },
    onReceivedBlocks: receivedBlocks => {
        dispatch(setReceivedBlocks(receivedBlocks));
    },
    dispatchUpdateRestore: restoreState => {
        dispatch(setRestore(restoreState));
    },
    onHighlightTarget: id => {
        dispatch(highlightTarget(id));
    },
    onCloseImporting: () => dispatch(closeAlertWithId('importingAsset')),
    onShowImporting: () => dispatch(showStandardAlert('importingAsset'))
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(TargetPane));
