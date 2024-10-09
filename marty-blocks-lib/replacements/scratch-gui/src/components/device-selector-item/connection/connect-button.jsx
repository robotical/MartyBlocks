import React from 'react';
import styles from "./styles.css";
import { FormattedMessage } from "react-intl";

export default function ConnectButton({ onClick }) {

    return (
        <button
            className={styles.connectButton}
            onClick={onClick}
        >
            <FormattedMessage
                defaultMessage="Connect"
                description="Button to connect to a device"
                id="gui.deviceSelector.connect"
            />
        </button>
    );

}


