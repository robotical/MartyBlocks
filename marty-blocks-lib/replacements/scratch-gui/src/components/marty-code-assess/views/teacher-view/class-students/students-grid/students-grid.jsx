import React from "react";
import styles from "./students-grid.css";
import bindAll from 'lodash.bindall';
import { defineMessages, injectIntl } from "react-intl";
import { connect } from "react-redux";
import Spinner from '../../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../../spinner/spinner.css';
import ClassStudent from "./class-student/class-student.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.classDashboard.studentsGrid",
    }
});

const Preprocessor = window.codeAssess.codeAssessLib.Preprocessor;
const DataTransformations = window.codeAssess.codeAssessLib.DataTransformations;

class StudentsGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            sessionDataGroupedByStudent: {},
        };
        bindAll(this, [
        ]);
    }

    componentDidMount() {
    }

    onStudentClick(studentId) {
        this.props.onStudentClick(studentId);
    }


    render() {
        const { students, sessionsArr } = this.props;
        if (!students) {
            return null;
        }

        const sessionDataGroupedByStudent = DataTransformations.getGraphDataWithColorsForStudents(this.props.sessionsArr);
        return (
            this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : <div className={styles.classStudents}>
                {students.length === 0 && <div className={styles.noStudents}>There are no students in this class</div>}
                {students.map((student) => {
                    const studentData = sessionDataGroupedByStudent[student.id];
                    return <ClassStudent
                        key={student.id}
                        student={student}
                        studentGraphData={studentData?.graphData || {}}
                        colors={studentData?.colors || {}}
                        onClick={() => this.props.onStudentClick(student.id)}
                    />
                })}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    showTutorialCard: (tutorialTitle) => {
    }
});

export default injectIntl(connect(null, mapDispatchToProps)(StudentsGrid))

const mapDataToStudents = (studentData, students) => {
    if (!studentData || !students || !studentData.length || !students.length) return {};
    const mappedData = {};
    for (const data of studentData) {
        data.studentName = students.find((student) => student.id === data.studentId).name;
        mappedData[data.studentName] = data;
    }
    return mappedData;
}

const calculateAverageForCategories = (mappedData) => {
    if (!mappedData) return {};
    const collapsedData = {};
    for (const studentName in mappedData) {
        const data = mappedData[studentName];
        const collapsedDataForStudent = { ...data };
        collapsedDataForStudent["Average"] = [];
        for (let sessionIdx = 0; sessionIdx < data["Algorithms"].length; sessionIdx++) {
            const average = (data["Algorithms"][sessionIdx] + data["Analysis"][sessionIdx] + data["Decomposition"][sessionIdx] + data["Generalisation and Abstraction"][sessionIdx] + data["Pattern Recognition and Data Representation"][sessionIdx]) / 5;
            collapsedDataForStudent["Average"][sessionIdx] = average;
        }
        collapsedData[studentName] = collapsedDataForStudent;
    }
    return collapsedData;
}

function alignStudentData(studentData) {
    // Extract all unique dates from all students
    let allDates = new Set();
    for (let student in studentData) {
        studentData[student].Dates.forEach(date => allDates.add(date));
    }
    allDates = Array.from(allDates).sort();

    // Align each student's data with the master date list
    let alignedData = {};
    for (let student in studentData) {
        alignedData[student] = {};
        let studentFormattedDates = studentData[student].Dates.map(date => formatDate(date));

        for (let category in studentData[student]) {
            if (category === 'Dates') {
                alignedData[student][category] = allDates;
                continue;
            }

            alignedData[student][category] = allDates.map(date => {
                let dateIndex = studentFormattedDates.indexOf(formatDate(date));
                return dateIndex >= 0 ? studentData[student][category][dateIndex] : 0;
            });
        }
    }

    return alignedData;
}

export const rawStudentDataToAverages = (data, students) => {
    if (!data || !data.length) return;
    const mappedData = mapDataToStudents(data, students);
    const mappedScoresOverTime = {};
    for (const studentName in mappedData) {
        mappedScoresOverTime[studentName] = mappedData[studentName].scoresOverTime;
    }
    const mappedTransformedDatas = {};
    for (const studentName in mappedScoresOverTime) {
        const transformedData = {};
        const normalisedData = new Preprocessor(mappedScoresOverTime[studentName])
            .sortData()
            .normaliseScores()
            // .calculateMovingMaxBasedOnDates(2, "hours")
            .calculateMovingMaxBasedOnDates(isTesting ? .9 : 2, isTesting ? "minutes" : "hours") // this is for testing
            .calculateLeakyIntegrator(.1, .5, 0.01, 0.1, 0.01, 1)
            .data
        transformedData["Algorithms"] = normalisedData.algorithmsCompoScores?.leakyScores;
        transformedData["Analysis"] = normalisedData.analysisCompoScores?.leakyScores;
        transformedData["Decomposition"] = normalisedData.decompositionCompoScores?.leakyScores;
        transformedData["Generalisation and Abstraction"] = normalisedData.generalisationAndAbstrCompoScores?.leakyScores;
        transformedData["Pattern Recognition and Data Representation"] = normalisedData.patternRecAndDataRepCompoScores?.leakyScores;
        transformedData["Dates"] = normalisedData.dates;
        mappedTransformedDatas[studentName] = transformedData;
    }
    const alignedData = alignStudentData(mappedTransformedDatas);
    console.log("mappedTransformedDatas", mappedTransformedDatas);
    console.log("alignedData", alignedData);
    return calculateAverageForCategories(alignedData);
}
