export type UseBlogHotkeysArgs = {
    query: string;
    setQuery: (next: string) => void;
    searchInputRef: React.RefObject<HTMLInputElement | null>;
  };