import React from "react";
import styles from "./teacher-view.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import AccountButton from "../../account/account-button/account-button.jsx";
import ClassDashboard from "./class-dashboard/class-dashboard.jsx";
import StopStartSession from "./stop-start-session/stop-start-session.jsx";
import CodeAssessHeader from "../../header/header.jsx";
import CodeAssessHeaderButton from "../../header/header-button/header-button.jsx";

const messages = defineMessages({
    placeholder: {
        defaultMessage: "Tutorials",
        description: "Button to open the tutorials page",
        id: "gui.martyCodeAssess.teacherView.tutorials",
    }
});

class TeacherView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "Dashboard", // Dashboard, Overview, Students
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
        const { intl, activeSession, selectedClassroom } = this.props;

        return (
            <div className={styles.outerContainer} >
                <CodeAssessHeader>
                    <CodeAssessHeaderButton onClick={this.onSelectTab} selectedTab={this.state.selectedTab} tabName="Dashboard" />
                    <CodeAssessHeaderButton onClick={this.onSelectTab} selectedTab={this.state.selectedTab} tabName="Overview" />
                    <CodeAssessHeaderButton onClick={this.onSelectTab} selectedTab={this.state.selectedTab} tabName="Students" />
                    <div className={styles.headerSeparator}></div>
                    <StopStartSession activeSession={activeSession} />
                    <div className={styles.headerAccountButtonDiv}>
                        <AccountButton class={selectedClassroom} students={selectedClassroom.students || []} />
                    </div>
                </CodeAssessHeader>
                <div className={styles.selectedTabContentContainer}>
                    {this.state.selectedTab === "Dashboard" && <ClassDashboard
                        activeSession={activeSession}
                        selectedClassroom={selectedClassroom}
                    />}
                    {this.state.selectedTab === "Overview" && <div> overview</div>}
                    {this.state.selectedTab === "Students" && <div> students</div>}
                </div>
            </div>
        );
    }
}

export default injectIntl(TeacherView);