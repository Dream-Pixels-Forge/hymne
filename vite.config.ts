import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env['GEMINI_API_KEY']),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    // Tauri specific configurations
    clearScreen: false,
    server: {
      strictPort: true,
      hmr: env['DISABLE_HMR'] !== 'true',
    },
    envPrefix: ['VITE_', 'TAURI_'],
    build: {
      // Tauri expects the frontend to be built to a specific location
      target: process.env['TAURI_PLATFORM'] === 'windows' ? 'chrome105' : 'safari13',
      minify: !process.env['VITE_DEBUG_BUILD'] ? 'esbuild' : false,
      sourcemap: process.env['VITE_DEBUG_BUILD'] === 'true',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            motion: ['motion/react'],
            icons: ['lucide-react'],
          },
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'src/test/',
          'src-tauri/',
          '**/*.d.ts',
          '**/*.config.*',
          '**/mocks/**',
        ],
      },
    },
  };
});
