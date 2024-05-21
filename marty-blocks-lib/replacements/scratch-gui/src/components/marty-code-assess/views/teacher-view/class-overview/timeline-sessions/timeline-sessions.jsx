import React from "react";
import styles from "./timeline-sessions.css";
import bindAll from 'lodash.bindall';

class TimelineSessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleSessionsIdxRange: [0, 4],
            visibleSessions: [],
            hasMoreToLeft: false,
            hasMoreToRight: false
        };
        bindAll(this, [
            'handleLeftArrowClick',
            'handleRightArrowClick',
            'handleWindowResize',
            'determineVisibleSessionsNum',
            'setContainerRef'
        ]);

        this.containerRef = null;
    }

    componentDidMount() {
        const { sessions } = this.props;
        const visibleSessionsEndIdx = this.determineVisibleSessionsNum();
        const visibleSessionsIdxRange = [0, visibleSessionsEndIdx];
        this.setState({ visibleSessionsIdxRange });
        const visibleSessionsData = calculateVisibleSessions(sessions, visibleSessionsIdxRange);
        const { hasMoreToRight, hasMoreToLeft, visibleSessions } = visibleSessionsData;
        this.setState({ visibleSessions, hasMoreToRight, hasMoreToLeft });

        // set event listener for window resize
        window.addEventListener("resize", this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    handleWindowResize = () => {
        const { sessions } = this.props;
        const visibleSessionsEndIdx = this.determineVisibleSessionsNum();
        const visibleSessionsIdxRange = [0, visibleSessionsEndIdx];
        this.setState({ visibleSessionsIdxRange });
        const visibleSessionsData = calculateVisibleSessions(sessions, visibleSessionsIdxRange);
        const { hasMoreToRight, hasMoreToLeft, visibleSessions } = visibleSessionsData;
        this.setState({ visibleSessions, hasMoreToRight, hasMoreToLeft });
    }

    determineVisibleSessionsNum() {
        if (this.containerRef && this.containerRef.offsetWidth) {
            const containerWidth = this.containerRef.offsetWidth;
            const bubbleWidth = 100;
            const magicNum = Math.floor(containerWidth / bubbleWidth);
            return magicNum;
        }
        return 0;
    }

    componentWillUnmount() {
    }

    handleLeftArrowClick = () => {
        const { sessions } = this.props;
        const isLeftArrowDisabled = !this.state.hasMoreToLeft;
        if (isLeftArrowDisabled) return;
        const [start, end] = this.state.visibleSessionsIdxRange;
        const newStart = start - 1;
        const newEnd = end - 1;
        const visibleSessionsData = calculateVisibleSessions(sessions, [newStart, newEnd]);
        const { hasMoreToRight, hasMoreToLeft, visibleSessions } = visibleSessionsData;
        this.setState({ visibleSessions, hasMoreToRight, hasMoreToLeft, visibleSessionsIdxRange: [newStart, newEnd] });
    }

    handleRightArrowClick = () => {
        const { sessions } = this.props;
        const isRightArrowDisabled = !this.state.hasMoreToRight;
        if (isRightArrowDisabled) return;
        const [start, end] = this.state.visibleSessionsIdxRange;
        const newStart = start + 1;
        const newEnd = end + 1;
        const visibleSessionsData = calculateVisibleSessions(sessions, [newStart, newEnd]);
        const { hasMoreToRight, hasMoreToLeft, visibleSessions } = visibleSessionsData;
        this.setState({ visibleSessions, hasMoreToRight, hasMoreToLeft, visibleSessionsIdxRange: [newStart, newEnd] });
    }

    setContainerRef(ref) {
        this.containerRef = ref;
    }

    render() {
        const { onSessionSelect, selectedSession } = this.props;

        const isLeftArrowDisabled = !this.state.hasMoreToLeft;
        const isRightArrowDisabled = !this.state.hasMoreToRight;


        return (
            <div className={styles.sessionTimeline} ref={this.setContainerRef}>
                <div className={[styles.leftArrow, isLeftArrowDisabled ? styles.disabledArrow : ""].join(" ")} onClick={this.handleLeftArrowClick}>{"<"}</div>
                <div className={[styles.rightArrow, isRightArrowDisabled ? styles.disabledArrow : ""].join(" ")} onClick={this.handleRightArrowClick}>{">"}</div>
                {this.state.hasMoreToLeft && <div className={styles.threeDotsLeft}>...</div>}
                {this.state.hasMoreToRight && <div className={styles.threeDotsRight}>...</div>}
                <div className={styles.line}></div>
                <div style={{
                    marginRight: isLeftArrowDisabled ? "0" : "50px"
                }}
                    className={[styles.firstTimelineBubble, selectedSession?.title === "All__Time" ? styles.selectedFirstBubble : ""].join(" ")} onClick={() => onSessionSelect({ title: "All__Time" })}>
                    <span className={styles.firstTimelineTitle}>All Time</span>
                </div>
                {this.state.visibleSessions.map((session, sessionIdx) => {
                    const isLast = sessionIdx === this.state.visibleSessions.length - 1;
                    return <div
                        style={{
                            marginRight: isLast && !isRightArrowDisabled ? "50px" : "0"
                        }}
                        className={styles.timelinePoint} onClick={() => onSessionSelect(session)} key={session.id}>
                        <span className={styles.timelineTitle} key={session.id + sessionIdx}>{trancateTitle(session.title, 15)}</span>
                        <div className={[styles.timelineBubble, selectedSession?.id === session?.id ? styles.selectedBubble : ""].join(" ")} />
                    </div>
                })}
            </div>
        )
    }
}

export default TimelineSessions;


const trancateTitle = (title, length) => {
    if (title.length > length) {
        return title.slice(0, 4) + ".." + title.slice(-4);
    }
    return title;
}

const calculateVisibleSessions = (sessions, visibleSessionsIdxRange) => {
    const sessionsN = sessions.length;
    const [start, end] = visibleSessionsIdxRange;

    // Calculate new start and end indexes for the reversed array
    let startReversed = sessionsN - 1 - end;
    let endReversed = sessionsN - 1 - start;

    // Check if the start or end index is outside the array bounds and adjust
    startReversed = Math.max(0, startReversed);
    endReversed = Math.min(sessionsN - 1, endReversed) + 1; // slice takes an index one past the last element


    // Extract the visible sessions based on the recalculated indices
    const visibleSessions = sessions.slice(startReversed, endReversed).reverse();

    // Correct flags based on the visibility of sessions beyond the selected indices
    const hasMoreToRight = startReversed > 0;
    const hasMoreToLeft = endReversed < sessionsN;

    return { hasMoreToRight, hasMoreToLeft, visibleSessions };
}