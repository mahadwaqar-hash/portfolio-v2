import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-static-html',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/vanguard' || req.url === '/vanguard/') {
            req.url = '/vanguard/index.html';
          }
          if (req.url === '/toothcare' || req.url === '/toothcare/') {
            req.url = '/toothcare/index.html';
          }
          next();
        });
      }
    }
  ],
  base: '/',
});
