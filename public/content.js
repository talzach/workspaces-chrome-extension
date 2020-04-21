(async function tryChangeTabTitle() {
    const changeTabTitlesSetting = await storageService.get('changeTabTitles');
    if (changeTabTitlesSetting == undefined || changeTabTitlesSetting) {
        const matchingWorkspaceName = await getMatchingWorkspace();

        if (matchingWorkspaceName) {
            changeTabTitle(matchingWorkspaceName);
            listenToDomTitleChanges(matchingWorkspaceName);
        }
    }
})();

let didAlreadyChangedTitle = false;

function changeTabTitle(matchingWorkspaceName) {
    console.debug('found matching workspace! prefixing tab name with' + matchingWorkspaceName);
    document.title = `[${matchingWorkspaceName}] ${document.title}`;
}

function listenToDomTitleChanges(matchingWorkspaceName) {
    var observer = new MutationObserver(() => onDomTitleChanged(matchingWorkspaceName));
    observer.observe(document.querySelector('head > title'), {
        subtree: true,
        characterresponse: true,
        childList: true,
    });
}

function onDomTitleChanged(matchingWorkspaceName) {
    if (!didAlreadyChangedTitle) {
        changeTabTitle(matchingWorkspaceName);
    }

    didAlreadyChangedTitle = !didAlreadyChangedTitle;
}

async function getMatchingWorkspace() {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ getMatchingWorkspace: true }, function (response) {
            resolve(response.matchingWorkspaceName);
        });
    });
}
