import { moveTabToMatchingWorkspace } from './workspace-tab-mover';
import { getMatchingWorkspace } from './workspace-service';
import { removeTabFromWorkspaceWindow } from './workspace-tab-remover';

export async function tryMoveTabToWorkspaceWindow(tab) {
    let workspaces = await storageService.getWorkspaces();

    if (workspaces) {
        let matchingWorkspace = getMatchingWorkspace(workspaces, tab.url);

        matchingWorkspace
            ? await moveTabToMatchingWorkspace(tab, matchingWorkspace, workspaces)
            : await removeTabFromWorkspaceWindow(tab, workspaces);
    }
}
