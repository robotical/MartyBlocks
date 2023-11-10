import React from "react";
import styles from "./class-student.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import educationIconGreen from "../../../../lib/assets/icon--education-green.svg";
import educationIconRed from "../../../../lib/assets/icon--education-red.svg";
import PropTypes from 'prop-types';
import Modal from "../../../../containers/modal.jsx";
import StudentDataModal from "../../student-data-modal/student-data-modal.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.ClassStudent.",
    }
});

const HEART_BEAT_CHECK_INTERVAL = 5000;
let heartBeatInterval = null;

class ClassStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStudentActive: false,
            fetchedStudentData: null,
            studentDataModalVisible: false
        };
        bindAll(this, [
            "fetchStudentData",
            "onStudentClick"
        ]);
    }

    componentDidMount() {
        // comment this out for development so we don't make too many requests to the db
        // heartBeatInterval = setInterval(this.fetchStudentData.bind(this), HEART_BEAT_CHECK_INTERVAL);
        this.fetchStudentData();
    }

    componentWillUnmount() {
        if (heartBeatInterval) clearInterval(heartBeatInterval);
    }

    async fetchStudentData() {
        const fetchedStudentData = await this.props.student.fetchStudentData(this.props.classId);
        const isStudentActive = this.props.student.isActive({ lastHeartbeat: fetchedStudentData.lastHeartbeat });
        this.setState({ isStudentActive, fetchedStudentData });
    }

    onStudentClick() {
        this.setState({ studentDataModalVisible: true });
    }
    render() {
        const { intl } = this.props;
        const student = this.props.student;
        console.log("re-rendering ClassStudent")
        return (
            <>
                {this.state.studentDataModalVisible &&
                    <Modal
                        onRequestClose={() => this.setState({ studentDataModalVisible: false })}
                        fullScreen
                        id="studentDataModal"
                        contentLabel={`${student.name} Assessment over time`}
                    >
                        <StudentDataModal
                            onClose={() => this.setState({ studentDataModalVisible: false })}
                            studentData={this.state.fetchedStudentData}
                            student={student}
                        />
                    </Modal>
                }
                <div className={styles.classStudent} onClick={this.onStudentClick}>
                    <div className={styles.classStudentImgContainer}>
                        {this.state.isStudentActive ? <img className={styles.classStudentImg} src={educationIconGreen} /> : <img src={educationIconRed} />}
                    </div>
                    <div className={styles.classStudentName}>
                        {student.name}
                    </div>
                </div>
            </>
        );
    }

}

ClassStudent.propTypes = {
    student: PropTypes.object.isRequired,
    classId: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
};

export default injectIntl(ClassStudent);