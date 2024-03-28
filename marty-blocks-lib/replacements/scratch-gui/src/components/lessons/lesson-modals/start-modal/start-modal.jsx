import React from 'react';
import styles from "./start-modal.css";
import ImageStep from '../../lesson-image/lesson-image.jsx';
import ModalBottomButtons from '../lesson-modal-bottom-buttons/lesson-modal-bottom-buttons.jsx';

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

export default LessonStartModalContent;