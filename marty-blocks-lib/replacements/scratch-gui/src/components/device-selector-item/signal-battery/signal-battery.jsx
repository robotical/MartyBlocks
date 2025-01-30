import React, { Component } from 'react';
import { signalSvg } from '../signal-svg';
import { batterySvg } from '../battery-svg';

import styles from './signal-battery.css';

class SignalBattery extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.isDeviceConnected) {
            return null;
        }

        return (
            <div className={styles.batteryAndSignal}>
                <div className={styles.signal}>
                    <div className={styles.signalIcon} dangerouslySetInnerHTML={{ __html: signalSvg(this.props.signal) }} />
                </div>
                <div className={[
                    styles.battery,
                    this.props.battery === 0 ? styles.batteryPlug : "",
                    ].join(" ")}>
                    <div className={[
                        styles.batteryIcon,
                        this.props.battery === 0 ? styles.batteryIconPlug : "",
                        ].join(" ")} dangerouslySetInnerHTML={{ __html: batterySvg(this.props.battery) }} />
                </div>
            </div>
        );
    }
}

export default SignalBattery;
