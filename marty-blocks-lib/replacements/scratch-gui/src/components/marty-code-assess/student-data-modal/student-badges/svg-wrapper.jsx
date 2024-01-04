import React from "react";
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';

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
        if (this.props.offsets[starId - 1] !== 1) {
            const gradientId = `#${this.props.category}starGradient${starId}`;
            const gradientFirstOffset = this.svgRef?.querySelector(gradientId).children[0];
            const gradientSecondOffset = this.svgRef?.querySelector(gradientId).children[1];
            if (gradientFirstOffset) {
                gradientFirstOffset.setAttribute("stop-color", this.props.colors[starId - 1] || "white");
            }
            if (gradientSecondOffset) {
                let backgroundColor = "white";
                const color = this.props.colors[starId - 1] || "white";
                if (color === "#cd7f32") backgroundColor = "white";
                if (color === "silver") backgroundColor = "#cd7f32";
                if (color === "gold") backgroundColor = "silver";

                gradientSecondOffset.setAttribute("stop-color", backgroundColor);

                gradientSecondOffset.setAttribute("offset", (this.props.offsets[starId - 1] || 0) * 100 + "%");
            }
        } else {
            const polygon = this.svgRef?.querySelectorAll("polygon")[starId - 1];
            if (polygon) {
                polygon.setAttribute("fill", this.props.colors[starId - 1] || "white");
            }
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
        const areAllStars0 = this.props.offsets.every((offset) => offset === 0);
        if (areAllStars0) {
            console.log(this.props);
        }
        return (
            <div ref={this.setSVGRef} style={{ width: "200px", height: "200px", opacity: areAllStars0 ? 0.5 : 1 }}>
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