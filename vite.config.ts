/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import { VitePWA } from "vite-plugin-pwa";
import { manifestForPlugin } from './manifestForPlugin.config';

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
