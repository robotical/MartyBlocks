import React from "react";
import styles from "./students-grid.css";
import bindAll from 'lodash.bindall';
import { defineMessages, injectIntl } from "react-intl";
import { connect } from "react-redux";
import Spinner from '../../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../../spinner/spinner.css';
import ClassStudent from "./class-student/class-student.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.classDashboard.studentsGrid",
    }
});

const Preprocessor = window.codeAssess.codeAssessLib.Preprocessor;
const DataTransformations = window.codeAssess.codeAssessLib.DataTransformations;

class StudentsGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            sessionDataGroupedByStudent: {},
        };
        bindAll(this, [
        ]);
    }

    componentDidMount() {
    }

    onStudentClick(studentId) {
        this.props.onStudentClick(studentId);
    }


    render() {
        const { students, sessionsArr } = this.props;
        if (!students) {
            return null;
        }

        const sessionDataGroupedByStudent = DataTransformations.getGraphDataWithColorsForStudents(this.props.sessionsArr, this.props.isSpecificSession);
        return (
            this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : <div className={styles.classStudents}>
                {students.length === 0 && <div className={styles.noStudents}>There are no students in this class</div>}
                {students.map((student) => {
                    const studentData = sessionDataGroupedByStudent[student.id];
                    return <ClassStudent
                        key={student.id}
                        student={student}
                        studentGraphData={studentData?.graphData || {}}
                        colors={studentData?.colors || {}}
                        onClick={() => this.props.onStudentClick(student.id)}
                    />
                })}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    showTutorialCard: (tutorialTitle) => {
    }
});

export default injectIntl(connect(null, mapDispatchToProps)(StudentsGrid))
