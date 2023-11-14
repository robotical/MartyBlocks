import React from "react";
import styles from "./class-performance-tab.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import LatestAssessmentTab from "../../student-data-modal/latest-assessment-tab/latest-assessment-tab.jsx";
import LiveStreamTab from "../../student-data-modal/live-stream-tab/live-stream-tab.jsx";
import PerformanceHistoryTab from "../../student-data-modal/performance-history-tab/performance-history-tab.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.classPerformanceTab.",
    }
});

const HEART_BEAT_CHECK_INTERVAL = 5000;
let heartBeatInterval = null;

class TrackedPerformanceTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedStudentData: null,
            selectedTab: "Latest Assessment"
        };
        bindAll(this, [
            "fetchStudentData",
        ]);
    }

    componentDidMount() {
        // comment this out for development so we don't make too many requests to the db
        heartBeatInterval = setInterval(this.fetchStudentData.bind(this), HEART_BEAT_CHECK_INTERVAL);
        this.fetchStudentData();
    }

    componentWillUnmount() {
        if (heartBeatInterval) clearInterval(heartBeatInterval);
    }

    async fetchStudentData() {
        const fetchedStudentData = await this.props.selectedClass.getStudentDataForAllStudents();
        this.setState({ fetchedStudentData });
    }

    render() {
        const { intl } = this.props;
        if (!this.state.fetchedStudentData) return (<div>Loading...</div>);
        
        return (
            <div className={styles.classPerformance}>
                <div className={styles.classPerformanceContent}>
                    <div className={styles.classPerformanceHeader}>
                        <div className={styles.navigationTabs}>
                            <div className={[styles.navigationTab, this.state.selectedTab === "Latest Assessment" ? styles.selectedTab : null].join(" ")} onClick={() => this.setState({ selectedTab: "Latest Assessment" })}>Latest Assessment</div>
                            <div className={[styles.navigationTab, this.state.selectedTab === "Live Stream" ? styles.selectedTab : null].join(" ")} onClick={() => this.setState({ selectedTab: "Live Stream" })}>Live Stream</div>
                            <div className={[styles.navigationTab, this.state.selectedTab === "Performance History" ? styles.selectedTab : null].join(" ")} onClick={() => this.setState({ selectedTab: "Performance History" })}>Performance History</div>
                        </div>
                    </div>
                    <div className={styles.body}>
                        {this.state.selectedTab === "Latest Assessment" && <LatestAssessmentTab studentData={this.state.fetchedStudentData} />}
                        {this.state.selectedTab === "Live Stream" && <LiveStreamTab studentData={this.state.fetchedStudentData} />}
                        {this.state.selectedTab === "Performance History" && <PerformanceHistoryTab studentData={this.state.fetchedStudentData} />}
                    </div>
                </div>
            </div>
        );
    }

}

TrackedPerformanceTab.propTypes = {
    selectedClass: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
};

export default injectIntl(TrackedPerformanceTab);