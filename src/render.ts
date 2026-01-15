import type { ParsedDocument, ParsedContainer, ElementValue } from "./parser";
import { markdownToHtml } from "./utils";

export async function renderDocument(
  doc: ParsedDocument
): Promise<ParsedDocument> {
  const rendered: ParsedDocument = {};

  for (const [containerName, container] of Object.entries(doc)) {
    const renderedContainer: ParsedContainer = {};

    for (const [elementName, value] of Object.entries(container)) {
      if (Array.isArray(value)) {
        renderedContainer[elementName] = await Promise.all(
          value.map(markdownToHtml)
        );
      } else {
        renderedContainer[elementName] = await markdownToHtml(value);
      }
    }
    rendered[containerName] = renderedContainer;
  }
  return rendered;
}
