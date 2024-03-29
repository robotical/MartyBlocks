import PropTypes from 'prop-types';
import React from 'react';
import Draggable from 'react-draggable';

import styles from './lessons.css';
import classNames from 'classnames';

import { translateVideo } from '../../lib/libraries/decks/translate-video.js';
import { translateImage } from '../../lib/libraries/decks/translate-image.js';

import CheckpointModalContent from './lesson-modals/checkpoint-modal/checkpoint-modal.jsx';
import LessonStartModalContent from './lesson-modals/start-modal/start-modal.jsx';
import ExtensionProjectsModal from './lesson-modals/extension-projects-modal/extension-projects-modal.jsx';
import LessonHeader from "./lesson-header/lesson-header.jsx";
import VideoStep from './lesson-video/lesson-video.jsx';
import ImageStep from './lesson-image/lesson-image.jsx';
import NextPrevButtons from './lesson-next-prev-buttons/lesson-next-prev-buttons.jsx';

class Lessons extends React.Component {
    constructor(props) {
        super(props);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.showCheckpointModal = this.showCheckpointModal.bind(this);
        this.onOpenExtensionProjectsModal = this.onOpenExtensionProjectsModal.bind(this);
        this.onAccessibilityClick = this.onAccessibilityClick.bind(this);

        this.state = {
            modal: {
                title: '',
                content: '' //"lesson-start-modal-content" / "checkpoint-modal-content" / "extension-projects-modal-content" / ""
            },
            isAccessibilityEnabled: false
        };
    }

    componentDidMount() {
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
                this.showCheckpointModal();
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

    onCloseModal = () => {
        this.setState({
            modal: {
                title: '',
                content: '',
            }
        });
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

    render() {

        const {
            activeDeckId,
            content,
            dragging,
            isRtl,
            locale,
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
                                <div className={cardClass}>
                                    <LessonHeader
                                        expanded={true}
                                        lessonTitle={this.state.modal.title}
                                        onCloseLessons={this.onCloseModal}
                                        isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                                    />
                                    {this.state.modal.content === "lesson-start-modal-content" && <LessonStartModalContent
                                        {...this.props}
                                        onCloseModal={this.onCloseModal}
                                        isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                                        onAccessibilityClick={this.onAccessibilityClick} />
                                    }
                                    {this.state.modal.content === "checkpoint-modal-content" && < CheckpointModalContent
                                        question={steps[step].question}
                                        questionType={steps[step].questionType}
                                        possibleAnswers={steps[step].possibleAnswers}
                                        correctAnswers={steps[step].correctAnswers}
                                        answerExplanations={steps[step].answerExplanations}
                                        isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                                        onAccessibilityClick={this.onAccessibilityClick}
                                        onCloseModal={this.onCloseModal}
                                    />}
                                    {this.state.modal.content === "extension-projects-modal-content" &&
                                        steps[step].extensionProjects && <ExtensionProjectsModal
                                            extensionProjectIds={steps[step].extensionProjects}
                                            isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                                            onAccessibilityClick={this.onAccessibilityClick}
                                            onCloseModal={this.onCloseModal} />
                                    }
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
                        <div className={cardClass} style={{
                            height: expanded ? '100%' : 'auto'
                        }}>
                            <LessonHeader
                                isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                                expanded={expanded}
                                step={step}
                                lessonTitle={content[activeDeckId].name}
                                onCloseLessons={() => {
                                    if (stepType === "end") {
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
                                                dragging={dragging}
                                                expanded={expanded}
                                                video={translateVideo(steps[step].video, locale)}
                                                isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                                            />
                                        )}
                                        {steps[step].image && (
                                            <ImageStep
                                                image={translateImage(steps[step].image, locale)}
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
                                                <button onClick={this.showCheckpointModal}>Try Again</button>
                                            </div>
                                        }
                                    </>
                                }
                                {
                                    stepType === "end" && <>
                                        <div className={checkpointStepTitleClass}>
                                            <span>End of Lesson!</span>
                                        </div>
                                        <div className={stepDescriptionClass}>
                                            {steps[step].description}
                                        </div>
                                    </>
                                }
                            </div>
                            <NextPrevButtons
                                expanded={expanded}
                                isRtl={isRtl}
                                onNextStep={step < steps.length - 1 ? onNextStep : (steps[step].type === "end" && steps[step].extensionProjects) ? this.onOpenExtensionProjectsModal : null}
                                onPrevStep={step > 0 ? onPrevStep : null}
                                isLastStep={step === steps.length - 1}
                                isAccessibilityEnabled={this.state.isAccessibilityEnabled}
                                onAccessibilityClick={this.onAccessibilityClick}
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