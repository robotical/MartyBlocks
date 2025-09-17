import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';

import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import TalkWithMarty from '../components/talk-with-marty/talk-with-marty.jsx';

const TalkWithMartyTab = props => (
    <TalkWithMarty {...props} />
);

TalkWithMartyTab.propTypes = {
    intl: intlShape
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default errorBoundaryHOC('Talk With Marty Tab')(
    injectIntl(connect(mapStateToProps, mapDispatchToProps)(TalkWithMartyTab))
);


