console.log("Background script loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'savePosts') {
        try {
            const posts = message.data;

            // Store the posts in local storage or process them as needed
            chrome.storage.local.set({ posts: posts }, () => {
                sendResponse({ success: true, message: 'Posts saved successfully' });
            });
            return true; // Keep the message channel open for sendResponse
        } catch (error) {
            console.error('Error saving posts:', error);
            sendResponse({ success: false, message: 'Error saving posts' });
        }
    }
});
