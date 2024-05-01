import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import Selector from './selector.jsx';
import styles from './asset-panel.css';

const AssetPanel = props => (
    <Box className={[styles.wrapper, props.externalStylesClass || ''].join(' ')}>
        <Selector
            className={styles.selector}
            {...props}
        />
        <Box className={styles.detailArea}>
            {props.children}
        </Box>
    </Box>
);

AssetPanel.propTypes = {
    ...Selector.propTypes,
    externalStylesClass: PropTypes.string,
};

export default AssetPanel;
