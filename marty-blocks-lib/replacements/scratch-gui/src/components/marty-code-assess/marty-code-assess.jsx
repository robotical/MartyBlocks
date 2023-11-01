import React from "react";
import PropTypes from "prop-types";
import VM from "scratch-vm";
import styles from "./marty-code-assess.css";
import StudentView from "./student-view/student-view.jsx";
import UserLogin from "./user-login/user-login.jsx";
import TeacherView from "./teacher-view/teacher-view.jsx";

const STUDENT_OR_TEACHER_SUBSCRIPTION = "studentOrTeacherChanged";
const IS_USER_LOGGED_IN_SUBSCRIPTION = "isUserLoggedInChanged";

class MartyCodeAssess extends React.Component {
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

  componentDidMount() {
    codeAssess.subscribe(STUDENT_OR_TEACHER_SUBSCRIPTION, codeAssess.TypesOfPublishedEvents.STUDENT_OR_TEACHER_CHANGED, this.updateState.bind(this));
    codeAssess.subscribe(IS_USER_LOGGED_IN_SUBSCRIPTION, codeAssess.TypesOfPublishedEvents.IS_USER_LOGGED_IN_CHANGED, this.updateState.bind(this));
  }

  componentWillUnmount() {
    codeAssess.unsubscribe(STUDENT_OR_TEACHER_SUBSCRIPTION, codeAssess.TypesOfPublishedEvents.STUDENT_OR_TEACHER_CHANGED, this.updateState.bind(this));
    codeAssess.unsubscribe(IS_USER_LOGGED_IN_SUBSCRIPTION, codeAssess.TypesOfPublishedEvents.IS_USER_LOGGED_IN_CHANGED, this.updateState.bind(this));
  }

  updateState() {
    this.setState({});
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
    let studentOrTeacherJSX = null;
    if (codeAssess.studentOrTeacher === "teacher") {
      studentOrTeacherJSX = <TeacherView />;
    } else if (codeAssess.studentOrTeacher === "student") {
      studentOrTeacherJSX = <StudentView />;
    } else {
      studentOrTeacherJSX = <div>
        <button onClick={() => codeAssess.setStudentOrTeacher("teacher")}>Teacher</button>
        <button onClick={() => codeAssess.setStudentOrTeacher("student")}>Student</button>
      </div>;
    }

    let userLoggedInJSX = null;
    if (codeAssess.isUserLoggedIn) {
      userLoggedInJSX = studentOrTeacherJSX;
    } else {
      userLoggedInJSX = <UserLogin />;
    }

    return (
      <div className={styles.outerContainer}>
        {userLoggedInJSX}
      </div>
    );
  }
}

MartyCodeAssess.propTypes = {
  vm: PropTypes.instanceOf(VM).isRequired,
};


export default MartyCodeAssess;