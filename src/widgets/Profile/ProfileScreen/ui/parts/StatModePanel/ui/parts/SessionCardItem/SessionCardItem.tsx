"use client";

import React from "react";
import { Box, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import { SiGooglemeet } from "react-icons/si";
import { FiCalendar } from "react-icons/fi";
import { useSessionsColors } from "widgets/Sessions/colors/useSessionsColors";
import { formatRuDate } from "shared/functions/formatRuDate";
import type { SessionCardItemProps } from "./types";

export const SessionCardItem: React.FC<SessionCardItemProps> = ({ item }) => {
  const { mutedTextColor, cardBg, cardBorderColor, scheduleMarkerColor, scheduleChipBg, scheduleChipColor } = useSessionsColors();
  const dateLabel = formatRuDate(item.dateTime);

  return (
    <Box
      as="li"
      role="listitem"
      listStyleType="none"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={cardBorderColor}
      bg={cardBg}
      p={{ base: 4, md: 5 }}
      position="relative"
      overflow="hidden"
      boxShadow="sm"
      transition="transform 0.15s ease, box-shadow 0.15s ease, border-color 0.2s ease"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "lg",
        borderColor: scheduleMarkerColor,
      }}
      w="full"
      minW={{ base: "100%", sm: "250px", md: "350px" }}
      maxW="100%"
      boxSizing="border-box"
      flexShrink={0}
    >
      <Stack spacing={3} position="relative" zIndex={1} w="full" minW={0}>
        <HStack spacing={3} align="flex-start" w="full" minW={0}>
          <Box
            borderRadius="full"
            boxSize={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={scheduleChipBg}
            color={scheduleMarkerColor}
            aria-hidden="true"
            boxShadow="0 0 0 1px rgba(255, 255, 255, 0.08)"
            transition="transform 0.18s ease, box-shadow 0.18s ease"
            flexShrink={0}
          >
            <Icon as={item.icon} />
          </Box>

          <VStack align="flex-start" spacing={2} minW={0} flex={1}>
            <Text
              as="h3"
              m={0}
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="semibold"
              wordBreak="break-word"
              overflowWrap="anywhere"
              whiteSpace="normal"
            >
              {item.title}
            </Text>

            <HStack spacing={2} flexWrap="wrap">
              <Box
                as="span"
                px={2.5}
                py={1}
                borderRadius="full"
                bg={scheduleChipBg}
                color={scheduleChipColor}
                fontSize="xs"
                display="inline-flex"
                alignItems="center"
                gap={1}
                flexShrink={0}
              >
                <Icon as={SiGooglemeet} boxSize={3} aria-hidden="true" />
                <Text as="span">{item.timeLabel}</Text>
              </Box>
            </HStack>
          </VStack>
        </HStack>

        <Text fontSize={{ base: "sm", md: "sm" }} color={mutedTextColor} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
          {item.description}
        </Text>

        <HStack spacing={2} color={mutedTextColor} fontSize={{ base: "sm", md: "sm" }} pt={1}>
          <Icon as={FiCalendar} boxSize={4} aria-hidden="true" color={scheduleMarkerColor} />
          <Box as="time" dateTime={item.dateTime} fontWeight="semibold">
            {dateLabel}
          </Box>
        </HStack>
      </Stack>
    </Box>
  );
};

