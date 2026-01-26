import React from "react";
import { Box, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { AppBoxLink } from "@/shared/ui/AppLink";
import type { MiniCaseCardProps } from "./types";

const MiniCaseCard: React.FC<MiniCaseCardProps> = ({
  item,
  isDark,
  borderColor,
  borderHoverColor,
  cardBg,
  baseShadow,
  hoverShadow,
  labelColor,
  titleColor,
  textColor,
  actionColor,
  prefersReducedMotion,
}) => (
  <AppBoxLink
    to={item.to}
    aria-label={`${item.title} — открыть`}
    role="group"
    display="block"
    borderWidth="1px"
    borderColor={borderColor}
    borderRadius="2xl"
    bg={cardBg}
    boxShadow={baseShadow}
    p={{ base: 5, md: 6 }}
    minH={{ base: "auto", md: "220px" }}
    position="relative"
    overflow="hidden"
    transition={prefersReducedMotion ? undefined : "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease"}
    _hover={{
      textDecoration: "none",
      borderColor: borderHoverColor,
      boxShadow: hoverShadow,
      transform: prefersReducedMotion ? undefined : "translateY(-2px)",
    }}
  >
    <Box
      aria-hidden="true"
      position="absolute"
      inset="-1px"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={isDark ? item.accent.borderDark : item.accent.borderLight}
      opacity={0.45}
      pointerEvents="none"
    />

    <Stack spacing={3} position="relative" zIndex={1} h="full">
      <HStack spacing={3} align="center">
        <Box
          w="40px"
          h="40px"
          borderRadius="xl"
          bg={isDark ? item.accent.bgDark : item.accent.bgLight}
          color={isDark ? item.accent.fgDark : item.accent.fgLight}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          transition={prefersReducedMotion ? undefined : "transform 180ms ease"}
          _groupHover={{ transform: prefersReducedMotion ? undefined : "scale(1.04)" }}
        >
          <Icon as={item.icon} boxSize={5} aria-hidden="true" />
        </Box>
        <Text fontSize="sm" fontWeight="bold" letterSpacing="0.06em" textTransform="uppercase" color={labelColor}>
          {item.label}
        </Text>
      </HStack>

      <Text color={titleColor} fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" letterSpacing="-0.02em" lineHeight="1.25">
        {item.title}
      </Text>

      <Text color={textColor} fontSize={{ base: "sm", md: "md" }} lineHeight="1.7">
        {item.desc}
      </Text>

      <Box pt={1} mt="auto">
        <Text fontWeight="semibold" color={actionColor}>
          Открыть →
        </Text>
      </Box>
    </Stack>
  </AppBoxLink>
);

export default MiniCaseCard;
