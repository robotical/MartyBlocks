import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import styles from './account-button.css';
import accountIcon from "./icon--account.svg";
import Modal from "../../../../containers/modal.jsx";
import ExportDataModalTeacher from '../export-data-modal/teacher/export-data-modal__teacher.jsx';
import RemoveAccountModal from '../remove-account-modal/remove-account-modal.jsx';


class AccountButton extends React.Component {

    constructor(props) {
        super(props);

        bindAll(this, [
            'accountButtonClicked',
            'setDropdownRef',
            'handleClickOutside',
            'dropdownItemClicked',
            'onCloseModal',
            'onSetModal'
        ]);

        this.dropdownRef = null;
        this.state = {
            dropdownOpen: false,
            modal: {
                visible: false,
                content: null,
                title: null,
            }
        };
    }

    componentDidMount() {
        document.addEventListener('pointerdown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('pointerdown', this.handleClickOutside);
    }

    accountButtonClicked() {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    }

    setDropdownRef = element => {
        this.dropdownRef = element;
    }

    handleClickOutside(event) {
        if (this.dropdownRef && !this.dropdownRef.contains(event.target) && this.state.dropdownOpen) {
            this.setState({ dropdownOpen: false });
        }
    }

    dropdownItemClicked(event, item) {
        event.stopPropagation();
        if (item === 'logout') {
            codeAssess.logUserOut();
        } else if (item === 'export-data') {
            this.onSetModal(<ExportDataModalTeacher
                students={this.props.students}
                class={this.props.class}
                onClose={this.onCloseModal}
            />, 'Export Data'); 
        } else if (item === 'removeAccount') {
            this.onSetModal(<RemoveAccountModal onClose={this.onCloseModal}/>, 'Remove Account');
        }
        this.setState({ dropdownOpen: false });
    }

    onSetModal(content, title) {
        this.setState({ modal: { visible: true, content: content, title: title } });
    }

    onCloseModal() {
        this.setState({ modal: { visible: false, content: null, title: null } });
    }

    render() {

        return <>
            {this.state.modal.visible &&
                <Modal
                    onRequestClose={this.onCloseModal}
                    fullScreen={false}
                    className={styles.modal}
                    id="account-button-modal"
                    contentLabel={this.state.modal.title}
                >
                    {this.state.modal.content}
                </Modal>
            }

            <div className={styles.accountButtonContainer} onClick={this.accountButtonClicked} >
                <div
                    className={classNames(styles.accountButton, styles.accountButtonClickable)}
                >
                    <img
                        className={styles.accountIcon}
                        src={accountIcon}
                    />
                </div>
                <div className={styles.dropdownContainer}>
                    {this.state.dropdownOpen && <div className={styles.dropdown} ref={this.setDropdownRef}>
                        <div className={styles.dropdownItem} onClick={(event) => this.dropdownItemClicked(event, 'export-data')}>
                            <div className={styles.dropdownItemText}>Export Data</div>
                        </div>
                        <div className={styles.dropdownItem}>
                            <div className={styles.dropdownItemText} onClick={(event) => this.dropdownItemClicked(event, 'logout')}>Sign Out</div>
                        </div>
                        <div className={styles.dropdownItem}>
                            <div className={[styles.dropdownItemText, styles.dropdownItemText_Remove].join(" ")} onClick={(event) => this.dropdownItemClicked(event, 'removeAccount')}>Remove Account</div>
                        </div>
                    </div>}
                </div>
            </div >
        </>
    }

}

AccountButton.propTypes = {
    class: PropTypes.object.isRequired,
    students: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default AccountButton;