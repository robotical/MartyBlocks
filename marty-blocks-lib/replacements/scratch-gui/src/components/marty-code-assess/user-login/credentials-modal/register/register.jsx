import React from 'react';
import styles from "./register.css";
import Spinner from '../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../spinner/spinner.css';

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();
const ProvidersEnum = window.codeAssess.codeAssessLib.ProvidersEnum;

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            credentials: {
                firstName: '',
                lastName: '',
                // role: '', // teacher or student
                email: '',
                confirmEmail: '',
                pw: '',
                confirmPw: ''
            },
            wrongInputErrorMessages: [],
            isLoading: false
        }

        this.registerWithCredentials = this.registerWithCredentials.bind(this);
    }

    componentDidMount() {
    }

    async registerWithCredentials(e) {
        e.preventDefault();
        this.setState({ isLoading: true, wrongInputErrorMessages: [] });
        // validation
        const isFirstNameFilled = this.state.credentials.firstName.length > 0;
        const isLastNameFilled = this.state.credentials.lastName.length > 0;
        // const isRoleEitherTeacherOrStudent = this.state.credentials.role === "teacher" || this.state.credentials.role === "student";
        const isEmailValid = validEmailRegex.test(this.state.credentials.email);
        const isEmailConfirmed = this.state.credentials.email === this.state.credentials.confirmEmail;
        const isPwConfirmed = this.state.credentials.pw === this.state.credentials.confirmPw;
        const errors = [];
        if (!isFirstNameFilled) errors.push("First name is required");
        if (!isLastNameFilled) errors.push("Last name is required");
        // if (!isRoleEitherTeacherOrStudent) errors.push("Role is required");
        if (!isEmailValid) errors.push("Email is not valid");
        if (!isEmailConfirmed) errors.push("Emails do not match");
        if (!isPwConfirmed) errors.push("Passwords do not match");
        this.setState({ wrongInputErrorMessages: errors });
        if (errors.length === 0) {
            const resp = await codeAssessClientFacade.registerCredUser(this.state.credentials.email, this.state.credentials.firstName, this.state.credentials.lastName, this.state.credentials.pw);
            if (resp) {
                saveCredentialsToLocalStorage(this.state.credentials.email, this.state.credentials.pw);
                await codeAssessClientFacade.logUserIn(ProvidersEnum.MAIL, this.state.credentials.email, this.state.credentials.pw);
                this.props.setProvider(ProvidersEnum.MAIL);
            }
        }

        this.setState({ isLoading: false });
    }

    render() {
        return (
            <>
                <form className={styles.form} onSubmit={this.registerWithCredentials}>
                    <div className={styles.row}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="First Name"
                            // required
                            value={this.state.credentials.firstName}
                            onChange={(event) => {
                                this.setState({
                                    credentials: {
                                        ...this.state.credentials,
                                        firstName: event.target.value
                                    }
                                });
                            }
                            }
                        />
                        <input
                            className={styles.input}
                            type="text"
                            // required
                            placeholder="Last Name"
                            value={this.state.credentials.lastName}
                            onChange={(event) => {
                                this.setState({
                                    credentials: {
                                        ...this.state.credentials,
                                        lastName: event.target.value
                                    }
                                });
                            }
                            }
                        />
                    </div>
                    {/* <div className={styles.row}>
                        <select
                            className={styles.select}
                            value={this.state.credentials.role}
                            // required
                            onChange={(event) => {
                                this.setState({
                                    credentials: {
                                        ...this.state.credentials,
                                        role: event.target.value
                                    }
                                });
                            }
                            }
                        >
                            <option value="">Role</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div> */}
                    <div className={styles.row}>
                        <input
                            className={styles.input}
                            type="text"
                            // required
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
                            className={styles.input}
                            type="text"
                            placeholder="Confirm Email"
                            // required
                            value={this.state.credentials.confirmEmail}
                            onChange={(event) => {
                                this.setState({
                                    credentials: {
                                        ...this.state.credentials,
                                        confirmEmail: event.target.value
                                    }
                                });
                            }
                            }
                        />
                    </div>
                    <div className={styles.row}>
                        <input
                            className={styles.input}
                            value={this.state.credentials.pw}
                            type="password"
                            // required
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
                        <input
                            className={styles.input}
                            value={this.state.credentials.confirmPw}
                            type="password"
                            // required
                            placeholder="Confirm Password"
                            onChange={(event) => {
                                this.setState({
                                    credentials: {
                                        ...this.state.credentials,
                                        confirmPw: event.target.value
                                    }
                                });
                            }
                            }
                        />
                    </div>
                    <div>
                        {this.state.wrongInputErrorMessages.map((message, index) => <p key={index} className={styles.wrongInputError}>{message}</p>)}
                    </div>
                    <div className={styles.registerButtonContainer}>
                        {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : <button className={styles.registerButton} type='submit' >Register</button>}
                    </div>
                </form>
                <p>Already have an account? <span className={styles.loginLink} onClick={this.props.onSwitchToLogin}>Press here to login</span></p>
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