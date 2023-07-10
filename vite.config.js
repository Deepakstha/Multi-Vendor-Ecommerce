import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

const dotPathFixPlugin = () => ({
  name: 'dot-path-fix-plugin',
  configureServer: (server) => {
    server.middlewares.use((req,_,next) => {
      const reqPath = req.url.split('?', 2)[0];
      if(!req.url.startsWith('/@') && !fs.existsSync(`.${reqPath}`)) {
          req.url = '/';
      }
      next();
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    dotPathFixPlugin()],
})
