import React from "react";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { FiUsers } from "react-icons/fi";
import { AppLink } from "shared/ui/AppLink";
import { ProfileHeaderPeopleLinksProps } from "./types";

export const ProfileHeaderPeopleLinks: React.FC<ProfileHeaderPeopleLinksProps> = (props) => {
  const { followersLinkProps, followingLinkProps, hoverColor, mutedColor } = props;

  return (
    <HStack
      as="nav"
      aria-label="Подписки и подписчики"
      spacing={2}
      justify={{ base: "center", md: "flex-start" }}
      w="full"
      flexWrap="wrap"
    >
      <HStack spacing={1.5} flexWrap="wrap">
        <AppLink
          to={followersLinkProps.to}
          aria-label="Открыть список подписчиков"
          color={mutedColor}
          fontWeight="semibold"
          textDecoration="none"
          borderBottom="0"
          display="inline-flex"
          alignItems="center"
          _hover={{ textDecoration: "underline", borderBottom: "0", color: hoverColor }}
          _active={{ opacity: 0.9 }}
        >
          <HStack spacing={1.5} align="center">
            <Icon as={FiUsers} color="currentColor" />
            <Text as="span">{followersLinkProps.label}</Text>
          </HStack>
        </AppLink>

        <Text aria-hidden="true" color={mutedColor}>
          ·
        </Text>

        <AppLink
          to={followingLinkProps.to}
          aria-label="Открыть список подписок"
          color={mutedColor}
          fontWeight="semibold"
          textDecoration="none"
          borderBottom="0"
          display="inline-flex"
          alignItems="center"
          _hover={{ textDecoration: "underline", borderBottom: "0", color: hoverColor }}
          _active={{ opacity: 0.9 }}
        >
          <Text as="span">{followingLinkProps.label}</Text>
        </AppLink>
      </HStack>
    </HStack>
  );
};

