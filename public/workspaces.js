async function moveTabToWorkspace(tab) {
    let workspaces = await getWorkspacesFromStorage();
    let matchingWorkspace = workspaces.find((userWorkspace) =>
        isUrlContainsOneOfWorkspaceUrls(tab.pendingUrl ?? tab.url, userWorkspace)
    );

    if (matchingWorkspace) {
        matchingWorkspace = await moveTabToMatchingWorkspaceWindow(tab, matchingWorkspace);
        workspaces = getUpdatedWorkspaces(workspaces, matchingWorkspace);
        saveWorkspacesToStorage(workspaces);
    }
}

function getUpdatedWorkspaces(workspaces, workspaceToUpdate) {
    return workspaces.map((workspace) => {
        if (workspace.name == workspaceToUpdate.name) {
            return workspaceToUpdate;
        } else return workspace;
    });
}

function isUrlContainsOneOfWorkspaceUrls(url, workspace) {
    return !!workspace.urls.find((workspaceUrl) => url.includes(workspaceUrl));
}

async function getWorkspacesFromStorage() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['workspaces'], (result) => {
            resolve(result.workspaces);
        });
    });
}

function saveWorkspacesToStorage(workspaces) {
    chrome.storage.sync.set({ workspaces }, () => {
        console.debug('workspaces saved', workspaces);
    });
}

async function moveTabToMatchingWorkspaceWindow(newTab, matchingWorkspace) {
    console.log(`found matching workspace
        for tab ${newTab.pendingUrl} - matching workspace: ${matchingWorkspace.name}.
        moving tab to the new workspace`);

    if (await isWindowExists(matchingWorkspace.windowId)) {
        moveTabToExistingWindow(newTab, matchingWorkspace.windowId);
        return matchingWorkspace;
    } else {
        const newWindow = await createWindow(newTab.id);
        return getWorkspaceWithNewWindow(matchingWorkspace, newWindow);
    }
}

function getWorkspaceWithNewWindow(matchingWorkspace, newWindow) {
    return {
        ...matchingWorkspace,
        windowId: newWindow.id,
    };
}

async function moveTabToExistingWindow(createdTab, windowId) {
    focusWindow(windowId);
    const movedTab = await moveTab(createdTab.id, windowId);
    highlightTab(windowId, movedTab);
}
