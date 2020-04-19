changeTabTitle();

async function changeTabTitle() {
    if (await getFromStorage('changeTabTitles')) {
        chrome.runtime.sendMessage({ getMatchingWorkspace: true }, function (response) {
            if (response.matchingWorkspaceName) {
                console.debug('found matching workspace! prefixing tab name with' + response.matchingWorkspaceName);
                document.title = `[${response.matchingWorkspaceName}] ${document.title}`;
            }
        });
    }
}
