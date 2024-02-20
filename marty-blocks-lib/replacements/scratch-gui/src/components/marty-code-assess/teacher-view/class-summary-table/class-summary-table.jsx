import React from "react";
import styles from "./class-summary-table.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import SimpleTooltip from "../../../simple-tooltip/simple-tooltip.jsx";
import MoreInfoButton from "../../../more-info-button/more-info-button.jsx";
import TableModeInfo from "../../../more-info-components/code-asses-table-mode/code-asses-table-mode.jsx";
import TableColorCodingInfo from "../../../more-info-components/code-asses-table-coding/code-asses-table-coding.jsx";

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
            tableMode: "All Sessions", // "Final Score" or "All Sessions",
            colourCodingMode: "Absolute Score", // "Absolute Score" or "Relative Score"
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
        if (!this.props.data.length === 0) {
            return null;
        }
        const dataWithClassAverage = getClassAverage(this.props.data);

        let relativeData;
        if (this.state.colourCodingMode === "Relative Score") {
            relativeData = generateRelativeData(dataWithClassAverage);
        }

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
                <SimpleTooltip className={styles.cell} text={"-"} tooltipText={""} />
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
                const data = this.state.colourCodingMode === "Absolute Score" ? studentData : relativeData[studentName];
                return (
                    <div className={columnClassName} key={studentName + studentNameIdx}>
                        <SimpleTooltip className={styles.cell} text={minimiseString(studentName)} tooltipText={studentName} />
                        <div style={getStylesForScore(getLastScore(data["Algorithms"]))} className={styles.cell}>{roundToTwo(getLastScore(studentData["Algorithms"]))}%</div>
                        <div style={getStylesForScore(getLastScore(data["Analysis"]))} className={styles.cell}>{roundToTwo(getLastScore(studentData["Analysis"]))}%</div>
                        <div style={getStylesForScore(getLastScore(data["Decomposition"]))} className={styles.cell}>{roundToTwo(getLastScore(studentData["Decomposition"]))}%</div>
                        <div style={getStylesForScore(getLastScore(data["Generalisation and Abstraction"]))} className={styles.cell}>{roundToTwo(getLastScore(studentData["Generalisation and Abstraction"]))}%</div>
                        <div style={getStylesForScore(getLastScore(data["Pattern Recognition and Data Representation"]))} className={styles.cell}>{roundToTwo(getLastScore(studentData["Pattern Recognition and Data Representation"]))}%</div>
                        <div style={getStylesForScore(getLastScore(data["Average"]))} className={styles.cell}>{roundToTwo(getLastScore(studentData["Average"]))}%</div>
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
                            const data = this.state.colourCodingMode === "Absolute Score" ? studentData["Average"] : relativeData[studentName]["Average"];
                            return <SimpleTooltip key={sessionValueIdx} style={getStylesForScore(data[sessionValueIdx])} className={styles.cell} text={roundToTwo(sessionValue) + "%"} tooltipText={"Average: " + roundToTwo(sessionValue) + "%"} />
                        })}
                    </div>
                )
            });
            tableFirstColumnJSX = <div className={styles.column}>
                <SimpleTooltip className={styles.cell} text={"-"} tooltipText={""} />
                {dataWithClassAverage[orderedStudentNames[0]]["Dates"].map((sessionValue, sessionValueIdx) => {
                    const sessionDate = formatDate(sessionValue);
                    return <SimpleTooltip className={styles.cell} text={sessionValueIdx + 1} tooltipText={sessionDate} key={sessionValueIdx} />
                })}
            </div>;
        }

        return (
            <div className={styles.container}>
                <div className={styles.tableButtonsContainer}>
                    <label className={styles.toggleLabel} htmlFor="">Table Mode{" "}<MoreInfoButton modalTitle="Table Mode" contentComponent={TableModeInfo}>
                        <div className={styles.moreInfoIconContainer}>
                            <div className={styles.moreInfoIcon}>?</div>
                        </div>
                    </MoreInfoButton>
                    </label>
                    <div className={styles.tableModeToggleContainer}>
                        <div onClick={() => this.setState({ tableMode: "Final Score" })} className={this.state.tableMode === "Final Score" ? styles.tableModeToggleSelected : styles.tableModeToggle}>Final Score</div>
                        <div onClick={() => this.setState({ tableMode: "All Sessions" })} className={this.state.tableMode === "All Sessions" ? styles.tableModeToggleSelected : styles.tableModeToggle}>All Sessions</div>
                    </div>
                    <label className={styles.toggleLabel} htmlFor="">Color Coding{" "}<MoreInfoButton modalTitle="Color Coding" contentComponent={TableColorCodingInfo}>
                        <div className={styles.moreInfoIconContainer}>
                            <div className={styles.moreInfoIcon}>?</div>
                        </div>
                    </MoreInfoButton>
                    </label>
                    <div className={styles.tableModeToggleContainer}>
                        <div onClick={() => this.setState({ colourCodingMode: "Absolute Score" })} className={this.state.colourCodingMode === "Absolute Score" ? styles.tableModeToggleSelected : styles.tableModeToggle}>Absolute</div>
                        <div onClick={() => this.setState({ colourCodingMode: "Relative Score" })} className={this.state.colourCodingMode === "Relative Score" ? styles.tableModeToggleSelected : styles.tableModeToggle}>Relative</div>
                    </div>
                </div>
                <div className={styles.colourTableContainer}>
                    <div className={styles.colourTable}>
                        <div className={styles.colourTableRowsContainer}>
                            <div className={styles.colourTableRow}>
                                <div className={styles.colourTableRowColour} style={{ backgroundColor: "#FF6F61" }}></div>
                                <div className={styles.colourTableRowText}>{this.state.colourCodingMode === "Absolute Score" ? "Beginner" : "Underachieving"}</div>
                            </div>
                            <div className={styles.colourTableRow}>
                                <div className={styles.colourTableRowColour} style={{ backgroundColor: "#FFC107" }}></div>
                                <div className={styles.colourTableRowText}>{this.state.colourCodingMode === "Absolute Score" ? "Intermediate" : "Intermediate"}</div>
                            </div>
                            <div className={styles.colourTableRow}>
                                <div className={styles.colourTableRowColour} style={{ backgroundColor: "#50C124" }}></div>
                                <div className={styles.colourTableRowText}>{this.state.colourCodingMode === "Absolute Score" ? "Advanced" : "Adept"}</div>
                            </div>
                            <div className={styles.colourTableRow}>
                                <div className={styles.colourTableRowColour} style={{ backgroundColor: "#009688" }}></div>
                                <div className={styles.colourTableRowText}>{this.state.colourCodingMode === "Absolute Score" ? "Expert" : "Champion"}</div>
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
    if (score < 0.75) return { backgroundColor: "#50C124" }; // Light Green
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

const generateRelativeData = (data) => {
    // assumes that the data are square
    let minMaxByCategory = {};
    // First pass: Determine min and max for each session in each category
    for (let student in data) {
        for (let category in data[student]) {
            if (category === "Dates") continue;
            minMaxByCategory[category] = minMaxByCategory[category] || [];
            data[student][category].forEach((score, index) => {
                if (!minMaxByCategory[category][index]) {
                    minMaxByCategory[category][index] = { min: score, max: score };
                } else {
                    minMaxByCategory[category][index].min = Math.min(minMaxByCategory[category][index].min, score);
                    minMaxByCategory[category][index].max = Math.max(minMaxByCategory[category][index].max, score);
                }
            });
        }
    }

    // Second pass: Rescale scores
    const rescaledData = {};
    for (let student in data) {
        for (let category in data[student]) {
            if (category === "Dates") continue;
            rescaledData[student] = rescaledData[student] || {};
            rescaledData[student][category] = data[student][category].map((score, index) => {
                let min = minMaxByCategory[category][index].min;
                let max = minMaxByCategory[category][index].max;

                if (max === min) {
                    return 1; // Avoid division by zero when all scores are the same
                }
                return (score - min) / (max - min);
            });
        }
    }
    return rescaledData;
}