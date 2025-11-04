// const LLM_SERVER_BASE_URL = 'https://eth-server.appv2-analytics-server.robotical.io';
const LLM_SERVER_BASE_URL = 'http://localhost:4444';
const API_PREFIX = `${LLM_SERVER_BASE_URL}/talkWithMarty`;

export const LLM_SETTINGS_ENDPOINTS = {
    importantInstructions: `${API_PREFIX}/important-instructions`,
    importantSafeguards: `${API_PREFIX}/important-safeguards`,
    knowledgeBase: `${API_PREFIX}/knowledge-base`
};

const sanitizeValue = value => (typeof value === 'string' ? value : '');

const parseResponseBody = async response => {
    const contentType = response.headers && response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        try {
            const json = await response.json();
            if (typeof json === 'string') return sanitizeValue(json);
            if (json && typeof json.value === 'string') return sanitizeValue(json.value);
            if (json && typeof json.data === 'string') return sanitizeValue(json.data);
            if (json && typeof json.content === 'string') return sanitizeValue(json.content);
            if (json && typeof json.result === 'string') return sanitizeValue(json.result);
            return '';
        } catch (error) {
            // eslint-disable-next-line no-console
            console.warn('[LLM Settings] Failed parsing JSON response', error);
            return '';
        }
    }
    try {
        const text = await response.text();
        return sanitizeValue(text);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('[LLM Settings] Failed reading text response', error);
        return '';
    }
};

const buildRequestBody = value => JSON.stringify({
    value: sanitizeValue(value),
    text: sanitizeValue(value),
    content: sanitizeValue(value)
});

const fetchSingleSetting = async (key, url) => {
    try {
        const response = await fetch(url, {method: 'GET'});
        if (response.status === 404) {
            return '';
        }
        if (!response.ok) {
            const errorText = await response.text().catch(() => '');
            throw new Error(errorText || `Request failed with status ${response.status}`);
        }
        return await parseResponseBody(response);
    } catch (error) {
        throw new Error(`Failed to fetch ${key}: ${error && error.message ? error.message : error}`);
    }
};

const saveSingleSetting = async (key, url, value) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: buildRequestBody(value)
        });
        if (!response.ok) {
            const errorText = await response.text().catch(() => '');
            throw new Error(errorText || `Request failed with status ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Failed to save ${key}: ${error && error.message ? error.message : error}`);
    }
};

export const fetchLLMSettingsFromServer = async () => {
    const entries = await Promise.all(Object.entries(LLM_SETTINGS_ENDPOINTS).map(
        async ([key, url]) => [key, await fetchSingleSetting(key, url)]
    ));
    return entries.reduce((acc, [key, value]) => {
        acc[key] = sanitizeValue(value);
        return acc;
    }, {});
};

export const saveLLMSettingsToServer = async settings => {
    const tasks = Object.entries(LLM_SETTINGS_ENDPOINTS).map(([key, url]) => (
        saveSingleSetting(key, url, settings && settings[key])
    ));
    await Promise.all(tasks);
};

export {LLM_SERVER_BASE_URL};

export default {
    LLM_SERVER_BASE_URL,
    LLM_SETTINGS_ENDPOINTS,
    fetchLLMSettingsFromServer,
    saveLLMSettingsToServer
};
