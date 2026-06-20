import { visit } from "unist-util-visit";

const colorMap = {
    c: "#3EBAFF",
    v: "#00ff88",
    a: "#ffd700",
    p: "#6013DE",
    r: "#de133c",
    g: "#606077",
};

export function remarkColor() {
    return (tree) => {
        visit(tree, (node) => {
            if (node.type === "textDirective" && colorMap[node.name]) {
                const color = colorMap[node.name];
                const text = node.children[0]?.value || "";

                node.type = "html";
                node.value = `<span style="color: ${color}">${text}</span>`;
            }
        });
    };
}
