import { parseHtml, parseMarkdown, parseRaw } from "./parser";
import { toArray } from "./utils";
export { parseRaw, parseMarkdown, parseHtml, toArray };

export default {
  parseMarkdown,
  parseHtml,
  parse: parseRaw,
  toArray,
};
