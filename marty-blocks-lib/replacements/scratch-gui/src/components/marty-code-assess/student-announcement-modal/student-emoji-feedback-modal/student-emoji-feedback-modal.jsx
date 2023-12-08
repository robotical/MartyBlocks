import PropTypes from 'prop-types';
import React from 'react';
import Box from '../../../box/box.jsx';
import styles from './student-emoji-feedback-modal.css';
import bindAll from 'lodash.bindall';
import iconDefault1 from './icon--marty-1.svg';
import iconDefault2 from './icon--marty-2.svg';
import iconDefault3 from './icon--marty-3.svg';
import iconDefault4 from './icon--marty-4.svg';
import iconDefault5 from './icon--marty-5.svg';
import icon1Hover from './icon--marty-hover-1.svg';
import icon2Hover from './icon--marty-hover-2.svg';
import icon3Hover from './icon--marty-hover-3.svg';
import icon4Hover from './icon--marty-hover-4.svg';
import icon5Hover from './icon--marty-hover-5.svg';
import Spinner from '../../../spinner/spinner.jsx';
import spinnerStyles from '../../../spinner/spinner.css';

class StudentEmojiFeedbackModal extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'onEmojiFeedback'
        ]);
        this.state = {
            isLoading: false,
            icon1: iconDefault1,
            icon2: iconDefault2,
            icon3: iconDefault3,
            icon4: iconDefault4,
            icon5: iconDefault5,
        };
    }

    async onEmojiFeedback(feedbackNumber) {
        this.setState({ isLoading: true });
        const announcementId = this.props.announcementId;
        await codeAssess.student.sendEmojiFeedback(announcementId, feedbackNumber);
        this.setState({ isLoading: false });
        this.props.onCancel();
    }

    render() {
        console.log("rendering student emoji feedback modal. props", this.props)
        return (
            <Box className={styles.body}>
                <Box className={styles.emojiFeedbackContainer}>
                    {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                        <>
                            <Box className={styles.emojiFeedbackButton} onClick={() => this.onEmojiFeedback(1)} onMouseEnter={() => this.setState({ icon1: icon1Hover })} onMouseLeave={() => this.setState({ icon1: iconDefault1 })}>
                                <img className={styles.emojiFeedbackIcon} src={this.state.icon1} />
                            </Box>
                            <Box className={styles.emojiFeedbackButton} onClick={() => this.onEmojiFeedback(2)} onMouseEnter={() => this.setState({ icon2: icon2Hover })} onMouseLeave={() => this.setState({ icon2: iconDefault2 })}>
                                <img className={styles.emojiFeedbackIcon} src={this.state.icon2} />
                            </Box>
                            <Box className={styles.emojiFeedbackButton} onClick={() => this.onEmojiFeedback(3)} onMouseEnter={() => this.setState({ icon3: icon3Hover })} onMouseLeave={() => this.setState({ icon3: iconDefault3 })}>
                                <img className={styles.emojiFeedbackIcon} src={this.state.icon3} />
                            </Box>
                            <Box className={styles.emojiFeedbackButton} onClick={() => this.onEmojiFeedback(4)} onMouseEnter={() => this.setState({ icon4: icon4Hover })} onMouseLeave={() => this.setState({ icon4: iconDefault4 })}>
                                <img className={styles.emojiFeedbackIcon} src={this.state.icon4} />
                            </Box>
                            <Box className={styles.emojiFeedbackButton} onClick={() => this.onEmojiFeedback(5)} onMouseEnter={() => this.setState({ icon5: icon5Hover })} onMouseLeave={() => this.setState({ icon5: iconDefault5 })}>
                                <img className={styles.emojiFeedbackIcon} src={this.state.icon5} />
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        );
    }
}

StudentEmojiFeedbackModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    announcementId: PropTypes.string.isRequired,
};


export default StudentEmojiFeedbackModal;