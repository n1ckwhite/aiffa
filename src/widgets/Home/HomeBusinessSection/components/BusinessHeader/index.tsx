import React from "react";
import { Box, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { AppLink } from "@/shared/ui/AppLink";
import type { BusinessHeaderProps } from "./types";

const BusinessHeader: React.FC<BusinessHeaderProps> = ({
  badge,
  title,
  description,
  linkLabel,
  linkTo,
  titleId,
  descriptionId,
  badgeBg,
  badgeColor,
  titleColor,
  textColor,
  linkColor,
}) => (
  <Stack
    spacing={3}
    align="flex-start"
    flex={{ base: "none", lg: 1.2 }}
    as="header"
    textAlign={{ base: "center", lg: "left" }}
    justifyContent={{ base: "center", lg: "flex-start" }}
    alignItems={{ base: "center", lg: "flex-start" }}
  >
    <HStack spacing={2}>
      <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.14em" color={badgeColor} bg={badgeBg} px={2.5} py={1} borderRadius="full">
        {badge}
      </Text>
    </HStack>
    <Heading id={titleId} as="h2" size={{ base: "md", md: "lg" }} letterSpacing="-0.02em" color={titleColor}>
      {title}
    </Heading>
    <Text id={descriptionId} color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
      {description}
    </Text>
    <AppLink to={linkTo} color={linkColor} fontWeight="semibold" display="inline-flex" alignItems="center" gap={2}>
      {linkLabel}
      <Box as="span" aria-hidden>
        →
      </Box>
    </AppLink>
  </Stack>
);

export default BusinessHeader;
