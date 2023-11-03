import React from "react";
import styles from "./student-view.css";
import bindAll from 'lodash.bindall';

class StudentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: null,
            studentClassess: [],
            selectedClass: null,
            selectedClassStudents: [],
            selectedClassCourseWorks: [],
            selectedCourseWork: null,
        };
        bindAll(this, [
            'handleClassChange',
            'onAssessMe'
        ]);
    }

    componentDidMount() {
        // get the student object
        this.setState({ student: codeAssess.student });
    }

    // when the component state is changed
    componentDidUpdate(prevProps, prevState) {
        // when the selectedClass changes
        if (prevState.selectedClass !== this.state.selectedClass) {
            this.getStudentsOfClass();
            this.getCourseworskOfClass();
        }
        // when the student changes
        if (prevState.student !== this.state.student) {
            this.state.student.getListOfClassess().then((classess) => {
                this.setState({ studentClassess: classess });
            });
        }
        // when the selectedCourseWork changes
        if (prevState.selectedCourseWork !== this.state.selectedCourseWork) {
            console.log("selectedCourseWork changed", this.state.selectedCourseWork);
        }
    }

    handleClassChange(event) {
        console.log("handleClassChange")
        this.setState({ selectedClass: this.state.studentClassess[event.target.value] });
    }

    // when the studentClassess state is updated, this function is called
    async getStudentsOfClass() {
        const students = await this.state.selectedClass.getListOfStudents();
        this.setState({ selectedClassStudents: students });
    }

    // when the studentClassess state is updated, this function is called
    async getCourseworskOfClass() {
        const courseWork = await this.state.selectedClass.getListOfCourseWorks();
        this.setState({ selectedClassCourseWorks: courseWork });
    }

    async onAssessMe() {
        const assessment = codeAssess.assess(vm.runtime.targets)
        console.log("assessment", assessment);
        this.state.student.addAttachmentInCourseWork(this.state.selectedClass.id, this.state.selectedCourseWork.id, JSON.stringify(assessment).repeat(1000));
    }

    render() {
        return (
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <div className={styles.title}>Student View</div>
                    <div className={styles.studentContainer}>
                        <div className={styles.studentTitle}>Student</div>
                        <div className={styles.studentName}>{this.state.student ? this.state.student.name : ""}</div>
                    </div>
                    <div className={styles.classessContainer}>
                        <div className={styles.classessTitle}>Classess</div>
                        <div className={styles.dropdownContainer}>
                            <select className={styles.classDropdown}
                                onChange={this.handleClassChange}
                                value={this.state.selectedClass ? this.state.selectedClass.id : ""}>
                                <option value="" disabled>Select a class</option>
                                {this.state.studentClassess.map((cls, classIdx) => (
                                    <option value={classIdx} key={cls.id}>
                                        {cls.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.classStudents}>
                            {this.state.selectedClassStudents
                                .map((student) => (
                                    <div className={styles.classStudent} key={student.id}>
                                        {student.name}
                                    </div>
                                ))}
                        </div>
                        <div className={styles.classCourseWork}>
                            {this.state.selectedClassCourseWorks
                                .map((courseWork) => (
                                    <div className={styles.classCourseWorkItem} key={courseWork.id} onClick={() => this.setState({ selectedCourseWork: courseWork })}>
                                        {courseWork.title}
                                        <p>{courseWork.description}</p>
                                    </div>
                                ))}
                            {this.state.selectedCourseWork && <button onClick={this.onAssessMe}>Assess me</button>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default StudentView;

// import React from "react";
// import Modal from "../../../containers/modal.jsx";
// import ScoresCard from "../scores-card/scores-card.jsx";
// import styles from "./student-view.css";
// import DetailsCard from "../details-card/details-card.jsx";

// class StudentView extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             scores: codeAssess.assess(vm.runtime.targets),
//             showModal: false,
//             modalData: { content: null, title: "" },
//         };
//         this.closeModal = this.closeModal.bind(this);
//         this.openModal = this.openModal.bind(this);
//         this.totalScore = this.totalScore.bind(this);
//     }
    
//     closeModal() {
//         this.setState({ showModal: false });
//     }

//     openModal(modalData) {
//         this.setState({ showModal: true, modalData: modalData });
//     }

//     totalScore() {
//         let total = 0;
//         Object.keys(this.state.scores).forEach(categoryKey => {
//             total += this.state.scores[categoryKey];
//         })
//         return total;
//     }

//     render() {
//         return (
//             <div className={styles.outerContainer}>
//                 {this.state.showModal && (
//                     <Modal
//                         id="assessment-modal"
//                         className={styles.modalContent}
//                         contentLabel={this.state.modalData.title}
//                         onRequestClose={this.closeModal}
//                         fullScreen={true}
//                     >
//                         <div className={styles.modalContainer}>{this.state.modalData.content}</div>
//                     </Modal>
//                 )}
//                 <ScoresCard
//                     onCategoryClick={this.openModal}
//                     dataRepresentation={this.state.scores.DataRepresentation}
//                     flowControl={this.state.scores.FlowControl}
//                     interactivity={this.state.scores.Interactivity}
//                     logic={this.state.scores.Logic}
//                     abstraction={this.state.scores.Abstraction}
//                     synchronisation={this.state.scores.Synchronisation}
//                     parallelism={this.state.scores.Parallelism}
//                 />
//                 <DetailsCard totalScore={this.totalScore()} />
//             </div>
//         );
//     }
// }


// export default StudentView;