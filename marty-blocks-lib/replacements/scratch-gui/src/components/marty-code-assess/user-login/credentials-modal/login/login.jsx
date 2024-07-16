import React from 'react';
import styles from "./login.css";
import Spinner from '../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../spinner/spinner.css';

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();
const ProvidersEnum = window.codeAssess.codeAssessLib.ProvidersEnum;

export default class Login extends React.Component {
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

    componentDidMount() {
        const credentials = getCredentialsFromLocalStorage();
        if (credentials) {
            this.setState({ credentials: { ...credentials } });
        }
    }

    async loginWithCredentials(e) {
        e.preventDefault();
        this.setState({ isLoading: true });
        if (this.state.credentials.email && this.state.credentials.pw) {
            const wasUserLoggedIn = await codeAssessClientFacade.logUserIn(ProvidersEnum.MAIL, this.state.credentials.email, this.state.credentials.pw);
            if (!wasUserLoggedIn) {
                this.setState({ wrongCredentials: true });
            } else {
                this.props.setProvider(ProvidersEnum.MAIL);
                saveCredentialsToLocalStorage(this.state.credentials.email, this.state.credentials.pw);
            }
        }
        this.setState({ isLoading: false });
    }

    render() {
        return (

            <>
                {this.state.wrongCredentials && <div className={styles.wrongCredentials}>Wrong email or password</div>}
                <form className={styles.form} onSubmit={this.loginWithCredentials}>
                    <input
                        className={styles.emailInput}
                        type="text"
                        placeholder="Email"
                        value={this.state.credentials.email}
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
                        value={this.state.credentials.pw}
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
                        {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : <button className={styles.loginButton} type='submit' >Login</button>}
                    </div>
                </form>
                <p>Don't have an account? <span className={styles.registerLink} onClick={this.props.onSwitchToRegister}>Press here to register</span></p>
                <p className={styles.lostCredentialsP}>If you lost your password, please contact us at <a href="mailto:support@robotical.io">support@robotical.io</a></p>
            </>
        )
    }
}


const saveCredentialsToLocalStorage = (email, pw) => {
    localStorage.setItem("mb-credentials", JSON.stringify({ email, pw }));
}

const getCredentialsFromLocalStorage = () => {
    const credentials = localStorage.getItem("mb-credentials");
    return credentials ? JSON.parse(credentials) : null;
}

export const removeCredentialsFromLocalStorage = () => {
    localStorage.removeItem("mb-credentials");
}