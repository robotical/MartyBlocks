import React from 'react';
import styles from "./start-modal.css";
import ImageStep from '../../lesson-image/lesson-image.jsx';
import ModalBottomButtons from '../lesson-modal-bottom-buttons/lesson-modal-bottom-buttons.jsx';
import classNames from 'classnames';
import { getDefaultMessageOrText } from '../../lessons.jsx';

const LessonStartModalContent = ({ content, activeDeckId, onCloseModal, isAccessibilityEnabled, onAccessibilityClick }) => {
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
                <div className={stepDescriptionClass}>
                    {description}
                </div>
                <ImageStep
                    image={img}
                    title={""}
                    isAccessibilityEnabled={isAccessibilityEnabled}
                />
            </div>
            <ModalBottomButtons
                onCTAClick={onCloseModal}
                closeModalButtonTitle={"Start"}
                isAccessibilityEnabled={isAccessibilityEnabled}
                onAccessibilityClick={onAccessibilityClick}
                textToReadOutLoud={getDefaultMessageOrText(description)}
            />
        </>
    );
};

export default LessonStartModalContent;