// @ts-check
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  output: "server",
  security: { checkOrigin: true },
  integrations: [react(), tailwind({ applyBaseStyles: false }), db()],
  env: {
    schema: {
      GOOGLE_CLIENT_ID: envField.string({
        context: "server",
        access: "secret",
      }),
      GOOGLE_CLIENT_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
