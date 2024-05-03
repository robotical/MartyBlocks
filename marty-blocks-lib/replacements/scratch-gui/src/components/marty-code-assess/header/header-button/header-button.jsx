import React from 'react';
import styles from "./header-button.css";

class CodeAssessHeaderButton extends React.Component {

    render() {
        const { onClick, selectedTab, tabName } = this.props;

        return (
            <div onClick={() => onClick(tabName)} className={[styles.tab, (selectedTab === tabName ? styles.selectedTab : "")].join(" ")}>{tabName}</div>
        );
    }
}

export default CodeAssessHeaderButton;