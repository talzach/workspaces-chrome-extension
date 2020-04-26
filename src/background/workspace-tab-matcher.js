import { moveTabToMatchingWorkspace } from './workspace-tab-mover';
import { getMatchingWorkspace } from './workspace-service';
import { removeTabFromWorkspaceWindow } from './workspace-tab-remover';
import { CHANGE_TAB_TITLE_SETTING_STORAGE_KEY, HOMOGENIC_WORKSPACES_SETTING_STORAGE_KEY } from '../settings-service';

export async function tryMoveTabToWorkspaceWindow(tab) {
    const workspaceOnlyTabsSetting = await storageService.get(CHANGE_TAB_TITLE_SETTING_STORAGE_KEY);

    if (workspaceOnlyTabsSetting == undefined || workspaceOnlyTabsSetting) {
        let workspaces = await storageService.getWorkspaces();

        if (workspaces) {
            let matchingWorkspace = getMatchingWorkspace(workspaces, tab.url);

            matchingWorkspace
                ? await moveTabToMatchingWorkspace(tab, matchingWorkspace, workspaces)
                : await removeTabFromWorkspaceWindowCaseNeeded(tab, workspaces);
        }
    }
}

async function removeTabFromWorkspaceWindowCaseNeeded(tab, workspaces) {
    const homogenicWorkspacesSetting = await storageService.get(HOMOGENIC_WORKSPACES_SETTING_STORAGE_KEY);

    if (homogenicWorkspacesSetting == undefined || homogenicWorkspacesSetting) {
        removeTabFromWorkspaceWindow(tab, workspaces);
    }
}
