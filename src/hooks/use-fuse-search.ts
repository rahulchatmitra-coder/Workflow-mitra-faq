import * as React from "react";
import Fuse from "fuse.js";
import { DOCS_SEARCH_INDEX } from "@/data/docs-index";
import { SearchResultItem } from "@/types/docs";

export function useFuseSearch() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResultItem[]>([]);

  const fuse = React.useMemo(() => {
    return new Fuse(DOCS_SEARCH_INDEX, {
      keys: [
        { name: "title", weight: 0.5 },
        { name: "description", weight: 0.3 },
        { name: "snippet", weight: 0.2 },
        { name: "category", weight: 0.1 },
      ],
      threshold: 0.35,
      includeMatches: true,
      minMatchCharLength: 2,
    });
  }, []);

  React.useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const searchResults = fuse.search(query).map((res) => res.item);
    setResults(searchResults);
  }, [query, fuse]);

  return {
    query,
    setQuery,
    results,
    allDocs: DOCS_SEARCH_INDEX,
  };
}
