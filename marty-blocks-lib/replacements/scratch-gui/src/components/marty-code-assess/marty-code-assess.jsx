import React from "react";
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import VM from "scratch-vm";
import styles from "./marty-code-assess.css";
import StudentView from "./student-view/student-view.jsx";
import UserLogin from "./user-login/user-login.jsx";
import TeacherView from "./teacher-view/teacher-view.jsx";
import bindAll from 'lodash.bindall';
import AssetPanel from "../asset-panel/asset-panel.jsx";
import helpIcon from "../../lib/assets/icon--tutorials.svg";
import classroomIcon from "../../lib/assets/icon--classroom.svg";
import Spinner from '../spinner/spinner.jsx';
import spinnerStyles from '../spinner/spinner.css';
import { connect } from "react-redux";
import { activateDeck } from "../../reducers/cards.js";

const STUDENT_OR_TEACHER_SUBSCRIPTION = "studentOrTeacherChanged";
const IS_USER_LOGGED_IN_SUBSCRIPTION = "isUserLoggedInChanged";


const messages = defineMessages({
  tutorials: {
    defaultMessage: "Tutorials",
    description: "Button to open the tutorials page",
    id: "gui.martyCodeAssess.teacherView.tutorials",
  }
});

class MartyCodeAssess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      selectedClassIdx: 0,
      isLoading: false,
    };
    bindAll(this, [
      'handleClassChange',
      'setUserRole'
    ]);
  }

  componentDidMount() {
    codeAssess.subscribe(STUDENT_OR_TEACHER_SUBSCRIPTION, codeAssess.TypesOfPublishedEvents.STUDENT_OR_TEACHER_CHANGED, this.updateState.bind(this));
    codeAssess.subscribe(IS_USER_LOGGED_IN_SUBSCRIPTION, codeAssess.TypesOfPublishedEvents.IS_USER_LOGGED_IN_CHANGED, this.onUserLoggedIn.bind(this));
    // if user is already logged in, fetch the classes
    if (codeAssess.isUserLoggedIn) {
      this.setState({ isLoading: true });
      codeAssess.userProfile.getListOfClassess()
        .then((classes) => {
          this.setState({ classes });
        })
        .catch(e => console.error(e))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  componentWillUnmount() {
    codeAssess.unsubscribe(STUDENT_OR_TEACHER_SUBSCRIPTION);
    codeAssess.unsubscribe(IS_USER_LOGGED_IN_SUBSCRIPTION);
  }

  updateState() {
    this.setState({});
  }

  async componentDidUpdate(prevProps, prevState) {
    // when the selectedClassIdx or the classes change
    if ((prevState.selectedClassIdx !== this.state.selectedClassIdx) || (prevState.classes !== this.state.classes)) {
      this.setState({ isLoading: true });
      const selectedClass = this.state.classes[this.state.selectedClassIdx];
      if (selectedClass) {
        await codeAssess.createClassIfDoesntExist(selectedClass.id, selectedClass.name, codeAssess.userProfile.id);
      }
      this.setState({ isLoading: false });
    }
  }

  async onUserLoggedIn() {
    mv2Interface.setCodeAssesSessionActive();
    this.setState({ isLoading: true });
    const classes = await codeAssess.userProfile.getListOfClassess();
    if (classes.length > 0) {
      await this.setUserRole(classes[0]);
    }
    this.setState({ classes, isLoading: false });
  }

  async setUserRole(selectedClass) {
    const teacherOrStudent = await codeAssess.userProfile.determineIfStudentOrTeacherInClass(selectedClass.id);
    if (teacherOrStudent) {
      await codeAssess.setStudentOrTeacher(teacherOrStudent);
    }
  }

  handleClassChange(classIdx) {
    this.setState({ selectedClassIdx: classIdx });
  }

  render() {
    const { intl } = this.props;
    let studentOrTeacherJSX = null;
    if (codeAssess.studentOrTeacher === "teacher") {
      studentOrTeacherJSX = <TeacherView selectedClass={this.state.classes[this.state.selectedClassIdx]} />;
    } else if (codeAssess.studentOrTeacher === "student") {
      studentOrTeacherJSX = <StudentView selectedClass={this.state.classes[this.state.selectedClassIdx]} />;
    }

    let userLoggedInJSX = null;
    if (codeAssess.isUserLoggedIn) {
      if (this.state.classes.length === 0) {
        userLoggedInJSX = <div>There are no classes to display</div>;
      } else {
        userLoggedInJSX = studentOrTeacherJSX;
      }
    } else {
      userLoggedInJSX = <UserLogin />;
    }

    const classesAssets = this.state.classes?.map((cls) => {
      return ({
        url: classroomIcon,
        name: cls.name,
        details: cls.section || "",
      })
    }) || [];

    return (
      <AssetPanel
        buttons={[
          {
            title: intl.formatMessage(messages.tutorials),
            img: helpIcon,
            onClick: () => this.props.showTutorialCard(),
          },
        ]}
        items={classesAssets}
        selectedItemIndex={this.state.selectedClassIdx}
        onItemClick={this.handleClassChange}
        onDrop={() => { }}
        externalStylesClass={styles.assetPanel}
      >
        <div className={styles.outerContainer}>
          {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : userLoggedInJSX}
        </div>
      </AssetPanel >
    );
  }
}

MartyCodeAssess.propTypes = {
  vm: PropTypes.instanceOf(VM).isRequired,
  intl: intlShape.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  showTutorialCard: () => {
      dispatch(activateDeck("code-assess-login"));
  }
});


export default injectIntl(connect(null, mapDispatchToProps)(MartyCodeAssess))
