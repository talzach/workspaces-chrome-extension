import { createWindow, isWindowExists } from './window-api';
import { moveTabToExistingWindow } from './workspace-tab-mover';
import { isWorkspaceWindow } from './workspace-service';
import { isFocusedNonWorkspaceWinsEmpty, getLastNonWorkspaceFocusedWinId } from './focused-windows-service';

export async function removeTabFromWorkspaceWindow(tab, workspaces) {
    if (isWorkspaceWindow(tab.windowId, workspaces)) {
        await findNonWorkspaceWinAndMoveTab(tab, workspaces);
    }
}

async function findNonWorkspaceWinAndMoveTab(tab, workspaces) {
    if (!isFocusedNonWorkspaceWinsEmpty()) {
        const lastFocusedWinId = getLastNonWorkspaceFocusedWinId();

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