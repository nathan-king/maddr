import { remark } from "remark";
import html from "remark-html";
import strip from "strip-markdown";
export async function markdownToHtml(markdown) {
    const result = await remark().use(html).process(markdown);
    return result.toString().trim();
}
export async function markdownToText(md) {
    const file = await remark().use(strip).process(md);
    return String(file).trim();
}
//# sourceMappingURL=utils.js.map