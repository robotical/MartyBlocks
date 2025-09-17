import classNames from 'classnames';
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
                responseLength: 'medium'
            }
        };

        this.handleConversationModeChange = this.handleConversationModeChange.bind(this);
        this.handleInteractionModeChange = this.handleInteractionModeChange.bind(this);
        this.handleToggleListening = this.handleToggleListening.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleDownloadTranscript = this.handleDownloadTranscript.bind(this);
        this.handleSettingsChange = this.handleSettingsChange.bind(this);
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

        // Placeholder for future integration
        // eslint-disable-next-line no-console
        console.log('[TalkWithMarty] Interaction mode changed:', mode);
    }

    handleToggleListening() {
        this.setState(({ isListening }) => {
            const nextListening = !isListening;

            // Placeholder for future integration
            // eslint-disable-next-line no-console
            console.log('[TalkWithMarty] Push-to-Talk listening state:', nextListening ? 'start' : 'stop');

            return { isListening: nextListening };
        });
    }

    handleMessageChange(event) {
        this.setState({ currentMessage: event.target.value });
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
            currentMessage: ''
        }));

        // Placeholder for future integration
        // eslint-disable-next-line no-console
        console.log('[TalkWithMarty] handleSendMessage', trimmedMessage);
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
            currentMessage,
            llmSettings
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
                                onClick={() => this.handleInteractionModeChange('pushToTalk')}
                            >
                                {intl.formatMessage(messages.interactionModePushToTalk)}
                            </button>
                            <button
                                type="button"
                                className={classNames(styles.toggleButton, {
                                    [styles.toggleButtonActive]: interactionMode === 'wakeWords'
                                })}
                                aria-pressed={interactionMode === 'wakeWords'}
                                onClick={() => this.handleInteractionModeChange('wakeWords')}
                            >
                                {intl.formatMessage(messages.interactionModeWakeWords)}
                            </button>
                        </div>

                        {interactionMode === 'pushToTalk' && (
                            <button
                                type="button"
                                className={classNames(styles.primaryButton, {
                                    [styles.primaryButtonActive]: isListening
                                })}
                                onClick={this.handleToggleListening}
                            >
                                {intl.formatMessage(isListening ? messages.listeningStop : messages.listeningStart)}
                            </button>
                        )}

                        {interactionMode === 'wakeWords' && (
                            <div className={styles.wakeWordsHint}>
                                {intl.formatMessage(messages.wakeWordHint)}
                            </div>
                        )}
                    </section>
                </div>

                <section className={classNames(styles.section, styles.transcriptSection)}>
                    <header className={styles.sectionHeader}>
                        <h2>{intl.formatMessage(messages.transcriptTitle)}</h2>
                        <button
                            type="button"
                            className={styles.secondaryButton}
                            onClick={this.handleDownloadTranscript}
                            disabled={!this.state.transcript.length}
                        >
                            {intl.formatMessage(messages.transcriptDownload)}
                        </button>
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
                        <div className={styles.composerActions}>
                            <button
                                type="submit"
                                className={styles.primaryButton}
                                disabled={!currentMessage.trim()}
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
    intl: intlShape
};

export default injectIntl(TalkWithMarty);
