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
import Button from "../../button/button.jsx";
import Input from "../../forms/input.jsx";
import styles from "./portable-file-storage.css";
import { blobToBase64 } from "../../../lib/save-load-utils";
import { requestNewProject } from "../../../reducers/project-state";

function randomHashGenerator(length = 10) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

class SaveLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.saveFile = this.saveFile.bind(this);
    this.loadFile = this.loadFile.bind(this);
  }

  async saveFile() {
    this.setState((oldState) => {
      return { ...oldState, isLoading: true };
    });
    const sb3Content = await this.props.saveProjectSb3();
    const base64sb3 = await blobToBase64(sb3Content);
    try {
      const fileName = `sb-${randomHashGenerator(5)}.sb3`;
      await mv2Interface.saveScratchFileOnDevice(fileName, base64sb3);
      mv2Interface.send_REST(
        `notification/info-message/File ${fileName} Saved!`
      );
    } catch (e) {
      mv2Interface.send_REST(`notification/error-message/Couldn't save file.`);
      console.log("Couldn't save file", e);
    }
    this.setState((oldState) => {
      return { ...oldState, isLoading: false };
    });
  }

  async loadFile(e) {
    const { vm } = this.props;
    if (!vm.editingTarget) {
      return null;
    }
    this.setState((oldState) => {
      return { ...oldState, isLoading: true };
    });
    try {
      const fileName = e.target.value;
      const file = e.target.files[0];
      if (!fileName)
        throw new Error("Couldn't find project with id: " + fileName);
      const isReactNative = !!window.ReactNativeWebView;
      let arrayBuffer;
      if (isReactNative) {
        const base64 = await file.text();
        const blob = await fetch(base64);
        arrayBuffer = await blob.arrayBuffer();
      } else {
        arrayBuffer = await file.arrayBuffer();
      }
      vm.loadProject(arrayBuffer);
      // eslint-disable-next-line no-alert
      mv2Interface.send_REST(`notification/info-message/Project loaded!`);
      // this seems to be required to let the wm load the project
      window.setTimeout(() => this.props.onActivateBlocksTab());
      codeAssess.setIsProjectLoaded(true);
    } catch (error) {
      // eslint-disable-next-line no-alert
      mv2Interface.send_REST(
        `notification/error-message/Failed to load project: ${error.message}`
      );
    }
    this.setState((oldState) => {
      return { ...oldState, isLoading: false };
    });
  }

  render() {
    return (
      <div className={styles.mainContent}>
        <div className={styles.block}>
          <div className={styles.saveProjectContainer}>
            <div className={styles.button} onClick={() => this.saveFile()}>
              <p className={styles.buttonTitle}>Save to file</p>
            </div>
          </div>
          <div className={styles.loadProjectContainer}>
            <div className={styles.button}>
              <input
                type="file"
                id="file-upload"
                name="file-upload"
                className={styles.loadInput}
                onChange={this.loadFile}
              />
              <label htmlFor="file-upload" className={styles.buttonTitle}>
                Load from file
              </label>
            </div>
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
