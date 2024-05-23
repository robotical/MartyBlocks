import React from 'react';
import styles from './expandable-image.css';

class ExpandableImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  render() {
    const { imageUrl, imageThumbnailSize } = this.props;

    let imageThumbnailSize_ = imageThumbnailSize;
    if (!imageThumbnailSize) {
      imageThumbnailSize_ = 'small';
    }

    const { showModal } = this.state;

    return (
      <div>
        <img
          src={imageUrl}
          alt="Expand"
          className={styles.imageTrigger}
          style={{
            width: imageThumbnailSize_ === 'small' ? '50px' : '100%',
          }}
          onClick={this.toggleModal}
        />

        {showModal && (
          <div className={styles.modalBackground} onClick={this.toggleModal}>
            <img
              src={imageUrl}
              alt="Expanded view"
              className={styles.modalImage}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ExpandableImage;
