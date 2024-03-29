import React from 'react';
import styles from "./lesson-modal-bottom-buttons.css"
import rightArrow from '../../icon--next.svg';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import audioIcon from '../../icon--audio.svg';
import accessibilityIcon from '../../icon--accessibility.svg';

class ModalBottomButtons extends React.Component {

    render() {
        const { onCTAClick, isAccessibilityEnabled, onAccessibilityClick, closeModalButtonTitle = "Start" } = this.props;

        const startLessonButtonClass = classNames({
            [styles.startLessonButton]: !!onCTAClick,
            [styles.startLessonButtonAccessibility]: isAccessibilityEnabled
        });

        const accessibilityButtonClass = classNames({
            [styles.middleButton]: true,
            [styles.middleButtonAccessibility]: isAccessibilityEnabled
        });

        return (
            <div className={styles.lessonStartModalButtonsContainer}>

                <div className={accessibilityButtonClass} onClick={onAccessibilityClick}>
                    <img draggable={false} src={accessibilityIcon} />
                </div>
                <div className={accessibilityButtonClass}>
                    <img draggable={false} src={audioIcon} />
                </div>

                {onCTAClick && (
                    <div className={startLessonButtonClass} onClick={onCTAClick}>
                        <img draggable={false} src={rightArrow} />
                        <span>{closeModalButtonTitle}</span>
                    </div>
                )}
            </div>
        );
    }
}

ModalBottomButtons.propTypes = {
    onCTAClick: PropTypes.func,
};

export default ModalBottomButtons;