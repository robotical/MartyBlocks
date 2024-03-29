import styles from './lesson-video.css';
import React from 'react';
import PropTypes from 'prop-types';

class VideoStep extends React.Component {

    componentDidMount() {}

    render() {
        const { isAccessibilityEnabled } = this.props;
        return (
            <div style={{ width: '100%', filter: isAccessibilityEnabled ? 'grayscale(1)' : 'none' }}>
                <video style={{ width: '100%', height: 'auto' }} controls>
                    <source src={this.props.video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    }
}

VideoStep.propTypes = {
    video: PropTypes.string.isRequired
};

export default VideoStep;