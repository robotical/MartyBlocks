import React from "react";
import styles from "./teacher-view.css";
import bindAll from 'lodash.bindall';

class TeacherView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teacherClassrooms: [],
            selectedClassroom: null,
            selectedClassroomStudents: [],
        };
        bindAll(this, [
            'handleClassroomChange',
        ]);
    }

    componentDidMount() {
        codeAssess.API.classroomAPI.listClassrooms().then((classrooms) => {
            this.setState({ teacherClassrooms: classrooms });
        });
    }

    // when the component state is changed
    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedClassroom !== this.state.selectedClassroom) {
            this.getStudentsOfClassroom(this.state.selectedClassroom.id);
        }
    }

    handleClassroomChange(event) {
        console.log("handleClassroomChange")
        this.setState({ selectedClassroom: this.state.teacherClassrooms[event.target.value] });
    }

    // when the teacherClassrooms state is updated, this function is called
    async getStudentsOfClassroom(classroomId) {
        const students = await codeAssess.API.classroomAPI.listStudents(classroomId);
        this.setState({ selectedClassroomStudents: students });
    }


    render() {
        return (
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <div className={styles.title}>Teacher View</div>
                    <div className={styles.classroomsContainer}>
                        <div className={styles.classroomsTitle}>Classrooms</div>
                        <div className={styles.dropdownContainer}>
                            <select className={styles.classroomDropdown}
                                onChange={this.handleClassroomChange}
                                value={this.state.selectedClassroom ? this.state.selectedClassroom.id : ""}>
                                <option value="" disabled>Select a classroom</option>
                                {this.state.teacherClassrooms.map((classroom, classroomIdx) => (
                                    <option value={classroomIdx} key={classroom.id}>
                                        {classroom.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.classroomStudents}>
                            {this.state.selectedClassroomStudents
                                .map((student) => (
                                    <div className={styles.classroomStudent} key={student.profile.id}>
                                        {student.profile.name.fullName}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default TeacherView;