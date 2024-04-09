import React from "react";
import styles from "./class-notes-tab.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import MakeNewNoteModal from "./make-new-note-modal/make-new-note-modal.jsx";
import Modal from "../../../../containers/modal.jsx";
import NoteModal from "./note-modal/note-modal.jsx";
import Spinner from '../../../spinner/spinner.jsx';
import spinnerStyles from '../../../spinner/spinner.css';
import { activateDeck } from "../../../../reducers/cards.js";
import { connect } from "react-redux";

const messages = defineMessages({
    placeholder: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.classNotesTab."
    }
});

class ClassNotesTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedNotes: [],
            sortBy: "timestamp", // timestamp
            makeNewNoteModalVisible: false,
            noteModalData: {
                note: null,
                visible: false,
                noteResponsesLength: 0,

            },
            isLoading: false,
        };
        bindAll(this, [
            "sortByTimestamp",
            "onSortByChange",
            "onMakeNewNote",
            "fetchNotes",
        ]);
    }

    componentDidMount() {
        // this.props.showTutorialCard("code-assess-teacher-class-notes-tab");
        if (this.props.selectedClass) {
            this.fetchNotes()
        }
    }

    fetchNotes = async () => {
        this.setState({ isLoading: true });
        const notes = await this.props.selectedClass.getNotes();
        let sortedNotes = this.sortByTimestamp(notes);
        this.setState({ sortedNotes, isLoading: false });
    }

    sortByTimestamp(notes) {
        return [...notes].sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
        });
    }

    onSortByChange(sortBy) {
        this.setState({ sortBy });
        if (sortBy === "timestamp") this.setState({ sortedNotes: this.sortByTimestamp(this.state.sortedNotes) });
    }

    onMakeNewNote() {
        this.setState({ makeNewNoteModalVisible: true });
    }

    async onDeactivateNote(e, note) {
        e?.stopPropagation();
        await this.props.selectedClass.deactivateNote(note);
        await this.fetchNotes();
    }

    render() {
        console.log("ClassNotesTab render", this.state.sortedNotes);
        return (
            <>
                {this.state.makeNewNoteModalVisible &&
                    <Modal
                        onRequestClose={() => this.setState({ makeNewNoteModalVisible: false })}
                        fullScreen={false}
                        className={styles.makeNewNoteModal}
                        id="makeNewNoteModal"
                        contentLabel={`Make New Note`}
                    >
                        <MakeNewNoteModal
                            onClose={() => this.setState({ makeNewNoteModalVisible: false })}
                            handleRefreshAfterNoteCreation={this.fetchNotes}
                            selectedClass={this.props.selectedClass}
                        />
                    </Modal>
                }

                {this.state.noteModalData.visible &&
                    <Modal
                        onRequestClose={() => this.setState({ noteModalData: { visible: false, note: null } })}
                        fullScreen
                        id="noteModal"
                        contentLabel={`Note: ${this.state.noteModalData.note?.title}`}
                    >
                        <NoteModal
                            note={this.state.noteModalData.note}
                            selectedClass={this.props.selectedClass}
                            handleRefreshNotes={this.fetchNotes}
                            onClose={() => this.setState({ noteModalData: { visible: false, note: null } })}
                        />
                    </Modal>}

                <div className={styles.classNotesTabContaier}>
                    {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                        <>
                            <div className={styles.header}>
                                <h3 className={styles.tabTitle}>Class Notes</h3>
                                <button className={styles.makeNewNoteBtn} onClick={this.onMakeNewNote}>Make New Note</button>
                                <div className={styles.sortContainer}>
                                    <label className={styles.sortLabel}>Sort by:</label>
                                    <select className={styles.sortSelect} value={this.state.sortBy} onChange={(e) => this.onSortByChange(e.target.value)}>
                                        <option value="timestamp">Date</option>
                                        <option value="responses">Responses</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.body}>
                                <div className={styles.notesContainer}>
                                    {this.state.sortedNotes.length === 0 && <div className={styles.noNotes}>No notes yet</div>}
                                    {this.state.sortedNotes.map((note) => {
                                        const noteResponsesLength = note.responses?.length || 0;
                                        return (
                                            <div key={note.id} className={styles.note} onClick={() => this.setState({ noteModalData: { visible: true, note, noteResponsesLength } })}>
                                                <p className={styles.noteText}>{note.title}</p>
                                                <p className={styles.noteTimestamp}>{formatTimestamp(note.timestamp)}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div >
                        </>
                    )}
                </div >
            </>
        );
    }
}

function formatTimestamp(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

ClassNotesTab.propTypes = {
    intl: intlShape.isRequired,
    selectedClass: PropTypes.object.isRequired,
    showTutorialCard: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
    showTutorialCard: (tutorialTitle) => {
        const hasThisTutorialBeenShown = localStorage.getItem("mb-tutorials-" + tutorialTitle);
        if (!hasThisTutorialBeenShown) {
            localStorage.setItem("mb-tutorials-" + tutorialTitle, true);
            dispatch(activateDeck(tutorialTitle));
        }
    }
});

export default injectIntl(connect(null, mapDispatchToProps)(ClassNotesTab));
