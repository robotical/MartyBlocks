import React from "react";
import styles from "./students-grid.css";
import bindAll from 'lodash.bindall';
import { defineMessages, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Spinner from '../../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../../spinner/spinner.css';
// import ClassStudent from "./class-student/class-student.jsx";

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
            sortBy: "alphabetical", // alphabetical, performance, activity
            isLoading: false,
            sortedStudents: [],
            isAnyStudentDataModalVisible: false
        };
        bindAll(this, [
            'sortByPerformance',
            'sortByActivityStatus',
            'sortByAlphabetical',
            'setIsAnyStudentDataModalVisible',
            'onSortByChange'
        ]);
    }

    componentDidMount() {
        // TODO: create tutorial 
        // this.props.showTutorialCard("code-assess-teacher-dashboard-
        this.sortByAlphabetical();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.students !== this.props.students) {
            if (this.state.sortBy === "alphabetical") this.sortByAlphabetical();
            if (this.state.sortBy === "performance") this.sortByPerformance();
            if (this.state.sortBy === "activity") this.sortByActivityStatus();
        }
    }

    sortByAlphabetical() {
        const students = this.props.students || [];
        const sortedStudents = students.sort((a, b) => {
            const aName = a.name;
            const bName = b.name;
            if (aName < bName) return -1;
            if (aName > bName) return 1;
            return 0;
        });

        this.setState({ sortedStudents });
    }

    sortByPerformance() {
        const students = this.props.students || [];
        // we first need to fetch all student data for these students
        this.setState({ isLoading: true });
        Promise.all(students.map((student) => student.fetchStudentData(this.props.classId)))
            .then((fetchedStudentData) => {
                // now we can sort the students by performance
                console.log("compop", students[0].getCompositeScore(fetchedStudentData[0]));
                const sortedStudents = students.sort((a, b) => {
                    const aStudentData = fetchedStudentData.find((studentData) => studentData.studentId === a.id);
                    const bStudentData = fetchedStudentData.find((studentData) => studentData.studentId === b.id);
                    const aPerformance = a.getCompositeScore(aStudentData);
                    const bPerformance = b.getCompositeScore(bStudentData);
                    return bPerformance - aPerformance;
                });
                this.setState({ sortedStudents, isLoading: false });
            }).catch((err) => console.log(err)).finally(() => this.setState({ isLoading: false }));
    }

    sortByActivityStatus() {
        const students = this.props.students || [];
        // we first need to fetch all student data for these students
        this.setState({ isLoading: true });
        Promise.all(students.map((student) => student.fetchStudentData(this.props.classId)))
            .then((fetchedStudentData) => {
                // now we can sort the students by activity status
                const sortedStudents = students.sort((a, b) => {
                    const aStudentData = fetchedStudentData.find((studentData) => studentData.studentId === a.id);
                    const bStudentData = fetchedStudentData.find((studentData) => studentData.studentId === b.id);
                    const aActivityStatus = a.getActivityStatus(aStudentData); // offline, active, inactive
                    const bActivityStatus = b.getActivityStatus(bStudentData); // offline, active, inactive
                    // show first the active then the inactive then the offline
                    if (aActivityStatus === "active" && bActivityStatus !== "active") return -1;
                    if (aActivityStatus !== "active" && bActivityStatus === "active") return 1;
                    if (aActivityStatus === "inactive" && bActivityStatus !== "inactive") return -1;
                    if (aActivityStatus !== "inactive" && bActivityStatus === "inactive") return 1;
                    if (aActivityStatus === "offline" && bActivityStatus !== "offline") return -1;
                    if (aActivityStatus !== "offline" && bActivityStatus === "offline") return 1;
                    return 0;
                });
                this.setState({ sortedStudents, isLoading: false });
            });
    }

    onSortByChange(sortBy) {
        this.setState({ sortBy });
        if (sortBy === "alphabetical") this.sortByAlphabetical();
        if (sortBy === "performance") this.sortByPerformance();
        if (sortBy === "activity") this.sortByActivityStatus();
    }

    setIsAnyStudentDataModalVisible(isAnyStudentDataModalVisible) {
        this.setState({ isAnyStudentDataModalVisible });
    }


    render() {
        if (!this.props.students) {
            return null;
        }

        return (
            this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : <div className={styles.classStudents}>
                {this.state.sortedStudents.length === 0 && <div className={styles.noStudents}>There are no students in this class</div>}
                {this.state.sortedStudents
                    .map((student) => {
                        return <div>student</div>
                        return (
                            <ClassStudent
                                key={student.id}
                                student={student}
                                classId={this.props.classId}
                                class={this.props.class}
                                setIsAnyStudentDataModalVisible={this.setIsAnyStudentDataModalVisible}
                                isAnyStudentDataModalVisible={this.state.isAnyStudentDataModalVisible}
                            />
                        )
                    })}
            </div>
        )
    }
}

StudentsGrid.propTypes = {
    students: PropTypes.arrayOf(PropTypes.object),
    classId: PropTypes.string.isRequired,
    class: PropTypes.object.isRequired,
};

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