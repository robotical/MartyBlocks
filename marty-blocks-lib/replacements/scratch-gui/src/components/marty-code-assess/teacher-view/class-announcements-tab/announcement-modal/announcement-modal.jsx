import React from "react";
import PropTypes from 'prop-types';
import styles from './announcement-modal.css';
import bindAll from 'lodash.bindall';

function formatTimestamp(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

class AnnouncementModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            responses: this.props.announcement.responses,
            announcement: this.props.announcement,
        };
        bindAll(this, [
            'onStopMonitoringAnnouncementResponse',
        ]);
    }

    componentDidMount() {
        const asyncFunc = async () => {
            await codeAssess.teacher.monitorAnnouncementResponses(this.props.classId, this.state.announcement.id, (responses) => {
                this.setState({ responses: responses });
            });
        }
        if (this.state.announcement.isActive) {
            asyncFunc();
        }
    }

    componentWillUnmount() {
        if (this.state.announcement.isActive) {
            this.onStopMonitoringAnnouncementResponse();
        }
    }

    async onStopMonitoringAnnouncementResponse() {
        await codeAssess.teacher.stopMonitoringAnnouncementResponse(this.state.announcement.id);
    }

    async onDeactivateAnnouncement(e, announcement) {
        e?.stopPropagation();
        await this.onStopMonitoringAnnouncementResponse();
        await this.props.onDeactivateAnnouncement(e, announcement);
        await this.fetchAnnouncement();
    }

    fetchAnnouncement = async () => {
        const announcement = await this.props.announcement.refresh();
        this.setState({ announcement });
    }

    render() {
        const { students } = this.props;
        const announcement = this.state.announcement;

        if (!announcement) {
            return <div>No announcement data</div>;
        }

        const responsesLength = this.state.responses?.length || 0;

        return (
            <div className={styles.announcementModal}>
                <div className={styles.announcementModalHeader}>
                    <p className={styles.announcementModalText}>Announcement text: {announcement.text}</p>
                    {announcement.isActive &&
                        <p className={styles.announcementModalIsActive} onClick={(e) => this.onDeactivateAnnouncement(e, announcement)}>
                            Active. Press to deactivate
                        </p>
                    }
                    <p className={styles.announcementModalTimestamp}>Date: {formatTimestamp(announcement.timestamp)}</p>
                </div>
                <div className={styles.announcementModalBody}>
                    <div className={styles.announcementModalResponses}>
                        <h3 className={styles.announcementModalResponsesTitle}>Responses: <span className={styles.announcementModalResponsesSpan}>{responsesLength === 0 ? "No responses" : `${responsesLength}/${students.length} responses`}</span></h3>
                        {this.state.responses?.map((response) => {
                            return (
                                <div className={styles.announcementModalResponse} key={response.studentId}>
                                    <p className={styles.announcementModalResponseText}>Student name: {response.studentName}</p>
                                    {response.response && <p className={styles.announcementModalResponseText}>Response: {response.response}</p>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

AnnouncementModal.propTypes = {
    announcement: PropTypes.object.isRequired,
    students: PropTypes.array.isRequired,
    onDeactivateAnnouncement: PropTypes.func.isRequired,
    classId: PropTypes.string.isRequired,
};

export default AnnouncementModal;
