import React from "react";
import styles from "./make-new-note-modal.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import Spinner from '../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../spinner/spinner.css';

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.MakeNewNoteModal.",
    }
});

class MakeNewNoteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newNoteText: '',
            newNoteTitle: '',
            newNoteImages: [],
            imagesProgressBar: undefined,
            isLoading: false,
        };
        bindAll(this, [
            'handleNewNoteTextChange',
            'handleNewNoteTitleChange',
            'submitNewNote',
            'handleImagesChange',
            'initialiseImagesProgressBar',
        ]);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleNewNoteTextChange(event) {
        this.setState({ newNoteText: event.target.value });
    }

    handleNewNoteTitleChange(event) {
        this.setState({ newNoteTitle: event.target.value });
    }

    initialiseImagesProgressBar(files) {
        const totalSize = files.reduce((acc, file) => acc + file.size, 0);
        this.setState({ imagesProgressBar: { totalSize, loadedSize: 0 } });
    }


    handleImagesChange(event) {
        const files = Array.from(event.target.files);
        this.initialiseImagesProgressBar(files);
        this.setState({ newNoteImages: files });
        files.map(file => {
            const reader = new FileReader();
            reader.onprogress = event => {
                // Update progress
                if (event.lengthComputable) {
                    const loadedSize = event.loaded;
                    this.setState(prevState => {
                        const updatedProgressBar = { ...prevState.imagesProgressBar, loadedSize: prevState.imagesProgressBar.loadedSize + loadedSize };
                        return { imagesProgressBar: updatedProgressBar };
                    });
                }
            };
            reader.onload = () => {
                this.setState(prevState => {
                    const newNoteImages = [...prevState.newNoteImages];
                    const imageIndex = newNoteImages.findIndex(image => image.name === file.name);
                    newNoteImages[imageIndex] = { name: file.name, base64: reader.result };
                    return { newNoteImages };
                });
            };
            reader.onerror = console.error;
            reader.readAsDataURL(file);
        });
    }

    async submitNewNote() {
        if (this.state.imagesProgressBar.totalSize !== this.state.imagesProgressBar.loadedSize) return;
        this.setState({ isLoading: true });
        await codeAssess.teacher.makeNoteForClass(this.props.selectedClass.id, this.state.newNoteTitle, this.state.newNoteText, this.state.newNoteImages);
        this.props.handleRefreshAfterNoteCreation();
        this.props.onClose();
        this.setState({ isLoading: false });
    }

    render() {
        const { intl } = this.props;
        if (!this.props.selectedClass) {
            return <div>No class selected</div>;
        }

        return (
            <div className={styles.makeNewNoteModal}>
                {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                    <div>
                        <section className={styles.makeNewNoteModalContent}>
                            <h3>Note Title</h3>
                            <input
                                value={this.state.newNoteTitle}
                                onChange={this.handleNewNoteTitleChange}
                                placeholder="Note Title"
                            />
                            <h3>Note Text</h3>
                            <textarea
                                value={this.state.newNoteText}
                                onChange={this.handleNewNoteTextChange}
                                placeholder="Type your note here"
                            />
                            <h3>Upload Images</h3>
                            <input type="file"
                                onChange={this.handleImagesChange}
                                accept="image/*" multiple
                            />
                            <div>
                                <div style={{ width: '100%', backgroundColor: '#ddd' }}>
                                    <div style={{ height: '20px', width: `${this.state.imagesProgressBar ? this.state.imagesProgressBar.loadedSize / this.state.imagesProgressBar.totalSize * 100 : 0}%`, backgroundColor: 'green' }}>
                                        {this.state.imagesProgressBar ? `${(this.state.imagesProgressBar.loadedSize / this.state.imagesProgressBar.totalSize * 100).toFixed(0)}%` : '0%'}
                                    </div>
                                </div>
                            </div>
                            <button onClick={this.submitNewNote}>Store Note</button>
                        </section>

                    </div>
                )}
            </div>
        );
    }
}



MakeNewNoteModal.propTypes = {
    intl: intlShape.isRequired,
    selectedClass: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    handleRefreshAfterNoteCreation: PropTypes.func.isRequired,
};


export default injectIntl(MakeNewNoteModal);