import React from 'react';
import styles from "./header.css";

class CodeAssessHeader extends React.Component {

    render() {
        const { children } = this.props;
        return (
            <div className={styles.header}>
                {children} 
            </div>
        );
    }
}


export default CodeAssessHeader;
