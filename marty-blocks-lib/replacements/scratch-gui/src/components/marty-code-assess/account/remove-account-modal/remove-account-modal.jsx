import React from "react";
import styles from "./remove-account-modal.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import Spinner from '../../../spinner/spinner.jsx';
import spinnerStyles from '../../../spinner/spinner.css';

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.RemoveAccountModal.",
    }
});

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();

class RemoveAccountModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
        bindAll(this, [
            'onRemoveAccount',
        ]);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    async onRemoveAccount() {
        this.setState({ isLoading: true });
        // send request to remove account
        await codeAssessClientFacade.logUserOut();
        this.props.onClose();
        alert("Your account has been deactivated. You can reactivate it by logging in within 30 days.");
        this.setState({ isLoading: false });
        window.location.reload();
    }


    render() {
        const { intl } = this.props;

        return (
            <div className={styles.removeAccountModal}>
                {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                    <>
                        <div className={styles.header}>
                            <h4>Are you sure you want to remove your account?</h4>
                        </div>
                        <div className={styles.content}>
                            <p>Removing your account will deactivate it for 30 days. If you log in to your account within 30 days, your account will be reactivated automatically.</p>
                            <p>After 30 days, your account and all of your data will be permanently deleted.</p>

                            <div className={styles.buttons}>
                                <button onClick={this.props.onClose} className={[styles.button, styles.cancelButton].join(" ")}>Cancel</button>
                                <button onClick={this.onRemoveAccount} className={[styles.button, styles.removeButton].join(" ")}>Deactivate Account</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }
}


RemoveAccountModal.propTypes = {
    intl: intlShape.isRequired,
    onClose: PropTypes.func.isRequired,
};


export default injectIntl(RemoveAccountModal);
