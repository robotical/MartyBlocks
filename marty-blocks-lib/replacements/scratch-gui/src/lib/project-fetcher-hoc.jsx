import React from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import bindAll from "lodash.bindall";
import { connect } from "react-redux";

import { setProjectUnchanged } from "../reducers/project-changed";
import {
  LoadingStates,
  getIsCreatingNew,
  getIsFetchingWithId,
  getIsLoading,
  getIsShowingProject,
  onFetchedProjectData,
  projectError,
  setProjectId,
} from "../reducers/project-state";
import { activateTab, BLOCKS_TAB_INDEX } from "../reducers/editor-tab";

import storage from "./storage";

/* Higher Order Component to provide behavior for loading projects by id. If
 * there's no id, the default project is loaded.
 * @param {React.Component} WrappedComponent component to receive projectData prop
 * @returns {React.Component} component with project loading behavior
 */
const ProjectFetcherHOC = function (WrappedComponent) {
  class ProjectFetcherComponent extends React.Component {
    constructor(props) {
      super(props);
      bindAll(this, ["fetchProject"]);
      storage.setProjectHost(props.projectHost);
      storage.setAssetHost(props.assetHost);
      storage.setTranslatorFunction(props.intl.formatMessage);
      // props.projectId might be unset, in which case we use our default;
      // or it may be set by an even higher HOC, and passed to us.
      // Either way, we now know what the initial projectId should be, so
      // set it in the redux store.
      if (
        props.projectId !== "" &&
        props.projectId !== null &&
        typeof props.projectId !== "undefined"
      ) {
        this.props.setProjectId(props.projectId.toString());
      }
    }
    componentDidUpdate(prevProps) {
      if (prevProps.projectHost !== this.props.projectHost) {
        storage.setProjectHost(this.props.projectHost);
      }
      if (prevProps.assetHost !== this.props.assetHost) {
        storage.setAssetHost(this.props.assetHost);
      }
      if (this.props.isFetchingWithId && !prevProps.isFetchingWithId) {
        this.fetchProject(
          this.props.reduxProjectId,
          this.props.loadingState
        ).then(
          // eslint-disable-next-line no-console
          () => {
            console.log("Fetch project success")
            // let the raft manager know that the project has been loaded so we can start updating the UI with the correct devices/buttons
            setTimeout(() => {
              // give some time so all the buttons/devices are rendered before we start updating the UI
              window.raftManager.onProjectLoaded();
            }, 2000);
            // }, window.applicationManager.isPhoneApp() ? 2000 : 1000)
          },
          // eslint-disable-next-line no-console
          (error) => console.error("Error fetching project", error.message)
        );
      }
      if (this.props.isShowingProject && !prevProps.isShowingProject) {
        this.props.onProjectUnchanged();
      }
      if (
        this.props.isShowingProject &&
        (prevProps.isLoadingProject || prevProps.isCreatingNew)
      ) {
        this.props.onActivateTab(BLOCKS_TAB_INDEX);
      }
    }

    async fetchProject(projectId, loadingState) {
      // if we have a tutorial id, we don't need to fetch a project
      const urlParams = new URLSearchParams(window.location.search);
      const tutorialId = urlParams.get("tutorial");
      if (tutorialId) {
        // falling back to default project
        const projectAsset = await storage.load(
          storage.AssetType.Project,
          projectId,
          storage.DataFormat.JSON
        );
        return this.props.onFetchedProjectData(projectAsset.data, loadingState);
      }
      // try to fetch project from db
      try {
        const projectIdInDB = urlParams.get('p');
        const dbUrl =
          "https://martyblocks-projects-default-rtdb.europe-west1.firebasedatabase.app/projects/";
        const res = await fetch(dbUrl + projectIdInDB + ".json");
        const projectBase64String = await res.json();
        if (!projectBase64String || !projectBase64String.data) {
          throw new Error("Invalid project id");
        }
        const blob = await fetch(projectBase64String.data);
        const arrayBuffer = await blob.arrayBuffer();
        return this.props.onFetchedProjectData(arrayBuffer, loadingState);
      } catch (e) {
        console.log("Couldn't load project from db:", e, "projectId:", projectId);
      }
      // if we don't have a project from the db
      // try and load from the autosave file
      try {
        // eslint-disable-next-line no-undef
        const data = await mv2Interface.loadScratchFile("__autosave");
        if (
          !data ||
          !data.contents ||
          !confirm("Would you like to load the last autosave?")
        ) {
          // not really an error, but it will dump us out to the
          // normal loading of default projects
          throw new Error("No autosave file");
        }
        // eslint-disable-next-line no-console
        console.log("Using autosave file"); //, data.contents);
        const blob = await fetch(data.contents);
        const arrayBuffer = await blob.arrayBuffer();
        return this.props.onFetchedProjectData(arrayBuffer, loadingState);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn("No autosave data available");
      }
      // eslint-disable-next-line no-console
      console.log("Falling back to default project");
      const projectAsset = await storage.load(
        storage.AssetType.Project,
        projectId,
        storage.DataFormat.JSON
      );
      return this.props.onFetchedProjectData(projectAsset.data, loadingState);
    }
    render() {
      const {
        /* eslint-disable no-unused-vars */
        assetHost,
        intl,
        isLoadingProject: isLoadingProjectProp,
        loadingState,
        onActivateTab,
        onError: onErrorProp,
        onFetchedProjectData: onFetchedProjectDataProp,
        onProjectUnchanged,
        projectHost,
        projectId,
        reduxProjectId,
        setProjectId: setProjectIdProp,
        /* eslint-enable no-unused-vars */
        isFetchingWithId: isFetchingWithIdProp,
        ...componentProps
      } = this.props;
      return (
        <WrappedComponent
          fetchingProject={isFetchingWithIdProp}
          {...componentProps}
        />
      );
    }
  }
  ProjectFetcherComponent.propTypes = {
    assetHost: PropTypes.string,
    canSave: PropTypes.bool,
    intl: intlShape.isRequired,
    isCreatingNew: PropTypes.bool,
    isFetchingWithId: PropTypes.bool,
    isLoadingProject: PropTypes.bool,
    isShowingProject: PropTypes.bool,
    loadingState: PropTypes.oneOf(LoadingStates),
    onActivateTab: PropTypes.func,
    onError: PropTypes.func,
    onFetchedProjectData: PropTypes.func,
    onProjectUnchanged: PropTypes.func,
    projectHost: PropTypes.string,
    projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setProjectId: PropTypes.func,
  };
  ProjectFetcherComponent.defaultProps = {
    assetHost: "https://assets.scratch.mit.edu",
    projectHost: "https://projects.scratch.mit.edu",
  };

  const mapStateToProps = (state) => ({
    isCreatingNew: getIsCreatingNew(state.scratchGui.projectState.loadingState),
    isFetchingWithId: getIsFetchingWithId(
      state.scratchGui.projectState.loadingState
    ),
    isLoadingProject: getIsLoading(state.scratchGui.projectState.loadingState),
    isShowingProject: getIsShowingProject(
      state.scratchGui.projectState.loadingState
    ),
    loadingState: state.scratchGui.projectState.loadingState,
    reduxProjectId: state.scratchGui.projectState.projectId,
  });
  const mapDispatchToProps = (dispatch) => ({
    onActivateTab: (tab) => dispatch(activateTab(tab)),
    onError: (error) => dispatch(projectError(error)),
    onFetchedProjectData: (projectData, loadingState) =>
      dispatch(onFetchedProjectData(projectData, loadingState)),
    setProjectId: (projectId) => dispatch(setProjectId(projectId)),
    onProjectUnchanged: () => dispatch(setProjectUnchanged()),
  });
  // Allow incoming props to override redux-provided props. Used to mock in tests.
  const mergeProps = (stateProps, dispatchProps, ownProps) =>
    Object.assign({}, stateProps, dispatchProps, ownProps);
  return injectIntl(
    connect(
      mapStateToProps,
      mapDispatchToProps,
      mergeProps
    )(ProjectFetcherComponent)
  );
};

export { ProjectFetcherHOC as default };
