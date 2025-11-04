// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { imagetools } from "file:///home/project/node_modules/vite-imagetools/dist/index.js";
import compression from "file:///home/project/node_modules/vite-plugin-compression/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["@babel/plugin-transform-react-jsx", { optimize: true }],
          ["@babel/plugin-transform-runtime", { useESModules: true }]
        ],
        parserOpts: {
          plugins: ["typescript", "jsx"]
        }
      },
      jsxRuntime: "automatic"
    }),
    imagetools({
      defaultDirectives: new URLSearchParams({
        format: "webp",
        quality: "80",
        stripMetadata: "true"
      })
    }),
    compression({
      algorithm: "brotli",
      ext: ".br"
    }),
    compression({
      algorithm: "gzip",
      ext: ".gz"
    })
  ],
  build: {
    outDir: "dist",
    target: "esnext",
    cssCodeSplit: true,
    sourcemap: false,
    modulePreload: {
      polyfill: false
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "vendor-motion";
            if (id.includes("react") || id.includes("react-dom")) return "vendor-react";
            if (id.includes("lucide-react")) return "vendor-icons";
            if (id.includes("@supabase")) return "vendor-supabase";
          }
          if (id.includes("/components/sections/")) {
            const match = id.match(/\/components\/sections\/(\w+)\.tsx/);
            if (match) return `section-${match[1].toLowerCase()}`;
          }
        },
        inlineDynamicImports: false,
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]"
      },
      treeshake: {
        moduleSideEffects: "no-external",
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      }
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug", "console.warn"],
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
      "react",
      "react-dom",
      "react/jsx-runtime"
    ],
    exclude: ["@supabase/supabase-js"],
    esbuildOptions: {
      target: "esnext",
      treeShaking: true,
      minify: true,
      legalComments: "none"
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
      "Cache-Control": "public, max-age=31536000",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBpbWFnZXRvb2xzIH0gZnJvbSAndml0ZS1pbWFnZXRvb2xzJztcbmltcG9ydCBjb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCh7XG4gICAgICBiYWJlbDoge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgWydAYmFiZWwvcGx1Z2luLXRyYW5zZm9ybS1yZWFjdC1qc3gnLCB7IG9wdGltaXplOiB0cnVlIH1dLFxuICAgICAgICAgIFsnQGJhYmVsL3BsdWdpbi10cmFuc2Zvcm0tcnVudGltZScsIHsgdXNlRVNNb2R1bGVzOiB0cnVlIH1dXG4gICAgICAgIF0sXG4gICAgICAgIHBhcnNlck9wdHM6IHtcbiAgICAgICAgICBwbHVnaW5zOiBbJ3R5cGVzY3JpcHQnLCAnanN4J11cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGpzeFJ1bnRpbWU6ICdhdXRvbWF0aWMnXG4gICAgfSksXG4gICAgaW1hZ2V0b29scyh7XG4gICAgICBkZWZhdWx0RGlyZWN0aXZlczogbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgICAgIGZvcm1hdDogJ3dlYnAnLFxuICAgICAgICBxdWFsaXR5OiAnODAnLFxuICAgICAgICBzdHJpcE1ldGFkYXRhOiAndHJ1ZSdcbiAgICAgIH0pXG4gICAgfSksXG4gICAgY29tcHJlc3Npb24oe1xuICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpJyxcbiAgICAgIGV4dDogJy5icidcbiAgICB9KSxcbiAgICBjb21wcmVzc2lvbih7XG4gICAgICBhbGdvcml0aG06ICdnemlwJyxcbiAgICAgIGV4dDogJy5neidcbiAgICB9KVxuICBdLFxuICBidWlsZDoge1xuICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxuICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgbW9kdWxlUHJlbG9hZDoge1xuICAgICAgcG9seWZpbGw6IGZhbHNlXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdmcmFtZXItbW90aW9uJykpIHJldHVybiAndmVuZG9yLW1vdGlvbic7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3JlYWN0JykgfHwgaWQuaW5jbHVkZXMoJ3JlYWN0LWRvbScpKSByZXR1cm4gJ3ZlbmRvci1yZWFjdCc7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ2x1Y2lkZS1yZWFjdCcpKSByZXR1cm4gJ3ZlbmRvci1pY29ucyc7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ0BzdXBhYmFzZScpKSByZXR1cm4gJ3ZlbmRvci1zdXBhYmFzZSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnL2NvbXBvbmVudHMvc2VjdGlvbnMvJykpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gaWQubWF0Y2goL1xcL2NvbXBvbmVudHNcXC9zZWN0aW9uc1xcLyhcXHcrKVxcLnRzeC8pO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSByZXR1cm4gYHNlY3Rpb24tJHttYXRjaFsxXS50b0xvd2VyQ2FzZSgpfWA7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbmxpbmVEeW5hbWljSW1wb3J0czogZmFsc2UsXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdJ1xuICAgICAgfSxcbiAgICAgIHRyZWVzaGFrZToge1xuICAgICAgICBtb2R1bGVTaWRlRWZmZWN0czogJ25vLWV4dGVybmFsJyxcbiAgICAgICAgcHJvcGVydHlSZWFkU2lkZUVmZmVjdHM6IGZhbHNlLFxuICAgICAgICB1bmtub3duR2xvYmFsU2lkZUVmZmVjdHM6IGZhbHNlXG4gICAgICB9XG4gICAgfSxcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxuICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcbiAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcbiAgICAgICAgcHVyZV9mdW5jczogWydjb25zb2xlLmxvZycsICdjb25zb2xlLmluZm8nLCAnY29uc29sZS5kZWJ1ZycsICdjb25zb2xlLndhcm4nXSxcbiAgICAgICAgcGFzc2VzOiAzLFxuICAgICAgICB1bnNhZmVfYXJyb3dzOiB0cnVlLFxuICAgICAgICB1bnNhZmVfbWV0aG9kczogdHJ1ZSxcbiAgICAgICAgdW5zYWZlX2NvbXBzOiB0cnVlLFxuICAgICAgICByZWR1Y2VfdmFyczogdHJ1ZSxcbiAgICAgICAgcmVkdWNlX2Z1bmNzOiB0cnVlLFxuICAgICAgICBwdXJlX2dldHRlcnM6IHRydWUsXG4gICAgICAgIGRlYWRfY29kZTogdHJ1ZSxcbiAgICAgICAgdW51c2VkOiB0cnVlLFxuICAgICAgICBjb2xsYXBzZV92YXJzOiB0cnVlLFxuICAgICAgICBib29sZWFuczogdHJ1ZSxcbiAgICAgICAgbG9vcHM6IHRydWUsXG4gICAgICAgIGNvbmRpdGlvbmFsczogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG1hbmdsZToge1xuICAgICAgICBwcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgICAgdG9wbGV2ZWw6IHRydWUsXG4gICAgICAgIHNhZmFyaTEwOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIGZvcm1hdDoge1xuICAgICAgICBjb21tZW50czogZmFsc2UsXG4gICAgICAgIGVjbWE6IDIwMjBcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDE1MDBcbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogW1xuICAgICAgJ3JlYWN0JyxcbiAgICAgICdyZWFjdC1kb20nLFxuICAgICAgJ3JlYWN0L2pzeC1ydW50aW1lJ1xuICAgIF0sXG4gICAgZXhjbHVkZTogWydAc3VwYWJhc2Uvc3VwYWJhc2UtanMnXSxcbiAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgICAgIHRyZWVTaGFraW5nOiB0cnVlLFxuICAgICAgbWluaWZ5OiB0cnVlLFxuICAgICAgbGVnYWxDb21tZW50czogJ25vbmUnXG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBmczoge1xuICAgICAgc3RyaWN0OiB0cnVlXG4gICAgfVxuICB9LFxuICBwcmV2aWV3OiB7XG4gICAgcG9ydDogNTE3MyxcbiAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDYWNoZS1Db250cm9sJzogJ3B1YmxpYywgbWF4LWFnZT0zMTUzNjAwMCcsXG4gICAgICAnWC1Db250ZW50LVR5cGUtT3B0aW9ucyc6ICdub3NuaWZmJyxcbiAgICAgICdYLUZyYW1lLU9wdGlvbnMnOiAnREVOWSdcbiAgICB9XG4gIH1cbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8saUJBQWlCO0FBRXhCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxNQUNKLE9BQU87QUFBQSxRQUNMLFNBQVM7QUFBQSxVQUNQLENBQUMscUNBQXFDLEVBQUUsVUFBVSxLQUFLLENBQUM7QUFBQSxVQUN4RCxDQUFDLG1DQUFtQyxFQUFFLGNBQWMsS0FBSyxDQUFDO0FBQUEsUUFDNUQ7QUFBQSxRQUNBLFlBQVk7QUFBQSxVQUNWLFNBQVMsQ0FBQyxjQUFjLEtBQUs7QUFBQSxRQUMvQjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFlBQVk7QUFBQSxJQUNkLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULG1CQUFtQixJQUFJLGdCQUFnQjtBQUFBLFFBQ3JDLFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxRQUNULGVBQWU7QUFBQSxNQUNqQixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsSUFDRCxZQUFZO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsSUFDRCxZQUFZO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLElBQ2QsV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGFBQWEsSUFBSTtBQUNmLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixnQkFBSSxHQUFHLFNBQVMsZUFBZSxFQUFHLFFBQU87QUFDekMsZ0JBQUksR0FBRyxTQUFTLE9BQU8sS0FBSyxHQUFHLFNBQVMsV0FBVyxFQUFHLFFBQU87QUFDN0QsZ0JBQUksR0FBRyxTQUFTLGNBQWMsRUFBRyxRQUFPO0FBQ3hDLGdCQUFJLEdBQUcsU0FBUyxXQUFXLEVBQUcsUUFBTztBQUFBLFVBQ3ZDO0FBQ0EsY0FBSSxHQUFHLFNBQVMsdUJBQXVCLEdBQUc7QUFDeEMsa0JBQU0sUUFBUSxHQUFHLE1BQU0sb0NBQW9DO0FBQzNELGdCQUFJLE1BQU8sUUFBTyxXQUFXLE1BQU0sQ0FBQyxFQUFFLFlBQVksQ0FBQztBQUFBLFVBQ3JEO0FBQUEsUUFDRjtBQUFBLFFBQ0Esc0JBQXNCO0FBQUEsUUFDdEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxNQUNBLFdBQVc7QUFBQSxRQUNULG1CQUFtQjtBQUFBLFFBQ25CLHlCQUF5QjtBQUFBLFFBQ3pCLDBCQUEwQjtBQUFBLE1BQzVCO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsZUFBZTtBQUFBLFFBQ2YsWUFBWSxDQUFDLGVBQWUsZ0JBQWdCLGlCQUFpQixjQUFjO0FBQUEsUUFDM0UsUUFBUTtBQUFBLFFBQ1IsZUFBZTtBQUFBLFFBQ2YsZ0JBQWdCO0FBQUEsUUFDaEIsY0FBYztBQUFBLFFBQ2QsYUFBYTtBQUFBLFFBQ2IsY0FBYztBQUFBLFFBQ2QsY0FBYztBQUFBLFFBQ2QsV0FBVztBQUFBLFFBQ1gsUUFBUTtBQUFBLFFBQ1IsZUFBZTtBQUFBLFFBQ2YsVUFBVTtBQUFBLFFBQ1YsT0FBTztBQUFBLFFBQ1AsY0FBYztBQUFBLE1BQ2hCO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixVQUFVO0FBQUEsUUFDVixVQUFVO0FBQUEsTUFDWjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsSUFDQSxzQkFBc0I7QUFBQSxJQUN0Qix1QkFBdUI7QUFBQSxFQUN6QjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVMsQ0FBQyx1QkFBdUI7QUFBQSxJQUNqQyxnQkFBZ0I7QUFBQSxNQUNkLFFBQVE7QUFBQSxNQUNSLGFBQWE7QUFBQSxNQUNiLFFBQVE7QUFBQSxNQUNSLGVBQWU7QUFBQSxJQUNqQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLElBQUk7QUFBQSxNQUNGLFFBQVE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osU0FBUztBQUFBLE1BQ1AsaUJBQWlCO0FBQUEsTUFDakIsMEJBQTBCO0FBQUEsTUFDMUIsbUJBQW1CO0FBQUEsSUFDckI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
