import React from 'react';
import styles from "./stop-start-session.css";
import iconPlay from "../../../icon--play.svg";
import iconStop from "../../../icon--stop.svg";
import Spinner from '../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../spinner/spinner.css';

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();
const PublishedEventsEnum = window.codeAssess.codeAssessLib.PublishedEventsEnum;

const SESSION_CREATED_SUBSCRIPTION = "SESSION_CREATED_SUBSCRIPTION_2";
const SESSION_STOPPED_SUBSCRIPTION = "SESSION_STOPPED_SUBSCRIPTION_2";

class StopStartSession extends React.Component {

    constructor(props) {
        super(props);
        this.onToggleSession = this.onToggleSession.bind(this);

        this.state = {
            isLoading: false,
        };
    }

    componentDidMount() {
        codeAssessClientFacade.subscribe(SESSION_CREATED_SUBSCRIPTION, PublishedEventsEnum.SESSION_CREATED, () => this.setState({ isLoading: false }));
        codeAssessClientFacade.subscribe(SESSION_STOPPED_SUBSCRIPTION, PublishedEventsEnum.SESSION_STOPPED, () => this.setState({ isLoading: false }));
    }

    componentWillUnmount() {
        codeAssessClientFacade.unsubscribe(SESSION_CREATED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(SESSION_STOPPED_SUBSCRIPTION);
    }

    onToggleSession() {
        this.setState({ isLoading: true });
        const { activeSession } = this.props;
        const isThereAnActiveSession = !!activeSession;

        if (isThereAnActiveSession) {
            codeAssessClientFacade.stopSession();
        } else {
            codeAssessClientFacade.createSession();
        }
    }

    render() {
        const { activeSession } = this.props;
        const isThereAnActiveSession = !!activeSession;

        return (
            <div className={styles.startStopSessionContainer}>
                {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                    <>
                        <div
                            className={[styles.startStopSessionButtonContainer, isThereAnActiveSession ? styles.stopSessionButtonContainer : styles.startSessionButtonContainer].join(" ")}
                            onClick={this.onToggleSession}
                        >
                            <img src={isThereAnActiveSession ? iconStop : iconPlay} className={[styles.startStopSessionImg].join(" ")} />
                        </div>
                        <div
                            className={[styles.startStopSessionText, isThereAnActiveSession ? styles.stopSessionText : styles.startSessionText].join(" ")}
                        >
                            {isThereAnActiveSession ? "Stop Session" : "Start Session"}
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default StopStartSession;