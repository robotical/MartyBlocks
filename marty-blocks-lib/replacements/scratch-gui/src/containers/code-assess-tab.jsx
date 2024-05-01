import React from 'react';
import { injectIntl } from 'react-intl';
import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import MartyCodeAssess from '../components/marty-code-assess/marty-code-assess.jsx';

class CodeAssessTab extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        mv2Interface.startCodeAssesSession();
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