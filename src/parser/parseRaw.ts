import { markdownToText } from "../utils";
import parseTree from "./parseTree";
import { ParsedDocument } from ".";

async function walk(value: any): Promise<any> {
  // 🔹 list node: { __type, items }
  if (
    typeof value === "object" &&
    value !== null &&
    "__type" in value &&
    Array.isArray((value as any).items)
  ) {
    return Promise.all((value as any).items.map(walk));
  }

  if (typeof value === "string") {
    return markdownToText(value);
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map(walk));
  }

  if (typeof value === "object" && value !== null) {
    const result: any = {};
    for (const [key, child] of Object.entries(value)) {
      result[key] = await walk(child);
    }
    return result;
  }

  return value;
}

export default async function parseRaw(
  markdown: string
): Promise<ParsedDocument> {
  const doc = await parseTree(markdown);
  return walk(doc);
}
