import React from "react";
import styles from "./user-login.css";
import { defineMessages, intlShape, injectIntl } from "react-intl";
import roboticalIcon from "../../gui/icon--robotical-logo-white.png";
import googleIcon from "./icon--google.png";
import microsoftIcon from "./icon--microsoft.png";
import mailIcon from "./icon--mail.svg";
import Spinner from '../../spinner/spinner.jsx';
import spinnerStyles from '../../spinner/spinner.css';
import Modal from "../../../containers/modal.jsx";
import CredentialsModal from "./credentials-modal/credentials-modal.jsx";

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();
const ProvidersEnum = window.codeAssess.codeAssessLib.ProvidersEnum;

const messages = defineMessages({
    userLogin: {
        defaultMessage: "User Login",
        description: "Title for the user login component",
        id: "gui.martyCodeAssess.userLogin.userLogin",
    },
    login: {
        defaultMessage: "Login",
        description: "Button to login",
        id: "gui.martyCodeAssess.userLogin.login",
    },
});


class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isModalVisible: false
        };
        this.onLogin = this.onLogin.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onShowModal = this.onShowModal.bind(this);
    }

    componentDidMount() {
        codeAssessClientFacade.checkAuthSessionAndLogin();
    }

    async onLogin(provider, email, password) {
        if (provider === ProvidersEnum.MICROSOFT) return alert('Not implemented yet');
        this.setState({ isLoading: true });
        try {
            await codeAssessClientFacade.logUserIn(provider, email, password);
            this.props.setProvider(provider);
        } catch (e) {
            console.error("Error logging in using google", e);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    onCloseModal() {
        this.setState({ isModalVisible: false });
    }

    onShowModal() {
        this.setState({ isModalVisible: true });
    }


    render() {
        const { intl } = this.props;
        return (
            <>
                {
                    this.state.isModalVisible &&
                    <Modal
                        onRequestClose={this.onCloseModal}
                        fullScreen={false}
                        className={styles.modal}
                        id="credentialsmodal"
                        contentLabel="Enter your credentials"
                    >
                        <div className={styles.modalContent}>
                            <CredentialsModal />
                        </div>
                    </Modal>
                }
                <div className={styles.userLogin}>
                    <div className={styles.loginInner}>
                        <div className={styles.logoContainer}>
                            <img className={styles.logo} src={roboticalIcon} />
                        </div>
                        <div className={styles.titleContainer}>
                            <h3>Login</h3>
                        </div>
                        {this.state.isLoading && <Spinner level='warn' large className={spinnerStyles.primary} />}
                        <div className={styles.buttonsContainer} style={{ visibility: this.state.isLoading ? 'hidden' : 'visible' }}>
                            <div className={styles.button} onClick={() => this.onLogin("google")} >
                                <img className={styles.googleLoginIcon} src={googleIcon} />
                                <span className={styles.buttonText}>Continue with Google</span>
                            </div>
                            <div className={styles.button} onClick={() => this.onLogin("microsoft")} >
                                <img className={styles.microsoftLoginIcon} src={microsoftIcon} />
                                <span className={styles.buttonText}>Continue with Microsoft</span>
                            </div>
                            <div className={styles.orSeparator}>
                                <span className={styles.orText}>or</span>
                            </div>
                            <div className={styles.button} onClick={this.onShowModal} >
                                <img className={styles.mailLoginIcon} src={mailIcon} />
                                <span className={styles.buttonText}>Continue with Email</span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


UserLogin.propTypes = {
    intl: intlShape.isRequired,
};



export default injectIntl(UserLogin);