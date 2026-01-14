"use client";

import React from "react";
import { Avatar, AvatarGroup, Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FiAward, FiCalendar, FiCode } from "react-icons/fi";
import { useHackathonWinnerCardColors } from "widgets/Creators/ui/parts/HackathonWinnersSection/colors/useHackathonWinnerCardColors";
import { formatRuDate } from "shared/functions/formatRuDate";
import type { HackathonCardItemProps } from "./types";

export const HackathonCardItem: React.FC<HackathonCardItemProps> = ({ item }) => {
  const {
    cardBg,
    pillBorderColor,
    pillHoverBg,
    accentColor,
    goldBorder,
    goldColor,
    purplerBorder,
    purpleColor,
    bronzeBorder,
    bronzeColor,
    defaultBorder,
    defaultColor,
    rankBg,
    metaColor,
    titleColor,
    bgIconColor,
    avatarBorder,
  } = useHackathonWinnerCardColors();

  const place = item.place;
  const placeStyle =
    place === 1
      ? { border: goldBorder, color: goldColor }
      : place === 2
        ? { border: purplerBorder, color: purpleColor }
        : place === 3
          ? { border: bronzeBorder, color: bronzeColor }
          : { border: defaultBorder, color: defaultColor };

  const dateLabel = formatRuDate(item.dateIso);
  const hackathonIconColor = accentColor;
  const dateIconColor = purpleColor;
  const titleId = React.useId();

  return (
    <Box as="li" listStyleType="none">
      <Box
        borderWidth="1px"
        borderColor={pillBorderColor}
        bg={cardBg}
        borderRadius="2xl"
        overflow="hidden"
        position="relative"
        boxShadow="sm"
        role="group"
        display="flex"
        flexDirection="column"
        transition="background-color 0.18s ease-out, box-shadow 0.2s ease-out, transform 0.16s ease-out, border-color 0.16s ease-out"
        _hover={{
          bg: pillHoverBg,
          boxShadow: "md",
          borderColor: accentColor,
          transform: "translateY(-1px)",
        }}
      >
        <Box position="absolute" inset={0} pointerEvents="none" overflow="hidden">
          <Icon
            as={FiCode}
            boxSize={28}
            color={bgIconColor}
            position="absolute"
            right={-4}
            bottom={-6}
            opacity={0.16}
            transform="rotate(-10deg) translate3d(0, 0, 0)"
            transition="transform 0.25s ease-out, opacity 0.25s ease-out"
            _groupHover={{
              transform: "rotate(-4deg) translate3d(12px, -10px, 0)",
              opacity: 0.24,
            }}
            aria-hidden="true"
          />
        </Box>

        <Box as="article" aria-labelledby={titleId} position="relative" zIndex={2} p={{ base: 3, md: 4 }}>
          <VStack align="flex-start" spacing={3} w="full" minW={0} flex="1">
            {typeof place === "number" ? (
              <Box
                px={2}
                py={0.5}
                borderRadius="full"
                borderWidth="1px"
                borderColor={placeStyle.border}
                bg={rankBg}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                gap={1}
                flexShrink={0}
              >
                <Icon as={FiAward} boxSize={3} aria-hidden="true" color={placeStyle.color} />
                <Text as="span" fontSize="xs" fontWeight="semibold" color={placeStyle.color}>
                  #{place}
                </Text>
              </Box>
            ) : null}

            <HStack as="header" spacing={2} color={metaColor} fontSize={{ base: "xs", md: "sm" }} minW={0} w="full">
              <Icon as={FiCode} boxSize={{ base: 3.5, md: 4 }} aria-hidden="true" color={hackathonIconColor} />
              <Text as="span" whiteSpace="nowrap">
                Хакатон:
              </Text>
              <Text as="span" fontWeight="semibold" wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal" minW={0}>
                <Box as="h3" id={titleId} m={0} fontWeight="inherit">
                  {item.title}
                </Box>
              </Text>
            </HStack>

            <Text
              as="p"
              m={0}
              fontSize={{ base: "sm", md: "md" }}
              color={metaColor}
              wordBreak="break-word"
              overflowWrap="anywhere"
              whiteSpace="normal"
            >
              {item.taskDescription}
            </Text>

            <VStack as="section" aria-label="Команда и участники" align="flex-start" spacing={2} w="full" minW={0}>
              <HStack spacing={2} minW={0} w="full" flexWrap="wrap" rowGap={2}>
                <Text
                  as="h4"
                  m={0}
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="semibold"
                  letterSpacing="-0.02em"
                  color={titleColor}
                  wordBreak="break-word"
                  overflowWrap="anywhere"
                  whiteSpace="normal"
                >
                  {item.teamName}
                </Text>
              </HStack>
              <AvatarGroup size={{ base: "sm", md: "md" }} role="list" aria-label="Участники команды">
                {item.members.map((m, idx) => (
                  <Avatar
                    key={`${m.href}-${m.name}-${idx}`}
                    as="a"
                    href={m.href}
                    aria-label={`Открыть участника: ${m.name}`}
                    name={m.name}
                    src={m.avatarUrl}
                    loading="lazy"
                    borderWidth="2px"
                    borderColor={avatarBorder}
                    boxSize={{ base: 9, md: 10 }}
                    _hover={{ transform: "translateY(-1px)" }}
                    _active={{ transform: "translateY(0)" }}
                    role="listitem"
                  />
                ))}
              </AvatarGroup>
            </VStack>

            <HStack spacing={2} color={metaColor} fontSize={{ base: "xs", md: "sm" }} pt={1}>
              <Icon as={FiCalendar} boxSize={{ base: 3.5, md: 4 }} aria-hidden="true" color={dateIconColor} />
              <Text as="time" dateTime={item.dateIso} m={0}>
                {dateLabel}
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

