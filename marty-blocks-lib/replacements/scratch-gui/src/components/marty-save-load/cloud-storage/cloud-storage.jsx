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
import styles from "./cloud-storage.css";
import { blobToBase64 } from "../../../lib/save-load-utils";
import { requestNewProject } from "../../../reducers/project-state";
import cpToCbIcon from "./cp-to-cb-icon.png";

class SaveLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadFileName: "",
      isValidFileName: false,
      isLoading: false,
      savedProjectId: "",
      copyToCPText: "Copy to Clipboard",
    };
    this.setloadFileName = this.setloadFileName.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.loadFile = this.loadFile.bind(this);
    this.copyTextToClipboard = this.copyTextToClipboard.bind(this);
    this.fallbackCopyTextToClipboard = this.fallbackCopyTextToClipboard.bind(
      this
    );
  }

  setloadFileName(loadFileName) {
    const isValidFileName = loadFileName.length > 0 && loadFileName.length < 30;
    this.setState({ loadFileName, isValidFileName });
  }

  async saveFile() {
    this.setState((oldState) => {
      return { ...oldState, isLoading: true };
    });
    const sb3Content = await this.props.saveProjectSb3();
    const base64sb3 = await blobToBase64(sb3Content);
    // eslint-disable-next-line no-undef
    try {
      const savedProjectId = await mv2Interface.saveCloudScratchFile(base64sb3);
      // eslint-disable-next-line no-alert
      this.setState({ savedProjectId: savedProjectId });
      alert(`Successfully saved project!`);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(`Failed to save project: ${error.message}`);
    }
    this.setState((oldState) => {
      return { ...oldState, isLoading: false };
    });
  }

  async loadFile(fileName) {
    const { vm } = this.props;

    if (!vm.editingTarget) {
      return null;
    }

    let projectId = fileName;
    if (this.validURL(fileName)) {
        projectId
    }
    
    this.setState((oldState) => {
      return { ...oldState, isLoading: true };
    });
    try {
      const base64Project = await mv2Interface.loadCloudScratchFile(fileName);
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
    this.setState((oldState) => {
      return { ...oldState, isLoading: false };
    });
  }

  fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      setTimeout(() => {
        this.setState({ copyToCPText: "Copy to Clipboard" });
      }, 3000);
      this.setState({ copyToCPText: "Copied!" });
      console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
  }
  copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      this.fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => {
        setTimeout(() => {
          this.setState({ copyToCPText: "Copy to Clipboard" });
        }, 3000);
        this.setState({ copyToCPText: "Copied!" });
        console.log("Async: Copying to clipboard was successful!");
      },
      (err) => {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }

  validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  render() {
    const { loadFileName, isValidFileName } = this.state;
    return (
      <div className={styles.mainContent}>
        <div className={styles.block}>
          <div className={styles.loadProjectContainer}>
            <div className={styles.loadProjectTitle}>Load a Cloud save:</div>
            <Input
              style={{ flex: 1, marginLeft: 10 }}
              type="text"
              placeholder="Type the name of the cloud save file you would like to load here..."
              value={loadFileName}
              onChange={(event) =>
                this.setloadFileName(event.currentTarget.value)
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
              onClick={() => this.loadFile(loadFileName)}
            >
              Load
            </Button>
          </div>
          <div
            className={styles.loadProjectContainer}
            style={{ marginTop: "1rem" }}
          >
            <div className={styles.loadProjectTitle}>
              Create a new Cloud Save file:
            </div>
            <Button
              style={{
                marginLeft: 10,
                marginRight: 5,
                opacity: !this.state.isLoading ? 1 : 0.2,
              }}
              disabled={this.state.isLoading}
              className={styles.button}
              onClick={() => this.saveFile()}
            >
              Save
            </Button>
            <Input
              style={{ flex: 1, marginLeft: 10 }}
              type="text"
              placeholder="Your autogenerated Save File Code is:"
              value={this.state.savedProjectId}
              editable="false"
            />
            <Button
              iconSrc={cpToCbIcon}
              style={{
                marginLeft: 10,
                marginRight: 5,
                opacity: !!this.state.savedProjectId ? 1 : 0.2,
              }}
              className={styles.button}
              disabled={!!!this.state.savedProjectId}
              onClick={() =>
                this.copyTextToClipboard(this.state.savedProjectId)
              }
            >
              {this.state.copyToCPText}
            </Button>
          </div>
        </div>
        {this.state.isLoading && (
          <div className={styles.ldsSpinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        <div
          className={[styles.block, styles["block-100"]].join(" ")}
          style={{ marginTop: "2rem" }}
        >
          <div className={styles.tipsContainer}>
            <div className={styles.tipsTitle}>Tips for Cloud Saving:</div>
            <ul className={styles.tipsList}>
              <li>
                Make sure to write down or record the auto-generated code that
                is provided each time you save a new file. You will need this to
                load it in the future.
              </li>
              <li>
                Although the Marty the Robot app will continue to auto-save
                files to the local space storage, there is no auto-save function
                for cloud save files. Please manually re-save your file each
                time, if you wish them to be available for download over cloud
                storage.
              </li>
              <li>
                Each time you re-save a file to cloud storage, you will be
                provided with a NEW SAVE FILE CODE. Please take a note of this.
              </li>
            </ul>
          </div>
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
