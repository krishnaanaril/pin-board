import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
	registerType: "prompt",
	includeAssets: ["favicon.ico", "apple-touch-icon-180x180.png", "maskable-icon-512x512.png"],
	manifest: {
		id: "/",
		name: "Pin Board",
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
		scope: "/",
		start_url: "/",
		orientation: "portrait",
	},
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    commonjsOptions: { transformMixedEsModules: true } // Change
  }
})
