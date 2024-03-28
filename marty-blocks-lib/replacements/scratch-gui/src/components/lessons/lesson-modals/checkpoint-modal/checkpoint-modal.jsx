import React from 'react';
import styles from "./checkpoint-modal.css";
import MultipleChoice from './multiple-choice/multiple-choice.jsx';
import ModalBottomButtons from '../lesson-modal-bottom-buttons/lesson-modal-bottom-buttons.jsx';

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
            idxOfGivenAnswer: null // only relevant to 'single' question type
        };
    }

    onSubmit() {
        const { answers } = this.state;
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
        const { onCloseModal, question, possibleAnswers, questionType, answerExplanations } = this.props;

        if (this.state.showing === "question") {
            return <QuestionSection
                question={question}
                possibleAnswers={possibleAnswers}
                questionType={questionType}
                setAnswer={(answer) => this.setState({ answers: [answer] })}
                answers={this.state.answers}
                handleOptionChange={this.handleOptionChange}
                onSubmit={this.onSubmit}
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
            />
        }
    }
}

export default CheckpointModalContent;

function QuestionSection(props) {
    const { question, possibleAnswers, questionType, setAnswer, answers, handleOptionChange, onSubmit } = props;
    let answerFieldJSX;
    if (questionType === "text") {
        answerFieldJSX = <input type="text" onChange={(e) => setAnswer(e.target.value)} value={answers[0] || ""} />;
    } else if (questionType === "single") {
        answerFieldJSX = <MultipleChoice possibleAnswers={possibleAnswers} handleOptionChange={(e) => handleOptionChange(e, "single")} selectedAnswers={answers} />;
    } else if (questionType === "multiple") {
        answerFieldJSX = <MultipleChoice possibleAnswers={possibleAnswers} handleOptionChange={(e) => handleOptionChange(e, "multiple")} selectedAnswers={answers} />;
    }

    return (
        <>
            <div className={styles.stepBody}>
                <div className={styles.checkpointContainer}>
                    <div className={styles.checkpointQuestion}>
                        {question}
                    </div>
                    <div className={styles.checkpointAnswer}>
                        {answerFieldJSX}
                    </div>
                </div>
            </div>
            <ModalBottomButtons
                onCTAClick={onSubmit}
                closeModalButtonTitle={"Submit"}
            />
        </>
    );
}

function ResultSection(props) {
    const { onCloseModal, results, question, tryAgainHandler, answers, answerExplanations, idxOfGivenAnswer, questionType } = props;
    let resultExplanationJSX;
    if (questionType === "text" || questionType === "multiple") {
        resultExplanationJSX = results === "correct" ? answerExplanations.correctAnswer : answerExplanations.incorrectAnswer;
    } else {
        resultExplanationJSX = answerExplanations[idxOfGivenAnswer];
    }
    return (
        <>
            <div className={styles.stepBody}>
                <div className={styles.checkpointContainer}>
                    <div className={styles.checkpointQuestion}>
                        {question}
                    </div>
                    <div className={styles.checkpointAnswer}>
                        <span className={styles.checkpointAnswerResultSpan}>{results === "correct" ? "CORRECT" : "INCORRECT"}</span><span className={styles.checkpointAnswerAnswersSpan}> ({answers.join("- ")})</span>
                    </div>
                    <div className={styles.checkpointResultExplanation}>
                        {resultExplanationJSX}
                    </div>
                </div>
            </div>
            <ModalBottomButtons
                onCTAClick={results === "correct" ? onCloseModal : tryAgainHandler}
                closeModalButtonTitle={results === "correct" ? "Close" : "Try Again"}
            />
        </>
    );
}