import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import locales from 'scratch-l10n';

import check from './check.svg';
import { MenuItem, Submenu } from '../menu/menu.jsx';
import languageIcon from '../language-selector/language-icon.svg';
import { languageMenuOpen, openLanguageMenu } from '../../reducers/menus.js';
import { selectLocale } from '../../reducers/locales.js';

import styles from './settings-menu.css';

import dropdownCaret from './dropdown-caret.svg';

// languages to include in the list of available languages
const languagesToInclude = [
    "el", "en", "bg", "ja", "zh-cn", "zh-tw", // fully translated languages
    "de", "nl", "cs", "ru", "es", "fr", // partially translated languages
];
// creating a list that has only the languages to ingore (all languages BUT the ones to include)
const allLanguagesBut = Object.keys(locales).filter(l => !languagesToInclude.includes(l))
// supported languages to exclude from the menu, but allow as a URL option
const ignore = allLanguagesBut;

class LanguageMenu extends React.PureComponent {
    constructor(props) {
        super(props);
        bindAll(this, [
            'setRef',
            'handleMouseOver'
        ]);
    }

    componentDidUpdate(prevProps) {
        // If the submenu has been toggled open, try scrolling the selected option into view.
        if (!prevProps.menuOpen && this.props.menuOpen && this.selectedRef) {
            this.selectedRef.scrollIntoView({ block: 'center' });
        }
    }

    setRef(component) {
        this.selectedRef = component;
    }

    handleMouseOver() {
        // If we are using hover rather than clicks for submenus, scroll the selected option into view
        if (!this.props.menuOpen && this.selectedRef) {
            this.selectedRef.scrollIntoView({ block: 'center' });
        }
    }

    render() {
        return (
            <MenuItem
                expanded={this.props.menuOpen}
            >
                <div
                    className={styles.option}
                    onClick={this.props.onRequestOpen}
                    onMouseOver={this.handleMouseOver}
                >
                    <img
                        className={styles.icon}
                        src={languageIcon}
                    />
                    <span className={styles.submenuLabel}>
                        <FormattedMessage
                            defaultMessage="Language"
                            description="Language sub-menu"
                            id="gui.menuBar.language"
                        />
                    </span>
                    <img
                        className={styles.expandCaret}
                        src={dropdownCaret}
                    />
                </div>
                <Submenu
                    className={styles.languageSubmenu}
                    place={this.props.isRtl ? 'left' : 'right'}
                >
                    {
                        Object.keys(locales)
                            .filter(l => !ignore.includes(l))
                            .map(locale => (
                                <MenuItem
                                    key={locale}
                                    className={styles.languageMenuItem}
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onClick={() => this.props.onChangeLanguage(locale)}
                                >
                                    <img
                                        className={classNames(styles.check, {
                                            [styles.selected]: this.props.currentLocale === locale
                                        })}
                                        src={check}
                                        {...(this.props.currentLocale === locale && { ref: this.setRef })}
                                    />
                                    {locales[locale].name}
                                </MenuItem>
                            ))
                    }
                </Submenu>
            </MenuItem>
        );
    }
}

LanguageMenu.propTypes = {
    currentLocale: PropTypes.string,
    isRtl: PropTypes.bool,
    label: PropTypes.string,
    menuOpen: PropTypes.bool,
    onChangeLanguage: PropTypes.func,
    onRequestCloseSettings: PropTypes.func,
    onRequestOpen: PropTypes.func
};

const mapStateToProps = state => ({
    currentLocale: state.locales.locale,
    isRtl: state.locales.isRtl,
    menuOpen: languageMenuOpen(state),
    messagesByLocale: state.locales.messagesByLocale
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeLanguage: locale => {
        dispatch(selectLocale(locale));
        ownProps.onRequestCloseSettings();
    },
    onRequestOpen: () => dispatch(openLanguageMenu())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageMenu);