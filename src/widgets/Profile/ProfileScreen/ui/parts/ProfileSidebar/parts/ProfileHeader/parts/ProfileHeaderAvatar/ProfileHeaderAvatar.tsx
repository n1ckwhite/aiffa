import React from "react";
import { Box } from "@chakra-ui/react";
import { avatarProxyUrl } from "../../../../../../../model/helpers";
import { PLACEHOLDER_AVATAR_URL } from "../../../../../../../model/constants";
import { ProfileHeaderAvatarProps } from "./types";

export const ProfileHeaderAvatar: React.FC<ProfileHeaderAvatarProps> = ({ avatarUrl, displayName }) => {
  return (
    <Box
      as="img"
      boxSize={{ base: "132px", sm: "152px", md: "184px", lg: "208px" }}
      borderRadius="full"
      objectFit="cover"
      bg="transparent"
      alt={displayName}
      src={avatarProxyUrl(avatarUrl, 208)}
      srcSet={[
        `${avatarProxyUrl(avatarUrl, 132)} 132w`,
        `${avatarProxyUrl(avatarUrl, 152)} 152w`,
        `${avatarProxyUrl(avatarUrl, 184)} 184w`,
        `${avatarProxyUrl(avatarUrl, 208)} 208w`,
      ].join(", ")}
      sizes="(min-width: 62em) 208px, (min-width: 48em) 184px, (min-width: 30em) 152px, 132px"
      loading="eager"
      fetchPriority="high"
      decoding="async"
      onError={(e: any) => {
        try {
          e.currentTarget.src = avatarProxyUrl(PLACEHOLDER_AVATAR_URL, 208);
          e.currentTarget.removeAttribute("srcset");
        } catch {}
      }}
    />
  );
};

