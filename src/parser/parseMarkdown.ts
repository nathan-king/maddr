import parseTree from "./parseTree";
import { ParsedDocument } from ".";

function walk(value: any): any {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "object" && value !== null) {
    // List node
    if (value.__type === "ul") {
      return value.items.map((item: string) => `- ${item}`);
    }

    if (value.__type === "ol") {
      return value.items.map((item: string, i: number) => `${i + 1}. ${item}`);
    }

    // Regular container
    const result: any = {};
    for (const [key, child] of Object.entries(value)) {
      result[key] = walk(child);
    }
    return result;
  }

  return value;
}

export default async function parseMarkdown(
  input: string
): Promise<ParsedDocument> {
  const tree = await parseTree(input);
  return walk(tree);
}
