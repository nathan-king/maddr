import { parseRaw } from "./parser/parseRaw";
import { parseHtml } from "./parser/parseHtml";

export type ElementValue = string | string[];

export interface ParsedContainer {
  [element: string]: ElementValue;
}

export interface ParsedDocument {
  [container: string]: ParsedContainer;
}

export default {
  parse: parseRaw,
  parseHtml,
};

export { parseRaw, parseHtml };
