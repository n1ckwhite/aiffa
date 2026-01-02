import type React from "react";

type ClickLikeEvent = Pick<React.SyntheticEvent, "preventDefault" | "stopPropagation">;

export const openAuthorProfile = (e: ClickLikeEvent, authorHref?: string) => {
  if (!authorHref) return;
  e.preventDefault();
  e.stopPropagation();
  try {
    window.open(authorHref, "_blank", "noopener,noreferrer");
  } catch (error) {
    console.error(error);
  }
};


