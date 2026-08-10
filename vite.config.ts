import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React and core libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Separate Framer Motion (large library)
          'vendor-framer': ['framer-motion'],
          // UI libraries chunk
          'vendor-ui': ['lucide-react', 'next-themes'],
          // Heavy dependencies
          'vendor-driver': ['driver.js'],
          'vendor-search': ['fuse.js'],
          // Large data file
          'credentials-data': ['./src/data/credentials-data.ts'],
        },
      },
    },
    // Increase chunk size warning limit (we're code splitting now)
    chunkSizeWarningLimit: 600,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // Run multiple passes for better compression
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: true,
    // Optimize sourcemaps for production
    sourcemap: false,
    // Optimize assets
    assetsInlineLimit: 4096, // Inline assets < 4kb as base64
  },
  server: {
    host: true,
    port: 3000,
    allowedHosts: ["192.168.1.46", "localhost"],
  },
  preview: {
    port: 3001,
  },
});
