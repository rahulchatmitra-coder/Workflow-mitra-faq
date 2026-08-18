import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lobehub/ui/storybook': path.resolve(__dirname, 'src/utils/lobehubUiStub/storybook.jsx'),
      '@lobehub/ui/icons': path.resolve(__dirname, 'src/utils/lobehubUiStub/icons.jsx'),
      '@lobehub/ui': path.resolve(__dirname, 'src/utils/lobehubUiStub/index.jsx')
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-icons': ['lucide-react', 'react-icons'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    globals: true,
    // Only this checkout's own tests. Without this, any git worktree under
    // .claude/worktrees/ gets globbed too, so every test runs twice — once
    // against a stale copy that resolves setupFiles to the wrong root.
    include: ['src/**/*.{test,spec}.{js,jsx}', 'scripts/**/*.{test,spec}.mjs'],
    exclude: ['**/node_modules/**', '**/dist/**', '.claude/**'],
  }
})
