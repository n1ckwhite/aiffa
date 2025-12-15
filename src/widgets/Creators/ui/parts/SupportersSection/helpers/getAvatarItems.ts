import { Creator } from "@/widgets/Creators/model/types";
import type { SupporterAvatar } from "../types";

export const getAvatarItems = (supporters: Creator[], githubSupporters: SupporterAvatar[]): SupporterAvatar[] => {
  const supporterAvatars: SupporterAvatar[] = supporters.map((creator) => {
    const primaryLink = creator.profileLinks[0];
    return {
      id: creator.id,
      name: creator.name,
      profileHref: primaryLink?.href ?? "#",
      avatarSrc: creator.avatar as string | undefined,
    };
  });

  return [...supporterAvatars, ...githubSupporters];
};


