import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import Box from '../box/box.jsx';
import SpriteInfo from '../../containers/sprite-info.jsx';
import SpriteList from './sprite-list.jsx';
import ActionMenu from '../action-menu/action-menu.jsx';
import { STAGE_DISPLAY_SIZES } from '../../lib/layout-constants';
import { isRtl } from 'scratch-l10n';

import styles from './sprite-selector.css';

import fileUploadIcon from '../action-menu/icon--file-upload.svg';
import paintIcon from '../action-menu/icon--paint.svg';
import spriteIcon from '../action-menu/icon--sprite.svg';
import deviceIcon from '../action-menu/icon--device.svg';
import connectToDeviceIcon from '../action-menu/icon--connect-to-device.svg';
import surpriseIcon from '../action-menu/icon--surprise.svg';
import searchIcon from '../action-menu/icon--search.svg';
import DeviceList from "./device-list.jsx";

const messages = defineMessages({
    addSpriteFromLibrary: {
        id: 'gui.spriteSelector.addSpriteFromLibrary',
        description: 'Button to add a sprite in the target pane from library',
        defaultMessage: 'Choose a Sprite'
    },
    addSpriteFromPaint: {
        id: 'gui.spriteSelector.addSpriteFromPaint',
        description: 'Button to add a sprite in the target pane from paint',
        defaultMessage: 'Paint'
    },
    addSpriteFromSurprise: {
        id: 'gui.spriteSelector.addSpriteFromSurprise',
        description: 'Button to add a random sprite in the target pane',
        defaultMessage: 'Surprise'
    },
    addSpriteFromFile: {
        id: 'gui.spriteSelector.addSpriteFromFile',
        description: 'Button to add a sprite in the target pane from file',
        defaultMessage: 'Upload Sprite'
    },
    addDeviceByConnecting: {
        id: 'gui.deviceSelector.addDeviceByConnecting',
        description: 'Button to add a device in the target pane after connecting to one',
        defaultMessage: 'Connect to a Device'
    },
    addDeviceFromLibrary: {
        id: 'gui.deviceSelector.addDeviceFromLibrary',
        description: 'Button to add a device in the target pane from library',
        defaultMessage: 'Choose a Device'
    },
});

const SpriteSelectorComponent = function (props) {
    const {
        editingTarget,
        hoveredTarget,
        intl,
        onChangeSpriteDirection,
        onChangeSpriteName,
        onChangeSpriteRotationStyle,
        onChangeSpriteSize,
        onChangeSpriteVisibility,
        onChangeSpriteX,
        onChangeSpriteY,
        onDrop,
        onDeleteSprite,
        onDeleteDevice,
        onDuplicateSprite,
        onExportSprite,
        onFileUploadClick,
        onNewSpriteClick,
        onNewDeviceClick,
        onAddDeviceByConnecting,
        onPaintSpriteClick,
        onSelectSprite,
        onSpriteUpload,
        onSurpriseSpriteClick,
        raised,
        selectedId,
        spriteFileInput,
        sprites,
        devices,
        stageSize,
        ...componentProps
    } = props;
    let selectedItem = sprites[selectedId];
    let isDevice = false;
    if (!selectedItem) {
        selectedItem = devices[selectedId];
        isDevice = !!selectedItem;
    }

    let spriteInfoDisabled = false;
    for (let i = 0; i < devices.length; i++) {
        if (devices[i].id === selectedId) {
            selectedItem = devices[i];
        }
    }
    if (typeof selectedItem === "undefined" || !selectedItem.name) {
        selectedItem = {};
        spriteInfoDisabled = true;
    }

    return (
        <Box className={styles.spriteSelector} {...componentProps}>
            <SpriteInfo
                direction={selectedItem.direction}
                disabled={spriteInfoDisabled}
                name={selectedItem.name}
                rotationStyle={selectedItem.rotationStyle}
                size={selectedItem.size}
                stageSize={stageSize}
                visible={selectedItem.visible}
                x={selectedItem.x}
                y={selectedItem.y}
                onChangeDirection={onChangeSpriteDirection}
                onChangeName={isDevice ? () => console.log("name change is not allowed in a device") : onChangeSpriteName}
                onChangeRotationStyle={onChangeSpriteRotationStyle}
                onChangeSize={onChangeSpriteSize}
                onChangeVisibility={onChangeSpriteVisibility}
                onChangeX={onChangeSpriteX}
                onChangeY={onChangeSpriteY}
            />
            <div className={styles.spritesSection}>
                <div className={styles.sectionTitle}>SPRITES</div>
                <SpriteList
                    editingTarget={editingTarget}
                    hoveredTarget={hoveredTarget}
                    items={Object.keys(sprites).map((id) => sprites[id])}
                    raised={raised}
                    selectedId={selectedId}
                    onDeleteSprite={onDeleteSprite}
                    onDrop={onDrop}
                    onDuplicateSprite={onDuplicateSprite}
                    onExportSprite={onExportSprite}
                    onSelectSprite={onSelectSprite}
                />
                <ActionMenu
                    id='sprite-selector-action-menu'
                    className={styles.addButton}
                    img={spriteIcon}
                    moreButtons={[
                        {
                            title: intl.formatMessage(messages.addSpriteFromFile),
                            img: fileUploadIcon,
                            onClick: onFileUploadClick,
                            fileAccept: ".svg, .png, .jpg, .jpeg, .sprite2, .sprite3, .gif",
                            fileChange: onSpriteUpload,
                            fileInput: spriteFileInput,
                            fileMultiple: true,
                        },
                        {
                            title: intl.formatMessage(messages.addSpriteFromSurprise),
                            img: surpriseIcon,
                            onClick: onSurpriseSpriteClick, // TODO need real function for this
                        },
                        {
                            title: intl.formatMessage(messages.addSpriteFromPaint),
                            img: paintIcon,
                            onClick: onPaintSpriteClick, // TODO need real function for this
                        },
                        {
                            title: intl.formatMessage(messages.addSpriteFromLibrary),
                            img: searchIcon,
                            onClick: onNewSpriteClick,
                        },
                    ]}
                    title={intl.formatMessage(messages.addSpriteFromLibrary)}
                    tooltipPlace={isRtl(intl.locale) ? "right" : "left"}
                    onClick={onNewSpriteClick}
                />
            </div>
            <hr style={{ height: "1px", width: "100%", backgroundColor: "#d8d8d8" }} />
            <div className={styles.deviceSection}>
                <div className={styles.sectionTitle}>DEVICES</div>
                <DeviceList
                    editingTarget={editingTarget}
                    hoveredTarget={hoveredTarget}
                    items={Object.keys(devices).map((id) => devices[id])}
                    raised={raised}
                    selectedId={selectedId}
                    onChangeDeviceName={onChangeSpriteName}
                    onDeleteDevice={onDeleteDevice}
                    onDrop={onDrop}
                    onDuplicateDevice={onDuplicateSprite}
                    onExportDevice={onExportSprite}
                    onSelectDevice={onSelectSprite}
                />
                <ActionMenu
                    id='device-selector-action-menu'
                    className={styles.addButton}
                    img={deviceIcon}
                    moreButtons={[
                        {
                            title: intl.formatMessage(messages.addDeviceByConnecting),
                            img: connectToDeviceIcon,
                            onClick: onAddDeviceByConnecting,
                        },
                        {
                            title: intl.formatMessage(messages.addDeviceFromLibrary),
                            img: searchIcon,
                            onClick: onNewDeviceClick,
                        },
                    ]}
                    title={intl.formatMessage(messages.addDeviceFromLibrary)}
                    tooltipPlace={isRtl(intl.locale) ? "right" : "left"}
                    onClick={onNewDeviceClick}
                />
            </div>
        </Box>
    );
};

SpriteSelectorComponent.propTypes = {
    editingTarget: PropTypes.string,
    hoveredTarget: PropTypes.shape({
        hoveredSprite: PropTypes.string,
        receivedBlocks: PropTypes.bool
    }),
    intl: intlShape.isRequired,
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
    onSelectSprite: PropTypes.func,
    onSpriteUpload: PropTypes.func,
    onSurpriseSpriteClick: PropTypes.func,
    raised: PropTypes.bool,
    selectedId: PropTypes.string,
    spriteFileInput: PropTypes.func,
    devices: PropTypes.any,
    sprites: PropTypes.shape({
        id: PropTypes.shape({
            costume: PropTypes.shape({
                url: PropTypes.string,
                name: PropTypes.string.isRequired,
                bitmapResolution: PropTypes.number.isRequired,
                rotationCenterX: PropTypes.number.isRequired,
                rotationCenterY: PropTypes.number.isRequired
            }),
            name: PropTypes.string.isRequired,
            order: PropTypes.number.isRequired
        })
    }),
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired
};

export default injectIntl(SpriteSelectorComponent);
