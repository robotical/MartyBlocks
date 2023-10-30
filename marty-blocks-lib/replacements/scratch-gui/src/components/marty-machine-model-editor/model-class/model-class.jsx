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
    bindAll(this, ["onPlaySample", "onClassNameSelected", "onRemoveClass", "onRemoveSample", "setSampleContainerRef"]);
    this.sampleContainerRef = null;
  }

  componentWillUnmount() {
  }

  componentDidUpdate(prevProps) {
    if (this.props.modelClass.samples.length > prevProps.modelClass.samples.length) {
      const container = this.sampleContainerRef;
      container.scrollLeft = container.scrollWidth;
    }
  }

  setSampleContainerRef(element) {
    this.sampleContainerRef = element;
  }

  onPlaySample(event, audioData) {
    event.stopPropagation();
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

  onClassNameSelected() {
    if (this.props.onClassNameSelected) {
      this.props.onClassNameSelected(this.props.modelClass.name);
    }
  }

  onRemoveClass(event) {
    event.stopPropagation();
    if (this.props.onRemoveClass) {
      this.props.onRemoveClass();
    }
  }

  onRemoveSample(event, sampleIndex) {
    event.stopPropagation();
    if (this.props.onRemoveSample) {
      this.props.onRemoveSample(sampleIndex);
    }
  }

  onClassNameChange(event) {
    this.props.modelClass.name = event.target.value;  
    console.log("onClassNameChange: " + this.props.modelClass.name);
    this.setState({});
  }

  render() {
    let subtitleJSX = null;
    if (this.props.subtitle) {
      if (typeof this.props.subtitle === "string") {
        subtitleJSX = <span className={styles.subtitle}>{this.props.subtitle}</span>;
      } else {
        subtitleJSX = this.props.subtitle;
      }
    }
    return (
      <div className={styles.classContainer} onClick={this.onClassNameSelected}>
        <div className={styles.classLabel}>
          <input 
          className={styles.classNameInput} 
          type="text" 
          value={this.props.modelClass.name}  
          onChange={(e) => this.onClassNameChange(e)}
          readOnly={this.props.modelClass.name === martyMachine.BACKGROUND_NOISE_TAG} 
          />
          {subtitleJSX}
          {this.props.onRemoveClass && <IconButton
            title=""
            className={styles.overlayButton}
            img={deleteIcon}
            onClick={this.onRemoveClass}
          />}</div>

        <div className={styles.modelSamplesContainer}>
          <div className={styles.rowCustom}>
            <p className={styles.samplesLengthTitle}>{this.props.modelClass.samples.length} samples</p>
          </div>
          <div className={styles.rowCustom} ref={this.setSampleContainerRef}>
            {this.props.modelClass.samples.map((sample, sampleIndex) => {
              return <div key={sampleIndex} className={styles.modelSampleContainer}>
                <div className={styles.modelSampleOverlay}>
                  <div className={styles.modelSampleOverlayDelete}>
                    <IconButton
                      title=""
                      className={styles.overlayButton}
                      img={deleteIcon}
                      onClick={(e) => this.onRemoveSample(e, sampleIndex)}
                    />
                    {this.props.modelType === "audio" && <IconButton
                      title=""
                      className={styles.overlayButton}
                      img={playIcon}
                      onClick={(e) => this.onPlaySample(e, sample.timeDataQueue)}
                    />}
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
  onClassNameSelected: PropTypes.func,
  modelType: string,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])
};

export default ModelClass;
