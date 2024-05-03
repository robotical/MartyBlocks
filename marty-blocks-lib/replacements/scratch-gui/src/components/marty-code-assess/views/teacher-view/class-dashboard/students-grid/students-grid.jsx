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

class StudentsGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isAnyStudentDataModalVisible: false
        };
        bindAll(this, [
            'setIsAnyStudentDataModalVisible',
        ]);
    }

    componentDidMount() {

    }

    setIsAnyStudentDataModalVisible(isAnyStudentDataModalVisible) {
        this.setState({ isAnyStudentDataModalVisible });
    }


    render() {
        const { selectedClassroom } = this.props;
        const students = selectedClassroom.students;
        if (!students) {
            return null;
        }

        return (
            this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : <div className={styles.classStudents}>
                {students.length === 0 && <div className={styles.noStudents}>There are no students in this class</div>}
                {students.map((student) => {
                    return <ClassStudent
                        key={student.id}
                        student={student}
                        selectedClassroom={selectedClassroom}
                        setIsAnyStudentDataModalVisible={this.setIsAnyStudentDataModalVisible}
                        isAnyStudentDataModalVisible={this.state.isAnyStudentDataModalVisible}
                    />
                })}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    showTutorialCard: (tutorialTitle) => {
        // TODO: handle tutorials
        // const hasThisTutorialBeenShown = localStorage.getItem("mb-tutorials-" + tutorialTitle);
        // if (!hasThisTutorialBeenShown) {
        //     localStorage.setItem("mb-tutorials-" + tutorialTitle, true);
        //     dispatch(activateDeck(tutorialTitle));
        // }
    }
});

export default injectIntl(connect(null, mapDispatchToProps)(StudentsGrid))