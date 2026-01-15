import { useEffect, useState } from "react";
import { parseRaw, parseMarkdown, parseHtml } from "../parser";
import type { ParsedDocument } from "../parser";

type Mode = "raw" | "markdown" | "html";

export default function useMaddr(input: string, mode: Mode = "raw") {
  const [content, setContent] = useState<ParsedDocument | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);

        const parsed =
          mode === "html"
            ? await parseHtml(input)
            : mode === "markdown"
            ? await parseMarkdown(input)
            : await parseRaw(input);

        if (!cancelled) {
          setContent(parsed);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [input, mode]);

  return { content, error, loading };
}
