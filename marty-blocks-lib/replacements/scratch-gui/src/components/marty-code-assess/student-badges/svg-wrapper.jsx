import React from "react";
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';

const unavailableColor = '#847878';


class SVGWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        bindAll(this, [
            'setSVGRef',
            'setStarColor',
        ]);
        this.svgRef = null;
    }

    // when the props offsets changes
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.offsets !== this.props.offsets) {
            this.setStarColor("1");
            this.setStarColor("2");
            this.setStarColor("3");
        }
    }

    setStarColor(starId) {
        const rightColor = calculateAchievedStarColor(this.props.colors[starId - 1] || unavailableColor, this.props.offsets[starId - 1]);

        const polygon = this.svgRef?.querySelectorAll("polygon")[starId - 1];
        if (polygon) {
            polygon.setAttribute("fill", rightColor);
        }
    }

    setSVGRef(element) {
        this.svgRef = element;

        if (this.svgRef) {
            this.setStarColor("1");
            this.setStarColor("2");
            this.setStarColor("3");
        }
    }

    render() {
        // const areAllStars0 = this.props.offsets.every((offset) => offset === 0);
        return (
            <div ref={this.setSVGRef} style={{ width: "100px", height: "100px", cursor: "pointer" }} onClick={this.props.onClick}>
                {this.props.svg}
            </div>
        );
    }
}


SVGWrapper.propTypes = {
    svg: PropTypes.object.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string),
    offsets: PropTypes.arrayOf(PropTypes.number),
    category: PropTypes.string.isRequired,
};

export default SVGWrapper;


const calculateAchievedStarColor = (color, score) => {
    if (score === 1) return color;
    const unavailableColor = '#847878';
    if (color === '#cd7f32') return unavailableColor;
    if (color === 'silver') return '#cd7f32';
    if (color === 'gold') return 'silver';
    return unavailableColor;
}