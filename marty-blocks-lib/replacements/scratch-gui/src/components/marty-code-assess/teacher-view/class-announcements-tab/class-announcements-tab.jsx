import React from "react";
import styles from "./class-announcements-tab.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import MakeNewAnnouncementModal from "./make-new-announcement-modal/make-new-announcement-modal.jsx";
import Modal from "../../../../containers/modal.jsx";
import AnnouncementModal from "./announcement-modal/announcement-modal.jsx";
import Spinner from '../../../spinner/spinner.jsx';
import spinnerStyles from '../../../spinner/spinner.css';

const messages = defineMessages({
    placeholder: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.classAnnouncementsTab."
    }
});

class ClassAnnouncementsTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedAnnouncements: [],
            sortBy: "timestamp", // timestamp, responses
            makeNewAnnouncementModalVisible: false,
            announcementModalData: {
                announcement: null,
                visible: false,
                announcementResponsesLength: 0,

            },
            isLoading: false,
        };
        bindAll(this, [
            "sortByTimestamp",
            "sortByResponses",
            "onSortByChange",
            "onMakeNewAnnouncement",
            "onDeactivateAnnouncement",
            "fetchAnnouncements",
            "onCloseMakeNewAnnouncementModal"
        ]);
    }

    componentDidMount() {
        if (this.props.selectedClass) {
            this.fetchAnnouncements()
        }
    }

    fetchAnnouncements = async () => {
        this.setState({ isLoading: true });
        const announcements = await this.props.selectedClass.getAnnouncements();
        let sortedAnnouncements = this.sortByTimestamp(announcements);
        if (this.state.sortBy === "responses") {
            sortedAnnouncements = this.sortByResponses(announcements);
        }
        this.setState({ sortedAnnouncements, isLoading: false });
    }

    sortByTimestamp(announcements) {
        return [...announcements].sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
        });
    }

    sortByResponses(announcements) {
        return [...announcements].sort((a, b) => {
            return b.responses?.length - a.responses?.length;
        });
    }

    onSortByChange(sortBy) {
        this.setState({ sortBy });
        if (sortBy === "timestamp") this.setState({ sortedAnnouncements: this.sortByTimestamp(this.state.sortedAnnouncements) });
        if (sortBy === "responses") this.setState({ sortedAnnouncements: this.sortByResponses(this.state.sortedAnnouncements) });
    }

    onMakeNewAnnouncement() {
        this.setState({ makeNewAnnouncementModalVisible: true });
    }

    async onDeactivateAnnouncement(e, announcement) {
        e?.stopPropagation();
        await this.props.selectedClass.deactivateAnnouncement(announcement);
        await this.fetchAnnouncements();
    }

    async onCloseMakeNewAnnouncementModal() {
        this.setState({ makeNewAnnouncementModalVisible: false });
        await this.fetchAnnouncements();
    }

    render() {
        console.log("ClassAnnouncementsTab render", this.state.sortedAnnouncements);
        return (
            <>
                {this.state.makeNewAnnouncementModalVisible &&
                    <Modal
                        onRequestClose={this.onCloseMakeNewAnnouncementModal}
                        fullScreen={false}
                        className={styles.makeNewAnnouncementModal}
                        id="makeNewAnnouncementModal"
                        contentLabel={`Make New Announcement`}
                    >
                        <MakeNewAnnouncementModal
                            onClose={this.onCloseMakeNewAnnouncementModal}
                            selectedClass={this.props.selectedClass}
                        />
                    </Modal>
                }

                {this.state.announcementModalData.visible &&
                    <Modal
                        onRequestClose={() => this.setState({ announcementModalData: { visible: false, announcement: null } })}
                        fullScreen
                        id="announcementModal"
                        contentLabel={`Announcement: ${this.state.announcementModalData.announcement?.text}`}
                    >
                        <AnnouncementModal
                            announcement={this.state.announcementModalData.announcement}
                            students={this.props.students}
                            onDeactivateAnnouncement={this.onDeactivateAnnouncement}
                            classId={this.props.selectedClass.id}
                        />
                    </Modal>}

                <div className={styles.classAnnouncementsTabContaier}>
                    {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                        <>
                            <div className={styles.header}>
                                <h3 className={styles.tabTitle}>Class Announcements</h3>
                                <button className={styles.makeNewAnnouncementBtn} onClick={this.onMakeNewAnnouncement}>Make New Announcement</button>
                                <div className={styles.sortContainer}>
                                    <label className={styles.sortLabel}>Sort by:</label>
                                    <select className={styles.sortSelect} value={this.state.sortBy} onChange={(e) => this.onSortByChange(e.target.value)}>
                                        <option value="timestamp">Date</option>
                                        <option value="responses">Responses</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.body}>
                                <div className={styles.announcementsContainer}>
                                    {this.state.sortedAnnouncements.length === 0 && <div className={styles.noAnnouncements}>No announcements yet</div>}
                                    {this.state.sortedAnnouncements.map((announcement) => {
                                        const announcementResponsesLength = announcement.responses?.length || 0;
                                        return (
                                            <div key={announcement.id} className={styles.announcement} onClick={() => this.setState({ announcementModalData: { visible: true, announcement, announcementResponsesLength } })}>
                                                <p className={styles.announcementText}>{announcement.text}</p>
                                                <p className={styles.announcementTimestamp}>{formatTimestamp(announcement.timestamp)}</p>
                                                {/* <p className={styles.announcementResponses}>{announcementResponsesLength || 0}/{this.props.students.length}</p> */}
                                                {announcement.isActive && <p className={styles.announcementIsActive} onClick={(e) => this.onDeactivateAnnouncement(e, announcement)}>Active. Press to deactivate</p>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div >
                        </>
                    )}
                </div >
            </>
        );
    }
}

function formatTimestamp(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

ClassAnnouncementsTab.propTypes = {
    intl: intlShape.isRequired,
    selectedClass: PropTypes.object.isRequired,
    students: PropTypes.array.isRequired,
};

export default injectIntl(ClassAnnouncementsTab);
