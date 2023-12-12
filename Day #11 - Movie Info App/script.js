// Get references to HTML elements
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// API key (Assuming 'key' is defined somewhere in your code)
let key = "your_api_key_here";

// Function to fetch data from the OMDB API
let getMovie = () => {
    // Get movie name from the input field
    let movieName = movieNameRef.value;

    // Construct the URL for the OMDB API
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    // Check if the input field is empty
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
    } else {
        // Fetch data from the OMDB API
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                // Check if the movie exists in the database
                if (data.Response == "True") {
                    // Display movie information
                    result.innerHTML = `
             <div class="info">
               <img src=${data.Poster} class="poster">
               <div>
                 <h2>${data.Title}</h2>
                 <div class="rating">
                   <img src="star-icon.svg">
                   <h4>${data.imdbRating}</h4>
                 </div>
                 <div class="details">
                   <span>${data.Rated}</span>
                   <span>${data.Year}</span>
                   <span>${data.Runtime}</span>
                 </div>
                 <div class="genre">
                   <div>${data.Genre.split(",").join("</div><div>")}</div>
                 </div>
               </div>
             </div>
             <h3>Plot:</h3>
             <p>${data.Plot}</p>
             <h3>Cast:</h3>
             <p>${data.Actors}</p>
           `;
                } else {
                    // Display an error message if the movie doesn't exist
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            // Handle errors that may occur during the fetch
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
            });
    }
};

// Add click event listener to the search button
searchBtn.addEventListener("click", getMovie);

// Automatically fetch movie data when the page loads
window.addEventListener("load", getMovie);