import parseMarkdown from "./parseTree";
import { markdownToHtml } from "../utils";
import { ParsedDocument } from ".";

async function walk(value: any): Promise<any> {
  if (typeof value === "string") {
    return markdownToHtml(value);
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map(walk));
  }

  if (typeof value === "object" && value !== null) {
    if (value.__type === "ul" || value.__type === "ol") {
      const tag = value.__type;
      const items = value.items.map((i: string) => `<li>${i}</li>`).join("");
      return `<${tag}>${items}</${tag}>`;
    }

    const result: any = {};
    for (const [key, child] of Object.entries(value)) {
      if (key === "__type") continue;
      result[key] = await walk(child);
    }
    return result;
  }

  return value;
}

export default async function parseHtml(
  input: string
): Promise<ParsedDocument> {
  const doc = await parseMarkdown(input);
  return walk(doc);
}
