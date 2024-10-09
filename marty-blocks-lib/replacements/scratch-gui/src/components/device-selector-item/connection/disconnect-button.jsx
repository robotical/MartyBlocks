import React from 'react';
import styles from "./styles.css";
import { FormattedMessage } from "react-intl";

export default function DisonnectButton({ onClick }) {

    return (
        <button
            className={styles.disconnectButton}
            onClick={onClick}
        >
            <FormattedMessage
                defaultMessage="Disconnect"
                description="Button to connect to a device"
                id="gui.deviceSelector.connect"
            />
        </button>
    );

}


