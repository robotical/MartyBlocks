import PropTypes from "prop-types";
import React from "react";
import bindAll from "lodash.bindall";
import { defineMessages, intlShape, injectIntl } from "react-intl";
import VM from "scratch-vm";




import errorBoundaryHOC from "../lib/error-boundary-hoc.jsx";

import { connect } from "react-redux";

import Modal from "./modal.jsx";
import { activateDeck } from "../reducers/cards.js";
import TalkWithMarty from "../components/talk-with-marty/talk-with-marty.jsx";


const messages = defineMessages({

});


class TalkWithMartyTab extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
           
        ]);

      
    }


    render() {
    
       

        return (
            <TalkWithMarty {...this.props} />
        );
    }
}

TalkWithMartyTab.propTypes = {
    intl: intlShape,
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default errorBoundaryHOC("Talk With Marty Tab")(
    injectIntl(connect(mapStateToProps, mapDispatchToProps)(TalkWithMartyTab))
);



