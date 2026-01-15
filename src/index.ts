import { parseHtml, parseMarkdown, parseRaw } from "./parser";

export { parseRaw, parseMarkdown, parseHtml };

export default {
  parseMarkdown,
  parseHtml,
  parse: parseRaw,
};
