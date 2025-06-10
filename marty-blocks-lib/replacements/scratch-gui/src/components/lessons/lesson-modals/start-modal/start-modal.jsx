import React from 'react';
import styles from "./start-modal.css";
import ImageStep from '../../lesson-image/lesson-image.jsx';
import ModalBottomButtons from '../lesson-modal-bottom-buttons/lesson-modal-bottom-buttons.jsx';
import classNames from 'classnames';
import ReadOutLoudTextExtractor from '../../utils/extract-intl-text.jsx';
import { renderFormattedMessage } from '../../lessons.jsx';
class LessonStartModalContent extends React.Component {

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

    render() {

        const { content, activeDeckId, onCloseModal, isAccessibilityEnabled, onAccessibilityClick } = this.props;
        const { img, description } = content[activeDeckId];

        const stepBodyClass = classNames(styles.stepBody, {
            [styles.stepBodyAccessibility]: isAccessibilityEnabled
        });

        const stepDescriptionClass = classNames(styles.stepDescription, {
            [styles.stepDescriptionAccessibility]: isAccessibilityEnabled
        });

        return (
            <>
                <div className={stepBodyClass}>
                    {renderFormattedMessage(description, stepDescriptionClass)}
                    <ImageStep
                        image={img}
                        title={""}
                        isAccessibilityEnabled={isAccessibilityEnabled}
                    />
                </div>
                <ReadOutLoudTextExtractor
                    component={description}
                    onExtracted={this.handleTextExtracted}
                />
                <ModalBottomButtons
                    onCTAClick={onCloseModal}
                    closeModalButtonTitle={"Start"}
                    isAccessibilityEnabled={isAccessibilityEnabled}
                    onAccessibilityClick={onAccessibilityClick}
                    textToReadOutLoud={this.state.extractedText}
                />
            </>
        );
    };
}

export default LessonStartModalContent;