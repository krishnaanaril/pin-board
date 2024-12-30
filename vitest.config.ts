import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: [
            './tests/setupTests.ts'
          ],
        coverage: {
            provider: 'v8' // or 'istanbul'
        },
    },
});