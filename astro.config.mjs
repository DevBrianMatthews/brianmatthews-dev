// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

import remarkDirective from "remark-directive";
import { remarkColor } from "./src/lib/remark-color.mjs";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },

    markdown: {
        remarkPlugins: [remarkDirective, remarkColor],
        shikiConfig: {
            theme: "dracula",
        },
    },

    integrations: [
        mdx({
            remarkPlugins: [remarkDirective, remarkColor],
            shikiConfig: {
                theme: "dracula",
            },
        }),
        react(),
    ],
});
