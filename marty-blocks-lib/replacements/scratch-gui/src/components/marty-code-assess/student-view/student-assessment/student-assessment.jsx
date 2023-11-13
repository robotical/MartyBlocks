import React from "react";
import Modal from "../../../../containers/modal.jsx";
import ScoresCard from "../../scores-card/scores-card.jsx";
import styles from "./student-assessment.css";
import DetailsCard from "../../details-card/details-card.jsx";
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

class StudentAssessment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalData: { content: null, title: "" },
            scores: null,
        };
        bindAll(this, [
            "closeModal",
            "openModal",
            "totalScore",
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

    totalScore() {
        if (!this.state.scores) return 0;
        let total = 0;
        Object.keys(this.state.scores).forEach(categoryKey => {
            total += this.state.scores[categoryKey];
        })
        return total;
    }

    async fetchStudentData() {
        const fetchedStudentData = await codeAssess.student.fetchStudentData(this.props.classId);
        const studentDataProcessed = codeAssess.dataTransformationUtils.getLatestScores(fetchedStudentData?.scoresOverTime);
        console.log("studentDataProcessed", studentDataProcessed);
        this.setState({ scores: studentDataProcessed });
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
                <ScoresCard
                    onCategoryClick={this.openModal}
                    dataRepresentation={this.state.scores.DataRepresentation}
                    flowControl={this.state.scores.FlowControl}
                    interactivity={this.state.scores.Interactivity}
                    logic={this.state.scores.Logic}
                    abstraction={this.state.scores.Abstraction}
                    synchronisation={this.state.scores.Synchronisation}
                    parallelism={this.state.scores.Parallelism}
                />
                <DetailsCard totalScore={this.totalScore()} />
            </div>
        );
    }
}

StudentAssessment.propTypes = {
    classId: PropTypes.string.isRequired,
};

export default StudentAssessment;
