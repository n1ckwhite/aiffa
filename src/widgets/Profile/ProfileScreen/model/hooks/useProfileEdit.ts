import React from "react";
import type { ProfileLink } from "entities/user";
import { normalizeCustomLinkValue, validateCustomLinkValue } from "../helpers/normalizeCustomLinkValue";
import { UseProfileEditArgs, UseProfileEditResult } from "./types";
import type { ProfileEditInitial } from "../types";

export const useProfileEdit = ({
  profile,
  displayLinks,
  emailValue,
  updateProfile,
}: UseProfileEditArgs): UseProfileEditResult => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [editSessionId, setEditSessionId] = React.useState<number>(0);
  const [editInitial, setEditInitial] = React.useState<ProfileEditInitial | null>(null);
  const [hasTriedSave, setHasTriedSave] = React.useState<boolean>(false);

  const [saveState, saveAction, isSaving] = React.useActionState(
    async (_prev: { ok: boolean; error?: string } | null, formData: FormData) => {
      try {
        setHasTriedSave(true);
        const nextName = String(formData.get("profileName") ?? "").trim();
        const nextBio = String(formData.get("profileBio") ?? "").trim();
        const nextWorkplace = String(formData.get("profileWorkplace") ?? "").trim();
        const nextLocation = String(formData.get("profileLocation") ?? "").trim();
        const rawLinks = [
          String(formData.get("profileLink1") ?? ""),
          String(formData.get("profileLink2") ?? ""),
          String(formData.get("profileLink3") ?? ""),
          String(formData.get("profileLink4") ?? ""),
        ] as const;

        const validations = rawLinks.map((v) => validateCustomLinkValue(v));
        const hasAnyError = validations.some((r) => Boolean(r.error));
        if (hasAnyError) {
          return { ok: false, error: "Проверьте ссылки: есть запрещённые или некорректные значения." };
        }

        const [link1, link2, link3, link4] = validations.map((v) => v.normalized) as [
          string,
          string,
          string,
          string,
        ];

        const nextLinks: ProfileLink[] = [];
        const trimmedEmail = String(emailValue || "").trim();
        if (trimmedEmail) {
          nextLinks.push({ id: "link-email", kind: "email", label: "Email", value: trimmedEmail });
        }

        [link1, link2, link3, link4].forEach((v, idx) => {
          if (!v) return;
          nextLinks.push({ id: `link-${idx + 1}`, kind: "custom", label: "Ссылка", value: v });
        });

        updateProfile({
          name: nextName || "Пользователь",
          bio: nextBio,
          workplace: nextWorkplace,
          location: nextLocation,
          links: nextLinks,
        });

        setHasTriedSave(false);
        setIsEditing(false);
        return { ok: true };
      } catch (e: any) {
        return { ok: false, error: String(e?.message ?? "Не удалось сохранить") };
      }
    },
    null,
  );

  const handleStartEdit = React.useCallback(() => {
    setHasTriedSave(false);
    const nonEmail = displayLinks
      .filter((l) => String((l as any)?.kind ?? "") !== "email")
      .map((l) => normalizeCustomLinkValue(String((l as any)?.value ?? "")))
      .filter(Boolean);

    setEditSessionId((s) => s + 1);
    setEditInitial({
      name: typeof profile.name === "string" ? profile.name : "",
      bio: typeof profile.bio === "string" ? profile.bio : "",
      workplace: typeof profile.workplace === "string" ? profile.workplace : "",
      location: typeof profile.location === "string" ? profile.location : "",
      links: [nonEmail[0] ?? "", nonEmail[1] ?? "", nonEmail[2] ?? "", nonEmail[3] ?? ""],
    });
    setIsEditing(true);
  }, [displayLinks, profile]);

  const handleCancelEdit = React.useCallback(() => {
    setHasTriedSave(false);
    setIsEditing(false);
  }, []);

  // Prevent global hotkeys / document keydown handlers from stealing focus while typing.
  const handleStopHotkeys = React.useCallback((e: React.KeyboardEvent) => {
    e.stopPropagation();
  }, []);

  return {
    isEditing,
    editSessionId,
    editInitial,
    isSaving,
    saveState,
    hasTriedSave,
    saveAction,
    handleStartEdit,
    handleCancelEdit,
    handleStopHotkeys,
  };
};


