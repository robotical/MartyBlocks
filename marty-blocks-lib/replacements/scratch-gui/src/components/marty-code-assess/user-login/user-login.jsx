import React from "react";
import styles from "./user-login.css";


class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onLogin() {
        codeAssess.API.connectionAPI.login();
    }

    render() {
        return (
            <div className={styles.userLogin}>
                <div className={styles.userLoginTitle}>User Login</div>
                <div className={styles.userLoginButton} onClick={() => this.onLogin(this.state.email, this.state.password)}>Login</div>
            </div>
        );
    }
}


UserLogin.propTypes = {

  };
  


export default UserLogin;