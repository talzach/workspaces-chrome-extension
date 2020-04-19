export async function getFromStorage(key) {
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

export function saveToStorage(key, value) {
    if (chrome.storage) {
        chrome.storage.sync.set({ [key]: value }, () => {
            console.log(`${key} saved to storage with value ${value}`);
        });
    } else {
        console.log(`${key} saved to storage with value ${value}`);
    }
}
