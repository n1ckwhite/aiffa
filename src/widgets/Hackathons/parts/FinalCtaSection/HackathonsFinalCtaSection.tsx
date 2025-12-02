import React from "react";
import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useHackathonsColors } from "../../colors/useHackathonsColors";

const HackathonsFinalCtaSection: React.FC = () => {
  const { sectionCardBg, cardBorderColor, mutedTextColor } = useHackathonsColors();

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-final-cta-title"
      pt={{ base: 4, md: 8 }}
      pb={{ base: 2, md: 4 }}
    >
      <Box
        bg={sectionCardBg}
        borderRadius="3xl"
        borderWidth="1px"
        borderColor={cardBorderColor}
        px={{ base: 5, md: 8 }}
        py={{ base: 6, md: 8 }}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 6, md: 8 }}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
        >
          <Box maxW={{ base: "full", md: "60%" }}>
            <Heading
              id="hackathons-final-cta-title"
              as="h2"
              size="lg"
            >
              Готовы попробовать себя в хакатоне или прийти как партнёр?
            </Heading>
            <Text
              mt={3}
              fontSize={{ base: "md", md: "lg" }}
              color={mutedTextColor}
            >
              Присоединяйтесь к хакатонам AIFFA, чтобы собрать сильный кейс,
              прокачать навыки и познакомиться с единомышленниками. Или приходите
              как партнёр — предложите свою задачу и поработайте с мотивированными
              разработчиками.
            </Text>
          </Box>

          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={4}
            w={{ base: "full", md: "auto" }}
          >
            <Button
              as="a"
              href="https://trello.com"
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="blue"
              size="lg"
              w={{ base: "full", sm: "auto" }}
            >
              Участвовать в хакатоне
            </Button>
            <Button
              as="a"
              href="/partners"
              variant="outline"
              size="lg"
              w={{ base: "full", sm: "auto" }}
            >
              Стать партнёром
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default HackathonsFinalCtaSection;


