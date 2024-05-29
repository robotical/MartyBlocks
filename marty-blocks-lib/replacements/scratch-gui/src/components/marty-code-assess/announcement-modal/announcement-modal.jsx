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

    render() {
        const { classroom } = this.props.externalProps;
        console.log("classroom", classroom)
        const sortedAnnouncements = getLatestAnnouncement(classroom);
        if (!sortedAnnouncements || sortedAnnouncements.length === 0) {
            this.onCloseModal();
            return <div></div>
        }

        const latestAnnouncement = sortedAnnouncements[0];
        console.log("latestAnnouncement", latestAnnouncement)
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
    const activeSessionAnnouncementsCopy = [...activeSessionAnnouncements];
    return activeSessionAnnouncementsCopy.sort((a, b) => {
        // timestamp: "2024-05-29T08:31:03.644Z"
        return new Date(b.timestamp) - new Date(a.timestamp);
    });
}
