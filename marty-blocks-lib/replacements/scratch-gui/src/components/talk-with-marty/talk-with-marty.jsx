import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, intlShape, injectIntl } from 'react-intl';

import styles from './talk-with-marty.css';

const messages = defineMessages({
    conversationModeTitle: {
        id: 'talkWithMarty.conversationModeTitle',
        defaultMessage: 'Conversation Mode'
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
    interactionModeTitle: {
        id: 'talkWithMarty.interactionModeTitle',
        defaultMessage: 'Interaction Mode'
    },
    interactionModePushToTalk: {
        id: 'talkWithMarty.interactionModePushToTalk',
        defaultMessage: 'Push-to-Talk'
    },
    interactionModePushToTalkDescription: {
        id: 'talkWithMarty.interactionModePushToTalkDescription',
        defaultMessage: 'Use the button to start and stop Marty listening.'
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
    settingPurposeRole: {
        id: 'talkWithMarty.settingPurposeRole',
        defaultMessage: 'Purpose / Role'
    },
    settingKnowledgeSources: {
        id: 'talkWithMarty.settingKnowledgeSources',
        defaultMessage: 'Knowledge Sources'
    },
    settingPersonalityName: {
        id: 'talkWithMarty.settingPersonalityName',
        defaultMessage: 'Personality Name'
    },
    settingPersonalityVoice: {
        id: 'talkWithMarty.settingPersonalityVoice',
        defaultMessage: 'Personality Voice'
    },
    settingBehavior: {
        id: 'talkWithMarty.settingBehavior',
        defaultMessage: 'Behavior'
    },
    settingSafeguards: {
        id: 'talkWithMarty.settingSafeguards',
        defaultMessage: 'Safeguards'
    },
    settingResponseLength: {
        id: 'talkWithMarty.settingResponseLength',
        defaultMessage: 'Response Length'
    },
    responseShort: {
        id: 'talkWithMarty.responseShort',
        defaultMessage: 'Short'
    },
    responseMedium: {
        id: 'talkWithMarty.responseMedium',
        defaultMessage: 'Medium'
    },
    responseLong: {
        id: 'talkWithMarty.responseLong',
        defaultMessage: 'Long'
    },
    transcriptLabelUser: {
        id: 'talkWithMarty.transcriptLabelUser',
        defaultMessage: 'You'
    },
    transcriptLabelMarty: {
        id: 'talkWithMarty.transcriptLabelMarty',
        defaultMessage: 'Marty'
    },
    knowledgePlaceholder: {
        id: 'talkWithMarty.knowledgePlaceholder',
        defaultMessage: 'Add references or URLs (comma separated)'
    },
    personalityNamePlaceholder: {
        id: 'talkWithMarty.personalityNamePlaceholder',
        defaultMessage: 'e.g. Coach Marty'
    },
    personalityVoicePlaceholder: {
        id: 'talkWithMarty.personalityVoicePlaceholder',
        defaultMessage: 'e.g. Calm, energetic'
    },
    behaviorPlaceholder: {
        id: 'talkWithMarty.behaviorPlaceholder',
        defaultMessage: 'Guidance for how Marty should act during the conversation'
    },
    safeguardsPlaceholder: {
        id: 'talkWithMarty.safeguardsPlaceholder',
        defaultMessage: 'Safety rules or restricted topics'
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
        defaultMessage: 'Something went wrong while recording audio. Please try again.'
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
        defaultMessage: 'Could not process the recording. Please try again.'
    },
    textRequestFailed: {
        id: 'talkWithMarty.textRequestFailed',
        defaultMessage: 'Could not send message. Please try again.'
    }
});

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
                purposeRole: 'teacher',
                knowledgeSources: '',
                personalityName: '',
                personalityVoice: '',
                behavior: '',
                safeguards: '',
                responseLength: 'short'
            },
            isMicLoading: false,
            recordingError: null,
            lastRecordingUrl: '',
            isProcessingAudio: false,
            isSendingText: false,
            messageError: null
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

        this.mediaStream = null;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.isComponentMounted = false;
        this.mediaSupportAvailable = typeof window !== 'undefined' && typeof window.MediaRecorder !== 'undefined';
        this.martySpeechUrl = '';
    }

    componentDidMount() {
        this.isComponentMounted = true;
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
            text: trimmedMessage,
            timestamp
        };

        this.setState(prevState => ({
            transcript: [...prevState.transcript, nextEntry],
            currentMessage: '',
            messageError: null,
            isSendingText: true
        }), () => {
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
                        this.setState({ isSendingText: false });
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
                this.setState({ isListening: true, isMicLoading: false });
            }

            // Placeholder for future integration
            // eslint-disable-next-line no-console
            console.log('[TalkWithMarty] Recording started');
        } catch (error) {
            this.handleRecordingError(error);
        }
    }

    async stopRecording() {
        if (this.state.isMicLoading) {
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

        this.disposeMedia();
    }

    async processRecording(blob) {
        if (!blob) {
            return;
        }

        if (this.isComponentMounted) {
            this.setState({ isProcessingAudio: true });
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
            const response = await this.sendSpeechRequest(requestPayload);
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
                this.setState({ isProcessingAudio: false });
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
            content: entry.text,
            timestamp: entry.timestamp
        }));
    }

    buildLLMSettingsForRequest() {
        const {
            purposeRole,
            knowledgeSources,
            personalityName,
            personalityVoice,
            behavior,
            safeguards,
            responseLength
        } = this.state.llmSettings;

        const knowledgeList = knowledgeSources
            ? knowledgeSources
                .split(/\n|,/)
                .map(value => value.trim())
                .filter(value => value.length > 0)
            : undefined;

        const settings = {};

        if (purposeRole) {
            settings.role = purposeRole;
        }
        if (knowledgeList && knowledgeList.length) {
            settings.knowledgeSources = knowledgeList;
        }
        if (personalityName || personalityVoice) {
            settings.personality = {
                name: personalityName || undefined,
                voice: personalityVoice || undefined
            };
        }
        if (behavior) {
            settings.behavior = behavior;
        }
        if (safeguards) {
            settings.safeguards = { notes: safeguards };
        }
        if (responseLength) {
            settings.responseLength = responseLength;
        }

        return settings;
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
                provider: 'huggingface',
                conversationHistory: this.buildConversationHistory(),
                settings: this.buildLLMSettingsForRequest()
            },
            includeSpeech,
            includeTranscript: true
        };

        if (includeSpeech) {
            payload.tts = {
                provider: 'elevenlabs',
                options: this.state.llmSettings.personalityVoice
                    ? { voice: this.state.llmSettings.personalityVoice }
                    : undefined
            };
        }

        return payload;
    }

    async sendSpeechRequest(payload) {
        return this.postJson('http://localhost:3333/talkWithMarty/talk-with-marty-using-speech', payload);
    }

    applySpeechResponse(response) {
        if (!response) {
            return;
        }

        const entriesToAdd = [];

        if (response.transcript && response.transcript.text) {
            entriesToAdd.push(this.createTranscriptEntry(
                'user',
                response.transcript.text,
                response.transcript.timestamp,
                { raw: response.transcript.raw }
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

        if (entriesToAdd.length) {
            this.appendTranscriptEntries(entriesToAdd);
        }
    }

    createTranscriptEntry(sender, text, timestamp, metadata) {
        const entryTimestamp = timestamp || new Date().toISOString();
        const uniqueSuffix = Math.random().toString(16).slice(2, 8);
        const entry = {
            id: `${entryTimestamp}-${sender}-${uniqueSuffix}`,
            sender,
            text,
            timestamp: entryTimestamp
        };

        if (metadata) {
            entry.metadata = metadata;
        }

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

    buildTextRequestPayload(message) {
        const includeSpeech = this.shouldIncludeSpeech();
        const payload = {
            text: message,
            llm: {
                provider: 'huggingface',
                conversationHistory: this.buildConversationHistory(),
                settings: this.buildLLMSettingsForRequest()
            },
            includeSpeech
        };

        if (includeSpeech) {
            payload.tts = {
                provider: 'elevenlabs',
                options: this.state.llmSettings.personalityVoice
                    ? { voice: this.state.llmSettings.personalityVoice }
                    : undefined
            };
        }

        return payload;
    }

    async sendTextRequest(message) {
        try {
            const payload = this.buildTextRequestPayload(message);
            const response = await this.postJson('http://localhost:3333/talkWithMarty/talk-with-marty-using-text', payload);
            if (response && response.llm && response.llm.text) {
                this.appendTranscriptEntries([
                    this.createTranscriptEntry('marty', response.llm.text, response.llm.timestamp, { raw: response.llm.raw })
                ]);
            }
            console.log('[TalkWithMarty] speech response', response);
            if (response && response.speech) {
                this.handleSpeechAudioResult(response.speech.audio);
            }
        } catch (error) {
            throw error;
        }
    }

    handleSpeechAudioResult(audioData) {
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
            return;
        }

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
        audio.play().catch(error => {
            // eslint-disable-next-line no-console
            console.warn('[TalkWithMarty] Unable to autoplay Marty response audio', error);
        });
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
                                ? intl.formatMessage(messages.transcriptLabelUser)
                                : intl.formatMessage(messages.transcriptLabelMarty)}
                        </span>
                        <span className={styles.transcriptMessage}>{entry.text}</span>
                        <span className={styles.transcriptTimestamp}>{new Date(entry.timestamp).toLocaleTimeString()}</span>
                    </li>
                ))}
            </ul>
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
            messageError
        } = this.state;

        const conversationDescription = conversationMode === 'conversation'
            ? intl.formatMessage(messages.conversationModeConversationDescription)
            : intl.formatMessage(messages.conversationModeQADescription);

        const interactionDescription = interactionMode === 'pushToTalk'
            ? intl.formatMessage(messages.interactionModePushToTalkDescription)
            : intl.formatMessage(messages.interactionModeWakeWordsDescription);

        return (
            <div className={styles.talkWithMarty}>
                <div className={styles.primarySections}>
                    <section className={styles.section}>
                        <header className={styles.sectionHeader}>
                            <h2>{intl.formatMessage(messages.conversationModeTitle)}</h2>
                            <p>{conversationDescription}</p>
                        </header>
                        <div className={styles.toggleGroup} role="group" aria-label={intl.formatMessage(messages.conversationModeTitle)}>
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
                            <button
                                type="button"
                                className={classNames(styles.toggleButton, {
                                    [styles.toggleButtonActive]: conversationMode === 'qa'
                                })}
                                aria-pressed={conversationMode === 'qa'}
                                onClick={() => this.handleConversationModeChange('qa')}
                            >
                                {intl.formatMessage(messages.conversationModeQA)}
                            </button>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <header className={styles.sectionHeader}>
                            <h2>{intl.formatMessage(messages.interactionModeTitle)}</h2>
                            <p>{interactionDescription}</p>
                        </header>
                        <div className={styles.toggleGroup} role="group" aria-label={intl.formatMessage(messages.interactionModeTitle)}>
                            <button
                                type="button"
                                className={classNames(styles.toggleButton, {
                                    [styles.toggleButtonActive]: interactionMode === 'pushToTalk'
                                })}
                                aria-pressed={interactionMode === 'pushToTalk'}
                                // onClick={() => this.handleInteractionModeChange('pushToTalk')}
                                onClick={() => this.handleInteractionModeChange('pushToTalk')}
                                onPointerDown={() => this.handleToggleListening()}
                                onPointerUp={() => this.handleToggleListening()}
                            >
                                {intl.formatMessage(messages.interactionModePushToTalk)}
                            </button>
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

                <section className={styles.section}>
                    <header className={styles.sectionHeader}>
                        <h2>{intl.formatMessage(messages.llmSettingsTitle)}</h2>
                    </header>

                    <div className={styles.settingsGrid}>
                        <label className={styles.inputGroup}>
                            <span className={styles.inputLabel}>{intl.formatMessage(messages.settingPurposeRole)}</span>
                            <select
                                className={styles.selectInput}
                                value={llmSettings.purposeRole}
                                onChange={event => this.handleSettingsChange('purposeRole', event.target.value)}
                            >
                                <option value="teacher">Teacher</option>
                                <option value="tutor">Tutor</option>
                                <option value="peer">Peer</option>
                                <option value="novice">Novice</option>
                            </select>
                        </label>

                        <label className={styles.inputGroup}>
                            <span className={styles.inputLabel}>{intl.formatMessage(messages.settingKnowledgeSources)}</span>
                            <textarea
                                className={styles.textareaInput}
                                value={llmSettings.knowledgeSources}
                                onChange={event => this.handleSettingsChange('knowledgeSources', event.target.value)}
                                placeholder={intl.formatMessage(messages.knowledgePlaceholder)}
                                rows={2}
                            />
                        </label>

                        <label className={styles.inputGroup}>
                            <span className={styles.inputLabel}>{intl.formatMessage(messages.settingPersonalityName)}</span>
                            <input
                                type="text"
                                className={styles.textInput}
                                value={llmSettings.personalityName}
                                onChange={event => this.handleSettingsChange('personalityName', event.target.value)}
                                placeholder={intl.formatMessage(messages.personalityNamePlaceholder)}
                            />
                        </label>

                        <label className={styles.inputGroup}>
                            <span className={styles.inputLabel}>{intl.formatMessage(messages.settingPersonalityVoice)}</span>
                            <input
                                type="text"
                                className={styles.textInput}
                                value={llmSettings.personalityVoice}
                                onChange={event => this.handleSettingsChange('personalityVoice', event.target.value)}
                                placeholder={intl.formatMessage(messages.personalityVoicePlaceholder)}
                            />
                        </label>

                        <label className={classNames(styles.inputGroup, styles.fullWidth)}>
                            <span className={styles.inputLabel}>{intl.formatMessage(messages.settingBehavior)}</span>
                            <textarea
                                className={styles.textareaInput}
                                value={llmSettings.behavior}
                                onChange={event => this.handleSettingsChange('behavior', event.target.value)}
                                placeholder={intl.formatMessage(messages.behaviorPlaceholder)}
                                rows={3}
                            />
                        </label>

                        <label className={classNames(styles.inputGroup, styles.fullWidth)}>
                            <span className={styles.inputLabel}>{intl.formatMessage(messages.settingSafeguards)}</span>
                            <textarea
                                className={styles.textareaInput}
                                value={llmSettings.safeguards}
                                onChange={event => this.handleSettingsChange('safeguards', event.target.value)}
                                placeholder={intl.formatMessage(messages.safeguardsPlaceholder)}
                                rows={3}
                            />
                        </label>

                        <label className={styles.inputGroup}>
                            <span className={styles.inputLabel}>{intl.formatMessage(messages.settingResponseLength)}</span>
                            <select
                                className={styles.selectInput}
                                value={llmSettings.responseLength}
                                onChange={event => this.handleSettingsChange('responseLength', event.target.value)}
                            >
                                <option value="short">{intl.formatMessage(messages.responseShort)}</option>
                                <option value="medium">{intl.formatMessage(messages.responseMedium)}</option>
                                <option value="long">{intl.formatMessage(messages.responseLong)}</option>
                            </select>
                        </label>
                    </div>
                </section>
            </div>
        );
    }
}

TalkWithMarty.propTypes = {
    intl: intlShape,
    onAudioCaptured: PropTypes.func
};

export default injectIntl(TalkWithMarty);
