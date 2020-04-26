import { createWindow, focusWindow, isWindowExists, highlightTab, moveTab } from './window-api';

let focusedNonWorkspaceWindowIds = [];

export async function tryMoveTabToWorkspaceWindow(tab) {
    let workspaces = await storageService.getWorkspaces();

    if (workspaces) {
        let matchingWorkspace = getMatchingWorkspace(workspaces, tab.url);

        matchingWorkspace
            ? await moveTabToMatchingWorkspace(tab, matchingWorkspace, workspaces)
            : await removeTabFromWorkspaceWindow(tab, workspaces);
    }
}

async function removeTabFromWorkspaceWindow(tab, workspaces) {
    if (isWorkspaceWindow(tab.windowId, workspaces)) {
        await findNonWorkspaceWinAndMoveTab(tab, workspaces);
    }
}

async function findNonWorkspaceWinAndMoveTab(tab, workspaces) {
    if (focusedNonWorkspaceWindowIds.length) {
        const lastFocusedWinId = getLastNonWorkspaceFocusedWindow();

        if (!isWorkspaceWindow(lastFocusedWinId, workspaces) && (await isWindowExists(lastFocusedWinId))) {
            moveTabToExistingWindow(tab, lastFocusedWinId);
        } else {
            removeLastFocusedNonWorkspaceWindowId(lastFocusedWinId);
            findNonWorkspaceWinAndMoveTab(tab, workspaces); // recursion
        }
    } else {
        await createWindow(tab.id);
    }
}

function getLastNonWorkspaceFocusedWindow() {
    const [lastFocusedWinId] = focusedNonWorkspaceWindowIds;
    return lastFocusedWinId;
}

export function setLastFocusedNonWorkspaceWindowId(windowId) {
    if (windowId != -1) {
        removeLastFocusedNonWorkspaceWindowId(windowId);
        focusedNonWorkspaceWindowIds.unshift(windowId);
    }
}

export function removeLastFocusedNonWorkspaceWindowId(windowId) {
    focusedNonWorkspaceWindowIds = focusedNonWorkspaceWindowIds.filter((x) => x != windowId);
}

export function isWorkspaceWindow(windowId, workspaces) {
    return workspaces.some((workspace) => workspace.windowId == windowId);
}

export function getMatchingWorkspace(workspaces, tabUrl) {
    return workspaces.find((userWorkspace) => isUrlContainsOneOfWorkspaceUrls(tabUrl, userWorkspace));
}

function isUrlContainsOneOfWorkspaceUrls(url, workspace) {
    return !!workspace.urls.find((workspaceUrl) => url.includes(workspaceUrl));
}

async function moveTabToMatchingWorkspace(tab, matchingWorkspace, workspaces) {
    console.log(`found matching workspace
        for tab ${tab.url} - matching workspace: ${matchingWorkspace.name}.
        moving tab to the matching workspace case he isn't already in it`);

    const moveAction = await getMoveAction(tab, matchingWorkspace);
    await executeMoveAction(moveAction, tab, matchingWorkspace, workspaces);
}

async function getMoveAction(tab, matchingWorkspace) {
    if (await isWindowExists(matchingWorkspace.windowId)) {
        return tab.windowId == matchingWorkspace.windowId ? 'DO_NOTHING' : 'MOVE_TO_EXISTING_WINDOW';
    } else {
        return 'MOVE_TO_NEW_WINDOW';
    }
}

async function executeMoveAction(moveAction, tab, matchingWorkspace, workspaces) {
    switch (moveAction) {
        case 'MOVE_TO_EXISTING_WINDOW':
            moveTabToExistingWindow(tab, matchingWorkspace.windowId);
            console.log('%ctab was moved to a new workspace window!', 'color: green');
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
    focusWindow(windowId);
    const movedTab = await moveTab(createdTab.id, windowId);
    highlightTab(windowId, movedTab);
}

async function moveTabToNewWindow(tab, matchingWorkspace, workspaces) {
    const newWindow = await createWindow(tab.id);
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
