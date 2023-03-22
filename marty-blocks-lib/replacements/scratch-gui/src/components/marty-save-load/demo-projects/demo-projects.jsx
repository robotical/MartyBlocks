/* eslint-disable no-warning-comments */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-literals */
/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import VM from "scratch-vm";
import errorBoundaryHOC from "../../../lib/error-boundary-hoc.jsx";
import { activateTab, BLOCKS_TAB_INDEX } from "../../../reducers/editor-tab";
import Button from "../../../components/button/button.jsx";
import styles from "./demo-projects.css";
import { requestNewProject } from "../../../reducers/project-state";

class SaveLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fileNames: [] };
    this.loadFile = this.loadFile.bind(this);
    this.getDemoNames();
  }

  async getDemoNames() {
    // get demo file names from cloud
    const demoFileNames = await mv2Interface.loadCloudDemoNames();
    this.setState({ fileNames: demoFileNames });
  }

  async loadFile(fileName) {
    const { vm } = this.props;

    if (!vm.editingTarget) {
      return null;
    }
    try {
      const base64Project = await mv2Interface.loadCloudScratchFile(encodeURIComponent(fileName), "demo-projects");
      const blob = await fetch(base64Project);
      const arrayBuffer = await blob.arrayBuffer();
      vm.loadProject(arrayBuffer);
      // eslint-disable-next-line no-alert
      alert("Loaded Project");
      // this seems to be required to let the wm load the project
      window.setTimeout(() => this.props.onActivateBlocksTab());
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(`Failed to load project: ${error.message}`);
    }
  }

  render() {
    const { fileNames } = this.state;
    return (
      <div className={styles.mainContent}>
        <div className={styles.block}>
         
        {fileNames.length > 0 && (
          <div
            className={[styles.block, styles["block-100"]].join(" ")}>
            <div className={styles.savedFilesContainer}>
              <div className={styles.savedFilesTitle}>Demo projects:</div>
              <div className={styles.saveList}>
                {fileNames.sort().map((key, index) => (
                  <div
                    key={key}
                    className={styles.row}
                  >
                    <div style={{ flex: 2 }}>{key}</div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Button
                        className={styles.button}
                        style={{ marginLeft: 10 }}
                        onClick={() => this.loadFile(key)}
                      >
                        Load
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        </div>
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

export default errorBoundaryHOC("Save / Load")(
  injectIntl(connect(mapStateToProps, mapDispatchToProps)(SaveLoad))
);
