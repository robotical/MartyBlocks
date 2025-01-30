import React from 'react';
import styles from "./styles.css";
import BTDisconnectIcon from './icon--bt-disconnect.svg';

export default function DisonnectButton({ onClick, id }) {

    return (
        <button
            className={styles.disconnectButton}
            onClick={onClick}
            id={id}
        >
            <img src={BTDisconnectIcon} />
        </button>
    );

}


