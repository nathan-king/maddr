import { markdownToText } from "../utils";
import parseMarkdown from "./parseMarkdown";
import { ParsedDocument, ParsedContainer } from ".";

export async function parseRaw(markdown: string): Promise<ParsedDocument> {
  const doc = await parseMarkdown(markdown);
  const result: ParsedDocument = {};

  for (const [containerName, container] of Object.entries(doc)) {
    const rendered: ParsedContainer = {};

    for (const [elementName, value] of Object.entries(container)) {
      rendered[elementName] = Array.isArray(value)
        ? await Promise.all(value.map(markdownToText))
        : await markdownToText(value);
    }

    result[containerName] = rendered;
  }
  return result;
}
