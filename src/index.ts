console.log("maddr parser booted!");

export type ElementValue = string | string[];

export interface ParsedContainer {
  [element: string]: ElementValue;
}

export interface ParsedDocument {
  [container: string]: ParsedContainer;
}

const CONTAINER_REGEX = /^\$\[([a-zA-Z][\w-]*)\]\s*$/;
const ELEMENT_REGEX = /^@([a-zA-Z][\w-]*)\s*$/;

export function parseStructure(markdown: string): ParsedDocument {
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

  for (const line of lines) {
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
      buffer.push(line);
    }
  }
  flushElement();

  return result;
}

const demo = `
$[hero]

@title
# This is a title

@subtitle
# This is a subtitle
`;

console.log(JSON.stringify(parseStructure(demo), null, 2));
