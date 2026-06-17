import { visit } from "unist-util-visit";

export function rehypeImageWidth() {
    return (tree) => {
        visit(tree, "element", (node) => {
            if (node.tagName !== "img") return;

            const width = node.properties.title;

            if (width && /^\d+$/.test(width)) {
                node.properties.style = `width: ${width}px; max-width: 100%;`;
                delete node.properties.title;
            } else {
                node.properties.style = `width: 100%;`;
            }

            node.properties.className = ["blog-image"];
        });
    };
}
