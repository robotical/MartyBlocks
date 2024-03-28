import React from 'react';
import styles from "./extension-projects-modal.css";
import ModalBottomButtons from '../lesson-modal-bottom-buttons/lesson-modal-bottom-buttons.jsx';
import decks from '../../../../lib/libraries/decks/index.jsx';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { activateDeck as activateLessonsDeck } from '../../../../reducers/lessons.js';

class ExtensionProjectsModal extends React.Component {
    constructor() {
        super();
    }

    onOpenProject(projectId) {
        this.props.onActivateLessonsDeck(projectId);
    }

    render() {
        const { extensionProjectIds } = this.props;
        const extensionProjects = extensionProjectIds.map((projectId) => decks[projectId]);

        return <>
            <div className={styles.stepBody}>
                <div className={styles.checkpointContainer}>
                    <div className={styles.checkpointQuestion}>
                        HAVE A GO
                    </div>
                    <div className={styles.checkpointAnswer}>

                        <form className={styles.container}>
                            {extensionProjects.map((project, index) => {
                                return <div key={index} className={styles.choiceContainer} onClick={() => this.onOpenProject(extensionProjectIds[index])}>
                                    <img className={styles.choiceImage} src={project.img} alt={`Option ${project.name}`} />
                                    <div className={styles.choiceCheckbox}>
                                        <span className={styles.choiceText}>{project.name}</span>
                                    </div>
                                </div>
                            })}
                        </form>
                    </div>
                </div>
            </div>
            <ModalBottomButtons />
        </>
    }
}

const mapDispatchToProps = dispatch => ({
    onActivateLessonsDeck: id => dispatch(activateLessonsDeck(id)),
});

export default injectIntl(connect(
    null,
    mapDispatchToProps
)(ExtensionProjectsModal));
