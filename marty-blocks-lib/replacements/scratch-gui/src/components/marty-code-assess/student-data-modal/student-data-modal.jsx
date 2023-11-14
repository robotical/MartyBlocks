import React from "react";
import styles from "./student-data-modal.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import LatestAssessmentTab from "./latest-assessment-tab/latest-assessment-tab.jsx";
import LiveStreamTab from "./live-stream-tab/live-stream-tab.jsx";
import PerformanceHistoryTab from "./performance-history-tab/performance-history-tab.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.StudentDataModal.",
    }
});

class StudentDataModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "Latest Assessment"
        };
        bindAll(this, [
        ]);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        console.log("re-rendering StudentDataModal")
        const { intl } = this.props;
        const student = this.props.student;
        const studentData = this.props.studentData;
        if (!studentData || !studentData.scoresOverTime) {
            return <div>No student data yet!</div>;
        }
        console.log("studentData.scoresOverTime.length", Object.keys(studentData.scoresOverTime).length)

        return (
            <div className={styles.studentDataModal}>
                <div className={styles.studentDataModalContent}>
                    <div className={styles.studentDataModalHeader}>
                        <div className={styles.navigationTabs}>
                            <div className={[styles.navigationTab, this.state.selectedTab === "Latest Assessment" ? styles.selectedTab : null].join(" ")} onClick={() => this.setState({ selectedTab: "Latest Assessment" })}>Latest Assessment</div>
                            <div className={[styles.navigationTab, this.state.selectedTab === "Live Stream" ? styles.selectedTab : null].join(" ")} onClick={() => this.setState({ selectedTab: "Live Stream" })}>Live Stream</div>
                            <div className={[styles.navigationTab, this.state.selectedTab === "Performance History" ? styles.selectedTab : null].join(" ")} onClick={() => this.setState({ selectedTab: "Performance History" })}>Performance History</div>
                        </div>
                    </div>
                    <div className={styles.modalBody}>
                        {this.state.selectedTab === "Latest Assessment" && <LatestAssessmentTab studentData={studentData} student={student} />}
                        {this.state.selectedTab === "Live Stream" && <LiveStreamTab studentData={studentData} student={student} />}
                        {this.state.selectedTab === "Performance History" && <PerformanceHistoryTab studentData={studentData} student={student} />}
                    </div>
                </div>
            </div>
        );
    }
}



StudentDataModal.propTypes = {
    intl: intlShape.isRequired,
    studentData: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
};


export default injectIntl(StudentDataModal);