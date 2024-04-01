import React from 'react';
import styles from "./lesson-modal-bottom-buttons.css"
import rightArrow from '../../icon--next.svg';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import audioIcon from '../../icon--audio.svg';
import accessibilityIcon from '../../icon--accessibility.svg';

class ModalBottomButtons extends React.Component {

    constructor() {
        super();
        this.onReadOutLoudClick = this.onReadOutLoudClick.bind(this);

        this.state = {
            isReadingOutLoud: false
        }
    }

    onReadOutLoudClick() {
        if (this.state.isReadingOutLoud) {
            window.speechSynthesis.cancel();
            this.setState({ isReadingOutLoud: false });
            return;
        }
        this.setState({ isReadingOutLoud: true });
        const utterance = new SpeechSynthesisUtterance(this.props.textToReadOutLoud);
        utterance.rate = 0.7;
        utterance.pitch = 1.4;
        utterance.onend = () => {
            this.setState({ isReadingOutLoud: false });
        };
        window.speechSynthesis.speak(utterance);
    }

    render() {
        const { onCTAClick, isAccessibilityEnabled, onAccessibilityClick, closeModalButtonTitle = "Start", textToReadOutLoud } = this.props;

        const startLessonButtonClass = classNames({
            [styles.startLessonButton]: !!onCTAClick,
            [styles.startLessonButtonAccessibility]: isAccessibilityEnabled
        });

        const accessibilityButtonClass = classNames({
            [styles.middleButton]: true,
            [styles.middleButtonAccessibility]: isAccessibilityEnabled
        });

        const audioButtonClass = classNames({
            [styles.middleButton]: true,
            [styles.middleButtonAccessibility]: isAccessibilityEnabled,
            [styles.readingOutLoudButton]: this.state.isReadingOutLoud,
            [styles.hidden]: !textToReadOutLoud
        });

        return (
            <div className={styles.lessonStartModalButtonsContainer}>

                <button className={accessibilityButtonClass} onClick={onAccessibilityClick} title="Accessibility">
                    <img draggable={false} src={accessibilityIcon} />
                </button>
                <button className={audioButtonClass} onClick={this.onReadOutLoudClick} title="Read out loud">
                    <img draggable={false} src={audioIcon} />
                </button>

                {onCTAClick && (
                    <button className={startLessonButtonClass} onClick={onCTAClick} title={closeModalButtonTitle}>
                        <img draggable={false} src={rightArrow} />
                        <span>{closeModalButtonTitle}</span>
                    </button>
                )}
            </div>
        );
    }
}

ModalBottomButtons.propTypes = {
    onCTAClick: PropTypes.func,
};

export default ModalBottomButtons;