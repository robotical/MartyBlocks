import React from 'react';
import styles from './lesson-next-prev-buttons.css';
import rightArrow from '../icon--next.svg';
import leftArrow from '../icon--prev.svg';
import accessibilityIcon from '../icon--accessibility.svg';
import audioIcon from '../icon--audio.svg';
import plusIcon from '../icon--plus.svg';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class NextPrevButtons extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { isRtl, onNextStep, onPrevStep, expanded, isLastStep, isAccessibilityEnabled, onAccessibilityClick } = this.props;

        const nextPrevButtonsContainerClass = classNames({
            [styles.nextPrevButtonsContainer]: expanded,
            [styles.hidden]: !expanded,
        });

        const prevButtonClass = classNames({
            [styles.rightButton]: expanded && onPrevStep && isRtl,
            [styles.leftButton]: expanded && onPrevStep && !isRtl,
            [styles.disabledButton]: expanded && !onPrevStep,
            [styles.accessibilityEnabled]: expanded && isAccessibilityEnabled
        });

        const accessibilityButtonClass = classNames({
            [styles.middleButton]: expanded,
            [styles.accessibilityEnabled]: expanded && isAccessibilityEnabled,
            [styles.hidden]: !expanded
        });

        const middleButtonClass = classNames({
            [styles.middleButton]: expanded,
            [styles.hidden]: !expanded,
            [styles.accessibilityEnabled]: expanded && isAccessibilityEnabled
        });

        const nextButtonClass = classNames({
            [styles.leftButton]: expanded && onNextStep && isRtl,
            [styles.rightButton]: expanded && onNextStep && !isRtl,
            [styles.disabledButton]: expanded && !onNextStep,
            [styles.hidden]: !expanded,
            [styles.accessibilityEnabled]: expanded && isAccessibilityEnabled
        });

        return (
            <div className={nextPrevButtonsContainerClass}>
                <div className={prevButtonClass} onClick={onPrevStep}>
                    <img draggable={false} src={isRtl ? rightArrow : leftArrow} />
                </div>

                <div onClick={onAccessibilityClick} className={accessibilityButtonClass}>
                    <img draggable={false} src={accessibilityIcon} />
                </div>
                <div className={middleButtonClass}>
                    <img draggable={false} src={audioIcon} />
                </div>
                <div className={middleButtonClass}>
                    <span>?</span>
                </div>

                <div className={nextButtonClass} onClick={onNextStep}>
                    <img draggable={false} src={isLastStep ? plusIcon : rightArrow} />
                </div>
            </div>
        );
    }
}

NextPrevButtons.propTypes = {
    expanded: PropTypes.bool.isRequired,
    isRtl: PropTypes.bool,
    onNextStep: PropTypes.func,
    onPrevStep: PropTypes.func,
    isLastStep: PropTypes.bool,
    isAccessibilityEnabled: PropTypes.bool,
    onAccessibilityClick: PropTypes.func
};

export default NextPrevButtons;