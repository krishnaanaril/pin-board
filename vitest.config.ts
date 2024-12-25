import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
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