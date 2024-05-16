import React from "react";
import styles from "./submit-code-section.css";
import Spinner from '../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../spinner/spinner.css';

export default class SubmitCodeSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
        // load project from autosave
        const asyncFunc = async () => {

            const data = await mv2Interface.loadScratchFile("__autosave");
        }


        asyncFunc();
    }

    render() {
        return <div className={styles.submitCodeSectionContainer}> </div>
    }
}