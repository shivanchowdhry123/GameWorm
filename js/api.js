// GameWorm API Data Gateway

const API_BASE_URL = 'https://www.freetogame.com/api';

// High-fidelity Mock Database for Offline/Fallback modes
const MOCK_GAMES = [
    {
        id: 540,
        title: "Overwatch 2",
        thumbnail: "https://www.freetogame.com/g/540/thumbnail.jpg",
        short_description: "A hero-focused team action game from Blizzard Entertainment.",
        game_url: "https://www.freetogame.com/open/overwatch-2",
        genre: "Shooter",
        platform: "PC (Windows)",
        publisher: "Blizzard Entertainment",
        developer: "Blizzard Entertainment",
        release_date: "2022-10-04"
    },
    {
        id: 517,
        title: "Lost Ark",
        thumbnail: "https://www.freetogame.com/g/517/thumbnail.jpg",
        short_description: "Smilegate RPG's MMO ARPG with combat, visual quality, and depth.",
        game_url: "https://www.freetogame.com/open/lost-ark",
        genre: "ARPG",
        platform: "PC (Windows)",
        publisher: "Amazon Games",
        developer: "Smilegate RPG",
        release_date: "2022-02-11"
    },
    {
        id: 516,
        title: "PUBG: BATTLEGROUNDS",
        thumbnail: "https://www.freetogame.com/g/516/thumbnail.jpg",
        short_description: "Get lands, loot, and outwit your opponents in a battle royale experience.",
        game_url: "https://www.freetogame.com/open/pubg",
        genre: "Shooter",
        platform: "PC (Windows)",
        publisher: "Krafton",
        developer: "Krafton",
        release_date: "2022-01-12"
    },
    {
        id: 515,
        title: "Apex Legends",
        thumbnail: "https://www.freetogame.com/g/515/thumbnail.jpg",
        short_description: "Conquer with character in Apex Legends, a free-to-play Hero shooter.",
        game_url: "https://www.freetogame.com/open/apex-legends",
        genre: "Shooter",
        platform: "PC (Windows)",
        publisher: "Electronic Arts",
        developer: "Respawn Entertainment",
        release_date: "2019-02-04"
    },
    {
        id: 521,
        title: "Guild Wars 2",
        thumbnail: "https://www.freetogame.com/g/521/thumbnail.jpg",
        short_description: "A free-to-play MMO with high-quality visual style and flexible class system.",
        game_url: "https://www.freetogame.com/open/guild-wars-2",
        genre: "MMORPG",
        platform: "PC (Windows)",
        publisher: "NCSoft",
        developer: "ArenaNet",
        release_date: "2012-08-28"
    },
    {
        id: 508,
        title: "Enlisted",
        thumbnail: "https://www.freetogame.com/g/508/thumbnail.jpg",
        short_description: "Squad-based MMO shooter reconstruction of World War II battles.",
        game_url: "https://www.freetogame.com/open/enlisted",
        genre: "Shooter",
        platform: "PC (Windows)",
        publisher: "Gaijin Distribution",
        developer: "Darkflow Software",
        release_date: "2021-04-08"
    },
    {
        id: 345,
        title: "Forge of Empires",
        thumbnail: "https://www.freetogame.com/g/345/thumbnail.jpg",
        short_description: "A strategic builder game where you command a city through history.",
        game_url: "https://www.freetogame.com/open/forge-of-empires",
        genre: "Strategy",
        platform: "Web Browser",
        publisher: "InnoGames",
        developer: "InnoGames",
        release_date: "2012-04-17"
    },
    {
        id: 475,
        title: "Genshin Impact",
        thumbnail: "https://www.freetogame.com/g/475/thumbnail.jpg",
        short_description: "Explore the vast fantasy world of Teyvat in miHoYo's hit Action RPG.",
        game_url: "https://www.freetogame.com/open/genshin-impact",
        genre: "Action RPG",
        platform: "PC (Windows)",
        publisher: "miHoYo",
        developer: "miHoYo",
        release_date: "2020-09-28"
    }
];

const MOCK_DETAILS = {
    540: {
        id: 540,
        title: "Overwatch 2",
        thumbnail: "https://www.freetogame.com/g/540/thumbnail.jpg",
        description: "Overwatch 2 is a team-based action game set in the optimistic future, where every match is the ultimate 5v5 battlefield brawl. Play as a time-traveling freedom fighter, a beat-dropping battlefield DJ, or one of over 30 other unique heroes as you battle it out around the globe.\n\nEnjoy fresh PvP combat, new game modes, maps, and specialized dynamic play. Team up with friends and dive into the action today.",
        game_url: "https://www.freetogame.com/open/overwatch-2",
        genre: "Shooter",
        platform: "PC (Windows)",
        publisher: "Blizzard Entertainment",
        developer: "Blizzard Entertainment",
        release_date: "2022-10-04",
        minimum_system_requirements: {
            os: "Windows 10 64-bit",
            processor: "Intel Core i3 or AMD Phenom II X3",
            memory: "6 GB RAM",
            graphics: "NVIDIA GeForce GTX 600 series or AMD Radeon HD 7000 series",
            storage: "50 GB available space"
        },
        screenshots: [
            { id: 1, image: "https://www.freetogame.com/g/540/overwatch-2-1.jpg" },
            { id: 2, image: "https://www.freetogame.com/g/540/overwatch-2-2.jpg" },
            { id: 3, image: "https://www.freetogame.com/g/540/overwatch-2-3.jpg" },
            { id: 4, image: "https://www.freetogame.com/g/540/overwatch-2-4.jpg" }
        ]
    },
    517: {
        id: 517,
        title: "Lost Ark",
        thumbnail: "https://www.freetogame.com/g/517/thumbnail.jpg",
        description: "Embark on an odyssey for the Lost Ark in a vast, vibrant world: explore new lands, seek out lost treasures, and test yourself in thrilling action combat. Define your fighting style with your class and advanced class, and customize your skills, weapons, and gear to bring your power to bear as you fight against hordes of enemies, colossal bosses, and dark forces seeking the power of the Ark in this action-packed free-to-play MMOARPG.",
        game_url: "https://www.freetogame.com/open/lost-ark",
        genre: "ARPG",
        platform: "PC (Windows)",
        publisher: "Amazon Games",
        developer: "Smilegate RPG",
        release_date: "2022-02-11",
        minimum_system_requirements: {
            os: "Windows 10 64-bit",
            processor: "Intel i3 or AMD Ryzen 3",
            memory: "8 GB RAM",
            graphics: "NVIDIA GeForce GTX 460 or AMD Radeon HD 6850",
            storage: "50 GB available space"
        },
        screenshots: [
            { id: 1, image: "https://www.freetogame.com/g/517/lost-ark-1.jpg" },
            { id: 2, image: "https://www.freetogame.com/g/517/lost-ark-2.jpg" },
            { id: 3, image: "https://www.freetogame.com/g/517/lost-ark-3.jpg" },
            { id: 4, image: "https://www.freetogame.com/g/517/lost-ark-4.jpg" }
        ]
    },
    516: {
        id: 516,
        title: "PUBG: BATTLEGROUNDS",
        thumbnail: "https://www.freetogame.com/g/516/thumbnail.jpg",
        description: "Land on strategic locations, loot weapons and supplies, and survive to become the last team standing across various, diverse Battlegrounds. Squad up and join the Battlegrounds for the original Battle Royale experience that only PUBG: BATTLEGROUNDS can offer. This content requires the base game on Steam in order to play.",
        game_url: "https://www.freetogame.com/open/pubg",
        genre: "Shooter",
        platform: "PC (Windows)",
        publisher: "Krafton",
        developer: "Krafton",
        release_date: "2022-01-12",
        minimum_system_requirements: {
            os: "Windows 7, Windows 8.1, Windows 10 64-bit",
            processor: "Intel Core i5-4430 / AMD FX-6300",
            memory: "8 GB RAM",
            graphics: "NVIDIA GeForce GTX 960 2GB / AMD Radeon R7 370 2GB",
            storage: "40 GB available space"
        },
        screenshots: [
            { id: 1, image: "https://www.freetogame.com/g/516/pubg-1.jpg" },
            { id: 2, image: "https://www.freetogame.com/g/516/pubg-2.jpg" },
            { id: 3, image: "https://www.freetogame.com/g/516/pubg-3.jpg" },
            { id: 4, image: "https://www.freetogame.com/g/516/pubg-4.jpg" }
        ]
    },
    515: {
        id: 515,
        title: "Apex Legends",
        thumbnail: "https://www.freetogame.com/g/515/thumbnail.jpg",
        description: "Conquer with character in Apex Legends, a free-to-play Hero shooter where legendary characters with powerful abilities team up to battle for fame & fortune on the fringes of the Frontier.\n\nMaster an ever-growing roster of diverse Legends, deep tactical squad play and bold new innovations that go beyond the Battle Royale experience—all within a rugged world where anything goes. Welcome to the next evolution of Hero Shooter.",
        game_url: "https://www.freetogame.com/open/apex-legends",
        genre: "Shooter",
        platform: "PC (Windows)",
        publisher: "Electronic Arts",
        developer: "Respawn Entertainment",
        release_date: "2019-02-04",
        minimum_system_requirements: {
            os: "Windows 7 64-bit",
            processor: "Intel Core i3-6300 3.8GHz / AMD FX-4350 4.2 GHz Quad-Core Processor",
            memory: "6 GB RAM",
            graphics: "NVIDIA GeForce GT 640 / Radeon HD 7730",
            storage: "22 GB available space"
        },
        screenshots: [
            { id: 1, image: "https://www.freetogame.com/g/515/apex-legends-1.jpg" },
            { id: 2, image: "https://www.freetogame.com/g/515/apex-legends-2.jpg" },
            { id: 3, image: "https://www.freetogame.com/g/515/apex-legends-3.jpg" },
            { id: 4, image: "https://www.freetogame.com/g/515/apex-legends-4.jpg" }
        ]
    },
    521: {
        id: 521,
        title: "Guild Wars 2",
        thumbnail: "https://www.freetogame.com/g/521/thumbnail.jpg",
        description: "Guild Wars 2 is an online role-playing game with fast-paced action combat, a rich and detailed universe of stories, breathtaking landscapes to explore, two challenging player vs. player modes—and no subscription fee required!\n\nJoin over 16 million players in the living, breathing world of Tyria, where your choices shape the narrative and your skills define your style.",
        game_url: "https://www.freetogame.com/open/guild-wars-2",
        genre: "MMORPG",
        platform: "PC (Windows)",
        publisher: "NCSoft",
        developer: "ArenaNet",
        release_date: "2012-08-28",
        minimum_system_requirements: {
            os: "Windows 7 64-bit or better",
            processor: "Intel Core 2 Duo 2.0 GHz, Core i3 or AMD Athlon 64 X2 or better",
            memory: "4 GB RAM",
            graphics: "NVIDIA GeForce 8800GTS or ATI Radeon HD 3870 or better",
            storage: "50 GB available space"
        },
        screenshots: [
            { id: 1, image: "https://www.freetogame.com/g/521/guild-wars-2-1.jpg" },
            { id: 2, image: "https://www.freetogame.com/g/521/guild-wars-2-2.jpg" },
            { id: 3, image: "https://www.freetogame.com/g/521/guild-wars-2-3.jpg" },
            { id: 4, image: "https://www.freetogame.com/g/521/guild-wars-2-4.jpg" }
        ]
    },
    508: {
        id: 508,
        title: "Enlisted",
        thumbnail: "https://www.freetogame.com/g/508/thumbnail.jpg",
        description: "Enlisted is a squad-based first-person MMO shooter covering key battles from World War II. The game carefully recreates weapons, military vehicles and the atmosphere of that era, while demonstrating really massive clashes of numerous soldiers, tanks and aircraft with artillery and naval support.\n\nPlayers command a military squad of their own or hop into a vehicle, battling through massive maps representing historically detailed campaigns.",
        game_url: "https://www.freetogame.com/open/enlisted",
        genre: "Shooter",
        platform: "PC (Windows)",
        publisher: "Gaijin Distribution",
        developer: "Darkflow Software",
        release_date: "2021-04-08",
        minimum_system_requirements: {
            os: "Windows 7 / 8 / 10 64-bit",
            processor: "Intel Core i3 or better",
            memory: "8 GB RAM",
            graphics: "NVIDIA GeForce GTX 660 / AMD Radeon series or better",
            storage: "30 GB available space"
        },
        screenshots: [
            { id: 1, image: "https://www.freetogame.com/g/508/enlisted-1.jpg" },
            { id: 2, image: "https://www.freetogame.com/g/508/enlisted-2.jpg" },
            { id: 3, image: "https://www.freetogame.com/g/508/enlisted-3.jpg" },
            { id: 4, image: "https://www.freetogame.com/g/508/enlisted-4.jpg" }
        ]
    },
    345: {
        id: 345,
        title: "Forge of Empires",
        thumbnail: "https://www.freetogame.com/g/345/thumbnail.jpg",
        description: "Forge of Empires is a browser-based strategy game that lets you create your own city and accompany it from the beginning of the Stone Age onward throughout the centuries. Build your empire, discover new technologies, expand your city, and test your tactical combat skills in single-player campaigns or PvP multiplayer battles.",
        game_url: "https://www.freetogame.com/open/forge-of-empires",
        genre: "Strategy",
        platform: "Web Browser",
        publisher: "InnoGames",
        developer: "InnoGames",
        release_date: "2012-04-17",
        minimum_system_requirements: {
            os: "Windows 7 / Mac OS X 10.6 or newer",
            processor: "Dual Core 2.0 GHz",
            memory: "2 GB RAM",
            graphics: "Any integrated card supporting WebGL",
            storage: "500 MB available space"
        },
        screenshots: [
            { id: 1, image: "https://www.freetogame.com/g/345/forge-of-empires-1.jpg" },
            { id: 2, image: "https://www.freetogame.com/g/345/forge-of-empires-2.jpg" },
            { id: 3, image: "https://www.freetogame.com/g/345/forge-of-empires-3.jpg" },
            { id: 4, image: "https://www.freetogame.com/g/345/forge-of-empires-4.jpg" }
        ]
    },
    475: {
        id: 475,
        title: "Genshin Impact",
        thumbnail: "https://www.freetogame.com/g/475/thumbnail.jpg",
        description: "Genshin Impact is an open-world action RPG. In the game, you explore a fantasy world called Teyvat. In this vast world, you can explore seven nations, meet a diverse cast of characters with unique personalities and abilities, and fight powerful enemies together, all on your quest to find your lost sibling. You can also wander freely, immersing yourself in a world filled with life, letting your curiosity lead you to discover all its mysteries.",
        game_url: "https://www.freetogame.com/open/genshin-impact",
        genre: "Action RPG",
        platform: "PC (Windows)",
        publisher: "miHoYo",
        developer: "miHoYo",
        release_date: "2020-09-28",
        minimum_system_requirements: {
            os: "Windows 7 SP1 64-bit, Windows 8.1 64-bit or Windows 10 64-bit",
            processor: "Intel Core i5 or equivalent",
            memory: "8 GB RAM",
            graphics: "NVIDIA GeForce GT 1030 or better",
            storage: "30 GB available space"
        },
        screenshots: [
            { id: 1, image: "https://www.freetogame.com/g/475/genshin-impact-1.jpg" },
            { id: 2, image: "https://www.freetogame.com/g/475/genshin-impact-2.jpg" },
            { id: 3, image: "https://www.freetogame.com/g/475/genshin-impact-3.jpg" },
            { id: 4, image: "https://www.freetogame.com/g/475/genshin-impact-4.jpg" }
        ]
    }
};

/**
 * Executes a network fetch with CORS proxy fallback logic.
 * @param {string} endpointUrl - Direct URL of API endpoint
 * @returns {Promise<any>}
 */
async function fetchWithBypass(endpointUrl) {
    // 1. Try Direct Fetch
    try {
        console.log(`[API] Attempting direct fetch: ${endpointUrl}`);
        const res = await fetch(endpointUrl);
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Direct fetch failed with status: ${res.status}`);
    } catch (directError) {
        console.warn(`[API] Direct fetch blocked/failed. Transitioning to CORS proxy.`, directError);
        
        // 2. Try CORS Proxy
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(endpointUrl)}`;
        try {
            console.log(`[API] Attempting proxy fetch: ${proxyUrl}`);
            const res = await fetch(proxyUrl);
            if (res.ok) {
                return await res.json();
            }
            throw new Error(`Proxy fetch failed with status: ${res.status}`);
        } catch (proxyError) {
            console.error(`[API] CORS proxy fetch failed.`, proxyError);
            throw proxyError;
        }
    }
}

/**
 * Fetches the entire games list.
 * Falls back to high-fidelity mock list if network fails completely.
 * @returns {Promise<Array>}
 */
export async function getGamesList() {
    const targetUrl = `${API_BASE_URL}/games`;
    try {
        const data = await fetchWithBypass(targetUrl);
        if (Array.isArray(data) && data.length > 0) {
            return data;
        }
        throw new Error('API returned empty or invalid data format.');
    } catch (err) {
        console.warn('[API] Using local offline Mock Database for catalog.', err);
        return MOCK_GAMES;
    }
}

/**
 * Fetches detail metadata for a specific game.
 * Falls back to mock details by game ID if network fails completely.
 * @param {number|string} gameId
 * @returns {Promise<Object>}
 */
export async function getGameDetails(gameId) {
    const numericId = parseInt(gameId, 10);
    const targetUrl = `${API_BASE_URL}/game?id=${numericId}`;
    try {
        const data = await fetchWithBypass(targetUrl);
        if (data && data.title) {
            return data;
        }
        throw new Error(`API returned invalid game detail payload for ID: ${gameId}`);
    } catch (err) {
        console.warn(`[API] Using local offline Mock details for game ID: ${gameId}`, err);
        
        // Check if we have matching mock details
        if (MOCK_DETAILS[numericId]) {
            return MOCK_DETAILS[numericId];
        }
        
        // As a final safety net, search in MOCK_GAMES list and build a minimal details object
        const baseGame = MOCK_GAMES.find(g => g.id === numericId);
        if (baseGame) {
            return {
                ...baseGame,
                description: `${baseGame.title} is an incredible F2P game in the ${baseGame.genre} genre. Developed by ${baseGame.developer} and published by ${baseGame.publisher}. It was released on ${baseGame.release_date} for ${baseGame.platform}. Experience this digital obsession now.`,
                minimum_system_requirements: {
                    os: "Windows 10 64-bit",
                    processor: "Intel Dual-Core / AMD Athlon 64",
                    memory: "4 GB RAM",
                    graphics: "GeForce GTX 460 or equivalent",
                    storage: "30 GB available space"
                },
                screenshots: [
                    { id: 1, image: baseGame.thumbnail }
                ]
            };
        }
        
        throw new Error(`Game with ID ${gameId} not found in live API or local fallback database.`);
    }
}
