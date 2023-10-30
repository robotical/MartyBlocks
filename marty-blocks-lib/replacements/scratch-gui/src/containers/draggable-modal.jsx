import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
    closeDraggableModal,
    shrinkExpandDraggableModal,
    dragDraggableModal,
    startDrag,
    endDrag
} from '../reducers/draggable-modal';

import DraggableModalComponent from '../components/draggable-modal/draggable-modal.jsx';

class DraggableModal extends React.Component {
    componentDidMount () {

    }
    componentDidUpdate (prevProps) {

    }
    render () {
        return (
            <DraggableModalComponent {...this.props} />
        );
    }
}

DraggableModal.propTypes = {
    locale: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    visible: state.scratchGui.draggableModal.visible,
    content: state.scratchGui.draggableModal.content,
    title: state.scratchGui.draggableModal.title,
    onHelp: state.scratchGui.draggableModal.onHelp,
    expanded: state.scratchGui.draggableModal.expanded,
    x: state.scratchGui.draggableModal.x,
    y: state.scratchGui.draggableModal.y,
    isRtl: state.locales.isRtl,
    locale: state.locales.locale,
    dragging: state.scratchGui.draggableModal.dragging,
});

const mapDispatchToProps = dispatch => ({
    onCloseDraggableModal: () => dispatch(closeDraggableModal()),
    onShrinkExpandDraggableModal: () => dispatch(shrinkExpandDraggableModal()),
    onDrag: (e_, data) => dispatch(dragDraggableModal(data.x, data.y)),
    onStartDrag: () => dispatch(startDrag()),
    onEndDrag: () => dispatch(endDrag())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DraggableModal);
