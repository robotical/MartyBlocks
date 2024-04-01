import React from 'react';
import styles from "./multiple-choice.css";
import classNames from 'classnames';

class MultipleChoice extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className={styles.container}>
                {this.props.possibleAnswers.map((answer, index) => (<MultipleChoiceCheckbox
                    key={index}
                    onExpandImage={this.props.onExpandImage}
                    answer={answer}
                    selectedAnswers={this.props.selectedAnswers}
                    handleOptionChange={this.props.handleOptionChange}
                    isAccessibilityEnabled={this.props.isAccessibilityEnabled}
                />
                ))}
            </form>
        );
    }
}


class MultipleChoiceCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.setInputRef = this.setInputRef.bind(this);
        this.toggleInput = this.toggleInput.bind(this);
        this.inputRef = null;
    }

    setInputRef(inputElem) {
        this.inputRef = inputElem;
    }

    toggleInput() {
        if (this.inputRef) {
            this.inputRef.click();
        }
    }


    render() {
        const { answer, selectedAnswers, handleOptionChange, isAccessibilityEnabled, onExpandImage } = this.props;

        const choiceContainerClass = classNames(styles.choiceContainer, {
            [styles.choiceContainerAccessibility]: isAccessibilityEnabled
        });
        const choiceImageClass = classNames(styles.choiceImage, {
            [styles.choiceImageAccessibility]: isAccessibilityEnabled
        });
        const choiceCheckboxClass = classNames(styles.choiceCheckbox, {
            [styles.choiceCheckboxAccessibility]: isAccessibilityEnabled
        });
        const choiceTextClass = classNames(styles.choiceText, {
            [styles.choiceTextAccessibility]: isAccessibilityEnabled
        });
        const choiceLabelClass = classNames(styles.choiceLabel, {
            [styles.choiceLabelAccessibility]: isAccessibilityEnabled
        });
        return (
            <div className={choiceContainerClass} onClick={this.toggleInput}>
                <img onClick={(e) => onExpandImage(e, answer.image)} className={choiceImageClass} src={answer.image} alt={`Option ${answer}`} />
                <div className={choiceCheckboxClass} onClick={this.toggleInput}><input
                    ref={this.setInputRef}
                    className={styles.choiceInput}
                    id={answer.text}
                    type="checkbox"
                    value={answer.text}
                    checked={selectedAnswers.includes(answer.text)}
                    onChange={handleOptionChange}
                />
                    <label className={choiceLabelClass} htmlFor={answer.text} />
                    <span className={choiceTextClass}>{answer.text}</span>
                </div>
            </div>
        );
    }
}

export default MultipleChoice;