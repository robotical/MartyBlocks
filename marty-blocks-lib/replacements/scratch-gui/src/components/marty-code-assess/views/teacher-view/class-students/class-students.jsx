import React from 'react';
import styles from "./class-students.css";
import StudentsGrid from './students-grid/students-grid.jsx';
import StudentsColorCoding from './students-color-coding/students-color-coding.jsx';


export default class ClassStudents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortedStudents: this.props.selectedClassroom?.students || []
        }
    }


    render() {
        const { selectedClassroom } = this.props;

        return <div className={styles.classStudentsContainer}>
            <div className={styles.studentsGridContainer}>
                <h3 className={styles.studentsGridTitle}>Student Competency Levels</h3>
                <StudentsColorCoding />
                <StudentsGrid selectedClassroom={selectedClassroom} students={this.state.sortedStudents} />
            </div>
        </div>
    }
}