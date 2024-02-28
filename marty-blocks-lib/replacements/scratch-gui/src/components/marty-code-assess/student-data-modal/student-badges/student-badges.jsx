import React from "react";
import styles from "./student-badges.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import svgs from "./svgs.jsx";
import SVGWrapper from "./svg-wrapper.jsx";
import Spinner from '../../../spinner/spinner.jsx';
import spinnerStyles from '../../../spinner/spinner.css';
import { activateDeck } from "../../../../reducers/cards.js";
import { connect } from "react-redux";
import DetailsCard from "../../details-card/details-card.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.StudentDataModal.studentBadgesTab",
    }
});

class StudentBadgesTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
        bindAll(this, [
        ]);
    }

    componentDidMount() {
        codeAssess.studentOrTeacher === "teacher" && this.props.showTutorialCard("code-assess-teacher-students-tab-badges");
        this.fetchStudentData();
    }

    componentWillUnmount() {
    }

    async fetchStudentData() {
        this.setState({ isLoading: true });
        const student = codeAssess.student || this.props.student;
        const fetchedStudentData = await student.fetchStudentData(this.props.classId);
        this.setState({ studentData: fetchedStudentData, isLoading: false });
    }

    render() {
        const { intl } = this.props;
        const studentData = this.state.studentData;
        if (!studentData) {
            return <div>No student data yet!</div>;
        }

        const starScores = studentData.badgesToStars();
        return (
            <div className={styles.outerContainer}>

                <div className={styles.svgsContainer}>
                    {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                        <>
                            <SVGWrapper svg={svgs.Conditionals} colors={starScores.Conditionals[0]} offsets={starScores.Conditionals[1]} category="conditionals" />
                            <SVGWrapper svg={svgs.Loops} colors={starScores.Loops[0]} offsets={starScores.Loops[1]} category="loops" />
                            <SVGWrapper svg={svgs.Functions} colors={starScores.Functions[0]} offsets={starScores.Functions[1]} category="functions" />
                            <SVGWrapper svg={svgs.Operators} colors={starScores.Operators[0]} offsets={starScores.Operators[1]} category="operators" />

                            <SVGWrapper svg={svgs["Data Types"]} colors={starScores["Data Types"][0]} offsets={starScores["Data Types"][1]} category="dataTypes" />
                            <SVGWrapper svg={svgs.Parallelism} colors={starScores["Parallelism"][0]} offsets={starScores["Parallelism"][1]} category="parallelism" />
                            <SVGWrapper svg={svgs["Variables and Lists"]} colors={starScores["Variables and Lists"][0]} offsets={starScores["Variables and Lists"][1]} category="variablesAndLists" />
                        </>
                    )}
                </div>
                <DetailsCard scoresOrBadges="badges" />
            </div>
        );
    }
}



StudentBadgesTab.propTypes = {
    intl: intlShape.isRequired,
    classId: PropTypes.string.isRequired,
    student: PropTypes.object,
    showTutorialCard: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
    showTutorialCard: (tutorialTitle) => {
        dispatch(activateDeck(tutorialTitle));
    }
});

export default injectIntl(connect(null, mapDispatchToProps)(StudentBadgesTab))