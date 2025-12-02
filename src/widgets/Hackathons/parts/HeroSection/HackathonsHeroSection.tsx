import React from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useHackathonsColors } from "../../colors/useHackathonsColors";
import PillBadge from "@/shared/ui/PillBadge";

const heroCardGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.38);
  }
  60% {
    box-shadow: 0 0 0 22px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
`;

const heroAsideFloat = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0);
  }
`;

const HackathonsHeroSection: React.FC = () => {
  const { heroAsideBg, mutedTextColor, cardBorderColor } = useHackathonsColors();
  const heroBgGradient = useColorModeValue(
    "linear(to-br, blue.50, whiteAlpha.900)",
    "linear(to-br, rgba(15, 23, 42, 1), rgba(30, 64, 175, 0.9))"
  );

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-hero-title"
      pt={{ base: 2, md: 0 }}
    >
      <Box
        position="relative"
        overflow="hidden"
        bgGradient={heroBgGradient}
        borderRadius="3xl"
        borderWidth="1px"
        borderColor={cardBorderColor}
        px={{ base: 3, md: 8 }}
        py={{ base: 4, md: 8 }}
        animation={`${heroCardGlow} 16s ease-out infinite`}
      >
        <Box
          position="absolute"
          inset="-40px"
          opacity={0.7}
          filter="blur(52px)"
          pointerEvents="none"
          aria-hidden="true"
        >
          <Box
            position="absolute"
            top={{ base: "10%", md: "0%" }}
            left="-8%"
            w={{ base: "220px", md: "260px" }}
            h={{ base: "220px", md: "260px" }}
            bgGradient="radial(circle at 30% 30%, rgba(59,130,246,0.9), transparent)"
          />
          <Box
            position="absolute"
            bottom="-10%"
            right="-6%"
            w={{ base: "260px", md: "320px" }}
            h={{ base: "260px", md: "320px" }}
            bgGradient="radial(circle at 70% 70%, rgba(244,114,182,0.85), transparent)"
          />
        </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 4, md: 10 }}
        align={{ base: "flex-start", md: "center" }}
        position="relative"
        zIndex={1}
      >
        <Box flex="1" maxW={{ base: "full", md: "60%" }}>
          <Box mb={3}>
            <PillBadge colorScheme="blue" variant="solid" uppercase>
              Прокачка в реальных задачах
            </PillBadge>
          </Box>

          <Heading
            id="hackathons-hero-title"
            as="h1"
            fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
            lineHeight="short"
          >
            Хакатоны AIFFA: несколько дней, которые меняют карьеру разработчика
          </Heading>

          <Text
            mt={4}
            fontSize={{ base: "sm", md: "lg" }}
            color={mutedTextColor}
          >
            Работайте над живыми задачами от компаний, собирайте портфолио и
            знакомьтесь с единомышленниками. Хакатон — это концентрированный
            опыт командной разработки в безопасной среде.
          </Text>

          <Stack
            direction="column"
            spacing={{ base: 3, md: 4 }}
            mt={{ base: 4, md: 8 }}
            align="flex-start"
          >
            <Box position="relative" display="inline-flex" w={{ base: "100%", md: "auto" }}>
              <Box
                position="absolute"
                insetX={-4}
                top="50%"
                transform="translateY(-50%)"
                h="56px"
                bgGradient={useColorModeValue(
                  "radial(circle at 50% 50%, rgba(59,130,246,0.25), transparent 65%)",
                  "radial(circle at 50% 50%, rgba(59,130,246,0.7), transparent 65%)"
                )}
                filter="blur(16px)"
                opacity={0.9}
                pointerEvents="none"
                aria-hidden="true"
              />
              <Button
                as="a"
                href="https://trello.com"
                target="_blank"
                rel="noopener noreferrer"
                colorScheme="blue"
                size="md"
                fontSize={{ base: "sm", sm: "md" }}
                px={{ base: 4, md: 6 }}
                py={{ base: 2.5, md: 3 }}
                w={{ base: "100%", md: "auto" }}
                maxW={{ base: "100%", md: "360px" }}
                position="relative"
                zIndex={1}
              >
                Участвовать в хакатонах
              </Button>
            </Box>
            <Button
              as="a"
              href="/partners"
              variant="outline"
              size="md"
              fontSize={{ base: "sm", sm: "md" }}
              px={{ base: 4, md: 6 }}
              py={{ base: 2.5, md: 3 }}
              w={{ base: "100%", md: "auto" }}
              maxW={{ base: "100%", md: "360px" }}
            >
              Оформить партнёрство
            </Button>
          </Stack>
        </Box>

        <Box
          flex={{ base: "none", md: 1 }}
          w={{ base: "100%", md: "auto" }}
          maxW={{ base: "full", md: "40%" }}
          bg={heroAsideBg}
          borderRadius="2xl"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          px={{ base: 4, md: 6 }}
          py={{ base: 4, md: 6 }}
          boxShadow="lg"
          animation={`${heroAsideFloat} 18s ease-in-out infinite`}
        >
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color={mutedTextColor}
            mb={3}
          >
            На хакатонах AIFFA вы:
          </Text>
          <Stack spacing={2.5} fontSize={{ base: "sm", md: "md" }}>
            <HStack align="flex-start" spacing={2.5}>
              <Icon
                viewBox="0 0 16 16"
                boxSize={4}
                color="green.400"
                mt={0.5}
              >
                <path
                  fill="currentColor"
                  d="M6.5 11.4 3.6 8.5l1.1-1.1 1.8 1.8 4.8-4.8 1.1 1.1-5.9 5.9Z"
                />
              </Icon>
              <Text flex="1">
                решаете реальные продуктовые задачи;
              </Text>
            </HStack>
            <HStack align="flex-start" spacing={2.5}>
              <Icon
                viewBox="0 0 16 16"
                boxSize={4}
                color="green.400"
                mt={0.5}
              >
                <path
                  fill="currentColor"
                  d="M6.5 11.4 3.6 8.5l1.1-1.1 1.8 1.8 4.8-4.8 1.1 1.1-5.9 5.9Z"
                />
              </Icon>
              <Text flex="1">
                работаете в команде с другими разработчиками;
              </Text>
            </HStack>
            <HStack align="flex-start" spacing={2.5}>
              <Icon
                viewBox="0 0 16 16"
                boxSize={4}
                color="green.400"
                mt={0.5}
              >
                <path
                  fill="currentColor"
                  d="M6.5 11.4 3.6 8.5l1.1-1.1 1.8 1.8 4.8-4.8 1.1 1.1-5.9 5.9Z"
                />
              </Icon>
              <Text flex="1">
                получаете фидбек от менторов и экспертов;
              </Text>
            </HStack>
            <HStack align="flex-start" spacing={2.5}>
              <Icon
                viewBox="0 0 16 16"
                boxSize={4}
                color="green.400"
                mt={0.5}
              >
                <path
                  fill="currentColor"
                  d="M6.5 11.4 3.6 8.5l1.1-1.1 1.8 1.8 4.8-4.8 1.1 1.1-5.9 5.9Z"
                />
              </Icon>
              <Text flex="1">
                добавляете мощный кейс в портфолио.
              </Text>
            </HStack>
          </Stack>
        </Box>
      </Stack>
      </Box>
    </Box>
  );
};

export default HackathonsHeroSection;


