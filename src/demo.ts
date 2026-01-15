import { readFile } from "node:fs/promises";
import { parseHtml, parseMarkdown, parseRaw } from "./parser";
const mode = process.argv[2] ?? "md";

console.log("maddr parser booted!");

async function read(path: string) {
  return await readFile(path, "utf8");
}

const markdown = await read("demo.mdr");

const renderedHtml = await parseHtml(markdown);
const renderedMd = await parseMarkdown(markdown);
const renderedRaw = await parseRaw(markdown);

async function demo(type: string) {
  switch (type) {
    case "html":
      console.log(JSON.stringify(renderedHtml, null, 2));
      break;
    case "md":
      console.log(JSON.stringify(renderedMd, null, 2));
      break;
    case "raw":
      console.log(JSON.stringify(renderedRaw, null, 2));
      break;
  }
}

demo(mode);
