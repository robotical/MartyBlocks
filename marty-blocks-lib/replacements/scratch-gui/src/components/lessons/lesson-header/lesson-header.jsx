import React from 'react';
import classNames from 'classnames';
import shrinkIcon from '../icon--shrink.svg';
import expandIcon from '../icon--expand.svg';
import closeIcon from '../icon--close.svg';
import styles from './lesson-header.css';
import { FormattedMessage } from 'react-intl';
import { renderFormattedMessage } from '../lessons.jsx';

const LessonHeader = ({ onCloseLessons, onShrinkExpandLessons, lessonTitle, step, expanded, isAccessibilityEnabled, maxWidthTitleContainer }) => {

    const headerButtonsClass = classNames(styles.headerButtons, {
        [styles.headerButtonsHidden]: !expanded,
        [styles.headerButtonsAccessibility]: isAccessibilityEnabled
    });

    const stepNumberOnTitleClass = classNames(styles.stepNumberOnTitle, {
        [styles.stepNumberOnTitleAccessibility]: isAccessibilityEnabled
    });

    const lessonTitleContainerClass = classNames(styles.lessonTitleContainer, {
        [styles.lessonTitleContainerAccessibility]: isAccessibilityEnabled
    });

    const lessonTitleClass = classNames(styles.lessonTitle, {
        [styles.lessonTitleAccessibility]: isAccessibilityEnabled
    });

    const headerButtonsRightClass = classNames(styles.headerButtonsRight, {
        [styles.headerButtonsRightAccessibility]: isAccessibilityEnabled
    });

    const shrinkExpandButtonClass = classNames(styles.shrinkExpandButton, {
        [styles.shrinkExpandButtonAccessibility]: isAccessibilityEnabled
    });

    const removeButtonClass = classNames(styles.removeButton, {
        [styles.removeButtonAccessibility]: isAccessibilityEnabled
    });

    const closeIconClass = classNames(styles.closeIcon, {
        [styles.closeIconAccessibility]: isAccessibilityEnabled
    });


    return (
        <div className={headerButtonsClass}
            style={{
                gridTemplateColumns: step === undefined ? "max-content 1fr" : "min-content max-content 1fr"
            }}>
            {step !== undefined && <div
                className={stepNumberOnTitleClass}
            >
                {step + 1}
            </div>}
            <div className={lessonTitleContainerClass} style={{ maxWidth: maxWidthTitleContainer ? maxWidthTitleContainer : "none" }}>
                {renderFormattedMessage(lessonTitle, lessonTitleClass)}
            </div>
            <div className={headerButtonsRightClass}>
                {onShrinkExpandLessons && <div
                    className={shrinkExpandButtonClass}
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
                {onCloseLessons && <div
                    className={removeButtonClass}
                    onClick={onCloseLessons}
                >
                    <img
                        className={closeIconClass}
                        src={closeIcon}
                    />
                    <FormattedMessage
                        defaultMessage="Close"
                        description="Title for button to close how-to lesson"
                        id="gui.lessons.close"
                    />
                </div>}
            </div>
        </div>
    )
};

export default LessonHeader;