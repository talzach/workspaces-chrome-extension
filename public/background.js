chrome.runtime.onInstalled.addListener(() => {
    chrome.runtime.openOptionsPage();
});

chrome.browserAction.onClicked.addListener(() => {
    chrome.runtime.openOptionsPage();
});

chrome.tabs.onCreated.addListener((newTab) => {
    moveTabToWorkspace(newTab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    moveTabToWorkspace(tab);
});

async function createWindow(tabId) {
    return new Promise((resolve) => {
        chrome.windows.create({ tabId }, (window) => resolve(window));
    });
}

function highlightTab(windowId, movedTab) {
    chrome.tabs.highlight({ windowId, tabs: movedTab.index });
}

function focusWindow(windowId) {
    chrome.windows.update(windowId, { focused: true });
}

async function moveTab(tabId, windowId) {
    return new Promise((resolve) => {
        chrome.tabs.move(tabId, { windowId, index: -1 }, (movedTab) => {
            resolve(movedTab);
        });
    });
}

const getWindowParams = { populate: false, windowTypes: ['normal'] };

async function isWindowExists(id) {
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

function getWindowFailed(id) {
    console.log(
        `no existing window with id ${id} was found. window was probably closed`,
        chrome.runtime.lastError.message
    );
    return false;
}
