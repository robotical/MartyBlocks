import PropTypes from 'prop-types';
import React from 'react';

import locales from 'scratch-l10n';
import styles from './language-selector.css';

// languages to include in the list of available languages
const languagesToInclude = [
    "el", "en", "bg", "ja", "zh-cn", "zh-tw", // fully translated languages
    "de", "nl", "cs", "ru", "es", "fr", // partially translated languages
];
// creating a list that has only the languages to ingore (all languages BUT the ones to include)
const allLanguagesBut = Object.keys(locales).filter(l => !languagesToInclude.includes(l))
// supported languages to exclude from the menu, but allow as a URL option
const ignore = allLanguagesBut;

const LanguageSelector = ({currentLocale, label, onChange}) => (
    <select
        aria-label={label}
        className={styles.languageSelect}
        value={currentLocale}
        onChange={onChange}
    >
        {
            Object.keys(locales)
                .filter(l => !ignore.includes(l))
                .map(locale => (
                    <option
                        key={locale}
                        value={locale}
                    >
                        {locales[locale].name}
                    </option>
                ))
        }
    </select>
);

LanguageSelector.propTypes = {
    currentLocale: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func
};

export default LanguageSelector;
