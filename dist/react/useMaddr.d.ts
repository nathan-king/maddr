import type { ParsedDocument } from "../parser";
type Mode = "raw" | "markdown" | "html";
export default function useMaddr(input: string, mode?: Mode): {
    content: ParsedDocument | null;
    error: unknown;
    loading: boolean;
};
export {};
//# sourceMappingURL=useMaddr.d.ts.map