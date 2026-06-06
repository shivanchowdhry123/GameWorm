import { getGameDetails } from './api.js';

// DOM Elements
const loader = document.getElementById('details-loader');
const contentContainer = document.getElementById('details-content-container');
const errorContainer = document.getElementById('details-error-container');
const errorMessageText = document.getElementById('error-message-text');

// Content DOM Selectors
const gameTitle = document.getElementById('game-title');
const heroImg = document.getElementById('hero-img');
const screenshotsContainer = document.getElementById('screenshots-container');
const gameDescription = document.getElementById('game-description');
const requirementsGridContainer = document.getElementById('requirements-grid-container');
const requirementsBlock = document.getElementById('requirements-block');

// Specs Matrix Selectors
const specGenre = document.getElementById('spec-genre');
const specPlatform = document.getElementById('spec-platform');
const specDeveloper = document.getElementById('spec-developer');
const specPublisher = document.getElementById('spec-publisher');
const specRelease = document.getElementById('spec-release');
const buyBtn = document.getElementById('btn-buy-now');

/**
 * Parses the URL parameters and triggers metadata loading.
 */
async function loadDetails() {
    const params = new URLSearchParams(window.location.search);
    let gameId = params.get('id');

    // Default to game ID 540 (Overwatch 2) if no parameters are provided
    if (!gameId) {
        console.warn('[Details] No game ID parameter found in query (?id=). Defaulting to 540.');
        gameId = 540;
    }

    try {
        const payload = await getGameDetails(gameId);
        populateUI(payload);
    } catch (err) {
        showDetailsError(err.message);
    }
}

/**
 * Fills details UI elements with the game payload.
 * @param {Object} game 
 */
function populateUI(game) {
    if (!game) return;

    // 1. Core Titles and Description
    gameTitle.textContent = game.title;
    document.title = `GameWorm | ${game.title}`;
    
    heroImg.src = game.thumbnail;
    heroImg.alt = `${game.title} visual display`;

    gameDescription.textContent = game.description || game.short_description;

    // 2. Specifications Matrix
    specGenre.textContent = game.genre || 'N/A';
    specPlatform.textContent = game.platform || 'N/A';
    specDeveloper.textContent = game.developer || 'N/A';
    specPublisher.textContent = game.publisher || 'N/A';
    specRelease.textContent = game.release_date || 'N/A';

    // 3. Dominant Transaction Hook CTA mapping
    if (buyBtn) {
        buyBtn.href = game.game_url || 'https://www.freetogame.com';
        buyBtn.target = '_blank';
    }

    // 4. Screenshots Gallery rendering
    if (screenshotsContainer) {
        screenshotsContainer.innerHTML = '';
        
        // Include thumbnail as the first screenshot option
        const mainThumbObj = { id: 0, image: game.thumbnail };
        const allImages = game.screenshots && game.screenshots.length > 0 
            ? [mainThumbObj, ...game.screenshots] 
            : [mainThumbObj];

        allImages.forEach((screenshot, index) => {
            const thumb = document.createElement('div');
            thumb.className = `carousel-thumb ${index === 0 ? 'active' : ''}`;
            thumb.innerHTML = `<img src="${screenshot.image}" alt="${game.title} slide asset ${index + 1}" loading="lazy">`;
            
            // Thumbnail click listener to change main hero image
            thumb.addEventListener('click', () => {
                // Remove active styling from siblings
                document.querySelectorAll('.carousel-thumb').forEach(el => el.classList.remove('active'));
                
                // Add active to current
                thumb.classList.add('active');
                
                // Transition hero image source
                heroImg.src = screenshot.image;
            });

            screenshotsContainer.appendChild(thumb);
        });
    }

    // 5. System Requirements parsing
    if (requirementsGridContainer) {
        requirementsGridContainer.innerHTML = '';
        
        const reqs = game.minimum_system_requirements;
        
        // Show metrics block or hide it if platform is browser and requirements are empty
        const isBrowserGame = game.platform && game.platform.toLowerCase().includes('browser');
        
        if (!reqs || Object.keys(reqs).length === 0 || (isBrowserGame && !reqs.os)) {
            if (isBrowserGame) {
                requirementsGridContainer.innerHTML = `
                    <div style="grid-column: 1 / -1; color: var(--text-secondary);">
                        <i class="fa-solid fa-cloud" style="color: var(--emerald-primary); margin-right: 0.5rem;"></i>
                        No download required. This is a Web Browser game playable directly on any device with an active internet connection.
                    </div>
                `;
            } else {
                requirementsBlock.style.display = 'none'; // Hide if not applicable
            }
        } else {
            // Display minimum specs from payload
            const requirementsMap = [
                { label: 'Operating System', val: reqs.os || 'Windows 10 64-Bit' },
                { label: 'Processor (CPU)', val: reqs.processor || 'Intel Core i3 / AMD Ryzen 3' },
                { label: 'Memory (RAM)', val: reqs.memory || '8 GB RAM' },
                { label: 'Graphics Card (GPU)', val: reqs.graphics || 'NVIDIA GeForce GTX 660 / AMD Radeon HD 7850' },
                { label: 'Storage Space', val: reqs.storage || '30 GB available space' },
                { label: 'Network/Other', val: 'Broadband Internet connection' }
            ];

            requirementsMap.forEach(spec => {
                const item = document.createElement('div');
                item.className = 'req-item';
                item.innerHTML = `
                    <span class="req-label">${spec.label}</span>
                    <span class="req-val">${spec.val}</span>
                `;
                requirementsGridContainer.appendChild(item);
            });
        }
    }

    // Show Content, Hide Loader
    if (loader) loader.style.display = 'none';
    if (contentContainer) contentContainer.style.display = 'block';
}

/**
 * Handles errors and shows correct warning overlays.
 * @param {string} errorText 
 */
function showDetailsError(errorText) {
    if (loader) loader.style.display = 'none';
    if (contentContainer) contentContainer.style.display = 'none';
    if (errorContainer) {
        errorContainer.style.display = 'block';
        if (errorMessageText) errorMessageText.textContent = errorText;
    }
}

// Initialize on load
loadDetails();
