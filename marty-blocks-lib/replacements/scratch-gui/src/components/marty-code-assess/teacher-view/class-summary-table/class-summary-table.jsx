import React from "react";
import styles from "./class-summary-table.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import Spinner from '../../../spinner/spinner.jsx';
import spinnerStyles from '../../../spinner/spinner.css';
import SimpleTooltip from "../../../simple-tooltip/simple-tooltip.jsx";

const messages = defineMessages({
    tutorials: {
        id: "gui.martyCodeAssess.teacherView.ClassSummaryTable.",
        description: "sf",
        defaultMessage: "adf",
    }
});

class ClassSummaryTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableMode: "All Sessions" // "Final Score" or "All Sessions"
        };
        bindAll(this, [

        ]);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {

    }


    render() {
        if (!this.props.data) {
            return null;
        }
        const dataWithClassAverage = getClassAverage(this.props.data);

        let tableFirstColumnJSX = [];
        let tableColumnsJSX = [];
        // in the ordered student names there is the "Class Average" key, which we want to put at the beginning
        const orderedStudentNames = Object.keys(dataWithClassAverage).sort((a, b) => {
            if (a === "Class Average") return -1;
            if (b === "Class Average") return 1;
            return a.localeCompare(b);
        });
        if (this.state.tableMode === "Final Score") {
            tableFirstColumnJSX = <div className={styles.column}>
                <SimpleTooltip className={styles.cell} text={""} tooltipText={""} />
                <SimpleTooltip className={styles.cell} text={minimiseString("Algorithms")} tooltipText={"Algorithms"} />
                <SimpleTooltip className={styles.cell} text={minimiseString("Analysis")} tooltipText={"Analysis"} />
                <SimpleTooltip className={styles.cell} text={minimiseString("Decomposition")} tooltipText={"Decomposition"} />
                <SimpleTooltip className={styles.cell} text={minimiseString("Generalisation and Abstraction")} tooltipText={"Generalisation and Abstraction"} />
                <SimpleTooltip className={styles.cell} text={minimiseString("Pattern Recognition and Data Representation")} tooltipText={"Pattern Recognition and Data Representation"} />
                <SimpleTooltip className={styles.cell} text={minimiseString("Average")} tooltipText={"Average"} />
            </div>;
            tableColumnsJSX = orderedStudentNames.map((studentName, studentNameIdx) => {
                const studentData = dataWithClassAverage[studentName];
                const columnClassName = studentName === "Class Average" ? [styles.column, styles.classAverageColumn].join(" ") : styles.column;
                return (
                    <div className={columnClassName} key={studentName + studentNameIdx}>
                        <SimpleTooltip className={styles.cell} text={minimiseString(studentName)} tooltipText={studentName} />
                        <div style={getStylesForScore(getLastScore(studentData["Algorithms"]))} className={styles.cell}>{roundToTwo(getLastScore(studentData["Algorithms"]))}%</div>
                        <div style={getStylesForScore(getLastScore(studentData["Analysis"]))} className={styles.cell}>{roundToTwo(getLastScore(studentData["Analysis"]))}%</div>
                        <div style={getStylesForScore(getLastScore(studentData["Decomposition"]))} className={styles.cell}>{roundToTwo(getLastScore(studentData["Decomposition"]))}%</div>
                        <div style={getStylesForScore(getLastScore(studentData["Generalisation and Abstraction"]))} className={styles.cell}>{roundToTwo(getLastScore(studentData["Generalisation and Abstraction"]))}%</div>
                        <div style={getStylesForScore(getLastScore(studentData["Pattern Recognition and Data Representation"]))} className={styles.cell}>{roundToTwo(getLastScore(studentData["Pattern Recognition and Data Representation"]))}%</div>
                        <div style={getStylesForScore(getLastScore(studentData["Average"]))} className={styles.cell}>{roundToTwo(getLastScore(studentData["Average"]))}%</div>
                    </div>
                )
            });
        } else if (this.state.tableMode === "All Sessions") {
            tableColumnsJSX = orderedStudentNames.map((studentName, studentNameIdx) => {
                const studentData = dataWithClassAverage[studentName];
                const columnClassName = studentName === "Class Average" ? [styles.column, styles.classAverageColumn].join(" ") : styles.column;
                return (
                    <div className={columnClassName} key={studentName + studentNameIdx}>
                        <SimpleTooltip className={styles.cell} text={minimiseString(studentName)} tooltipText={studentName} />
                        {studentData["Average"].map((sessionValue, sessionValueIdx) => {
                            return <SimpleTooltip key={sessionValueIdx} style={getStylesForScore(sessionValue)} className={styles.cell} text={roundToTwo(sessionValue) + "%"} tooltipText={"Average: " + roundToTwo(sessionValue) + "%"} />
                        })}
                    </div>
                )
            });
            tableFirstColumnJSX = <div className={styles.column}>
                <SimpleTooltip className={styles.cell} text={""} tooltipText={""} />
                {dataWithClassAverage[orderedStudentNames[0]]["Dates"].map((sessionValue, sessionValueIdx) => {
                    const sessionDate = formatDate(sessionValue);
                    return <SimpleTooltip className={styles.cell} text={sessionValueIdx + 1} tooltipText={sessionDate} key={sessionValueIdx} />
                })}
            </div>;
        }

        return (
            <div className={styles.container}>
                <div className={styles.tableButtonsContainer}>
                    <div className={styles.tableModeToggleContainer}>
                        <div onClick={() => this.setState({ tableMode: "Final Score" })} className={this.state.tableMode === "Final Score" ? styles.tableModeToggleSelected : styles.tableModeToggle}>Final Score</div>
                        <div onClick={() => this.setState({ tableMode: "All Sessions" })} className={this.state.tableMode === "All Sessions" ? styles.tableModeToggleSelected : styles.tableModeToggle}>All Sessions</div>
                    </div>
                </div>
                <div className={styles.colourTableContainer}>
                    <div className={styles.colourTable}>
                        <div className={styles.colourTableRowsContainer}>
                            <div className={styles.colourTableRow}>
                                <div className={styles.colourTableRowColour} style={{ backgroundColor: "#FF6F61" }}></div>
                                <div className={styles.colourTableRowText}>Beginner</div>
                            </div>
                            <div className={styles.colourTableRow}>
                                <div className={styles.colourTableRowColour} style={{ backgroundColor: "#FFC107" }}></div>
                                <div className={styles.colourTableRowText}>Intermediate</div>
                            </div>
                            <div className={styles.colourTableRow}>
                                <div className={styles.colourTableRowColour} style={{ backgroundColor: "#8BC34A" }}></div>
                                <div className={styles.colourTableRowText}>Advanced</div>
                            </div>
                            <div className={styles.colourTableRow}>
                                <div className={styles.colourTableRowColour} style={{ backgroundColor: "#009688" }}></div>
                                <div className={styles.colourTableRowText}>Expert</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.table}>
                    {tableFirstColumnJSX}
                    {tableColumnsJSX}
                </div>
            </div>
        )
    }
}

ClassSummaryTable.propTypes = {
    data: PropTypes.object
};

export default injectIntl(ClassSummaryTable);

const roundToTwo = (num) => {
    return Math.round(num * 100);
}

const minimiseString = (str) => {
    // gets the first letter of each word
    let minimisedStr = "";
    const words = str.split(" ");
    for (const word of words) {
        minimisedStr += word[0];
    }
    return minimisedStr;
}

const getLastScore = (dataArr) => {
    if (!dataArr || !dataArr.length) return 0;
    const lastScoreIdx = dataArr.length - 1;
    return dataArr[lastScoreIdx];
}

const getStylesForScore = (score) => {
    if (score < 0.25) return { backgroundColor: "#FF6F61" }; // Coral Red
    if (score < 0.5) return { backgroundColor: "#FFC107" };  // Amber
    if (score < 0.75) return { backgroundColor: "#8BC34A" }; // Light Green
    return { backgroundColor: "#009688" };
}

const getClassAverage = (data) => {
    let classAverage = {};
    let studentCount = Object.keys(data).length;

    for (let student in data) {
        for (let category in data[student]) {
            if (!classAverage[category]) {
                classAverage[category] = [];
            }

            data[student][category].forEach((score, index) => {
                classAverage[category][index] = (classAverage[category][index] || 0) + score;
            });
        }
    }

    for (let category in classAverage) {
        if (category === "Dates") continue;
        classAverage[category] = classAverage[category].map(total => total / studentCount);
    }

    classAverage["Dates"] = data[Object.keys(data)[0]]["Dates"];
    data["Class Average"] = classAverage;
    return data;
}

const formatDate = (date, testing = true) => {
    // FOR TESTING THE 1-DAY SESSIONS
    if (testing) return date;
    const dateObj = new Date(date);
    return dateObj.getDate() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getFullYear();
}