// script.js

// Function to fetch and display games
function loadGames() {
    // Fetch the games.json file
    fetch('games.json')
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            const gamesContainer = document.getElementById('games-container');
            gamesContainer.innerHTML = ''; // Clear the container first

            // Loop through each game and create HTML elements to display them
            data.forEach(game => {
                const gameDiv = document.createElement('div');
                gameDiv.classList.add('game');

                const gameTitle = document.createElement('h2');
                gameTitle.textContent = game.name;

                const gameImage = document.createElement('img');
                gameImage.src = game.image;
                gameImage.alt = `${game.name} image`;

                const gameDescription = document.createElement('p');
                gameDescription.textContent = game.description;

                const gameTags = document.createElement('p');
                gameTags.textContent = 'Tags: ' + game.tags.join(', ');

                // Append the created elements to the gameDiv
                gameDiv.appendChild(gameTitle);
                gameDiv.appendChild(gameImage);
                gameDiv.appendChild(gameDescription);
                gameDiv.appendChild(gameTags);

                // Append the gameDiv to the games container
                gamesContainer.appendChild(gameDiv);
            });
        })
        .catch(error => console.error('Error loading games:', error));
}

// Call the loadGames function when the page loads
window.onload = loadGames;
