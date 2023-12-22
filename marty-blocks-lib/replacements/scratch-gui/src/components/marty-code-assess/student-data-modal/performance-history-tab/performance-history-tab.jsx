import React from "react";
import styles from "./performance-history-tab.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import AssessmentOverTimeLineGraph from "../../plots/assessment-over-time-line-graph/assessment-over-time-line-graph.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.StudentDataModal.performanceHistoryTab",
    }
});

class PerformanceHistoryTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        bindAll(this, [
        ]);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const { intl } = this.props;
        const studentData = this.props.studentData;
        if (!studentData) {
            return <div>No student data yet!</div>;
        }
        // studentData can either be an array of student data or a single student data object
        let rawData = studentData;
        if (Array.isArray(rawData)) {
            rawData = rawData.map(studentData => studentData?.scoresOverTime).filter(studentData => studentData);
        } else {
            rawData = rawData?.scoresOverTime;
        }

        if (!rawData) {
            return <div>No student data yet!</div>;
        }

        console.log("rawData", rawData)
        const linegraphData = new codeAssess.Preprocessor(rawData).sortData().normaliseScores()
            .calculateMovingMaxBasedOnDates(1, "days")
            .calculateLeakyIntegrator(.1, .5, 0.01, 0.1, 0.01, 1)
            .exportToLeakyIntegratorData([
                "Algorithms Composite Score",
                "Generalisation and Abstraction Composite Score",
                "Analysis Composite Score",
                "Decomposition Composite Score",
                "Pattern Recognition and Data Representation Composite Score",

                "Comments",
                "Conditionals",
                "Data Types",
                "Debugging",
                "Function Reuse",
                "Functions",
                "Functions with Arguments",
                "Loops",
                "Naming",
                "Operators",
                "Parallelism",
                "Sequencing",
                "Synchronization and Messages",
                "Variables Instead of Literals",
                "Variables and Data Structures"
            ]);

            console.log("linegraphData", linegraphData)

        const plots = [];
        for (let i = 0; i < linegraphData.length; i += 4) {
            plots.push(
                <AssessmentOverTimeLineGraph
                    key={i}
                    data={linegraphData.slice(i, i + 4)}
                    plotTitle={linegraphData[i].name}
                />
            );
        }

        return (
            <div className={styles.performanceHistoryContainer}>
                {plots}
            </div>
        );
    }
}



PerformanceHistoryTab.propTypes = {
    intl: intlShape.isRequired,
    studentData: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.object,
    ]).isRequired,
};


export default injectIntl(PerformanceHistoryTab);