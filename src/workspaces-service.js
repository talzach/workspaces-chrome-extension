import { getFromStorage, saveToStorage } from './storage-service';

export function createWorkspace(name) {
    return { name, urls: [] };
}

export async function getWorkspacesFromStorage() {
    if (chrome.storage) {
        // chrome.storage.sync.clear();
        return await getFromStorage('workspaces');
    } else {
        return getDummyWorkspaces();
    }
}

export function saveWorkspacesToStorage(workspaces) {
    saveToStorage('workspaces', workspaces);
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
