import PropTypes from 'prop-types';
import React from 'react';

import VM from 'scratch-vm';

import SpriteLibrary from '../../containers/sprite-library.jsx';
import DeviceLibrary from '../../containers/device-library.jsx';
import SpriteSelectorComponent from '../sprite-selector/sprite-selector.jsx';
import StageSelector from '../../containers/stage-selector.jsx';
import { STAGE_DISPLAY_SIZES } from '../../lib/layout-constants';

import styles from './target-pane.css';

/*
 * Pane that contains the sprite selector, sprite info, stage selector,
 * and the new sprite, costume and backdrop buttons
 * @param {object} props Props for the component
 * @returns {React.Component} rendered component
 */
const TargetPane = ({
    editingTarget,
    fileInputRef,
    hoveredTarget,
    spriteLibraryVisible,
    deviceLibraryVisible,
    onActivateBlocksTab,
    onChangeSpriteDirection,
    onChangeSpriteName,
    onChangeSpriteRotationStyle,
    onChangeSpriteSize,
    onChangeSpriteVisibility,
    onChangeSpriteX,
    onChangeSpriteY,
    onDeleteSprite,
    onDeleteDevice,
    onDrop,
    onDuplicateSprite,
    onExportSprite,
    onFileUploadClick,
    onNewSpriteClick,
    onNewDeviceClick,
    onAddDeviceByConnecting,
    onPaintSpriteClick,
    onRequestCloseSpriteLibrary,
    onRequestCloseDeviceLibrary,
    onSelectSprite,
    onSpriteUpload,
    onSurpriseSpriteClick,
    raiseSprites,
    stage,
    stageSize,
    sprites,
    devices,
    vm,
    ...componentProps
}) => (
    <div
        className={styles.targetPane}
        {...componentProps}
    >

        <SpriteSelectorComponent
            editingTarget={editingTarget}
            hoveredTarget={hoveredTarget}
            raised={raiseSprites}
            selectedId={editingTarget}
            spriteFileInput={fileInputRef}
            sprites={sprites}
            stageSize={stageSize}
            devices={devices}
            onChangeSpriteDirection={onChangeSpriteDirection}
            onChangeSpriteName={onChangeSpriteName}
            onChangeSpriteRotationStyle={onChangeSpriteRotationStyle}
            onChangeSpriteSize={onChangeSpriteSize}
            onChangeSpriteVisibility={onChangeSpriteVisibility}
            onChangeSpriteX={onChangeSpriteX}
            onChangeSpriteY={onChangeSpriteY}
            onDeleteSprite={onDeleteSprite}
            onDeleteDevice={onDeleteDevice}
            onDrop={onDrop}
            onDuplicateSprite={onDuplicateSprite}
            onExportSprite={onExportSprite}
            onFileUploadClick={onFileUploadClick}
            onNewSpriteClick={onNewSpriteClick}
            onNewDeviceClick={onNewDeviceClick}
            onAddDeviceByConnecting={onAddDeviceByConnecting}
            onPaintSpriteClick={onPaintSpriteClick}
            onSelectSprite={onSelectSprite}
            onSpriteUpload={onSpriteUpload}
            onSurpriseSpriteClick={onSurpriseSpriteClick}
        />
        <div className={styles.stageSelectorWrapper}>
            {stage.id && <StageSelector
                asset={
                    stage.costume &&
                    stage.costume.asset
                }
                backdropCount={stage.costumeCount}
                id={stage.id}
                selected={stage.id === editingTarget}
                onSelect={onSelectSprite}
            />}
            <div>
                {spriteLibraryVisible ? (
                    <SpriteLibrary
                        vm={vm}
                        onActivateBlocksTab={onActivateBlocksTab}
                        onRequestClose={onRequestCloseSpriteLibrary}
                    />
                ) : null}
            </div>
            <div>
                {deviceLibraryVisible ? (
                    <DeviceLibrary
                        vm={vm}
                        onActivateBlocksTab={onActivateBlocksTab}
                        onRequestClose={onRequestCloseDeviceLibrary}
                    />
                ) : null}
            </div>
        </div>
    </div>
);

const spriteShape = PropTypes.shape({
    costume: PropTypes.shape({
        // asset is defined in scratch-storage's Asset.js
        asset: PropTypes.object, // eslint-disable-line react/forbid-prop-types
        url: PropTypes.string,
        name: PropTypes.string.isRequired,
        // The following are optional because costumes uploaded from disk
        // will not have these properties available
        bitmapResolution: PropTypes.number,
        rotationCenterX: PropTypes.number,
        rotationCenterY: PropTypes.number
    }),
    costumeCount: PropTypes.number,
    direction: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    order: PropTypes.number,
    size: PropTypes.number,
    visibility: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number
});

TargetPane.propTypes = {
    editingTarget: PropTypes.string,
    extensionLibraryVisible: PropTypes.bool,
    fileInputRef: PropTypes.func,
    hoveredTarget: PropTypes.shape({
        hoveredSprite: PropTypes.string,
        receivedBlocks: PropTypes.bool
    }),
    onActivateBlocksTab: PropTypes.func.isRequired,
    onChangeSpriteDirection: PropTypes.func,
    onChangeSpriteName: PropTypes.func,
    onChangeSpriteRotationStyle: PropTypes.func,
    onChangeSpriteSize: PropTypes.func,
    onChangeSpriteVisibility: PropTypes.func,
    onChangeSpriteX: PropTypes.func,
    onChangeSpriteY: PropTypes.func,
    onDeleteSprite: PropTypes.func,
    onDeleteDevice: PropTypes.func,
    onDrop: PropTypes.func,
    onDuplicateSprite: PropTypes.func,
    onExportSprite: PropTypes.func,
    onFileUploadClick: PropTypes.func,
    onNewSpriteClick: PropTypes.func,
    onNewDeviceClick: PropTypes.func,
    onAddDeviceByConnecting: PropTypes.func,
    onPaintSpriteClick: PropTypes.func,
    onRequestCloseExtensionLibrary: PropTypes.func,
    onRequestCloseSpriteLibrary: PropTypes.func,
    onRequestCloseDeviceLibrary: PropTypes.func,
    onSelectSprite: PropTypes.func,
    onSpriteUpload: PropTypes.func,
    onSurpriseSpriteClick: PropTypes.func,
    raiseSprites: PropTypes.bool,
    spriteLibraryVisible: PropTypes.bool,
    deviceLibraryVisible: PropTypes.bool,
    sprites: PropTypes.objectOf(spriteShape),
    devices: spriteShape,
    stage: spriteShape,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    vm: PropTypes.instanceOf(VM)
};

export default TargetPane;
