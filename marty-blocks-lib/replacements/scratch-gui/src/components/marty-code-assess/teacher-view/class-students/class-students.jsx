import React from "react";
import styles from "./class-students.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import ClassStudent from "./class-student/class-student.jsx";
import Spinner from '../../../spinner/spinner.jsx';
import spinnerStyles from '../../../spinner/spinner.css';

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.classStudents.",
    }
});


class ClassStudents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: "alphabetical", // alphabetical, performance, activity
            isLoading: false,
            sortedStudents: []
        };
        bindAll(this, [
            'sortByPerformance',
            'sortByActivityStatus',
            'sortByAlphabetical'
        ]);
    }

    componentDidMount() {
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
                const sortedStudents = students.sort((a, b) => {
                    const aStudentData = fetchedStudentData.find((studentData) => studentData.studentId === a.id);
                    const bStudentData = fetchedStudentData.find((studentData) => studentData.studentId === b.id);
                    const aPerformance = a.getCompositeScore(aStudentData);
                    const bPerformance = b.getCompositeScore(bStudentData);
                    return bPerformance - aPerformance;
                });
                this.setState({ sortedStudents, isLoading: false });
            });
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

    render() {
        if (!this.props.students) {
            return null;
        }

        return (
            <div className={styles.studentsContainer}>
                <div className={styles.sortContainer}>
                    <label className={styles.sortLabel}>Sort by:</label>
                    <select className={styles.sortSelect} value={this.state.sortBy} onChange={(e) => this.onSortByChange(e.target.value)}>
                        <option value="alphabetical">Alphabetical</option>
                        <option value="performance">Performance</option>
                        <option value="activity">Activity</option>
                    </select>
                </div>
                {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : <div className={styles.classStudents}>
                    {this.state.sortedStudents
                        .map((student) => (
                            <ClassStudent key={student.id} student={student} classId={this.props.classId} />
                        ))}
                </div>}
            </div>
        )
    }


}

ClassStudents.propTypes = {
    students: PropTypes.arrayOf(PropTypes.object),
    classId: PropTypes.string,
    intl: intlShape.isRequired,
};

export default injectIntl(ClassStudents);