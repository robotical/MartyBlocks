import PropTypes from 'prop-types';
import React from 'react';
import Box from '../../box/box.jsx';
import Modal from '../../../containers/modal.jsx';
import styles from './student-emoji-feedback-modal.css';
import { connect } from 'react-redux';
import {
    closeStudentEmojiFeedback,
} from '../../../reducers/modals.js';
import bindAll from 'lodash.bindall';
import IconSad from './icon--sad-emoji.svg';
import IconSmile from './icon--smile-emoji.svg';
import IconVeryBad from './icon--verybad-emoji.svg';
import IconVeryHappy from './icon--cool-emoji.svg';

class StudentEmojiFeedbackModal extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'onEmojiFeedback'
        ]);
        this.state = {
        };
    }

    async onEmojiFeedback(feedbackNumber) {
        const announcementId = this.props.externalProps.announcement.id;
        await codeAssess.student.sendEmojiFeedback(announcementId, feedbackNumber);
        this.props.onCancel();
    }

    render() {
        console.log("rendering student emoji feedback modal. props", this.props)
        return (
            <Modal
                className={styles.modalContent}
                contentLabel={this.props.externalProps.announcement.text}
                headerClassName={styles.header}
                // headerImage={}
                id="studentEmojiFeedbackModal"
                // onHelp={props.onHelp}
                onRequestClose={() => { }}
            >
                <Box className={styles.body}>
                    {/* 5 buttons representing from sad to smiley emojis for feedback */}
                    <Box className={styles.emojiFeedbackContainer}>
                        <Box className={styles.emojiFeedbackButton} onClick={() => this.onEmojiFeedback(1)}>
                            <img className={styles.emojiFeedbackIcon} src={IconVeryBad} />
                        </Box>
                        <Box className={styles.emojiFeedbackButton} onClick={() => this.onEmojiFeedback(2)}>
                            <img className={styles.emojiFeedbackIcon} src={IconSad} />
                        </Box>
                        <Box className={styles.emojiFeedbackButton} onClick={() => this.onEmojiFeedback(3)}>
                            <img className={styles.emojiFeedbackIcon} src={IconSmile} />
                        </Box>
                        <Box className={styles.emojiFeedbackButton} onClick={() => this.onEmojiFeedback(4)}>
                            <img className={styles.emojiFeedbackIcon} src={IconVeryHappy} />
                        </Box>
                    </Box>
                </Box>
            </Modal>
        );
    }
}


StudentEmojiFeedbackModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    externalProps: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    externalProps: state.scratchGui.modals.modalProps
});

const mapDispatchToProps = dispatch => ({
    onCancel: () => dispatch(closeStudentEmojiFeedback()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentEmojiFeedbackModal);