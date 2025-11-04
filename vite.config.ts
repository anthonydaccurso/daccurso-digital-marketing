import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { optimize: true }],
          ['@babel/plugin-transform-runtime', { useESModules: true }]
        ],
        parserOpts: {
          plugins: ['typescript', 'jsx']
        }
      },
      jsxRuntime: 'automatic'
    }),
    imagetools({
      defaultDirectives: new URLSearchParams({
        format: 'webp',
        quality: '80',
        stripMetadata: 'true'
      })
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
        },
        inlineDynamicImports: false,
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      },
      treeshake: {
        moduleSideEffects: 'no-external',
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 3,
        unsafe_arrows: true,
        unsafe_methods: true,
        unsafe_comps: true,
        reduce_vars: true,
        reduce_funcs: true,
        pure_getters: true,
        dead_code: true,
        unused: true,
        collapse_vars: true,
        booleans: true,
        loops: true,
        conditionals: true
      },
      mangle: {
        properties: false,
        toplevel: true,
        safari10: false
      },
      format: {
        comments: false,
        ecma: 2020
      }
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1500
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
      legalComments: 'none'
    }
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