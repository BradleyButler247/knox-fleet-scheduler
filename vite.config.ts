import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    ssr: {
      // Enable static prerendering to generate index.html
      prerender: true,
    },
  },
  vite: {
    plugins: [
      nitro({
        preset: "netlify",
      }),
    ],
  },
});