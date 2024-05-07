import React from "react";
import styles from "./class-average-spider.css";
import bindAll from 'lodash.bindall';
import { defineMessages, injectIntl } from "react-intl";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.classAverageSpider",
    }
});

class ClassAverageSpider extends React.Component {
    constructor() {
        super();

    }


    render() {
        return <div></div>
    }


}


export default injectIntl(ClassAverageSpider);