import React from 'react';
import styles from './lesson-next-prev-buttons.css';
import rightArrow from '../icon--next.svg';
import leftArrow from '../icon--prev.svg';
import accessibilityIcon from '../icon--accessibility.svg';
import audioIcon from '../icon--audio.svg';
import plusIcon from '../icon--plus.svg';
import classNames from 'classnames';

let hintTimeout;
class NextPrevButtons extends React.Component {
    constructor() {
        super();
        this.setHintTimeout = this.setHintTimeout.bind(this);
        this.onHintClick = this.onHintClick.bind(this);
        this.state = {
            isHintAvailable: false
        };
    }

    componentDidMount() {
        this.setHintTimeout();
    }

    componentWillUnmount() {
        hintTimeout && clearTimeout(hintTimeout);
    }

    setHintTimeout() {
        hintTimeout = setTimeout(() => {
            this.setState({
                isHintAvailable: true
            });
        }, this.props.hint?.waitTime || 1);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.hint !== this.props.hint) {
            this.setState({
                isHintAvailable: false
            });
            hintTimeout && clearTimeout(hintTimeout);
            this.setHintTimeout();
        }
    }

    onHintClick() {
        if (this.state.isHintAvailable) {
            this.props.onHintClick();
        }
    }

    render() {
        const {
            isRtl,
            onNextStep,
            onPrevStep,
            expanded,
            isLastStep,
            isAccessibilityEnabled,
            onAccessibilityClick,
            onReadOutLoudClick,
            isReadingOutLoud,
            hint,
        } = this.props;

        const isReadOutLoudNotSupported = !window.speechSynthesis || !window.speechSynthesis?.speak || !SpeechSynthesisUtterance;

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

        const audioButtonClass = classNames({
            [styles.middleButton]: expanded,
            [styles.hidden]: !expanded || isReadOutLoudNotSupported,
            [styles.accessibilityEnabled]: expanded && isAccessibilityEnabled,
            [styles.readingOutLoudButton]: isReadingOutLoud,

        });
        
        const hintButtonClass = classNames({
            [styles.middleButton]: expanded,
            [styles.hidden]: !expanded,
            [styles.accessibilityEnabled]: expanded && isAccessibilityEnabled,
            [styles.grayedOut]: !this.state.isHintAvailable,
            [styles.disabledButton]: !hint
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
                <button className={prevButtonClass} onClick={onPrevStep} title="Previous" id="lesson-prevStep-btn">
                    <img draggable={false} src={isRtl ? rightArrow : leftArrow} />
                </button>

                <button onClick={onAccessibilityClick} className={accessibilityButtonClass} title="Accessibility" id="lesson-accessibility-btn">
                    <img draggable={false} src={accessibilityIcon} />
                </button>
                <button className={audioButtonClass} onClick={onReadOutLoudClick} title="Read out loud" id="lesson-readOutLoud-btn">
                    <img draggable={false} src={audioIcon} />
                </button>
                <button className={hintButtonClass} onClick={this.onHintClick} title="Hint" id="lesson-hint-btn">
                    <span>?</span>
                </button>

                <button className={nextButtonClass} onClick={onNextStep} title={isLastStep ? "More Activities" : "Next"} id="lesson-nextStep-btn">
                    <img draggable={false} src={isLastStep ? plusIcon : rightArrow} />
                </button>
            </div>
        );
    }
}

export default NextPrevButtons;