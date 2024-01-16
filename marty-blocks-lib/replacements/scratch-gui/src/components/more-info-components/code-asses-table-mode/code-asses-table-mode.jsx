import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from "react-intl";
import styles from "./code-asses-table-mode.css";


const TableModeInfo = props => {
    const { intl } = props;
    const messages = defineMessages({
        tableModeInfo: {
            defaultMessage: 'Table Mode Info',
            description: 'Table Mode Info',
            id: 'gui.moreInfo.tableModeInfo'
        }
    });
    return (
        <div className={styles.tableModeInfo}>
            {/* <p>{intl.formatMessage(messages.tableModeInfo)}</p> */}
            <div className={styles.moreInfo}>
                <div className={styles.viewSection}>
                    <h3 className={styles.viewTitle}>All Sessions View</h3>
                    <ul className={styles.viewDetails}>
                        <li>Each row represents a different session, showing the collapsed score of each student for all sessions.</li>
                        <li>Session numbers are listed in the first column. Hover over them to see the date of the session.</li>
                        <li>The second column shows the Class Average score for that session.</li>
                    </ul>
                </div>

                <div className={styles.viewSection}>
                    <h3 className={styles.viewTitle}>Final Score View</h3>
                    <ul className={styles.viewDetails}>
                        <li>This view displays final scores for each student, covering score categories.</li>
                        <li>The second column shows the Class Average score.</li>
                        <li>Find individual student averages in the last row.</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

TableModeInfo.propTypes = {
    intl: PropTypes.shape({
        formatMessage: PropTypes.func
    })
};

export default injectIntl(TableModeInfo);