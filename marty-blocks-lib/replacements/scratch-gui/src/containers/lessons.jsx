import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
    activateDeck,
    closeLessons,
    shrinkExpandLessons,
    nextStep,
    prevStep,
    dragLesson,
    startDrag,
    endDrag
} from '../reducers/lessons';

import LessonsComponent from '../components/lessons/lessons.jsx';
import {loadImageData} from '../lib/libraries/decks/translate-image.js';
import {notScratchDesktop} from '../lib/isScratchDesktop';

class Lessons extends React.Component {
    componentDidMount () {
        if (this.props.locale !== 'en') {
            loadImageData(this.props.locale);
        }
    }
    componentDidUpdate (prevProps) {
        if (this.props.locale !== prevProps.locale) {
            loadImageData(this.props.locale);
        }
    }
    render () {
        return (
            <LessonsComponent {...this.props} />
        );
    }
}

Lessons.propTypes = {
    locale: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    visible: state.scratchGui.lessons.visible,
    content: state.scratchGui.lessons.content,
    activeDeckId: state.scratchGui.lessons.activeDeckId,
    step: state.scratchGui.lessons.step,
    expanded: state.scratchGui.lessons.expanded,
    x: state.scratchGui.lessons.x,
    y: state.scratchGui.lessons.y,
    isRtl: state.locales.isRtl,
    locale: state.locales.locale,
    dragging: state.scratchGui.lessons.dragging,
    showVideos: notScratchDesktop()
});

const mapDispatchToProps = dispatch => ({
    onActivateDeckFactory: id => () => dispatch(activateDeck(id)),
    onCloseLessons: () => dispatch(closeLessons()),
    onShrinkExpandLessons: () => dispatch(shrinkExpandLessons()),
    onNextStep: () => dispatch(nextStep()),
    onPrevStep: () => dispatch(prevStep()),
    onDrag: (e_, data) => dispatch(dragLesson(data.x, data.y)),
    onStartDrag: () => dispatch(startDrag()),
    onEndDrag: () => dispatch(endDrag())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lessons);
