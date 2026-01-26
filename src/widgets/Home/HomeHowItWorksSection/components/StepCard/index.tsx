import React from "react";
import { Box, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import type { StepCardProps } from "./types";

const StepCard: React.FC<StepCardProps> = ({
  step,
  index,
  prefersReducedMotion,
  borderColor,
  borderHoverColor,
  cardBg,
  cardShadow,
  cardHoverShadow,
  overlineColor,
  titleColor,
  textColor,
  accentBg,
  accentColor,
}) => (
  <Box
    as="li"
    position="relative"
    overflow="hidden"
    borderWidth="1px"
    borderColor={borderColor}
    borderRadius="2xl"
    p={{ base: 5, md: 6 }}
    bg={cardBg}
    boxShadow={cardShadow}
    minH={{ base: "auto", md: "200px" }}
    transition={prefersReducedMotion ? undefined : "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease"}
    _hover={{
      borderColor: borderHoverColor,
      boxShadow: cardHoverShadow,
      transform: prefersReducedMotion ? undefined : "translateY(-2px)",
    }}
    _before={{
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "3px",
      bg: accentColor,
      opacity: 0.9,
      borderTopLeftRadius: "2xl",
      borderBottomLeftRadius: "2xl",
    }}
  >
    <Stack spacing={3}>
      <HStack spacing={3} align="center">
        <Box
          w={{ base: "48px", md: "52px" }}
          h={{ base: "48px", md: "52px" }}
          borderRadius="xl"
          bg={accentBg}
          color={accentColor}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <Icon as={step.icon} boxSize={6} aria-hidden="true" />
        </Box>
        <Stack spacing={0} minW={0}>
          <Text fontSize="xs" color={overlineColor} letterSpacing="0.12em" textTransform="uppercase">
            Шаг {(index + 1).toString().padStart(2, "0")}
          </Text>
          <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" color={titleColor} letterSpacing="-0.01em">
            {step.title}
          </Text>
        </Stack>
      </HStack>

      <Text fontSize={{ base: "sm", md: "md" }} color={textColor} lineHeight="1.7">
        {step.desc}
      </Text>
    </Stack>
  </Box>
);

export default StepCard;
