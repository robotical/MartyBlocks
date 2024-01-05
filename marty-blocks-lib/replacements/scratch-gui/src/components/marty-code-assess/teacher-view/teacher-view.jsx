import React from "react";
import styles from "./teacher-view.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import ClassAnnouncementsTab from "./class-announcements-tab/class-announcements-tab.jsx";
import ClassStudents from "./class-students/class-students.jsx";
import Spinner from '../../spinner/spinner.jsx';
import spinnerStyles from '../../spinner/spinner.css';
import PropTypes from "prop-types";

const messages = defineMessages({
    placeholder: {
        defaultMessage: "Tutorials",
        description: "Button to open the tutorials page",
        id: "gui.martyCodeAssess.teacherView.tutorials",
    }
});

class TeacherView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedClassStudents: [],
            selectedTab: "Overview", // Overview, Students, Class Announcements
            isLoading: false,
        };
        bindAll(this, [
            'getStudentsOfClass',
            'onSelectTab',
        ]);
    }

    componentDidMount() {
        const asyncFunc = async () => {
            this.setState({ isLoading: true });
            await codeAssess.createTeacherIfDoesntExist();
            await this.getStudentsOfClass();
            this.setState({ isLoading: false });
        }
        asyncFunc();
    }

    // when the prop selectedClass changes
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedClass !== this.props.selectedClass) {
            this.setState({ isLoading: true });
            await this.getStudentsOfClass();
            this.setState({ isLoading: false });
        }
    }

    async getStudentsOfClass() {
        const students = await this.props.selectedClass.getListOfStudents();
        this.setState({ selectedClassStudents: students });
    }

    onSelectTab(tab) {
        this.setState({ selectedTab: tab });
    }

    render() {
        const { intl } = this.props;

        return (
            <div className={styles.outerContainer} >
                <div className={styles.header}>
                    <div onClick={() => this.onSelectTab("Overview")} className={[styles.tab, (this.state.selectedTab === "Overview" ? styles.selectedTab : "")].join(" ")}>Overview</div>
                    <div onClick={() => this.onSelectTab("Students")} className={[styles.tab, (this.state.selectedTab === "Students" ? styles.selectedTab : "")].join(" ")}>Students</div>
                    {/* <div onClick={() => this.onSelectTab("Class Performance")} className={[styles.tab, (this.state.selectedTab === "Class Performance" ? styles.selectedTab : "")].join(" ")}>Class Performance</div> */}
                    <div onClick={() => this.onSelectTab("Class Announcements")} className={[styles.tab, (this.state.selectedTab === "Class Announcements" ? styles.selectedTab : "")].join(" ")}>Class Announcements</div>
                </div>
                <div className={styles.selectedTabContentContainer}>
                    {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                        <>
                            {this.state.selectedTab === "Overview" && <div className={styles.overviewContainer}>
                                <div className={styles.overviewClassName}>Class name: {this.props.selectedClass?.name}</div>
                                <div className={styles.overviewClassSection}>{this.props.selectedClass?.section}</div>
                                <div className={styles.overviewClassSubject}>{this.props.selectedClass?.subject}</div>
                                <div className={styles.overviewClassRoom}>{this.props.selectedClass?.room}</div>
                                <div className={styles.overviewTotalStudents}>Enrolled Students: {this.state.selectedClassStudents.length}</div>
                            </div>
                            }
                            {this.state.selectedTab === "Students" && <ClassStudents students={this.state.selectedClassStudents} classId={this.props.selectedClass?.id} />}
                            {/* {this.state.selectedTab === "Class Performance" && <div className={styles.liveStreamContainer}>
                                <ClassPerformanceTab selectedClass={this.props.selectedClass} />
                            </div>
                            } */}
                            {this.state.selectedTab === "Class Announcements" && <div className={styles.classAnnouncementsContainer}>
                                <ClassAnnouncementsTab selectedClass={this.props.selectedClass} students={this.state.selectedClassStudents || []} />
                            </div>
                            }
                        </>
                    )}
                </div>
            </div>
        );
    }
}

TeacherView.propTypes = {
    intl: intlShape.isRequired,
    selectedClass: PropTypes.object,
};


export default injectIntl(TeacherView);