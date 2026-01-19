"use client";

import React from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import { AppLink } from "shared/ui/AppLink";
import { PlainListItemProps } from "./types";

export const PlainListItem: React.FC<PlainListItemProps> = ({ item, titleDomId, cardBorder, mutedColor, titleColor }) => {
  const isPending = item.status === "pending";

  return (
    <Box
      as="li"
      borderWidth="1px"
      borderColor={cardBorder}
      borderRadius="16px"
      px={{ base: 3, md: 4 }}
      py={{ base: 3, md: 3.5 }}
      bg="transparent"
    >
      <Box as="article" aria-labelledby={titleDomId}>
        <Text as="h3" id={titleDomId} fontSize="sm" fontWeight="semibold" color={titleColor}>
          {item.title}
        </Text>

        <Text as="p" mt={1} fontSize="sm" color={mutedColor}>
          {item.description}
        </Text>

        <Text
          as="p"
          m={0}
          mt={2}
          color={mutedColor}
          fontSize="sm"
          display="inline-flex"
          alignItems="center"
          gap={2}
          flexWrap="wrap"
        >
          {isPending ? (
            <Box
              as="span"
              fontSize="xs"
              fontWeight="semibold"
              color="yellow.700"
              bg="yellow.100"
              borderWidth="1px"
              borderColor="yellow.300"
              px={2.5}
              py={1}
              borderRadius="full"
              whiteSpace="nowrap"
              flexShrink={0}
            >
              В обработке
            </Box>
          ) : null}
          <Icon as={FiUser} boxSize="14px" aria-hidden="true" />
          <AppLink
            to={item.authorHref}
            prefetch={false}
            display="inline-flex"
            w="fit-content"
            maxW="100%"
            color={mutedColor}
            fontSize="sm"
            textDecoration="none"
            _hover={{ textDecoration: "underline" }}
            aria-label={`Открыть автора: ${item.authorLabel}`}
          >
            {item.authorLabel}
          </AppLink>
        </Text>
      </Box>
    </Box>
  );
};

