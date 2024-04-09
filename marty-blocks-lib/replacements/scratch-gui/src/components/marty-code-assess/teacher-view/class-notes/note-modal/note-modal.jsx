import React from "react";
import PropTypes from 'prop-types';
import styles from './note-modal.css';
import bindAll from 'lodash.bindall';

function formatTimestamp(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

class NoteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            note: this.props.note,
            editedTitle: this.props.note.title,
            editedText: this.props.note.text
        };
        bindAll(this, [
            "onRemoveNote",
            "onRemoveNote",
            "handleTitleChange",
            "handleTextChange",
            "handleSave"
        ]);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    fetchNote = async () => {
        const note = await this.props.note.refresh();
        this.setState({ note });
    }

    onRemoveNote = async () => {
        await this.props.selectedClass.removeNoteById(this.state.note.id);
        this.props.handleRefreshNotes();
        this.props.onClose();
    }

    handleTitleChange = (e) => {
        this.setState({ editedTitle: e.target.value });
    }

    handleTextChange = (e) => {
        this.setState({ editedText: e.target.value });
    }

    handleSave = async () => {
        const didUpdate = await this.props.note.updateTitleText(this.state.editedTitle, this.state.editedText);
        if (didUpdate) {
            this.props.handleRefreshNotes();
            alert("Note updated successfully");
        }
    }

    render() {
        const { note, editedTitle, editedText } = this.state;

        if (!note) {
            return <div>No note data</div>;
        }

        return (
            <div className={styles.noteModal}>
                <div className={styles.noteModalHeader}>
                    <input
                        className={styles.noteModalInput}
                        value={editedTitle}
                        onChange={this.handleTitleChange}
                    />
                    <p className={styles.noteModalTimestamp}>Date: {formatTimestamp(note.timestamp)}</p>
                    <button className={styles.removeNoteBtn} onClick={this.onRemoveNote}>Remove Note</button>
                    <button className={styles.saveNoteBtn} onClick={this.handleSave}>Save Changes</button>
                </div>
                <div className={styles.noteModalBody}>
                    <textarea
                        className={styles.noteModalTextarea}
                        value={editedText}
                        onChange={this.handleTextChange}
                    />
                </div>
            </div>
        );
    }
}

NoteModal.propTypes = {
    note: PropTypes.object.isRequired,
    selectedClass: PropTypes.object.isRequired,
    handleRefreshNotes: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default NoteModal;
