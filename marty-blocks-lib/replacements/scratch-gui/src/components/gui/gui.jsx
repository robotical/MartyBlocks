import classNames from "classnames";
import omit from "lodash.omit";
import PropTypes from "prop-types";
import React from "react";
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from "react-intl";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import tabStyles from "react-tabs/style/react-tabs.css";
import VM from "scratch-vm";
import Renderer from "scratch-render";

import Blocks from "../../containers/blocks.jsx";
import CostumeTab from "../../containers/costume-tab.jsx";
import TargetPane from "../../containers/target-pane.jsx";
import SoundTab from "../../containers/sound-tab.jsx";
import MartyMachineTab from "../../containers/marty-machine-tab.jsx";
import CodeAssessTab from "../../containers/code-assess-tab.jsx";
import SaveLoadTab from "../../containers/save-load-tab.jsx";
import StageWrapper from "../../containers/stage-wrapper.jsx";
import Loader from "../loader/loader.jsx";
import Box from "../box/box.jsx";
// import MenuBar from '../menu-bar/menu-bar.jsx';
import CostumeLibrary from "../../containers/costume-library.jsx";
import BackdropLibrary from "../../containers/backdrop-library.jsx";
import Watermark from "../../containers/watermark.jsx";

import LanguageStandalone from "../language-standalone/language-standalone.jsx";

// import Backpack from '../../containers/backpack.jsx';
import WebGlModal from "../../containers/webgl-modal.jsx";
import TipsLibrary from "../../containers/tips-library.jsx";
import Cards from "../../containers/cards.jsx";
import DraggableModal from "../../containers/draggable-modal.jsx";
import Alerts from "../../containers/alerts.jsx";
import DragLayer from "../../containers/drag-layer.jsx";
import ConnectionModal from "../../containers/connection-modal.jsx";
import StudentAnnouncementModal from "../marty-code-assess/student-announcement-modal/student-announcement-modal.jsx";

import TelemetryModal from "../telemetry-modal/telemetry-modal.jsx";

import layout, { STAGE_SIZE_MODES } from "../../lib/layout-constants";
import { getStageDimensions, resolveStageSize } from "../../lib/screen-utils";

import styles from "./gui.css";
import addExtensionIcon from "./icon--extensions.svg";
import codeIcon from "./icon--code.svg";
import costumesIcon from "./icon--costumes.svg";
import soundsIcon from "./icon--sounds.svg";
import saveIcon from "./icon--save.svg";
import martyMachineIcon from "./icon--marty-machine.svg";
import codeAssessIcon from "./icon--code-assess.svg";

import Controls from "../../containers/controls.jsx";
import StageHeader from "../../containers/editor-stagesize-header.jsx";
import MonitorList from "../../containers/monitor-list.jsx";

import MartyConnectBtn from "../marty-connect-btn/marty-connect-btn.jsx";
import SensorsDashboardBtn from "../sensors-dashboard-btn/index.jsx";
import MartyPythonButton from "../marty-python-btn/index.jsx";
import BadgePopup from "../marty-code-assess/badge-popup/badge-popup.jsx";

const messages = defineMessages({
  addExtension: {
    id: "gui.gui.addExtension",
    description: "Button to add an extension in the target pane",
    defaultMessage: "Add Extension",
  },
});

// Cache this value to only retrieve it once the first time.
// Assume that it doesn't change for a session.
let isRendererSupported = null;

const GUIComponent = (props) => {
  const {
    accountNavOpen,
    activeTabIndex,
    alertsVisible,
    authorId,
    authorThumbnailUrl,
    authorUsername,
    basePath,
    backdropLibraryVisible,
    backpackHost,
    backpackVisible,
    badgePopupProps,
    blocksTabVisible,
    cardsVisible,
    canChangeLanguage,
    canCreateNew,
    canEditTitle,
    canManageFiles,
    canRemix,
    canSave,
    canCreateCopy,
    canShare,
    canUseCloud,
    children,
    codeAssessBadgeAchievementsPopupVisible,
    connectionModalVisible,
    studentAnnouncementModalVisible,
    costumeLibraryVisible,
    costumesTabVisible,
    draggableModalVisible,
    enableCommunity,
    intl,
    isCreating,
    isFullScreen,
    isPlayerOnly,
    isRtl,
    isShared,
    loading,
    logo,
    renderLogin,
    onClickAccountNav,
    onCloseAccountNav,
    onLogOut,
    onOpenRegistration,
    onToggleLoginOpen,
    onActivateCostumesTab,
    onActivateSaveLoadTab,
    onActivateSoundsTab,
    onActivateCodeAssessTab,
    onActivateMartyMachineTab,
    onActivateTab,
    onClickLogo,
    onExtensionButtonClick,
    onProjectTelemetryEvent,
    onRequestCloseBackdropLibrary,
    onRequestCloseBadgePopup,
    onRequestCloseCostumeLibrary,
    onRequestCloseTelemetryModal,
    onSeeCommunity,
    onShare,
    onTelemetryModalCancel,
    onTelemetryModalOptIn,
    onTelemetryModalOptOut,
    saveLoadTabVisible,
    codeAssessTabVisible,
    martyMachineTabVisible,
    showComingSoon,
    soundsTabVisible,
    stageSizeForSensors,
    stageSizeMode,
    targetIsStage,
    telemetryModalVisible,
    tipsLibraryVisible,
    useEditorDragStyle,
    vm,
    ...componentProps
  } = omit(props, "dispatch");
  if (children) {
    return <Box {...componentProps}>{children}</Box>;
  }

  const stageDimensions = getStageDimensions(stageSizeForSensors, isFullScreen);

  const tabClassNames = {
    tabs: styles.tabs,
    tab: classNames(tabStyles.reactTabsTab, styles.tab),
    tabList: classNames(tabStyles.reactTabsTabList, styles.tabList),
    tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.tabPanel),
    tabPanelSelected: classNames(
      tabStyles.reactTabsTabPanelSelected,
      styles.isSelected
    ),
    tabSelected: classNames(tabStyles.reactTabsTabSelected, styles.isSelected),
  };

  if (isRendererSupported === null) {
    isRendererSupported = Renderer.isSupported();
  }

  return (
    <MediaQuery minWidth={layout.fullSizeMinWidth}>
      {(isFullSize) => {
        const stageSize = resolveStageSize(stageSizeMode, isFullSize);

        return isPlayerOnly ? (
          <StageWrapper
            isFullScreen={isFullScreen}
            isRendererSupported={isRendererSupported}
            isRtl={isRtl}
            loading={loading}
            stageSize={STAGE_SIZE_MODES.large}
            vm={vm}
          >
            {alertsVisible ? (
              <Alerts className={styles.alertsContainer} />
            ) : null}
          </StageWrapper>
        ) : (
          <Box
            className={styles.pageWrapper}
            dir={isRtl ? "rtl" : "ltr"}
            {...componentProps}
          >
            {telemetryModalVisible ? (
              <TelemetryModal
                onCancel={onTelemetryModalCancel}
                onOptIn={onTelemetryModalOptIn}
                onOptOut={onTelemetryModalOptOut}
                onRequestClose={onRequestCloseTelemetryModal}
              />
            ) : null}
            {loading ? <Loader /> : null}
            {isCreating ? <Loader messageId="gui.loader.creating" /> : null}
            {isRendererSupported ? null : <WebGlModal isRtl={isRtl} />}
            {tipsLibraryVisible ? <TipsLibrary /> : null}
            {cardsVisible ? <Cards /> : null}
            {draggableModalVisible ? <DraggableModal /> : null}
            {alertsVisible ? (
              <Alerts className={styles.alertsContainer} />
            ) : null}
            {codeAssessBadgeAchievementsPopupVisible ? <BadgePopup onRequestClose={onRequestCloseBadgePopup} {...badgePopupProps} /> : null}
            {connectionModalVisible ? <ConnectionModal vm={vm} /> : null}
            {studentAnnouncementModalVisible && <StudentAnnouncementModal />}
            {costumeLibraryVisible ? (
              <CostumeLibrary
                vm={vm}
                onRequestClose={onRequestCloseCostumeLibrary}
              />
            ) : null}
            {backdropLibraryVisible ? (
              <BackdropLibrary
                vm={vm}
                onRequestClose={onRequestCloseBackdropLibrary}
              />
            ) : null}
            {/* <MenuBar
                    accountNavOpen={accountNavOpen}
                    authorId={authorId}
                    authorThumbnailUrl={authorThumbnailUrl}
                    authorUsername={authorUsername}
                    canChangeLanguage={canChangeLanguage}
                    canCreateCopy={canCreateCopy}
                    canCreateNew={canCreateNew}
                    canEditTitle={canEditTitle}
                    canManageFiles={canManageFiles}
                    canRemix={canRemix}
                    canSave={canSave}
                    canShare={canShare}
                    className={styles.menuBarPosition}
                    enableCommunity={enableCommunity}
                    isShared={isShared}
                    logo={logo}
                    renderLogin={renderLogin}
                    showComingSoon={showComingSoon}
                    onClickAccountNav={onClickAccountNav}
                    onClickLogo={onClickLogo}
                    onCloseAccountNav={onCloseAccountNav}
                    onLogOut={onLogOut}
                    onOpenRegistration={onOpenRegistration}
                    onProjectTelemetryEvent={onProjectTelemetryEvent}
                    onSeeCommunity={onSeeCommunity}
                    onShare={onShare}
                    onToggleLoginOpen={onToggleLoginOpen}
                />*/}
            <Box className={styles.bodyWrapper}>
              <Box className={styles.flexWrapper}>
                <Box className={styles.editorWrapper}>
                  <Tabs
                    forceRenderTabPanel
                    className={tabClassNames.tabs}
                    selectedIndex={activeTabIndex}
                    selectedTabClassName={tabClassNames.tabSelected}
                    selectedTabPanelClassName={tabClassNames.tabPanelSelected}
                    onSelect={onActivateTab}
                  >
                    <TabList className={[tabClassNames.tabList, styles.buttonsTabListContainer].join(" ")}>
                      <MartyConnectBtn />
                      <LanguageStandalone
                        className={styles.languageSelectorWrapper}
                        canChangeLanguage={canChangeLanguage}
                      />
                      <SensorsDashboardBtn />
                      <MartyPythonButton />
                    </TabList>
                    <TabList className={tabClassNames.tabList}>
                      <Tab className={tabClassNames.tab}>
                        <img draggable={false} src={codeIcon} />
                        <FormattedMessage
                          defaultMessage="Code"
                          description="Button to get to the code panel"
                          id="gui.gui.codeTab"
                        />
                      </Tab>
                      <Tab
                        className={tabClassNames.tab}
                        onClick={onActivateCostumesTab}
                      >
                        <img draggable={false} src={costumesIcon} />
                        {targetIsStage ? (
                          <FormattedMessage
                            defaultMessage="Backdrops"
                            description="Button to get to the backdrops panel"
                            id="gui.gui.backdropsTab"
                          />
                        ) : (
                          <FormattedMessage
                            defaultMessage="Costumes"
                            description="Button to get to the costumes panel"
                            id="gui.gui.costumesTab"
                          />
                        )}
                      </Tab>
                      <Tab
                        className={tabClassNames.tab}
                        onClick={onActivateSoundsTab}
                      >
                        <img draggable={false} src={soundsIcon} />
                        <FormattedMessage
                          defaultMessage="Sounds"
                          description="Button to get to the sounds panel"
                          id="gui.gui.soundsTab"
                        />
                      </Tab>
                      <Tab
                        className={tabClassNames.tab}
                        onClick={onActivateMartyMachineTab}
                      >
                        <img draggable={false} src={martyMachineIcon} />
                        <FormattedMessage
                          defaultMessage="Machine Learning"
                          description="Button to toggle Machine Learning tab"
                          id="gui.gui.toggleMartyMachineTab"
                        />
                      </Tab>
                      <Tab
                        className={tabClassNames.tab}
                        onClick={onActivateCodeAssessTab}
                      >
                        <img draggable={false} src={codeAssessIcon} />
                        <FormattedMessage
                          defaultMessage="Classroom"
                          description="Button to toggle Classroom tab"
                          id="gui.gui.toggleCodeAssessTab"
                        />
                      </Tab>
                      <Tab
                        className={tabClassNames.tab}
                        onClick={onActivateSaveLoadTab}
                      >
                        <img draggable={false} src={saveIcon} />
                        <FormattedMessage
                          defaultMessage="Save/Load"
                          description="Button to toggle save/load tab"
                          id="gui.gui.toggleSaveLoadTab"
                        />
                      </Tab>
                      <Box className={styles.controlsWrapper}>
                        <Controls vm={vm} />
                        <StageHeader stageSize={stageSize} vm={vm} />
                      </Box>
                    </TabList>
                    <TabPanel className={tabClassNames.tabPanel}>
                      <Box className={styles.blocksWrapper}>
                        <Blocks
                          canUseCloud={canUseCloud}
                          grow={1}
                          isVisible={blocksTabVisible}
                          options={{
                            media: `${basePath}static/blocks-media/`,
                          }}
                          stageSize={stageSize}
                          vm={vm}
                        />
                      </Box>
                      <Box className={styles.extensionButtonContainer}>
                        <button
                          className={styles.extensionButton}
                          title={intl.formatMessage(messages.addExtension)}
                          onClick={onExtensionButtonClick}
                        >
                          <img
                            className={styles.extensionButtonIcon}
                            draggable={false}
                            src={addExtensionIcon}
                          />
                        </button>
                      </Box>
                      {/* below box is perfect for sensor display */}
                      <Box className={styles.monitorWrapper}>
                        <MonitorList
                          draggable={false}
                          stageSize={stageDimensions}
                        />
                      </Box>
                      <Box className={styles.watermark}>
                        <Watermark />
                      </Box>
                    </TabPanel>
                    <TabPanel className={tabClassNames.tabPanel}>
                      {costumesTabVisible ? <CostumeTab vm={vm} /> : null}
                    </TabPanel>
                    <TabPanel className={tabClassNames.tabPanel}>
                      {soundsTabVisible ? <SoundTab vm={vm} /> : null}
                    </TabPanel>
                    <TabPanel className={tabClassNames.tabPanel}>
                      {martyMachineTabVisible ? <MartyMachineTab vm={vm} /> : null}
                    </TabPanel>
                    <TabPanel className={tabClassNames.tabPanel}>
                      {codeAssessTabVisible ? <CodeAssessTab vm={vm} /> : null}
                    </TabPanel>
                    <TabPanel
                      className={[
                        tabClassNames.tabPanel,
                        styles["tab-panel-height-100"],
                      ].join(" ")}
                    >
                      {saveLoadTabVisible ? <SaveLoadTab vm={vm} /> : null}
                    </TabPanel>
                  </Tabs>
                  {/* {backpackVisible ? (
                                <Backpack host={backpackHost} />
                            ) : null}*/}
                </Box>
                <Box
                  className={classNames(
                    styles.stageAndTargetWrapper,
                    styles[stageSize]
                  )}
                  style={
                    stageSize === STAGE_SIZE_MODES.small
                      ? ""
                      : { display: "none" }
                  }
                >
                  <StageWrapper
                    isRendererSupported={isRendererSupported}
                    isRtl={isRtl}
                    stageSize={stageSize}
                    vm={vm}
                  />
                  <Box className={styles.targetWrapper}>
                    <TargetPane stageSize={stageSize} vm={vm} />
                  </Box>
                </Box>
              </Box>
            </Box>
            <DragLayer />
          </Box>
        );
      }}
    </MediaQuery>
  );
};

GUIComponent.propTypes = {
  accountNavOpen: PropTypes.bool,
  activeTabIndex: PropTypes.number,
  authorId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // can be false
  authorThumbnailUrl: PropTypes.string,
  authorUsername: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // can be false
  backdropLibraryVisible: PropTypes.bool,
  backpackHost: PropTypes.string,
  backpackVisible: PropTypes.bool,
  badgePopupProps: PropTypes.object,
  basePath: PropTypes.string,
  blocksTabVisible: PropTypes.bool,
  canChangeLanguage: PropTypes.bool,
  canCreateCopy: PropTypes.bool,
  canCreateNew: PropTypes.bool,
  canEditTitle: PropTypes.bool,
  canManageFiles: PropTypes.bool,
  canRemix: PropTypes.bool,
  canSave: PropTypes.bool,
  canShare: PropTypes.bool,
  canUseCloud: PropTypes.bool,
  cardsVisible: PropTypes.bool,
  children: PropTypes.node,
  codeAssessBadgeAchievementsPopupVisible: PropTypes.bool,
  costumeLibraryVisible: PropTypes.bool,
  costumesTabVisible: PropTypes.bool,
  draggableModalVisible: PropTypes.bool,
  enableCommunity: PropTypes.bool,
  intl: intlShape.isRequired,
  isCreating: PropTypes.bool,
  isFullScreen: PropTypes.bool,
  isPlayerOnly: PropTypes.bool,
  isRtl: PropTypes.bool,
  isShared: PropTypes.bool,
  loading: PropTypes.bool,
  logo: PropTypes.string,
  onActivateCostumesTab: PropTypes.func,
  onActivateSoundsTab: PropTypes.func,
  onActivateMartyMachineTab: PropTypes.func,
  onActivateSaveLoadTab: PropTypes.func,
  onActivateTab: PropTypes.func,
  onClickAccountNav: PropTypes.func,
  onClickLogo: PropTypes.func,
  onCloseAccountNav: PropTypes.func,
  onExtensionButtonClick: PropTypes.func,
  onLogOut: PropTypes.func,
  onOpenRegistration: PropTypes.func,
  onRequestCloseBackdropLibrary: PropTypes.func,
  onRequestCloseBadgePopup: PropTypes.func,
  onRequestCloseCostumeLibrary: PropTypes.func,
  onRequestCloseTelemetryModal: PropTypes.func,
  onSeeCommunity: PropTypes.func,
  onShare: PropTypes.func,
  onTabSelect: PropTypes.func,
  onTelemetryModalCancel: PropTypes.func,
  onTelemetryModalOptIn: PropTypes.func,
  onTelemetryModalOptOut: PropTypes.func,
  onToggleLoginOpen: PropTypes.func,
  renderLogin: PropTypes.func,
  martyMachineTabVisible: PropTypes.bool,
  saveLoadTabVisible: PropTypes.bool,
  showComingSoon: PropTypes.bool,
  soundsTabVisible: PropTypes.bool,
  stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
  targetIsStage: PropTypes.bool,
  telemetryModalVisible: PropTypes.bool,
  tipsLibraryVisible: PropTypes.bool,
  useEditorDragStyle: PropTypes.bool,
  vm: PropTypes.instanceOf(VM).isRequired,
};
GUIComponent.defaultProps = {
  backpackHost: null,
  backpackVisible: false,
  basePath: "./",
  canChangeLanguage: true,
  canCreateNew: false,
  canEditTitle: false,
  canManageFiles: true,
  canRemix: false,
  canSave: false,
  canCreateCopy: false,
  canShare: false,
  canUseCloud: false,
  enableCommunity: false,
  isCreating: false,
  isShared: false,
  loading: false,
  showComingSoon: false,
  stageSizeMode: STAGE_SIZE_MODES.large,
};

const mapStateToProps = (state) => ({
  // This is the button's mode, as opposed to the actual current state
  stageSizeMode: state.scratchGui.stageSize.stageSize,
});

export default injectIntl(connect(mapStateToProps)(GUIComponent));
