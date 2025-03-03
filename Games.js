document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchResultTemplate = document.getElementById('searchResultTemplate').innerHTML;

    searchResults.innerHTML = 'Games loading...';

    fetch('games.json')
        .then(response => response.json())
        .then(data => {
            function renderSearchResults(searchTerm = '') {
                searchResults.innerHTML = '';

                const filteredResults = data.filter(item =>
                    item.title.toLowerCase().includes(searchTerm.toLowerCase())
                );

                filteredResults.forEach(result => {
                    const renderedTemplate = renderTemplate(searchResultTemplate, result);
                    searchResults.innerHTML += renderedTemplate;
                });

                // Attach event listeners to game links
                document.querySelectorAll('.game-link').forEach(link => {
                    link.addEventListener('click', function (event) {
                        event.preventDefault();
                        const gameUrl = this.getAttribute('href');

                        if (gameUrl) {
                            window.location.href = `game.html?game=${encodeURIComponent(gameUrl)}`;
                        } else {
                            console.error('Game URL is missing');
                        }
                    });
                });
            }

            renderSearchResults();

            searchInput.addEventListener('input', function () {
                const searchTerm = searchInput.value.trim();
                renderSearchResults(searchTerm);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function renderTemplate(template, data) {
    return template.replace(/{{(.*?)}}/g, (match, key) => data[key.trim()]);
}
