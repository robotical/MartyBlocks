import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import DeleteButton from '../delete-button/delete-button.jsx';
import styles from './device-selector-item.css';
import { ContextMenuTrigger } from 'react-contextmenu';
import { DangerousMenuItem, ContextMenu, MenuItem } from '../context-menu/context-menu.jsx';
import { FormattedMessage } from 'react-intl';
import ConnectionButton from './connection/connection-button.jsx';
import SignalBattery from './signal-battery/signal-battery.jsx';

// react-contextmenu requires unique id to match trigger and context menu
let contextMenuId = 0;

class DeviceSelectorItem extends React.Component {
  constructor(props) {
    super(props);
    this.contextMenuId = contextMenuId++;

    this.state = {
      isDeviceConnected: false,
      batteryLevel: 0,
      signalLevel: 0
    };

    this.raftInfoInterval = null;

  }

  componentDidMount() {
    this.raftInfoInterval = setInterval(() => {
      const raftId = window.raftManager.raftIdAndDeviceIdMap[this.props.id];
      let raft;
      if (raftId) {
        raft = window.applicationManager.connectedRafts[raftId];
      }
      this.setState({
        isDeviceConnected: window.isDeviceConnected || window.raftManager.isDeviceConnected(this.props.id),
        batteryLevel:  raft?.getBatteryStrength() ?? -1,
        signalLevel: raft?.getRSSI() || 127
      });
    }, 400);
  }

  componentWillUnmount() {
    clearTimeout(this.raftInfoInterval);
  }

  render() {
    return (
      <ContextMenuTrigger
        attributes={{
          className: classNames(this.props.className, styles.spriteSelectorItem, {
            [styles.isSelected]: this.props.selected
          }),
          onClick: this.props.onClick,
          onMouseEnter: this.props.onMouseEnter,
          onMouseLeave: this.props.onMouseLeave,
          onMouseDown: this.props.onMouseDown,
          onTouchStart: this.props.onMouseDown
        }}
        disable={this.props.preventContextMenu}
        id={`${this.props.name}-${this.contextMenuId}`}
        ref={this.props.componentRef}
      >
        {typeof this.props.number === 'undefined' ? null : (
          <div className={styles.number}>{this.props.number}</div>
        )}
        {this.props.costumeURL ? (
          <div className={styles.spriteImageOuter} id={`sprite-image-outer-${this.props.id}`}>
            <div className={styles.spriteImageInner}>
              <img
                className={styles.spriteImage}
                draggable={false}
                src={this.props.costumeURL}
              />
            </div>
          </div>
        ) : null}
        <SignalBattery battery={this.state.batteryLevel} signal={this.state.signalLevel} isDeviceConnected={this.state.isDeviceConnected} />
        {this.state.isDeviceConnected && <div className={styles.spriteInfo}>
          <div className={styles.spriteName}>{this.props.name}</div>
        </div>}
        <ConnectionButton deviceId={this.props.id} onChangeDeviceName={this.props.onChangeDeviceName} key={this.props.id} isItemSelected={this.props.selected} />
        {(this.props.selected && this.props.onDeleteButtonClick && !this.state.isDeviceConnected) ? (
          <DeleteButton
            className={styles.deleteButton}
            onClick={this.props.onDeleteButtonClick}
          />
        ) : null}
        {this.props.onDuplicateButtonClick || this.props.onDeleteButtonClick || this.props.onExportButtonClick ? (
          <ContextMenu id={`${this.props.name}-${this.contextMenuId}`}>
            {this.props.onDuplicateButtonClick ? (
              <MenuItem onClick={this.props.onDuplicateButtonClick}>
                <FormattedMessage
                  defaultMessage="duplicate"
                  description="Menu item to duplicate in the right click menu"
                  id="gui.DeviceSelectorItem.contextMenuDuplicate"
                />
              </MenuItem>
            ) : null}
            {this.props.onExportButtonClick ? (
              <MenuItem onClick={this.props.onExportButtonClick}>
                <FormattedMessage
                  defaultMessage="export"
                  description="Menu item to export the selected item"
                  id="gui.DeviceSelectorItem.contextMenuExport"
                />
              </MenuItem>
            ) : null}
            {this.props.onDeleteButtonClick ? (
              <DangerousMenuItem onClick={this.props.onDeleteButtonClick}>
                <FormattedMessage
                  defaultMessage="delete"
                  description="Menu item to delete in the right click menu"
                  id="gui.DeviceSelectorItem.contextMenuDelete"
                />
              </DangerousMenuItem>
            ) : null}
          </ContextMenu>
        ) : null}
      </ContextMenuTrigger>
    );
  }
}

DeviceSelectorItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  componentRef: PropTypes.func,
  costumeURL: PropTypes.string,
  details: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChangeDeviceName: PropTypes.func,
  number: PropTypes.number,
  onClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
  onDuplicateButtonClick: PropTypes.func,
  onExportButtonClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  preventContextMenu: PropTypes.bool,
  selected: PropTypes.bool.isRequired
};

export default DeviceSelectorItem;
