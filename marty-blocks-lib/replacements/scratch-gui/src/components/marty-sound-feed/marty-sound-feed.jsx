import PropTypes from 'prop-types'
import React from 'react';
import { injectIntl } from 'react-intl';

import styles from './marty-sound-feed.css';

const MartySoundFeedEditor = props => (
    <div className={styles.martySoundFeedContainer}>
        <canvas
            className={styles.martySoundFeed}
            width="160" height="120"
            ref={props.setRef}
        />
    </div >
);

MartySoundFeedEditor.propTypes = {
    setRef: PropTypes.func,
};

export default injectIntl(MartySoundFeedEditor);
