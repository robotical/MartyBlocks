import React from "react";
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import VM from "scratch-vm";
import styles from "./marty-code-assess.css";
import StudentView from "./student-view/student-view.jsx";
import UserLogin from "./user-login/user-login.jsx";
import TeacherView from "./teacher-view/teacher-view.jsx";
import studentIcon from "./icon--student.svg";
import teacherIcon from "./icon--teacher.svg";

const STUDENT_OR_TEACHER_SUBSCRIPTION = "studentOrTeacherChanged";
const IS_USER_LOGGED_IN_SUBSCRIPTION = "isUserLoggedInChanged";


const messages = defineMessages({
  student: {
    defaultMessage: "Student",
    description: "Button to select student view",
    id: "gui.martyCodeAssess.studentOrTeacherButtons.student",
  },
  teacher: {
    defaultMessage: "Teacher",
    description: "Button to select teacher view",
    id: "gui.martyCodeAssess.studentOrTeacherButtons.teacher",
  },
});



class MartyCodeAssess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // scores: codeAssess.assess(vm.runtime.targets),
      // showModal: false,
      // modalData: { content: null, title: "" },
    };
    // this.totalScore = this.totalScore.bind(this);
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

  // totalScore() {
  //   let total = 0;
  //   Object.keys(this.state.scores).forEach(categoryKey => {
  //     total += this.state.scores[categoryKey];
  //   })
  //   return total;
  // }

  render() {
    const { intl } = this.props;
    let studentOrTeacherJSX = null;
    if (codeAssess.studentOrTeacher === "teacher") {
      studentOrTeacherJSX = <TeacherView />;
    } else if (codeAssess.studentOrTeacher === "student") {
      studentOrTeacherJSX = <StudentView />;
    } else {
      studentOrTeacherJSX = <div className={styles.studentOrTeacherButtonsContainer}>
        {/* <button onClick={() => codeAssess.setStudentOrTeacher("teacher")}>{intl.formatMessage(messages.teacher)}</button>
        <button onClick={() => codeAssess.setStudentOrTeacher("student")}>{intl.formatMessage(messages.student)}</button> */}
        <div className={styles.teacher_icon_container} onClick={() => codeAssess.setStudentOrTeacher("teacher")}><img src={teacherIcon} /><p>{intl.formatMessage(messages.teacher)}</p></div>
        <div className={styles.student_icon_container} onClick={() => codeAssess.setStudentOrTeacher("student")}><img src={studentIcon} /><p>{intl.formatMessage(messages.student)}</p></div>
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
  intl: intlShape.isRequired,
};


export default injectIntl(MartyCodeAssess);