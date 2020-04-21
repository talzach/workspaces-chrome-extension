chrome.runtime.onInstalled.addListener(() => {
    chrome.runtime.openOptionsPage();
});

chrome.browserAction.onClicked.addListener(() => {
    chrome.runtime.openOptionsPage();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        console.debug('tab url updated');
        tryToMoveTabToWorkspaceWindow(tab);
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (sender.tab && request.getMatchingWorkspace) {
        doSomethingWith(request, sender).then(sendResponse);
    }

    return true; // return true to indicate you want to send a response asynchronously
});

async function doSomethingWith(request, sender) {
    let workspaces = await getWorkspacesFromStorage();
    let matchingWorkspace = getMatchingWorkspace(workspaces, sender.tab.url);
    console.log('got message from content script. matching workspace: ' + matchingWorkspace?.name);

    return { matchingWorkspaceName: matchingWorkspace?.name };
}

async function createWindow(tabId) {
    console.log('%ccreating a new window and moving the tab to it!', 'color: green');
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
        `no existing window with id ${id} was found. window was probably closed. Error:`,
        chrome.runtime.lastError.message
    );
    return false;
}
