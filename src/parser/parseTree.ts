import { ParsedDocument } from ".";

const CONTAINER_REGEX = /^\$\[([a-zA-Z][\w:-]*)\]\s*$/;
const ELEMENT_REGEX = /^@([a-zA-Z][\w-]*)\s*$/;

function getOrCreateContainer(
  root: any,
  path: string[]
): { parent: any; key: string } {
  let current = root;

  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i]!;
    current[key] ??= {};
    current = current[key];
  }

  const key = path[path.length - 1]!;
  current[key] ??= {};
  return { parent: current, key };
}

function parseListItems(lines: string[]): string[] {
  return lines
    .map((l) => l.trim())
    .filter((l) => /^([-*+]\s+|\d+\.\s+)/.test(l))
    .map((l) => l.replace(/^([-*+]\s+|\d+\.\s+)/, "").trim());
}

export default async function parseMarkdown(
  markdown: string
): Promise<ParsedDocument> {
  const result: ParsedDocument = {};

  let currentParent: any = null;
  let currentKey: string | null = null;
  let currentContainer: any = null;

  let currentElement: string | null = null;
  let buffer: string[] = [];
  let containerBuffer: string[] = [];
  let hasElements = false;

  const lines = markdown.split(/\r?\n/);

  function flushElement() {
    if (!currentContainer || !currentElement) return;

    const content = buffer.join("\n").trim();
    buffer = [];

    if (!content) return;

    const existing = currentContainer[currentElement];

    if (existing === undefined) {
      currentContainer[currentElement] = content;
    } else if (Array.isArray(existing)) {
      existing.push(content);
    } else {
      currentContainer[currentElement] = [existing, content];
    }
  }

  function flushContainerList() {
    if (!currentContainer || hasElements) return;

    const raw = containerBuffer.map((l) => l.trim()).filter(Boolean);
    if (raw.length === 0) return;

    const isUl = raw.every((l) => /^[-*+]\s+/.test(l));
    const isOl = raw.every((l) => /^\d+\.\s+/.test(l));

    if (isUl || isOl) {
      const items = raw.map((l) => l.replace(/^([-*+]|\d+\.)\s+/, "").trim());

      Object.assign(currentContainer, {
        __type: isUl ? "ul" : "ol",
        items,
      });
    }

    containerBuffer = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trimStart();

    const containerMatch = line.match(CONTAINER_REGEX);
    if (containerMatch) {
      flushElement();
      flushContainerList();

      const path = containerMatch[1]!.split(":").map((s) => s.trim());
      const { parent, key } = getOrCreateContainer(result, path);

      currentParent = parent;
      currentKey = key;
      currentContainer = parent[key];

      currentElement = null;
      buffer = [];
      containerBuffer = [];
      hasElements = false;
      continue;
    }

    const elementMatch = line.match(ELEMENT_REGEX);
    if (elementMatch) {
      flushElement();
      hasElements = true;
      currentElement = elementMatch[1]!;
      continue;
    }

    if (currentElement) {
      buffer.push(rawLine);
    } else if (currentContainer) {
      containerBuffer.push(rawLine);
    }
  }

  flushElement();
  flushContainerList();

  return result;
}
