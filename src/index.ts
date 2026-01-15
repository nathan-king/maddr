import parseStructure from "./parser";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { renderDocument } from "./render";

console.log("maddr parser booted!");

const markdown = await readFile("demo.mdr", "utf8");

const structured = parseStructure(markdown);
const rendered = await renderDocument(structured);

console.log(JSON.stringify(rendered, null, 2));
