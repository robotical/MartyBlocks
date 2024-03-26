import classNames from 'classnames';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import tabStyles from 'react-tabs/style/react-tabs.css';
import VM from 'scratch-vm';
import Renderer from 'scratch-render';

import Blocks from '../../containers/blocks.jsx';
import CostumeTab from '../../containers/costume-tab.jsx';
import TargetPane from '../../containers/target-pane.jsx';
import SoundTab from '../../containers/sound-tab.jsx';
import MartyMachineTab from "../../containers/marty-machine-tab.jsx";
import SaveLoadTab from "../../containers/save-load-tab.jsx";
import StageWrapper from '../../containers/stage-wrapper.jsx';
import Loader from '../loader/loader.jsx';
import Box from '../box/box.jsx';
import MenuBar from '../menu-bar/menu-bar.jsx';
import CostumeLibrary from '../../containers/costume-library.jsx';
import BackdropLibrary from '../../containers/backdrop-library.jsx';
import Watermark from '../../containers/watermark.jsx';

// import Backpack from '../../containers/backpack.jsx';
import WebGlModal from '../../containers/webgl-modal.jsx';
import TipsLibrary from '../../containers/tips-library.jsx';
import Cards from '../../containers/cards.jsx';
import Alerts from '../../containers/alerts.jsx';
import DragLayer from '../../containers/drag-layer.jsx';
import ConnectionModal from '../../containers/connection-modal.jsx';
import TelemetryModal from '../telemetry-modal/telemetry-modal.jsx';
import DraggableModal from "../../containers/draggable-modal.jsx";
import layout, { STAGE_SIZE_MODES } from '../../lib/layout-constants';
import { getStageDimensions, resolveStageSize } from '../../lib/screen-utils';
import { themeMap } from '../../lib/themes';

import styles from './gui.css';
import addExtensionIcon from './icon--extensions.svg';
import codeIcon from './icon--code.svg';
import costumesIcon from './icon--costumes.svg';
import soundsIcon from './icon--sounds.svg';
import saveIcon from "./icon--save.svg";
import martyMachineIcon from "./icon--marty-machine.svg";

import Controls from "../../containers/controls.jsx";
import StageHeader from "../../containers/editor-stagesize-header.jsx";
import MonitorList from "../../containers/monitor-list.jsx";

import KeyboardCaller from "../keyboard-caller/keyboard-caller.jsx";


const messages = defineMessages({
  addExtension: {
    id: 'gui.gui.addExtension',
    description: 'Button to add an extension in the target pane',
    defaultMessage: 'Add Extension'
  }
});

// Cache this value to only retrieve it once the first time.
// Assume that it doesn't change for a session.
let isRendererSupported = null;

const GUIComponent = props => {
  const {
    accountNavOpen,
    activeTabIndex,
    alertsVisible,
    authorId,
    authorThumbnailUrl,
    authorUsername,
    basePath,
    backdropLibraryVisible,
    // backpackHost,
    // backpackVisible,
    blocksId,
    blocksTabVisible,
    cardsVisible,
    canChangeLanguage,
    canChangeTheme,
    canCreateNew,
    canEditTitle,
    canManageFiles,
    canRemix,
    canSave,
    canCreateCopy,
    canShare,
    canUseCloud,
    children,
    connectionModalVisible,
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
    isTelemetryEnabled,
    isTotallyNormal,
    loading,
    logo,
    renderLogin,
    onClickAbout,
    onClickAccountNav,
    onCloseAccountNav,
    onLogOut,
    onOpenRegistration,
    onToggleLoginOpen,
    onActivateCostumesTab,
    onActivateSaveLoadTab,
    onActivateSoundsTab,
    onActivateMartyMachineTab,
    onActivateTab,
    onClickLogo,
    onExtensionButtonClick,
    onProjectTelemetryEvent,
    onRequestCloseBackdropLibrary,
    onRequestCloseCostumeLibrary,
    onRequestCloseTelemetryModal,
    onSeeCommunity,
    onShare,
    onShowPrivacyPolicy,
    onStartSelectingFileUpload,
    onTelemetryModalCancel,
    onTelemetryModalOptIn,
    onTelemetryModalOptOut,
    saveLoadTabVisible,
    martyMachineTabVisible,
    showComingSoon,
    soundsTabVisible,
    stageSizeForSensors,
    stageSizeMode,
    targetIsStage,
    telemetryModalVisible,
    theme,
    tipsLibraryVisible,
    vm,
    ...componentProps
  } = omit(props, 'dispatch');
  if (children) {
    return <Box {...componentProps}>{children}</Box>;
  }

  const stageDimensions = getStageDimensions(stageSizeForSensors, isFullScreen);

  const tabClassNames = {
    tabs: styles.tabs,
    tab: classNames(tabStyles.reactTabsTab, styles.tab),
    tabList: classNames(tabStyles.reactTabsTabList, styles.tabList),
    tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.tabPanel),
    tabPanelSelected: classNames(tabStyles.reactTabsTabPanelSelected, styles.isSelected),
    tabSelected: classNames(tabStyles.reactTabsTabSelected, styles.isSelected)
  };

  if (isRendererSupported === null) {
    isRendererSupported = Renderer.isSupported();
  }

  return (<MediaQuery minWidth={layout.fullSizeMinWidth}>{isFullSize => {
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
        dir={isRtl ? 'rtl' : 'ltr'}
        {...componentProps}
      >
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
                <TabPanel className={tabClassNames.tabPanel}>
                  {true ? <MartyMachineTab vm={vm} /> : null}
                </TabPanel>
              </Tabs>
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
                isFullScreen={isFullScreen}
                isRendererSupported={isRendererSupported}
                isRtl={isRtl}
                stageSize={stageSize}
                vm={vm}
              />
              <Box className={styles.targetWrapper}>
                <TargetPane
                  stageSize={stageSize}
                  vm={vm}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <DragLayer />
      </Box>
    );
  }}</MediaQuery>);
};

GUIComponent.propTypes = {
  accountNavOpen: PropTypes.bool,
  activeTabIndex: PropTypes.number,
  authorId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // can be false
  authorThumbnailUrl: PropTypes.string,
  authorUsername: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // can be false
  backdropLibraryVisible: PropTypes.bool,
  // backpackHost: PropTypes.string,
  // backpackVisible: PropTypes.bool,
  basePath: PropTypes.string,
  blocksTabVisible: PropTypes.bool,
  blocksId: PropTypes.string,
  canChangeLanguage: PropTypes.bool,
  canChangeTheme: PropTypes.bool,
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
  isTotallyNormal: PropTypes.bool,
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
  onRequestCloseCostumeLibrary: PropTypes.func,
  onRequestCloseTelemetryModal: PropTypes.func,
  onSeeCommunity: PropTypes.func,
  onShare: PropTypes.func,
  onShowPrivacyPolicy: PropTypes.func,
  onStartSelectingFileUpload: PropTypes.func,
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
  theme: PropTypes.string,
  tipsLibraryVisible: PropTypes.bool,
  vm: PropTypes.instanceOf(VM).isRequired
};
GUIComponent.defaultProps = {
  // backpackHost: null,
  // backpackVisible: false,
  basePath: './',
  blocksId: 'original',
  canChangeLanguage: true,
  canChangeTheme: true,
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
  isTotallyNormal: false,
  loading: false,
  showComingSoon: false,
  stageSizeMode: STAGE_SIZE_MODES.large
};

const mapStateToProps = state => ({
  // This is the button's mode, as opposed to the actual current state
  blocksId: state.scratchGui.timeTravel.year.toString(),
  stageSizeMode: state.scratchGui.stageSize.stageSize,
  theme: state.scratchGui.theme.theme
});

export default injectIntl(connect(
  mapStateToProps
)(GUIComponent));