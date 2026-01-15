import parseMarkdown from "./parseMarkdown";
import { markdownToHtml } from "../utils";
const CONTAINER_REGEX = /^\$\[([a-zA-Z][\w-]*)\]\s*$/;
const ELEMENT_REGEX = /^@([a-zA-Z][\w-]*)\s*$/;
export default async function parseHtml(input) {
    const doc = await parseMarkdown(input);
    const rendered = {};
    for (const [containerName, container] of Object.entries(doc)) {
        const out = {};
        for (const [elementName, value] of Object.entries(container)) {
            out[elementName] = Array.isArray(value)
                ? await Promise.all(value.map(markdownToHtml))
                : await markdownToHtml(value);
        }
        rendered[containerName] = out;
    }
    return rendered;
}
//# sourceMappingURL=parseHtml.js.map