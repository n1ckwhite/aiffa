import React from "react";
import { Avatar, AvatarGroup, Box, HStack, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { FiAward, FiCode } from "react-icons/fi";
import type { HackathonWinnerCardProps } from "../types";
import { useHackathonWinnerCardColors } from "../colors/useHackathonWinnerCardColors";

const HackathonWinnerCard: React.FC<HackathonWinnerCardProps> = ({ teamName, place, hackathonTitle, description, members }) => {
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

  const rankBorder = place === 1 ? goldBorder : place === 2 ? purplerBorder : place === 3 ? bronzeBorder : defaultBorder;
  const rankColor = place === 1 ? goldColor : place === 2 ? purpleColor : place === 3 ? bronzeColor : defaultColor;

  return (
    <Box
      borderRadius="2xl"
      p={{ base: 3, md: 4 }}
      w="full"
      minW={{ base: "100%", md: "320px" }}
      maxW="100%"
      boxSizing="border-box"
      flexShrink={0}
      bg={cardBg}
      boxShadow="sm"
      borderWidth="1px"
      borderColor={pillBorderColor}
      position="relative"
      overflow="hidden"
      role="group"
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
      <VStack align="flex-start" spacing={3}>
        <HStack justify="space-between" w="full">
          <HStack spacing={2}>
            <Box
              px={2}
              py={0.5}
              borderRadius="full"
              borderWidth="1px"
              borderColor={rankBorder}
              bg={rankBg}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
            >
              <Icon as={FiAward} boxSize={3} aria-hidden="true" color={rankColor} />
              <Text as="span" fontSize="xs" fontWeight="semibold" color={rankColor}>
                #{place}
              </Text>
            </Box>
          </HStack>
        </HStack>
        <VStack align="flex-start" spacing={1} w="full">
          <Text fontSize="xs" color={metaColor}>
            Хакатон:{" "}
            <Text as="span" fontWeight="semibold">
              {hackathonTitle}
            </Text>
          </Text>
          <Text fontSize="md" fontWeight="semibold" letterSpacing="-0.02em" color={titleColor}>
            {teamName}
          </Text>

          {members.length > 0 && (
            <AvatarGroup size="md">
              {members.map((member: HackathonWinnerCardProps["members"][number]) => (
                <Avatar
                  key={member.id}
                  as="a"
                  href={member.profileHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  name={member.name}
                  src={member.avatarSrc}
                  loading="lazy"
                  borderWidth="2px"
                  borderColor={avatarBorder}
                  boxSize={10}
                  _hover={{
                    transform: "translateY(-1px)",
                  }}
                  _active={{
                    transform: "translateY(0)",
                  }}
                />
              ))}
            </AvatarGroup>
          )}
        </VStack>
        <Text fontSize="xs" color={metaColor}>
          {description}
        </Text>
      </VStack>
    </Box>
  );
};

export default HackathonWinnerCard;


