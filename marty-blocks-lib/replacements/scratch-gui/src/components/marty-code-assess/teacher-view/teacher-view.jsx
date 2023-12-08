import React from "react";
import styles from "./teacher-view.css";
import bindAll from 'lodash.bindall';
import AssetPanel from "../../asset-panel/asset-panel.jsx";
import { defineMessages, intlShape, injectIntl } from "react-intl";
import classroomIcon from "../../../lib/assets/icon--classroom.svg";
import helpIcon from "../../../lib/assets/icon--tutorials.svg";
import ClassPerformanceTab from "./class-performance-tab/class-performance-tab.jsx";
import ClassAnnouncementsTab from "./class-announcements-tab/class-announcements-tab.jsx";
import ClassStudents from "./class-students/class-students.jsx";
import Spinner from '../../spinner/spinner.jsx';
import spinnerStyles from '../../spinner/spinner.css';

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
            selectedTab: "Overview", // Overview, Students, Class Performance, Class Announcements
            isLoading: false,
        };
        bindAll(this, [
            'handleClassChange',
            'getStudentsOfClass',
            'onSelectTab',
        ]);
    }

    componentDidMount() {
        const asyncFunc = async () => {
            this.setState({ isLoading: true });
            await codeAssess.createTeacherIfDoesntExist();
            codeAssess.teacher.getListOfClassess().then((classess) => {
                this.setState({ teacherClassess: classess });
            });
            this.setState({ isLoading: false });
        }
        asyncFunc();
    }

    // when the component state is changed
    async componentDidUpdate(prevProps, prevState) {
        // when the selectedClass changes
        if (prevState.selectedClassIdx !== this.state.selectedClassIdx) {
            this.setState({ isLoading: true });
            this.setState({ selectedClassStudents: [] });
            const selectedClass = this.state.teacherClassess[this.state.selectedClassIdx];
            await this.getStudentsOfClass();
            await codeAssess.createClassIfDoesntExist(selectedClass.id, selectedClass.name, codeAssess.teacher.id);
            this.setState({ isLoading: false });
        }

        if (prevState.teacherClassess !== this.state.teacherClassess) {
            this.setState({ isLoading: true });
            const selectedClass = this.state.teacherClassess[this.state.selectedClassIdx];
            await codeAssess.createClassIfDoesntExist(selectedClass.id, selectedClass.name, codeAssess.teacher.id);
            await this.getStudentsOfClass();
            this.setState({ isLoading: false });
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
                details: cls.section || "",
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
                        <div onClick={() => this.onSelectTab("Class Announcements")} className={[styles.tab, (this.state.selectedTab === "Class Announcements" ? styles.selectedTab : "")].join(" ")}>Class Announcements</div>
                    </div>
                    <div className={styles.selectedTabContentContainer}>
                        {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                            <>
                                {this.state.selectedTab === "Overview" && <div className={styles.overviewContainer}>
                                    <div className={styles.overviewClassName}>Class name: {this.state.teacherClassess[this.state.selectedClassIdx]?.name}</div>
                                    <div className={styles.overviewClassSection}>{this.state.teacherClassess[this.state.selectedClassIdx]?.section}</div>
                                    <div className={styles.overviewClassSubject}>{this.state.teacherClassess[this.state.selectedClassIdx]?.subject}</div>
                                    <div className={styles.overviewClassRoom}>{this.state.teacherClassess[this.state.selectedClassIdx]?.room}</div>
                                    <div className={styles.overviewTotalStudents}>Enrolled Students: {this.state.selectedClassStudents.length}</div>
                                </div>
                                }
                                {this.state.selectedTab === "Students" && <ClassStudents students={this.state.selectedClassStudents} classId={this.state.teacherClassess[this.state.selectedClassIdx].id} />}
                                {this.state.selectedTab === "Class Performance" && <div className={styles.liveStreamContainer}>
                                    <ClassPerformanceTab selectedClass={this.state.teacherClassess[this.state.selectedClassIdx]} />
                                </div>
                                }
                                {this.state.selectedTab === "Class Announcements" && <div className={styles.classAnnouncementsContainer}>
                                    <ClassAnnouncementsTab selectedClass={this.state.teacherClassess[this.state.selectedClassIdx]} students={this.state.selectedClassStudents || []} />
                                </div>
                                }
                            </>
                        )}
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