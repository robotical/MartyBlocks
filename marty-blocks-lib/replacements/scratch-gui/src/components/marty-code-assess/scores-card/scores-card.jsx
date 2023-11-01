import React from "react";
import PropTypes from 'prop-types';
import styles from "./scores-card.css";
import ProgressBar from "../../progress-bar/progress-bar.jsx";
import AbstractionInfo from "../categories-info/abstraction-info.jsx";
import FlowControl from "../categories-info/flow-control-info.jsx";
import DataRepresentation from "../categories-info/data-representation.jsx";
import Interactivity from "../categories-info/user-interactivity-info.jsx";
import Logic from "../categories-info/logic-info.jsx";
import Parallelism from "../categories-info/parallelism-info.jsx";
import Synchronisation from "../categories-info/synchronisation-info.jsx";


class ScoresCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.outerContainer}>
                <div className={[styles.row, styles.titleRow].join(" ")}>
                    <p>Category</p>
                    <p>Level</p>
                </div>
                <div className={styles.row}>
                    <p
                        onClick={() =>
                            this.props.onCategoryClick({
                                content: <AbstractionInfo />,
                                title: "Abstraction",
                            })
                        }
                    >
                        {"Abstraction"}
                    </p>
                    <ProgressBar completed={this.props.abstraction} />
                </div>
                <div className={styles.row}>
                    <p
                        onClick={() =>
                            this.props.onCategoryClick({
                                content: <DataRepresentation />,
                                title: "Data Representation",
                            })
                        }
                    >
                        {"Data Representation"}
                    </p>
                    <ProgressBar completed={this.props.dataRepresentation} />
                </div>
                <div className={styles.row}>
                    <p
                        onClick={() =>
                            this.props.onCategoryClick({
                                content: <FlowControl />,
                                title: "Flow Control",
                            })
                        }
                    >
                        {"Flow Control"}
                    </p>
                    <ProgressBar completed={this.props.flowControl} />
                </div>
                <div className={styles.row}>
                    <p
                        onClick={() =>
                            this.props.onCategoryClick({ content: <Logic />, title: "Logic" })
                        }
                    >
                        {"Logic"}
                    </p>
                    <ProgressBar completed={this.props.logic} />
                </div>
                <div className={styles.row}>
                    <p
                        onClick={() =>
                            this.props.onCategoryClick({
                                content: <Parallelism />,
                                title: "Parallelism",
                            })
                        }
                    >
                        {"Parallelism"}
                    </p>
                    <ProgressBar completed={this.props.parallelism} />
                </div>
                <div className={styles.row}>
                    <p
                        onClick={() =>
                            this.props.onCategoryClick({
                                content: <Synchronisation />,
                                title: "synchronisation",
                            })
                        }
                    >
                        {"Synchronisation"}
                    </p>
                    <ProgressBar completed={this.props.synchronisation} />
                </div>
                <div className={styles.row}>
                    <p
                        onClick={() =>
                            this.props.onCategoryClick({
                                content: <Interactivity />,
                                title: "User interactivity",
                            })
                        }
                    >
                        {"User Interactivity"}
                    </p>
                    <ProgressBar completed={this.props.interactivity} />
                </div>
            </div>
        );
    }
}

ScoresCard.propTypes = {
    onCategoryClick: PropTypes.func,
    dataRepresentation: PropTypes.number,
    flowControl: PropTypes.number,
    interactivity: PropTypes.number,
    logic: PropTypes.number,
    abstraction: PropTypes.number,
    synchronisation: PropTypes.number,
    parallelism: PropTypes.number,
};

export default ScoresCard;