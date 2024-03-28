import PropTypes from 'prop-types';
import React from 'react';
import Draggable from 'react-draggable';

import styles from './lessons.css';

import { translateVideo } from '../../lib/libraries/decks/translate-video.js';
import { translateImage } from '../../lib/libraries/decks/translate-image.js';

import CheckpointModalContent from './lesson-modals/checkpoint-modal/checkpoint-modal.jsx';
import LessonStartModalContent from './lesson-modals/start-modal/start-modal.jsx';
import LessonHeader from "./lesson-header/lesson-header.jsx";
import VideoStep from './lesson-video/lesson-video.jsx';
import ImageStep from './lesson-image/lesson-image.jsx';
import NextPrevButtons from './lesson-next-prev-buttons/lesson-next-prev-buttons.jsx';
import ExtensionProjectsModal from './lesson-modals/extension-projects-modal/extension-projects-modal.jsx';

class Lessons extends React.Component {
    constructor(props) {
        super(props);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.showCheckpointModal = this.showCheckpointModal.bind(this);
        this.onOpenExtensionProjectsModal = this.onOpenExtensionProjectsModal.bind(this);
        this.state = {
            modal: {
                title: '',
                content: ''
            }
        };
    }

    componentDidMount() {
        this.setState({
            modal: {
                title: this.props.content[this.props.activeDeckId].name,
                content: <LessonStartModalContent {...this.props} onCloseModal={this.onCloseModal} />,
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
        console.log("component updated")
        if (this.props.activeDeckId !== prevProps.activeDeckId) {
            this.setState({
                modal: {
                    title: this.props.content[this.props.activeDeckId].name,
                    content: <LessonStartModalContent {...this.props} onCloseModal={this.onCloseModal} />,
                }
            });
        }
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

    onOpenExtensionProjectsModal = (steps, stepId) => {
        this.setState({
            modal: {
                title: "Extension Projects",
                content: <ExtensionProjectsModal
                    extensionProjectIds={steps[stepId].extensionProjects}
                />,
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
                                {
                                    stepType === "info" && <>
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
                                {
                                    stepType === "checkpoint" && <>
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
                                    </>
                                }
                                {
                                    stepType === "end" && <>
                                        <div className={styles.checkpointStepTitle}>
                                            <span>End of Lesson!</span>
                                        </div>
                                        <div className={styles.stepDescription}>
                                            {steps[step].description}
                                        </div>
                                    </>
                                }
                            </div>
                            <NextPrevButtons
                                expanded={expanded}
                                isRtl={isRtl}
                                onNextStep={step < steps.length - 1 ? onNextStep : (steps[step].type === "end" && steps[step].extensionProjects) ? () => this.onOpenExtensionProjectsModal(steps, step) : null}
                                onPrevStep={step > 0 ? onPrevStep : null}
                                isLastStep={step === steps.length - 1}
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
