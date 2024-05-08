import React from "react";
import styles from "./sortby-students.css";

const SORT_BY_OPTIONS = ["Name", "Acivity Status", "Performance"];
const SORT_BY_ENUM = {
    NAME: SORT_BY_OPTIONS[0],
    ACTIVITY_STATUS: SORT_BY_OPTIONS[1],
    PERFORMANCE: SORT_BY_OPTIONS[2]
}
const StudentStatusEnum = window.codeAssess.codeAssessLib.StudentStatusEnum;


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

    // sortByPerformance() {
    //     const students = this.props.students || [];
    //     // we first need to fetch all student data for these students
    //     this.setState({ isLoading: true });
    //     Promise.all(students.map((student) => student.fetchStudentData(this.props.classId)))
    //         .then((fetchedStudentData) => {
    //             // now we can sort the students by performance
    //             console.log("compop", students[0].getCompositeScore(fetchedStudentData[0]));
    //             const sortedStudents = students.sort((a, b) => {
    //                 const aStudentData = fetchedStudentData.find((studentData) => studentData.studentId === a.id);
    //                 const bStudentData = fetchedStudentData.find((studentData) => studentData.studentId === b.id);
    //                 const aPerformance = a.getCompositeScore(aStudentData);
    //                 const bPerformance = b.getCompositeScore(bStudentData);
    //                 return bPerformance - aPerformance;
    //             });
    //             this.setState({ sortedStudents, isLoading: false });
    //         }).catch((err) => console.log(err)).finally(() => this.setState({ isLoading: false }));
    // }

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