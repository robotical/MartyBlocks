import PropTypes from 'prop-types'
import React from 'react';
import { injectIntl } from 'react-intl';

import styles from './mm-accelerometer-data-feed.css';

const MartyAccelerometerFeedEditor = props => (
    <div className={styles.martyAccelerometerFeedContainer}>
        {props.isRecording && <div className={styles.recording}></div>}
        <canvas
            className={styles.martyAccelerometerFeed}
            width="160" height="120"
            ref={props.setRef}
        />
    </div>
);

MartyAccelerometerFeedEditor.propTypes = {
    setRef: PropTypes.func,
    isRecording: PropTypes.bool,
};

export default injectIntl(MartyAccelerometerFeedEditor);
