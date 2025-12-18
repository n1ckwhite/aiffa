import React from "react";

export type UseBlogHotkeysArgs = {
  query: string;
  setQuery: (next: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
};

/**
 * Blog screen hotkeys:
 * - Ctrl/⌘ + K: focus + select search input
 * - Esc (when search is focused): clear search
 */
export const useBlogHotkeys = ({ query, setQuery, searchInputRef }: UseBlogHotkeysArgs) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isK = (e.key || "").toLowerCase() === "k";
      if (isK && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
        return;
      }
      if (e.key === "Escape" && document.activeElement === searchInputRef.current && query.trim()) {
        e.preventDefault();
        setQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [query, searchInputRef, setQuery]);
};


