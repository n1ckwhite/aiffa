import React from "react";
import {
  Box,
  Button,
  Heading,
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
        px={{ base: 5, md: 8 }}
        py={{ base: 6, md: 8 }}
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
        spacing={{ base: 8, md: 10 }}
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
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            lineHeight="short"
          >
            Хакатоны AIFFA: несколько дней, которые меняют карьеру разработчика
          </Heading>

          <Text
            mt={4}
            fontSize={{ base: "md", md: "lg" }}
            color={mutedTextColor}
          >
            Работайте над живыми задачами от компаний, собирайте портфолио и
            знакомьтесь с единомышленниками. Хакатон — это концентрированный
            опыт командной разработки в безопасной среде.
          </Text>

          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={4}
            mt={{ base: 6, md: 8 }}
          >
            <Box position="relative" display="inline-flex">
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
                size="lg"
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
              size="lg"
            >
              Оформить партнёрство
            </Button>
          </Stack>
        </Box>

        <Box
          flex="1"
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
          <Stack spacing={2} fontSize={{ base: "sm", md: "md" }}>
            <Text>— решаете реальные продуктовые задачи;</Text>
            <Text>— работаете в команде с другими разработчиками;</Text>
            <Text>— получаете фидбек от менторов и экспертов;</Text>
            <Text>— добавляете мощный кейс в портфолио.</Text>
          </Stack>
        </Box>
      </Stack>
      </Box>
    </Box>
  );
};

export default HackathonsHeroSection;


