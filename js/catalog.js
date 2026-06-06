import { getGamesList } from './api.js';

// DOM Selectors
const catalogContainer = document.getElementById('game-catalog-container');
const searchBar = document.getElementById('search-bar');
const genreFilter = document.getElementById('genre-filter');
const platformFilter = document.getElementById('platform-filter');
const sortFilter = document.getElementById('sort-filter');

let allGames = [];

/**
 * Initializes catalog elements and loads initial data.
 */
async function initCatalog() {
    try {
        allGames = await getGamesList();
        filterAndSortGames();
    } catch (err) {
        showError(err.message);
    }
}

/**
 * Filters and sorts games array based on toolbar choices, then triggers render.
 */
function filterAndSortGames() {
    let filtered = [...allGames];

    // 1. Title Search Filter
    const query = searchBar.value.trim().toLowerCase();
    if (query) {
        filtered = filtered.filter(game => game.title.toLowerCase().includes(query));
    }

    // 2. Genre Filter
    const selectedGenre = genreFilter.value;
    if (selectedGenre !== 'all') {
        // Allow flexible matching (e.g. Action RPG vs ARPG)
        filtered = filtered.filter(game => {
            const gameGenre = game.genre.toLowerCase();
            const targetGenre = selectedGenre.toLowerCase();
            return gameGenre.includes(targetGenre) || targetGenre.includes(gameGenre);
        });
    }

    // 3. Platform Filter
    const selectedPlatform = platformFilter.value;
    if (selectedPlatform !== 'all') {
        filtered = filtered.filter(game => {
            const platform = game.platform.toLowerCase();
            if (selectedPlatform === 'pc') {
                return platform.includes('pc') || platform.includes('windows');
            } else if (selectedPlatform === 'browser') {
                return platform.includes('browser') || platform.includes('web');
            }
            return true;
        });
    }

    // 4. Sort Ordering
    const selectedSort = sortFilter.value;
    if (selectedSort === 'alphabetical') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSort === 'release-date') {
        filtered.sort((a, b) => {
            const dateA = new Date(a.release_date || '1970-01-01');
            const dateB = new Date(b.release_date || '1970-01-01');
            return dateB - dateA; // Newest first
        });
    }

    renderCatalog(filtered);
}

/**
 * Appends HTML game cards dynamically to the catalog layout container.
 * @param {Array} games 
 */
function renderCatalog(games) {
    if (!catalogContainer) return;
    
    // Clear catalog content
    catalogContainer.innerHTML = '';

    if (games.length === 0) {
        catalogContainer.innerHTML = `
            <div class="error-container">
                <h3 class="error-title"><i class="fa-solid fa-circle-exclamation"></i> Out of Bounds</h3>
                <p class="error-msg">No game assets match the specified parameters.</p>
                <button class="btn-card-action" id="btn-reset-filters">RESET FILTERS</button>
            </div>
        `;
        
        document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
            searchBar.value = '';
            genreFilter.value = 'all';
            platformFilter.value = 'all';
            sortFilter.value = 'relevance';
            filterAndSortGames();
        });
        return;
    }

    games.forEach(game => {
        const card = document.createElement('article');
        card.className = 'game-card';
        card.setAttribute('data-id', game.id);
        
        // Define Platform Icon Markup
        const platformText = game.platform.toLowerCase();
        let platformMarkup = '';
        if (platformText.includes('pc') || platformText.includes('windows')) {
            platformMarkup = '<i class="fa-solid fa-windows"></i> PC';
        } else if (platformText.includes('browser') || platformText.includes('web')) {
            platformMarkup = '<i class="fa-solid fa-globe"></i> Web';
        } else {
            platformMarkup = '<i class="fa-solid fa-gamepad"></i> Cross';
        }

        card.innerHTML = `
            <div class="game-card-img-wrap">
                <img class="game-card-img" src="${game.thumbnail}" alt="${game.title} visual asset" loading="lazy">
                <div class="game-card-badges">
                    <span class="badge badge-emerald">${game.genre}</span>
                </div>
            </div>
            <div class="game-card-content">
                <h3 class="game-card-title">${game.title}</h3>
                <p class="game-card-desc">${game.short_description}</p>
                <div class="game-card-footer">
                    <span class="game-card-meta">${platformMarkup}</span>
                    <a href="game-details.html?id=${game.id}" class="btn-card-action">EXPLORE <i class="fa-solid fa-chevron-right"></i></a>
                </div>
            </div>
        `;
        catalogContainer.appendChild(card);
    });
}

/**
 * Renders error component when API fails.
 * @param {string} message 
 */
function showError(message) {
    if (!catalogContainer) return;
    catalogContainer.innerHTML = `
        <div class="error-container">
            <h3 class="error-title"><i class="fa-solid fa-triangle-exclamation"></i> Link offline</h3>
            <p class="error-msg">Failed to interact with target database. Details: ${message}</p>
            <button class="btn-card-action" id="btn-retry-catalog">RETRY PIPELINE</button>
        </div>
    `;
    
    document.getElementById('btn-retry-catalog')?.addEventListener('click', () => {
        catalogContainer.innerHTML = `
            <div class="loader-container">
                <div class="loader"></div>
                <p class="text-muted">Re-routing pipeline link...</p>
            </div>
        `;
        initCatalog();
    });
}

// Add Event Listeners
searchBar?.addEventListener('input', filterAndSortGames);
genreFilter?.addEventListener('change', filterAndSortGames);
platformFilter?.addEventListener('change', filterAndSortGames);
sortFilter?.addEventListener('change', filterAndSortGames);

// Execute on script parse
initCatalog();
