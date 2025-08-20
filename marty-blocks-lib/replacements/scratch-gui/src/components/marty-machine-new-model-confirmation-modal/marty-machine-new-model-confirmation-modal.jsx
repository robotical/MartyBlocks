import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import { defineMessages, injectIntl, FormattedMessage, intl } from 'react-intl';
import Box from '../box/box.jsx';
import bindAll from "lodash.bindall";

import styles from './marty-machine-new-model-confirmation-modal.css';

const messages = defineMessages({
    label: {
        id: 'gui.MartyMachineNewModelConfirmationModal.label',
        defaultMessage: "Unsaved changes will be lost.",
        description: 'Label for the MartyMachineNewModelConfirmationModal',
    },
    headsUp: {
        id: 'gui.MartyMachineNewModelConfirmationModal.headsUp',
        defaultMessage: "Just a heads-up! If you've made any changes to the current model, they won't be saved. Are you okay to continue?",
        description: 'Heads-up message for the MartyMachineNewModelConfirmationModal',
    },
    close: {
        id: 'gui.MartyMachineNewModelConfirmationModal.close',
        defaultMessage: "Close",
        description: 'Close button label for the MartyMachineNewModelConfirmationModal',
    },
    continue: {
        id: 'gui.MartyMachineNewModelConfirmationModal.continue',
        defaultMessage: "Continue",
        description: 'Continue button label for the MartyMachineNewModelConfirmationModal',
    },
});

class MartyMachineNewModelConfirmationModal extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleBack',
            'handleProceed',
        ]);
        this.state = {};
        this.handleBack = this.handleBack.bind(this);
        this.handleProceed = this.handleProceed.bind(this);
    }

    handleBack() {
        this.props.onBack();
    }

    handleProceed() {
        this.props.onProceed();
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

                    <Box className={styles.body}>
                        <h2>
                            <FormattedMessage {...label} />
                        </h2>
                        <Box className={styles.illustration}>
                            <FormattedMessage {...messages.headsUp} />
                        </Box>

                        <Box justifyContent="space-between" className={styles.buttonRow}>

                            <button
                                className={styles.button}
                                onClick={this.handleProceed}
                            >
                                <FormattedMessage {...messages.continue} />
                            </button>
                            <button
                                className={styles.button}
                                onClick={this.handleBack}
                            >
                                <FormattedMessage {...messages.close} />
                            </button>
                        </Box>
                    </Box>
                </div>
            </ReactModal>

        );
    }
};

MartyMachineNewModelConfirmationModal.propTypes = {
    onBack: PropTypes.func.isRequired,
    onProceed: PropTypes.func.isRequired,
};

const WrappedMartyMachineNewModelConfirmationModal = injectIntl(MartyMachineNewModelConfirmationModal);

WrappedMartyMachineNewModelConfirmationModal.setAppElement = ReactModal.setAppElement;

export default WrappedMartyMachineNewModelConfirmationModal;
