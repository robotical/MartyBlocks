import React from "react";
import styles from "./latest-assessment-tab.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import AssessmentSpiderGraph from "../../plots/assessment-spider-graph/assessment-spider-graph.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.StudentDataModal.latestAssessmentTab",
    }
});

class LatestAssessmentTab extends React.Component {
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

        const preprocessor = new codeAssess.Preprocessor(rawData || {});
        const transformedData =
            preprocessor
                .sortData()
                .calculateAverageGivenTimeWindow(10, 5, "minutes")
                .normaliseScores()
                .exportToSpiderGraphData([
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

        // const spiderChartData = codeAssess.dataTransformationUtils.transformDataForSpiderChart(rawData);

        return (
            <div className={styles.latestAssessmentContainer}>
                <AssessmentSpiderGraph data={transformedData} plotTitle="Latest Assessment" />
            </div>
        );
    }
}



LatestAssessmentTab.propTypes = {
    intl: intlShape.isRequired,
    studentData: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.object,
    ]).isRequired,
};


export default injectIntl(LatestAssessmentTab);