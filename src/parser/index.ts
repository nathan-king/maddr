import parseHtml from "./parseHtml";
import parseMarkdown from "./parseMarkdown";
import parseRaw from "./parseRaw";

export type ElementValue = string | string[];

export interface ParsedContainer {
  [element: string]: ElementValue;
}

export interface ParsedDocument {
  [container: string]: ParsedContainer;
}

export { parseHtml, parseMarkdown, parseRaw };
