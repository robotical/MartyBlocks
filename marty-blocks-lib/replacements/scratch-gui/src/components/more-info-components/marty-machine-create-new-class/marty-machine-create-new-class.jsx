import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from "react-intl";
import styles from "./marty-machine-create-new-class.css";


const MMCreateNewClass = props => {
    const { intl } = props;
    const messages = defineMessages({
        createNewClass: {
            defaultMessage: 'Create New Class',
            description: 'Button to create a new class',
            id: 'gui.moreInfo.MMcreateANewClass'
        }
    });
    return (
        <div className={styles.tableColorCoding}>
            <div className={styles.moreInfo}>
                <div className={styles.viewSection}>
                    <h3 className={styles.viewTitle}>Create New class</h3>
                    <ul className={styles.viewDetails}>
                        <li>Enter the class name in the "Create new class" field.</li>
                        <li>Click the "+" button.</li>
                        <li>This action will create a new class if the class name does not already exist.</li>
                    </ul>
                </div>

                <div className={styles.viewSection}>
                    <h3 className={styles.viewTitle}>Collect Data for</h3>
                    <ul className={styles.viewDetails}>
                        <li>Select the class you want to collect data for.</li>
                        <li><strong>If there are no classes yet, you need to create one first.</strong></li>
                        <li>Click the "Record" button.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

MMCreateNewClass.propTypes = {
    intl: PropTypes.shape({
        formatMessage: PropTypes.func
    })
};

export default injectIntl(MMCreateNewClass);