import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { CompactAchievement } from "@/widgets/Profile/ProfileScreen/ui/parts/CompactAchievement/CompactAchievement";
import type { AchievementsListProps } from "./types";

const AchievementsList: React.FC<AchievementsListProps> = ({ items, title, accentLabel }) => (
  <Box textAlign={{ base: "center", md: "left" }} margin={{ base: "0 auto", md: "0" }} w="full">
    <Text
      fontSize="sm"
      fontWeight="bold"
      color={accentLabel}
      letterSpacing="0.14em"
      textTransform="uppercase"
      mb={2}
      w="full"
      textAlign={{ base: "center", md: "left" }}
    >
      {title}
    </Text>
    <HStack as="ul" spacing={2} flexWrap="wrap" m={0} p={0} listStyleType="none" justify={{ base: "center", md: "flex-start" }}>
      {items.map((item) => (
        <Box as="li" key={item.id}>
          <CompactAchievement item={item} />
        </Box>
      ))}
    </HStack>
  </Box>
);

export default AchievementsList;
