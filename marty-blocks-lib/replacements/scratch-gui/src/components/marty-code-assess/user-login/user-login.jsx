import React from "react";
import styles from "./user-login.css";
import PropTypes from "prop-types";


class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    onLogin(email, password) {
        codeAssess.API.connectionAPI.login();
    }

    render() {
        return (
            <div className={styles.userLogin}>
                <div className={styles.userLoginTitle}>User Login</div>
                <div className={styles.userLoginInput}>
                    <div className={styles.userLoginInputTitle}>Email</div>
                    <input type="text" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                </div>
                <div className={styles.userLoginInput}>
                    <div className={styles.userLoginInputTitle}>Password</div>
                    <input type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                </div>
                <div className={styles.userLoginButton} onClick={() => this.onLogin(this.state.email, this.state.password)}>Login</div>
            </div>
        );
    }
}


UserLogin.propTypes = {

  };
  


export default UserLogin;