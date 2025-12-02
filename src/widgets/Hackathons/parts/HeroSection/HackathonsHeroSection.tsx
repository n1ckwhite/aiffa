import React from "react";
import {
  Badge,
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useHackathonsColors } from "../../colors/useHackathonsColors";

const HackathonsHeroSection: React.FC = () => {
  const { heroAsideBg, mutedTextColor } = useHackathonsColors();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-hero-title"
      pt={{ base: 2, md: 0 }}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 8, md: 10 }}
        align={{ base: "flex-start", md: "center" }}
      >
        <Box flex="1" maxW={{ base: "full", md: "60%" }}>
          <Badge
            colorScheme="blue"
            variant="subtle"
            borderRadius="full"
            px={3}
            py={1}
            mb={4}
          >
            Форматы для прокачки в реальных задачах
          </Badge>

          <Heading
            id="hackathons-hero-title"
            as="h1"
            size={isMobile ? "lg" : "xl"}
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
            <Button
              as="a"
              href="https://trello.com"
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="blue"
              size="lg"
            >
              Участвовать в хакатонах
            </Button>
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
  );
};

export default HackathonsHeroSection;


