# maddr

Parse “structured markdown” (`.mdr`) into JSON by labeling **sections** and **fields**.

- A **section** starts with a line like `$[hero]`
- A **field** starts with a line like `@title`
- Field content is the block of lines that follows the field label, up to the next `@field` or `$[section]`
- Field content should be indented for readability (the parser reads the lines as-is; indentation is a convention)

## Install

```sh
npm i maddr
```

## Usage

```ts
import maddr, { parseMarkdown, parseHtml, parseRaw } from "maddr";

const input = `
$[hero]

@title
  # This is a title

@subtitle
  ## This is a subtitle
`;

const asMarkdown = await parseMarkdown(input);
const asHtml = await parseHtml(input);
const asText = await parseRaw(input);

// alias: default export exposes `parse` -> `parseRaw`
const asText2 = await maddr.parse(input);
```

## `.mdr` Format

### Sections

Create a section with:

```md
$[sectionName]
```

Section names must start with a letter and may include letters, digits, `_`, and `-`.

### Fields

Create a field with:

```md
@fieldName
(indented content starts on the next line)
```

Field names follow the same naming rules as section names.

If you repeat the same field name within a section, its value becomes an array (in order of appearance).

## Output Shape

All parsers return:

```ts
type ElementValue = string | string[];
type ParsedDocument = Record<string, Record<string, ElementValue>>;
```

### `parseMarkdown(input)`

Returns each field’s content as a markdown string (trimmed).

### `parseHtml(input)`

Returns each field’s content rendered to HTML.

### `parseRaw(input)`

Returns each field’s content with markdown stripped to plain text.

## Development

```sh
pnpm demo   # runs src/demo.ts against demo.mdr
pnpm dev    # watches src/index.ts
```
