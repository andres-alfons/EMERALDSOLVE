import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // three.js (~600 kB) se carga aparte, solo cuando se muestra la gema 3D
  build: { chunkSizeWarningLimit: 700 },
});
