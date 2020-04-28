export const CHANGE_TAB_TITLE_SETTING_STORAGE_KEY = 'changeTabTitles';
export const HOMOGENIC_WORKSPACES_SETTING_STORAGE_KEY = 'homogenicWorkspaces';
export const MAX_WINDOW_SETTING_STORAGE_KEY = 'maxWindow';

export function setSettingsOnInstall() {
    storageService.set(CHANGE_TAB_TITLE_SETTING_STORAGE_KEY, true);
    storageService.set(HOMOGENIC_WORKSPACES_SETTING_STORAGE_KEY, false);
    storageService.set(MAX_WINDOW_SETTING_STORAGE_KEY, true);
}

export async function getWindowState() {
    const isWindowMaximized = await storageService.get(MAX_WINDOW_SETTING_STORAGE_KEY);
    return isWindowMaximized ? 'maximized' : 'normal';
}
