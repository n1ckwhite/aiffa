import React from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiCode, FiAward } from "react-icons/fi";
import { hackathonWinners, type HackathonWinner } from "../../model/hackathonWinners";

type HackathonWinnerCardProps = {
  teamName: string;
  place: 1 | 2 | 3;
  hackathonTitle: string;
  description: string;
  members: HackathonWinner["members"];
};

const HackathonWinnerCard: React.FC<HackathonWinnerCardProps> = ({
  teamName,
  place,
  hackathonTitle,
  description,
  members,
}) => {
  const cardBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const pillBorderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const pillHoverBg = useColorModeValue("blue.50", "whiteAlpha.100");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  const goldBorder = useColorModeValue("yellow.400", "yellow.300");
  const goldColor = useColorModeValue("yellow.700", "yellow.200");
  const purplerBorder = useColorModeValue("purple.400", "purple.300");
  const purpleColor = useColorModeValue("purple.600", "purple.200");
  const bronzeBorder = useColorModeValue("orange.400", "orange.300");
  const bronzeColor = useColorModeValue("orange.700", "orange.200");
  const defaultBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const defaultColor = useColorModeValue("gray.500", "gray.300");

  const rankBg = useColorModeValue("whiteAlpha.700", "whiteAlpha.100");
  const rankBorder = place === 1 ? goldBorder : place === 2 ? purplerBorder : place === 3 ? bronzeBorder : defaultBorder;
  const rankColor = place === 1 ? goldColor : place === 2 ? purpleColor : place === 3 ? bronzeColor : defaultColor;

  const metaColor = useColorModeValue("gray.500", "gray.300");
  const titleColor = useColorModeValue("gray.800", "gray.100");
  // Цвет фоновой иконки как на блоках авторов
  const bgIconColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

  return (
    <Box
      borderRadius="2xl"
      p={{ base: 3, md: 4 }}
      w="full"
      bg={cardBg}
      boxShadow={useColorModeValue("sm", "sm")}
      borderWidth="1px"
      borderColor={pillBorderColor}
      position="relative"
      overflow="hidden"
      role="group"
      transition="background-color 0.18s ease-out, box-shadow 0.2s ease-out, transform 0.16s ease-out, border-color 0.16s ease-out"
      _hover={{
        bg: pillHoverBg,
        boxShadow: useColorModeValue("md", "md"),
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
            Хакатон: <Text as="span" fontWeight="semibold">{hackathonTitle}</Text>
          </Text>
          <Text fontSize="md" fontWeight="semibold" letterSpacing="-0.02em" color={titleColor}>
            {teamName}
          </Text>

          {members.length > 0 && (
            <AvatarGroup size="sm" max={5}>
              {members.map((member: HackathonWinner["members"][number]) => (
                <Avatar
                  key={member.id}
                  as={Link}
                  href={member.profileHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  name={member.name}
                  src={member.avatarSrc}
                  loading="lazy"
                  borderWidth="2px"
                  borderColor={useColorModeValue("white", "transparent")}
                  _hover={{
                    transform: "translateY(-1px)",
                    boxShadow: useColorModeValue("md", "md"),
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

const HackathonWinnersSection: React.FC = () => {
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const iconBorderColor = useColorModeValue("blue.400", "blue.300");
  const iconBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const iconColor = useColorModeValue("blue.500", "blue.300");

  if (!hackathonWinners.length) {
    return null;
  }

  const sorted = [...hackathonWinners].sort((a, b) => a.place - b.place).slice(0, 3);

  return (
    <Box as="section" aria-label="Победители хакатона AIFFA" bg="transparent">
      <VStack align="stretch" spacing={4}>
        <VStack align="center" spacing={4} textAlign="center">
          <HStack spacing={2} align="center" justify="center">
            <Box
              as="span"
              px={2.5}
              py={1.5}
              borderRadius="full"
              borderWidth="1px"
              borderColor={iconBorderColor}
              bg={iconBg}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FiCode} boxSize={3.5} aria-hidden="true" color={iconColor} />
            </Box>
            <Heading as="h2" size="md" letterSpacing="-0.02em">
              Победители Хакатона
            </Heading>
          </HStack>
          <Text fontSize="sm" color={subtitleColor} maxW={{ base: "full", md: "640px" }}>
            Здесь мы отмечаем команды, которые заняли призовые места в последнем AIFFA Hackathon #1 — Задача старта. В рамках одного
            общего задания они предложили решения, которые особенно помогли продукту и комьюнити.
          </Text>
        </VStack>

        <Box w="full">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 5 }} alignItems="stretch">
            {sorted.map((winner) => (
              <HackathonWinnerCard key={winner.id} {...winner} />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default HackathonWinnersSection;


