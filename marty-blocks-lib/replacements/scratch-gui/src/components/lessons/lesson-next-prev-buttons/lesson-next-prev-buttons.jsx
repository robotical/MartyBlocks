import React from 'react';
import styles from './lesson-next-prev-buttons.css';
import rightArrow from '../icon--next.svg';
import leftArrow from '../icon--prev.svg';
import accessibilityIcon from '../icon--accessibility.svg';
import audioIcon from '../icon--audio.svg';
import plusIcon from '../icon--plus.svg';
import PropTypes from 'prop-types';
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
        }, 5000);
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
            [styles.hidden]: !expanded,
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
                <div className={prevButtonClass} onClick={onPrevStep}>
                    <img draggable={false} src={isRtl ? rightArrow : leftArrow} />
                </div>

                <div onClick={onAccessibilityClick} className={accessibilityButtonClass}>
                    <img draggable={false} src={accessibilityIcon} />
                </div>
                <div className={audioButtonClass} onClick={onReadOutLoudClick}>
                    <img draggable={false} src={audioIcon} />
                </div>
                <div className={hintButtonClass} onClick={this.onHintClick}>
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