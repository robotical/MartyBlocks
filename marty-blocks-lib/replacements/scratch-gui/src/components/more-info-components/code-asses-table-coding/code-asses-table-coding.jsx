import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from "react-intl";
import styles from "./code-asses-table-coding.css";


const TableModeColorCoding = props => {
    const { intl } = props;
    const messages = defineMessages({
        tableColorCoding: {
            defaultMessage: 'Table Mode Info',
            description: 'Table Mode Info',
            id: 'gui.moreInfo.tableColorCoding'
        }
    });
    return (
        <div className={styles.tableColorCoding}>
            <div className={styles.moreInfo}>
                <div className={styles.viewSection}>
                    <h3 className={styles.viewTitle}>Absolute Color Coding</h3>
                    <ul className={styles.viewDetails}>
                        <li>Each cell's color corresponds directly to its score, ranging from 0 to 100. The color changes depending on how high or low the score is.</li>
                        <li>0-25%: <span className={styles.redSpan}>Beginner (red)</span></li>
                        <li>25-50%: <span className={styles.orangeSpan}>Intermediate (orange)</span></li>
                        <li>50-75%: <span className={styles.lightGreenSpan}>Advanced (light green)</span></li>
                        <li>75-100%: <span className={styles.darkGreenSpan}>Expert (dark green)</span></li>
                    </ul>
                </div>

                <div className={styles.viewSection}>
                    <h3 className={styles.viewTitle}>Relative Color Coding</h3>
                    <ul className={styles.viewDetails}>
                        <li>A cell's color is determined by comparing its score to other scores in the same session/category (the same row). This way, you can easily see how a score stands out in its specific session.</li>
                        <li>0-25% score in the session: <span className={styles.redSpan}>Underachieving (red)</span></li>
                        <li>25-50% score in the session: <span className={styles.orangeSpan}>Intermediate (orange)</span></li>
                        <li>50-75% score in the session: <span className={styles.lightGreenSpan}>Adept (light green)</span></li>
                        <li>75-100% score in the session: <span className={styles.darkGreenSpan}>Champion (dark green)</span></li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

TableModeColorCoding.propTypes = {
    intl: PropTypes.shape({
        formatMessage: PropTypes.func
    })
};

export default injectIntl(TableModeColorCoding);