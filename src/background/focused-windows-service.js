let focusedNonWorkspaceWindowIds = [];

export function isFocusedNonWorkspaceWinsEmpty() {
    return !focusedNonWorkspaceWindowIds.length;
}

export function getLastNonWorkspaceFocusedWinId() {
    const [lastFocusedWinId] = focusedNonWorkspaceWindowIds;
    return lastFocusedWinId;
}

export function setLastFocusedNonWorkspaceWin(windowId) {
    if (windowId != -1) {
        removeLastFocusedNonWorkspaceWin(windowId);
        focusedNonWorkspaceWindowIds.unshift(windowId);
    }
}

export function removeLastFocusedNonWorkspaceWin(windowId) {
    focusedNonWorkspaceWindowIds = focusedNonWorkspaceWindowIds.filter((x) => x != windowId);
}
