import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Import envCompatible module from the correct relative path
// import envCompatible from './envCompatible';

export default defineConfig({
  plugins: [react()],
});
