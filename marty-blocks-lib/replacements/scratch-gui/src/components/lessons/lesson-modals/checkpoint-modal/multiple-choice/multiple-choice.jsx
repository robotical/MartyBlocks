import React from 'react';
import styles from "./multiple-choice.css";

class MultipleChoice extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <form className={styles.container}>
                {this.props.possibleAnswers.map((answer, index) => (<MultipleChoiceCheckbox
                    key={index}
                    answer={answer}
                    selectedAnswers={this.props.selectedAnswers}
                    handleOptionChange={this.props.handleOptionChange}
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
        const { answer, selectedAnswers, handleOptionChange } = this.props;

        return (
            <div className={styles.choiceContainer}>
                <img onClick={this.toggleInput} className={styles.choiceImage} src={answer.image} alt={`Option ${answer}`} />
                <div className={styles.choiceCheckbox} onClick={this.toggleInput}><input
                    ref={this.setInputRef}
                    className={styles.choiceInput}
                    id={answer.text}
                    type="checkbox"
                    value={answer.text}
                    checked={selectedAnswers.includes(answer.text)}
                    onChange={handleOptionChange}
                />
                    <label className={styles.choiceLabel} htmlFor={answer.text} />
                    <span className={styles.choiceText}>{answer.text}</span>
                </div>
            </div>
        );
    }
}

export default MultipleChoice;