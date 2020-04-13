export async function getWorkspacesFromStorage() {
  return new Promise(resolve => {
    if (chrome.storage) {
      // chrome.storage.sync.clear();
      chrome.storage.sync.get(['workspaces'], result => {
        resolve(result.workspaces);
      });
    } else {
      resolve(getDummyWorkspaces());
    }
  });
}

export function saveWorkspacesToStorage(workspaces) {
  if (chrome.storage) {
    chrome.storage.sync.set({ workspaces }, () => {
      console.log('workspaces saved');
    });
  } else {
    console.log('dummy workspaces saved');
  }
}

export function createWorkspace(name) {
  return { name, urls: [] };
}

function getDummyWorkspaces() {
  return [
    {
      name: 'DevChrome',
      windowId: NaN,
      urls: [
        'developer.chrome.com'
        // 'https://developer.chrome.com'
      ]
    },
    {
      name: 'Tal',
      windowId: NaN,
      urls: [
        'Tal.chrome.Tal'
        // 'https://developer.chrome.com'
      ]
    }
  ];
}
