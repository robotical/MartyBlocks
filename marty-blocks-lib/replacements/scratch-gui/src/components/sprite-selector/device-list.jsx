import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import DragConstants from '../../lib/drag-constants';

import Box from '../box/box.jsx';
import DeviceSelectorItem from '../../containers/device-selector-item.jsx';
import SortableHOC from '../../lib/sortable-hoc.jsx';
import SortableAsset from '../asset-panel/sortable-asset.jsx';
import ThrottledPropertyHOC from '../../lib/throttled-property-hoc.jsx';

import styles from './sprite-selector.css';

import { FormattedMessage } from 'react-intl';

const ThrottledDeviceSelectorItem = ThrottledPropertyHOC('asset', 500)(DeviceSelectorItem);

const DeviceList = function (props) {
    const {
        containerRef,
        editingTarget,
        draggingIndex,
        draggingType,
        hoveredTarget,
        onDeleteDevice,
        onDuplicateDevice,
        onExportDevice,
        onSelectDevice,
        onAddSortable,
        onRemoveSortable,
        ordering,
        onChangeDeviceName,
        raised,
        selectedId,
        items
    } = props;

    const isDeviceDrag = draggingType === DragConstants.DEVICE;

    return (
        <Box
            className={classNames(styles.scrollWrapper, {
                [styles.scrollWrapperDragging]: draggingType === DragConstants.BACKPACK_SPRITE
            })}
            componentRef={containerRef}
        >
            <Box
                className={styles.itemsWrapper}
            >
                {items.length === 0 && <div className={styles.noItemsInList}>
                    <FormattedMessage
                        id="gui.deviceSelector.noDevicesInUse"
                        description="Message shown when there are no devices in the device selector"
                        defaultMessage="Add a device"
                    />
                </div>}
                {items.map((device, index) => {

                    // If the device has just received a block drop, used for green highlight
                    const receivedBlocks = (
                        hoveredTarget.device === device.id &&
                        device.id !== editingTarget &&
                        hoveredTarget.receivedBlocks
                    );

                    // If the device is indicating it can receive block dropping, used for blue highlight
                    let isRaised = !receivedBlocks && raised && device.id !== editingTarget;

                    // A device is also raised if a costume or sound is being dragged.
                    // Note the absence of the self-sharing check: a device can share assets with itself.
                    // This is a quirk of 2.0, but seems worth leaving possible, it
                    // allows quick (albeit unusual) duplication of assets.
                    isRaised = isRaised || [
                        DragConstants.COSTUME,
                        DragConstants.SOUND,
                        DragConstants.BACKPACK_COSTUME,
                        DragConstants.BACKPACK_SOUND,
                        DragConstants.BACKPACK_CODE].includes(draggingType);

                    return (
                        <SortableAsset
                            className={classNames(styles.spriteWrapper, {
                                [styles.placeholder]: isDeviceDrag && index === draggingIndex
                            })}
                            index={isDeviceDrag ? ordering.indexOf(index) : index}
                            key={device.id}
                            onAddSortable={onAddSortable}
                            onRemoveSortable={onRemoveSortable}
                        >
                            <ThrottledDeviceSelectorItem
                                asset={device.costume && device.costume.asset}
                                className={classNames(styles.sprite, {
                                    [styles.raised]: isRaised,
                                    [styles.receivedBlocks]: receivedBlocks
                                })}
                                dragPayload={device.id}
                                dragType={DragConstants.DEVICE}
                                targetType={device.targetType}
                                id={device.id || selectedId}
                                index={index}
                                onChangeDeviceName={onChangeDeviceName}
                                key={device.id}
                                name={device.name}
                                selected={device.id === selectedId}
                                onClick={onSelectDevice}
                                onDeleteButtonClick={onDeleteDevice}
                                onDuplicateButtonClick={onDuplicateDevice}
                                onExportButtonClick={onExportDevice}
                            />
                        </SortableAsset>
                    );
                })}
            </Box>
        </Box>
    );
};

DeviceList.propTypes = {
    containerRef: PropTypes.func,
    draggingIndex: PropTypes.number,
    draggingType: PropTypes.oneOf(Object.keys(DragConstants)),
    editingTarget: PropTypes.string,
    hoveredTarget: PropTypes.shape({
        hoveredSprite: PropTypes.string,
        receivedBlocks: PropTypes.bool,
        sprite: PropTypes.string
    }),
    items: PropTypes.arrayOf(PropTypes.shape({
        costume: PropTypes.shape({
            url: PropTypes.string,
            name: PropTypes.string.isRequired,
            bitmapResolution: PropTypes.number.isRequired,
            rotationCenterX: PropTypes.number.isRequired,
            rotationCenterY: PropTypes.number.isRequired
        }),
        name: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired
    })),
    onAddSortable: PropTypes.func,
    onDeleteDevice: PropTypes.func,
    onDuplicateDevice: PropTypes.func,
    onExportDevice: PropTypes.func,
    onChangeDeviceName: PropTypes.func,
    onRemoveSortable: PropTypes.func,
    onSelectDevice: PropTypes.func,
    ordering: PropTypes.arrayOf(PropTypes.number),
    raised: PropTypes.bool,
    selectedId: PropTypes.string
};

export default SortableHOC(DeviceList);
