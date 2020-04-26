export function isWorkspaceWindow(windowId, workspaces) {
    return workspaces.some((workspace) => workspace.windowId == windowId);
}

export function getMatchingWorkspace(workspaces, tabUrl) {
    return workspaces.find((userWorkspace) => isUrlContainsOneOfWorkspaceUrls(tabUrl, userWorkspace));
}

function isUrlContainsOneOfWorkspaceUrls(url, workspace) {
    return !!workspace.urls.find((workspaceUrl) => url.includes(workspaceUrl));
}
