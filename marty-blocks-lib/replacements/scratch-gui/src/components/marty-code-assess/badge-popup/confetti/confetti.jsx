import React from 'react';
import styles from './confetti.css';

const Confetti = (props) => (

    <div className={styles.confetti} onClick={props.onClick}>
        <div className={styles.confettiPiece}></div>
        <div className={styles.confettiPiece}></div>
        <div className={styles.confettiPiece}></div>
        <div className={styles.confettiPiece}></div>
        <div className={styles.confettiPiece}></div>
        <div className={styles.confettiPiece}></div>
        <div className={styles.confettiPiece}></div>
        <div className={styles.confettiPiece}></div>
        <div className={styles.confettiPiece}></div>
        <div className={styles.confettiPiece}></div>
        <div className={styles.confettiPiece}></div>
        <div className={styles.confettiPiece}></div>
        <div className={styles.confettiPiece}></div>
    </div>

);

export default Confetti;