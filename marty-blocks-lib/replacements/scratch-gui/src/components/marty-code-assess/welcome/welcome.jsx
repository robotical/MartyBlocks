import React from "react"
import styles from "./welcome.css"
import roboticalIcon from "../../gui/icon--robotical-logo-white.png";
import AccountButton from "../account/account-button/account-button.jsx";
import CreateOrJoinClass from "./create-or-join-class/create-or-join-class.jsx";

const ProvidersEnum = window.codeAssess.codeAssessLib.ProvidersEnum;
const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();

class Welcome extends React.Component {
    render() {
        const { areThereAnyClasses, isThereAClassSelected, provider } = this.props;
        const provider_ = provider || codeAssessClientFacade.provider;
        if (isThereAClassSelected) {
            return null;
        }
        console.log("areThereAnyClasses", areThereAnyClasses)
        console.log("isThereAClassSelected", isThereAClassSelected)
        let jsx = null;
        if (!areThereAnyClasses) {
            // there are no classes on the left, the user needs to create a class from the classroom API
            if (provider_ === ProvidersEnum.GOOGLE) {
                jsx = <p className={styles.subtitle}>Your Google Classroom account doesn't have any classes with 'MartyBlocks' section</p>
            } else if (provider_ === ProvidersEnum.MICROSOFT) {
                jsx = <p className={styles.subtitle}>Your Microsoft Classroom account doesn't have any classes with 'MartyBlocks' section</p>
            } else if (provider_ === ProvidersEnum.MAIL) {
                jsx = <CreateOrJoinClass />
            }
        } else if (!isThereAClassSelected) {
            // there are classes on the left, but none are selected
            if (provider_ === ProvidersEnum.MAIL) {
                jsx = <div>
                    <p className={styles.subtitle}>Click on a class on the left to get started!</p>
                    <p className={styles.subtitleOR}>OR</p>
                    <CreateOrJoinClass />
                </div>
            } else {
                jsx = <p className={styles.subtitle}>Click on a class on the left to get started!</p>
            }
        }

        return (
            <div className={styles.welcomeContainer}>
                <div className={styles.headerAccountButtonDiv}>
                    <AccountButton class={null} students={[]} />
                </div>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} src={roboticalIcon} />
                </div>
                <h1 className={styles.welcomeTitle}>Welcome to Robotical code.assess</h1>
                {jsx}
            </div>
        )
    }
}

export default Welcome;