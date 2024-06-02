import React from "react"
import styles from "./welcome.css"
import roboticalIcon from "../../gui/icon--robotical-logo-white.png";
import CodeAssessHeader from "../header/header.jsx";
import AccountButton from "../account/account-button/account-button.jsx";

const ProvidersEnum = window.codeAssess.codeAssessLib.ProvidersEnum;

class Welcome extends React.Component {
    render() {
        const { areThereAnyClasses, isThereAClassSelected, provider } = this.props;

        if (isThereAClassSelected) {
            return null;
        }
        console.log("areThereAnyClasses", areThereAnyClasses)
        console.log("isThereAClassSelected", isThereAClassSelected)
        let jsx = null;
        if (!areThereAnyClasses) {
            // there are no classes on the left, the user needs to create a class from the classroom API
            if (provider === ProvidersEnum.GOOGLE) {
                jsx = <p className={styles.subtitle}>Your Google Classroom account doesn't have any classes with 'MartyBlocks' section</p>
            } else if (provider === ProvidersEnum.MICROSOFT) {
                jsx = <p className={styles.subtitle}>Your Microsoft Classroom account doesn't have any classes with 'MartyBlocks' section</p>
            }
        } else if (!isThereAClassSelected) {
            // there are classes on the left, but none are selected
            jsx = <p className={styles.subtitle}>Click on a class on the left to get started!</p>
        }

        return (
            <div className={styles.welcomeContainer}>
                <div className={styles.headerAccountButtonDiv}>
                    <AccountButton class={null} students={[]} />
                </div>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} src={roboticalIcon} />
                </div>
                <h1 className={styles.welcomeTitle}>Welcome to Marty Code Assess</h1>
                {jsx}
            </div>
        )
    }
}

export default Welcome;