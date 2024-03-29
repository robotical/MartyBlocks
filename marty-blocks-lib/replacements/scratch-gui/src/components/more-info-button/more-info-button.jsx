import React from "react";
import { connect } from 'react-redux';
import bindAll from 'lodash.bindall';

import PropTypes from 'prop-types';

import styles from "./more-info-button.css";
import { activateDraggableModal } from "../../reducers/draggable-modal.js";
import ModalComponent from "../modal/modal.jsx";
import Box from "../box/box.jsx";

class MoreInfoButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            helpModalVisible: false,
        };
        bindAll(this, [
            "clickHandler",
        ]);

    }

    componentDidMount() {
    }

    clickHandler() {
        const Content = this.props.contentComponent;
        const modalTitle = this.props.modalTitle;
        const onHelp = this.props.onHelp;
        this.props.onOpenDraggableModal(<Content />, modalTitle, onHelp);
    }

    render = () => (
        <>
            {
                this.state.helpModalVisible && <ModalComponent
                    id={styles.helpModalContent}
                    className={styles.helpModalContent}
                    headerClassName={styles.header}
                    contentLabel={"How to run the Python code"}
                    onRequestClose={() => this.setState({ helpModalVisible: false })}
                >
                    <Box className={styles.body}>
                        <div className={styles.container}>
                            {this.props.helpModalContent}
                        </div>
                    </Box>
                </ModalComponent>
            }
            <div onClick={this.clickHandler}>
                {this.props.children}
            </div>
        </>
    );
}


const mapDispatchToProps = dispatch => ({
    onOpenDraggableModal: (content, title, onHelp) => dispatch(activateDraggableModal(content, title, onHelp)),
});

MoreInfoButton.propTypes = {
    contentComponent: PropTypes.func.isRequired,
    modalTitle: PropTypes.string.isRequired,
    onOpenDraggableModal: PropTypes.func.isRequired,
    children: PropTypes.node,
    helpModalContent: PropTypes.node,
    onHelp: PropTypes.func,
};

export default connect(
    null,
    mapDispatchToProps
)(MoreInfoButton);
