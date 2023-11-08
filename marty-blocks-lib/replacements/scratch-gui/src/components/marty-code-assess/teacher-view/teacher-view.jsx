import React from "react";
import styles from "./teacher-view.css";
import bindAll from 'lodash.bindall';
import AssetPanel from "../../asset-panel/asset-panel.jsx";
import { defineMessages, intlShape, injectIntl } from "react-intl";
import classroomIcon from "../../../lib/assets/icon--classroom.svg";
import helpIcon from "../../../lib/assets/icon--tutorials.svg";
import ClassStudent from "./class-student/class-student.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "Tutorials",
        description: "Button to open the tutorials page",
        id: "gui.martyCodeAssess.teacherView.tutorials",
    }
});

class TeacherView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teacherClassess: [],
            selectedClassIdx: 0,
            selectedClassStudents: [],
        };
        bindAll(this, [
            'handleClassChange',
            "subscribeToStudentData",
            "getStudentsOfClass",
            "removeStudentDataSubscription"
        ]);
    }

    componentDidMount() {
        const asyncFunc = async () => {
            await codeAssess.createTeacherIfDoesntExist();
            codeAssess.teacher.getListOfClassess().then((classess) => {
                this.setState({ teacherClassess: classess });
            });
        }
        asyncFunc();
    }

    // when the component state is changed
    async componentDidUpdate(prevProps, prevState) {
        // when the selectedClass changes
        if (prevState.selectedClassIdx !== this.state.selectedClassIdx) {
            this.setState({ selectedClassStudents: [] });
            const selectedClass = this.state.teacherClassess[this.state.selectedClassIdx];
            await this.getStudentsOfClass();
            await codeAssess.createClassIfDoesntExist(selectedClass.id, selectedClass.name, codeAssess.teacher.id);
        }

        if (prevState.teacherClassess !== this.state.teacherClassess) {
            await this.getStudentsOfClass();
        }
    }

    handleClassChange(classIdx) {
        this.setState({ selectedClassIdx: classIdx });
    }

    // when the teacherClassess state is updated, this function is called
    async getStudentsOfClass() {
        const selectedClass = this.state.teacherClassess[this.state.selectedClassIdx];
        const students = await selectedClass.getListOfStudents();
        this.setState({ selectedClassStudents: students });
    }

    async subscribeToStudentData() {
        const selectedClass = this.state.teacherClassess[this.state.selectedClassIdx];
        await selectedClass.appendFetchedStudentDataToStudents();
        selectedClass.students.forEach((student) => {
            student.studentData.subscribeToDbDocChanges((changes) => {
                console.log(changes);
            });
        });
    }

    async removeStudentDataSubscription() {
        const selectedClass = this.state.teacherClassess[this.state.selectedClassIdx];
        selectedClass.students.forEach((student) => {
            student.studentData.unsubscribeFromDbDocChanges();
        });
    }

    render() {
        const { intl } = this.props;
        const teacherClassessAssets = this.state.teacherClassess?.map((cls) => {
            console.log("cls", cls);
            return ({
                url: classroomIcon,
                name: cls.name,
                details: cls.description || "",
            })
        }) || [];
        return (
            <AssetPanel
                buttons={[
                    {
                        title: intl.formatMessage(messages.tutorials),
                        img: helpIcon,
                        onClick: () => this.props.showTutorialCard(), // TODO: implement
                    },
                ]}
                items={teacherClassessAssets}
                selectedItemIndex={this.state.selectedClassIdx}
                onItemClick={this.handleClassChange}
                onDrop={() => {}}
            >
                <div className={styles.outerContainer} >
                    <div className={styles.innerContainer}>
                        <div className={styles.title}>Teacher View</div>
                        <div className={styles.teacherContainer}>
                            <div className={styles.teacherName}>Teacher: {codeAssess.teacher ? codeAssess.teacher.name : ""}</div>
                        </div>
                        <div className={styles.studentsContainer}>
                            <div className={styles.studentsTitle}>Students</div>
                            <div className={styles.classStudents}>
                                {this.state.selectedClassStudents
                                    .map((student) => (
                                        <ClassStudent key={student.id} student={student} classId={this.state.teacherClassess[this.state.selectedClassIdx].id} />
                                    ))}
                            </div>
                        </div>
                        {/* {!!this.state.teacherClassess[this.state.selectedClassIdx] && <div className={styles.dataSubscriptionContainer}>
                            <div className={styles.dataSubscriptionTitle}>Data Subscription</div>
                            <div className={styles.dataSubscriptionButtons}>
                                <div className={styles.dataSubscriptionButton} onClick={this.subscribeToStudentData}>Listen</div>
                                <div className={styles.dataSubscriptionButton} onClick={this.removeStudentDataSubscription}>Stop</div>
                            </div>
                        </div>} */}
                    </div>
                </div>
            </AssetPanel>

        );
    }
}

TeacherView.propTypes = {
    intl: intlShape.isRequired,
};


export default injectIntl(TeacherView);