function displayResults(posts) {
    // Clear previous results
    resultsDiv.innerHTML = '';

    // Check if posts is an array
    if (!Array.isArray(posts) || posts.length === 0) {
        resultsDiv.innerHTML = 'No posts available.';
        console.log('No valid posts to display.');
        return;
    }

    // Use a Set to keep track of unique posts
    const uniquePosts = new Set();

    // Filter posts based on content length and uniqueness
    const filteredPosts = posts.filter(post => {
        const content = post.PostContent.trim();
        if (content.length > 10 && !uniquePosts.has(content)) {
            uniquePosts.add(content); // Add the content to the Set
            return true; // Keep this post
        }
        return false; // Exclude this post
    });

    // Check if there are valid filtered posts
    if (filteredPosts.length === 0) {
        resultsDiv.innerHTML = 'No valid posts available after filtering.';
        console.log('No valid posts after filtering.');
        return;
    }

    // Display filtered posts
    filteredPosts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
            <strong>Post ${post.SlNo}</strong><br>
            <p>${post.PostContent}</p>
            <img src="${post.ImagePath}" alt="Image" width="100"/><br>
            Likes: ${post.LikeCount} | Shares: ${post.ShareCount} | Comments: ${post.CommentsCount}
            <hr>
        `;
        resultsDiv.appendChild(postDiv);
    });
}
