import React from "react";
import styles from './simple-tooltip.css';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

class SimpleTooltip extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        bindAll(this, [
        ]);
    }

    
    render() {
        const restProps = { ...this.props };
        const className = restProps.className;
        delete restProps.className;
        delete restProps.tooltipText;
        delete restProps.text;

        return (
            <button title={this.props.tooltipText || ""} className={[className ? className : "", styles.tooltip].join(" ")} {...restProps}>
                {this.props.text || ""}
            </button>
        );
    }
}

SimpleTooltip.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    tooltipText: PropTypes.string,
};

export default SimpleTooltip;