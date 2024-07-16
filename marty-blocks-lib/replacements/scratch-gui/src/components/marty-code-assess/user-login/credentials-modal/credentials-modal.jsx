import React from 'react';
import styles from "./credentials-modal.css";
import roboticalIcon from "../../../gui/icon--robotical-logo-white.png";
import Login from './login/login.jsx';
import Register from './register/register.jsx';

export default class CredentialsModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: 'login', // login, register
        }

    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={styles.credentialsModal}>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} src={roboticalIcon} />
                </div>
                {
                    this.state.content === "login" ?
                        <Login onSwitchToRegister={() => this.setState({ content: 'register' })} setProvider={this.props.setProvider} />
                        :
                        <Register onSwitchToLogin={() => this.setState({ content: 'login' })} setProvider={this.props.setProvider} />
                }
            </div>
        )
    }
}