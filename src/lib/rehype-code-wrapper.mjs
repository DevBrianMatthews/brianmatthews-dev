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
                    {
                        type: "element",
                        tagName: "button",
                        properties: {
                            className: ["copy-code-btn"],
                            type: "button",
                        },
                        children: [
                            {
                                type: "element",
                                tagName: "svg",
                                properties: {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "14",
                                    height: "14",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    className: ["icon-copy"],
                                },
                                children: [
                                    {
                                        type: "element",
                                        tagName: "rect",
                                        properties: {
                                            x: "9",
                                            y: "9",
                                            width: "13",
                                            height: "13",
                                            rx: "2",
                                        },
                                        children: [],
                                    },
                                    {
                                        type: "element",
                                        tagName: "path",
                                        properties: {
                                            d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1",
                                        },
                                        children: [],
                                    },
                                ],
                            },
                            {
                                type: "element",
                                tagName: "svg",
                                properties: {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "14",
                                    height: "14",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    className: ["icon-check"],
                                },
                                children: [
                                    {
                                        type: "element",
                                        tagName: "path",
                                        properties: { d: "M20 6 9 17l-5-5" },
                                        children: [],
                                    },
                                ],
                            },
                        ],
                    },
                    node,
                ],
            };

            parent.children[index] = wrapper;
        });
    };
}
