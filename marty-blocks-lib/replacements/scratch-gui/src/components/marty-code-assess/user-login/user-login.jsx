import React from "react";
import styles from "./user-login.css";
import { defineMessages, intlShape, injectIntl } from "react-intl";
import googleLoginIcon from "./icon--google-login.png";
import Spinner from '../../spinner/spinner.jsx';
import spinnerStyles from '../../spinner/spinner.css';

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
        };
        this.onLogin = this.onLogin.bind(this);
    }

    async onLogin() {
        this.setState({ isLoading: true });
        try {
            await codeAssess.logUserIn();
        } catch (e) {
            console.error("Error logging in using google", e);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { intl } = this.props;
        return (
            <div className={styles.userLogin}>
                {this.state.isLoading ?
                    <Spinner level='warn' large className={spinnerStyles.primary} /> :
                    <img className={styles.googleLoginIcon} src={googleLoginIcon} onClick={this.onLogin} />
                }
            </div>
        );
    }
}


UserLogin.propTypes = {
    intl: intlShape.isRequired,
};



export default injectIntl(UserLogin);