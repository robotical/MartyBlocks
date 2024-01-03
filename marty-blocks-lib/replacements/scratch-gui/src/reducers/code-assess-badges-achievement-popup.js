const OPEN_POPUP = 'scratch-gui/popups/OPEN_POPUP';
const CLOSE_POPUP = 'scratch-gui/popups/CLOSE_POPUP';

const POPUP_BADGE = 'badgePopup';

const initialState = {
    [POPUP_BADGE]: false,
    popupProps: {}
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case OPEN_POPUP:
        return Object.assign({}, state, {
            [action.popup]: true,
            popupProps: action.popupProps
        });
    case CLOSE_POPUP:
        return Object.assign({}, state, {
            [action.modal]: false,
            modalProps: {}
        });
    default:
        return state;
    }
};
const openPopup = function (modal, modalProps) {
    return {
        type: OPEN_POPUP,
        modal: modal,
        modalProps: modalProps || {}
    };
};
const closePopup = function (modal) {
    return {
        type: CLOSE_POPUP,
        modal: modal
    };
};

const openPopupBadge = function (modalProps) {
    return openPopup(POPUP_BADGE, modalProps);
}

const closePopupBadge = function () {
    return closePopup(POPUP_BADGE);
}

export {
    reducer as default,
    initialState as badgePopupInitialState,
    openPopupBadge,
    closePopupBadge
};
