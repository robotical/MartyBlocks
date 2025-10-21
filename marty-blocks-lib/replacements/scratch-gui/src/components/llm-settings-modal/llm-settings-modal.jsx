import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage, defineMessages, injectIntl, intlShape} from 'react-intl';

import Modal from '../modal/modal.jsx';
import {
    getLLMSettings,
    getLLMSettingsSource,
    replaceLLMSettings,
    setLLMSettings,
    setLLMSettingsSource,
    setServerLLMSettingsSnapshot,
    subscribeToLLMSettingsSource
} from '../../lib/llm-settings.js';
import {
    fetchLLMSettingsFromServer,
    saveLLMSettingsToServer
} from '../../lib/llm-settings-service.js';

import styles from './llm-settings-modal.css';

const messages = defineMessages({
    title: {
        id: 'gui.menuBar.llmSettings',
        defaultMessage: 'LLM Settings'
    },
    description: {
        id: 'gui.llmSettingsModal.description',
        defaultMessage: 'Update the guidance shared with Marty’s language model before every conversation.'
    },
    importantInstructionsLabel: {
        id: 'gui.llmSettingsModal.importantInstructionsLabel',
        defaultMessage: 'LLM important instructions'
    },
    importantInstructionsPlaceholder: {
        id: 'gui.llmSettingsModal.importantInstructionsPlaceholder',
        defaultMessage: 'Essential directions Marty should always follow.'
    },
    importantSafeguardsLabel: {
        id: 'gui.llmSettingsModal.importantSafeguardsLabel',
        defaultMessage: 'LLM important safeguards'
    },
    importantSafeguardsPlaceholder: {
        id: 'gui.llmSettingsModal.importantSafeguardsPlaceholder',
        defaultMessage: 'Safety rules, restricted topics, or red lines.'
    },
    knowledgeBaseLabel: {
        id: 'gui.llmSettingsModal.knowledgeBaseLabel',
        defaultMessage: 'LLM knowledge base'
    },
    knowledgeBasePlaceholder: {
        id: 'gui.llmSettingsModal.knowledgeBasePlaceholder',
        defaultMessage: 'Key facts, documents, or context Marty can reference.'
    },
    loadFromServer: {
        id: 'gui.llmSettingsModal.loadFromServer',
        defaultMessage: 'Load from server'
    },
    loadLocal: {
        id: 'gui.llmSettingsModal.loadLocal',
        defaultMessage: 'Load local copy'
    },
    loadingFromServer: {
        id: 'gui.llmSettingsModal.loadingFromServer',
        defaultMessage: 'Loading…'
    },
    saveLocally: {
        id: 'gui.llmSettingsModal.saveLocally',
        defaultMessage: 'Save locally'
    },
    saveToServer: {
        id: 'gui.llmSettingsModal.saveToServer',
        defaultMessage: 'Save on server'
    },
    saveGlobally: {
        id: 'gui.llmSettingsModal.saveGlobally',
        defaultMessage: 'Save globally (local + server)'
    },
    savingToServer: {
        id: 'gui.llmSettingsModal.savingToServer',
        defaultMessage: 'Saving to server…'
    },
    savingGlobally: {
        id: 'gui.llmSettingsModal.savingGlobally',
        defaultMessage: 'Saving globally…'
    },
    close: {
        id: 'gui.llmSettingsModal.close',
        defaultMessage: 'Close'
    },
    statusLabel: {
        id: 'gui.llmSettingsModal.statusLabel',
        defaultMessage: 'Current copy:'
    },
    statusLocal: {
        id: 'gui.llmSettingsModal.statusLocal',
        defaultMessage: 'Local'
    },
    statusServer: {
        id: 'gui.llmSettingsModal.statusServer',
        defaultMessage: 'Server'
    },
    statusBoth: {
        id: 'gui.llmSettingsModal.statusBoth',
        defaultMessage: 'Local + Server'
    },
    statusUnsaved: {
        id: 'gui.llmSettingsModal.statusUnsaved',
        defaultMessage: 'Unsaved changes'
    },
    sourceLabel: {
        id: 'gui.llmSettingsModal.sourceLabel',
        defaultMessage: 'Use settings from:'
    },
    sourceLocal: {
        id: 'gui.llmSettingsModal.sourceLocal',
        defaultMessage: 'Local copy'
    },
    sourceServer: {
        id: 'gui.llmSettingsModal.sourceServer',
        defaultMessage: 'Server'
    },
    loadedFromServer: {
        id: 'gui.llmSettingsModal.loadedFromServer',
        defaultMessage: 'Loaded latest settings from server.'
    },
    savedLocally: {
        id: 'gui.llmSettingsModal.savedLocally',
        defaultMessage: 'Saved locally.'
    },
    savedToServer: {
        id: 'gui.llmSettingsModal.savedToServer',
        defaultMessage: 'Saved on server.'
    },
    savedGlobally: {
        id: 'gui.llmSettingsModal.savedGlobally',
        defaultMessage: 'Saved locally and on server.'
    },
    loadedLocally: {
        id: 'gui.llmSettingsModal.loadedLocally',
        defaultMessage: 'Loaded local settings.'
    },
    errorLoading: {
        id: 'gui.llmSettingsModal.errorLoading',
        defaultMessage: 'Could not load from server{error}.'
    },
    errorSaving: {
        id: 'gui.llmSettingsModal.errorSaving',
        defaultMessage: 'Could not save to server{error}.'
    }
});

const normalizeSettings = raw => ({
    importantInstructions: (raw && raw.importantInstructions) || '',
    importantSafeguards: (raw && raw.importantSafeguards) || '',
    knowledgeBase: (raw && raw.knowledgeBase) || ''
});

const fields = [
    {
        key: 'importantInstructions',
        label: messages.importantInstructionsLabel,
        placeholder: messages.importantInstructionsPlaceholder
    },
    {
        key: 'importantSafeguards',
        label: messages.importantSafeguardsLabel,
        placeholder: messages.importantSafeguardsPlaceholder
    },
    {
        key: 'knowledgeBase',
        label: messages.knowledgeBaseLabel,
        placeholder: messages.knowledgeBasePlaceholder
    }
];

const toStringValue = value => (typeof value === 'string' ? value : '');
const settingsEqual = (a, b) => fields.every(
    field => toStringValue(a && a[field.key]) === toStringValue(b && b[field.key])
);
const hasAnyContent = settings => fields.some(
    field => toStringValue(settings && settings[field.key]).trim().length > 0
);

const LLMSettingsModal = ({intl, isRtl, onRequestClose}) => {
    const initialLocalSnapshot = normalizeSettings(getLLMSettings());
    const hasInitialLocal = hasAnyContent(initialLocalSnapshot);
    const initialSyncState = {
        local: hasInitialLocal,
        server: false
    };

    const initialValuesRef = React.useRef(initialLocalSnapshot);
    const localSnapshotRef = React.useRef(initialLocalSnapshot);
    const serverSnapshotRef = React.useRef(null);
    const syncBaselineRef = React.useRef(initialSyncState);
    const shouldLoadFromServerRef = React.useRef(!hasInitialLocal);

    const [formValues, setFormValues] = React.useState(() => ({
        ...initialLocalSnapshot
    }));
    const [syncState, setSyncState] = React.useState(initialSyncState);
    const [loadState, setLoadState] = React.useState({loading: false});
    const [serverSaveState, setServerSaveState] = React.useState({saving: false, mode: null});
    const [feedback, setFeedback] = React.useState(null);
    const [activeSource, setActiveSource] = React.useState(() => getLLMSettingsSource());

    const clearFeedback = React.useCallback(() => {
        setFeedback(null);
    }, []);

    const showFeedback = React.useCallback((type, descriptor, values = {}) => {
        setFeedback({type, descriptor, values});
    }, []);

    React.useEffect(() => {
        const unsubscribe = subscribeToLLMSettingsSource(nextSource => {
            if (typeof nextSource === 'string') {
                setActiveSource(nextSource);
            }
        });
        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, [subscribeToLLMSettingsSource]);

    const handleSourceChange = React.useCallback(event => {
        const nextSource = event && event.target ? event.target.value : null;
        if (nextSource !== 'local' && nextSource !== 'server') return;
        setActiveSource(nextSource);
        setLLMSettingsSource(nextSource);
    }, [setLLMSettingsSource]);

    const applyBaseline = React.useCallback((nextValues, nextSyncState) => {
        const normalized = normalizeSettings(nextValues);
        initialValuesRef.current = normalized;
        syncBaselineRef.current = nextSyncState;
        setFormValues(normalized);
        setSyncState(nextSyncState);
        return normalized;
    }, []);

    const handleFieldChange = React.useCallback(field => event => {
        const {value} = event.target;
        setFormValues(prev => ({
            ...prev,
            [field]: value
        }));
        setSyncState({local: false, server: false});
        clearFeedback();
    }, [clearFeedback]);

    const handleResetToInitial = React.useCallback(() => {
        clearFeedback();
        setFormValues({
            ...initialValuesRef.current
        });
        setSyncState(syncBaselineRef.current);
    }, [clearFeedback]);

    const handleClose = React.useCallback(() => {
        handleResetToInitial();
        onRequestClose();
    }, [handleResetToInitial, onRequestClose]);

    const handleLoadLocal = React.useCallback(() => {
        clearFeedback();
        const localSettings = normalizeSettings(getLLMSettings());
        localSnapshotRef.current = localSettings;
        const serverHasCopy = serverSnapshotRef.current ? hasAnyContent(serverSnapshotRef.current) : false;
        const matchesServer = serverSnapshotRef.current
            ? settingsEqual(localSettings, serverSnapshotRef.current)
            : false;
        applyBaseline(localSettings, {
            local: true,
            server: matchesServer && serverHasCopy
        });
        showFeedback('success', messages.loadedLocally);
    }, [applyBaseline, clearFeedback, showFeedback]);

    const handleSaveLocally = React.useCallback(() => {
        clearFeedback();
        const normalized = normalizeSettings(formValues);
        setLLMSettings(normalized);
        localSnapshotRef.current = normalized;
        const serverHasCopy = serverSnapshotRef.current ? hasAnyContent(serverSnapshotRef.current) : false;
        const matchesServer = serverSnapshotRef.current
            ? settingsEqual(normalized, serverSnapshotRef.current)
            : false;
        applyBaseline(normalized, {
            local: true,
            server: matchesServer && serverHasCopy
        });
        showFeedback('success', messages.savedLocally);
    }, [applyBaseline, clearFeedback, formValues, showFeedback]);

    const handleSaveToServer = React.useCallback(async () => {
        clearFeedback();
        setServerSaveState({saving: true, mode: 'server'});
        const normalized = normalizeSettings(formValues);
        try {
            await saveLLMSettingsToServer(normalized);
            setServerLLMSettingsSnapshot(normalized);
            serverSnapshotRef.current = normalized;
            const serverHasCopy = hasAnyContent(normalized);
            const localMatches = settingsEqual(localSnapshotRef.current, normalized);
            applyBaseline(normalized, {
                local: localMatches,
                server: serverHasCopy
            });
            showFeedback('success', messages.savedToServer);
        } catch (error) {
            showFeedback(
                'error',
                messages.errorSaving,
                {error: error && error.message ? ` (${error.message})` : ''}
            );
        } finally {
            setServerSaveState({saving: false, mode: null});
        }
    }, [applyBaseline, clearFeedback, formValues, setServerLLMSettingsSnapshot, showFeedback]);

    const handleSaveGlobally = React.useCallback(async () => {
        clearFeedback();
        setServerSaveState({saving: true, mode: 'global'});
        const normalized = normalizeSettings(formValues);
        try {
            await saveLLMSettingsToServer(normalized);
            setLLMSettings(normalized);
            setServerLLMSettingsSnapshot(normalized);
            localSnapshotRef.current = normalized;
            serverSnapshotRef.current = normalized;
            const hasCopy = hasAnyContent(normalized);
            applyBaseline(normalized, {
                local: hasCopy,
                server: hasCopy
            });
            showFeedback('success', messages.savedGlobally);
        } catch (error) {
            showFeedback(
                'error',
                messages.errorSaving,
                {error: error && error.message ? ` (${error.message})` : ''}
            );
        } finally {
            setServerSaveState({saving: false, mode: null});
        }
    }, [applyBaseline, clearFeedback, formValues, setServerLLMSettingsSnapshot, showFeedback]);

    const loadFromServer = React.useCallback(async () => {
        clearFeedback();
        setLoadState({loading: true});
        try {
            const remoteSettings = await fetchLLMSettingsFromServer();
            const normalized = normalizeSettings(remoteSettings);
            setServerLLMSettingsSnapshot(normalized);
            const hadLocalData = hasAnyContent(localSnapshotRef.current);
            if (!hadLocalData) {
                replaceLLMSettings(normalized);
                localSnapshotRef.current = normalized;
            }
            serverSnapshotRef.current = normalized;
            const hasCopy = hasAnyContent(normalized);
            const matchesLocal = settingsEqual(normalized, localSnapshotRef.current);
            applyBaseline(normalized, {
                local: matchesLocal,
                server: hasCopy
            });
            showFeedback('success', messages.loadedFromServer);
        } catch (error) {
            showFeedback(
                'error',
                messages.errorLoading,
                {error: error && error.message ? ` (${error.message})` : ''}
            );
        } finally {
            setLoadState({loading: false});
        }
    }, [applyBaseline, clearFeedback, replaceLLMSettings, setServerLLMSettingsSnapshot, showFeedback]);

    React.useEffect(() => {
        if (shouldLoadFromServerRef.current) {
            shouldLoadFromServerRef.current = false;
            loadFromServer();
        }
    }, [loadFromServer]);

    const hasLocalData = hasAnyContent(localSnapshotRef.current);
    const hasServerData = hasAnyContent(serverSnapshotRef.current);
    const localIndicator = syncState.local && hasLocalData;
    const serverIndicator = syncState.server && hasServerData;

    const statusDescriptor = React.useMemo(() => {
        if (localIndicator && serverIndicator) return messages.statusBoth;
        if (serverIndicator) return messages.statusServer;
        if (localIndicator) return messages.statusLocal;
        return messages.statusUnsaved;
    }, [localIndicator, serverIndicator]);

    const statusBadgeClassName = React.useMemo(() => classNames(
        styles.statusBadge,
        {
            [styles.statusBoth]: localIndicator && serverIndicator,
            [styles.statusServer]: !localIndicator && serverIndicator,
            [styles.statusLocal]: localIndicator && !serverIndicator,
            [styles.statusUnsaved]: !localIndicator && !serverIndicator
        }
    ), [localIndicator, serverIndicator]);

    const isBusy = loadState.loading || serverSaveState.saving;
    const saveLocallyDisabled = isBusy;
    const saveToServerDisabled = isBusy;
    const saveGloballyDisabled = isBusy;
    const loadLocalDisabled = !hasLocalData || isBusy;

    const loadButtonLabel = loadState.loading ? messages.loadingFromServer : messages.loadFromServer;
    const saveToServerLabel = serverSaveState.saving && serverSaveState.mode === 'server'
        ? messages.savingToServer
        : messages.saveToServer;
    const saveGloballyLabel = serverSaveState.saving && serverSaveState.mode === 'global'
        ? messages.savingGlobally
        : messages.saveGlobally;

    return (
        <Modal
            className={styles.modalContent}
            contentLabel={<FormattedMessage {...messages.title} />}
            isRtl={isRtl}
            onRequestClose={handleClose}
        >
            <div className={styles.body}>
                <p className={styles.description}>
                    <FormattedMessage {...messages.description} />
                </p>

                <div className={styles.sourceRow}>
                    <span className={styles.sourceLabel}>
                        <FormattedMessage {...messages.sourceLabel} />
                    </span>
                    <label className={styles.sourceOption}>
                        <input
                            className={styles.sourceRadio}
                            type="radio"
                            name="llm-settings-source"
                            value="local"
                            checked={activeSource === 'local'}
                            onChange={handleSourceChange}
                        />
                        <span>
                            <FormattedMessage {...messages.sourceLocal} />
                        </span>
                    </label>
                    <label className={styles.sourceOption}>
                        <input
                            className={styles.sourceRadio}
                            type="radio"
                            name="llm-settings-source"
                            value="server"
                            checked={activeSource === 'server'}
                            onChange={handleSourceChange}
                        />
                        <span>
                            <FormattedMessage {...messages.sourceServer} />
                        </span>
                    </label>
                </div>

                <div className={styles.statusRow}>
                    <span className={styles.statusLabel}>
                        <FormattedMessage {...messages.statusLabel} />
                    </span>
                    <span className={statusBadgeClassName}>
                        <FormattedMessage {...statusDescriptor} />
                    </span>
                </div>

                {feedback ? (
                    <div
                        className={classNames(
                            styles.feedback,
                            feedback.type === 'error' ? styles.feedbackError : styles.feedbackSuccess
                        )}
                    >
                        <FormattedMessage
                            {...feedback.descriptor}
                            values={feedback.values}
                        />
                    </div>
                ) : null}

                <div className={styles.fields}>
                    {fields.map(field => (
                        <label key={field.key} className={styles.fieldGroup}>
                            <span className={styles.label}>
                                <FormattedMessage {...field.label} />
                            </span>
                            <textarea
                                className={styles.textarea}
                                value={formValues[field.key]}
                                onChange={handleFieldChange(field.key)}
                                placeholder={intl.formatMessage(field.placeholder)}
                                rows={4}
                            />
                        </label>
                    ))}
                </div>
                <div className={styles.actions}>
                    <div className={styles.primaryActions}>
                        <button
                            type="button"
                            className={classNames(styles.button, styles.secondaryButton)}
                            onClick={loadFromServer}
                            disabled={isBusy}
                        >
                            <FormattedMessage {...loadButtonLabel} />
                        </button>
                        <button
                            type="button"
                            className={classNames(styles.button, styles.secondaryButton)}
                            onClick={handleLoadLocal}
                            disabled={loadLocalDisabled}
                        >
                            <FormattedMessage {...messages.loadLocal} />
                        </button>
                        <button
                            type="button"
                            className={classNames(styles.button, styles.secondaryButton)}
                            onClick={handleSaveLocally}
                            disabled={saveLocallyDisabled}
                        >
                            <FormattedMessage {...messages.saveLocally} />
                        </button>
                        <button
                            type="button"
                            className={classNames(styles.button, styles.secondaryButton)}
                            onClick={handleSaveToServer}
                            disabled={saveToServerDisabled}
                        >
                            <FormattedMessage {...saveToServerLabel} />
                        </button>
                        <button
                            type="button"
                            className={classNames(styles.button, styles.primaryButton)}
                            onClick={handleSaveGlobally}
                            disabled={saveGloballyDisabled}
                        >
                            <FormattedMessage {...saveGloballyLabel} />
                        </button>
                    </div>
                    <button
                        type="button"
                        className={classNames(styles.button, styles.secondaryButton)}
                        onClick={handleClose}
                    >
                        <FormattedMessage {...messages.close} />
                    </button>
                </div>
            </div>
        </Modal>
    );
};

LLMSettingsModal.propTypes = {
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired
};

export default injectIntl(LLMSettingsModal);
