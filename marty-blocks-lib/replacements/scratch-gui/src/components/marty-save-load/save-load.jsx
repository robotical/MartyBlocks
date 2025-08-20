/* eslint-disable no-warning-comments */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-literals */
/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import VM from "scratch-vm";
import errorBoundaryHOC from "../../lib/error-boundary-hoc.jsx";
import { activateTab, BLOCKS_TAB_INDEX } from "../../reducers/editor-tab";
import styles from "./save-load.css";
import { requestNewProject } from "../../reducers/project-state";
import LocalStorage from "./local-storage/local-storage.jsx";
import CloudStorage from "./cloud-storage/cloud-storage.jsx";
import PortableFileStorage from "./portable-file-storage/portable-file-storage.jsx";
import DemoProjects from "./demo-projects/demo-projects.jsx";
import { FormattedMessage, injectIntl} from 'react-intl';

class SaveLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTab: "local-storage" };
  }

  render() {
    const { currentTab } = this.state;

    let contentJSX;
    if (currentTab === "local-storage") {
      contentJSX = <LocalStorage {...this.props} />;
    } else if (currentTab === "cloud-storage") {
      contentJSX = <CloudStorage {...this.props} />;
    } else if (currentTab === "portable-file-storage") {
      contentJSX = <PortableFileStorage {...this.props} />;
    } else if (currentTab === "demo-projects") {
      contentJSX = <DemoProjects {...this.props} />;
    }

    return (
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <div
            className={
              this.state.currentTab === "local-storage"
                ? [styles.button, styles.buttonSelected].join(" ")
                : styles.button
            }
            onClick={() => this.setState({ currentTab: "local-storage" })}
          >
            <p className={styles.buttonTitle}>
              <FormattedMessage
                id="gui.saveLoad.localStorageTitle"
                description="Label for the local storage tab in the Save/Load menu"
                defaultMessage="In the App"
              />
            </p>
            <p className={styles.buttonSubtitle}>
              <FormattedMessage
                id="gui.saveLoad.localStorageSubtitle"
                description="Subtitle for the local storage tab in the Save/Load menu"
                defaultMessage="Local Storage"
              />
            </p>
          </div>
          <div
            className={
              this.state.currentTab === "cloud-storage"
                ? [styles.button, styles.buttonSelected].join(" ")
                : styles.button
            }
            onClick={() => this.setState({ currentTab: "cloud-storage" })}
          >
            <p className={styles.buttonTitle}>
              <FormattedMessage
                id="gui.saveLoad.cloudStorageTitle"
                description="Label for the cloud storage tab in the Save/Load menu"
                defaultMessage="In the Cloud"
              />
            </p>
            <p className={styles.buttonSubtitle}>
              <FormattedMessage
                id="gui.saveLoad.cloudStorageSubtitle"
                description="Subtitle for the cloud storage tab in the Save/Load menu"
                defaultMessage="Cloud Storage"
              />
            </p>
          </div>

          <div
            className={
              this.state.currentTab === "portable-file-storage"
                ? [styles.button, styles.buttonSelected].join(" ")
                : styles.button
            }
            onClick={() =>
              this.setState({ currentTab: "portable-file-storage" })
            }
          >
            <p className={styles.buttonTitle}>
              <FormattedMessage
                id="gui.saveLoad.portableFileStorageTitle"
                description="Label for the portable file storage tab in the Save/Load menu"
                defaultMessage="Portable"
              />
            </p>
            <p className={styles.buttonSubtitle}>
              <FormattedMessage
                id="gui.saveLoad.portableFileStorageSubtitle"
                description="Subtitle for the portable file storage tab in the Save/Load menu"
                defaultMessage="File Storage"
              />
            </p>
          </div>
          {/* <div
            className={
              this.state.currentTab === "demo-projects"
                ? [styles.button, styles.buttonSelected].join(" ")
                : styles.button
            }
            onClick={() => this.setState({ currentTab: "demo-projects" })}
          >
            <p className={styles.buttonTitle}>Demo Projects</p>
            <p className={styles.buttonSubtitle}>Load demo projects</p>
          </div> */}
        </div>
        <div className={styles.content}>{contentJSX}</div>
      </div>
    );
  }
}

SaveLoad.propTypes = {
  onActivateBlocksTab: PropTypes.func,
  saveProjectSb3: PropTypes.func,
  editingTarget: PropTypes.string,
  locale: PropTypes.string.isRequired,
  onProjectTelemetryEvent: PropTypes.func,
  projectTitle: PropTypes.string,
  vm: PropTypes.instanceOf(VM).isRequired,
  onConfirmNewProject: PropTypes.func,
};

const mapStateToProps = (state) => ({
  editingTarget: state.scratchGui.targets.editingTarget,
  locale: state.locales.locale,
  saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
});

const mapDispatchToProps = (dispatch) => ({
  onActivateBlocksTab: () => dispatch(activateTab(BLOCKS_TAB_INDEX)),
  onConfirmNewProject: () => dispatch(requestNewProject(false)),
});

export default errorBoundaryHOC("Save/Load")(
  injectIntl(connect(mapStateToProps, mapDispatchToProps)(SaveLoad))
);
