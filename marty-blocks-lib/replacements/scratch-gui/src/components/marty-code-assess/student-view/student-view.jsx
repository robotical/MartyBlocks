import React from "react";
import Modal from "../../../containers/modal.jsx";
import ScoresCard from "../scores-card/scores-card.jsx";
import styles from "./student-view.css";
import DetailsCard from "../details-card/details-card.jsx";

class StudentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: codeAssess.assess(vm.runtime.targets),
            showModal: false,
            modalData: { content: null, title: "" },
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.totalScore = this.totalScore.bind(this);
    }
    
    closeModal() {
        this.setState({ showModal: false });
    }

    openModal(modalData) {
        this.setState({ showModal: true, modalData: modalData });
    }

    totalScore() {
        let total = 0;
        Object.keys(this.state.scores).forEach(categoryKey => {
            total += this.state.scores[categoryKey];
        })
        return total;
    }

    render() {
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


export default StudentView;