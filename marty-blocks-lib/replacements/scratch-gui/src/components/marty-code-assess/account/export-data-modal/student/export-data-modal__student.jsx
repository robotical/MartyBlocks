import React from "react";
import styles from "./export-data-modal__teacher.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import Spinner from '../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../spinner/spinner.css';

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.ExportDataModalStudent.",
    }
});

class ExportDataModalStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
        bindAll(this, [

        ]);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const { intl } = this.props;
        return (
            <div className={styles.exportDataModal}>
                {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                   <div>dummy content</div>
                )}
            </div>
        );
    }
}



ExportDataModalStudent.propTypes = {
    intl: intlShape.isRequired,
    selectedClass: PropTypes.object,
    onClose: PropTypes.func.isRequired,
};


export default injectIntl(ExportDataModalStudent);