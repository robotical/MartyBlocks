import React from "react";
import styles from "./teacher-view.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import Spinner from '../../../spinner/spinner.jsx';
import spinnerStyles from '../../../spinner/spinner.css';
import PropTypes from "prop-types";
import AccountButton from "../../account/account-button/account-button.jsx";
import ClassDashboard from "./class-dashboard/class-dashboard.jsx";

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
            isLoading: false,
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
        const { intl } = this.props;

        return (
            <div className={styles.outerContainer} >
                <div className={styles.header}>
                    <div onClick={() => this.onSelectTab("Dashboard")} className={[styles.tab, (this.state.selectedTab === "Dashboard" ? styles.selectedTab : "")].join(" ")}>Dashboard</div>
                    <div onClick={() => this.onSelectTab("Overview")} className={[styles.tab, (this.state.selectedTab === "Overview" ? styles.selectedTab : "")].join(" ")}>Overview</div>
                    <div onClick={() => this.onSelectTab("Students")} className={[styles.tab, (this.state.selectedTab === "Students" ? styles.selectedTab : "")].join(" ")}>Students</div>
                    <div className={styles.headerAccountButtonDiv}>
                        <AccountButton class={this.props.selectedClass} students={this.state.selectedClassStudents || []} />
                    </div>
                </div>
                <div className={styles.selectedTabContentContainer}>
                    {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                        <>
                            {this.state.selectedTab === "Dashboard" &&<ClassDashboard students={[]}/>}
                            {this.state.selectedTab === "Overview" && <div> overview</div>}
                            {this.state.selectedTab === "Students" && <div> students</div>}
                        </>
                    )}
                </div>
            </div>
        );
    }
}

TeacherView.propTypes = {
    intl: intlShape.isRequired,
    selectedClass: PropTypes.object,
};


export default injectIntl(TeacherView);