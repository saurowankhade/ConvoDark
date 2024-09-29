// Function to apply dark mode by injecting 'appOn.js' into the current page
const applyDarkMode = () => {
    // Inject 'appOn.js' script into the current page to enable dark mode
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('appOn.js');
    document.head.appendChild(script);
};

// Check if the current page URL should have dark mode applied
const checkAndApplyDarkMode = () => {
    chrome.storage.sync.get('urls', (data) => {
        const urls = data.urls || [];
        const currentUrl = window.location.href;

        // If the current URL is stored, apply dark mode
        if (urls.includes(currentUrl)) {
            applyDarkMode();  // Automatically applies dark mode
        }
    });
};

// Automatically run the check when the content script is executed (page load or reload)
checkAndApplyDarkMode();
