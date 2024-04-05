import React from "react";
import styles from "./performance-history-tab.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import AssessmentOverTimeLineGraph from "../../plots/assessment-over-time-line-graph/assessment-over-time-line-graph.jsx";
import Spinner from '../../../spinner/spinner.jsx';
import spinnerStyles from '../../../spinner/spinner.css';
import { activateDeck } from "../../../../reducers/cards.js";
import { connect } from "react-redux";

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
            isLoading: true,
            linegraphData: null,
        };
        bindAll(this, [
        ]);
    }

    componentDidMount() {
        this.props.showTutorialCard("code-assess-teacher-students-tab-performance-history");

        this.setState({ isLoading: true });
        const studentData = this.props.studentData;
        const isTesting = !!codeAssess.isTestingWithMockData;
        if (studentData && studentData.scoresOverTime && Object.keys(studentData.scoresOverTime).length > 0) {
            setTimeout(() => { // it seems that having a timeout here is necessary to avoid the UI freezing --just 200ms is enough to give the UI a chance to render the spinner
                const linegraphData = new codeAssess.Preprocessor(studentData.scoresOverTime)
                    .sortData().normaliseScores()
                    // .calculateMovingMaxBasedOnDates(2, "hours")
                    .calculateMovingMaxBasedOnDates(isTesting ? .9 : 2, isTesting ? "minutes" : "hours") // this is for testing
                    .calculateLeakyIntegrator(.1, .5, 0.01, 0.1, 0.01, 1)
                    .exportToLeakyIntegratorData([
                        "Algorithms Composite Score",
                        "Generalisation and Abstraction Composite Score",
                        "Analysis Composite Score",
                        "Decomposition Composite Score",
                        "Pattern Recognition and Data Representation Composite Score",

                        // "Comments",
                        // "Conditionals",
                        // "Data Types",
                        // "Debugging",
                        // "Function Reuse",
                        // "Functions",
                        // "Functions with Arguments",
                        // "Loops",
                        // "Naming",
                        // "Operators",
                        // "Parallelism",
                        // "Sequencing",
                        // "Synchronization and Messages",
                        // "Variables Instead of Literals",
                        // "Variables and Data Structures"
                    ]);
                console.log("linegraphData", linegraphData);
                this.setState({ linegraphData, isLoading: false });
            }, 200);
        } else {
            this.setState({ isLoading: false });
        }
    }

    componentWillUnmount() {
    }

    render() {
        const { intl } = this.props;
        if (this.state.isLoading) {
            return <div>This may take a while, please wait... <Spinner level='warn' large className={spinnerStyles.primary} /></div>;
        }

        if (!this.state.linegraphData || this.state.linegraphData?.[0]?.x?.length < 5) {
            const dataLength = this.state.linegraphData?.[0]?.x?.length || 0;
            return <div>Not enough student data yet. There must be at least 5 sessions to show the history, but there {dataLength === 1 ? "is" : "are"} only {dataLength}.</div>;
        }

        const plots = [];
        for (let i = 0; i < this.state.linegraphData.length; i += 4) {
            plots.push(
                <AssessmentOverTimeLineGraph
                    key={i}
                    data={this.state.linegraphData.slice(i, i + 4)}
                    plotTitle={this.state.linegraphData[i].name}
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
    showTutorialCard: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
    showTutorialCard: (tutorialTitle) => {
        const hasThisTutorialBeenShown = localStorage.getItem("mb-tutorials-" + tutorialTitle);
        if (!hasThisTutorialBeenShown) {
            localStorage.setItem("mb-tutorials-" + tutorialTitle, true);
            dispatch(activateDeck(tutorialTitle));
        }
    }
});

export default injectIntl(connect(null, mapDispatchToProps)(PerformanceHistoryTab))