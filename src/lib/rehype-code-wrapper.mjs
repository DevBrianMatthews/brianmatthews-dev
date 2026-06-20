import { visit } from "unist-util-visit";

export function rehypeCodeWrapper() {
    return (tree) => {
        visit(tree, "element", (node, index, parent) => {
            if (node.tagName !== "pre") return;

            const classAttr =
                node.properties?.class || node.properties?.className;

            const classString = Array.isArray(classAttr)
                ? classAttr.join(" ")
                : classAttr;

            if (!classString || !classString.includes("astro-code")) return;

            const language = node.properties["dataLanguage"] || "text";

            const wrapper = {
                type: "element",
                tagName: "div",
                properties: { className: ["code-wrapper"] },
                children: [
                    {
                        type: "element",
                        tagName: "span",
                        properties: { className: ["code-language-label"] },
                        children: [{ type: "text", value: language }],
                    },
                    node,
                ],
            };

            parent.children[index] = wrapper;
        });
    };
}
