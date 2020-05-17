let workspaceName;

changeWorkspaceTabTitle();

async function changeWorkspaceTabTitle() {
    const changeTabTitlesSetting = await storageService.get('changeTabTitles');
    if (changeTabTitlesSetting) {
        const matchingWorkspaceName = await getMatchingWorkspace();

        if (matchingWorkspaceName) {
            workspaceName = matchingWorkspaceName;
            prefixWorkspaceNameToTabTitle(getTabTitle(workspaceName));
            listenToDomTitleChanges();
        }
    }
}

chrome.runtime.onMessage.addListener((request) => {
    if (request.tabMoved) {
        if (request.tabMoved.matchingWorkspaceName) {
            workspaceName = request.tabMoved.matchingWorkspaceName;
            prefixWorkspaceNameToTabTitle(getTabTitle(workspaceName));
        } else if (workspaceName) {
            removeWorkspaceNameFromTabTitle();
        }
    }
});

async function getMatchingWorkspace() {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ getMatchingWorkspace: true }, function (response) {
            resolve(response.matchingWorkspaceName);
        });
    });
}

function listenToDomTitleChanges() {
    var observer = new MutationObserver(() => onDomTitleChanged());
    observer.observe(document.querySelector('head > title'), {
        subtree: true,
        characterresponse: true,
        childList: true,
    });
}

function onDomTitleChanged() {
    if (workspaceName) {
        const tabTitle = getTabTitle(workspaceName);

        if (!document.title.startsWith(tabTitle)) {
            prefixWorkspaceNameToTabTitle(tabTitle);
        }
    }
}

function getTabTitle(workspaceName) {
    return `[${workspaceName}]`;
}

function prefixWorkspaceNameToTabTitle(tabTitle) {
    document.title = `${tabTitle} ${document.title}`;
}

function removeWorkspaceNameFromTabTitle() {
    titleArray = document.title.split(getTabTitle(workspaceName));
    if (titleArray.length > 1) {
        document.title = titleArray[1];
        workspaceName = null;
    }
}
