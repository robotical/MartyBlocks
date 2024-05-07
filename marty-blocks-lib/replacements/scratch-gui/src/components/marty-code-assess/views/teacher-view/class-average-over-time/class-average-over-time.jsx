import React from "react";
import styles from "./class-average-over-time.css";
import bindAll from 'lodash.bindall';
import { defineMessages, injectIntl } from "react-intl";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.classAverageOverTime",
    }
});

class ClassAverageOverTime extends React.Component {
    constructor() {
        super();

    }


    render() {
        return <div></div>
    }


}


export default injectIntl(ClassAverageOverTime);