import React from "react";
import bindAll from "lodash.bindall";
import styles from "./model-class.css";
import { string } from "prop-types";
import PropTypes from 'prop-types';
import IconButton from '../../icon-button/icon-button.jsx';
import deleteIcon from '../icon--delete.svg';
import playIcon from '../icon--play-black.svg';

class ModelClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    bindAll(this, ["onPlaySample"]);
  }

  componentWillUnmount() {
  }

  onPlaySample(audioData) {
    // Flatten the queue into a single Float32Array
    const flattenedAudioData = Float32Array.from(
      audioData.reduce(
        (acc, arr) => acc.concat(Array.from(arr)),
        []
      )
    );

    const audioContext = new AudioContext();
    const audioBuffer = audioContext.createBuffer(1, flattenedAudioData.length, audioContext.sampleRate);
    audioBuffer.getChannelData(0).set(flattenedAudioData);
    const audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;
    audioSource.connect(audioContext.destination);
    audioSource.start();
  }
  
  render() {
    return (
      <div className={styles.classContainer}>
        <div className={styles.classLabel}>{this.props.modelClass.name}<IconButton
          title=""
          className={styles.overlayButton}
          img={deleteIcon}
          onClick={this.props.onRemoveClass}
        /></div>

        <div className={styles.modelSamplesContainer}>
          <div className={styles.rowCustom}>
            <p className={styles.samplesLengthTitle}>{this.props.modelClass.samples.length} samples</p>
          </div>
          <div className={styles.rowCustom}>
            {this.props.modelClass.samples.map((sample, sampleIndex) => {
              return <div key={sampleIndex} className={styles.modelSampleContainer}>
                <div className={styles.modelSampleOverlay}>
                  <div className={styles.modelSampleOverlayDelete}>
                    <IconButton
                      title=""
                      className={styles.overlayButton}
                      img={deleteIcon}
                      onClick={() => this.props.onRemoveSample(sampleIndex)}
                    />
                    <IconButton
                      title=""
                      className={styles.overlayButton}
                      img={playIcon}
                      onClick={() => this.onPlaySample(sample.audioData)}
                    />
                  </div>
                  <img className={styles.modelSample} src={"data:image/png;base64," + sample.image.jpegBase64} alt="sample" />
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    );
  }
}


ModelClass.propTypes = {
  modelClass: PropTypes.object,
  onRemoveClass: PropTypes.func,
  onRemoveSample: PropTypes.func,
  modelType: string
};

export default ModelClass;
