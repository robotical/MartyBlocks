import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, intlShape, injectIntl } from 'react-intl';

import styles from './talk-with-marty.css';
import LoadingSpinnerMarty from './marty-is-thinking-svg.jsx';
import SpeakingMarty from './marty-is-speaking-svg.jsx';
import TalkWithMartySettingsPanel from './settings-panel/talk-with-marty-settings-panel.jsx';

const serverUrl = 'https://eth-server.appv2-analytics-server.robotical.io';
// const serverUrl = 'http://localhost:4444';

const messages = defineMessages({
    interactionTypeTitle: {
        id: 'talkWithMarty.interactionTypeTitle',
        defaultMessage: 'Interaction Type'
    },
    conversationModeConversation: {
        id: 'talkWithMarty.conversationModeConversation',
        defaultMessage: 'Conversation'
    },
    conversationModeConversationDescription: {
        id: 'talkWithMarty.conversationModeConversationDescription',
        defaultMessage: 'Marty keeps context for multi-turn conversations.'
    },
    conversationModeQA: {
        id: 'talkWithMarty.conversationModeQa',
        defaultMessage: 'Q&A'
    },
    conversationModeQADescription: {
        id: 'talkWithMarty.conversationModeQaDescription',
        defaultMessage: 'Single question and response — no memory between turns.'
    },
    interactionParametersTitle: {
        id: 'talkWithMarty.interactionParametersTitle',
        defaultMessage: 'Interaction Parameters'
    },
    interactionModePushToTalk: {
        id: 'talkWithMarty.interactionModePushToTalk',
        defaultMessage: 'Push-to-Talk'
    },
    interactionModePushToTalkDescription: {
        id: 'talkWithMarty.interactionModePushToTalkDescription',
        defaultMessage: 'Choose the key each user will press to talk. Hold the key while speaking.'
    },
    interactionModeWakeWords: {
        id: 'talkWithMarty.interactionModeWakeWords',
        defaultMessage: 'Wake Words'
    },
    interactionModeWakeWordsDescription: {
        id: 'talkWithMarty.interactionModeWakeWordsDescription',
        defaultMessage: 'Say "Hey Marty" to start and "I am done" to finish.'
    },
    listeningStart: {
        id: 'talkWithMarty.listeningStart',
        defaultMessage: 'Start Listening'
    },
    listeningStop: {
        id: 'talkWithMarty.listeningStop',
        defaultMessage: 'Stop Listening'
    },
    wakeWordHint: {
        id: 'talkWithMarty.wakeWordHint',
        defaultMessage: 'Marty will automatically listen for "Hey Marty" and pause when you say "I am done".'
    },
    transcriptTitle: {
        id: 'talkWithMarty.transcriptTitle',
        defaultMessage: 'Transcript'
    },
    transcriptEmpty: {
        id: 'talkWithMarty.transcriptEmpty',
        defaultMessage: 'No messages yet. Start the conversation to see it here.'
    },
    transcriptDownload: {
        id: 'talkWithMarty.transcriptDownload',
        defaultMessage: 'Download Transcript'
    },
    transcriptClear: {
        id: 'talkWithMarty.transcriptClear',
        defaultMessage: 'Clear Transcript'
    },
    sendMessageLabel: {
        id: 'talkWithMarty.sendMessageLabel',
        defaultMessage: 'Message'
    },
    sendMessagePlaceholder: {
        id: 'talkWithMarty.sendMessagePlaceholder',
        defaultMessage: 'Type what you would like to say to Marty...'
    },
    sendMessageButton: {
        id: 'talkWithMarty.sendMessageButton',
        defaultMessage: 'Send'
    },
    llmSettingsTitle: {
        id: 'talkWithMarty.llmSettingsTitle',
        defaultMessage: 'LLM Settings'
    },
    settingSafeguards: {
        id: 'talkWithMarty.settingSafeguards',
        defaultMessage: 'Safeguards'
    },
    safeguardsPlaceholder: {
        id: 'talkWithMarty.safeguardsPlaceholder',
        defaultMessage: 'Safety rules or restricted topics'
    },
    settingInstructions: {
        id: 'talkWithMarty.settingInstructions',
        defaultMessage: 'Instructions'
    },
    instructionsPlaceholder: {
        id: 'talkWithMarty.instructionsPlaceholder',
        defaultMessage: 'Guidance for how Marty should respond'
    },
    transcriptLabelUser: {
        id: 'talkWithMarty.transcriptLabelUser',
        defaultMessage: 'You'
    },
    transcriptLabelMarty: {
        id: 'talkWithMarty.transcriptLabelMarty',
        defaultMessage: 'Marty'
    },
    recordingIndicator: {
        id: 'talkWithMarty.recordingIndicator',
        defaultMessage: 'Recording…'
    },
    recordingUnsupported: {
        id: 'talkWithMarty.recordingUnsupported',
        defaultMessage: 'Audio recording is not supported in this browser.'
    },
    recordingPermissionDenied: {
        id: 'talkWithMarty.recordingPermissionDenied',
        defaultMessage: 'Microphone permission was denied. Please enable access to continue.'
    },
    recordingDeviceNotFound: {
        id: 'talkWithMarty.recordingDeviceNotFound',
        defaultMessage: 'No microphone was found. Connect a mic and try again.'
    },
    recordingGenericError: {
        id: 'talkWithMarty.recordingGenericError',
        defaultMessage: 'Something went wrong while recording audio. Try pressing the key longer.'
    },
    lastRecordingLabel: {
        id: 'talkWithMarty.lastRecordingLabel',
        defaultMessage: 'Last recording'
    },
    processingRecording: {
        id: 'talkWithMarty.processingRecording',
        defaultMessage: 'Processing recording…'
    },
    speechRequestFailed: {
        id: 'talkWithMarty.speechRequestFailed',
        defaultMessage: 'Could not process the recording. Try pressing the key longer.'
    },
    textRequestFailed: {
        id: 'talkWithMarty.textRequestFailed',
        defaultMessage: 'Could not send message. Please try again.'
    },
    thinkingIndicator: {
        id: 'talkWithMarty.thinkingIndicator',
        defaultMessage: 'Thinking…'
    },
    speakingIndicator: {
        id: 'talkWithMarty.speakingIndicator',
        defaultMessage: 'Speaking…'
    },
    activityOverlayLabel: {
        id: 'talkWithMarty.activityOverlayLabel',
        defaultMessage: 'Marty is responding'
    },
    currentSpeakerLabel: {
        id: 'talkWithMarty.currentSpeakerLabel',
        defaultMessage: 'Current Speaker'
    },
    usersSettingsTitle: {
        id: 'talkWithMarty.usersSettingsTitle',
        defaultMessage: 'Participants'
    },
    usersSettingsDescription: {
        id: 'talkWithMarty.usersSettingsDescription',
        defaultMessage: 'Key'
    },
    addUserPlaceholder: {
        id: 'talkWithMarty.addUserPlaceholder',
        defaultMessage: 'New participant name'
    },
    addUserButton: {
        id: 'talkWithMarty.addUserButton',
        defaultMessage: 'Add'
    },
    removeUserButton: {
        id: 'talkWithMarty.removeUserButton',
        defaultMessage: 'Remove'
    },
});

const AVAILABLE_USER_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const DEFAULT_USER_KEY = AVAILABLE_USER_KEYS[0];

// Added: storage key
const TRANSCRIPT_STORAGE_KEY = 'talkWithMartyTranscript';

class TalkWithMarty extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            conversationMode: 'conversation',
            interactionMode: 'pushToTalk',
            isListening: false,
            transcript: [],
            currentMessage: '',
            llmSettings: {
                safeguards: '',
                instructions: ''
            },
            isMicLoading: false,
            recordingError: null,
            lastRecordingUrl: '',
            isProcessingAudio: false,
            isSendingText: false,
            messageError: null,
            isThinking: false,
            isSpeaking: false,
            isSettingsOpen: false,
            users: [{ name: 'You', key: DEFAULT_USER_KEY }],
            currentUser: 'You',
            newUserName: '',
            newUserKey: AVAILABLE_USER_KEYS.find(key => key !== DEFAULT_USER_KEY) || '',
            editingUser: {}
        };
        this.handleConversationModeChange = this.handleConversationModeChange.bind(this);
        this.handleInteractionModeChange = this.handleInteractionModeChange.bind(this);
        this.handleToggleListening = this.handleToggleListening.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleDownloadTranscript = this.handleDownloadTranscript.bind(this);
        this.handleSettingsChange = this.handleSettingsChange.bind(this);
        this.handleClearTranscript = this.handleClearTranscript.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.ensureMediaStream = this.ensureMediaStream.bind(this);
        this.handleAudioChunk = this.handleAudioChunk.bind(this);
        this.handleRecorderStop = this.handleRecorderStop.bind(this);
        this.handleRecordingError = this.handleRecordingError.bind(this);
        this.disposeMedia = this.disposeMedia.bind(this);
        this.processRecording = this.processRecording.bind(this);
        this.buildWhisperFormData = this.buildWhisperFormData.bind(this);
        this.getExtensionFromMime = this.getExtensionFromMime.bind(this);
        this.buildConversationHistory = this.buildConversationHistory.bind(this);
        this.buildLLMSettingsForRequest = this.buildLLMSettingsForRequest.bind(this);
        this.shouldIncludeSpeech = this.shouldIncludeSpeech.bind(this);
        this.buildSpeechRequestPayload = this.buildSpeechRequestPayload.bind(this);
        this.sendSpeechRequest = this.sendSpeechRequest.bind(this);
        this.applySpeechResponse = this.applySpeechResponse.bind(this);
        this.createTranscriptEntry = this.createTranscriptEntry.bind(this);
        this.appendTranscriptEntries = this.appendTranscriptEntries.bind(this);
        this.buildTextRequestPayload = this.buildTextRequestPayload.bind(this);
        this.sendTextRequest = this.sendTextRequest.bind(this);
        this.handleSpeechAudioResult = this.handleSpeechAudioResult.bind(this);
        this.postJson = this.postJson.bind(this);
        this.toggleSettingsPanel = this.toggleSettingsPanel.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleRemoveUser = this.handleRemoveUser.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
        this.handleUpdateUserKey = this.handleUpdateUserKey.bind(this);
        this.handleSetCurrentUser = this.handleSetCurrentUser.bind(this);
        this.handleEditUser = this.handleEditUser.bind(this);
        this.handleGlobalKeyDown = this.handleGlobalKeyDown.bind(this);
        this.handleGlobalKeyUp = this.handleGlobalKeyUp.bind(this);
        this.handleWindowBlur = this.handleWindowBlur.bind(this);

        this.mediaStream = null;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.isComponentMounted = false;
        this.mediaSupportAvailable = typeof window !== 'undefined' && typeof window.MediaRecorder !== 'undefined';
        this.martySpeechUrl = '';
        this.activeUserKey = null;
    }

    componentDidMount() {
        this.isComponentMounted = true;
        // Load persisted transcript (if any)
        this.loadTranscriptFromStorage();
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', this.handleGlobalKeyDown);
            window.addEventListener('keyup', this.handleGlobalKeyUp);
            window.addEventListener('blur', this.handleWindowBlur);
        }
    }

    componentWillUnmount() {
        this.isComponentMounted = false;
        this.disposeMedia();
        if (this.state.lastRecordingUrl) {
            const urlCreator = window.URL || window.webkitURL;
            if (urlCreator) {
                urlCreator.revokeObjectURL(this.state.lastRecordingUrl);
            }
        }
        if (this.martySpeechUrl) {
            const urlCreator = window.URL || window.webkitURL;
            if (urlCreator) {
                urlCreator.revokeObjectURL(this.martySpeechUrl);
            }
            this.martySpeechUrl = '';
        }
        if (typeof window !== 'undefined') {
            window.removeEventListener('keydown', this.handleGlobalKeyDown);
            window.removeEventListener('keyup', this.handleGlobalKeyUp);
            window.removeEventListener('blur', this.handleWindowBlur);
        }
    }

    // Added: persist helpers
    loadTranscriptFromStorage() {
        if (typeof window === 'undefined' || !window.localStorage) return;
        try {
            const stored = window.localStorage.getItem(TRANSCRIPT_STORAGE_KEY);
            if (!stored) return;
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                this.setState({ transcript: parsed });
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn('[TalkWithMarty] Failed to load stored transcript', e);
        }
    }

    saveTranscriptToStorage() {
        if (typeof window === 'undefined' || !window.localStorage) return;
        try {
            window.localStorage.setItem(
                TRANSCRIPT_STORAGE_KEY,
                JSON.stringify(this.state.transcript)
            );
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn('[TalkWithMarty] Failed to save transcript', e);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.transcript !== this.state.transcript) {
            this.saveTranscriptToStorage();
        }
        if (prevState.users !== this.state.users) {
            const availableKeys = this.getAvailableKeys();
            if (this.state.newUserKey && !availableKeys.includes(this.state.newUserKey)) {
                this.setState({ newUserKey: availableKeys[0] || '' });
            } else if (!this.state.newUserKey && availableKeys.length) {
                this.setState({ newUserKey: availableKeys[0] });
            }
        }
    }

    handleConversationModeChange(mode) {
        if (mode === this.state.conversationMode) return;

        this.setState({ conversationMode: mode });
        // Placeholder for future integration
        // eslint-disable-next-line no-console
        console.log('[TalkWithMarty] Conversation mode changed:', mode);
    }

    handleInteractionModeChange(mode) {
        if (mode === this.state.interactionMode) return;

        const shouldResetListening = mode !== 'pushToTalk' && this.state.isListening;

        this.setState(({ isListening }) => ({
            interactionMode: mode,
            isListening: shouldResetListening ? false : isListening
        }));

        if (shouldResetListening) {
            this.stopRecording();
        }

        // Placeholder for future integration
        // eslint-disable-next-line no-console
        console.log('[TalkWithMarty] Interaction mode changed:', mode);
    }

    handleToggleListening() {
        if (this.state.isMicLoading || this.state.isProcessingAudio) {
            return;
        }

        if (this.state.isListening) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    }

    handleMessageChange(event) {
        this.setState({ currentMessage: event.target.value, messageError: null });
    }

    handleSendMessage(event) {
        if (event) {
            event.preventDefault();
        }

        const trimmedMessage = this.state.currentMessage.trim();
        if (!trimmedMessage) return;

        const timestamp = new Date().toISOString();
        const nextEntry = {
            id: `${timestamp}-user`,
            sender: 'user',
            displayName: this.state.currentUser,
            text: trimmedMessage,
            timestamp
        };

        this.setState(prevState => ({
            transcript: [...prevState.transcript, nextEntry],
            currentMessage: '',
            messageError: null,
            isSendingText: true,
            isThinking: true
        }), () => {
            try { martyIsThinking(); } catch (_) { }
            this.sendTextRequest(trimmedMessage)
                .catch(error => {
                    // eslint-disable-next-line no-console
                    console.error('[TalkWithMarty] Text request failed', error);
                    if (this.isComponentMounted) {
                        this.setState({
                            messageError: this.props.intl.formatMessage(messages.textRequestFailed)
                        });
                    }
                })
                .finally(() => {
                    if (this.isComponentMounted) {
                        this.setState({ isSendingText: false, isThinking: false });
                    }
                });
        });
    }

    handleDownloadTranscript() {
        const { transcript } = this.state;
        if (!transcript.length) return;

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `marty-transcript-${timestamp}.json`;
        const fileContents = JSON.stringify(transcript, null, 2);
        const blob = new Blob([fileContents], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        // Placeholder for future integration
        // eslint-disable-next-line no-console
        console.log('[TalkWithMarty] Download transcript', fileName);
    }

    handleSettingsChange(settingKey, value) {
        this.setState(prevState => ({
            llmSettings: {
                ...prevState.llmSettings,
                [settingKey]: value
            }
        }));

        // Placeholder for future integration
        // eslint-disable-next-line no-console
        console.log('[TalkWithMarty] Setting updated:', settingKey, value);
    }

    handleClearTranscript() {
        // confirm before clearing
        const confirmed = window.confirm(this.props.intl.formatMessage(messages.transcriptClear) + '?');
        if (!confirmed) return;

        // revoke any existing object URLs
        if (this.state.lastRecordingUrl) {
            const urlCreator = window.URL || window.webkitURL;
            if (urlCreator) {
                urlCreator.revokeObjectURL(this.state.lastRecordingUrl);
            }
        }

        if (this.martySpeechUrl) {
            const urlCreator = window.URL || window.webkitURL;
            if (urlCreator) {
                urlCreator.revokeObjectURL(this.martySpeechUrl);
            }
            this.martySpeechUrl = '';
        }

        // also remove persisted transcript
        if (typeof window !== 'undefined' && window.localStorage) {
            try { window.localStorage.removeItem(TRANSCRIPT_STORAGE_KEY); } catch (_) { }
        }
        this.setState({
            transcript: [],
            lastRecordingUrl: '',
            recordingError: null,
            messageError: null
        }, () => {
            // eslint-disable-next-line no-console
            console.log('[TalkWithMarty] Transcript cleared');
        });
    }

    async ensureMediaStream() {
        if (!this.mediaSupportAvailable) {
            throw new Error(this.props.intl.formatMessage(messages.recordingUnsupported));
        }
        if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error(this.props.intl.formatMessage(messages.recordingUnsupported));
        }
        if (this.mediaStream) {
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaStream = stream;
        } catch (error) {
            throw error;
        }
    }

    async startRecording() {
        if (this.state.isListening || this.state.isMicLoading) {
            return;
        }

        if (!this.mediaSupportAvailable) {
            this.setState({ recordingError: this.props.intl.formatMessage(messages.recordingUnsupported) });
            return;
        }

        this.setState({ isMicLoading: true, recordingError: null, isProcessingAudio: false });

        try {
            await this.ensureMediaStream();
            if (!this.mediaStream) {
                throw new Error(this.props.intl.formatMessage(messages.recordingGenericError));
            }

            this.audioChunks = [];
            if (this.mediaRecorder) {
                this.mediaRecorder.removeEventListener('dataavailable', this.handleAudioChunk);
                this.mediaRecorder.removeEventListener('stop', this.handleRecorderStop);
            }

            const recorder = new window.MediaRecorder(this.mediaStream);
            recorder.addEventListener('dataavailable', this.handleAudioChunk);
            recorder.addEventListener('stop', this.handleRecorderStop);
            this.mediaRecorder = recorder;
            recorder.start();

            if (this.isComponentMounted) {
                this.setState({ isListening: true, isMicLoading: false, isSpeaking: false });
            }
            try { martyIsListening(); } catch (_) { }

            // Placeholder for future integration
            // eslint-disable-next-line no-console
            console.log('[TalkWithMarty] Recording started');
        } catch (error) {
            this.handleRecordingError(error);
        }
    }

    async stopRecording() {
        this.activeUserKey = null;
        if (this.state.isMicLoading) {
            // try again in 1 second
            console.log("stopRecording delayed");
            setTimeout(this.stopRecording, 1000);
            return;
        }

        if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
            if (this.isComponentMounted) {
                this.setState({ isListening: false });
            }
            return;
        }

        if (this.isComponentMounted) {
            this.setState({ isListening: false, isMicLoading: true });
        }

        try {
            this.mediaRecorder.stop();

            // Placeholder for future integration
            // eslint-disable-next-line no-console
            console.log('[TalkWithMarty] Recording stopped');
        } catch (error) {
            this.handleRecordingError(error);
        }
    }

    handleAudioChunk(event) {
        if (event.data && event.data.size > 0) {
            this.audioChunks.push(event.data);
        }
    }

    handleRecorderStop() {
        const blob = this.audioChunks.length
            ? new Blob(this.audioChunks, { type: (this.mediaRecorder && this.mediaRecorder.mimeType) || 'audio/webm' })
            : null;

        this.audioChunks = [];

        if (blob) {
            const urlCreator = window.URL || window.webkitURL;
            const url = urlCreator ? urlCreator.createObjectURL(blob) : '';
            if (this.state.lastRecordingUrl) {
                const existingUrlCreator = window.URL || window.webkitURL;
                if (existingUrlCreator) {
                    existingUrlCreator.revokeObjectURL(this.state.lastRecordingUrl);
                }
            }
            if (this.isComponentMounted) {
                const stateUpdates = {
                    recordingError: null,
                    isMicLoading: false
                };
                if (url) {
                    stateUpdates.lastRecordingUrl = url;
                }
                this.setState(stateUpdates);
            }

            // Placeholder for future integration
            // eslint-disable-next-line no-console
            console.log('[TalkWithMarty] Recorded audio clip', {
                size: blob.size,
                type: blob.type,
                url
            });
        } else if (this.isComponentMounted) {
            this.setState({ isMicLoading: false });
        }

        this.disposeMedia();

        if (blob) {
            this.processRecording(blob);
        }
    }

    handleRecordingError(error) {
        const { intl } = this.props;
        let message = intl.formatMessage(messages.recordingGenericError);
        if (error && error.name) {
            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                message = intl.formatMessage(messages.recordingPermissionDenied);
            } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                message = intl.formatMessage(messages.recordingDeviceNotFound);
            } else if (error.message === intl.formatMessage(messages.recordingUnsupported)) {
                message = error.message;
            }
        } else if (typeof error === 'string') {
            message = error;
        }

        // Placeholder for future integration
        // eslint-disable-next-line no-console
        console.error('[TalkWithMarty] Recording error', error);

        if (this.isComponentMounted) {
            this.setState({
                recordingError: message,
                isListening: false,
                isMicLoading: false,
                isProcessingAudio: false
            });
        }

        this.activeUserKey = null;
        this.disposeMedia();
    }

    async processRecording(blob) {
        // capture user at start of processing for speech attribution
        this.pendingSpeechUserName = this.state.currentUser;

        if (!blob) {
            return;
        }

        if (this.isComponentMounted) {
            this.setState({ isProcessingAudio: true, isThinking: false });
        }

        try {
            const mimeType = blob.type || 'audio/webm';
            const extension = this.getExtensionFromMime(mimeType);
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const fileName = `talk-with-marty-${timestamp}.${extension}`;
            const arrayBuffer = await blob.arrayBuffer();
            const payload = {
                blob,
                fileName,
                mimeType,
                size: blob.size,
                arrayBuffer,
                formData: this.buildWhisperFormData(blob, fileName)
            };

            if (this.props.onAudioCaptured) {
                await this.props.onAudioCaptured(payload);
            }

            const requestPayload = this.buildSpeechRequestPayload(arrayBuffer, mimeType);
            if (this.isComponentMounted) {
                this.setState({ isThinking: true });
            }
            try { martyIsThinking(); } catch (_) { }
            const response = await this.sendSpeechRequest(requestPayload);
            if (this.isComponentMounted) {
                this.setState({ isThinking: false });
            }
            this.applySpeechResponse(response);
            if (response && response.speech) {
                this.handleSpeechAudioResult(response.speech.audio);
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('[TalkWithMarty] Error processing recording', error);
            if (this.isComponentMounted) {
                this.setState({
                    recordingError: this.props.intl.formatMessage(messages.speechRequestFailed)
                });
            }
        } finally {
            if (this.isComponentMounted) {
                this.setState({ isProcessingAudio: false, isThinking: false });
            }
        }
    }

    buildWhisperFormData(blob, fileName) {
        if (typeof FormData === 'undefined') {
            return null;
        }

        const formData = new FormData();
        formData.append('file', blob, fileName);
        formData.append('model', 'whisper-1');
        formData.append('response_format', 'json');

        return formData;
    }

    getExtensionFromMime(mimeType) {
        if (!mimeType) {
            return 'webm';
        }
        const normalized = mimeType.split(';')[0];
        if (normalized === 'audio/webm' || normalized === 'audio/webm;codecs=opus') {
            return 'webm';
        }
        if (normalized === 'audio/ogg') {
            return 'ogg';
        }
        if (normalized === 'audio/wav' || normalized === 'audio/x-wav') {
            return 'wav';
        }
        if (normalized === 'audio/mpeg') {
            return 'mp3';
        }
        if (normalized === 'audio/mp4' || normalized === 'audio/m4a') {
            return 'm4a';
        }
        const parts = normalized.split('/');
        return parts.length > 1 ? parts[1] : 'webm';
    }

    buildConversationHistory() {
        if (this.state.conversationMode === 'qa') {
            return [];
        }

        return this.state.transcript.map(entry => ({
            role: entry.sender === 'marty' ? 'assistant' : 'user',
            content: entry.sender === 'user' && entry.displayName
                ? `${entry.displayName}: ${entry.text}`
                : entry.text,
            timestamp: entry.timestamp
        }));
    }

    async sendTextRequest(message) {
        try {
            const payload = this.buildTextRequestPayload(message);
            const response = await this.postJson(`${serverUrl}/talkWithMarty/talk-with-marty-using-text`, payload);
            // thinking done once response received
            if (this.isComponentMounted) {
                this.setState({ isThinking: false });
            }
            if (response && response.llm && response.llm.text) {
                this.appendTranscriptEntries([
                    this.createTranscriptEntry('marty', response.llm.text, response.llm.timestamp, { raw: response.llm.raw })
                ]);
            }
            console.log('[TalkWithMarty] speech response', response);
            if (response && response.speech) {
                await this.handleSpeechAudioResult(response.speech.audio);
            } else {
                if (this.isComponentMounted) {
                    this.setState({ isSpeaking: false });
                }
                try { martyStopsTalking(); } catch (_) { }
            }
        } catch (error) {
            if (this.isComponentMounted) {
                this.setState({ isThinking: false, isSpeaking: false });
            }
            throw error;
        }
    }

    async handleSpeechAudioResult(audioData) {
        if (!audioData) {
            return;
        }

        let uint8Array = null;

        if (audioData instanceof ArrayBuffer) {
            uint8Array = new Uint8Array(audioData);
        } else if (Array.isArray(audioData)) {
            uint8Array = new Uint8Array(audioData);
        } else if (audioData && typeof audioData === 'object' && Array.isArray(audioData.data)) {
            uint8Array = new Uint8Array(audioData.data);
        } else if (typeof audioData === 'string') {
            try {
                const binaryString = atob(audioData);
                const length = binaryString.length;
                const bytes = new Uint8Array(length);
                for (let i = 0; i < length; i += 1) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                uint8Array = bytes;
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('[TalkWithMarty] Failed to decode speech audio result', error);
                return;
            }
        }

        if (!uint8Array) {
            console.warn('[TalkWithMarty] Unable to process speech audio result: unrecognized format');
            return;
        }
        const playMarty = async () => {
            // stream to marty
            console.log('[TalkWithMarty] Streaming audio to Marty');

            const targetId = window.vm && window.vm.runtime && window.vm.runtime._editingTarget.id;
            if (!targetId) {
                console.warn('[TalkWithMarty] Unable to stream audio to Marty: target ID not found');
                return;
            }
            const connectedRaft = getRaftUsingTargetId(targetId);
            if (!connectedRaft || !connectedRaft.streamAudio) {
                console.warn('[TalkWithMarty] Unable to stream audio to Marty: raft connection not found');
                return;
            }

            // 1) Ensure we have a Uint8Array of the audio bytes (you already built uint8Array above)
            const bytes = uint8Array;

            // 2) Decode to AudioBuffer to get duration (works for MP3/WAV/WEBM/etc)
            const audioCtx = window.__twAudioCtx || new (window.AudioContext || window.webkitAudioContext)();
            window.__twAudioCtx = audioCtx;
            // In some browsers the context is suspended until a user gesture:
            if (audioCtx.state === 'suspended') { try { await audioCtx.resume(); } catch (_) { } }

            let audioBuffer;
            try {
                // slice(0) to pass a detached copy the decoder accepts
                audioBuffer = await audioCtx.decodeAudioData(bytes.buffer.slice(0));
            } catch (e) {
                console.error('[TalkWithMarty] decodeAudioData failed; cannot derive duration', e);
                return;
            }

            const durationSeconds = audioBuffer.duration;
            // 3A) If you ALREADY have MP3 bytes (e.g., response is MP3):
            // -> stream the raw MP3 bytes directly
            // connectedRaft.streamAudio(bytes, false, durationSeconds);
            // return;

            // 3B) If you need to CONVERT to MP3 using the Scratch helpers:
            // NOTE: convertSoundToMP3 expects an AudioBuffer, not ArrayBuffer.
            const mp3SoundBuffers = window.Scratch3Mv2Blocks.convertSoundToMP3(audioBuffer);
            const mp3SoundData = window.Scratch3Mv2Blocks.convertMp3BufferToData(mp3SoundBuffers);

            // If streamAudio wants Uint8Array, pass mp3SoundData.
            // If it wants ArrayBuffer, pass mp3SoundData.buffer.
            connectedRaft.streamAudio(mp3SoundData, false, durationSeconds * 1000);
            // return;
        }
        window.playMarty = playMarty;
        await playMarty().catch(error => {
            console.error('[TalkWithMarty] Error playing audio', error);
        });
        console.log("after playMarty");
        return;

        const urlCreator = window.URL || window.webkitURL;
        if (!urlCreator) {
            return;
        }

        if (this.martySpeechUrl) {
            urlCreator.revokeObjectURL(this.martySpeechUrl);
        }

        const blob = new Blob([uint8Array.buffer], { type: 'audio/mpeg' });
        this.martySpeechUrl = urlCreator.createObjectURL(blob);

        const audio = new Audio(this.martySpeechUrl);
        audio.onplay = () => {
            if (this.isComponentMounted) {
                this.setState({ isSpeaking: true });
            }
            try { martyStartsTalking(); } catch (_) { }
        };
        audio.onended = () => {
            if (this.isComponentMounted) {
                this.setState({ isSpeaking: false });
            }
            try { martyStopsTalking(); } catch (_) { }
        };
        audio.play().catch(error => {
            // eslint-disable-next-line no-console
            console.warn('[TalkWithMarty] Unable to autoplay Marty response audio', error);
            if (this.isComponentMounted) {
                this.setState({ isSpeaking: false });
            }
            try { martyStopsTalking(); } catch (_) { }
        });
    }


    buildLLMSettingsForRequest() {
        const {
            safeguards,
            instructions,
        } = this.state.llmSettings;

        const settings = {};
        if (instructions) {
            settings.instructions = instructions;
        }
        if (safeguards) {
            settings.safeguards = { notes: safeguards };
        }
        return {
            ...settings,
            userName: this.state.currentUser
        };
    }

    shouldIncludeSpeech() {
        return true;
        return Boolean(this.state.llmSettings.personalityVoice && this.state.llmSettings.personalityVoice.trim());
    }

    buildSpeechRequestPayload(arrayBuffer, mimeType) {
        const includeSpeech = this.shouldIncludeSpeech();
        const payload = {
            audioBuffer: Array.from(new Uint8Array(arrayBuffer)),
            stt: {
                provider: 'openai-whisper',
                config: { mimeType }
            },
            llm: {
                provider: 'openai',
                conversationHistory: this.buildConversationHistory(),
                settings: this.buildLLMSettingsForRequest()
            },
            includeSpeech,
            includeTranscript: true,
            userName: this.state.currentUser
        };

        if (includeSpeech) {
            payload.tts = {
                provider: 'azure'
                // removed voice options (personalityVoice no longer exists)
            };
        }
        return payload;
    }

    buildTextRequestPayload(message) {
        const includeSpeech = this.shouldIncludeSpeech();
        const payload = {
            text: message,
            llm: {
                provider: 'openai',
                conversationHistory: this.buildConversationHistory(),
                settings: this.buildLLMSettingsForRequest()
            },
            includeSpeech,
            userName: this.state.currentUser
        };
        if (includeSpeech) {
            payload.tts = {
                provider: 'azure'
            };
        }
        return payload;
    }

    async sendSpeechRequest(payload) {
        return this.postJson(`${serverUrl}/talkWithMarty/talk-with-marty-using-speech`, payload);
    }

    applySpeechResponse(response, forcedUserName) {
        if (!response) return;
        const userName = forcedUserName || this.pendingSpeechUserName || this.state.currentUser;
        const entriesToAdd = [];
        if (response.transcript && response.transcript.text) {
            entriesToAdd.push(this.createTranscriptEntry(
                'user',
                response.transcript.text,
                response.transcript.timestamp,
                { raw: response.transcript.raw },
                userName
            ));
        }
        if (response.llm && response.llm.text) {
            entriesToAdd.push(this.createTranscriptEntry(
                'marty',
                response.llm.text,
                response.llm.timestamp,
                { raw: response.llm.raw }
            ));
        }
        if (entriesToAdd.length) this.appendTranscriptEntries(entriesToAdd);
    }

    createTranscriptEntry(sender, text, timestamp, metadata, displayName) {
        const entryTimestamp = timestamp || new Date().toISOString();
        const uniqueSuffix = Math.random().toString(16).slice(2, 8);
        const entry = {
            id: `${entryTimestamp}-${sender}-${uniqueSuffix}`,
            sender,
            text,
            timestamp: entryTimestamp
        };
        if (displayName && sender === 'user') {
            entry.displayName = displayName;
        }
        if (metadata) entry.metadata = metadata;
        return entry;
    }

    appendTranscriptEntries(entries) {
        if (!entries || !entries.length) {
            return;
        }

        this.setState(prevState => ({
            transcript: [...prevState.transcript, ...entries]
        }));
    }

    async postJson(url, payload) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Request failed with status ${response.status}`);
        }

        return response.json();
    }

    disposeMedia() {
        if (this.mediaRecorder) {
            this.mediaRecorder.removeEventListener('dataavailable', this.handleAudioChunk);
            this.mediaRecorder.removeEventListener('stop', this.handleRecorderStop);
            if (this.mediaRecorder.state !== 'inactive') {
                try {
                    this.mediaRecorder.stop();
                } catch (error) {
                    // ignore
                }
            }
            this.mediaRecorder = null;
        }

        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
            this.mediaStream = null;
        }
    }

    getAssignedKeys(options = {}) {
        const excludeName = options.excludeName ? String(options.excludeName) : null;
        return this.state.users
            .filter(user => user && user.key && user.name !== excludeName)
            .map(user => user.key);
    }

    getAvailableKeys(currentKey, excludeName) {
        const assigned = this.getAssignedKeys({ excludeName });
        return AVAILABLE_USER_KEYS.filter(key => key === currentKey || !assigned.includes(key));
    }

    getNextAvailableKey(users = this.state.users) {
        const assigned = (users || []).filter(Boolean).map(user => user.key).filter(Boolean);
        return AVAILABLE_USER_KEYS.find(key => !assigned.includes(key)) || '';
    }

    getUserByKey(key) {
        const normalized = (key || '').toLowerCase();
        if (!normalized) return null;
        return this.state.users.find(user => (user.key || '').toLowerCase() === normalized) || null;
    }

    isEventFromTextInput(event) {
        if (!event || !event.target) return false;
        const target = event.target;
        if (target.isContentEditable) return true;
        const tagName = target.tagName ? target.tagName.toLowerCase() : '';
        return tagName === 'input' || tagName === 'textarea' || tagName === 'select';
    }

    handleGlobalKeyDown(event) {
        if (!event || event.repeat) return;
        if (this.state.interactionMode !== 'pushToTalk') return;
        if (this.isEventFromTextInput(event)) return;
        const matchedUser = this.getUserByKey(event.key);
        if (!matchedUser) return;
        if (this.activeUserKey && this.activeUserKey !== matchedUser.key) return;
        if (this.state.isListening || this.state.isMicLoading || this.state.isProcessingAudio) return;

        this.activeUserKey = matchedUser.key;
        event.preventDefault();

        const startForUser = () => {
            if (!this.isComponentMounted) return;
            this.startRecording();
        };

        if (this.state.currentUser !== matchedUser.name) {
            this.setState({ currentUser: matchedUser.name }, startForUser);
        } else {
            startForUser();
        }
    }

    handleGlobalKeyUp(event) {
        console.log("handleGlobalKeyUp", event);
        if (!event) return;
        if (this.state.interactionMode !== 'pushToTalk') return;
        if (!this.activeUserKey) return;

        const eventKey = (event.key || '').toLowerCase();
        if (!eventKey || eventKey !== this.activeUserKey.toLowerCase()) {
            return;
        }

        event.preventDefault();
        this.activeUserKey = null;
        this.stopRecording();
    }

    handleWindowBlur() {
        if (!this.activeUserKey) return;
        this.activeUserKey = null;
        this.stopRecording();
    }


    toggleSettingsPanel() {
        this.setState(prev => ({ isSettingsOpen: !prev.isSettingsOpen }));
    }

    handleAddUser(name, key) {
        const trimmed = (name || '').trim();
        const normalizedKey = (key || '').trim();
        if (!trimmed || !normalizedKey) return;
        this.setState(prev => {
            const nameAlreadyExists = prev.users.some(user => user.name === trimmed);
            const keyInUse = prev.users.some(user => (user.key || '').toLowerCase() === normalizedKey.toLowerCase());
            if (nameAlreadyExists || keyInUse) {
                return null;
            }
            const nextUsers = [...prev.users, { name: trimmed, key: normalizedKey }];
            return {
                users: nextUsers,
                newUserName: '',
                newUserKey: this.getNextAvailableKey(nextUsers)
            };
        });
    }
    handleRemoveUser(name) {
        this.setState(prev => {
            if (prev.users.length === 1) return null; // keep at least one
            const nextUsers = prev.users.filter(user => user.name !== name);
            if (nextUsers.length === prev.users.length) return null;
            const nextCurrentUser = nextUsers.some(user => user.name === prev.currentUser)
                ? prev.currentUser
                : (nextUsers[0] ? nextUsers[0].name : '');
            const nextEditing = { ...prev.editingUser };
            delete nextEditing[name];
            return {
                users: nextUsers,
                currentUser: nextCurrentUser,
                newUserKey: this.getNextAvailableKey(nextUsers),
                editingUser: nextEditing
            };
        });
    }
    handleUpdateUser(oldName) {
        this.setState(prev => {
            const pendingValue = Object.prototype.hasOwnProperty.call(prev.editingUser, oldName)
                ? prev.editingUser[oldName]
                : oldName;
            const trimmed = (pendingValue || '').trim();
            const nextEditing = { ...prev.editingUser };
            delete nextEditing[oldName];
            if (!trimmed || trimmed === oldName) {
                return { editingUser: nextEditing };
            }
            const nameAlreadyExists = prev.users.some(user => user.name === trimmed && user.name !== oldName);
            if (nameAlreadyExists) {
                return { editingUser: nextEditing };
            }
            const nextUsers = prev.users.map(user =>
                user.name === oldName ? { ...user, name: trimmed } : user
            );
            const nextCurrent = prev.currentUser === oldName ? trimmed : prev.currentUser;
            const nextTranscript = prev.transcript.map(entry =>
                entry.sender === 'user' && entry.displayName === oldName
                    ? { ...entry, displayName: trimmed }
                    : entry
            );
            return {
                users: nextUsers,
                currentUser: nextCurrent,
                transcript: nextTranscript,
                editingUser: nextEditing
            };
        });
    }
    handleUpdateUserKey(name, key) {
        const normalizedKey = (key || '').trim();
        if (!normalizedKey) return;
        this.setState(prev => {
            const targetUser = prev.users.find(user => user.name === name);
            if (!targetUser) return null;
            const keyInUse = prev.users.some(user =>
                user.name !== name && (user.key || '').toLowerCase() === normalizedKey.toLowerCase()
            );
            if (keyInUse) {
                return null;
            }
            const nextUsers = prev.users.map(user =>
                user.name === name ? { ...user, key: normalizedKey } : user
            );
            return {
                users: nextUsers,
                newUserKey: this.getNextAvailableKey(nextUsers)
            };
        });
    }
    handleSetCurrentUser(name) {
        if (!name) return;
        const exists = this.state.users.some(user => user.name === name);
        if (!exists) return;
        this.setState({ currentUser: name });
    }

    renderTranscript() {
        const { transcript } = this.state;
        const { intl } = this.props;

        if (!transcript.length) {
            return (
                <div className={styles.transcriptEmpty}>
                    {intl.formatMessage(messages.transcriptEmpty)}
                </div>
            );
        }

        return (
            <ul className={styles.transcriptList}>
                {transcript.map(entry => (
                    <li key={entry.id} className={styles.transcriptItem}>
                        <span className={styles.transcriptSender}>
                            {entry.sender === 'user'
                                ? (entry.displayName || this.props.intl.formatMessage(messages.transcriptLabelUser))
                                : this.props.intl.formatMessage(messages.transcriptLabelMarty)}
                        </span>
                        <span className={styles.transcriptMessage}>{entry.text}</span>
                        <span className={styles.transcriptTimestamp}>{new Date(entry.timestamp).toLocaleTimeString()}</span>
                    </li>
                ))}
            </ul>
        );
    }

    handleEditUser(name, value) {
        this.setState(prev => ({
            editingUser: {
                ...prev.editingUser,
                [name]: value
            }
        }));
    }

    renderUserManagement() {
        const { intl } = this.props;
        const { editingUser, newUserName, newUserKey, users } = this.state;
        const availableKeysForNewUser = this.getAvailableKeys();
        const canAddUser = Boolean(newUserName.trim() && newUserKey);

        return (
            <div className={styles.settingsParticipants}>
                <h3 className={styles.settingsSubheading}>
                    {intl.formatMessage(messages.usersSettingsTitle)}
                    <span className={styles.settingsSubheadingDescription}>
                        {intl.formatMessage(messages.usersSettingsDescription)}
                    </span>
                </h3>
                <ul className={styles.settingsUserList}>
                    {users.map(({ name, key }) => {
                        const pendingName = Object.prototype.hasOwnProperty.call(editingUser, name)
                            ? editingUser[name]
                            : name;
                        const keyOptions = this.getAvailableKeys(key, name);
                        return (
                            <li key={name} className={styles.settingsUserListItem}>
                                <input
                                    type="text"
                                    value={pendingName}
                                    onChange={event => this.handleEditUser(name, event.target.value)}
                                    onBlur={() => this.handleUpdateUser(name)}
                                    onKeyDown={event => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            this.handleUpdateUser(name);
                                        }
                                    }}
                                    className={classNames(styles.textInput, styles.settingsUserInput)}
                                />
                                <select
                                    value={key || ''}
                                    onChange={event => this.handleUpdateUserKey(name, event.target.value)}
                                    className={classNames(styles.selectInput, styles.userKeySelect)}
                                >
                                    {keyOptions.map(optionKey => (
                                        <option key={optionKey} value={optionKey}>
                                            {optionKey}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    style={{ visibility: users.length === 1 ? 'hidden' : 'visible' }}
                                    type="button"
                                    className={styles.addRemoveUserButton}
                                    disabled={users.length === 1}
                                    onClick={() => this.handleRemoveUser && this.handleRemoveUser(name)}
                                >
                                    {/* {intl.formatMessage(messages.removeUserButton)}*/}
                                    ➖
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <div className={styles.settingsUserAddRow}>
                    <input
                        type="text"
                        placeholder={intl.formatMessage(messages.addUserPlaceholder)}
                        value={newUserName}
                        onChange={event => this.setState({ newUserName: event.target.value })}
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                this.handleAddUser(newUserName, newUserKey);
                            }
                        }}
                        className={classNames(styles.textInput, styles.settingsUserInput)}
                    />
                    <select
                        value={newUserKey}
                        onChange={event => this.setState({ newUserKey: event.target.value })}
                        className={classNames(styles.selectInput, styles.userKeySelect)}
                        disabled={!availableKeysForNewUser.length}
                    >
                        {availableKeysForNewUser.length === 0 && (
                            <option value="">
                                —
                            </option>
                        )}
                        {availableKeysForNewUser.map(optionKey => (
                            <option key={optionKey} value={optionKey}>
                                {optionKey}
                            </option>
                        ))}
                    </select>
                    <button
                        style={{ visibility: canAddUser ? 'visible' : 'hidden' }}
                        type="button"
                        className={styles.addRemoveUserButton}
                        onClick={() => this.handleAddUser(newUserName, newUserKey)}
                        disabled={!canAddUser}
                    >
                        {/* {intl.formatMessage(messages.addUserButton)} */}
                        ➕
                    </button>
                </div>
            </div>
        );
    }

    render() {
        const { intl } = this.props;
        const {
            conversationMode,
            interactionMode,
            isListening,
            isMicLoading,
            isProcessingAudio,
            isSendingText,
            currentMessage,
            llmSettings,
            recordingError,
            lastRecordingUrl,
            messageError,
            isThinking,
            isSpeaking,
            isSettingsOpen,
            users,
            currentUser
        } = this.state;

        const isBusy = isThinking || isSpeaking;

        const conversationDescription = conversationMode === 'conversation'
            ? intl.formatMessage(messages.conversationModeConversationDescription)
            : intl.formatMessage(messages.conversationModeQADescription);

        const interactionDescription = interactionMode === 'pushToTalk'
            ? intl.formatMessage(messages.interactionModePushToTalkDescription)
            : intl.formatMessage(messages.interactionModeWakeWordsDescription);

        return (
            <>
                {/* busy overlay remains */}
                {isBusy && (
                    <div
                        className={styles.activityBackdrop || ''}
                        aria-label={intl.formatMessage(messages.activityOverlayLabel)}
                        role="dialog"
                        aria-modal="true"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.3)', // near-invisible but blocks clicks
                            zIndex: 9999,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            pointerEvents: 'auto'
                        }}
                    >
                        <div
                            className={styles.activityOverlay || ''}
                            style={{
                                position: 'absolute',
                                top: "50%",
                                transform: 'translateY(-50%)',
                                background: 'transparent',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.75rem',
                                pointerEvents: 'none', // ensure no accidental interaction
                                // animation: 'tm-slideDown 300ms ease-out'
                            }}
                        >
                            {isThinking && <LoadingSpinnerMarty />}
                            {isSpeaking && <SpeakingMarty />}
                        </div>
                        {/* <style>
                            {`@keyframes tm-slideDown {
                                from { transform: translateY(-40px); opacity: 0; }
                                to { transform: translateY(50%); opacity: 1; }
                             }`}
                        </style> */}
                    </div>
                )}
                <div
                    className={styles.talkWithMarty}
                    aria-busy={isBusy ? 'true' : 'false'}
                    aria-hidden={isBusy ? 'true' : 'false'}
                    style={isBusy ? { userSelect: 'none' } : undefined}
                >
                    <div className={styles.primarySections}>
                        <section className={styles.section}>
                            <header className={styles.sectionHeader}>
                                <h2>{intl.formatMessage(messages.interactionTypeTitle)}</h2>
                                <p>{conversationDescription}</p>
                            </header>
                            <div className={styles.toggleGroup} role="group" aria-label={intl.formatMessage(messages.interactionTypeTitle)}>
                                <button
                                    type="button"
                                    className={classNames(styles.toggleButton, {
                                        [styles.toggleButtonActive]: conversationMode === 'conversation'
                                    })}
                                    aria-pressed={conversationMode === 'conversation'}
                                    onClick={() => this.handleConversationModeChange('conversation')}
                                >
                                    {intl.formatMessage(messages.conversationModeConversation)}
                                </button>
                                {/* <button
                                    type="button"
                                    className={classNames(styles.toggleButton, {
                                        [styles.toggleButtonActive]: conversationMode === 'qa'
                                    })}
                                    aria-pressed={conversationMode === 'qa'}
                                    onClick={() => this.handleConversationModeChange('qa')}
                                >
                                    {intl.formatMessage(messages.conversationModeQA)}
                                </button> */}
                            </div>
                        </section>

                        <section className={styles.section}>
                            <header className={styles.sectionHeader}>
                                <h2>{intl.formatMessage(messages.interactionParametersTitle)}</h2>
                                <p>{interactionDescription}</p>
                            </header>
                            <div className={styles.toggleGroup} role="group" aria-label={intl.formatMessage(messages.interactionParametersTitle)}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {/* <button
                                        type="button"
                                        className={classNames(styles.toggleButton, {
                                            [styles.toggleButtonActive]: interactionMode === 'pushToTalk'
                                        })}
                                        aria-pressed={interactionMode === 'pushToTalk'}
                                        onClick={() => this.handleInteractionModeChange('pushToTalk')}
                                        onPointerDown={() => this.handleToggleListening()}
                                        onPointerUp={() => this.handleToggleListening()}
                                    >
                                        {intl.formatMessage(messages.interactionModePushToTalk)}
                                    </button> */}
                                    {this.renderUserManagement()}
                                </div>
                                {/* <button
                                    type="button"
                                    className={classNames(styles.toggleButton, {
                                        [styles.toggleButtonActive]: interactionMode === 'wakeWords'
                                    })}
                                    aria-pressed={interactionMode === 'wakeWords'}
                                    onClick={() => this.handleInteractionModeChange('wakeWords')}
                                >
                                    {intl.formatMessage(messages.interactionModeWakeWords)}
                                </button> */}
                            </div>

                            {/* {interactionMode === 'pushToTalk' && (
                                <>
                                    <button
                                        type="button"
                                        className={classNames(styles.primaryButton, {
                                            [styles.primaryButtonActive]: isListening
                                        })}
                                        onClick={this.handleToggleListening}
                                        disabled={isMicLoading || isProcessingAudio || !this.mediaSupportAvailable}
                                    >
                                        {intl.formatMessage(isListening ? messages.listeningStop : messages.listeningStart)}
                                    </button>
                                </>
                            )} */}

                            {interactionMode === 'wakeWords' && (
                                <div className={styles.wakeWordsHint}>
                                    {intl.formatMessage(messages.wakeWordHint)}
                                </div>
                            )}

                            {interactionMode === 'pushToTalk' && isListening && (
                                <div className={styles.recordingIndicator}>
                                    {intl.formatMessage(messages.recordingIndicator)}
                                </div>
                            )}
                            {interactionMode === 'pushToTalk' && isThinking && !isListening && (
                                <div className={styles.processingIndicator}>
                                    {intl.formatMessage(messages.thinkingIndicator)}
                                </div>
                            )}
                            {interactionMode === 'pushToTalk' && this.state.isSpeaking && !isListening && (
                                <div className={styles.processingIndicator}>
                                    {intl.formatMessage(messages.speakingIndicator)}
                                </div>
                            )}
                            {interactionMode === 'pushToTalk' && isProcessingAudio && (
                                <div className={styles.processingIndicator}>
                                    {intl.formatMessage(messages.processingRecording)}
                                </div>
                            )}

                            {interactionMode === 'pushToTalk' && !this.mediaSupportAvailable && (
                                <div className={styles.recordingError}>
                                    {intl.formatMessage(messages.recordingUnsupported)}
                                </div>
                            )}

                            {interactionMode === 'pushToTalk' && recordingError && this.mediaSupportAvailable && (
                                <div className={styles.recordingError}>{recordingError}</div>
                            )}

                            {/* {interactionMode === 'pushToTalk' && lastRecordingUrl && !isListening && !isProcessingAudio && (
                                <div className={styles.recordingPlayback}>
                                    <span className={styles.inputLabel}>{intl.formatMessage(messages.lastRecordingLabel)}</span>
                                    <audio controls src={lastRecordingUrl} className={styles.audioPlayer} />
                                </div>
                            )} */}

                        </section>
                    </div>

                    <section className={classNames(styles.section, styles.headerSection)}>
                        <TalkWithMartySettingsPanel
                            isOpen={isSettingsOpen}
                            onToggle={this.toggleSettingsPanel}
                            settings={llmSettings}
                            onSettingChange={this.handleSettingsChange}
                        />
                    </section>

                    <section className={classNames(styles.section, styles.transcriptSection)}>
                        <header className={styles.sectionHeader}>
                            <h2>{intl.formatMessage(messages.transcriptTitle)}</h2>
                            <div className={styles.headerActions}>
                                <button
                                    type="button"
                                    className={styles.secondaryButton}
                                    onClick={this.handleDownloadTranscript}
                                    disabled={!this.state.transcript.length}
                                >
                                    {intl.formatMessage(messages.transcriptDownload)}
                                </button>
                                <button
                                    type="button"
                                    className={styles.secondaryButton}
                                    onClick={this.handleClearTranscript}
                                    disabled={!this.state.transcript.length}
                                >
                                    {intl.formatMessage(messages.transcriptClear)}
                                </button>
                            </div>
                        </header>
                        <div className={styles.transcriptContainer}>
                            {this.renderTranscript()}
                        </div>

                        <form className={styles.messageComposer} onSubmit={this.handleSendMessage}>
                            <label className={styles.inputLabel} htmlFor="talk-with-marty-message">
                                {intl.formatMessage(messages.sendMessageLabel)}
                            </label>
                            <textarea
                                id="talk-with-marty-message"
                                className={styles.messageInput}
                                value={currentMessage}
                                onChange={this.handleMessageChange}
                                placeholder={intl.formatMessage(messages.sendMessagePlaceholder)}
                                rows={3}
                            />
                            {messageError && (
                                <div className={styles.messageError}>{messageError}</div>
                            )}
                            {interactionMode === 'pushToTalk' && (
                                <select
                                    className={styles.selectInput}
                                    value={currentUser}
                                    aria-label={intl.formatMessage(messages.currentSpeakerLabel)}
                                    onChange={e => this.handleSetCurrentUser(e.target.value)}
                                    style={{ minHeight: '32px' }}
                                >
                                    {users.map(user => (
                                        <option key={user.name} value={user.name}>
                                            {user.name}{user.key ? ` (${user.key})` : ''}
                                        </option>
                                    ))}
                                </select>
                            )}
                            <div className={styles.composerActions}>
                                <button
                                    type="submit"
                                    className={styles.primaryButton}
                                    disabled={!currentMessage.trim() || isSendingText}
                                >
                                    {intl.formatMessage(messages.sendMessageButton)}
                                </button>
                            </div>
                        </form>
                    </section>

                </div>
            </>
        );
    }
}

TalkWithMarty.propTypes = {
    intl: intlShape,
    onAudioCaptured: PropTypes.func,
    activityImageSrc: PropTypes.string
};

export default injectIntl(TalkWithMarty);

function getRaftUsingTargetId(targetId) {
    if (!window.raftManager || !window.applicationManager || !window.applicationManager.connectedRafts) {
        return null;
    }
    const raftId = window.raftManager.raftIdAndDeviceIdMap[targetId];
    const raft = window.applicationManager.connectedRafts[raftId];
    return raft;
}

const getConnectedRaft = () => {
    const targetId = window.vm && window.vm.runtime && window.vm.runtime._editingTarget.id;
    if (!targetId) {
        console.warn('[TalkWithMarty] Unable to stream audio to Marty: target ID not found');
        return;
    }
    const connectedRaft = getRaftUsingTargetId(targetId);
    if (!connectedRaft) {
        console.warn('[TalkWithMarty] Unable to stream audio to Marty: raft connection not found');
        return;
    }
    return connectedRaft;
}
const martyIsListening = () => {
    const connectedRaft = getConnectedRaft();
    if (!connectedRaft) {
        return;
    }
    connectedRaft.sendRestMessage('led/LEDeye/pattern/pinwheel?c=ff0000');
}

const martyIsThinking = () => {
    const connectedRaft = getConnectedRaft();
    if (!connectedRaft) {
        return;
    }
    connectedRaft.sendRestMessage('led/LEDeye/pattern/pinwheel?c=00ff00');
    connectedRaft.sendRestMessage('traj/getReady/?moveTime=2000');
}

const martyStartsTalking = () => {
    const connectedRaft = getConnectedRaft();
    if (!connectedRaft) {
        return;
    }
    connectedRaft.sendRestMessage('led/LEDeye/pattern/show-off');
}

const martyStopsTalking = () => {
    const connectedRaft = getConnectedRaft();
    if (!connectedRaft) {
        return;
    }
    connectedRaft.sendRestMessage('led/LEDeye/off');
}
