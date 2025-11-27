import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {connect} from 'react-redux';

import ControlsComponent from '../components/controls/controls.jsx';

class Controls extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleGreenFlagClick',
            'handleStopAllClick'
        ]);
        this.state = {
            greenFlagLocked: false
        };
    }
    componentDidUpdate (prevProps) {
        if (this.state.greenFlagLocked && prevProps.projectRunning && !this.props.projectRunning) {
            this.setState({greenFlagLocked: false});
        }
    }
    handleGreenFlagClick (e) {
        e.preventDefault();
        if (this.state.greenFlagLocked || this.props.projectRunning) return;

        if (e.shiftKey) {
            this.props.vm.setTurboMode(!this.props.turbo);
            return;
        }

        this.setState({greenFlagLocked: true}, () => {
            if (!this.props.isStarted) {
                this.props.vm.start();
            }
            this.props.vm.greenFlag();
        });
    }
    handleStopAllClick (e) {
        e.preventDefault();
        this.props.vm.stopAll();
        mv2Interface.send_REST("robot/stop");
        if (this.state.greenFlagLocked) {
            this.setState({greenFlagLocked: false});
        }
    }
    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
            isStarted, // eslint-disable-line no-unused-vars
            projectRunning,
            turbo,
            ...props
        } = this.props;
        const greenFlagDisabled = this.state.greenFlagLocked || projectRunning;
        return (
            <ControlsComponent
                {...props}
                active={projectRunning}
                greenFlagDisabled={greenFlagDisabled}
                turbo={turbo}
                onGreenFlagClick={this.handleGreenFlagClick}
                onStopAllClick={this.handleStopAllClick}
            />
        );
    }
}

Controls.propTypes = {
    isStarted: PropTypes.bool.isRequired,
    projectRunning: PropTypes.bool.isRequired,
    turbo: PropTypes.bool.isRequired,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    isStarted: state.scratchGui.vmStatus.running,
    projectRunning: state.scratchGui.vmStatus.running,
    turbo: state.scratchGui.vmStatus.turbo
});
// no-op function to prevent dispatch prop being passed to component
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
