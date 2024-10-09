import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {injectIntl, intlShape, defineMessages} from 'react-intl';
import VM from 'scratch-vm';

import deviceLibraryContent from '../lib/libraries/devices.json';
import deviceTags from '../lib/libraries/device-tags';

import LibraryComponent from '../components/library/library.jsx';

const messages = defineMessages({
    libraryTitle: {
        defaultMessage: 'Choose a Device',
        description: 'Heading for the device library',
        id: 'gui.deviceLibrary.chooseADevice'
    }
});

class DeviceLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect'
        ]);
    }
    handleItemSelect (item) {
        this.props.vm.addDevice(JSON.stringify(item)).then(() => {
            this.props.onActivateBlocksTab();
        });
    }
    render () {
        return (
            <LibraryComponent
                data={deviceLibraryContent}
                id="deviceLibrary"
                tags={deviceTags}
                title={this.props.intl.formatMessage(messages.libraryTitle)}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

DeviceLibrary.propTypes = {
    intl: intlShape.isRequired,
    onActivateBlocksTab: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default injectIntl(DeviceLibrary);
