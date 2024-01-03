import React from "react";
import styles from "./student-badges.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import svgs from "./svgs.jsx";
import SVGWrapper from "./svg-wrapper.jsx";
import Spinner from '../../../spinner/spinner.jsx';
import spinnerStyles from '../../../spinner/spinner.css';

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.StudentDataModal.studentBadgesTab",
    }
});

const STAR_COLORS = {
    "bronze": "#cd7f32",
    "silver": "silver",
    "gold": "gold",
};

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
        this.fetchStudentData();
    }

    componentWillUnmount() {
    }

    async fetchStudentData() {
        this.setState({ isLoading: true });
        const fetchedStudentData = await codeAssess.student.fetchStudentData(this.props.classId);
        this.setState({ studentData: fetchedStudentData, isLoading: false });
    }

    render() {
        const { intl } = this.props;
        const studentData = this.state.studentData;
        if (!studentData) {
            return <div>No student data yet!</div>;
        }
        console.log("studentData.badges", studentData.badges)
        console.log("studentData.badgesToStars()", studentData.badgesToStars())

        const starScores = studentData.badgesToStars();
        return (
            <div className={styles.svgsContainer}>
                {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                    <>
                        <SVGWrapper svg={svgs.conditionals} colors={starScores.Conditionals[0]} offsets={starScores.Conditionals[1]} category="conditionals" />
                        <SVGWrapper svg={svgs.loops} colors={starScores.Loops[0]} offsets={starScores.Loops[1]} category="loops" />
                        <SVGWrapper svg={svgs.functions} colors={starScores.Functions[0]} offsets={starScores.Functions[1]} category="functions" />
                        <SVGWrapper svg={svgs.operators} colors={starScores.Operators[0]} offsets={starScores.Operators[1]} category="operators" />
                    </>
                )}
            </div>
        );
    }
}



StudentBadgesTab.propTypes = {
    intl: intlShape.isRequired,
    classId: PropTypes.string.isRequired,
};


export default injectIntl(StudentBadgesTab);