import React from "react";
import type { IconType } from "react-icons";
import { roleIconMap } from "../data/roles";
import { getDirectionIcon } from "../functions/getDirectionIcon";
import type { CreatorCardMode, CreatorCardProps } from "../types";
import { getDescription } from "./getDescription";

type UseCardComputedArgs = CreatorCardProps & {
  rankPalette: {
    1: { border: string; color: string };
    2: { border: string; color: string };
    3: { border: string; color: string };
    default: { border: string; color: string };
  };
  cardBgMaterials: string;
  cardBgWeekly: string;
};

export const useCardComputed = ({
  creator,
  index,
  mode = "materials",
  showRank = true,
  rankPalette,
  cardBgMaterials,
  cardBgWeekly,
}: UseCardComputedArgs) => {
  const { role, direction, profileLinks } = creator;

  const rankBorder =
    index === 1 ? rankPalette[1].border : index === 2 ? rankPalette[2].border : index === 3 ? rankPalette[3].border : rankPalette.default.border;
  const rankColor =
    index === 1 ? rankPalette[1].color : index === 2 ? rankPalette[2].color : index === 3 ? rankPalette[3].color : rankPalette.default.color;

  const roleIcon = roleIconMap[role];
  const DirectionIcon = React.useMemo<IconType>(() => getDirectionIcon(direction, roleIcon), [direction, roleIcon]);

  const isTop3 = index <= 3 && showRank;
  const cardHref = profileLinks[0]?.href;
  const descriptionText = getDescription(mode as CreatorCardMode, index);

  const cardBg = mode === "weekly" ? cardBgWeekly : cardBgMaterials;

  const rootProps = cardHref
    ? ({
        as: "a",
        href: cardHref,
        target: "_blank",
        rel: "noopener noreferrer",
      } as const)
    : ({ as: "div" } as const);

  return {
    rankBorder,
    rankColor,
    DirectionIcon,
    isTop3,
    cardHref,
    descriptionText,
    cardBg,
    rootProps,
  };
};


