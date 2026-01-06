import React from "react";
import type { ProfileLink } from "entities/user";
import { DEFAULT_PROFILE_EMAIL, PLACEHOLDER_AVATAR_URL } from "../../constants";
import { ProfileBadgeModel, UseProfileScreenViewModelArgs, UseProfileScreenViewModelResult } from "./types";

const safeTrim = (v: unknown) => {
  if (typeof v !== "string") return "";
  return v.trim();
};

const safeNonNegativeInt = (v: unknown) => {
  if (typeof v !== "number") return 0;
  if (!Number.isFinite(v)) return 0;
  if (v < 0) return 0;
  return Math.trunc(v);
};

const safeProfileLinks = (raw: unknown): ProfileLink[] => {
  if (!Array.isArray(raw)) return [];

  const kindSet = new Set(["email", "telegram", "github", "website", "custom"]);
  const result: ProfileLink[] = [];

  for (const item of raw) {
    const id = safeTrim((item as any)?.id);
    const value = safeTrim((item as any)?.value);
    if (!id || !value) continue;

    const rawKind = safeTrim((item as any)?.kind) || "custom";
    const kind = kindSet.has(rawKind) ? (rawKind as ProfileLink["kind"]) : "custom";
    const label = safeTrim((item as any)?.label);

    const link: ProfileLink = {
      id,
      kind,
      value,
      ...(label ? { label } : {}),
    };
    result.push(link);
  }

  return result;
};

const buildBadge = (linksCount: number): ProfileBadgeModel => {
  if (linksCount > 0) return { label: "Контрибьютор", colorScheme: "purple" };
  return { label: "Автор AIFFA", colorScheme: "blue" };
};

const pickEmail = (links: ProfileLink[]) => {
  for (const l of links) {
    if (l.kind !== "email") continue;
    const raw = safeTrim(l.value);
    if (!raw) continue;
    return raw.replace(/^mailto:/i, "");
  }
  return DEFAULT_PROFILE_EMAIL;
};

const pickAchievedItems = (items: unknown) => {
  if (!Array.isArray(items)) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const list = items as any[];
  return list.filter((i) => i?.achieved).slice(0, 6);
};

export const useProfileScreenViewModel = ({
  profile,
  achievementItems,
}: UseProfileScreenViewModelArgs): UseProfileScreenViewModelResult => {
  return React.useMemo(() => {
    const name = safeTrim(profile?.name);
    const bio = safeTrim(profile?.bio);

    const avatarUrl = safeTrim(profile?.avatarUrl) || PLACEHOLDER_AVATAR_URL;
    const xp = safeNonNegativeInt(profile?.xp);

    const profileLinks = safeProfileLinks(profile?.links);
    const displayLinks = profileLinks;

    const workplace = safeTrim(profile?.workplace);
    const locationLabel = safeTrim(profile?.location);

    const emailValue = pickEmail(profileLinks);
    const profileBadge = buildBadge(displayLinks.length);
    const achievedItems = pickAchievedItems(achievementItems);

    return {
      name,
      bio,
      avatarUrl,
      xp,
      profileLinks,
      displayLinks,
      profileBadge,
      emailValue,
      workplace,
      locationLabel,
      achievedItems,
    };
  }, [achievementItems, profile]);
};


