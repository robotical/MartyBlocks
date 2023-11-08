import React from "react";
import styles from "./user-login.css";
import { defineMessages, intlShape, injectIntl } from "react-intl";



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
        this.state = {};
    }

    onLogin() {
        codeAssess.logUserIn();
    }

    render() {
        const { intl } = this.props;
        return (
            <div className={styles.userLogin}>
                <div className={styles.userLoginTitle}>{intl.formatMessage(messages.userLogin)}</div>
                <div className={styles.userLoginButton} onClick={() => this.onLogin(this.state.email, this.state.password)}>
                    {intl.formatMessage(messages.login)}
                </div>
            </div>
        );
    }
}


UserLogin.propTypes = {
    intl: intlShape.isRequired,
};



export default injectIntl(UserLogin);