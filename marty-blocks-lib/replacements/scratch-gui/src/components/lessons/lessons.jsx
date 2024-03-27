import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import Draggable from 'react-draggable';

import styles from './lessons.css';

import shrinkIcon from './icon--shrink.svg';
import expandIcon from './icon--expand.svg';

import rightArrow from './icon--next.svg';
import leftArrow from './icon--prev.svg';

import audioIcon from './icon--audio.svg';
import accessibilityIcon from './icon--accessibility.svg';

import helpIcon from '../../lib/assets/icon--tutorials.svg';
import closeIcon from './icon--close.svg';

import { translateVideo } from '../../lib/libraries/decks/translate-video.js';
import { translateImage } from '../../lib/libraries/decks/translate-image.js';

const LessonHeader = ({ onCloseLessons, onShrinkExpandLessons, lessonTitle, step, expanded }) => (
    <div className={expanded ? styles.headerButtons : classNames(styles.headerButtons, styles.headerButtonsHidden)}
        style={{
            gridTemplateColumns: step === undefined ? "max-content 1fr" : "min-content max-content 1fr"
        }}>
        {step !== undefined && <div
            className={styles.stepNumberOnTitle}
        >
            {step + 1}
        </div>}
        <div className={styles.lessonTitleContainer}>
            <span className={styles.lessonTitle}>{lessonTitle}</span>
        </div>
        <div className={styles.headerButtonsRight}>
            {onShrinkExpandLessons && <div
                className={styles.shrinkExpandButton}
                onClick={onShrinkExpandLessons}
            >
                <img
                    draggable={false}
                    src={expanded ? shrinkIcon : expandIcon}
                />
                {expanded ?
                    <FormattedMessage
                        defaultMessage="Shrink"
                        description="Title for button to shrink how-to lesson"
                        id="gui.lessons.shrink"
                    /> :
                    <FormattedMessage
                        defaultMessage="Expand"
                        description="Title for button to expand how-to lesson"
                        id="gui.lessons.expand"
                    />
                }
            </div>}
            <div
                className={styles.removeButton}
                onClick={onCloseLessons}
            >
                <img
                    className={styles.closeIcon}
                    src={closeIcon}
                />
                <FormattedMessage
                    defaultMessage="Close"
                    description="Title for button to close how-to lesson"
                    id="gui.lessons.close"
                />
            </div>
        </div>
    </div>
);

class VideoStep extends React.Component {

    componentDidMount() {

    }


    render() {
        return (
            <div style={{ width: '100%' }}>
                <video style={{ width: '100%', height: 'auto' }} controls>
                    <source src={this.props.video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    }
}

VideoStep.propTypes = {
    expanded: PropTypes.bool.isRequired,
    video: PropTypes.string.isRequired
};

const ImageStep = ({ image, title }) => (
    <Fragment>
        <div className={styles.stepImageContainer}>
            {title && <div className={styles.stepTitle}>
                {title}
            </div>}
            <img
                className={styles.stepImage}
                draggable={false}
                key={image} /* Use src as key to prevent hanging around on slow connections */
                src={image}
            />
        </div>
    </Fragment>
);

ImageStep.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.node.isRequired
};

const ModalBottomButtons = ({ onCTAClick, closeModalButtonTitle = "Start" }) => (
    <div className={styles.lessonStartModalButtonsContainer}>

        <div className={styles.middleButton}>
            <img draggable={false} src={accessibilityIcon} />
        </div>
        <div className={styles.middleButton}>
            <img draggable={false} src={audioIcon} />
        </div>

        <div
            className={styles.startLessonButton}
            onClick={onCTAClick}
        >
            <img
                draggable={false}
                src={rightArrow}
            />
            <span>{closeModalButtonTitle}</span>
        </div>
    </div>
);

ModalBottomButtons.propTypes = {
    onCTAClick: PropTypes.func,
};

const NextPrevButtons = ({ isRtl, onNextStep, onPrevStep, expanded }) => (
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
                src={isRtl ? leftArrow : rightArrow}
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

LessonHeader.propTypes = {
    expanded: PropTypes.bool.isRequired,
    onCloseLessons: PropTypes.func.isRequired,
    onShrinkExpandLessons: PropTypes.func,
    step: PropTypes.number,
    lessonTitle: PropTypes.string
};

const PreviewsStep = ({ deckIds, content, onActivateDeckFactory }) => (
    <Fragment>
        <div className={styles.stepTitle}>
            <FormattedMessage
                defaultMessage="More things to try!"
                description="Title lesson with more things to try"
                id="gui.lessons.more-things-to-try"
            />
        </div>
        <div className={styles.decks}>
            {deckIds.slice(0, 2).map(id => (
                <div
                    className={styles.deck}
                    key={`deck-preview-${id}`}
                    onClick={onActivateDeckFactory(id)}
                >
                    <img
                        className={styles.deckImage}
                        draggable={false}
                        src={content[id].img}
                    />
                    <div className={styles.deckName}>{content[id].name}</div>
                </div>
            ))}
        </div>
        <div className={styles.seeAll}>
            <div
                className={styles.seeAllButton}
            >
                <FormattedMessage
                    defaultMessage="See more"
                    description="Title for button to see more in how-to library"
                    id="gui.lessons.see-more"
                />
            </div>
        </div>
    </Fragment>
);

PreviewsStep.propTypes = {
    content: PropTypes.shape({
        id: PropTypes.shape({
            name: PropTypes.node.isRequired,
            img: PropTypes.string.isRequired,
            steps: PropTypes.arrayOf(PropTypes.shape({
                title: PropTypes.node,
                image: PropTypes.string,
                video: PropTypes.string,
                deckIds: PropTypes.arrayOf(PropTypes.string)
            }))
        })
    }).isRequired,
    deckIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    onActivateDeckFactory: PropTypes.func.isRequired,
};

const LessonStartModalContent = ({ content, activeDeckId, onCloseModal }) => {
    const { img, description } = content[activeDeckId];

    return (
        <>
            <div className={styles.stepBody}>
                <ImageStep
                    image={img}
                    title={description}
                />
            </div>
            <ModalBottomButtons
                onCTAClick={onCloseModal}
                closeModalButtonTitle={"Start"}
            />
        </>
    );
};

class MultipleChoice extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form>
                {this.props.possibleAnswers.map((answer, index) => (
                    <div key={index}>
                        <label>
                            <input
                                type="checkbox"
                                value={answer.text}
                                checked={this.props.selectedAnswers.includes(answer.text)}
                                onChange={this.props.handleOptionChange}
                            />
                            {answer.text}
                            <img src={answer.image} alt={`Option ${index}`} />
                        </label>
                    </div>
                ))}
            </form>
        );
    }
}

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

    handleOptionChange = (changeEvent) => {
        const selectedOption = changeEvent.target.value;
        this.setState(prevState => {
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
        });
    };

    render() {
        const { onCloseModal, question, possibleAnswers, questionType, answerExplanations } = this.props;

        if (this.state.showing === "question") {
            let answerFieldJSX;
            if (questionType === "text") {
                answerFieldJSX = <input type="text" onChange={(e) => this.setState({ answers: [e.target.value] })} value={this.state.answers[0] || ""} />;
            } else if (questionType === "single") {
                answerFieldJSX = <MultipleChoice possibleAnswers={possibleAnswers} handleOptionChange={this.handleOptionChange} selectedAnswers={this.state.answers} />;
            } else if (questionType === "multiple") {
                answerFieldJSX = <MultipleChoice possibleAnswers={possibleAnswers} handleOptionChange={this.handleOptionChange} selectedAnswers={this.state.answers} />;
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
                        onCTAClick={this.onSubmit}
                        closeModalButtonTitle={"Submit"}
                    />
                </>
            );
        } else if (this.state.showing === "result") {
            let resultExplanationJSX;
            if (questionType === "text" || questionType === "multiple") {
                resultExplanationJSX = this.state.results === "correct" ? answerExplanations.correctAnswer : answerExplanations.incorrectAnswer;
            } else {
                resultExplanationJSX = answerExplanations[this.state.idxOfGivenAnswer];
            }
            return (
                <>
                    <div className={styles.stepBody}>
                        <div className={styles.checkpointContainer}>
                            <div className={styles.checkpointQuestion}>
                                {question}
                            </div>
                            <div className={styles.checkpointAnswer}>
                                {this.state.answers.join(", ")}
                            </div>
                            <div className={styles.checkpointResult}>
                                <span>{this.state.results === "correct" ? "Correct!" : "Incorrect!"}</span>
                                <div className={styles.checkpointResultExplanation}>
                                    {resultExplanationJSX}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ModalBottomButtons
                        onCTAClick={this.state.results === "correct" ? onCloseModal : this.tryAgainHandler}
                        closeModalButtonTitle={this.state.results === "correct" ? "Close" : "Try Again"}
                    />
                </>
            );
        }
    }
}

class Lessons extends React.Component {
    constructor(props) {
        super(props);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.showCheckpointModal = this.showCheckpointModal.bind(this);
        this.state = {
            modal: {
                title: this.props.content[this.props.activeDeckId].name,
                content: <LessonStartModalContent {...this.props} onCloseModal={this.onCloseModal} />,
            }
        };
    }

    onCloseModal = () => {
        this.setState({
            modal: {
                title: '',
                content: '',
            }
        });
    }

    showCheckpointModal = (steps, stepId) => {
        this.setState({
            modal: {
                title: "CHECKPOINT",
                content: <CheckpointModalContent
                    question={steps[stepId].question}
                    questionType={steps[stepId].questionType}
                    possibleAnswers={steps[stepId].possibleAnswers}
                    correctAnswers={steps[stepId].correctAnswers}
                    answerExplanations={steps[stepId].answerExplanations}
                    onCloseModal={this.onCloseModal}
                />,
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.step !== prevProps.step) {
            const steps = this.props.content[this.props.activeDeckId].steps;
            const stepId = this.props.step;
            if (steps[stepId].type === "checkpoint") {
                this.showCheckpointModal(steps, stepId);
            }
        }
    }

    render() {

        const {
            activeDeckId,
            content,
            dragging,
            isRtl,
            locale,
            onActivateDeckFactory,
            onCloseLessons,
            onShrinkExpandLessons,
            onDrag,
            onStartDrag,
            onEndDrag,
            onNextStep,
            onPrevStep,
            step,
            expanded,
        } = this.props;

        if (activeDeckId === null) return;

        // Tutorial lessons need to calculate their own dragging bounds
        // to allow for dragging the lessons off the left, right and bottom
        // edges of the workspace.
        const lessonHorizontalDragOffset = 400; // ~80% of lesson width
        const menuBarHeight = 46; // TODO: get pre-calculated from elsewhere?

        const steps = content[activeDeckId].steps;
        return (
            // Custom overlay to act as the bounding parent for the draggable, using values from above
            <div
                className={styles.cardContainerOverlay}
                style={{
                    width: `${window.innerWidth + (2 * lessonHorizontalDragOffset)}px`,
                    height: expanded ? `${window.innerHeight - menuBarHeight}px` : 'auto',
                    top: `${menuBarHeight}px`,
                    left: `${-lessonHorizontalDragOffset}px`
                }}
            >
                {
                    this.state.modal.content && this.state.modal.title && <div
                        className={styles.modalContainerOverlay}
                    >
                        <Draggable
                            bounds="parent"
                            cancel="#video-div" // disable dragging on video div
                            disabled={true}
                            onDrag={onDrag}
                            onStart={onStartDrag}
                            onStop={onEndDrag}
                        >
                            <div className={styles.modalContainer}>
                                <div className={styles.card}>
                                    <LessonHeader
                                        expanded={true}
                                        lessonTitle={this.state.modal.title}
                                        onCloseLessons={this.onCloseModal}
                                    />
                                    {this.state.modal.content}
                                </div>
                            </div>
                        </Draggable>
                    </div>
                }
                <Draggable
                    bounds="parent"
                    cancel="#video-div" // disable dragging on video div
                    // top right
                    position={{
                        x: window.innerWidth + 50, // the + is the difference the styles.cardContainer width has from 400. Currently is set at 350 so 400 - 350 = 50
                        y: menuBarHeight
                    }}
                    disabled={true}
                    onDrag={onDrag}
                    onStart={onStartDrag}
                    onStop={onEndDrag}
                >
                    <div className={styles.cardContainer} style={{
                        height: `calc(100% - ${menuBarHeight}px)`
                    }}>
                        <div className={styles.card} style={{
                            height: expanded ? '100%' : 'auto'
                        }}>
                            <LessonHeader
                                expanded={expanded}
                                step={step}
                                lessonTitle={content[activeDeckId].name}
                                onCloseLessons={onCloseLessons}
                                onShrinkExpandLessons={onShrinkExpandLessons}
                            />
                            <div className={expanded ? styles.stepBody : styles.hidden}>
                                <div className={styles.progressBarOuterContainer}>
                                    <div className={styles.progressBarContainer}>
                                        <div className={styles.progressBar} style={{ width: `calc(${step + 1} / ${steps.length} * 100%)` }}></div>
                                    </div>
                                    <span className={styles.progressBarRemainingSteps}>{step + 1}/{steps.length}</span>
                                </div>
                                {steps[step].type === "info" && <>
                                    {
                                        steps[step].description && (
                                            <div className={styles.stepDescription}>
                                                {steps[step].description}
                                            </div>
                                        )
                                    }
                                    {steps[step].video && (
                                        <VideoStep
                                            dragging={dragging}
                                            expanded={expanded}
                                            video={translateVideo(steps[step].video, locale)}
                                        />
                                    )}
                                    {steps[step].image && (
                                        <ImageStep
                                            image={translateImage(steps[step].image, locale)}
                                        />
                                    )}
                                </>
                                }
                                {steps[step].type === "checkpoint" && <>
                                    <div className={styles.checkpointStepTitle}>
                                        <span>Checkpoint Question</span>
                                    </div>
                                    {
                                        steps[step].question && (
                                            <div className={styles.stepDescription}>
                                                {steps[step].question}
                                            </div>
                                        )
                                    }
                                    {
                                        <div className={styles.checkpointTryAgainDiv}>
                                            <button onClick={() => this.showCheckpointModal(steps, step)}>Try Again</button>
                                        </div>
                                    }
                                </>}
                            </div>
                            <NextPrevButtons
                                expanded={expanded}
                                isRtl={isRtl}
                                onNextStep={step < steps.length - 1 ? onNextStep : null}
                                onPrevStep={step > 0 ? onPrevStep : null}
                            />
                        </div>
                    </div>
                </Draggable>
            </div>
        );
    }
};

Lessons.propTypes = {
    activeDeckId: PropTypes.string.isRequired,
    content: PropTypes.shape({
        id: PropTypes.shape({
            name: PropTypes.node.isRequired,
            img: PropTypes.string.isRequired,
            steps: PropTypes.arrayOf(PropTypes.shape({
                title: PropTypes.node,
                image: PropTypes.string,
                video: PropTypes.string,
                deckIds: PropTypes.arrayOf(PropTypes.string)
            }))
        })
    }),
    dragging: PropTypes.bool.isRequired,
    expanded: PropTypes.bool.isRequired,
    isRtl: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
    onActivateDeckFactory: PropTypes.func.isRequired,
    onCloseLessons: PropTypes.func.isRequired,
    onDrag: PropTypes.func,
    onEndDrag: PropTypes.func,
    onNextStep: PropTypes.func.isRequired,
    onPrevStep: PropTypes.func.isRequired,
    onShrinkExpandLessons: PropTypes.func.isRequired,
    onStartDrag: PropTypes.func,
    step: PropTypes.number.isRequired,
    x: PropTypes.number,
    y: PropTypes.number
};

Lessons.defaultProps = {
    showVideos: true
};

export {
    Lessons as default,
    // Others exported for testability
    ImageStep,
    VideoStep
};
