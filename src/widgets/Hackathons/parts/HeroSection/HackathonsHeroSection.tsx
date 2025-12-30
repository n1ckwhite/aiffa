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
import PillBadge from "@/shared/ui/PillBadge";
import { heroAsideFloat } from "./animations";
import { useHackathonsHeroSectionColors } from "./colors/useHackathonsHeroSectionColors";

const HackathonsHeroSection: React.FC = () => {
  const { heroAsideBg, mutedTextColor, cardBorderColor, heroBgGradient } =
    useHackathonsHeroSectionColors();

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
        px={{ base: 6, md: 8 }}
        py={{ base: 5, md: 8 }}
      >
      <Stack
        direction={{ base: "column", xl: "row" }}
        spacing={{ base: 4, lg: 10 }}
        align={{ base: "center", xl: "flex-start" }}
        justify={{ base: "center", xl: "space-between" }}
        position="relative"
        zIndex={1}
        w="full"
      >
        <Box
          as="header"
          flex={{ base: "none", xl: "1 1 640px" }}
          w="full"
          minW={0}
          maxW={{ base: "full", md: "720px", xl: "720px" }}
          textAlign={{ base: "center", xl: "left" }}
          mx={{ base: "auto", xl: 0 }}
        >
          <Box mb={3}>
            <PillBadge colorScheme="blue" variant="outline" uppercase>
              Прокачка в реальных задачах
            </PillBadge>
          </Box>

          <Heading
            id="hackathons-hero-title"
            as="h1"
            fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
            lineHeight="short"
          >
            Хакатоны AIFFA: интенсивный формат, который меняет карьеру разработчика
          </Heading>

          <Text
            id="hackathons-hero-description"
            mt={3}
            fontSize={{ base: "md", md: "lg" }}
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
            align={{ base: "stretch", md: "center", xl: "flex-start" }}
          >
            <Box
              position="relative"
              display="inline-flex"
              w={{ base: "100%", md: "360px" }}
              mx={{ base: "auto", xl: 0 }}
            >
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
                href="https://t.me/nickwhite_web"
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                fontSize={{ base: "sm", sm: "md" }}
                fontWeight="semibold"
                px={{ base: 4, md: 6 }}
                py={{ base: 2.5, md: 3 }}
                w={{ base: "100%", md: "360px" }}
                position="relative"
                zIndex={1}
                bgGradient="linear(to-r, blue.600, blue.700)"
                color="white"
                transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
                _hover={{
                  bgGradient: "linear(to-r, blue.700, blue.800)",
                  transform: { base: "none", md: "translateY(-1px)" },
                  boxShadow: "lg",
                }}
                _active={{
                  bgGradient: "linear(to-r, blue.800, blue.900)",
                  transform: { base: "none", md: "translateY(0)" },
                  boxShadow: "md",
                }}
                borderRadius="full"
                aria-describedby="hackathons-hero-description"
              >
                Участвовать
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
              w={{ base: "100%", md: "360px" }}
              mx={{ base: "auto", xl: 0 }}
              borderRadius="full"
              aria-describedby="hackathons-hero-description"
            >
              Стать партнёром
            </Button>
          </Stack>
        </Box>

        <Box
          as="aside"
          flex={{ base: "none", xl: "1 1 340px" }}
          w="full"
          maxW={{ base: "full", md: "720px", xl: "520px" }}
          minW={{ base: 0, xl: "320px" }}
          bg={heroAsideBg}
          borderRadius="2xl"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          px={{ base: 4, md: 6 }}
          py={{ base: 4, md: 6 }}
          boxShadow="lg"
          animation={`${heroAsideFloat} 18s ease-in-out infinite`}
          aria-labelledby="hackathons-hero-benefits-title"
          mx={{ base: "auto", xl: 0 }}
        >
          <Text
            as="h2"
            id="hackathons-hero-benefits-title"
            fontSize={{ base: "sm", md: "md" }}
            color={mutedTextColor}
            mb={3}
          >
            На хакатонах AIFFA вы:
          </Text>
          <Stack
            as="ul"
            role="list"
            listStyleType="none"
            pl={0}
            spacing={2.5}
            fontSize={{ base: "sm", md: "md" }}
          >
            <HStack
              as="li"
              role="listitem"
              align="flex-start"
              spacing={2.5}
            >
              <Icon
                viewBox="0 0 16 16"
                boxSize={4}
                color="green.400"
                mt={0.5}
                aria-hidden="true"
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
            <HStack
              as="li"
              role="listitem"
              align="flex-start"
              spacing={2.5}
            >
              <Icon
                viewBox="0 0 16 16"
                boxSize={4}
                color="green.400"
                mt={0.5}
                aria-hidden="true"
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
            <HStack
              as="li"
              role="listitem"
              align="flex-start"
              spacing={2.5}
            >
              <Icon
                viewBox="0 0 16 16"
                boxSize={4}
                color="green.400"
                mt={0.5}
                aria-hidden="true"
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
            <HStack
              as="li"
              role="listitem"
              align="flex-start"
              spacing={2.5}
            >
              <Icon
                viewBox="0 0 16 16"
                boxSize={4}
                color="green.400"
                mt={0.5}
                aria-hidden="true"
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


