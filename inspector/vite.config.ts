import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@machina/zui': path.resolve(__dirname, '../src'),
    },
  },
});
