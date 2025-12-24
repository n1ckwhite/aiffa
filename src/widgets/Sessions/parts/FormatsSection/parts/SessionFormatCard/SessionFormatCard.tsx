"use client";

import React from "react";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
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
        pointerEvents: "none",
      }}
      transition="transform 0.15s ease, box-shadow 0.15s ease, border-color 0.2s ease"
      boxShadow="sm"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "lg",
        borderColor: "blue.400",
      }}
      w="full"
      minW={{ base: "100%", sm: "250px", md: "300px" }}
      maxW="100%"
      boxSizing="border-box"
      flexShrink={0}
    >
      <Stack spacing={3} position="relative" zIndex={1} w="full" minW={0}>
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
          transition="transform 0.18s ease, box-shadow 0.18s ease"
          _hover={{
            transform: "translateY(-1px) scale(1.05)",
            boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.45)",
          }}
          flexShrink={0}
        >
          {icon}
        </Box>
        <Heading as="h3" fontSize={{ base: "md", md: "lg" }} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
          {title}
        </Heading>
        <Text fontSize={{ base: "sm", md: "sm" }} color={mutedTextColor} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
          {description}
        </Text>
      </Stack>
    </Box>
  );
};

export default SessionFormatCard;


