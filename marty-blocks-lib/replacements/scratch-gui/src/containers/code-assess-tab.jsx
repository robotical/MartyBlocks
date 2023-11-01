import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import VM from 'scratch-vm';
import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import MartyCodeAssess from '../components/marty-code-assess/marty-code-assess.jsx';

class CodeAssessTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MartyCodeAssess vm={this.props.vm} />
        );
    }
}

CodeAssessTab.propTypes = {
};

export default errorBoundaryHOC('CodeAssess')(
    injectIntl(CodeAssessTab)
);