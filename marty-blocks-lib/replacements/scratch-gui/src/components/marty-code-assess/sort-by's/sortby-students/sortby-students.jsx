import React from "react";
import styles from "./sortby-students.css";

const SORT_BY_OPTIONS = ["Name", "Acivity Status", "Performance"];
const SORT_BY_ENUM = {
    NAME: SORT_BY_OPTIONS[0],
    ACTIVITY_STATUS: SORT_BY_OPTIONS[1],
    PERFORMANCE: SORT_BY_OPTIONS[2]
}

const StudentStatusEnum = window.codeAssess.codeAssessLib.StudentStatusEnum;
const DataTransformations = window.codeAssess.codeAssessLib.DataTransformations;

class SortByStudents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSortBy: SORT_BY_ENUM.NAME
        };
    }


    componentDidMount() {

    }

    componentWillUnmount() {
    }

    componentDidUpdate(prevProps, prevState) {
        // when the students change we need to sort them again
        if (prevProps.students !== this.props.students) {
            this.onSortByChange(this.state.selectedSortBy);
        }

        // if the selected sort by is "activity status", and the activity status of a student changes, we need to sort the students again
        if (this.state.selectedSortBy === SORT_BY_ENUM.ACTIVITY_STATUS) {
            const prevStudents = prevProps.students || [];
            const students = this.props.students || [];
            let shouldSort = false;
            for (const student of students) {
                const studentId = student.id;
                const prevStudent = prevStudents.find((student) => student.id === studentId);
                if (!prevStudent || prevStudent.activityStatus !== student.activityStatus) {
                    shouldSort = true;
                    break;
                }
            }
            if (shouldSort) {
                this.sortByActivityStatus();
            }
        }

        // if the selected sort by is "performance", and the performance of a student changes, we need to sort the students again
        if (this.state.selectedSortBy === SORT_BY_ENUM.PERFORMANCE) {
            const prevStudents = prevProps.students || [];
            const students = this.props.students || [];
            let shouldSort = false;
            for (const student of students) {
                const studentId = student.id;
                const prevStudent = prevStudents.find((student) => student.id === studentId);
                if (!prevStudent || prevStudent.performance !== student.performance) {
                    shouldSort = true;
                    break;
                }
            }
            if (shouldSort) {
                this.sortByPerformance();
            }
        }
    }

    sortByAlphabetical() {
        const students = this.props.students || [];
        const sortedStudents = students.sort((a, b) => {
            const aName = a.firstName;
            const bName = b.firstName;
            if (aName < bName) return -1;
            if (aName > bName) return 1;
            return 0;
        });

        this.props.onStudentsSorted(sortedStudents);
    }

    sortByPerformance() {
        const activeSession = this.props.selectedClassroom.activeSession;
        if (!activeSession) return;
        const dataWithColors = DataTransformations.getGraphDataWithColorsForStudents(allSessions);
        console.log("dataWithColors", dataWithColors);
        const sortedStudents = sortStudentsByPerformance(dataWithColors);
        console.log("sortedStudents", sortedStudents)
        this.props.onStudentsSorted(sortedStudents);
    }

    sortByActivityStatus() {
        const students = this.props.students || [];
        const sortedStudents = students.sort((a, b) => {
            const aActivityStatus = a.activityStatus;
            const bActivityStatus = b.activityStatus;
            // show first the active then the inactive then the offline
            const active = StudentStatusEnum.ACTIVE;
            const inactive = StudentStatusEnum.INACTIVE;
            const offline = StudentStatusEnum.OFFLINE;
            if (aActivityStatus === active && bActivityStatus !== active) return -1;
            if (aActivityStatus !== active && bActivityStatus === active) return 1;
            if (aActivityStatus === inactive && bActivityStatus !== inactive) return -1;
            if (aActivityStatus !== inactive && bActivityStatus === inactive) return 1;
            if (aActivityStatus === offline && bActivityStatus !== offline) return -1;
            if (aActivityStatus !== offline && bActivityStatus === offline) return 1;
            return 0;
        });
        this.props.onStudentsSorted(sortedStudents);
    }

    onSortByChange(sortBy) {
        this.setState({ selectedSortBy: sortBy });
        if (sortBy === SORT_BY_ENUM.NAME) this.sortByAlphabetical();
        if (sortBy === SORT_BY_ENUM.PERFORMANCE) this.sortByPerformance();
        if (sortBy === SORT_BY_ENUM.ACTIVITY_STATUS) this.sortByActivityStatus();
    }

    render() {
        return (
            <div className={styles.sortByStudentsContainer}>
                <select className={styles.sortBySelect} onChange={(e) => this.onSortByChange(e.target.value)} value={this.state.selectedSortBy}>
                    <option value="Sort by" disabled selected>Sort by</option>
                    {SORT_BY_OPTIONS.map((option) => {
                        return (
                            <option key={option} value={option}>{option}</option>
                        )
                    })}
                </select>
            </div>
        )
    }

}

export default SortByStudents;


const sortStudentsByPerformance = (dataWithColors) => {
    const dataWithColorsArr = Object.keys(dataWithColors).map(studentId => {
        return {
            studentId,
            ...dataWithColors[studentId]
        }
    });
    dataWithColorsArr.sort((a, b) => a.compositeScores.studentScore.averageCompositeScore - b.compositeScores.studentScore.averageCompositeScore);

    return dataWithColorsArr;
}