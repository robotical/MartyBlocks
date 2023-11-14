import React from "react";
import styles from "./teacher-view.css";
import bindAll from 'lodash.bindall';
import AssetPanel from "../../asset-panel/asset-panel.jsx";
import { defineMessages, intlShape, injectIntl } from "react-intl";
import classroomIcon from "../../../lib/assets/icon--classroom.svg";
import helpIcon from "../../../lib/assets/icon--tutorials.svg";
import ClassStudent from "./class-student/class-student.jsx";
import ClassPerformanceTab from "./class-performance-tab/class-performance-tab.jsx";

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
            selectedTab: "Overview",
        };
        bindAll(this, [
            'handleClassChange',
            'getStudentsOfClass',
            'onSelectTab'
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

    onSelectTab(tab) {
        this.setState({ selectedTab: tab });
    }

    render() {
        const { intl } = this.props;
        const teacherClassessAssets = this.state.teacherClassess?.map((cls) => {
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
                onDrop={() => { }}
                externalStylesClass={styles.assetPanel}
            >
                <div className={styles.outerContainer} >
                    <div className={styles.header}>
                        <div onClick={() => this.onSelectTab("Overview")} className={[styles.tab, (this.state.selectedTab === "Overview" ? styles.selectedTab : "")].join(" ")}>Overview</div>
                        <div onClick={() => this.onSelectTab("Students")} className={[styles.tab, (this.state.selectedTab === "Students" ? styles.selectedTab : "")].join(" ")}>Students</div>
                        <div onClick={() => this.onSelectTab("Class Performance")} className={[styles.tab, (this.state.selectedTab === "Class Performance" ? styles.selectedTab : "")].join(" ")}>Class Performance</div>
                    </div>
                    <div className={styles.selectedTabContentContainer}>
                        {this.state.selectedTab === "Overview" && <div className={styles.overviewContainer}>
                            <div className={styles.overviewClassName}>Class name: {this.state.teacherClassess[this.state.selectedClassIdx]?.name}</div>
                            <div className={styles.overviewClassSection}>{this.state.teacherClassess[this.state.selectedClassIdx]?.section}</div>
                            <div className={styles.overviewClassSubject}>{this.state.teacherClassess[this.state.selectedClassIdx]?.subject}</div>
                            <div className={styles.overviewClassRoom}>{this.state.teacherClassess[this.state.selectedClassIdx]?.room}</div>
                            <div className={styles.overviewTotalStudents}>Enrolled Students: {this.state.selectedClassStudents.length}</div>
                        </div>
                        }
                        {this.state.selectedTab === "Students" && <div className={styles.studentsContainer}>
                            <div className={styles.classStudents}>
                                {this.state.selectedClassStudents
                                    .map((student) => (
                                        <ClassStudent key={student.id} student={student} classId={this.state.teacherClassess[this.state.selectedClassIdx].id} />
                                    ))}
                            </div>
                        </div>}
                        {this.state.selectedTab === "Class Performance" && <div className={styles.liveStreamContainer}>
                            <ClassPerformanceTab selectedClass={this.state.teacherClassess[this.state.selectedClassIdx]} />
                        </div>
                        }
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