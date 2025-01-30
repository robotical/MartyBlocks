import React from 'react';
import styles from "./styles.css";
import { FormattedMessage } from "react-intl";

export default function ConnectButton({ onClick, id }) {

    return (
        <button
            className={styles.connectButton}
            onClick={onClick}
            id={id}
        >
            <FormattedMessage
                defaultMessage="CONNECT"
                description="Button to connect to a device"
                id="gui.deviceSelector.connect"
            />
        </button>
    );

}


