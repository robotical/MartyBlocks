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
                [action.popup]: false,
                popupProps: {}
            });
        default:
            return state;
    }
};

const openPopup = function (popup, popupProps) {
    return {
        type: OPEN_POPUP,
        popup: popup,
        popupProps: popupProps || {}
    };
};

const closePopup = function (popup) {
    return {
        type: CLOSE_POPUP,
        popup: popup
    };
};

const openPopupBadge = function (popupProps) {
    return openPopup(POPUP_BADGE, popupProps);
};

const closePopupBadge = function () {
    return closePopup(POPUP_BADGE);
};

export {
    reducer as default,
    initialState as badgePopupInitialState,
    openPopupBadge,
    closePopupBadge
};