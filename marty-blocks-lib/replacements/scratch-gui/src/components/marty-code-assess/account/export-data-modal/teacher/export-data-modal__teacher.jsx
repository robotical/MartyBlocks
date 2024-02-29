import React from "react";
import styles from "./export-data-modal__teacher.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import Spinner from '../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../spinner/spinner.css';
import { rawStudentDataToAverages } from "../../../teacher-view/class-overview/class-overview.jsx";
import { getClassAverage, getLastScore } from "../../../teacher-view/class-summary-table/class-summary-table.jsx";
import { exportCSVData } from "../export-csv.js";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.ExportDataModalTeacher.",
    }
});

class ExportDataModalTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            selectedTab: "All Class Data", // All Class Data, Individual Student Data
            selectedStudent: null,
        };
        bindAll(this, [
            'onSelectTab',
            'onSelectStudent',
            'onExportFinalScore',
            'onExportAllSessions',
        ]);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onSelectTab(tab) {
        this.setState({ selectedTab: tab });
    }

    onSelectStudent(student) {
        this.setState({ selectedStudent: student });
    }

    onExportFinalScore(student) {
        this.setState({ isLoading: true });
        this.props.class.getStudentDataForAllStudents()
            .then(async (data) => {
                const averages = rawStudentDataToAverages(data, this.props.students);
                const dataWithClassAverage = getClassAverage(averages);
                const orderedStudentNames = Object.keys(dataWithClassAverage).sort((a, b) => {
                    if (a === "Class Average") return -1;
                    if (b === "Class Average") return 1;
                    return a.localeCompare(b);
                });
                console.log("orderedStudentNames", orderedStudentNames);
                console.log("Data", dataWithClassAverage);
                try {
                    const onlyFinalScores = {};
                    for (const student in dataWithClassAverage) {
                        if (onlyFinalScores[student] === undefined) {
                            onlyFinalScores[student] = {};
                        }
                        for (const categoroy in dataWithClassAverage[student]) {
                                onlyFinalScores[student][categoroy] = [getLastScore(dataWithClassAverage[student][categoroy])];
                        }
                    }
                    if (student === "all") {
                        exportCSVData(onlyFinalScores, "final-scores.csv");
                    } else {
                        const studentData = {[student]: onlyFinalScores[student]};
                        exportCSVData(studentData, `${student}-final-scores.csv`);
                    }
                } catch (e) {
                    console.error("Error exporting CSV data", e);
                }
            })
            .catch(e => {
                alert("Error exporting all sessions");
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    onExportAllSessions(student) {
        this.setState({ isLoading: true });
        this.props.class.getStudentDataForAllStudents()
            .then(async (data) => {
                const averages = rawStudentDataToAverages(data, this.props.students);
                const dataWithClassAverage = getClassAverage(averages);
                const orderedStudentNames = Object.keys(dataWithClassAverage).sort((a, b) => {
                    if (a === "Class Average") return -1;
                    if (b === "Class Average") return 1;
                    return a.localeCompare(b);
                });
                console.log("orderedStudentNames", orderedStudentNames);
                console.log("Data", dataWithClassAverage);
                try {
                    if (student === "all") {
                        exportCSVData(dataWithClassAverage, "all-sessions.csv");
                    } else {
                        const studentData = {[student]: dataWithClassAverage[student]};
                        exportCSVData(studentData, `${student}-all-sessions.csv`);
                    }
                } catch (e) {
                    console.error("Error exporting CSV data", e);
                }
            })
            .catch(e => {
                alert("Error exporting all sessions");
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    render() {
        const { intl } = this.props;
        const studentNames = this.props.students.map(student => student.name);
        const orderedStudentNames = studentNames.sort((a, b) => {
            if (a === "Class Average") return -1;
            if (b === "Class Average") return 1;
            return a.localeCompare(b);
        });

        return (
            <div className={styles.exportDataModal}>
                {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                    <>
                        <div className={styles.header}>
                            <div className={styles.tabsContainer}>
                                <div className={[styles.tab, this.state.selectedTab === "All Class Data" ? styles.selectedTab : ""].join(" ")} onClick={() => this.onSelectTab("All Class Data")}>All Class Data</div>
                                <div className={[styles.tab, this.state.selectedTab === "Individual Student Data" ? styles.selectedTab : ""].join(" ")} onClick={() => this.onSelectTab("Individual Student Data")}>Individual Student Data</div>
                            </div>
                        </div>
                        <div className={styles.content}>
                            {this.state.selectedTab === "All Class Data" ? (
                                <div className={styles.exportDataButtonsContainer}>
                                    <div className={styles.exportDataButton} onClick={() => this.onExportFinalScore("all")}>Final Score</div>
                                    <div className={styles.exportDataButton} onClick={() => this.onExportAllSessions("all")}>All Sessions</div>
                                </div>
                            ) : (
                                <div className={styles.exportStudentDataContainer}>
                                    <div className={styles.studentSelectorContainer}>
                                        {orderedStudentNames.map((student, studentIdx) => {
                                            return <div key={student + studentIdx} className={[styles.studentItem, this.state.selectedStudent === student ? styles.selectedStudent : ""].join(" ")} onClick={() => this.onSelectStudent(student)}>{student}</div>
                                        })}
                                    </div>
                                    {this.state.selectedStudent && <div className={styles.exportDataButtonsContainer}>
                                        <div className={styles.exportDataButton} onClick={() => this.onExportFinalScore(this.state.selectedStudent)}>Final Score</div>
                                        <div className={styles.exportDataButton} onClick={() => this.onExportAllSessions(this.state.selectedStudent)}>All Sessions</div>
                                    </div>}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        );
    }
}



ExportDataModalTeacher.propTypes = {
    intl: intlShape.isRequired,
    onClose: PropTypes.func.isRequired,
    class: PropTypes.object.isRequired,
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default injectIntl(ExportDataModalTeacher);


const roundToTwo = (num) => {
    return Math.round(num * 100);
}