# maddr

Parse “structured markdown” (`.mdr`) into a JSON-serializable object structure by labeling **sections** and **fields**.

- A **section** starts with a line like `$[hero]`
- A **field** starts with a line like `@title`
- Field content is the block of lines that follows the field label, up to the next `@field` or `$[section]`
- Field content is typically indented for readability (indentation is optional, but recommended so it’s visually clear what belongs to a field)

## Why maddr?

Markdown is great for content, but awkward for structured data.
maddr provides a minimal, readable syntax for extracting semantic
content blocks from markdown without inventing a full DSL.

Use maddr instead of frontmatter for multi-section content files.

## Install

```sh
npm i maddr
```

## Example `.mdr` File

`home.mdr`

```md
$[hero]

@title
  # Build docs from content files

@subtitle
  Use **.mdr** to keep markdown readable _and_ structured.

$[features]
@item
  - Fast
@item
  - Simple
@item
  - Framework-agnostic
```

## React (Vite)

```tsx
import maddr from "maddr";
import useMaddr from "maddr/react";
import mdr from "./home.mdr?raw";

export default function App() {
  const { content, error, loading } = useMaddr(mdr, "raw");

  if (loading) {
    return <div>Loading…</div>;
  }

  if (error) {
    return <pre>Error: {String(error)}</pre>;
  }

  if (!content) {
    return null;
  }

  const featureItems = maddr.toArray(content.features?.item);

  return (
    <main style={{ padding: 40 }}>
      <header>
        <h1>{content.hero.title}</h1>
        <p>{content.hero.subtitle}</p>
      </header>

      <ul>
        {featureItems.map((li, i) => (
          <li key={i}>{li}</li>
        ))}
      </ul>
    </main>
  );
}
```

`useMaddr(input, mode)` parses the given `.mdr` string on mount (and whenever `input`/`mode` changes) and returns `{ content, error, loading }`.
`mode` can be `"raw"` (plain text), `"markdown"`, or `"html"`.

## Vue (Vite)

```vue
<script setup lang="ts">
import { parseHtml } from "maddr";
import mdr from "./home.mdr?raw";

const content = await parseHtml(mdr);
</script>

<template>
  <main>
    <header>
      <div v-html="content.hero.title" />
      <div v-html="content.hero.subtitle" />
    </header>

    <ul>
      <li v-for="li in content.features.item" :key="li" v-html="li" />
    </ul>
  </main>
</template>
```

## SvelteKit

`src/routes/+page.server.ts`

```ts
import { parseRaw } from "maddr";
import { readFile } from "node:fs/promises";

export async function load() {
  const mdr = await readFile("src/content/home.mdr", "utf8");
  const content = await parseRaw(mdr);

  return { content };
}
```

`src/routes/+page.svelte`

```svelte
<script lang="ts">
  export let data: { content: any };
</script>

<main>
  <h1>{data.content.hero.title}</h1>
  <p>{data.content.hero.subtitle}</p>

  <ul>
    {#each data.content.features.item as li}
      <li>{li}</li>
    {/each}
  </ul>
</main>
```

## Plain Usage (Node / Scripts)

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

To normalize a field to an array (whether it appears once or many times), use `toArray` (where `doc` is the parsed document):

```ts
import maddr, { toArray } from "maddr";

toArray(doc.features?.item);
maddr.toArray(doc.features?.item);
```

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
