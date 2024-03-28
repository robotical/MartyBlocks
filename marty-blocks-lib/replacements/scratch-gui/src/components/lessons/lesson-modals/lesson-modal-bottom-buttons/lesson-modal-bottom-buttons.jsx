import React from 'react';
import styles from "./lesson-modal-bottom-buttons.css"
import rightArrow from '../../icon--next.svg';
import PropTypes from 'prop-types';

import audioIcon from '../../icon--audio.svg';
import accessibilityIcon from '../../icon--accessibility.svg';

const ModalBottomButtons = ({ onCTAClick, closeModalButtonTitle = "Start" }) => (
    <div className={styles.lessonStartModalButtonsContainer}>

        <div className={styles.middleButton}>
            <img draggable={false} src={accessibilityIcon} />
        </div>
        <div className={styles.middleButton}>
            <img draggable={false} src={audioIcon} />
        </div>

        {onCTAClick && <div
            className={styles.startLessonButton}
            onClick={onCTAClick}
        >
            <img
                draggable={false}
                src={rightArrow}
            />
            <span>{closeModalButtonTitle}</span>
        </div>}
    </div>
);

ModalBottomButtons.propTypes = {
    onCTAClick: PropTypes.func,
};

export default ModalBottomButtons;