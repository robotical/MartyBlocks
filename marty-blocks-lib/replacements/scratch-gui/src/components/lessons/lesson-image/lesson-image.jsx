import React, { Fragment } from 'react';
import styles from './lesson-image.css';
import PropTypes from 'prop-types';

const LessonImage = ({ image, title }) => (
    <Fragment>
        <div className={styles.stepImageContainer}>
            {title && <div className={styles.stepTitle}>
                {title}
            </div>}
            <img
                className={styles.stepImage}
                draggable={false}
                key={image} /* Use src as key to prevent hanging around on slow connections */
                src={image}
            />
        </div>
    </Fragment>
);

LessonImage.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.node
};

export default LessonImage;