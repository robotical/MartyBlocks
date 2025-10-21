import { fetchLLMSettingsFromServer } from './llm-settings-service.js';

const DEFAULT_LLM_SETTINGS = {
    importantInstructions: '',
    importantSafeguards: '',
    knowledgeBase: ''
};

const STORAGE_KEY = 'martyLLMSettings';
const SOURCE_STORAGE_KEY = 'martyLLMSettingsSource';
const DEFAULT_SOURCE = 'local';
const VALID_SOURCES = ['local', 'server'];

let llmSettings = { ...DEFAULT_LLM_SETTINGS };
const listeners = new Set();
let serverLLMSettings = null;
const serverListeners = new Set();
let llmSettingsSource = DEFAULT_SOURCE;
const sourceListeners = new Set();

const sanitizeValue = value => (typeof value === 'string' ? value : '');
const normalizeSettings = settings => ({
    importantInstructions: sanitizeValue(settings && settings.importantInstructions),
    importantSafeguards: sanitizeValue(settings && settings.importantSafeguards),
    knowledgeBase: sanitizeValue(settings && settings.knowledgeBase)
});
const hasAnyContent = settings => {
    if (!settings || typeof settings !== 'object') return false;
    return Boolean(
        sanitizeValue(settings.importantInstructions).trim() ||
        sanitizeValue(settings.importantSafeguards).trim() ||
        sanitizeValue(settings.knowledgeBase).trim()
    );
};
const isBrowser = () => typeof window !== 'undefined' && !!window.localStorage;

const readFromStorage = () => {
    if (!isBrowser()) return null;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return null;
        return {
            importantInstructions: sanitizeValue(parsed.importantInstructions),
            importantSafeguards: sanitizeValue(parsed.importantSafeguards),
            knowledgeBase: sanitizeValue(parsed.knowledgeBase)
        };
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('[LLM Settings] Failed to read from storage', error);
        return null;
    }
};

const persistToStorage = settings => {
    if (!isBrowser()) return;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('[LLM Settings] Failed to persist settings', error);
    }
};

const hydrateFromStorage = () => {
    const stored = readFromStorage();
    if (stored) {
        llmSettings = { ...stored };
    }
};

const readSourceFromStorage = () => {
    if (!isBrowser()) return null;
    try {
        const raw = window.localStorage.getItem(SOURCE_STORAGE_KEY);
        if (!raw) return null;
        if (VALID_SOURCES.includes(raw)) {
            return raw;
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('[LLM Settings] Failed to read source from storage', error);
    }
    return null;
};

const persistSourceToStorage = source => {
    if (!isBrowser()) return;
    try {
        window.localStorage.setItem(SOURCE_STORAGE_KEY, source);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('[LLM Settings] Failed to persist source', error);
    }
};

const hydrateSourceFromStorage = () => {
    const stored = readSourceFromStorage();
    if (stored) {
        llmSettingsSource = stored;
    }
};

const notifyListeners = () => {
    const snapshot = getLLMSettings();
    listeners.forEach(listener => {
        try {
            listener(snapshot);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.warn('[LLM Settings] Listener threw an error', error);
        }
    });
};

const notifyServerListeners = () => {
    const snapshot = getServerLLMSettings();
    serverListeners.forEach(listener => {
        try {
            listener(snapshot);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.warn('[LLM Settings] Server listener threw an error', error);
        }
    });
};

const notifySourceListeners = () => {
    const source = getLLMSettingsSource();
    sourceListeners.forEach(listener => {
        try {
            listener(source);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.warn('[LLM Settings] Source listener threw an error', error);
        }
    });
};

export const getLLMSettings = () => ({
    ...llmSettings
});

export const setLLMSettings = (updates, shouldPersist = true) => {
    if (!updates || typeof updates !== 'object') return;
    const nextSettings = {
        ...llmSettings,
        ...updates
    };
    llmSettings = {
        importantInstructions: sanitizeValue(nextSettings.importantInstructions),
        importantSafeguards: sanitizeValue(nextSettings.importantSafeguards),
        knowledgeBase: sanitizeValue(nextSettings.knowledgeBase)
    };
    if (shouldPersist) {
        persistToStorage(llmSettings);
    }
    notifyListeners();
};

export const replaceLLMSettings = nextSettings => {
    if (!nextSettings || typeof nextSettings !== 'object') {
        llmSettings = { ...DEFAULT_LLM_SETTINGS };
    } else {
        llmSettings = normalizeSettings(nextSettings);
    }
    persistToStorage(llmSettings);
    notifyListeners();
};

export const resetLLMSettings = () => {
    llmSettings = { ...DEFAULT_LLM_SETTINGS };
    persistToStorage(llmSettings);
    notifyListeners();
};

export const getServerLLMSettings = () => (serverLLMSettings ? { ...serverLLMSettings } : null);

export const setServerLLMSettingsSnapshot = nextSettings => {
    if (!nextSettings || typeof nextSettings !== 'object') {
        serverLLMSettings = null;
    } else {
        serverLLMSettings = normalizeSettings(nextSettings);
    }
    notifyServerListeners();
};

export const subscribeToServerLLMSettings = listener => {
    if (typeof listener !== 'function') return () => { };
    serverListeners.add(listener);
    listener(getServerLLMSettings());
    return () => {
        serverListeners.delete(listener);
    };
};

export const getLLMSettingsSource = () => llmSettingsSource;

export const setLLMSettingsSource = nextSource => {
    if (!VALID_SOURCES.includes(nextSource) || llmSettingsSource === nextSource) return;
    llmSettingsSource = nextSource;
    persistSourceToStorage(llmSettingsSource);
    notifySourceListeners();
};

export const subscribeToLLMSettingsSource = listener => {
    if (typeof listener !== 'function') return () => { };
    sourceListeners.add(listener);
    listener(getLLMSettingsSource());
    return () => {
        sourceListeners.delete(listener);
    };
};

export const subscribeToLLMSettings = listener => {
    if (typeof listener !== 'function') return () => { };
    listeners.add(listener);
    listener(getLLMSettings());
    return () => {
        listeners.delete(listener);
    };
};

export const getDefaultLLMSettings = () => ({ ...DEFAULT_LLM_SETTINGS });

hydrateFromStorage();
hydrateSourceFromStorage();

export const hasLocalLLMSettings = () => hasAnyContent(llmSettings);

let ensureHydratedPromise = null;

export const ensureLLMSettingsHydrated = async () => {
    if (hasAnyContent(llmSettings)) {
        return getLLMSettings();
    }
    if (ensureHydratedPromise) {
        return ensureHydratedPromise;
    }

    ensureHydratedPromise = (async () => {
        try {
            const remoteSettings = await fetchLLMSettingsFromServer();
            if (remoteSettings && typeof remoteSettings === 'object') {
                setServerLLMSettingsSnapshot(remoteSettings);
            }
            if (hasAnyContent(remoteSettings)) {
                replaceLLMSettings(remoteSettings);
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.warn('[LLM Settings] Failed to hydrate from server', error);
        } finally {
            ensureHydratedPromise = null;
        }
        return getLLMSettings();
    })();

    return ensureHydratedPromise;
};

if (typeof window !== 'undefined') {
    ensureLLMSettingsHydrated().catch(error => {
        // eslint-disable-next-line no-console
        console.warn('[LLM Settings] Initial hydration failed', error);
    });
}

export default {
    getLLMSettings,
    setLLMSettings,
    replaceLLMSettings,
    resetLLMSettings,
    subscribeToLLMSettings,
    getDefaultLLMSettings,
    hasLocalLLMSettings,
    ensureLLMSettingsHydrated,
    getServerLLMSettings,
    setServerLLMSettingsSnapshot,
    subscribeToServerLLMSettings,
    getLLMSettingsSource,
    setLLMSettingsSource,
    subscribeToLLMSettingsSource
};
