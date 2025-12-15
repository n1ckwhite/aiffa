import React from "react";
import { Avatar, Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { roleLabelMap } from "../../data/roles";
import type { CreatorCardProfileProps } from "./types";

const CreatorCardProfile: React.FC<CreatorCardProfileProps> = ({
  name,
  avatar,
  avatarBg,
  primaryTextColor,
  roleBorder,
  roleBg,
  roleColor,
  DirectionIcon,
  role,
  direction,
}) => (
  <HStack align="flex-start" spacing={3} mt={0} mb={3}>
    <Box position="relative" transition="transform 0.18s ease-out" _groupHover={{ transform: "translateY(-2px)" }}>
      <Avatar size="md" name={name} src={avatar} position="relative" bg={avatarBg} color="white" />
    </Box>
    <VStack align="flex-start" spacing={1}>
      <Text fontSize="md" fontWeight="semibold" letterSpacing="-0.02em" color={primaryTextColor} noOfLines={1}>
        {name}
      </Text>
      <HStack spacing={1}>
        <Box
          as="span"
          px={2.5}
          py={0.5}
          borderRadius="full"
          borderWidth="1px"
          borderColor={roleBorder}
          bg={roleBg}
          fontSize="xs"
          fontWeight="semibold"
          color={roleColor}
          display="inline-flex"
          alignItems="center"
          gap={1}
        >
          <Icon as={DirectionIcon} boxSize={3} aria-hidden="true" />
          <Text as="span">{direction || roleLabelMap[role]}</Text>
        </Box>
      </HStack>
    </VStack>
  </HStack>
);

export default CreatorCardProfile;


