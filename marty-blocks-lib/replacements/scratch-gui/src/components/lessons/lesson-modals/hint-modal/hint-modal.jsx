import React from 'react';
import styles from "./hint-modal.css";
import ModalBottomButtons from '../lesson-modal-bottom-buttons/lesson-modal-bottom-buttons.jsx';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { activateDeck as activateLessonsDeck } from '../../../../reducers/lessons.js';
import classNames from 'classnames';

class HintModal extends React.Component {
    constructor() {
        super();
    }

    onOpenProject(projectId) {
        this.props.onActivateLessonsDeck(projectId);
    }

    render() {
        const { isAccessibilityEnabled, onAccessibilityClick } = this.props;

        const stepBodyClass = classNames(styles.stepBody, {
            [styles.stepBodyAccessibility]: isAccessibilityEnabled
        });
        const checkpointContainerClass = classNames(styles.checkpointContainer, {
            [styles.checkpointContainerAccessibility]: isAccessibilityEnabled
        });
        const checkpointQuestionClass = classNames(styles.checkpointQuestion, {
            [styles.checkpointQuestionAccessibility]: isAccessibilityEnabled
        });
        const checkpointAnswerClass = classNames(styles.checkpointAnswer, {
            [styles.checkpointAnswerAccessibility]: isAccessibilityEnabled
        });
        const choiceContainerClass = classNames(styles.choiceContainer, {
            [styles.choiceContainerAccessibility]: isAccessibilityEnabled
        });
        const choiceImageClass = classNames(styles.choiceImage, {
            [styles.choiceImageAccessibility]: isAccessibilityEnabled
        });
        const choiceCheckboxClass = classNames(styles.choiceCheckbox, {
            [styles.choiceCheckboxAccessibility]: isAccessibilityEnabled
        });
        const choiceTextClass = classNames(styles.choiceText, {
            [styles.choiceTextAccessibility]: isAccessibilityEnabled
        });

        return <>
            <div className={stepBodyClass}>
                <div className={checkpointContainerClass}>
                    <div className={checkpointQuestionClass}>
                        HAVE A GO
                    </div>
                    <div className={checkpointAnswerClass}>

                        <form className={styles.container}>
                            {[].map((project, index) => {
                                return <div key={index} className={choiceContainerClass} onClick={() => this.onOpenProject(extensionProjectIds[index])}>
                                    <img className={choiceImageClass} src={project.img} alt={`Option ${project.name}`} />
                                    <div className={choiceCheckboxClass}>
                                        <span className={choiceTextClass}>{project.name}</span>
                                    </div>
                                </div>
                            })}
                        </form>
                    </div>
                </div>
            </div>
            <ModalBottomButtons
                isAccessibilityEnabled={isAccessibilityEnabled}
                onAccessibilityClick={onAccessibilityClick}
                textToReadOutLoud={"HAVE A GO"}
            />
        </>
    }
}

const mapDispatchToProps = dispatch => ({
    onActivateLessonsDeck: id => dispatch(activateLessonsDeck(id)),
});

export default injectIntl(connect(
    null,
    mapDispatchToProps
)(HintModal));
