import { remark } from "remark";
import html from "remark-html";
import strip from "strip-markdown";

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString().trim();
}

export async function markdownToText(md: string): Promise<string> {
  const file = await remark().use(strip).process(md);
  return String(file).trim();
}

export const toArray = <T>(v: T | T[] | undefined | null): T[] =>
  v == null ? [] : Array.isArray(v) ? v : [v];
