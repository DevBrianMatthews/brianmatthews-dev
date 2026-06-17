import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function getTodayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

function processFile(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");

    const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!frontmatterMatch) return;

    const frontmatter = frontmatterMatch[1];

    const hasDate = /^date:\s*\S+/m.test(frontmatter);
    const isDraftMatch = frontmatter.match(/^draft:\s*(true|false)/m);
    const isDraft = isDraftMatch ? isDraftMatch[1] === "true" : false;

    if (isDraft) {
        console.log(`Saltado (draft): ${path.basename(filePath)}`);
        return;
    }

    if (hasDate) {
        console.log(`Ya tiene fecha: ${path.basename(filePath)}`);
        return;
    }

    const today = getTodayDate();
    const newFrontmatter = frontmatter + `\ndate: ${today}`;
    const newContent = content.replace(frontmatter, newFrontmatter);

    fs.writeFileSync(filePath, newContent, "utf-8");
    console.log(`Fecha asignada (${today}): ${path.basename(filePath)}`);
}

function main() {
    const files = fs
        .readdirSync(BLOG_DIR)
        .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

    files.forEach((file) => {
        processFile(path.join(BLOG_DIR, file));
    });
}

main();
