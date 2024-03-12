import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import keyboardIcon from './icon--keyboard.svg';
import styles from './keyboard-caller.css';

class KeyboardCaller extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'onClick',
            'onInput',
            'onFocus',
            'setInputRef',
            'handleKeyDown'
        ]);

        this.state = {
            inputValue: ""
        };

        this.inputRef = null;
    }

    onClick() {
        document.getElementById("dummyInputToBringUpDeviceKeyboard").focus();
    }

    onInput(e) {
        this.setState({ inputValue: e.target.value });
    }

    onFocus() {
        this.setState({ inputValue: "" });
    }

    setInputRef = (input) => {
        this.inputRef = input;
    }

    handleKeyDown(e) {
        setTimeout(() => {
            this.inputRef.blur();
        }, 500);
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
                    ref={this.setInputRef}
                    onInput={this.onInput}
                    onKeyDown={this.handleKeyDown}
                    onFocus={this.onFocus}
                    value={this.state.inputValue}
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