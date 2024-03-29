import React from 'react';
import styles from "./start-modal.css";
import ImageStep from '../../lesson-image/lesson-image.jsx';
import ModalBottomButtons from '../lesson-modal-bottom-buttons/lesson-modal-bottom-buttons.jsx';
import classNames from 'classnames';

const LessonStartModalContent = ({ content, activeDeckId, onCloseModal, isAccessibilityEnabled, onAccessibilityClick }) => {
    const { img, description } = content[activeDeckId];

    const stepBodyClass = classNames(styles.stepBody, {
        [styles.stepBodyAccessibility]: isAccessibilityEnabled
    });

    return (
        <>
            <div className={stepBodyClass}>
                <ImageStep
                    image={img}
                    title={description}
                    isAccessibilityEnabled={isAccessibilityEnabled}
                />
            </div>
            <ModalBottomButtons
                onCTAClick={onCloseModal}
                closeModalButtonTitle={"Start"}
                isAccessibilityEnabled={isAccessibilityEnabled}
                onAccessibilityClick={onAccessibilityClick}
            />
        </>
    );
};

export default LessonStartModalContent;