import React from 'react';
import styles from './lesson-image.css';

class LessonImage extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { image, title, isAccessibilityEnabled, onImageClick } = this.props;

        return (

                <div className={styles.stepImageContainer}>
                    {title && <div className={styles.stepTitle} style={{ fontSize: isAccessibilityEnabled ? '2rem' : '0.9rem' }}>
                        {title}
                    </div>}
                    <img
                        onClick={(e) => onImageClick(e, image)}
                        className={styles.stepImage}
                        draggable={false}
                        key={image} /* Use src as key to prevent hanging around on slow connections */
                        src={image}
                        style={{ filter: isAccessibilityEnabled ? 'invert(1)' : 'none' }}
                    />
                </div>
        )
    };
}

export default LessonImage;