"use client";

import React from "react";
import { Box, HStack, Icon, Image, Text, VStack, VisuallyHidden } from "@chakra-ui/react";
import { FiCalendar, FiMessageCircle, FiStar, FiUserCheck } from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";
import { AppBoxLink, AppLink } from "shared/ui/AppLink";
import { useWeeklyTaskCardColors } from "widgets/WeeklyTaskCard/colors";
import { getRing } from "widgets/WeeklyTaskCard/model/ring";
import { BackgroundDeco } from "widgets/WeeklyTaskCard/parts/BackgroundDeco";
import { TagBadge } from "widgets/WeeklyTaskCard/parts/TagBadge";
import { formatCount } from "shared/functions/formatCount";
import { WeeklyTaskCardItemProps } from "./types";

export const WeeklyCardItem: React.FC<WeeklyTaskCardItemProps> = ({ item, titleDomId, mutedColor }) => {
  const weeklyColors = useWeeklyTaskCardColors();
  const ring = getRing(item.colorScheme);
  const to = item.to;

  return (
    <Box as="li">
      <Box
        borderWidth="1px"
        borderColor="green.300"
        borderRadius="20px"
        px={5}
        py={5}
        bg={weeklyColors.cardBg}
        boxShadow="none"
        position="relative"
        overflow="hidden"
        transition="all 0.25s ease"
        _hover={{ transform: "translateY(-2px)" }}
      >
            <Box
              position="absolute"
              inset={0}
              borderRadius="20px"
              bg="green.500"
              opacity={0.06}
              pointerEvents="none"
              zIndex={0}
              sx={{ mixBlendMode: "multiply" }}
            />
            <Box
              aria-hidden
              position="absolute"
              inset={0}
              pointerEvents="none"
              zIndex={0}
              _before={{
                content: '""',
                position: "absolute",
                inset: 0,
                backgroundImage: `radial-gradient(520px 200px at 0% 0%, ${ring.from}26, transparent 60%), radial-gradient(520px 200px at 100% 100%, ${ring.to}26, transparent 60%)`,
              }}
            />
            <Box
              aria-hidden
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              opacity={0.14}
              pointerEvents="none"
              zIndex={3}
              filter="drop-shadow(0 8px 22px rgba(16,185,129,0.35))"
            >
              <Icon as={FaCircleCheck} boxSize={{ base: 24, md: 28 }} color="green.400" />
            </Box>

        <BackgroundDeco ring={ring} />

        {/* Overlay link to make the whole card a real <a href> without nesting links inside links. */}
        <AppBoxLink
          to={to}
          prefetch={false}
          aria-label={item.title}
          position="absolute"
          inset={0}
          zIndex={1}
          borderRadius="20px"
          _focusVisible={{ outline: "2px solid", outlineColor: "blue.300", outlineOffset: "2px" }}
          style={{ textDecoration: "none" }}
        />

        <Box as="article" aria-labelledby={titleDomId} position="relative" zIndex={2} pointerEvents="none">
          <VStack align="start" spacing={2} minW={0} w="full">
            <Box>
              <TagBadge tag={item.tag} colorScheme={item.colorScheme} />
            </Box>

            <Text
              as="h3"
              id={titleDomId}
              fontSize="sm"
              fontWeight="semibold"
              whiteSpace="normal"
              overflowWrap="anywhere"
              wordBreak="break-word"
            >
              {item.title}
            </Text>

            <Text
              as="p"
              fontSize="sm"
              color={weeklyColors.descColor}
              whiteSpace="normal"
              overflowWrap="anywhere"
              wordBreak="break-word"
            >
              {item.description}
            </Text>

            <Text
              as="p"
              m={0}
              fontSize="sm"
              color={weeklyColors.authorLink}
              display="inline-flex"
              alignItems="center"
              gap={2}
              flexWrap="wrap"
            >
              <Image
                src={item.authorAvatarUrl}
                alt={item.authorLabel}
                boxSize="16px"
                borderRadius="full"
                borderWidth="1px"
                borderColor={weeklyColors.borderColor}
                loading="lazy"
                decoding="async"
              />

              <AppLink
                to={item.authorHref}
                prefetch={false}
                display="inline-flex"
                w="fit-content"
                maxW="100%"
                color={weeklyColors.authorLink}
                fontSize="sm"
                textDecoration="none"
                _hover={{ textDecoration: "underline" }}
                aria-label={`Открыть автора: ${item.authorLabel}`}
                position="relative"
                zIndex={3}
                pointerEvents="auto"
              >
                {item.authorLabel}
              </AppLink>
            </Text>

            <Box as="dl" m={0} display="flex" gap={3} color={mutedColor} fontSize="sm" aria-label="Статистика задачи">
              <HStack as="div" spacing={1}>
                <VisuallyHidden as="dt">Звёзды</VisuallyHidden>
                <Text as="dd" m={0} fontWeight="semibold">
                  {formatCount(item.starsCount)}
                </Text>
                <Icon as={FiStar} boxSize="14px" />
              </HStack>
              <HStack as="div" spacing={1}>
                <VisuallyHidden as="dt">Комментарии</VisuallyHidden>
                <Text as="dd" m={0} fontWeight="semibold">
                  {formatCount(item.commentsCount)}
                </Text>
                <Icon as={FiMessageCircle} boxSize="14px" />
              </HStack>
              <HStack as="div" spacing={1}>
                <VisuallyHidden as="dt">Решили</VisuallyHidden>
                <Text as="dd" m={0} fontWeight="semibold">
                  {formatCount(item.solvedCount)}
                </Text>
                <Icon as={FiUserCheck} boxSize="14px" color={weeklyColors.solvedIconColor} />
              </HStack>
            </Box>

            <Text as="p" m={0} color={mutedColor} fontSize="sm" display="inline-flex" alignItems="center" gap={2}>
              <Icon as={FiCalendar} boxSize="14px" aria-hidden="true" />
              <Box as="time" dateTime={item.dateLabel}>
                {item.dateLabel}
              </Box>
            </Text>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

