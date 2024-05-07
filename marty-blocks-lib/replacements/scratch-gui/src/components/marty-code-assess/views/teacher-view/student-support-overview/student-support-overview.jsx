import React from "react";
import styles from "./student-support-overview.css";
import bindAll from 'lodash.bindall';
import { defineMessages, injectIntl } from "react-intl";
import RarrowIcon from "../../../icon--rarrow.svg";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.studentSupportOverview",
    }
});

class StudentSupportOverview extends React.Component {
    constructor() {
        super();

    }


    render() {
        return <div className={styles.studentSupportOverviewContainer}>
            <div className={styles.supportTitle}>Support</div>
            <div className={[styles.studentSpiderContainer, styles.studentSpiderTop].join(" ")}></div>
            <div className={[styles.studentSpiderContainer, styles.studentSpiderTop].join(" ")}></div>
            <div className={[styles.studentSpiderContainer, styles.studentSpiderTop].join(" ")}></div>
            <div className={[styles.studentSpiderContainer, styles.studentSpiderTop].join(" ")}></div>
            <div className={styles.championsTitle}>Champions</div>
            <div className={[styles.studentSpiderContainer, styles.studentSpiderBottom].join(" ")}></div>
            <div className={[styles.studentSpiderContainer, styles.studentSpiderBottom].join(" ")}></div>
            <div className={[styles.studentSpiderContainer, styles.studentSpiderBottom].join(" ")}></div>
            <div className={[styles.studentSpiderContainer, styles.studentSpiderBottom].join(" ")}></div>
            <div className={styles.showAllButtonContainer}>
                <img src={RarrowIcon} className={styles.showAllButtonIcon} alt="show all" />
            </div>
        </div>
    }


}


export default injectIntl(StudentSupportOverview);