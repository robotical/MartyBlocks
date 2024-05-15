import React from "react";
import styles from "./expanded-progression.css";
import bindAll from 'lodash.bindall';
import { defineMessages, injectIntl } from "react-intl";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.StudentDataModal.BadgesExpandedProgression",
    }
});

class BadgesExpandedProgression extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        bindAll(this, [
        ]);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }


    render() {
        const { badgeData, badgeName } = this.props;

        const progressionTextData = progressionDataByBadge[badgeName];

        let shouldShowFirst = true;
        let shouldShowSecond = true;
        let shouldShowThird = true;

        if (badgeData[0].length < 3) {
            shouldShowThird = false;
        }
        if (badgeData[0].length < 2) {
            shouldShowSecond = false;
            shouldShowThird = false;
        }
        if (badgeData[0].length < 1) {
            shouldShowFirst = false;
            shouldShowSecond = false;
            shouldShowThird = false;
        }

        return (
            <div className={styles.badgeProgressionContainer}>
                <div className={styles.badgeProgressionInnerContainer}>

                    {shouldShowFirst && <BadgeProgressionLine
                        title={progressionTextData.first.title}
                        subtitle={progressionTextData.first.subtitle}
                        bronzeHint={progressionTextData.first.bronze}
                        silverHint={progressionTextData.first.silver}
                        goldHint={progressionTextData.first.gold}
                        starScores={[badgeData[0][0], badgeData[1][0]]}
                    />}

                    {shouldShowSecond && <BadgeProgressionLine
                        title={progressionTextData.second.title}
                        subtitle={progressionTextData.second.subtitle}
                        bronzeHint={progressionTextData.second.bronze}
                        silverHint={progressionTextData.second.silver}
                        goldHint={progressionTextData.second.gold}
                        starScores={[badgeData[0][1], badgeData[1][1]]}
                    />}

                    {shouldShowThird && <BadgeProgressionLine
                        title={progressionTextData.third.title}
                        subtitle={progressionTextData.third.subtitle}
                        bronzeHint={progressionTextData.third.bronze}
                        silverHint={progressionTextData.third.silver}
                        goldHint={progressionTextData.third.gold}
                        starScores={[badgeData[0][2], badgeData[1][2]]}
                    />}

                </div>
            </div>
        );
    }
}


export default injectIntl(BadgesExpandedProgression);


class BadgeProgressionLine extends React.Component {
    render() {
        const { title, subtitle, bronzeHint, silverHint, goldHint, starScores } = this.props;
        const color = starScores[0];
        const score = starScores[1];

        const achievedStarColor = calculateAchievedStarColor(color, score);
        return (
            <div className={styles.badgeProgression}>

                <div className={styles.progressionTitleContainer}>
                    <div className={styles.progressionTitle}>{title}</div>
                    <div className={styles.progressionSubtitle}>{subtitle}</div>
                </div>


                <div className={styles.achievedStarContainer}>
                    <StarComponent fillColor={achievedStarColor} borderColor="#608dc9" />
                </div>


                <div className={styles.progressionTimeline}>
                    <div style={{ width: progressionLineTable(score)[color]?.bronze + "%" }} className={styles.progressionTimelineInner}></div>
                </div>
                <div className={styles.milestoneStarContainer}>
                    <div className={styles.milestoreStarSvgContainer}>
                        <StarComponent fillColor={"#cd7f32"} borderColor="white" />
                    </div>
                    <div className={styles.milestoneStarBubbleContainer}>{bronzeHint}</div>
                </div>

                <div className={styles.progressionTimeline}>
                    <div style={{ width: progressionLineTable(score)[color]?.silver + "%" }} className={styles.progressionTimelineInner}></div>
                </div>
                <div className={styles.milestoneStarContainer}>
                    <div className={styles.milestoreStarSvgContainer}>
                        <StarComponent fillColor={'silver'} borderColor="white" />
                    </div>
                    <div className={styles.milestoneStarBubbleContainer}>{silverHint}</div>
                </div>

                <div className={styles.progressionTimeline}>
                    <div style={{ width: progressionLineTable(score)[color]?.gold + "%" }} className={styles.progressionTimelineInner}></div>
                </div>
                <div className={styles.milestoneStarContainer}>
                    <div className={styles.milestoreStarSvgContainer}>
                        <StarComponent fillColor={'gold'} borderColor="white" />
                    </div>
                    <div className={styles.milestoneStarBubbleContainer}>{goldHint}</div>
                </div>


            </div>
        );
    }
}

const StarComponent = ({ fillColor, borderColor }) => {
    return (
        <svg viewBox="0 0 300 275" version="1.1"><script xmlns="" />
            <polygon
                fill={fillColor}
                stroke={borderColor}
                strokeWidth="15"
                points="150,25  179,111 269,111 197,165                     223,251  150,200 77,251  103,165                     31,111 121,111"
            />
        </svg>
    );
}

const calculateAchievedStarColor = (color, score) => {
    if (score === 1) return color;
    const unavailableColor = '#847878';
    if (color === '#cd7f32') return unavailableColor;
    if (color === 'silver') return '#cd7f32';
    if (color === 'gold') return 'silver';
    return unavailableColor;
}

const progressionLineTable = (score) => {

    return {
        white: {
            bronze: 0,
            silver: 0,
            gold: 0
        },
        '#cd7f32': {
            bronze: score * 100,
            silver: 0,
            gold: 0
        },
        silver: {
            bronze: 100,
            silver: score * 100,
            gold: 0,
        },
        gold: {
            bronze: 100,
            silver: 100,
            gold: score * 100,
        }
    }
}

const progressionDataByBadge = {
    "Operators": {
        first: {
            title: "Using",
            subtitle: "Comparison / Boolean",
            bronze: "Use 1 Comparison / Boolean Operator",
            silver: "Use 20 Comparison / Boolean Operators",
            gold: "Use 100 Comparison / Boolean Operators"
        },
        second: {
            title: "Using",
            subtitle: "Mathematical Operators",
            bronze: "Use 1 Mathematical Operator",
            silver: "Use 20 Mathematical Operators",
            gold: "Use 100 Mathematical Operators"
        },
        third: {
            title: "Using",
            subtitle: "String Operators",
            bronze: "Use 1 String Operator",
            silver: "Use 20 String Operators",
            gold: "Use 100 String Operators"
        }
    },
    "Conditionals": {
        first: {
            title: "Using",
            subtitle: "If statements",
            bronze: "Use 1 If statement",
            silver: "Use 20 If statements",
            gold: "Use 100 If statements"
        },
        second: {
            title: "Using",
            subtitle: "If Else statements",
            bronze: "Use 1 If Else statement",
            silver: "Use 20 If Else statements",
            gold: "Use 100 If Else statements"
        },
        third: {
            title: "Using",
            subtitle: "Nested If statements",
            bronze: "Use 1 Nested If statement",
            silver: "Use 20 Nested If statements",
            gold: "Use 100 Nested If statements"
        }
    },
    "Data Types": {
        first: {
            title: "Using",
            subtitle: "Numbers",
            bronze: "Use 1 Number",
            silver: "Use 20 Numbers",
            gold: "Use 100 Numbers"
        },
        second: {
            title: "Using",
            subtitle: "Strings",
            bronze: "Use 1 String",
            silver: "Use 20 Strings",
            gold: "Use 100 Strings"
        },
        third: {
            title: "Using",
            subtitle: "Booleans",
            bronze: "Use 1 Boolean",
            silver: "Use 20 Booleans",
            gold: "Use 100 Booleans"
        }
    },
    "Functions": {
        first: {
            title: "Using",
            subtitle: "Basic Functions",
            bronze: "Use 1 Basic Function",
            silver: "Use 20 Basic Functions",
            gold: "Use 100 Basic Functions"
        },
        second: {
            title: "Using",
            subtitle: "Functions with args",
            bronze: "Use 1 Function with arguments",
            silver: "Use 20 Functions with arguments",
            gold: "Use 100 Functions with arguments"
        },
        third: {
            title: "Using",
            subtitle: "Function reuse",
            bronze: "Use 1 Function Reuse",
            silver: "Use 20 Function Reuse",
            gold: "Use 100 Function Reuse"
        }
    },
    "Loops": {
        first: {
            title: "Using",
            subtitle: "Infinite Loops",
            bronze: "Use 1 Infinite Loop",
            silver: "Use 20 Infinite Loops",
            gold: "Use 100 Infinite Loops"
        },
        second: {
            title: "Using",
            subtitle: "For Loops",
            bronze: "Use 1 For Loop",
            silver: "Use 20 For Loops",
            gold: "Use 100 For Loops"
        },
        third: {
            title: "Using",
            subtitle: "Do While Loops",
            bronze: "Use 1 Do While Loop",
            silver: "Use 20 Do While Loops",
            gold: "Use 100 Do While Loops"
        }
    },
    "Parallelism": {
        first: {
            title: "Using",
            subtitle: "Events",
            bronze: "Use 1 instance of two scripts triggered by the same event",
            silver: "Use 20 instances of two scripts triggered by the same event",
            gold: "Use 100 instances of two scripts triggered by the same event"
        },
        second: {
            title: "Using",
            subtitle: "Messages",
            bronze: "1 Message received",
            silver: "20 Messages received",
            gold: "100 Messages received"
        },
    },
    "Variables and Lists": {
        first: {
            title: "Using",
            subtitle: "Variables",
            bronze: "Use 1 Variable",
            silver: "Use 20 Variables",
            gold: "Use 100 Variables"
        },
        second: {
            title: "Using",
            subtitle: "Lists",
            bronze: "Use 1 List",
            silver: "Use 20 Lists",
            gold: "Use 100 Lists"
        },
        third: {
            title: "Using",
            subtitle: "List Operations",
            bronze: "Use 1 List Operation",
            silver: "Use 20 List Operations",
            gold: "Use 100 List Operations"
        }
    },
}