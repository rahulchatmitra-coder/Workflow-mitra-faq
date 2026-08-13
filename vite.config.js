import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: true
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
