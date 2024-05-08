import React from "react";
import styles from "./student-view.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import AccountButton from "../../account/account-button/account-button.jsx";
import CodeAssessHeader from "../../header/header.jsx";
import CodeAssessHeaderButton from "../../header/header-button/header-button.jsx";
import JoinSessionButton from "./join-session-button/join-session-button.jsx";

const messages = defineMessages({
    placeholder: {
        defaultMessage: "Tutorials",
        description: "Button to open the tutorials page",
        id: "gui.martyCodeAssess.StudentView.tutorials",
    }
});

class StudentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "Class Hub", // Class Hub, Submit Code
        };
        bindAll(this, [
            'onSelectTab',
        ]);
    }

    componentDidMount() {

    }

    onSelectTab(tab) {
        this.setState({ selectedTab: tab });
    }

    render() {
        const { intl, selectedClassroom, student } = this.props;

        return (
            <div className={styles.outerContainer} >
                <CodeAssessHeader>
                    <CodeAssessHeaderButton onClick={this.onSelectTab} selectedTab={this.state.selectedTab} tabName="Class Hub" />
                    <CodeAssessHeaderButton onClick={this.onSelectTab} selectedTab={this.state.selectedTab} tabName="Submit Code" />
                    <div className={styles.headerSeparator}></div>
                    <div className={styles.joinSessionButtonContainer}>
                        <JoinSessionButton selectedClassroom={selectedClassroom} student={student} />
                    </div>
                    <div className={styles.headerAccountButtonDiv}>
                        <AccountButton class={selectedClassroom} students={selectedClassroom.students || []} />
                    </div>
                </CodeAssessHeader>
                <div className={styles.selectedTabContentContainer}>
                    {this.state.selectedTab === "Class Hub" && <div>Class Hub</div>}
                    {this.state.selectedTab === "Submit Code" && <div>Submit Code</div>}
                </div>
            </div>
        );
    }
}

export default injectIntl(StudentView);