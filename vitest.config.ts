/// <reference types="vitest" />

import { resolve } from "path";
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "happy-dom",
      alias: {
        "@tests": resolve(__dirname, "tests"),
      },
    },
  })
);
