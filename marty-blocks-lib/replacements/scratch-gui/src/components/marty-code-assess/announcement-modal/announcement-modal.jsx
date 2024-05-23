import PropTypes from 'prop-types';
import React from 'react';
import Box from '../../box/box.jsx';
import Modal from '../../../containers/modal.jsx';
import styles from './announcement-modal.css';
import { connect } from 'react-redux';
import {
    closeCodeAssessAnnouncement
} from '../../../reducers/modals.js';
import bindAll from 'lodash.bindall';


class CodeAssessAnnouncementModal extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'onCloseModal'
        ]);
        this.state = {
        };
    }

    onCloseModal() {
        this.props.onCancel();
    }

    render() {
        return (
            <Modal
                className={styles.modalContent}
                contentLabel={"Your teacher is talking to you!"}
                headerClassName={styles.header}
                // headerImage={}
                id="CodeAssessAnnouncementModal"
                // onHelp={props.onHelp}
                onRequestClose={this.onCloseModal}
            >
                <Box className={styles.body}>
                    <Box className={styles.announcementText}>
                        {this.props.externalProps.announcement.text}
                    </Box>
                </Box>
            </Modal>
        );
    }
}


CodeAssessAnnouncementModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    externalProps: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    externalProps: state.scratchGui.modals.modalProps
});

const mapDispatchToProps = dispatch => ({
    onCancel: () => dispatch(closeCodeAssessAnnouncement()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CodeAssessAnnouncementModal);