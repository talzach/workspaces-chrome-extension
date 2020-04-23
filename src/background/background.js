import { tryMoveTabToWorkspaceWindow, getMatchingWorkspace } from './tab-workspace-matcher';

chrome.runtime.onInstalled.addListener(() => {
    chrome.runtime.openOptionsPage();
});

chrome.browserAction.onClicked.addListener(() => {
    chrome.runtime.openOptionsPage();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        console.debug('tab url updated');
        tryMoveTabToWorkspaceWindow(tab);
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (sender.tab && request.getMatchingWorkspace) {
        getMatchingWorkspaceOnTabRequest(request, sender).then(sendResponse);
    } else {
        Promise.resolve(null);
    }

    return true; // return true to indicate you want to send a response asynchronously
});

async function getMatchingWorkspaceOnTabRequest(request, sender) {
    let workspaces = await storageService.getWorkspaces();
    let matchingWorkspace = getMatchingWorkspace(workspaces, sender.tab.url);
    console.log(
        'got message from content script. matching workspace: ' + matchingWorkspace ? matchingWorkspace.name : null
    );

    return { matchingWorkspaceName: matchingWorkspace ? matchingWorkspace.name : null }; // response
}
