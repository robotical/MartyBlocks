import React from "react";
import styles from "./class-announcement-responses.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';

const messages = defineMessages({
    placeholder: {
        defaultMessage: "ασδφ",
        description: "ασφ",
        id: "gui.martyCodeAssess.ClassAnnouncementResponses.placeholder",
    }
});

class ClassAnnouncementResponses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responses: [],
        };
        bindAll(this, [
        ]);
    }

    componentDidMount() {
        const asyncFunc = async () => {
            await codeAssess.teacher.monitorAnnouncementResponses(this.props.classId, this.props.announcementId, (responses) => {
                this.setState({ responses: responses });
            });
        }
        asyncFunc();
    }

    componentWillUnmount() {
        codeAssess.teacher.stopMonitoringAnnouncementResponse(this.props.announcementId);
    }

    render() {
        return (
            <div className={styles.classAnnouncementResponses}>
                <div className={styles.classAnnouncementResponsesHeader}>
                    <div className={styles.classAnnouncementResponsesHeaderTitle}>
                        Feedback responses {this.state.responses.length} / {this.props.classStudentsCount}:
                        {this.state.responses.map((response) => {
                            return (
                                <div key={response.studentId} className={styles.classAnnouncementResponsesHeaderTitleResponse}>
                                    {response.studentName}: {response.response} at {response.timestamp}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

ClassAnnouncementResponses.propTypes = {
    intl: intlShape.isRequired,
    classId: PropTypes.string.isRequired,
    classStudentsCount: PropTypes.number.isRequired,
    announcementId: PropTypes.string.isRequired,
};

export default injectIntl(ClassAnnouncementResponses);