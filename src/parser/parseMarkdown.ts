import { ParsedDocument } from ".";

const CONTAINER_REGEX = /^\$\[([a-zA-Z][\w-]*)\]\s*$/;
const ELEMENT_REGEX = /^@([a-zA-Z][\w-]*)\s*$/;

export default async function parseMarkdown(
  markdown: string
): Promise<ParsedDocument> {
  const result: ParsedDocument = {};
  let currentContainer: string | null = null;
  let currentElement: string | null = null;
  let buffer: string[] = [];

  const lines = markdown.split(/\r?\n/);

  function flushElement() {
    if (!currentContainer || !currentElement) return;

    const content = buffer.join("\n").trim();
    if (!content) {
      buffer = [];
      return;
    }

    const container =
      result[currentContainer] ?? (result[currentContainer] = {});
    const existing = container[currentElement];

    if (existing === undefined) {
      container[currentElement] = content;
    } else if (Array.isArray(existing)) {
      existing.push(content);
    } else {
      container[currentElement] = [existing, content];
    }

    buffer = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trimStart(); // 👈 THIS is the fix

    const containerMatch = line.match(CONTAINER_REGEX);
    if (containerMatch) {
      flushElement();
      currentContainer = containerMatch[1]!;
      currentElement = null;
      continue;
    }

    const elementMatch = line.match(ELEMENT_REGEX);
    if (elementMatch) {
      flushElement();
      currentElement = elementMatch[1]!;
      continue;
    }

    if (currentElement) {
      buffer.push(rawLine); // keep original indentation for markdown
    }
  }
  flushElement();

  return result;
}
