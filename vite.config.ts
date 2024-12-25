import { resolve } from "path";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";
import * as packageJson from "./package.json";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      include: ["src/"],
    }),
    react(),
    tsConfigPaths(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "ReactRouterPrompt",
      fileName: "react-router-prompt",
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies), 'react/jsx-runtime'],
      output: {
        globals: {
          'react': 'react',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'reactRouterDom',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      }
    },
  }
});
