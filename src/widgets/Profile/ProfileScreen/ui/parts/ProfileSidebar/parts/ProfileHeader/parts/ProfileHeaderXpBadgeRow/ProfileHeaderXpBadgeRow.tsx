import React from "react";
import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import { FiAward } from "react-icons/fi";
import PillBadge from "shared/ui/PillBadge";
import { formatCount } from "shared/functions/formatCount";
import { ProfileHeaderXpBadgeRowProps } from "./types";

export const ProfileHeaderXpBadgeRow: React.FC<ProfileHeaderXpBadgeRowProps> = (props) => {
  const { xp, profileBadge, mutedColor, xpNumberColor, xpIconColor } = props;

  return (
    <HStack
      spacing={3}
      justify={{ base: "center", md: "flex-start" }}
      w="full"
      flexWrap="wrap"
      align="center"
    >
      <HStack spacing={1.5} color={mutedColor}>
        <Icon as={FiAward} color={xpIconColor} />
        <Text fontSize={{ base: "md", md: "lg" }}>
          <Text as="span" fontWeight="bold" color={xpNumberColor} fontSize={{ base: "md", md: "lg" }}>
            {formatCount(xp)}
          </Text>{" "}
          XP
        </Text>
      </HStack>
      <Box>
        <PillBadge colorScheme={profileBadge.colorScheme as any} variant="outline" uppercase={false}>
          {profileBadge.label}
        </PillBadge>
      </Box>
    </HStack>
  );
};

