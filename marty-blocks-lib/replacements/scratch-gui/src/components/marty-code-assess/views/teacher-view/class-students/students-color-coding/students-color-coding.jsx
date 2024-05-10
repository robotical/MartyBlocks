import React from 'react';
import styles from "./students-color-coding.css";

export default class StudentsColorCoding extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return <div className={styles.colourTableContainer}>
            <div className={styles.colourTable}>
                <div className={styles.colourTableRowsContainer}>
                    <div className={styles.colourTableRow}>
                        <div className={styles.colourTableRowColour} style={{ backgroundColor: "#FF6F61" }}></div>
                        <div className={styles.colourTableRowText}>{"Underachieving"}</div>
                    </div>
                    <div className={styles.colourTableRow}>
                        <div className={styles.colourTableRowColour} style={{ backgroundColor: "#FFC107" }}></div>
                        <div className={styles.colourTableRowText}>{"Intermediate"}</div>
                    </div>
                    <div className={styles.colourTableRow}>
                        <div className={styles.colourTableRowColour} style={{ backgroundColor: "#50C124" }}></div>
                        <div className={styles.colourTableRowText}>{"Adept"}</div>
                    </div>
                    <div className={styles.colourTableRow}>
                        <div className={styles.colourTableRowColour} style={{ backgroundColor: "#009688" }}></div>
                        <div className={styles.colourTableRowText}>{"Champion"}</div>
                    </div>
                </div>
            </div>
        </div>
    }
}