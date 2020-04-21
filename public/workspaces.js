async function tryToMoveTabToWorkspaceWindow(tab) {
    let workspaces = await getWorkspacesFromStorage();
    const tabUrl = tab.pendingUrl ?? tab.url;
    let matchingWorkspace = getMatchingWorkspace(workspaces, tabUrl);

    if (matchingWorkspace) {
        console.log(`found matching workspace
            for tab ${tabUrl} - matching workspace: ${matchingWorkspace.name}.
            moving tab to the matching workspace case he isn't already in it`);
        matchingWorkspace = await moveTabToMatchingWorkspace(tab, matchingWorkspace, workspaces);
    }
}

function getMatchingWorkspace(workspaces, tabUrl) {
    return workspaces.find((userWorkspace) => isUrlContainsOneOfWorkspaceUrls(tabUrl, userWorkspace));
}

function isUrlContainsOneOfWorkspaceUrls(url, workspace) {
    return !!workspace.urls.find((workspaceUrl) => url.includes(workspaceUrl));
}

async function moveTabToMatchingWorkspace(tab, matchingWorkspace, workspaces) {
    matchingWorkspace = await moveTabToMatchingWorkspaceWindow(tab, matchingWorkspace);
    workspaces = getUpdatedWorkspaces(workspaces, matchingWorkspace);
    saveWorkspacesToStorage(workspaces);
    return matchingWorkspace;
}

function getUpdatedWorkspaces(workspaces, workspaceToUpdate) {
    return workspaces.map((workspace) => {
        if (workspace.name == workspaceToUpdate.name) {
            return workspaceToUpdate;
        } else return workspace;
    });
}

async function getWorkspacesFromStorage() {
    return await getFromStorage('workspaces');
}

function saveWorkspacesToStorage(workspaces) {
    saveToStorage('workspaces', workspaces);
}

async function moveTabToMatchingWorkspaceWindow(tab, matchingWorkspace) {
    if (await isWindowExists(matchingWorkspace.windowId)) {
        if (tab.windowId == matchingWorkspace.windowId) {
            console.log('%ctab is already in correct workspace window. doing nothing', 'color: gray');
        } else {
            moveTabToExistingWindow(tab, matchingWorkspace.windowId);
        }

        return matchingWorkspace;
    } else {
        const newWindow = await createWindow(tab.id);
        return addWindowIdToWorkspace(matchingWorkspace, newWindow);
    }
}

function addWindowIdToWorkspace(matchingWorkspace, newWindow) {
    return {
        ...matchingWorkspace,
        windowId: newWindow.id,
    };
}

async function moveTabToExistingWindow(createdTab, windowId) {
    focusWindow(windowId);
    const movedTab = await moveTab(createdTab.id, windowId);
    highlightTab(windowId, movedTab);
    console.log('%ctab was moved to a new workspace window!', 'color: green');
}
