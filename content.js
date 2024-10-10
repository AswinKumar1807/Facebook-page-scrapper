console.log("Content script loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'extractPosts') {
        console.log("Extracting posts...");
        try {
            const posts = [];
            const postElements = document.querySelectorAll('div[data-mcomponent="MContainer"]'); // Adjust the selector as needed

            if (postElements.length === 0) {
                console.log('No posts found. Please check the selector.');
                sendResponse({ success: false, message: 'No posts found' });
                return;
            }

            const uniqueContentSet = new Set(); // To track unique post content

            postElements.forEach((post, index) => {
                // Extract post content and image
                const contentElement = post.querySelector('.native-text');
                const content = contentElement ? contentElement.innerText.trim() : 'No content';
                const imageUrlElement = post.querySelector('img');
                const imageUrl = imageUrlElement ? imageUrlElement.src : 'No image';

                // Get the next sibling for interaction counts
                const interactionElement = post.nextElementSibling; // Adjust based on your DOM structure
                const likeCount = interactionElement ? interactionElement.querySelector('[aria-label*="like"]')?.innerText || '0' : '0';
                const shareCount = interactionElement ? interactionElement.querySelector('[aria-label*="share"]')?.innerText || '0' : '0';
                const commentCount = interactionElement ? interactionElement.querySelector('[aria-label*="comment"]')?.innerText || '0' : '0';

                // Filter out posts with content length less than 4 and duplicates
                if (content.length > 3 && !uniqueContentSet.has(content)) {
                    uniqueContentSet.add(content); // Add to the set to ensure uniqueness
                    posts.push({
                        SlNo: index + 1,
                        PostContent: content,
                        ImagePath: imageUrl,
                        LikeCount: likeCount,
                        ShareCount: shareCount,
                        CommentsCount: commentCount
                    });
                }
            });

            console.log(`Posts extracted: ${posts.length}`);
            sendResponse({ success: true, data: posts });
        } catch (error) {
            console.error('Failed to extract posts:', error);
            sendResponse({ success: false, message: 'Failed to extract posts' });
        }
    }
});
