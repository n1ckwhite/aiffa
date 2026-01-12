import React from "react";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { getFollowUi } from "./types";
import { useProfileScreenUiColors } from "../../../../../../../colors/useProfileScreenUiColors";

export type FollowIconButtonProps = {
  isFollowing: boolean;
  onToggle: () => void;
};

export const FollowIconButton: React.FC<FollowIconButtonProps> = ({ isFollowing, onToggle }) => {
  const { linkTextColor, cardBorder } = useProfileScreenUiColors();
  const followUi = getFollowUi(isFollowing);

  return (
    <Tooltip hasArrow openDelay={240} placement="top" label={followUi.tooltip}>
      <IconButton
        type="button"
        size="sm"
        variant="outline"
        borderColor={cardBorder}
        color={linkTextColor}
        onClick={onToggle}
        aria-label={followUi.ariaLabel}
        flexShrink={0}
        alignSelf="flex-start"
        icon={<Icon as={followUi.icon} />}
      />
    </Tooltip>
  );
};

