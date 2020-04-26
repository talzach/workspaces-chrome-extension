export const CHANGE_TAB_TITLE_SETTING_STORAGE_KEY = 'changeTabTitles';
export const HOMOGENIC_WORKSPACES_SETTING_STORAGE_KEY = 'homogenicWorkspaces';

export function setSettingsOnInstall() {
    storageService.set(CHANGE_TAB_TITLE_SETTING_STORAGE_KEY, true);
    storageService.set(HOMOGENIC_WORKSPACES_SETTING_STORAGE_KEY, true);
}
