import React from "react";
import styles from "./student-badges.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import svgs from "./svgs.jsx";
import SVGWrapper from "./svg-wrapper.jsx";
import Spinner from '../../spinner/spinner.jsx';
import spinnerStyles from '../../spinner/spinner.css';
import { activateDeck } from "../../../reducers/cards.js";
import { connect } from "react-redux";
import Modal from "../../../containers/modal.jsx";
import BadgesExpandedProgression from "./expanded-progression/expanded-progression.jsx";

// import DetailsCard from "../details-card/details-card.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.StudentDataModal.studentBadgesTab",
    }
});

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();
const StudentBadgesToStars = window.codeAssess.codeAssessLib.StudentBadgesToStars;

const initialBadges = {
    "Conditionals": [["white", "white", "white"], [window.c1 || 0, window.c2 || 0, window.c3 || 0]],
    "Loops": [["white", "white", "white"], [window.l1 || 0, window.l2 || 0, window.l3 || 0]],
    "Functions": [["white", "white", "white"], [window.f1 || 0, window.f2 || 0, window.f3 || 0]],
    "Operators": [["white", "white", "white"], [window.o1 || 0, window.o2 || 0, window.o3 || 0]],
    "Data Types": [["white", "white", "white"], [window.d1 || 0, window.d2 || 0, window.d3 || 0]],
    "Parallelism": [["white", "white"], [window.p1 || 0, window.p2 || 0]],
    "Variables and Lists": [["white", "white", "white"], [window.v1 || 0, window.v2 || 0, window.v3 || 0]],
};

class StudentBadgesTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            studentBadgesData: null,
            modalVisible: false,
            modalBadgeName: null
        };
        bindAll(this, [
            "onCloseModal",
            "showModal",
            "fetchStudentBadges"
        ]);
    }

    componentDidMount() {
        this.fetchStudentBadges();
    }

    componentWillUnmount() {
    }

    async fetchStudentBadges() {
        this.setState({ isLoading: true });
        const fetchedStudentBadges = await codeAssessClientFacade.fetchStudentBadges(this.props.studentId);
        this.setState({ studentBadgesData: fetchedStudentBadges, isLoading: false });
    }

    onCloseModal() {
        this.setState({ modalVisible: false, modalBadgeName: null });
    }

    showModal(modalBadgeName) {
        this.setState({ modalVisible: true, modalBadgeName });
    }

    render() {
        const { intl, studentName } = this.props;
        let studentBadgesData = this.state.studentBadgesData;
        if (!studentBadgesData || !studentBadgesData.scores) {
            studentBadgesData = { scores: initialBadges };
        }

        console.log("studentBadgesData: ", studentBadgesData)
        const starScores = StudentBadgesToStars.toStars(studentBadgesData.scores);
        console.log("starScores: ", starScores);
        return (
            <>
                {
                    this.state.modalVisible &&
                    <Modal
                        onRequestClose={this.onCloseModal}
                        fullScreen={false}
                        className={styles.modal}
                        id="studentBadgesModal"
                        contentLabel={`${studentName} - ${this.state.modalBadgeName} Badge Progression`}
                    >
                        <div className={styles.modalContent}>
                            <BadgesExpandedProgression
                                badgeName={this.state.modalBadgeName}
                                badgeData={starScores[this.state.modalBadgeName]}
                            />
                        </div>
                    </Modal>
                }
                <div className={styles.outerContainer}>

                    <div className={styles.svgsContainer}>
                        {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                            <>
                                <SVGWrapper onClick={() => this.showModal("Conditionals")} svg={svgs.Conditionals} colors={starScores.Conditionals[0]} offsets={starScores.Conditionals[1]} category="conditionals" />
                                <SVGWrapper onClick={() => this.showModal("Loops")} svg={svgs.Loops} colors={starScores.Loops[0]} offsets={starScores.Loops[1]} category="loops" />
                                <SVGWrapper onClick={() => this.showModal("Functions")} svg={svgs.Functions} colors={starScores.Functions[0]} offsets={starScores.Functions[1]} category="functions" />
                                <SVGWrapper onClick={() => this.showModal("Operators")} svg={svgs.Operators} colors={starScores.Operators[0]} offsets={starScores.Operators[1]} category="operators" />

                                <SVGWrapper onClick={() => this.showModal("Data Types")} svg={svgs["Data Types"]} colors={starScores["Data Types"][0]} offsets={starScores["Data Types"][1]} category="dataTypes" />
                                <SVGWrapper onClick={() => this.showModal("Parallelism")} svg={svgs.Parallelism} colors={starScores["Parallelism"][0]} offsets={starScores["Parallelism"][1]} category="parallelism" />
                                <SVGWrapper onClick={() => this.showModal("Variables and Lists")} svg={svgs["Variables and Lists"]} colors={starScores["Variables and Lists"][0]} offsets={starScores["Variables and Lists"][1]} category="variablesAndLists" />
                            </>
                        )}
                    </div>
                    {/* <DetailsCard scoresOrBadges="badges" /> */}
                </div>
            </>
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
        const hasThisTutorialBeenShown = localStorage.getItem("mb-tutorials-" + tutorialTitle);
        if (!hasThisTutorialBeenShown) {
            localStorage.setItem("mb-tutorials-" + tutorialTitle, true);
            dispatch(activateDeck(tutorialTitle));
        }
    }
});

export default injectIntl(connect(null, mapDispatchToProps)(StudentBadgesTab))