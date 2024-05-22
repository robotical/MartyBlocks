import React from "react";
import styles from "./student-support-overview.css";
import bindAll from 'lodash.bindall';
import { defineMessages, injectIntl } from "react-intl";
import RarrowIcon from "../../../icon--rarrow.svg";
import Spinner from '../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../spinner/spinner.css';
import StudentPieChart from "../../../plots/student-pie-chart/student-pie-chart.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.studentSupportOverview",
    }
});

const DataTransformations = window.codeAssess.codeAssessLib.DataTransformations;

class StudentSupportOverview extends React.Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
            supportStudents: [],
            championStudents: []
        }
    }

    componentDidMount() {
        const { allSessions } = this.props;
        const dataWithColors = DataTransformations.getGraphDataWithColorsForStudents(allSessions);
        const { supportStudents, championStudents } = this.getStudentCategories(dataWithColors);
        this.setState({ isLoading: false, supportStudents, championStudents });
    }

    getStudentCategories(dataWithColors) {
        // get the 5 students with the lowest average score
        // data with colors is an object with studentId as key and compositeScores as value
        const dataWithColorsArr = Object.keys(dataWithColors).map(studentId => {
            return {
                studentId,
                ...dataWithColors[studentId]
            }
        });
        dataWithColorsArr.sort((a, b) => a.compositeScores.averageCompositeScore - b.compositeScores.averageCompositeScore);

        let supportStudents = dataWithColorsArr.slice(0, 5);
        const championStudents = dataWithColorsArr.slice(dataWithColorsArr.length - 5, dataWithColorsArr.length);

        // remove the champion students from the support students
        supportStudents = supportStudents.filter(student => !championStudents.find(championStudent => championStudent.studentId === student.studentId));

        const supportStudentsObj = {};
        supportStudents.forEach(student => {
            supportStudentsObj[student.studentId] = student;
        });

        const championStudentsObj = {};
        championStudents.forEach(student => {
            championStudentsObj[student.studentId] = student;
        });

        return { supportStudents, championStudents };
    }

    render() {
        const { intl, students, allSessions } = this.props;

        if (areAllStudentSessionDataEmpty(allSessions)) {
            return <div className={styles.noData}>No data yet!</div>;
        }
                

        if (this.state.isLoading) {
            return <div className={styles.studentSupportOverviewContainer}>
                <div className={styles.supportTitle}>Support</div>
                <Spinner level='warn' large className={spinnerStyles.primary} />
                <div className={styles.championsTitle}>Champions</div>
                <Spinner level='warn' large className={spinnerStyles.primary} />
                <div className={styles.showAllButtonContainer}>
                    <img src={RarrowIcon} className={styles.showAllButtonIcon} alt="show all" />
                </div>
            </div>
        }

        return <div className={styles.studentSupportOverviewContainer}>
            <div className={styles.supportTitle}>Support</div>
            {[0, 1, 2, 3].map(studentIdx => {
                const student = this.state.supportStudents[studentIdx];
                if (!student) return <div key={studentIdx} className={[styles.studentSpiderContainer, styles.studentSpiderTop].join(" ")}></div>;
                const studentObj = students.find(s => s.id === student.studentId);
                const studentName = studentObj.firstName + " " + studentObj.lastName;
                return <div key={student.studentId} className={[styles.studentSpiderContainer, styles.studentSpiderTop].join(" ")}>
                    <StudentPieChart
                        plotTitle={studentName}
                        size="small"
                        colors={student.colors || {}}
                    />
                </div>
            })}
            <div className={styles.championsTitle}>Champions</div>
            {[0, 1, 2, 3].map(studentIdx => {
                const student = this.state.championStudents[studentIdx];
                if (!student) return <div key={studentIdx} className={[styles.studentSpiderContainer, styles.studentSpiderBottom].join(" ")}></div>;
                const studentObj = students.find(s => s.id === student.studentId);
                if (!studentObj) return <div key={studentIdx} className={[styles.studentSpiderContainer, styles.studentSpiderBottom].join(" ")}></div>;
                const studentName = studentObj.firstName + " " + studentObj.lastName;
                return <div key={student.studentId} className={[styles.studentSpiderContainer, styles.studentSpiderBottom].join(" ")}>
                    <StudentPieChart
                        plotTitle={studentName}
                        size="small"
                        colors={student.colors || {}}
                    />
                </div>
            })}
            <div className={styles.showAllButtonContainer} onClick={this.props.onShowAllClick}>
                <img src={RarrowIcon} className={styles.showAllButtonIcon} alt="show all" />
            </div>
        </div>
    }


}


export default injectIntl(StudentSupportOverview);

const areAllStudentSessionDataEmpty = (sessions) => {
    if (!sessions) return true;
    if (!Array.isArray(sessions)) return true;
    if (sessions.length === 0) return true;
    let allEmpty = true;
    sessions.forEach(session => {
        if (session.studentSessionData && session.studentSessionData.length > 0) {
            allEmpty = false;
        }
    });
    return allEmpty;
}