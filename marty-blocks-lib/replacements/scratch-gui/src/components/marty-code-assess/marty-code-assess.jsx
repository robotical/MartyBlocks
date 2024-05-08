import React from "react";
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import VM from "scratch-vm";
import styles from "./marty-code-assess.css";
import bindAll from 'lodash.bindall';
import AssetPanel from "../asset-panel/asset-panel.jsx";
import helpIcon from "../../lib/assets/icon--tutorials.svg";
import classroomIcon from "../../lib/assets/icon--classroom.svg";
import Spinner from '../spinner/spinner.jsx';
import spinnerStyles from '../spinner/spinner.css';
import { connect } from "react-redux";
import { activateDeck } from "../../reducers/cards.js";
import { openTipsLibrary } from '../../reducers/modals';
import UserLogin from "./user-login/user-login.jsx";
import TeacherView from "./views/teacher-view/teacher-view.jsx";
import Welcome from "./welcome/welcome.jsx";
import StudentView from "./views/student-view/student-view.jsx";

const StudentOrTeacherEnum = window.codeAssess.codeAssessLib.StudentOrTeacherEnum;
const PublishedEventsEnum = window.codeAssess.codeAssessLib.PublishedEventsEnum;

const CLASS_SELECTED_SUBSCRIPTION_2 = "CLASS_SELECTED_SUBSCRIPTION_2";

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
      isLoading: false,
      provider: null,
    };
    bindAll(this, [
    ]);
  }

  componentDidMount() {
    this.props.codeAssessClientFacade.subscribe(CLASS_SELECTED_SUBSCRIPTION_2, PublishedEventsEnum.CLASS_SELECTED, () => this.setState({ isLoading: false }));

  }

  componentWillUnmount() {
    this.props.codeAssessClientFacade.unsubscribe(CLASS_SELECTED_SUBSCRIPTION_2);

  }

  handleClassSelect = (index, classesAssets) => {
    const classId = classesAssets[index].id;
    this.props.onClassSelect(classId, index);
    this.setState({ isLoading: true });
  }

  render() {
    const {
      intl,
      codeAssessClientFacade,
      userProfile,
      classes,
      selectedClassroom,
      studentOrTeacher,
      selectedClassroomIdx
    } = this.props;

    const jsx = jsxDecider(
      userProfile,
      classes,
      selectedClassroom,
      studentOrTeacher,
      this.state.provider,
      (provider) => this.setState({ provider }),
    );

    const classesAssets = classes?.map((cls) => {
      return ({
        url: classroomIcon,
        name: cls.title,
        details: cls.section || "",
        id: cls.id,
      })
    }) || [];

    return (
      <AssetPanel
        buttons={[
          {
            title: intl.formatMessage(messages.tutorials),
            img: helpIcon,
            onClick: () => this.props.openTipsLibrary(),
          },
        ]}
        items={classesAssets}
        selectedItemIndex={selectedClassroomIdx}
        onItemClick={(index) => this.handleClassSelect(index, classesAssets)}
        onDrop={() => { }}
        externalStylesClass={styles.assetPanel}
      >
        <div className={styles.outerContainer}>
          {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : jsx}
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

  openTipsLibrary: () => {
    dispatch(openTipsLibrary());
  }
});

export default injectIntl(connect(null, mapDispatchToProps)(MartyCodeAssess));

function jsxDecider(
  userProfile,
  classes,
  selectedClassroom,
  studentOrTeacher,
  provider,
  setProvider,
) {
  const isUserLoggedIn = !!userProfile;

  if (!isUserLoggedIn) {
    return <UserLogin setProvider={setProvider} />;
  }

  const areThereClasses = classes && classes.length > 0;
  const isThereAClassSelected = !!selectedClassroom;

  if (!areThereClasses || !isThereAClassSelected) {
    return <Welcome
      areThereAnyClasses={areThereClasses}
      isThereAClassSelected={isThereAClassSelected}
      provider={provider}
    />
  }

  if (studentOrTeacher === StudentOrTeacherEnum.STUDENT) {
    return <StudentView selectedClassroom={selectedClassroom} student={userProfile} />;
  }
  if (studentOrTeacher === StudentOrTeacherEnum.TEACHER) {
    return <TeacherView selectedClassroom={selectedClassroom} />;
  }

  return <div>Default View</div>;
}
