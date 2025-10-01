import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import styles from '../talk-with-marty.css';

const messages = defineMessages({
    llmSettingsTitle: { id: 'talkWithMarty.llmSettingsTitle', defaultMessage: 'LLM Settings' },
    settingSafeguards: { id: 'talkWithMarty.settingSafeguards', defaultMessage: 'Safeguards' },
    safeguardsPlaceholder: { id: 'talkWithMarty.safeguardsPlaceholder', defaultMessage: 'Safety rules or restricted topics' },
    settingInstructions: { id: 'talkWithMarty.settingInstructions', defaultMessage: 'Instructions' },
    instructionsPlaceholder: { id: 'talkWithMarty.instructionsPlaceholder', defaultMessage: 'Guidance for how Marty should respond' },
    close: { id: 'talkWithMarty.settingsCloseLabel', defaultMessage: 'Close Settings' },
    usersSettingsTitle: { id: 'talkWithMarty.usersSettingsTitle', defaultMessage: 'Participants' },
    addUserPlaceholder: { id: 'talkWithMarty.addUserPlaceholder', defaultMessage: 'New participant name' },
    addUserButton: { id: 'talkWithMarty.addUserButton', defaultMessage: 'Add' },
    removeUserButton: { id: 'talkWithMarty.removeUserButton', defaultMessage: 'Remove' }
});

class TalkWithMartySettingsModal extends React.Component {
    constructor(props){
        super(props);
        this.state = { newUserName: '' , editing: {} };
    }

    componentDidMount() {
        if (this.props.open) {
            setTimeout(() => {
                if (this.closeBtn) this.closeBtn.focus();
            }, 0);
        }
    }

    componentDidUpdate(prev) {
        if (!prev.open && this.props.open) {
            setTimeout(() => {
                if (this.closeBtn) this.closeBtn.focus();
            }, 0);
        }
    }

    handleChange(key, value) {
        this.props.onSettingChange(key, value);
    }
    addUser = () => {
        const {newUserName} = this.state;
        if (this.props.onAddUser) this.props.onAddUser(newUserName);
        this.setState({newUserName:''});
    };
    handleEdit(name, value){
        this.setState(prev => ({ editing: { ...prev.editing, [name]: value }}));
    }
    commitEdit(oldName){
        const value = (this.state.editing[oldName] || '').trim();
        if (value && value !== oldName && this.props.onUpdateUser){
            this.props.onUpdateUser(oldName, value);
        }
    }

    render() {
        const {open, onClose, settings, intl, users, onRemoveUser} = this.props;
        if (!open) return null;
        const { newUserName, editing } = this.state;
        return (
            <div
                role="dialog"
                aria-modal="true"
                aria-label={intl.formatMessage(messages.llmSettingsTitle)}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.45)',
                    zIndex: 10000,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    overflowY: 'auto',
                    padding: '3rem 1rem'
                }}
                onMouseDown={e => {
                    if (e.target === e.currentTarget) onClose();
                }}
            >
                <div
                    style={{
                        background: '#fff',
                        maxWidth: 800,
                        width: '100%',
                        borderRadius: 8,
                        padding: '1.5rem',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                        position: 'relative'
                    }}
                >
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem'}}>
                        <h2 style={{margin:0}}>{intl.formatMessage(messages.llmSettingsTitle)}</h2>
                        <button
                            type="button"
                            ref={el => (this.closeBtn = el)}
                            onClick={onClose}
                            className={styles.secondaryButton}
                        >
                            {intl.formatMessage(messages.close)}
                        </button>
                    </div>

                    <div style={{marginBottom:'1.25rem'}}>
                        <h3 style={{margin:'0 0 0.5rem'}}>{intl.formatMessage(messages.usersSettingsTitle)}</h3>
                        <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'0.5rem'}}>
                            {users.map(u => {
                                const pending = editing[u] !== undefined ? editing[u] : u;
                                return (
                                    <li key={u} style={{display:'flex', gap:'0.5rem', alignItems:'center'}}>
                                        <input
                                            type="text"
                                            value={pending}
                                            onChange={e => this.handleEdit(u, e.target.value)}
                                            onBlur={() => this.commitEdit(u)}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') { e.preventDefault(); this.commitEdit(u); }
                                            }}
                                            style={{flex:1, padding:'0.25rem 0.5rem'}}
                                        />
                                        <button
                                            type="button"
                                            className={styles.secondaryButton}
                                            disabled={users.length === 1}
                                            onClick={() => onRemoveUser && onRemoveUser(u)}
                                        >
                                            {intl.formatMessage(messages.removeUserButton)}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                        <div style={{display:'flex', gap:'0.5rem', marginTop:'0.75rem'}}>
                            <input
                                type="text"
                                placeholder={intl.formatMessage(messages.addUserPlaceholder)}
                                value={newUserName}
                                onChange={e => this.setState({newUserName: e.target.value})}
                                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); this.addUser(); } }}
                                style={{flex:1, padding:'0.25rem 0.5rem'}}
                            />
                            <button
                                type="button"
                                className={styles.primaryButton}
                                disabled={!newUserName.trim()}
                                onClick={this.addUser}
                            >
                                {intl.formatMessage(messages.addUserButton)}
                            </button>
                        </div>
                    </div>

                    <form
                        onSubmit={e => e.preventDefault()}
                        className={styles.settingsGrid}
                    >
                        <label className={classNames(styles.inputGroup, styles.fullWidth)}>
                            <span className={styles.inputLabel}>{intl.formatMessage(messages.settingInstructions)}</span>
                            <textarea
                                className={styles.textareaInput}
                                value={settings.instructions}
                                onChange={e => this.handleChange('instructions', e.target.value)}
                                placeholder={intl.formatMessage(messages.instructionsPlaceholder)}
                                rows={3}
                            />
                        </label>

                        <label className={classNames(styles.inputGroup, styles.fullWidth)}>
                            <span className={styles.inputLabel}>{intl.formatMessage(messages.settingSafeguards)}</span>
                            <textarea
                                className={styles.textareaInput}
                                value={settings.safeguards}
                                onChange={e => this.handleChange('safeguards', e.target.value)}
                                placeholder={intl.formatMessage(messages.safeguardsPlaceholder)}
                                rows={3}
                            />
                        </label>
                    </form>
                </div>
            </div>
        );
    }
}

TalkWithMartySettingsModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSettingChange: PropTypes.func,
    settings: PropTypes.object,
    intl: intlShape,
    users: PropTypes.array,
    currentUser: PropTypes.string,
    onAddUser: PropTypes.func,
    onRemoveUser: PropTypes.func,
    onUpdateUser: PropTypes.func
};


export default injectIntl(TalkWithMartySettingsModal);
