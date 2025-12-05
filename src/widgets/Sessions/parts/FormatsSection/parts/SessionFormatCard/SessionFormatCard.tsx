"use client";

import React from "react";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { detailCardGlow, iconIdleFloat } from "@/widgets/Sessions/animations";
import type { SessionFormatCardComponentProps } from "../../types";
import { useSessionsColors } from "@/widgets/Sessions/colors/useSessionsColors";

const SessionFormatCard: React.FC<SessionFormatCardComponentProps> = ({ card }) => {
  const { mutedTextColor, cardBg, cardBorderColor, iconCircleBg, iconColor } = useSessionsColors();
  const { icon, title, description } = card;

  return (
    <Box
      as="li"
      role="listitem"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={cardBorderColor}
      bg={cardBg}
      p={{ base: 4, md: 5 }}
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        bgGradient:
          "linear-gradient(135deg, rgba(59, 130, 246, 0.10), rgba(37, 99, 235, 0.06))",
        backgroundSize: "200% 200%",
        opacity: 0.9,
        animation: `${detailCardGlow} 22s ease-in-out infinite`,
        pointerEvents: "none",
      }}
      transition="transform 0.15s ease, box-shadow 0.15s ease, border-color 0.2s ease"
      boxShadow="sm"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "lg",
        borderColor: "blue.400",
      }}
    >
      <Stack spacing={3} position="relative" zIndex={1}>
        <Box
          borderRadius="full"
          boxSize={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg={iconCircleBg}
          color={iconColor}
          aria-hidden="true"
          boxShadow="0 0 0 1px rgba(255, 255, 255, 0.08)"
          animation={`${iconIdleFloat} 5s ease-in-out infinite`}
          transition="transform 0.18s ease, box-shadow 0.18s ease"
          _hover={{
            transform: "translateY(-1px) scale(1.05)",
            boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.45)",
          }}
        >
          {icon}
        </Box>
        <Heading as="h3" fontSize={{ base: "md", md: "lg" }}>
          {title}
        </Heading>
        <Text fontSize={{ base: "sm", md: "sm" }} color={mutedTextColor}>
          {description}
        </Text>
      </Stack>
    </Box>
  );
};

export default SessionFormatCard;


