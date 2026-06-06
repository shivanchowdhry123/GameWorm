GameWorm Storefront

A high-performance, client-side digital video game discovery engine and storefront catalog. Re-engineered from a legacy library structure, GameWorm delivers a premium, zero-friction path to exploring and accessing the world's most immersive free-to-play universes.

🛠 Directory Topology

GameWorm/
├── README.md               # System documentation & deployment architecture
├── index.html              # Main store landing gateway & dynamic catalog grid
├── game-details.html       # Steam-style product specification viewport
├── about.html              # Organizational mission & platform statistics
├── perks.html              # Reward allocations, beta access, & sync mechanics
├── contact.html            # Static coordinates panel & support channels
├── css/
│   └── style.css           # Neo-brutalist / tech-wear layout engine
└── js/
    ├── api.js              # Network gateway with CORS-bypass & mock fail-safes
    ├── catalog.js          # Search, category filtering, & landing grid DOM injector
    └── details.js          # URL query parser & Steam-style single game renderer


🎨 Visual Identity & Design System

The visual architecture is built on a high-impact neo-brutalist / tech-wear aesthetic optimized for media-heavy, interactive catalog grids.

Core Charcoal foundations: Primary background surfaces utilize rich slate tones (#0a0d10, #11151a) to keep visual depth focused on vibrant game banners.

Vibrant Emerald Accents: Dynamic highlights and primary action targets utilize #10b981 (with matching radial glows) to drive interface conversion rates.

Structured Borders: Mechanical, sharp 1px black borders (#000000) frame inputs, panels, and individual cards to convey utility and precision.

Typography Hierarchy: Headings utilize Space Grotesk for clean geometric weight, paired with Plus Jakarta Sans for body readability down to mobile viewports.

📡 Dynamic Data Pipeline & Fallback Architecture

To combat typical client-side environment barriers, the network layer in js/api.js is built with a resilient three-tier request lifecycle:

[Client Fetch Request]
         │
         ├──► 1. Direct API Query ([https://www.freetogame.com/api](https://www.freetogame.com/api))
         │       (Fails if CORS headers are blocked or server is unresponsive)
         │
         └──► 2. CORS Proxy Bypass Triage ([https://corsproxy.io/](https://corsproxy.io/)?)
                 (Bypasses cross-origin restrictions on client-side requests)
                 │
                 └──► 3. Local Mock Database Integration
                         (Offline fail-safe: serves offline records instantly)


Direct Integration: Attempts a standard asynchronous fetch request directly to the public database endpoints.

CORS Triage: If blocked by cross-origin resource sharing restrictions, the script intercepts the rejection and routes the pipeline through an operational HTTPS proxy.

Local Mock Database: If the client is entirely offline or both network queries fail, the site transitions to a localized high-fidelity fallback database (preloaded with details for games like Overwatch 2, Lost Ark, and Apex Legends). This prevents layout collapse and console error crashes.

🚀 Local Installation & Execution

Since the application utilizes ES6 modules (type="module"), launching the system by clicking index.html directly from a desktop file manager will trigger browser CORS restrictions. You must run the project through a local development server.

Option 1: VS Code Live Server (Recommended)

Open the GameWorm folder in Visual Studio Code.

Install the Live Server extension by Ritwick Dey.

Click the Go Live button in the status bar at the bottom right of the screen.

Option 2: NodeJS http-server (Command Line)

If you have NodeJS installed on your local machine, execute the following commands in your terminal:

# Navigate to your workspace directory
cd path/to/GameWorm

# Run a static server instance
npx http-server . -p 8080


Open your browser and navigate to http://localhost:8080.

📝 Legal & Affiliate Disclaimer

GameWorm operates strictly as a metadata discovery hub. All primary transaction actions ("Buy Now" CTAs) direct users to official, verified distribution hubs (Steam, Epic Games Store, Xbox, and Google Play Store). Digital rights, licensing, and payment pipelines are managed entirely by their respective platform operators.