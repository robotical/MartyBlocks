import styles from './lesson-video.css';
import React from 'react';

class VideoStep extends React.Component {

    componentDidMount() {}

    render() {
        const { isAccessibilityEnabled, onVideoClick } = this.props;
        return (
            <div style={{ width: '100%', filter: isAccessibilityEnabled ? 'grayscale(1)' : 'none' }}>
                <video className={styles.video} style={{ width: '100%', height: 'auto' }} controls onClick={(e) => onVideoClick(e, this.props.video)}>
                    <source src={this.props.video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    }
}

export default VideoStep;