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
import icon1 from './icon--1.svg';
import icon2 from './icon--2.svg';
import icon3 from './icon--3.svg';
import icon4 from './icon--4.svg';
import icon5 from './icon--5.svg';

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
                    <Box className={styles.emojiFeedbackContainer}>
                        <Box className={styles.emojiFeedbackButton} onClick={() => this.onEmojiFeedback(1)}>
                            <img className={styles.emojiFeedbackIcon} src={icon1} />
                        </Box>
                        <Box className={styles.emojiFeedbackButton} onClick={() => this.onEmojiFeedback(2)}>
                            <img className={styles.emojiFeedbackIcon} src={icon2} />
                        </Box>
                        <Box className={styles.emojiFeedbackButton} onClick={() => this.onEmojiFeedback(3)}>
                            <img className={styles.emojiFeedbackIcon} src={icon3} />
                        </Box>
                        <Box className={styles.emojiFeedbackButton} onClick={() => this.onEmojiFeedback(4)}>
                            <img className={styles.emojiFeedbackIcon} src={icon4} />
                        </Box>
                        <Box className={styles.emojiFeedbackButton} onClick={() => this.onEmojiFeedback(5)}>
                            <img className={styles.emojiFeedbackIcon} src={icon5} />
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