import { markdownToText } from "../utils";
import parseMarkdown from "./parseMarkdown";
export default async function parseRaw(markdown) {
    const doc = await parseMarkdown(markdown);
    const result = {};
    for (const [containerName, container] of Object.entries(doc)) {
        const rendered = {};
        for (const [elementName, value] of Object.entries(container)) {
            rendered[elementName] = Array.isArray(value)
                ? await Promise.all(value.map(markdownToText))
                : await markdownToText(value);
        }
        result[containerName] = rendered;
    }
    return result;
}
//# sourceMappingURL=parseRaw.js.map