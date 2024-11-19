import PropTypes from 'prop-types';
import React from 'react';

import styles from './lessons.css';
import classNames from 'classnames';

import LessonStartModalContent from './lesson-modals/start-modal/start-modal.jsx';
import CheckpointModalContent from './lesson-modals/checkpoint-modal/checkpoint-modal.jsx';
import ExtensionProjectsModal from './lesson-modals/extension-projects-modal/extension-projects-modal.jsx';
import HintModalContent from './lesson-modals/hint-modal/hint-modal.jsx';

import LessonHeader from "./lesson-header/lesson-header.jsx";
import VideoStep from './lesson-video/lesson-video.jsx';
import ImageStep from './lesson-image/lesson-image.jsx';
import NextPrevButtons from './lesson-next-prev-buttons/lesson-next-prev-buttons.jsx';
import ReadOutLoudTextExtractor from './utils/extract-intl-text.jsx';

import LessonUIHelper from './LessonUIHelper.js';

export const getDefaultMessageOrText = (componentOrText) => {
    /* Helper function that gets the default message from a FormattedMessage component or returns the plain text if there is no component */
    if (componentOrText && componentOrText.props && componentOrText.props.defaultMessage) {
        return componentOrText.props.defaultMessage;
    }
    return componentOrText || '';
}

class Lessons extends React.Component {
    constructor(props) {
        super(props);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.showCheckpointModal = this.showCheckpointModal.bind(this);
        this.onOpenExtensionProjectsModal = this.onOpenExtensionProjectsModal.bind(this);
        this.onAccessibilityClick = this.onAccessibilityClick.bind(this);
        this.onReadOutLoudClick = this.onReadOutLoudClick.bind(this);
        this.onHintClick = this.onHintClick.bind(this);
        this.setExpandedImage = this.setExpandedImage.bind(this);
        this.setExpandedVideo = this.setExpandedVideo.bind(this);
        this.handleTextExtracted = this.handleTextExtracted.bind(this);
        this.state = {
            expandedImage: '',
            expandedVideo: '',
            modal: {
                title: '',
                content: '' //"lesson-start-modal-content" / "checkpoint-modal-content" / "extension-projects-modal-content" / "hint-modal-content"
            },
            isAccessibilityEnabled: false,
            isReadingOutLoud: false,
            extractedText: "",
        };
    }

    handleTextExtracted = (text) => {
        this.setState({ extractedText: text });
    }

    componentDidMount() {
        LessonUIHelper.highlightBlocks([]);
        this.setState({
            modal: {
                title: this.props.content[this.props.activeDeckId].name,
                content: "lesson-start-modal-content",
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.step !== prevProps.step) {
            const steps = this.props.content[this.props.activeDeckId].steps;
            const stepId = this.props.step;
            if (steps[stepId].type === "checkpoint") {
                // first check if we are coming from a "previous" button click
                if (this.props.step < prevProps.step) {
                    // if we are coming from a previous button click, we don't want to show the checkpoint modal
                } else {
                    this.showCheckpointModal();
                }
            }
        }
        if (this.props.activeDeckId !== prevProps.activeDeckId) {
            this.setState({
                modal: {
                    title: this.props.content[this.props.activeDeckId].name,
                    content: "lesson-start-modal-content",
                }
            });
        }
    }

    onAccessibilityClick() {
        this.setState({ isAccessibilityEnabled: !this.state.isAccessibilityEnabled });
    }

    onCloseModal() {
        this.setState({
            modal: {
                title: '',
                content: '',
            }
        });
        // go to the next step if the modal was a checkpoint
        if (this.props.content[this.props.activeDeckId].steps[this.props.step].type === "checkpoint") {
            this.props.onNextStep();
        }
    }

    onReadOutLoudClick() {
        if (!window.speechSynthesis || !window.speechSynthesis?.speak || !SpeechSynthesisUtterance) {
            return;
        }
        if (this.state.isReadingOutLoud) {
            window.speechSynthesis.cancel();
            this.setState({ isReadingOutLoud: false });
            return;
        }
        this.setState({ isReadingOutLoud: true });
        const steps = this.props.content[this.props.activeDeckId].steps;
        const currentStepUtterance = "Step " + (this.props.step + 1) + " of " + steps.length + ". "
        const utterance = new SpeechSynthesisUtterance(currentStepUtterance + this.state.extractedText);
        utterance.rate = 1;
        utterance.pitch = 1.4;
        utterance.onend = () => {
            this.setState({ isReadingOutLoud: false });
        };
        window.speechSynthesis.speak(utterance);
    }

    showCheckpointModal = () => {
        this.setState({
            modal: {
                title: "CHECKPOINT",
                content: "checkpoint-modal-content",
            }
        });
    }

    onOpenExtensionProjectsModal = () => {
        this.setState({
            modal: {
                title: "Extension Projects",
                content: "extension-projects-modal-content",
            }
        });
    }

    onHintClick = () => {
        this.setState({
            modal: {
                title: "Hint",
                content: "hint-modal-content",
            }
        });
    }

    setExpandedImage(e, image) {
        e.stopPropagation(); // we are stopping the event from bubbling up to the parent div. This helps in the checkpoint modal, where the image is inside the button that selects that option. When the image is clicked, the option won't be selected.
        this.setState({ expandedImage: image });
    }

    setExpandedVideo(e, video) {
        e.stopPropagation();
        e.preventDefault(); // preventing default so the video doesn't play in the background
        if (e.target && e.target.tagName === 'VIDEO') {
            e.target.pause(); // we also make sure to pause the video if it's playing
        }
        this.setState({ expandedVideo: video });
    }

    render() {

        const {
            activeDeckId,
            content,
            isRtl,
            onCloseLessons,
            onShrinkExpandLessons,
            onNextStep,
            onPrevStep,
            step,
            expanded,
        } = this.props;

        if (activeDeckId === null) return;

        const steps = content[activeDeckId].steps;
        const stepType = steps[step].type;

        const cardClass = classNames({
            [styles.card]: true,
            [styles.cardAccesibility]: this.state.isAccessibilityEnabled
        });

        const stepBodyClass = classNames({
            [styles.stepBody]: expanded,
            [styles.hidden]: !expanded,
            [styles.stepBodyAccessibility]: this.state.isAccessibilityEnabled
        });

        const progressBarClass = classNames({
            [styles.progressBar]: true,
            [styles.progressBarAccessibility]: this.state.isAccessibilityEnabled
        });

        const progressBarOuterContainerClass = classNames({
            [styles.progressBarOuterContainer]: true,
            [styles.progressBarOuterContainerAccessibility]: this.state.isAccessibilityEnabled
        });

        const progressBarContainerClass = classNames({
            [styles.progressBarContainer]: true,
            [styles.progressBarContainerAccessibility]: this.state.isAccessibilityEnabled
        });

        const progressBarRemainingStepsClass = classNames({
            [styles.progressBarRemainingSteps]: true,
            [styles.progressBarRemainingStepsAccessibility]: this.state.isAccessibilityEnabled
        });

        const stepDescriptionClass = classNames({
            [styles.stepDescription]: true,
            [styles.stepDescriptionAccessibility]: this.state.isAccessibilityEnabled
        });

        const checkpointStepTitleClass = classNames({
            [styles.checkpointStepTitle]: true,
            [styles.checkpointStepTitleAccessibility]: this.state.isAccessibilityEnabled
        });

        const checkpointTryAgainDivClass = classNames({
            [styles.checkpointTryAgainDiv]: true,
            [styles.checkpointTryAgainDivAccessibility]: this.state.isAccessibilityEnabled
        });

        return (
            <div className={styles.cardContainerOverlay} style={{ height: expanded ? "calc(100% - 44px)" : 'auto' }}>
                {
                    // EXPANDED IMAGE MODAL
                    this.state.expandedImage && <div className={styles.modalContainerOverlayExpandedImage}
                        onClick={e => {
                            e.stopPropagation();
                            this.setState({ expandedImage: false });
                        }}>
                        <div className={styles.modalContainer}>
                            <div className={cardClass}>
                                <LessonHeader
                                    expanded={true}
                                    lessonTitle={"Expanded Image"}
                                    onCloseLessons={() => this.setState({ expandedImage: false })}
                                    isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                                />
                            </div>
                            <div className={cardClass}>
                                <div style={{ width: "100%", backgroundColor: "white" }}>
                                    <img
                                        className={styles.stepImageExpanded}
                                        draggable={false}
                                        key={this.state.expandedImage} /* Use src as key to prevent hanging around on slow connections */
                                        src={this.state.expandedImage}
                                        style={{ filter: this.state.isAccessibilityEnabled ? 'invert(1)' : 'none' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    // EXPANDED VIDEO MODAL
                    this.state.expandedVideo && <div className={styles.modalContainerOverlayExpandedImage}
                        onClick={e => {
                            e.stopPropagation()
                            this.setState({ expandedVideo: false })
                        }}
                    >
                        <div className={styles.modalContainer}>
                            <div className={cardClass}>
                                <LessonHeader
                                    expanded={true}
                                    lessonTitle={"Expanded Video"}
                                    onCloseLessons={() => this.setState({ expandedVideo: false })}
                                    isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                                />
                            </div>
                            <div className={cardClass}>
                                <div style={{ width: "100%", backgroundColor: "white" }}>
                                    <video
                                        autoPlay
                                        className={styles.stepImageExpanded}
                                        draggable={false}
                                        key={this.state.expandedVideo} /* Use src as key to prevent hanging around on slow connections */
                                        src={this.state.expandedVideo}
                                        style={{ filter: this.state.isAccessibilityEnabled ? 'grayscale(100%)' : 'none' }}
                                        controls
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    // MODALS such as Start Lesson, Checkpoint, Extension Projects, Hint
                    this.state.modal.content && this.state.modal.title && <div
                        className={styles.modalContainerOverlay}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className={styles.modalContainer}>
                            <div className={cardClass}>
                                <LessonHeader
                                    expanded={true}
                                    lessonTitle={this.state.modal.title}
                                    onCloseLessons={this.state.modal.content === "checkpoint-modal-content" ? undefined : this.onCloseModal}
                                    isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                                />
                                {this.state.modal.content === "lesson-start-modal-content" && <LessonStartModalContent
                                    {...this.props}
                                    onCloseModal={this.onCloseModal}
                                    isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                                    onAccessibilityClick={this.onAccessibilityClick} />
                                }
                                {this.state.modal.content === "checkpoint-modal-content" && <CheckpointModalContent
                                    question={steps[step].question}
                                    questionType={steps[step].questionType}
                                    possibleAnswers={steps[step].possibleAnswers}
                                    correctAnswers={steps[step].correctAnswers}
                                    answerExplanations={steps[step].answerExplanations}
                                    isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                                    onAccessibilityClick={this.onAccessibilityClick}
                                    onCloseModal={this.onCloseModal}
                                    onExpandImage={this.setExpandedImage}
                                />}
                                {this.state.modal.content === "extension-projects-modal-content" &&
                                    steps[step].extensionProjects && <ExtensionProjectsModal
                                        extensionProjectIds={steps[step].extensionProjects}
                                        isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                                        onAccessibilityClick={this.onAccessibilityClick}
                                        onCloseModal={this.onCloseModal} />
                                }
                                {this.state.modal.content === "hint-modal-content" && <HintModalContent
                                    hint={steps[step].hint}
                                    isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                                    onAccessibilityClick={this.onAccessibilityClick}
                                    onCloseModal={this.onCloseModal}
                                    onExpandImage={this.setExpandedImage}
                                    onExpandVideo={this.setExpandedVideo}
                                />}
                            </div>
                        </div>
                    </div>
                }
                <div className={styles.cardContainer}>
                    <div className={cardClass} style={{
                        height: expanded ? '100%' : 'auto'
                    }}>
                        <LessonHeader
                            maxWidthTitleContainer={"200px"}
                            isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                            expanded={expanded}
                            step={step}
                            lessonTitle={content[activeDeckId].name}
                            onCloseLessons={() => {
                                // if it's the last step, close the lesson. Otherwise, confirm if the user wants to exit the lesson.
                                if (step === steps.length - 1) {
                                    onCloseLessons();
                                } else {
                                    confirm('Are you sure you want to exit the lesson? All progress will be lost.') && onCloseLessons();
                                }
                            }}
                            onShrinkExpandLessons={onShrinkExpandLessons}
                        />
                        <div className={stepBodyClass}>
                            <div className={progressBarOuterContainerClass}>
                                <div className={progressBarContainerClass}>
                                    <div className={progressBarClass} style={{ width: `calc(${step + 1} / ${steps.length} * 100%)` }}></div>
                                </div>
                                <span className={progressBarRemainingStepsClass}>{step + 1}/{steps.length}</span>
                            </div>
                            {
                                stepType === "info" && <>
                                    {
                                        steps[step].description && (
                                            <div className={stepDescriptionClass}>
                                                {steps[step].description}
                                            </div>
                                        )
                                    }
                                    {steps[step].video && (
                                        <VideoStep
                                            onVideoClick={(e) => this.setExpandedVideo(e, steps[step].video)}
                                            video={steps[step].video}
                                            isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                                        />
                                    )}
                                    {steps[step].image && (
                                        <ImageStep
                                            onImageClick={(e) => this.setExpandedImage(e, steps[step].image)}
                                            image={steps[step].image}
                                            isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                                        />
                                    )}
                                </>
                            }
                            {
                                stepType === "checkpoint" && <>
                                    <div className={checkpointStepTitleClass}>
                                        <span>Checkpoint Question</span>
                                    </div>
                                    {
                                        steps[step].question && (
                                            <div className={stepDescriptionClass}>
                                                {steps[step].question}
                                            </div>
                                        )
                                    }
                                    {
                                        <div className={checkpointTryAgainDivClass}>
                                            <button onClick={this.showCheckpointModal}>Start</button>
                                        </div>
                                    }
                                </>
                            }
                            {
                                stepType === "end" && <>
                                    <div className={checkpointStepTitleClass}>
                                        <span>End of Activity!</span>
                                    </div>
                                    {steps[step].image && (
                                        <ImageStep
                                            onImageClick={(e) => this.setExpandedImage(e, steps[step].image)}
                                            image={steps[step].image}
                                            isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                                        />
                                    )}
                                    <div className={stepDescriptionClass}>
                                        {steps[step].description}
                                    </div>
                                </>
                            }
                        </div>
                        <ReadOutLoudTextExtractor
                            component={steps[step].description}
                            onExtracted={this.handleTextExtracted}
                        />
                        <NextPrevButtons
                            expanded={expanded}
                            isRtl={isRtl}
                            onNextStep={step < steps.length - 1 ? onNextStep : (steps[step].type === "end" && steps[step].extensionProjects) ? this.onOpenExtensionProjectsModal : null}
                            onPrevStep={step > 0 ? onPrevStep : null}
                            isLastStep={step === steps.length - 1}
                            isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                            onAccessibilityClick={this.onAccessibilityClick}
                            onReadOutLoudClick={this.onReadOutLoudClick}
                            isReadingOutLoud={this.state.isReadingOutLoud}
                            onHintClick={this.onHintClick}
                            hint={steps[step].hint}
                        />
                    </div>
                </div>
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
    expanded: PropTypes.bool.isRequired,
    isRtl: PropTypes.bool.isRequired,
    onCloseLessons: PropTypes.func.isRequired,
    onNextStep: PropTypes.func.isRequired,
    onPrevStep: PropTypes.func.isRequired,
    onShrinkExpandLessons: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    x: PropTypes.number,
    y: PropTypes.number
};

export {
    Lessons as default,
    ImageStep,
    VideoStep
};