import React from "react";
import styles from "./timeline-sessions.css";
import bindAll from 'lodash.bindall';

class TimelineSessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        bindAll(this, []);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const { sessions, onSessionSelect, selectedSession } = this.props;
        const sessionsReversed = [...sessions].reverse();
        return (
            <div className={styles.sessionTimeline}>
                <div className={styles.line}></div>
                <div className={[styles.firstTimelineBubble, selectedSession?.title === "All__Time" ? styles.selectedFirstBubble : ""].join(" ")} onClick={() => onSessionSelect({title: "All__Time"})}>
                    <span className={styles.firstTimelineTitle}>All Time</span>
                </div>
                {sessionsReversed.map((session, sessionIdx) => {
                    return <div className={styles.timelinePoint} onClick={() => onSessionSelect(session)} key={session.id}>
                        <span className={styles.timelineTitle} key={session.id + sessionIdx}>{session.title}</span>
                        <div className={[styles.timelineBubble, selectedSession?.id === session?.id ? styles.selectedBubble : ""].join(" ")}/>
                    </div>
                })}
            </div>
        )
    }
}

export default TimelineSessions;