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
            selectedClassCourseWork: [],
        };
        bindAll(this, [
            'handleClassChange',
        ]);
    }

    componentDidMount() {
        // get the teacher object
        this.setState({ teacher: codeAssess.teacher });
    }

    // when the component state is changed
    componentDidUpdate(prevProps, prevState) {
        // when the selectedClass changes
        if (prevState.selectedClass !== this.state.selectedClass) {
            this.getStudentsOfClass();
            this.getCourseworskOfClass();
        }
        // when the teacher changes
        if (prevState.teacher !== this.state.teacher) {
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

    // when the teacherClassess state is updated, this function is called
    async getCourseworskOfClass() {
        await codeAssess.createDefaultCourseWorkForClass(this.state.selectedClass.id);
        const courseWork = await this.state.selectedClass.getListOfCourseWorks();
        this.setState({ selectedClassCourseWork: courseWork });
    }

    render() {
        return (
            <div className={styles.outerContainer}>
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
                                    <option value={classIdx} key={cls.id}>
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
                        <div className={styles.classCourseWork}>
                            {this.state.selectedClassCourseWork
                                .map((courseWork) => (
                                    <div className={styles.classCourseWorkItem} key={courseWork.id}>
                                        {courseWork.title}
                                        <p>{courseWork.description}</p>
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