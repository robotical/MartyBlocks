import React from "react";
import styles from "./sortby-students.css";

const SORT_BY_OPTIONS = ["Name", "Acivity Status", "Performance"];

class SortByStudents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSortBy: "Name",
        };
    }


    componentDidMount() {
    }

    componentWillUnmount() {
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

    // sortByActivityStatus() {
    //     const students = this.props.students || [];
    //     // we first need to fetch all student data for these students
    //     this.setState({ isLoading: true });
    //     Promise.all(students.map((student) => student.fetchStudentData(this.props.classId)))
    //         .then((fetchedStudentData) => {
    //             // now we can sort the students by activity status
    //             const sortedStudents = students.sort((a, b) => {
    //                 const aStudentData = fetchedStudentData.find((studentData) => studentData.studentId === a.id);
    //                 const bStudentData = fetchedStudentData.find((studentData) => studentData.studentId === b.id);
    //                 const aActivityStatus = a.getActivityStatus(aStudentData); // offline, active, inactive
    //                 const bActivityStatus = b.getActivityStatus(bStudentData); // offline, active, inactive
    //                 // show first the active then the inactive then the offline
    //                 if (aActivityStatus === "active" && bActivityStatus !== "active") return -1;
    //                 if (aActivityStatus !== "active" && bActivityStatus === "active") return 1;
    //                 if (aActivityStatus === "inactive" && bActivityStatus !== "inactive") return -1;
    //                 if (aActivityStatus !== "inactive" && bActivityStatus === "inactive") return 1;
    //                 if (aActivityStatus === "offline" && bActivityStatus !== "offline") return -1;
    //                 if (aActivityStatus !== "offline" && bActivityStatus === "offline") return 1;
    //                 return 0;
    //             });
    //             this.setState({ sortedStudents, isLoading: false });
    //         });
    // }

    // onSortByChange(sortBy) {
    //     this.setState({ sortBy });
    //     if (sortBy === "alphabetical") this.sortByAlphabetical();
    //     if (sortBy === "performance") this.sortByPerformance();
    //     if (sortBy === "activity") this.sortByActivityStatus();
    // }

    render() {

        return (
            <div className={styles.sortByStudentsContainer}>
                <select className={styles.sortBySelect}>
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