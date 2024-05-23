import React from 'react';
import Box from '../../box/box.jsx';
import Modal from '../../../containers/modal.jsx';
import styles from './announcement-modal.css';
import { connect } from 'react-redux';
import {
    closeCodeAssessAnnouncement
} from '../../../reducers/modals.js';
import bindAll from 'lodash.bindall';
import ExpandableImage from '../expandable-image/expandable-image.jsx';


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

    render() {this.props.externalProps.classroom;
        const { classroom } = this.props.externalProps;
        const sortedAnnouncements = getLatestAnnouncement(classroom);
        if (!sortedAnnouncements || sortedAnnouncements.length === 0) {
            this.onCloseModal();
            return <div></div>
        }

        const latestAnnouncement = sortedAnnouncements[0];

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
                        {latestAnnouncement.text}
                        <div className={styles.separator}></div>
                        {latestAnnouncement.imageUrl && <ExpandableImage 
                            imageUrl={latestAnnouncement.imageUrl} 
                            imageThumbnailSize="large"
                        />}
                    </Box>
                </Box>
            </Modal>
        );
    }
}

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

const getLatestAnnouncement = function (classroom) {
    const activeSessionAnnouncements = classroom.activeSession?.announcements || [];
    return activeSessionAnnouncements.sort((a, b) => {
        // timestamp: "23/05/2024, 15:19:32"
        try {
            return parseDateString(b.timestamp) - parseDateString(a.timestamp);
        } catch (e) {
            console.error("error sorting announcements by timestamp:", e);
        }
    });
}

const parseDateString = (dateString) => {
    const parts = dateString.split(', ');
    const date = parts[0].split('/');
    const time = parts[1].split(':');
    return new Date(date[2], date[1] - 1, date[0], time[0], time[1], time[2]);
}