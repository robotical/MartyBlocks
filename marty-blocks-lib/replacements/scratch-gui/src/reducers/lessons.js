import analytics from '../lib/analytics.js';

import decks from '../lib/libraries/decks/index.jsx';

const CLOSE_LESSONS = 'scratch-gui/lessons/CLOSE_LESSONS';
const SHRINK_EXPAND_LESSONS = 'scratch-gui/lessons/SHRINK_EXPAND_LESSONS';
const VIEW_LESSONS = 'scratch-gui/lessons/VIEW_LESSONS';
const ACTIVATE_DECK = 'scratch-gui/lessons/ACTIVATE_DECK';
const NEXT_STEP = 'scratch-gui/lessons/NEXT_STEP';
const PREV_STEP = 'scratch-gui/lessons/PREV_STEP';
const DRAG_LESSON = 'scratch-gui/lessons/DRAG_LESSON';
const START_DRAG = 'scratch-gui/lessons/START_DRAG';
const END_DRAG = 'scratch-gui/lessons/END_DRAG';

const initialState = {
    visible: false,
    content: decks,
    activeDeckId: null,
    step: 0,
    x: 0,
    y: 0,
    expanded: true,
    dragging: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case CLOSE_LESSONS:
        return Object.assign({}, state, {
            visible: false
        });
    case SHRINK_EXPAND_LESSONS:
        return Object.assign({}, state, {
            expanded: !state.expanded
        });
    case VIEW_LESSONS:
        return Object.assign({}, state, {
            visible: true
        });
    case ACTIVATE_DECK:
        return Object.assign({}, state, {
            activeDeckId: action.activeDeckId,
            step: 0,
            x: 0,
            y: 0,
            expanded: true,
            visible: true
        });
    case NEXT_STEP:
        if (state.activeDeckId !== null) {
            analytics.event({
                category: 'how-to',
                action: 'next step',
                label: `${state.activeDeckId} - ${state.step}`
            });
            return Object.assign({}, state, {
                step: state.step + 1
            });
        }
        return state;
    case PREV_STEP:
        if (state.activeDeckId !== null) {
            if (state.step > 0) {
                return Object.assign({}, state, {
                    step: state.step - 1
                });
            }
        }
        return state;
    case DRAG_LESSON:
        return Object.assign({}, state, {
            x: action.x,
            y: action.y
        });
    case START_DRAG:
        return Object.assign({}, state, {
            dragging: true
        });
    case END_DRAG:
        return Object.assign({}, state, {
            dragging: false
        });
    default:
        return state;
    }
};

const activateDeck = function (activeDeckId) {
    return {
        type: ACTIVATE_DECK,
        activeDeckId
    };
};

const viewLessons = function () {
    return {type: VIEW_LESSONS};
};

const closeLessons = function () {
    return {type: CLOSE_LESSONS};
};

const shrinkExpandLessons = function () {
    return {type: SHRINK_EXPAND_LESSONS};
};

const nextStep = function () {
    return {type: NEXT_STEP};
};

const prevStep = function () {
    return {type: PREV_STEP};
};

const dragLesson = function (x, y) {
    return {type: DRAG_LESSON, x, y};
};

const startDrag = function () {
    return {type: START_DRAG};
};

const endDrag = function () {
    return {type: END_DRAG};
};

export {
    reducer as default,
    initialState as lesssonsInitialState,
    activateDeck,
    viewLessons,
    closeLessons,
    shrinkExpandLessons,
    nextStep,
    prevStep,
    dragLesson,
    startDrag,
    endDrag
};
