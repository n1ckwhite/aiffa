export type UseBlogCoverImageStateResult = {
    imgRef: React.RefObject<HTMLImageElement | null>;
    loadState: "loading" | "loaded" | "error";
    normalizedSrc: string;
    srcSet?: string;
    markLoaded: () => void;
    markError: () => void;
  };