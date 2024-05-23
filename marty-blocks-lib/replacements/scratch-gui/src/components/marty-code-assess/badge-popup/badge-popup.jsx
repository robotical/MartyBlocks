import classNames from 'classnames';
import React from 'react';
import ReactModal from 'react-modal';
import bindAll from 'lodash.bindall';

import styles from './badge-popup.css';
import SVGWrapper from '../student-badges/svg-wrapper.jsx';
import svgs from '../student-badges/svgs.jsx';

import Confetti from './confetti/confetti.jsx';

class BadgePopup extends React.Component {

    constructor(props) {
        super(props);

        bindAll(this, [
        ]);
    }

    componentDidMount() {
        setTimeout(this.props.onRequestClose, 4500);
    }

    render() {
        let badgeSvg = svgs.Conditionals;
        let badgeColors = ["gold", "gold", "gold"];
        Object.keys(this.props.achievedStars).forEach((key) => {
            for (let i = 0; i < this.props.achievedStars[key].length; i++) {
                if (this.props.achievedStars[key][i]) {
                    badgeSvg = svgs[key];
                    badgeColors = ["black", "black", "black"];
                    badgeColors[i] = this.props.achievedStars[key][i];
                    break;
                }
            }
        });

        return (
            <ReactModal
                isOpen
                className={classNames(styles.modalContent)}
                overlayClassName={styles.modalOverlay}
                onRequestClose={this.props.onRequestClose}
            >
                <Confetti onClick={this.props.onRequestClose} />
                <div className={styles.badgeContainer}>
                    <SVGWrapper svg={badgeSvg} colors={badgeColors} offsets={[1, 1, 1]} category="conditionals" />
                </div>
            </ReactModal >)
    }
}

export default BadgePopup;
