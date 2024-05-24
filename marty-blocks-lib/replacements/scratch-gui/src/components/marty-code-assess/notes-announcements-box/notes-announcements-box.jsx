import React from "react";
import styles from "./notes-announcements-box.css";
import iconPlus from "./icon--plus.svg";
import iconImage from "./icon--image.svg";
import Spinner from '../../spinner/spinner.jsx';
import spinnerStyles from '../../spinner/spinner.css';
import ExpandableImage from "../expandable-image/expandable-image.jsx";

const PublishedEventsEnum = window.codeAssess.codeAssessLib.PublishedEventsEnum;
const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();

const SESSION_ANNOUNCEMENT_ADDED_SUBSCRIPTION = "SESSION_ANNOUNCEMENT_ADDED_SUBSCRIPTION_";

class NotesAnnouncementsBox extends React.Component {

    constructor(props) {
        super(props);
        this.handleItemFileChange = this.handleItemFileChange.bind(this);
        this.setFileInputRef = this.setFileInputRef.bind(this);
        this.triggerFileInput = this.triggerFileInput.bind(this);
        this.handleAddNewItem = this.handleAddNewItem.bind(this);

        this.state = {
            items: [],
            isAddinNewItem: false,
            itemFile: null,
            itemText: "",
            isLoading: false,
        };

        this.fileInputRef = null;
    }

    componentDidMount() {
        codeAssessClientFacade.subscribe(SESSION_ANNOUNCEMENT_ADDED_SUBSCRIPTION + this.props.title, PublishedEventsEnum.SESSION_ANNOUNCEMENT_ADDED, () => this.setState({ isLoading: false }));
    }

    componentWillUnmount() {
        codeAssessClientFacade.unsubscribe(SESSION_ANNOUNCEMENT_ADDED_SUBSCRIPTION + this.props.title);
    }

    handleItemFileChange(event) {
        const file = event.target.files[0];
        this.setState({ itemFile: file });
    }

    setFileInputRef(element) {
        this.fileInputRef = element;
    }

    triggerFileInput() {
        this.fileInputRef.click();
    }

    async handleAddNewItem() {
        this.setState({ isLoading: true });
        if (!this.state.itemText) {
            return;
        }
        const wasAdded = await this.props.onAddNewItem(this.state.itemText, this.state.itemFile);
        if (wasAdded) {
            this.setState({ isLoading: false });
        }
        this.setState({ isAddinNewItem: false, itemText: "", itemFile: null });
    }

    render() {
        const {
            intl,
            items,
            title,
            onAddNewItem,
            disabled
        } = this.props;

        const reverseItems = [...items].reverse();

        const itemsJsx = reverseItems.map((item, idx) => {
            const words = item.text.split(" ");
            // Map over words and convert each word into either a link or a text node
            const itemWithUrls = words.map((word, wordIndex) => {
                // Assuming isWordALink is a function that determines if a word is a URL
                if (isWordALink(word)) {
                    const urlWithProtocol = ensureHttpPrefix(word);
                    return <a key={wordIndex} href={urlWithProtocol} target="_blank" rel="noopener noreferrer">{word}</a>;
                }
                return <span key={wordIndex}>{word}</span>;
            });

            // Use React Fragments to avoid unnecessary divs and directly insert spaces
            const content = itemWithUrls.reduce((acc, elem, index) => {
                return index === 0 ? [elem] : [...acc, ' ', elem]; // Insert spaces between elements
            }, []);

            return (
                <li key={item.id + idx} className={styles.item}>
                    {content}
                    {item.imageUrl && (
                        <>
                            <br />
                            <ExpandableImage imageUrl={item.imageUrl} imageThumbnailSize='large' />
                        </>
                    )}
                </li>
            );
        });

        if (disabled) {
            return <div className={styles.itemsBoxContainer}>
                <div className={styles.itemsContainer}>
                    <div className={[styles.itemsTitle, styles.itemsTitleDisabled].join(" ")}>{title}</div>
                    <div className={styles.itemsContent}>
                        {itemsJsx}
                    </div>
                </div>
            </div>
        }

        if (this.state.isLoading) {
            return <div className={styles.itemsBoxContainer}>
                <div className={styles.itemsContainer}>
                    <div className={styles.itemsTitle}>{title}</div>
                    <Spinner level='warn' large className={spinnerStyles.primary} />
                </div>
            </div>
        }

        return (
            <div className={styles.itemsBoxContainer}>
                <div className={styles.itemsContainer}>
                    <div className={styles.itemsTitle}>{title}</div>
                    {this.state.isAddinNewItem ? (
                        <div className={styles.addNewItemContainer}>
                            <input type="text" className={styles.addNewItemInput} placeholder={`Add new item`} onChange={(e) => this.setState({ itemText: e.target.value })} value={this.state.itemText} />
                            <input type="file" onChange={this.handleItemFileChange} style={{ display: 'none' }} ref={this.setFileInputRef} accept="image/jpeg, image/png, image/gif" />
                            <img src={iconImage} alt="Upload" onClick={this.triggerFileInput} className={styles.addIconImage} />
                            <div className={styles.deleteFile} onClick={() => this.setState({ itemFile: null })}>{this.state.itemFile ? "X" : ""}</div>
                            <div className={styles.fileName}>{this.state.itemFile ? this.state.itemFile.name : ""}</div>
                            <button className={styles.addNewItemButton} onClick={this.handleAddNewItem}>Add</button>
                            <button className={styles.cancelNewItemButton} onClick={() => this.setState({ isAddinNewItem: false })}>Cancel</button>
                        </div>
                    ) : (
                        <ul className={styles.itemsContent}>
                            {itemsJsx}
                        </ul>
                    )}
                </div>
                {!this.state.isAddinNewItem && <div className={styles.addNewItemIconButton} onClick={() => this.setState({ isAddinNewItem: true })}>
                    <img src={iconPlus} className={styles.addNewItemIcon} />
                </div>}
            </div>
        )
    }

}

export default NotesAnnouncementsBox;

const isWordALink = (word) => {
    // with or without http(s) and with or without www
    const regex = /(http(s)?:\/\/)?(www\.)?([a-zA-Z0-9]+)\.([a-zA-Z0-9]{2,})/;
    return regex.test(word);
};

const ensureHttpPrefix = (url) => {
    // Simple check to prepend "https://" if the URL does not start with "http://" or "https://"
    if (!/^https?:\/\//i.test(url)) {
        return `https://${url}`;
    }
    return url;
};