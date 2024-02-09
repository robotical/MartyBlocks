import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import keyboardIcon from './icon--keyboard.svg';
import styles from './keyboard-caller.css';

class KeyboardCaller extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'onClick'
        ]);
    }

    onClick() {
        document.getElementById("dummyInputToBringUpDeviceKeyboard").focus();
    }

    render() {
        const isReactNative = !!window.ReactNativeWebView;
        if (!isReactNative) {
            return null;
        }
        return (
            <>
                <div
                    className={styles.keyboardCaller}
                    onClick={this.onClick}
                >
                    <img
                        className={styles.keyboardIcon}
                        src={keyboardIcon}
                    />
                </div>
                <input
                    id="dummyInputToBringUpDeviceKeyboard"
                    type="text"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "0px",
                        height: "0px",
                        opacity: 0
                    }}
                />
            </>
        );
    }
}

KeyboardCaller.propTypes = {
};

export default KeyboardCaller;