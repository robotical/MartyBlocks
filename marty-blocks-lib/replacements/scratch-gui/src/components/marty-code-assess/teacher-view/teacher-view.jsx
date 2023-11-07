import React from "react";
import styles from "./teacher-view.css";
import bindAll from 'lodash.bindall';

class TeacherView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teacher: null,
            teacherClassess: [],
            selectedClass: null,
            selectedClassStudents: [],
        };
        bindAll(this, [
            'handleClassChange',
            "subscribeToStudentData",
            "getStudentsOfClass"
        ]);
    }

    componentDidMount() {
        // get the teacher object
        this.setState({ teacher: codeAssess.teacher });
    }

    // when the component state is changed
    async componentDidUpdate(prevProps, prevState) {
        // when the selectedClass changes
        if (prevState.selectedClass !== this.state.selectedClass) {
            this.getStudentsOfClass();
            await codeAssess.createClassIfDoesntExist(this.state.selectedClass.id, this.state.selectedClass.name, this.state.teacher.id);
            this.subscribeToStudentData();
        }
        // when the teacher changes
        if (prevState.teacher !== this.state.teacher) {
            codeAssess.createTeacherIfDoesntExist(this.state.teacher.id, this.state.teacher.name);
            this.state.teacher.getListOfClassess().then((classess) => {
                this.setState({ teacherClassess: classess });
            });
        }
    }

    handleClassChange(event) {
        this.setState({ selectedClass: this.state.teacherClassess[event.target.value] });
    }

    // when the teacherClassess state is updated, this function is called
    async getStudentsOfClass() {
        const students = await this.state.selectedClass.getListOfStudents();
        this.setState({ selectedClassStudents: students });
    }

    async subscribeToStudentData() {
        await this.state.selectedClass.appendFetchedStudentDataToStudents();
        this.state.selectedClass.students.forEach((student) => {
            student.studentData.subscribeToDbDocChanges((changes) => {
                console.log(changes);
            });
        });
    }

    render() {
        return (
            <div className={styles.outerContainer} >
                <div className={styles.innerContainer}>
                    <div className={styles.title}>Teacher View</div>
                    <div className={styles.teacherContainer}>
                        <div className={styles.teacherTitle}>Teacher</div>
                        <div className={styles.teacherName}>{this.state.teacher ? this.state.teacher.name : ""}</div>
                    </div>
                    <div className={styles.classessContainer}>
                        <div className={styles.classessTitle}>Classess</div>
                        <div className={styles.dropdownContainer}>
                            <select className={styles.classDropdown}
                                onChange={this.handleClassChange}
                                value={this.state.selectedClass ? this.state.selectedClass.id : ""}>
                                <option value="" disabled>Select a class</option>
                                {this.state.teacherClassess.map((cls, classIdx) => (
                                    <option value={classIdx} key={cls.id} selected={this.state.selectedClass?.id === cls.id}>
                                        {cls.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.classStudents}>
                            {this.state.selectedClassStudents
                                .map((student) => (
                                    <div className={styles.classStudent} key={student.id}>
                                        {student.name}
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