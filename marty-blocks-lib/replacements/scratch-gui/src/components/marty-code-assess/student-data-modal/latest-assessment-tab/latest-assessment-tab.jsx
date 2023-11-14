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
        // studentData can either be an array of student data or a single student data object
        let rawData = studentData;
        if (Array.isArray(rawData)) {
            rawData = rawData.map(studentData => studentData.scoresOverTime);
        } else {
            rawData = rawData?.scoresOverTime;
        }

        if (!rawData) {
            return <div>No student data yet!</div>;
        }

        const spiderChartData = codeAssess.dataTransformationUtils.transformDataForSpiderChart(rawData);

        return (
            <div className={styles.latestAssessmentContainer}>
                <AssessmentSpiderGraph data={spiderChartData} plotTitle="Latest Assessment" />
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