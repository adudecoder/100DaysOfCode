// Async function to search GitHub user details
const searchGithub = async () => {
    // Get the username from the input field
    const username = document.getElementById("searchInput").value;

    // Fetch user details from GitHub API
    const response = await fetch(`https://api.github.com/users/${username}`);

    // Select the details container from the DOM
    const detailsContainer = document.querySelector(".details");

    // Parse the response data as JSON
    const data = await response.json();

    // Check if the response is successful
    if (response.ok) {
        // Display user details in the result container
        detailsContainer.style.display = "flex";
        document.getElementById("result").innerHTML = `
            <div class="profile">
                <!-- Profile image -->
                <div class="profile-image">
                    <img src="${data.avatar_url}" />
                </div>
                <!-- Profile details -->
                <div class="profile-details">
                    <h2 class="name">${data.name || data.login}</h2>
                    <p class="username">@${data.login}</p>
                    <p class="bio">${data.bio || 'Account doesn\'t have a bio.'}</p>
                    <!-- User statistics -->
                    <div class="stats">
                        <div>
                            <div class="stats-name">Public Repos</div>
                            <div class="stats-value">${data.public_repos}</div>
                        </div>
                        <div>
                            <div class="stats-name">Followers</div>
                            <div class="stats-value">${data.followers}</div>
                        </div>
                        <div>
                            <div class="stats-name">Following</div>
                            <div class="stats-value">${data.following}</div>
                        </div>
                    </div>
                    <!-- Social media links -->
                    <div class="media">
                        <p><span class="media-value">${data.location || 'Not Available'}</span></p>
                        <p><span class="media-value">${data.blog || 'Not Available'}</span></p>
                        <p><span class="media-value">${data.twitter_username || 'Not Available'}</span></p>
                        <p><span class="media-value">${data.company || 'Not Available'}</span></p>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Display an alert with the error message
        alert(data.message);
    }
}

// Event listener for the search button
document.getElementById("searchBtn").addEventListener("click", searchGithub);
