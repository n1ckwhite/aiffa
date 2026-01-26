import React from "react";
import { Box, HStack, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { AppLink } from "@/shared/ui/AppLink";
import type { ContributionCtaProps } from "./types";

const ContributionCta: React.FC<ContributionCtaProps> = ({
  title,
  label,
  description,
  linkLabel,
  linkTo,
  textColor,
  titleColor,
  storyLinkColor,
  ctaBg,
}) => (
  <Box borderRadius="2xl" bg={ctaBg} px={{ base: 5, md: 7 }} py={{ base: 5, md: 6 }} position="relative" overflow="hidden">
    <Box
      aria-hidden="true"
      position="absolute"
      inset={0}
      bgImage={useColorModeValue(
        "radial-gradient(420px 180px at 10% 0%, rgba(59,130,246,0.10), transparent 60%), radial-gradient(420px 180px at 90% 20%, rgba(168,85,247,0.10), transparent 60%)",
        "radial-gradient(420px 180px at 10% 0%, rgba(96,165,250,0.14), transparent 60%), radial-gradient(420px 180px at 90% 20%, rgba(216,180,254,0.14), transparent 60%)"
      )}
      pointerEvents="none"
    />
    <Stack spacing={3} position="relative" zIndex={1}>
      <Text fontSize="xs" fontWeight="bold" letterSpacing="0.16em" textTransform="uppercase" color={textColor}>
        {label}
      </Text>
      <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color={titleColor} letterSpacing="-0.02em">
        {title}
      </Text>
      <Text color={textColor} fontSize={{ base: "sm", md: "md" }} lineHeight="1.7">
        {description}
      </Text>
      <HStack pt={1}>
        <AppLink
          to={linkTo}
          aria-label={linkLabel}
          fontWeight="semibold"
          color={storyLinkColor}
          _hover={{ textDecoration: "none", opacity: 0.9 }}
        >
          {linkLabel} →
        </AppLink>
      </HStack>
    </Stack>
  </Box>
);

export default ContributionCta;
