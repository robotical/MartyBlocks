import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import Draggable from 'react-draggable';

import styles from './styles.css';

import shrinkIcon from './icon--shrink.svg';
import expandIcon from './icon--expand.svg';

import helpIcon from '../../lib/assets/icon--help.svg';
import closeIcon from './icon--close.svg';

const DraggableModalHeader = ({ onCloseDraggableModal, onShrinkExpandDraggableModal, expanded, title, onHelp }) => (
    <div className={expanded ? styles.headerButtons : classNames(styles.headerButtons, styles.headerButtonsHidden)} id="draggable-modal-header">
        {onHelp && <div
            className={styles.allButton}
            onClick={onHelp}
        >
            <img
                className={styles.helpIcon}
                src={helpIcon}
            />
            <FormattedMessage
                defaultMessage="Help"
                description="Title for button to open the help modal"
                id="gui.draggable-modal.help"
            />
        </div>}
        <div className={styles.headerTitle}>
            {title}
        </div>
        <div className={styles.headerButtonsRight}>
            <div
                className={styles.shrinkExpandButton}
                onClick={onShrinkExpandDraggableModal}
            >
                <img
                    draggable={false}
                    src={expanded ? shrinkIcon : expandIcon}
                />
                {expanded ?
                    <FormattedMessage
                        defaultMessage="Shrink"
                        description="Title for button to shrink how-to card"
                        id="gui.cards.shrink"
                    /> :
                    <FormattedMessage
                        defaultMessage="Expand"
                        description="Title for button to expand how-to card"
                        id="gui.cards.expand"
                    />
                }
            </div>
            <div
                className={styles.removeButton}
                onClick={onCloseDraggableModal}
            >
                <img
                    className={styles.closeIcon}
                    src={closeIcon}
                />
                <FormattedMessage
                    defaultMessage="Close"
                    description="Title for button to close how-to card"
                    id="gui.cards.close"
                />
            </div>
        </div>
    </div>
);


DraggableModalHeader.propTypes = {
    expanded: PropTypes.bool.isRequired,
    onCloseDraggableModal: PropTypes.func.isRequired,
    onShrinkExpandDraggableModal: PropTypes.func.isRequired,
    title: PropTypes.string,
    onHelp: PropTypes.func
};

const DraggableModal = props => {
    const {
        content,
        dragging,
        isRtl,
        onCloseDraggableModal,
        onShrinkExpandDraggableModal,
        onDrag,
        onStartDrag,
        onEndDrag,
        expanded,
        ...posProps
    } = props;
    let { x, y } = posProps;


    // Tutorial cards need to calculate their own dragging bounds
    // to allow for dragging the cards off the left, right and bottom
    // edges of the workspace.
    const cardHorizontalDragOffset = 400; // ~80% of card width
    const cardVerticalDragOffset = expanded ? 257 : 0; // ~80% of card height, if expanded
    const menuBarHeight = 48; // TODO: get pre-calculated from elsewhere?
    const wideCardWidth = 500;

    if (x === 0 && y === 0) {
        // initialize positions
        x = isRtl ? (-190 - wideCardWidth - cardHorizontalDragOffset) : 292;
        x += cardHorizontalDragOffset;
        // The tallest cards are about 320px high, and the default position is pinned
        // to near the bottom of the blocks palette to allow room to work above.
        const tallCardHeight = 500;
        const bottomMargin = 60; // To avoid overlapping the backpack region
        y = window.innerHeight - tallCardHeight - bottomMargin - menuBarHeight;
    }

    return (
        // Custom overlay to act as the bounding parent for the draggable, using values from above
        <div
            className={styles.cardContainerOverlay}
            style={{
                width: `${window.innerWidth + (2 * cardHorizontalDragOffset)}px`,
                height: `${window.innerHeight - menuBarHeight + cardVerticalDragOffset}px`,
                top: `${menuBarHeight}px`,
                left: `${-cardHorizontalDragOffset}px`
            }}
        >
            <Draggable
                bounds="parent"
                cancel="#video-div" // disable dragging on video div
                handle="#draggable-modal-header" // only the header is draggable
                position={{ x: x, y: y }}
                onDrag={onDrag}
                onStart={onStartDrag}
                onStop={onEndDrag}
            >
                <div className={styles.cardContainer}>
                    <div className={styles.card}>
                        <DraggableModalHeader
                            expanded={expanded}
                            onCloseDraggableModal={onCloseDraggableModal}
                            onShrinkExpandDraggableModal={onShrinkExpandDraggableModal}
                            onHelp={props.onHelp}
                            title={props.title}
                        />
                        <div className={expanded ? styles.stepBody : styles.hidden}>
                            {props.content}
                        </div>
                    </div>
                </div>
            </Draggable>
        </div>
    );
};

DraggableModal.propTypes = {
    content: PropTypes.node,
    title: PropTypes.string,
    onHelp: PropTypes.func,
    dragging: PropTypes.bool.isRequired,
    expanded: PropTypes.bool.isRequired,
    isRtl: PropTypes.bool.isRequired,
    onCloseDraggableModal: PropTypes.func.isRequired,
    onDrag: PropTypes.func,
    onEndDrag: PropTypes.func,
    onShrinkExpandDraggableModal: PropTypes.func.isRequired,
    onStartDrag: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number
};


export {
    DraggableModal as default,
};
