import React from 'react';
import styles from "./credentials-modal.css";
import roboticalIcon from "../../../gui/icon--robotical-logo-white.png";
import Spinner from '../../../spinner/spinner.jsx';
import spinnerStyles from '../../../spinner/spinner.css';

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();
const ProvidersEnum = window.codeAssess.codeAssessLib.ProvidersEnum;

export default class CredentialsModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            credentials: {
                email: '',
                pw: ''
            },
            wrongCredentials: false,
            isLoading: false
        }

        this.loginWithCredentials = this.loginWithCredentials.bind(this);
    }

    async loginWithCredentials() {
        this.setState({ isLoading: true });
        if (this.state.credentials.email && this.state.credentials.pw) {
            const wasUserLoggedIn = await codeAssessClientFacade.logUserIn(ProvidersEnum.MAIL, this.state.credentials.email, this.state.credentials.pw);
            if (!wasUserLoggedIn) {
                this.setState({ wrongCredentials: true });
            }
        }
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <div className={styles.credentialsModal}>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} src={roboticalIcon} />
                </div>
                {this.state.wrongCredentials && <div className={styles.wrongCredentials}>Wrong email or password</div>}
                <input
                    className={styles.emailInput}
                    type="text"
                    placeholder="Email"
                    onChange={(event) => {
                        this.setState({
                            credentials: {
                                ...this.state.credentials,
                                email: event.target.value
                            }
                        });
                    }
                    }
                />
                <input
                    className={styles.passwordInput}
                    type="password"
                    placeholder="Password"
                    onChange={(event) => {
                        this.setState({
                            credentials: {
                                ...this.state.credentials,
                                pw: event.target.value
                            }
                        });
                    }
                    }
                />
                <div className={styles.loginButtonContainer}>
                    {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : <button className={styles.loginButton} onClick={this.loginWithCredentials} >Login</button>}
                </div>
            </div>
        )
    }
}