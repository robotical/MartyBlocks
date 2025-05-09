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
import Input from "../../../components/forms/input.jsx";
import styles from "./local-storage.css";
import collectMetadata from "../../../lib/collect-metadata";
import { blobToBase64 } from "../../../lib/save-load-utils";
import { requestNewProject } from "../../../reducers/project-state";

class SaveLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = { saveFileName: "", fileNames: [], isValidFileName: false };
    this.setSaveFileName = this.setSaveFileName.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.loadFile = this.loadFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.getCurrentFiles();
  }

  async getCurrentFiles() {
    const savedScratchFiles = await mv2Interface.listSavedScratchFiles();
    const fileNames = savedScratchFiles
      .map((encodedFileName) => decodeURIComponent(encodedFileName))
      .filter((fileName) => fileName !== "__autosave");
    this.setState({ fileNames });
  }

  setSaveFileName(saveFileName) {
    const isValidFileName = saveFileName.length > 0 && saveFileName.length < 30;
    this.setState({ saveFileName, isValidFileName });
  }

  async saveFile(fileName) {
    const { fileNames } = this.state;
    const safeFileName = encodeURIComponent(fileName);
    if (fileNames.includes(safeFileName)) {
      // eslint-disable-next-line no-alert
      if (
        !window.confirm(`Are you sure you want to overwrite "${fileName}"?`)
      ) {
        return;
      }
    }
    const sb3Content = await this.props.saveProjectSb3();
    const base64sb3 = await blobToBase64(sb3Content);
    // eslint-disable-next-line no-undef
    try {
      await mv2Interface.saveScratchFile(safeFileName, base64sb3);
      // eslint-disable-next-line no-alert
      alert("Project Saved.");
      // TODO is this required?
      if (this.props.onProjectTelemetryEvent) {
        const metadata = collectMetadata(
          this.props.vm,
          this.props.projectTitle,
          this.props.locale
        );
        this.props.onProjectTelemetryEvent("projectDidSave", metadata);
      }
      const newFileNames = [
        fileName,
        ...fileNames.filter((fn) => fn !== fileName),
      ];
      this.setState({ fileNames: newFileNames });
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(`Failed to save project`);
    }
  }

  async loadFile(fileName) {
    const { vm } = this.props;

    if (!vm.editingTarget) {
      return null;
    }
    try {
      const response = await mv2Interface.loadScratchFile(
        encodeURIComponent(fileName)
      );
      const blob = await fetch(response.contents);
      const arrayBuffer = await blob.arrayBuffer();
      vm.loadProject(arrayBuffer);
      // eslint-disable-next-line no-alert
      alert("Loaded Project");
      // this seems to be required to let the wm load the project
      window.setTimeout(() => this.props.onActivateBlocksTab());
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(`Failed to load project`);
    }
  }

  async deleteFile(fileName, getConfirmation = true) {
    const { fileNames } = this.state;
    // eslint-disable-next-line no-alert
    if (
      !getConfirmation ||
      window.confirm(`Are you sure you want to delete "${fileName}"?`)
    ) {
      try {
        await mv2Interface.deleteScratchFile(encodeURIComponent(fileName));
        const newFileNames = fileNames.filter((f) => f !== fileName);
        this.setState({ fileNames: newFileNames });
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(`Failed to delete project`);
      }
    }
  }

  render() {
    const { saveFileName, isValidFileName, fileNames } = this.state;
    return (
      <div className={styles.mainContent}>
        <div className={styles.block}>
          <div className={styles.saveHeaderContainer}>
            <div className={styles.newSaveTitleContainer}>
              Create a new save file:
            </div>
            <Input
              placeholder="Type what you would like to name your new save file here..."
              style={{ flex: 1, marginLeft: 10 }}
              type="text"
              value={saveFileName}
              onChange={(event) =>
                this.setSaveFileName(event.currentTarget.value)
              }
            />
            <Button
              style={{
                marginLeft: 10,
                marginRight: 5,
                opacity: isValidFileName ? 1 : 0.2,
              }}
              className={styles.button}
              disabled={!isValidFileName}
              onClick={() => this.saveFile(saveFileName)}
            >
              Save
            </Button>
          </div>
        </div>
        {fileNames.length > 0 && (
          <div
            className={[styles.block, styles["block-100"]].join(" ")}>
            <div className={styles.savedFilesContainer}>
              <div className={styles.savedFilesTitle}>Your Saved Files:</div>
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
                        onClick={() => this.deleteFile(key)}
                      >
                        Delete
                      </Button>
                      <Button
                        className={styles.button}
                        style={{ marginLeft: 10 }}
                        onClick={() => this.loadFile(key)}
                      >
                        Load
                      </Button>
                      <Button
                        className={styles.button}
                        style={{ marginLeft: 10 }}
                        onClick={() => this.saveFile(key)}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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
