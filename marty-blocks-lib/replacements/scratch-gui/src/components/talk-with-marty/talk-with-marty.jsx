import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, intlShape, injectIntl } from "react-intl";

export default class TalkWithMarty extends React.Component {
    constructor(props) {
        super(props);
    }

  

    render() {
        return <>hey</>
    }
}

TalkWithMarty.propTypes = {
    intl: intlShape,
};
