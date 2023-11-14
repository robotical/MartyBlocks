import React from "react";
import styles from "./student-view.css";
import bindAll from 'lodash.bindall';
import AssetPanel from "../../asset-panel/asset-panel.jsx";
import { defineMessages, intlShape, injectIntl } from "react-intl";
import classroomIcon from "../../../lib/assets/icon--classroom.svg";
import helpIcon from "../../../lib/assets/icon--tutorials.svg";
import StudentAssessment from "./student-assessment/student-assessment.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "Tutorials",
        description: "Button to open the tutorials page",
        id: "gui.martyCodeAssess.studentView.tutorials",
    }
});

class StudentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentClassess: [],
            selectedClassIdx: 0,
            selectedClassStudents: [],
            selectedTab: "Overview",
        };
        bindAll(this, [
            'handleClassChange',
            'onSelectTab',
            'onJoinClass'
        ]);
    }

    componentDidMount() {
        const asyncFunc = async () => {
            await codeAssess.createStudentIfDoesntExist(codeAssess.student.id, codeAssess.student.name);
            codeAssess.student.getListOfClassess().then((classess) => {
                this.setState({ studentClassess: classess });
            });
        }
        asyncFunc();
    }

    // when the component state is changed
    async componentDidUpdate(prevProps, prevState) {
        // when the selectedClass changes
        if (prevState.selectedClassIdx !== this.state.selectedClassIdx) {
            const selectedClass = this.state.studentClassess[this.state.selectedClassIdx];
            await codeAssess.createClassIfDoesntExist(selectedClass.id, selectedClass.name, codeAssess.student.id);
        }
    }

    handleClassChange(classIdx) {
        this.setState({ selectedClassIdx: classIdx });
    }

    onSelectTab(tab) {
        this.setState({ selectedTab: tab });
    }

    async onJoinClass() {
        const classId = this.state.studentClassess[this.state.selectedClassIdx]?.id;
        // TODO: refactor so setJoinedClass takes care of fetching student data and initialising the heartbeat
        const studentData = await codeAssess.student.requestStudentData(classId);
        await studentData.initialiseHeartbeat();
        codeAssess.student.setJoinedClass(classId);
        this.setState({ });
    }

    render() {
        const { intl } = this.props;
        const studentClassessAssets = this.state.studentClassess?.map((cls) => {
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
                items={studentClassessAssets}
                selectedItemIndex={this.state.selectedClassIdx}
                onItemClick={this.handleClassChange}
                onDrop={() => { }}
                externalStylesClass={styles.assetPanel}
            >
                <div className={styles.outerContainer} >
                    <div className={styles.header}>
                        <div onClick={() => this.onSelectTab("Overview")} className={[styles.tab, (this.state.selectedTab === "Overview" ? styles.selectedTab : "")].join(" ")}>Overview</div>
                        <div onClick={() => this.onSelectTab("My Assessment")} className={[styles.tab, (this.state.selectedTab === "My Assessment" ? styles.selectedTab : "")].join(" ")}>My Assessment</div>
                    </div>
                    <div className={styles.selectedTabContentContainer}>
                        {this.state.selectedTab === "Overview" && <div className={styles.overviewContainer}>
                            <div className={styles.overviewClassName}>Name: {this.state.studentClassess[this.state.selectedClassIdx]?.name}</div>
                            <div className={styles.overviewClassSection}>{this.state.studentClassess[this.state.selectedClassIdx]?.section}</div>
                            <div className={styles.overviewClassSubject}>{this.state.studentClassess[this.state.selectedClassIdx]?.subject}</div>
                            <div className={styles.overviewClassRoom}>{this.state.studentClassess[this.state.selectedClassIdx]?.room}</div>
                            <div className={styles.overviewHasJoined}>
                                {!!(codeAssess?.student?.joinedClass?.id === this.state.studentClassess[this.state.selectedClassIdx]?.id) ?
                                    "Joined" :
                                    <button onClick={this.onJoinClass}>Join</button>
                                }
                            </div>
                        </div>
                        }
                        {this.state.selectedTab === "My Assessment" && <div className={styles.myAssessmentContainer}>
                            <StudentAssessment classId={this.state.studentClassess[this.state.selectedClassIdx]?.id} />
                        </div>
                        }
                    </div>
                </div>
            </AssetPanel>
        );
    }
}

StudentView.propTypes = {
    intl: intlShape.isRequired,
};


export default injectIntl(StudentView);

