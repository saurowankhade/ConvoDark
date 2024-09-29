// Assuming this is part of your content script or popup script
console.log("Hello from");
const checkDarkMode = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return; // Handle no active tabs case
        const tabId = tabs[0].id;
        const currentUrl = tabs[0].url;
        console.log(tabs);
        
        chrome.storage.sync.get({ urls: [] }, (data) => {
            const urls = data.urls;
            console.log(urls);
            console.log(urls.includes(currentUrl));
            
            if (urls.includes(currentUrl)) {
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ['appOn.js']
                });
            } else {
                urls.push(currentUrl);
                chrome.storage.sync.set({ urls: urls }, () => {
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        files: ['appOn.js']
                    });
                });
            }
        });
    });
};

checkDarkMode();

if (document.getElementsByClassName('pop')) {
    const button = document.querySelector('button');
    button.addEventListener('click', () => {
        checkDarkMode();
    });
}
