import React from 'react';
import styles from './lesson-next-prev-buttons.css';
import rightArrow from '../icon--next.svg';
import leftArrow from '../icon--prev.svg';
import accessibilityIcon from '../icon--accessibility.svg';
import audioIcon from '../icon--audio.svg';
import plusIcon from '../icon--plus.svg';
import PropTypes from 'prop-types';

const NextPrevButtons = ({ isRtl, onNextStep, onPrevStep, expanded, isLastStep }) => (
    <div className={expanded ? styles.nextPrevButtonsContainer : styles.hidden}>
        <div
            className={expanded ? (onPrevStep ? (isRtl ? styles.rightButton : styles.leftButton) : styles.disabledButton) : styles.hidden}
            onClick={onPrevStep}
        >
            <img
                draggable={false}
                src={isRtl ? rightArrow : leftArrow}
            />
        </div>

        <div className={expanded ? styles.middleButton : styles.hidden}>
            <img draggable={false} src={accessibilityIcon} />
        </div>
        <div className={expanded ? styles.middleButton : styles.hidden}>
            <img draggable={false} src={audioIcon} />
        </div>
        <div className={expanded ? styles.middleButton : styles.hidden}>
            <span>?</span>
        </div>

        <div
            className={expanded ? (onNextStep ? (isRtl ? styles.leftButton : styles.rightButton) : styles.disabledButton) : styles.hidden}
            onClick={onNextStep}
        >
            <img
                draggable={false}
                src={isLastStep ? plusIcon : rightArrow}
            />
        </div>
    </div>
);

NextPrevButtons.propTypes = {
    expanded: PropTypes.bool.isRequired,
    isRtl: PropTypes.bool,
    onNextStep: PropTypes.func,
    onPrevStep: PropTypes.func
};

export default NextPrevButtons;