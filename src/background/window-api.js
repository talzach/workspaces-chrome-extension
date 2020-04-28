const getWindowParams = { populate: false, windowTypes: ['normal'] };

export async function createWindow(tabId, state) {
    return new Promise((resolve) => {
        chrome.windows.create({ tabId, state }, (window) => resolve(window));
    });
}

export function focusWindow(windowId) {
    chrome.windows.update(windowId, { focused: true });
}

export async function isWindowExists(id) {
    if (!id) {
        console.debug('no window id provided');
        return false;
    }

    return new Promise((resolve) => {
        chrome.windows.get(id, getWindowParams, () => {
            return resolve(chrome.runtime.lastError ? getWindowFailed(id) : true);
        });
    });
}

export function highlightTab(windowId, movedTab) {
    chrome.tabs.highlight({ windowId, tabs: movedTab.index });
}

export async function moveTab(tabId, windowId) {
    return new Promise((resolve) => {
        chrome.tabs.move(tabId, { windowId, index: -1 }, (movedTab) => {
            resolve(movedTab);
        });
    });
}

export async function getAll() {
    return new Promise((resolve) => {
        chrome.windows.getAll(getWindowParams, (windows) => {
            resolve(windows);
        });
    });
}

function getWindowFailed(id) {
    console.log(
        `no existing window with id ${id} was found. window was probably closed. Error:`,
        chrome.runtime.lastError.message
    );
    return false;
}
