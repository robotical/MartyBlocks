import React from "react";
import styles from "./class-student.css";
import bindAll from 'lodash.bindall';
import { defineMessages, injectIntl } from "react-intl";
import SpiderGraph from "../../../../../plots/spider-graph/spider-graph.jsx";
import StudentPieChart from "../../../../../plots/student-pie-chart/student-pie-chart.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.classStudents.classStudent",
    }
});

class ClassStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        bindAll(this, [
        ]);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render() {
        const { intl, student, studentGraphData, colors } = this.props;

        
        let studentJsx = null;
        if (studentGraphData) {
            studentJsx = <StudentPieChart
                plotTitle={student.firstName + " " + student.lastName}
                size="medium"
                colors={colors}
            />;
        }

        return (
            <>
                <div className={styles.classStudent} onClick={this.modalToggle}>
                    <div className={styles.classStudentPltContainer} onClick={this.props.onClick}>
                        {studentJsx}
                    </div>
                </div>
            </>
        );
    }

}


export default injectIntl(ClassStudent);