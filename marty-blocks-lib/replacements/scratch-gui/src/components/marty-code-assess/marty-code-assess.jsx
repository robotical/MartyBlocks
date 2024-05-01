import React from "react";
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import VM from "scratch-vm";
import styles from "./marty-code-assess.css";
import bindAll from 'lodash.bindall';
import AssetPanel from "../asset-panel/asset-panel.jsx";
import helpIcon from "../../lib/assets/icon--tutorials.svg";
import classroomIcon from "../../lib/assets/icon--classroom.svg";
import Spinner from '../spinner/spinner.jsx';
import spinnerStyles from '../spinner/spinner.css';
import { connect } from "react-redux";
import { activateDeck } from "../../reducers/cards.js";
import { openTipsLibrary } from '../../reducers/modals';

const messages = defineMessages({
  tutorials: {
    defaultMessage: "Tutorials",
    description: "Button to open the tutorials page",
    id: "gui.martyCodeAssess.teacherView.tutorials",
  }
});

class MartyCodeAssess extends React.Component {
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



  async componentDidUpdate(prevProps, prevState) {

  }

  render() {
    const { intl } = this.props;

    return (
      <AssetPanel
        buttons={[
          {
            title: intl.formatMessage(messages.tutorials),
            img: helpIcon,
            onClick: () => this.props.openTipsLibrary(),
          },
        ]}
        items={[]}
        selectedItemIndex={0}
        onItemClick={()=>{}}
        onDrop={() => { }}
        externalStylesClass={styles.assetPanel}
      >
        <div className={styles.outerContainer}>
          {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : null}
        </div>
      </AssetPanel >
    );
  }
}

MartyCodeAssess.propTypes = {
  vm: PropTypes.instanceOf(VM).isRequired,
  intl: intlShape.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
 
  openTipsLibrary: () => {
    dispatch(openTipsLibrary());
  }
});

export default injectIntl(connect(null, mapDispatchToProps)(MartyCodeAssess));