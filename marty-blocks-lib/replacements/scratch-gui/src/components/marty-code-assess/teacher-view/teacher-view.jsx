import React from "react";
import styles from "./teacher-view.css";

class TeacherView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teacherClassrooms: [],
        };
    }

    componentDidMount() {
        codeAssess.API.classroomAPI.listClassrooms().then((classrooms) => {
            this.setState({ teacherClassrooms: classrooms });
        });
    }

    render() {
        return (
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <div className={styles.title}>Teacher View</div>
                    <div className={styles.classroomsContainer}>
                        <div className={styles.classroomsTitle}>Classrooms</div>
                        <div className={styles.classrooms}>
                            {this.state.teacherClassrooms.map((classroom) => {
                                return (
                                    <div className={styles.classroom} key={classroom.id}>
                                        <div className={styles.classroomTitle}>{classroom.name}</div>
                                        <div className={styles.classroomStudents}>
                                            {classroom.students?.map((student) => {
                                                return (
                                                    <div className={styles.classroomStudent} key={student.id}>{student.name}</div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default TeacherView;