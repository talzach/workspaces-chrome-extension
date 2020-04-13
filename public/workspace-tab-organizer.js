
const userWorkspaces = [
    {
        name: 'DevChrome',
        windowId: NaN,
        urls: [
            'developer.chrome.com',
            // 'https://developer.chrome.com'
        ]
    },
];

function moveTabToWorkspace(newTab) {
    var newTabHostname = getUrlHostname(newTab.pendingUrl);
    const matchingWorkspace = userWorkspaces.find(userWorkspace => userWorkspace.urls.includes(newTabHostname));
    
    if (matchingWorkspace) {
        moveTabToMatchingWorkspaceWindow(newTab, matchingWorkspace);
    }
}

function getUrlHostname(url) {
    return (new URL(url)).hostname;
}

async function moveTabToMatchingWorkspaceWindow(newTab, matchingWorkspace) {
    if (await isWindowExists(matchingWorkspace.windowId)) {
        moveTabToExistingWindow(newTab, matchingWorkspace.windowId);
    } else {
        moveTabToNewWindow(matchingWorkspace, newTab);
    }
}

async function moveTabToExistingWindow(createdTab, windowId) {
    focusWindow(windowId);
    const movedTab = await moveTab(createdTab.id, windowId);
    highlightTab(windowId, movedTab);
}

async function moveTabToNewWindow(matchingWorkspace, newTab) {
    const newWindow = await createWindow(newTab.id);
    matchingWorkspace.windowId = newWindow.id;
}

async function isWindowExists(id) {
    try {
        const window = await getWindow(id);
        return id ? Boolean(window) : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}