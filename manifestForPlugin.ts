import { VitePWAOptions } from "vite-plugin-pwa";

export const manifestForPlugin: Partial<VitePWAOptions> = {
    registerType: "prompt",
    includeAssets: ["favicon.ico", "apple-touch-icon-180x180.png", "maskable-icon-512x512.png"],
    manifest: {
        id: "/",
        name: "Pin Board: Save your locations",
        short_name: "PinBoard",
        description: "An app that helps you to save locations and open it in your favorite map app.",
        icons: [
            {
                src: "/pwa-64x64.png",
                sizes: "64x64",
                type: "image/png",
            },
            {
                src: "/pwa-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/pwa-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/apple-touch-icon-180x180.png",
                sizes: "180x180",
                type: "image/png",
                purpose: "apple touch icon",
            },
            {
                src: "/maskable-icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
        ],
        theme_color: "#17202a",
        background_color: "#17202a",
        display: "standalone",
        scope: "https://pinboard.krishnamohan.dev",
        start_url: "https://pinboard.krishnamohan.dev",
        dir: "ltr",
        orientation: "portrait",
        lang: "en",
        display_override: [
            "window-controls-overlay",
            "standalone",
            "browser"
        ],
        shortcuts: [
            {
                "name": "Saved Places",
                "url": "/saved",
                "short_name": "Saved"
            },
            {
                "name": "Lists",
                "url": "/lists"
            },
            {
                "name": "Settings",
                "url": "/settings"
            },
            {
                "name": "About",
                "url": "/about"
            },
        ],
        categories: [
            "navigation",
            "travel",
            "utilities"
        ],
        screenshots: [
            {
                src: "/ss_1.png",
                sizes: "1125x2436",
                type: "image/png",
                platform: "Home page with map and search box"
            },
            {
                src: "/ss_2.png",
                sizes: "1125x2436",
                type: "image/png",
                platform: "Saved Places"
            },
            {
                src: "/ss_3.png",
                sizes: "1125x2436",
                type: "image/png",
                platform: "Side Menu"
            },
            {
                src: "/ss_4.png",
                sizes: "1125x2436",
                type: "image/png",
                platform: "Lists page"
            },
            {
                src: "/ss_5.png",
                sizes: "1125x2436",
                type: "image/png",
                platform: "Settings page"
            },
            {
                src: "/ss_6.png",
                sizes: "1125x2436",
                type: "image/png",
                platform: "About page"
            },
            {
                src: "/ss_7.png",
                sizes: "1125x2436",
                type: "image/png",
                platform: "Search results page with results"
            },
            {
                src: "/ss_8.png",
                sizes: "1125x2436",
                type: "image/png",
                platform: "Search results page with no results"
            }
        ],
        launch_handler: {
            client_mode: ["navigate-existing", "auto"]
        },
        handle_links: "auto",
        prefer_related_applications: false,
        edge_side_panel: {
            "preferred_width": 400
        }
    },
};