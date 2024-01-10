import React from "react";
import styles from "./class-overview.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import Spinner from '../../../spinner/spinner.jsx';
import spinnerStyles from '../../../spinner/spinner.css';
import ClassSummaryTable from "../class-summary-table/class-summary-table.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.classOverview.",
    }
});

class ClassOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: null
        };
        bindAll(this, [

        ]);
    }

    componentDidMount() {
        this.props.class.getStudentDataForAllStudents().then((data) => {
            const mappedData = mapDataToStudents(data, this.props.students);
            const mappedScoresOverTime = {};
            for (const studentName in mappedData) {
                mappedScoresOverTime[studentName] = mappedData[studentName].scoresOverTime;
            }
            const mappedTransformedDatas = {};
            for (const studentName in mappedScoresOverTime) {
                const transformedData = {};
                const normalisedData = new codeAssess.Preprocessor(mappedScoresOverTime[studentName])
                    .sortData()
                    .normaliseScores()
                    .calculateMovingMaxBasedOnDates(.9, "minutes")
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
            this.setState({ tableData: calculateAverageForCategories(mappedTransformedDatas) });
        });
    }

    componentDidUpdate(prevProps, prevState) {

    }


    render() {
        if (!this.props.students) {
            return null;
        }

        return (
            <div className={styles.overviewContainer}>
                <div className={styles.overviewClassName}>{this.props.class?.name} || <span className={styles.overviewClassSection}>{this.props.class?.section}</span> <span className={styles.overviewClassSubject}>{this.props.class?.subject}</span></div>
                {/* <div className={styles.overviewClassRoom}>{this.props.class?.room}</div> */}
                <div className={styles.overviewTotalStudents}>Enrolled Students: {this.props.students.length}</div>
                <ClassSummaryTable data={this.state.tableData} />
            </div>
        )
    }
}

ClassOverview.propTypes = {
    class: PropTypes.object,
    students: PropTypes.arrayOf(PropTypes.object),
    classId: PropTypes.string,
    intl: intlShape.isRequired,
};

export default injectIntl(ClassOverview);

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