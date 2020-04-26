import { tryMoveTabToWorkspaceWindow } from './workspace-tab-matcher';
import { isWorkspaceWindow, getMatchingWorkspace } from './workspace-service';
import { setLastFocusedNonWorkspaceWin, removeLastFocusedNonWorkspaceWin } from './focused-windows-service';

chrome.browserAction.onClicked.addListener(() => {
    chrome.runtime.openOptionsPage();
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.runtime.openOptionsPage();
    setSettingsOnInstall();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (sender.tab && request.getMatchingWorkspace) {
        getMatchingWorkspaceOnTabRequest(request, sender).then(sendResponse);
    } else {
        Promise.resolve(null);
    }

    return true; // return true to indicate you want to send a response asynchronously
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && changeInfo.url != 'chrome://newtab/') {
        console.debug(`existing tab ${tabId} url updated with url: ${changeInfo.url}`);
        tryMoveTabToWorkspaceWindow(tab);
    }
});

chrome.windows.onFocusChanged.addListener(async (windowId) => {
    let workspaces = await storageService.getWorkspaces();
    if (workspaces && !isWorkspaceWindow(windowId, workspaces)) {
        setLastFocusedNonWorkspaceWin(windowId);
    }
});

chrome.windows.onRemoved.addListener((windowId) => {
    removeLastFocusedNonWorkspaceWin(windowId);
});

async function getMatchingWorkspaceOnTabRequest(request, sender) {
    let matchingWorkspace = null;
    let workspaces = await storageService.getWorkspaces();

    if (workspaces) {
        matchingWorkspace = getMatchingWorkspace(workspaces, sender.tab.url);
        console.log(
            'got message from content script. matching workspace: ' + getWorkspaceNameOrNull(matchingWorkspace)
        );
    }

    return { matchingWorkspaceName: getWorkspaceNameOrNull(matchingWorkspace) }; // response
}

function getWorkspaceNameOrNull(workspace) {
    return workspace ? workspace.name : null;
}

function setSettingsOnInstall() {
    storageService.set('changeTabTitles', true);
}
