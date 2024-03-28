import React from 'react';
import classNames from 'classnames';
import shrinkIcon from '../icon--shrink.svg';
import expandIcon from '../icon--expand.svg';
import closeIcon from '../icon--close.svg';
import styles from './lesson-header.css';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

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

LessonHeader.propTypes = {
    expanded: PropTypes.bool.isRequired,
    onCloseLessons: PropTypes.func.isRequired,
    onShrinkExpandLessons: PropTypes.func,
    step: PropTypes.number,
    lessonTitle: PropTypes.string
};

export default LessonHeader;