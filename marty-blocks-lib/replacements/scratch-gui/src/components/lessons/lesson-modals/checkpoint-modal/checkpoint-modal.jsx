import React from 'react';
import styles from "./checkpoint-modal.css";
import MultipleChoice from './multiple-choice/multiple-choice.jsx';
import ModalBottomButtons from '../lesson-modal-bottom-buttons/lesson-modal-bottom-buttons.jsx';
import classNames from 'classnames';
import { getDefaultMessageOrText } from '../../lessons.jsx';

class CheckpointModalContent extends React.Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.tryAgainHandler = this.tryAgainHandler.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);

        this.state = {
            answers: [],
            showing: "question", // question, result,
            results: null, // correct, incorrect, null
            idxOfGivenAnswer: null, // only relevant to 'single' question type
        };
    }

    onSubmit() {
        const { answers } = this.state;
        if (!answers || answers.length === 0) {
            return alert("Please select an answer");
        }
        const { correctAnswers, possibleAnswers, questionType } = this.props;
        let correct = true;
        let idxOfGivenAnswer;
        if (questionType === "single") {
            idxOfGivenAnswer = possibleAnswers.findIndex((possibleAnswer) => possibleAnswer.text === answers[0]);
        }
        correctAnswers.forEach((correctAnswer) => {
            if (!answers.includes(correctAnswer)) {
                correct = false;
            }
        });
        if (answers.length !== correctAnswers.length) {
            correct = false;
        }
        if (correct) {
            this.setState({ showing: "result", results: "correct", idxOfGivenAnswer });
        } else {
            this.setState({ showing: "result", results: "incorrect", idxOfGivenAnswer });
        }
    }

    tryAgainHandler() {
        this.setState({ showing: "question", answers: [] });
    }

    handleOptionChange = (changeEvent, singleOrMultiple) => {
        const selectedOption = changeEvent.target.value;
        this.setState(prevState => {
            if (singleOrMultiple === "multiple") {
                // Check if the selected option is already in the array
                if (prevState.answers.includes(selectedOption)) {
                    // Filter out the option if it's already selected
                    return {
                        answers: prevState.answers.filter(answer => answer !== selectedOption)
                    };
                } else {
                    // Add the selected option to the array
                    return {
                        answers: [...prevState.answers, selectedOption]
                    };
                }
            } else {
                return {
                    answers: [selectedOption]
                };
            }
        });
    };

    render() {
        const { onCloseModal, question, possibleAnswers, questionType, answerExplanations, isAccessibilityEnabled, onAccessibilityClick, onExpandImage } = this.props;
        if (this.state.showing === "question") {
            return <QuestionSection
                question={question}
                possibleAnswers={possibleAnswers}
                questionType={questionType}
                setAnswer={(answer) => this.setState({ answers: [answer] })}
                answers={this.state.answers}
                handleOptionChange={this.handleOptionChange}
                onSubmit={this.onSubmit}
                isAccessibilityEnabled={isAccessibilityEnabled}
                onAccessibilityClick={onAccessibilityClick}
                onExpandImage={onExpandImage}
            />;
        } else if (this.state.showing === "result") {
            return <ResultSection
                onCloseModal={onCloseModal}
                results={this.state.results}
                tryAgainHandler={this.tryAgainHandler}
                answerExplanations={answerExplanations}
                idxOfGivenAnswer={this.state.idxOfGivenAnswer}
                answers={this.state.answers}
                question={question}
                questionType={questionType}
                isAccessibilityEnabled={isAccessibilityEnabled}
                onAccessibilityClick={onAccessibilityClick}
            />
        }
    }
}

export default CheckpointModalContent;

function QuestionSection(props) {
    const { question, possibleAnswers, questionType, setAnswer, answers, handleOptionChange, onSubmit, isAccessibilityEnabled, onAccessibilityClick, onExpandImage } = props;
    let answerFieldJSX;
    if (questionType === "text") {
        answerFieldJSX = <input type="text" onChange={(e) => setAnswer(e.target.value)} value={answers[0] || ""} />;
    } else if (questionType === "single") {
        answerFieldJSX = <MultipleChoice isAccessibilityEnabled={isAccessibilityEnabled} possibleAnswers={possibleAnswers} handleOptionChange={(e) => handleOptionChange(e, "single")} selectedAnswers={answers} onExpandImage={onExpandImage} />;
    } else if (questionType === "multiple") {
        answerFieldJSX = <MultipleChoice isAccessibilityEnabled={isAccessibilityEnabled} possibleAnswers={possibleAnswers} handleOptionChange={(e) => handleOptionChange(e, "multiple")} selectedAnswers={answers} onExpandImage={onExpandImage} />;
    }

    const stepBodyClass = classNames(styles.stepBody, {
        [styles.stepBodyAccessibility]: isAccessibilityEnabled
    });
    const checkpointQuestionClass = classNames(styles.checkpointQuestion, {
        [styles.checkpointQuestionAccessibility]: isAccessibilityEnabled
    });
    const checkpointAnswerClass = classNames(styles.checkpointAnswer, {
        [styles.checkpointAnswerAccessibility]: isAccessibilityEnabled
    });

    return (
        <>
            <div className={stepBodyClass}>
                <div className={styles.checkpointContainer}>
                    <div className={checkpointQuestionClass}>
                        {question}
                    </div>
                    <div className={checkpointAnswerClass}>
                        {answerFieldJSX}
                    </div>
                </div>
            </div>
            <ModalBottomButtons
                onCTAClick={onSubmit}
                closeModalButtonTitle={"Submit"}
                isAccessibilityEnabled={isAccessibilityEnabled}
                onAccessibilityClick={onAccessibilityClick}
                textToReadOutLoud={getDefaultMessageOrText(question) + ".\n\n" + (possibleAnswers || []).map(answer => answer.text).join("?\n\n")}
            />
        </>
    );
}

function ResultSection(props) {
    const { onCloseModal, results, question, tryAgainHandler, answers, idxOfGivenAnswer, questionType, isAccessibilityEnabled, onAccessibilityClick } = props;
    let answerExplanations = props.answerExplanations;
    let resultExplanationJSX;
    if (questionType === "text" || questionType === "multiple") {
        if (!answerExplanations) {
            // if there is no answerExplanations, we use default values
            answerExplanations.correctAnswer = "That's correct!"
            answerExplanations.incorrectAnswer = "That's not correct -- try again!"
        }
        resultExplanationJSX = results === "correct" ? answerExplanations.correctAnswer : answerExplanations.incorrectAnswer;
    } else {
        if (!answerExplanations) {
            // if there is no answerExplanations, we use default values 
            resultExplanationJSX = results === "correct" ? "That's correct!" : "That's not correct -- try again!";
        } else {
            resultExplanationJSX = answerExplanations[idxOfGivenAnswer];
        }
    }
    const stepBodyClass = classNames(styles.stepBody, {
        [styles.stepBodyAccessibility]: isAccessibilityEnabled
    });
    const checkpointQuestionClass = classNames(styles.checkpointQuestion, {
        [styles.checkpointQuestionAccessibility]: isAccessibilityEnabled
    });
    const checkpointAnswerClass = classNames(styles.checkpointAnswer, {
        [styles.checkpointAnswerAccessibility]: isAccessibilityEnabled
    });
    const checkpointAnswerResultSpanClass = classNames(styles.checkpointAnswerResultSpan, {
        [styles.checkpointAnswerResultSpanAccessibility]: isAccessibilityEnabled,
        [styles.checkpointAnswerResultSpanCorrect]: results === "correct",
        [styles.checkpointAnswerResultSpanIncorrect]: results === "incorrect"
    });
    const checkpointAnswerAnswersSpanClass = classNames(styles.checkpointAnswerAnswersSpan, {
        [styles.checkpointAnswerAnswersSpanAccessibility]: isAccessibilityEnabled
    });
    const checkpointResultExplanationClass = classNames(styles.checkpointResultExplanation, {
        [styles.checkpointResultExplanationAccessibility]: isAccessibilityEnabled
    });

    return (
        <>
            <div className={stepBodyClass}>
                <div className={styles.checkpointContainer}>
                    <div className={checkpointQuestionClass}>
                        {question}
                    </div>
                    <div className={checkpointAnswerClass}>
                        <span className={checkpointAnswerResultSpanClass}>{results === "correct" ? "CORRECT" : "INCORRECT"}</span><span className={checkpointAnswerAnswersSpanClass}> ({answers.join("- ")})</span>
                    </div>
                    <div className={checkpointResultExplanationClass}>
                        {resultExplanationJSX}
                    </div>
                </div>
            </div>
            <ModalBottomButtons
                onCTAClick={results === "correct" ? onCloseModal : tryAgainHandler}
                closeModalButtonTitle={results === "correct" ? "Close" : "Try Again"}
                isAccessibilityEnabled={isAccessibilityEnabled}
                onAccessibilityClick={onAccessibilityClick}
                textToReadOutLoud={results + ". " + getDefaultMessageOrText(resultExplanationJSX)}
            />
        </>
    );
}