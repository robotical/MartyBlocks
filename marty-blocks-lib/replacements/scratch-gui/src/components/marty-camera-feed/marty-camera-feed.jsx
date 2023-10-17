import PropTypes from 'prop-types'
import React from 'react';
import { injectIntl } from 'react-intl';

import styles from './marty-camera-feed.css';

const MartyCameraFeedEditor = props => (
    <div className={styles.martyCameraFeedContainer}>
        {props.isRecording && <div className={styles.recording}></div>}
        <video
            className={styles.martyCameraFeed}
            autoPlay
            playsInline
            muted
            ref={props.setRef}
        />
    </div >
);

MartyCameraFeedEditor.propTypes = {
    setRef: PropTypes.func,
};

export default injectIntl(MartyCameraFeedEditor);
