const tabWorkspaceMatcher = (function () {
    async function tryMoveTabToWorkspaceWindow(tab) {
        let workspaces = await storageService.getWorkspaces();
        const tabUrl = tab.pendingUrl ?? tab.url;
        let matchingWorkspace = getMatchingWorkspace(workspaces, tabUrl);

        if (matchingWorkspace) {
            console.log(`found matching workspace
            for tab ${tabUrl} - matching workspace: ${matchingWorkspace.name}.
            moving tab to the matching workspace case he isn't already in it`);
            await moveTabToMatchingWorkspace(tab, matchingWorkspace, workspaces);
        }
    }

    function getMatchingWorkspace(workspaces, tabUrl) {
        return workspaces.find((userWorkspace) => isUrlContainsOneOfWorkspaceUrls(tabUrl, userWorkspace));
    }

    // Private Methods

    function isUrlContainsOneOfWorkspaceUrls(url, workspace) {
        return !!workspace.urls.find((workspaceUrl) => url.includes(workspaceUrl));
    }

    async function moveTabToMatchingWorkspace(tab, matchingWorkspace, workspaces) {
        const moveAction = await getMoveAction(tab, matchingWorkspace);
        await executeMoveAction(moveAction, tab, matchingWorkspace, workspaces);
    }

    async function getMoveAction(tab, matchingWorkspace) {
        if (await windowApi.isWindowExists(matchingWorkspace.windowId)) {
            return tab.windowId == matchingWorkspace.windowId ? 'DO_NOTHING' : 'MOVE_TO_EXISTING_WINDOW';
        } else {
            return 'MOVE_TO_NEW_WINDOW';
        }
    }

    async function executeMoveAction(moveAction, tab, matchingWorkspace, workspaces) {
        switch (moveAction) {
            case 'MOVE_TO_EXISTING_WINDOW':
                moveTabToExistingWindow(tab, matchingWorkspace.windowId);
                break;
            case 'MOVE_TO_NEW_WINDOW':
                matchingWorkspace = await moveTabToNewWindow(tab, matchingWorkspace, workspaces);
            case 'DO_NOTHING':
            default:
                doNotMoveTab();
                break;
        }
    }

    async function moveTabToExistingWindow(createdTab, windowId) {
        windowApi.focusWindow(windowId);
        const movedTab = await windowApi.moveTab(createdTab.id, windowId);
        windowApi.highlightTab(windowId, movedTab);
        console.log('%ctab was moved to a new workspace window!', 'color: green');
    }

    async function moveTabToNewWindow(tab, matchingWorkspace, workspaces) {
        const newWindow = await windowApi.createWindow(tab.id);
        const matchingWorkspaceWithWindow = addWindowIdToWorkspace(matchingWorkspace, newWindow);
        updateWorkspacesWithGivenWorkspaceAndSave(workspaces, matchingWorkspaceWithWindow);
        console.log('%ccreated a new window and moved the tab in!', 'color: green');
    }

    function doNotMoveTab() {
        console.log('%ctab is already in correct workspace window. doing nothing', 'color: gray');
    }

    function addWindowIdToWorkspace(matchingWorkspace, newWindow) {
        return {
            ...matchingWorkspace,
            windowId: newWindow.id,
        };
    }

    function updateWorkspacesWithGivenWorkspaceAndSave(workspaces, matchingWorkspace) {
        workspaces = getUpdatedWorkspaces(workspaces, matchingWorkspace);
        storageService.setWorkspaces(workspaces);
    }

    function getUpdatedWorkspaces(workspaces, workspaceToUpdate) {
        return workspaces.map((workspace) => {
            if (workspace.name == workspaceToUpdate.name) {
                return workspaceToUpdate;
            } else return workspace;
        });
    }

    return {
        tryMoveTabToWorkspaceWindow,
        getMatchingWorkspace,
    };
})();
