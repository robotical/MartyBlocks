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
    const { imageUrl } = this.props;
    const { showModal } = this.state;

    return (
      <div>
        <img
          src={imageUrl}
          alt="Expand"
          className={styles.imageTrigger}
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
