
chrome.tabs.onCreated.addListener(function tabCreated(newTab) {
    moveTabToWorkspace(newTab);
});

async function createWindow(tabId) {
    return new Promise(resolve => {
        chrome.windows.create({ tabId }, window => resolve(window));
    });
}

function highlightTab(windowId, movedTab) {
    chrome.tabs.highlight({ windowId, tabs: movedTab.index });
}

function focusWindow(windowId) {
    chrome.windows.update(windowId, { focused: true });
}

async function moveTab(tabId, windowId) {
    return new Promise(resolve => {
        chrome.tabs.move(tabId, { windowId, index: -1 }, movedTab => {
            resolve(movedTab);
        });
    });
}

async function getWindow(id) {
    return new Promise(resolve => {
        chrome.windows.get(id, { windowTypes: ['normal'] }, window => {
            resolve(window);
        });
    });
}