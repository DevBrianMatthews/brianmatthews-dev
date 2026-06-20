// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

import remarkDirective from "remark-directive";
import { remarkColor } from "./src/lib/remark-color.mjs";
import { rehypeImageWidth } from "./src/lib/rehype-image-width.mjs";
import { rehypeCodeWrapper } from "./src/lib/rehype-code-wrapper.mjs";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },

    markdown: {
        remarkPlugins: [remarkDirective, remarkColor],
        rehypePlugins: [rehypeImageWidth, rehypeCodeWrapper],
        shikiConfig: {
            theme: "dracula",
        },
    },

    integrations: [
        mdx({
            remarkPlugins: [remarkDirective, remarkColor],
            rehypePlugins: [rehypeImageWidth, rehypeCodeWrapper],
            shikiConfig: {
                theme: "dracula",
            },
        }),
        react(),
    ],
});
