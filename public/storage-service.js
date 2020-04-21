const storageService = (function () {
    async function get(key) {
        return new Promise((resolve) => {
            if (chrome.storage) {
                chrome.storage.sync.get([key], (result) => {
                    resolve(result[key]);
                });
            } else {
                resolve(null);
            }
        });
    }

    function set(key, value) {
        if (chrome.storage) {
            chrome.storage.sync.set({ [key]: value }, () => {
                console.log(`${key} saved to storage with value ${value}`);
            });
        } else {
            console.log(`${key} saved to storage with value ${value}`);
        }
    }

    async function getWorkspaces() {
        if (chrome.storage) {
            // chrome.storage.sync.clear();
            return await get('workspaces');
        } else {
            return getDummyWorkspaces();
        }
    }

    function setWorkspaces(workspaces) {
        set('workspaces', workspaces);
    }

    function getDummyWorkspaces() {
        return [
            {
                name: 'DevChrome',
                windowId: NaN,
                urls: [
                    'developer.chrome.com',
                    // 'https://developer.chrome.com'
                ],
            },
            {
                name: 'Tal',
                windowId: NaN,
                urls: [
                    'Tal.chrome.Tal',
                    // 'https://developer.chrome.com'
                ],
            },
        ];
    }

    return {
        get,
        set,
        getWorkspaces,
        setWorkspaces,
    };
})();
