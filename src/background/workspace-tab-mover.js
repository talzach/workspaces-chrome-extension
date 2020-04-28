import { isWindowExists, createWindow, focusWindow, highlightTab, moveTab } from './window-api';
import { getWindowState } from '../settings-service';

export async function moveTabToMatchingWorkspace(tab, matchingWorkspace, workspaces) {
    console.log(`found matching workspace
        for tab ${tab.url} - matching workspace: ${matchingWorkspace.name}.
        moving tab to the matching workspace case he isn't already in it`);

    const moveAction = await getMoveAction(tab, matchingWorkspace);
    await executeMoveAction(moveAction, tab, matchingWorkspace, workspaces);
}

export async function moveTabToExistingWindow(createdTab, windowId) {
    focusWindow(windowId);
    const movedTab = await moveTab(createdTab.id, windowId);
    highlightTab(windowId, movedTab);
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

async function getMoveAction(tab, matchingWorkspace) {
    if (await isWindowExists(matchingWorkspace.windowId)) {
        return tab.windowId == matchingWorkspace.windowId ? 'DO_NOTHING' : 'MOVE_TO_EXISTING_WINDOW';
    } else {
        return 'MOVE_TO_NEW_WINDOW';
    }
}

async function moveTabToNewWindow(tab, matchingWorkspace, workspaces) {
    const windowState = await getWindowState();
    const newWindow = await createWindow(tab.id, windowState);
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
