import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    // This is the proxy configuration
    proxy: {
      // Any request starting with /api will be proxied
      '/api': {
        target: 'http://localhost:8080', // The address of your Spring Boot backend
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false,      // Can be set to false if your backend is not running on HTTPS
      },
    },
  },
});