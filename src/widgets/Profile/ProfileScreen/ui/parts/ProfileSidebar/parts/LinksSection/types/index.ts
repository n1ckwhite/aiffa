import type { KeyboardEvent } from "react";
import type { ProfileLink } from "entities/user";

export type LinksSectionProps = {
  isEditing: boolean;
  hasTriedSave: boolean;
  displayLinks: ProfileLink[];

  editInitial: { links: [string, string, string, string] } | null;
  handleStopHotkeys: (e: KeyboardEvent) => void;
};


