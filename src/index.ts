import { readFile } from "node:fs/promises";
import parseMarkdown from "./parser/parseMarkdown";
import parseHtml from "./parser/parseHtml";
import { parseRaw } from "./parser/parseRaw";

console.log("maddr parser booted!");

const markdown = await readFile("demo.mdr", "utf8");

const rendered = await parseHtml(markdown);
const rendered2 = await parseMarkdown(markdown);
const rendered3 = await parseRaw(markdown);

console.log(JSON.stringify(rendered3, null, 2));

export default {
  parseMarkdown,
  parseHtml,
};

export { parseMarkdown, parseHtml };
