import React from "react";
import Modal from "../../../../containers/modal.jsx";
import styles from "./student-assessment.css";
import DetailsCard from "../../details-card/details-card.jsx";
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import ScoreGauges from "../score-gauges/score-gauges.jsx";

class StudentAssessment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalData: { content: null, title: "" },
            scores: null,
            totalScore: 0,
        };
        bindAll(this, [
            "closeModal",
            "openModal",
            "fetchStudentData"
        ]);
    }

    componentDidMount() {
        this.fetchStudentData();
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    openModal(modalData) {
        this.setState({ showModal: true, modalData: modalData });
    }

    async fetchStudentData() {
        const fetchedStudentData = await codeAssess.student.fetchStudentData(this.props.classId);
        const compositeScore = codeAssess.student.getCompositeScore(fetchedStudentData, false);
        
        const finalScores = {};
        const lastScore = fetchedStudentData.getLastScore();
        const preprocessor = new codeAssess.Preprocessor(lastScore || {});
        const transformedData = preprocessor.sortData().normaliseScores().data
        const lastScoreIdx = transformedData.algorithmsCompoScores?.scores.length - 1;
        finalScores["Algorithms"] = transformedData.algorithmsCompoScores?.scores[lastScoreIdx] || 0;
        finalScores["Analysis"] = transformedData.analysisCompoScores?.scores[lastScoreIdx] || 0;
        finalScores["Decomposition"] = transformedData.decompositionCompoScores?.scores[lastScoreIdx] || 0;
        finalScores["Generalisation and Abstraction"] = transformedData.generalisationAndAbstrCompoScores?.scores[lastScoreIdx] || 0;
        finalScores["Pattern Recognition and Data Representation"] = transformedData.patternRecAndDataRepCompoScores?.scores[lastScoreIdx] || 0;

        this.setState({ scores: finalScores, totalScore: compositeScore });
    }

    render() {
        if (!this.state.scores) return <div>No scores yet!</div>;
        return (
            <div className={styles.outerContainer}>
                {this.state.showModal && (
                    <Modal
                        id="assessment-modal"
                        className={styles.modalContent}
                        contentLabel={this.state.modalData.title}
                        onRequestClose={this.closeModal}
                        fullScreen={true}
                    >
                        <div className={styles.modalContainer}>{this.state.modalData.content}</div>
                    </Modal>
                )}
                <ScoreGauges scores={this.state.scores} />
                <DetailsCard totalScore={this.state.totalScore} scoresOrBadges="scores" />
            </div>
        );
    }
}

StudentAssessment.propTypes = {
    classId: PropTypes.string.isRequired,
};

export default StudentAssessment;
