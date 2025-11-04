import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic'
    }),
    compression({
      algorithm: 'brotli',
      ext: '.br'
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  build: {
    outDir: 'dist',
    target: 'esnext',
    cssCodeSplit: true,
    sourcemap: false,
    modulePreload: {
      polyfill: false
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('@supabase')) return 'vendor-supabase';
          }
          if (id.includes('/components/sections/')) {
            const match = id.match(/\/components\/sections\/(\w+)\.tsx/);
            if (match) return `section-${match[1].toLowerCase()}`;
          }
          if (id.includes('/pages/blog/')) {
            const match = id.match(/\/pages\/blog\/(\w+)\.tsx/);
            if (match) return `blog-${match[1].toLowerCase()}`;
          }
          if (id.includes('react-markdown')) return 'vendor-markdown';
        },
        inlineDynamicImports: false,
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        compact: true
      },
      treeshake: {
        moduleSideEffects: 'no-external',
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      }
    },
    minify: 'esbuild',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1500,
    assetsInlineLimit: 4096,
    cssMinify: 'esbuild'
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime'
    ],
    exclude: ['@supabase/supabase-js'],
    esbuildOptions: {
      target: 'esnext',
      treeShaking: true,
      minify: true,
      legalComments: 'none',
      define: {
        'process.env.NODE_ENV': '"production"'
      },
      drop: ['console', 'debugger'],
      pure: ['console.log', 'console.debug']
    }
  },
  esbuild: {
    drop: ['console', 'debugger'],
    pure: ['console.log', 'console.debug'],
    legalComments: 'none',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  },
  server: {
    fs: {
      strict: true
    }
  },
  preview: {
    port: 5173,
    strictPort: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    }
  }
});