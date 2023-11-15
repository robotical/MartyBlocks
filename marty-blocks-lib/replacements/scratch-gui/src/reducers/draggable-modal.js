const CLOSE_DRAGGABLE_MODAL = 'scratch-gui/draggable-modal/CLOSE_DRAGGABLE_MODAL';
const SHRINK_EXPAND_DRAGGABLE_MODAL = 'scratch-gui/draggable-modal/SHRINK_EXPAND_DRAGGABLE_MODAL';
const VIEW_DRAGGABLE_MODAL = 'scratch-gui/draggable-modal/VIEW_DRAGGABLE_MODAL';
const ACTIVATE_DRAGGABLE_MODAL = 'scratch-gui/draggable-modal/ACTIVATE_DRAGGABLE_MODAL';
const DRAG_DRAGGABLE_MODAL = 'scratch-gui/draggable-modal/DRAG_DRAGGABLE_MODAL';
const START_DRAG = 'scratch-gui/draggable-modal/START_DRAG';
const END_DRAG = 'scratch-gui/draggable-modal/END_DRAG';

const initialState = {
    visible: false,
    title: "",
    onHelp: null,
    content: null,
    x: 500,
    y: -2,
    expanded: true,
    dragging: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case CLOSE_DRAGGABLE_MODAL:
            return Object.assign({}, state, {
                visible: false,
                content: null,
                title: "",
                onHelp: null
            });
        case SHRINK_EXPAND_DRAGGABLE_MODAL:
            return Object.assign({}, state, {
                expanded: !state.expanded
            });
        case VIEW_DRAGGABLE_MODAL:
            return Object.assign({}, state, {
                visible: true
            });
        case ACTIVATE_DRAGGABLE_MODAL:
            return Object.assign({}, state, {
                // x: 500,
                // y: -2,
                // expanded: true,
                ...state,
                visible: true,
                title: action.title,
                onHelp: action.onHelp,
                content: action.content,
            });
        case DRAG_DRAGGABLE_MODAL:
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

const activateDraggableModal = function (content, title, onHelp) {
    return {
        type: ACTIVATE_DRAGGABLE_MODAL,
        content: content,
        title: title,
        onHelp: onHelp
    };
};

const viewDraggableModal = function () {
    return { type: VIEW_DRAGGABLE_MODAL };
};

const closeDraggableModal = function () {
    return { type: CLOSE_DRAGGABLE_MODAL };
};

const shrinkExpandDraggableModal = function () {
    return { type: SHRINK_EXPAND_DRAGGABLE_MODAL };
};

const dragDraggableModal = function (x, y) {
    return { type: DRAG_DRAGGABLE_MODAL, x, y };
};

const startDrag = function () {
    return { type: START_DRAG };
};

const endDrag = function () {
    return { type: END_DRAG };
};

export {
    reducer as default,
    initialState as draggableModalInitialState,
    activateDraggableModal,
    viewDraggableModal,
    closeDraggableModal,
    shrinkExpandDraggableModal,
    dragDraggableModal,
    startDrag,
    endDrag
};
