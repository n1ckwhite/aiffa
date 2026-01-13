export type PaginationNavProps = {
    ariaLabel?: string;
    prevHref: string;
    nextHref: string;
    isPrevDisabled: boolean;
    isNextDisabled: boolean;
    tone?: "link" | "muted";
  };