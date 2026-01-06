import type { KeyboardEvent } from "react";
import type { ProfileLink, UserProfile } from "@/entities/user";
import type { ProfileEditInitial } from "../../types";

export type UseProfileEditArgs = {
  profile: UserProfile;
  displayLinks: ProfileLink[];
  emailValue: string;
  updateProfile: (next: Partial<UserProfile>) => void;
};

export type UseProfileEditResult = {
  isEditing: boolean;
  editSessionId: number;
  editInitial: ProfileEditInitial | null;
  isSaving: boolean;
  saveState: { ok: boolean; error?: string } | null;
  saveAction: (formData: FormData) => void;
  handleStartEdit: () => void;
  handleCancelEdit: () => void;
  handleStopHotkeys: (e: KeyboardEvent) => void;
};