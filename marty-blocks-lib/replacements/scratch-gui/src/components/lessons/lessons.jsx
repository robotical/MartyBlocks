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
        const script = document.createElement('script');
        script.src = `https://fast.wistia.com/embed/medias/${this.props.video}.jsonp`;
        script.async = true;
        script.setAttribute('id', 'wistia-video-content');
        document.body.appendChild(script);

        const script2 = document.createElement('script');
        script2.src = 'https://fast.wistia.com/assets/external/E-v1.js';
        script2.async = true;
        script2.setAttribute('id', 'wistia-video-api');
        document.body.appendChild(script2);
    }

    // We use the Wistia API here to update or pause the video dynamically:
    // https://wistia.com/support/developers/player-api
    componentDidUpdate(prevProps) {
        // Ensure the wistia API is loaded and available
        if (!(window.Wistia && window.Wistia.api)) return;

        // Get a handle on the currently loaded video
        const video = window.Wistia.api(prevProps.video);

        // Reset the video source if a new video has been chosen from the library
        if (prevProps.video !== this.props.video) {
            video.replaceWith(this.props.video);
        }

        // Pause the video if the modal is being shrunken
        if (!this.props.expanded) {
            video.pause();
        }
    }

    componentWillUnmount() {
        const script = document.getElementById('wistia-video-content');
        script.parentNode.removeChild(script);

        const script2 = document.getElementById('wistia-video-api');
        script2.parentNode.removeChild(script2);
    }

    render() {
        return (
            <div className={styles.stepVideo}>
                <div
                    className={`wistia_embed wistia_async_${this.props.video}`}
                    id="video-div"
                    style={{ height: `257px`, width: `466px` }}
                >
                    &nbsp;
                </div>
            </div>
        );
    }
}

VideoStep.propTypes = {
    expanded: PropTypes.bool.isRequired,
    video: PropTypes.string.isRequired
};

const ImageStep = ({ title, image }) => (
    <Fragment>
        <div className={styles.stepTitle}>
            {title}
        </div>
        <div className={styles.stepImageContainer}>
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

const LessonStartModalBottomButtons = ({ onStartLesson }) => (
    <div className={styles.lessonStartModalButtonsContainer}>

        <div className={styles.middleButton}>
            <img draggable={false} src={accessibilityIcon} />
        </div>
        <div className={styles.middleButton}>
            <img draggable={false} src={audioIcon} />
        </div>

        <div
            className={styles.startLessonButton}
            onClick={onStartLesson}
        >
            <img
                draggable={false}
                src={rightArrow}
            />
            <span>Start</span>
        </div>
    </div>
);

LessonStartModalBottomButtons.propTypes = {
    onStartLesson: PropTypes.func,
};

const NextPrevButtons = ({ isRtl, onNextStep, onPrevStep, expanded }) => (
    <div className={expanded ? styles.nextPrevButtonsContainer : styles.hidden}>
        <div
            className={expanded ? (isRtl ? styles.rightButton : styles.leftButton) : styles.hidden}
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
            className={expanded ? (isRtl ? styles.leftButton : styles.rightButton) : styles.hidden}
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

class Lessons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: {
                title: this.props.content[this.props.activeDeckId].name,
                content: this.props.content[this.props.activeDeckId].description
            }
        };
        this.onCloseLessonStartModal = this.onCloseLessonStartModal.bind(this);
    }

    onCloseLessonStartModal = () => {
        this.setState({
            modal: {
                title: '',
                content: ''
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
            onActivateDeckFactory,
            onCloseLessons,
            onShrinkExpandLessons,
            onDrag,
            onStartDrag,
            onEndDrag,
            onNextStep,
            onPrevStep,
            showVideos,
            step,
            expanded,
            ...posProps
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
                    height: `${window.innerHeight - menuBarHeight}px`,
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
                                        lessonTitle={content[activeDeckId].name}
                                        onCloseLessons={onCloseLessons}
                                    />
                                    <div className={styles.stepBody}>
                                        <ImageStep
                                            image={content[activeDeckId].img}
                                            title={content[activeDeckId].description}
                                        />
                                    </div>
                                    <LessonStartModalBottomButtons
                                        onStartLesson={this.onCloseLessonStartModal}
                                    />
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
                                {steps[step].externalUrl && (
                                    <div className={styles.externalUrl}>
                                        <a
                                            href={steps[step].externalUrl.url}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            {steps[step].externalUrl.label}
                                        </a>
                                    </div>
                                )}
                                {steps[step].deckIds ? (
                                    <PreviewsStep
                                        content={content}
                                        deckIds={steps[step].deckIds}
                                        onActivateDeckFactory={onActivateDeckFactory}
                                    />
                                ) : (
                                    steps[step].video ? (
                                        showVideos ? (
                                            <VideoStep
                                                dragging={dragging}
                                                expanded={expanded}
                                                video={translateVideo(steps[step].video, locale)}
                                            />
                                        ) : ( // Else show the deck image and title
                                            <ImageStep
                                                image={content[activeDeckId].img}
                                                title={content[activeDeckId].name}
                                            />
                                        )
                                    ) : (
                                        <ImageStep
                                            image={translateImage(steps[step].image, locale)}
                                            title={steps[step].title}
                                        />
                                    )
                                )}
                                {steps[step].trackingPixel && steps[step].trackingPixel}
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
    showVideos: PropTypes.bool,
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
