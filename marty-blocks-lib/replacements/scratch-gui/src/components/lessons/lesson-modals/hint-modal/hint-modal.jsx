import React from 'react';
import styles from "./hint-modal.css";
import ModalBottomButtons from '../lesson-modal-bottom-buttons/lesson-modal-bottom-buttons.jsx';
import classNames from 'classnames';
import ImageStep from '../../lesson-image/lesson-image.jsx';
import VideoStep from '../../lesson-video/lesson-video.jsx';
import TextExtractor from '../../utils/extract-intl-text.jsx';
import { renderFormattedMessage } from '../../lessons.jsx';
class HintModal extends React.Component {
    constructor() {
        super();
        this.handleTextExtracted = this.handleTextExtracted.bind(this);
        this.state = {
            extractedText: "",
        }
    }

    handleTextExtracted(text) {
        this.setState({ extractedText: text });
    }

    onOpenProject(projectId) {
        this.props.onActivateLessonsDeck(projectId);
    }

    render() {
        const { isAccessibilityEnabled, onAccessibilityClick, onExpandImage, onExpandVideo } = this.props;

        const stepBodyClass = classNames(styles.stepBody, {
            [styles.stepBodyAccessibility]: isAccessibilityEnabled
        });
        const hintContainerClass = classNames(styles.hintContainer, {
            [styles.hintContainerAccessibility]: isAccessibilityEnabled
        });
        const hintDescriptionClass = classNames(styles.hintDescription, {
            [styles.hintDescriptionAccessibility]: isAccessibilityEnabled
        });

        const { description, image, video } = this.props.hint || {};

        return <>
            <div className={stepBodyClass}>
                <div className={hintContainerClass}>
                    {description && <div className={hintDescriptionClass}>
                        {renderFormattedMessage(description, styles.hintText)}
                    </div>}
                    {image && <ImageStep
                        onImageClick={onExpandImage}
                        image={image}
                        isAccessibilityEnabled={this.props.isAccessibilityEnabled}
                    />}
                    {video && <div className={styles.videoDiv}><VideoStep
                        onVideoClick={onExpandVideo}
                        video={video}
                        isAccessibilityEnabled={this.props.isAccessibilityEnabled}
                    /></div>}
                </div>
            </div>
            <TextExtractor
                component={description}
                onExtracted={this.handleTextExtracted}
            />
            <ModalBottomButtons
                isAccessibilityEnabled={isAccessibilityEnabled}
                onAccessibilityClick={onAccessibilityClick}
                textToReadOutLoud={this.state.extractedText}
            />
        </>
    }
}

export default HintModal;