import React from "react";
import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import PillBadge from "@/shared/ui/PillBadge";
import { useHackathonsFinalCtaSectionColors } from "./colors/useHackathonsFinalCtaSectionColors";

const HackathonsFinalCtaSection: React.FC = () => {
  const {
    mutedTextColor,
    accentBorderColor,
    finalCtaBgGradient,
    partnerBorderColor,
    partnerBg,
    partnerHoverBg,
  } = useHackathonsFinalCtaSectionColors();

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-final-cta-title"
      display="flex"
      justifyContent="center"
      w="full"
    >
      <Box
        position="relative"
        overflow="hidden"
        bgGradient={finalCtaBgGradient}
        borderRadius="3xl"
        borderWidth="1px"
        borderColor={accentBorderColor}
        px={{ base: 3, sm: 4, md: 8 }}
        py={{ base: 5, md: 8 }}
        maxW="1200px"
        mx="auto"
        w="full"
        flex="1 1 auto"
      >
        <Box
          position="absolute"
          inset="-40px"
          opacity={0.6}
          filter="blur(42px)"
          pointerEvents="none"
          aria-hidden="true"
        >
          <Box
            position="absolute"
            top="-10%"
            left="-12%"
            w={{ base: "240px", md: "280px" }}
            h={{ base: "240px", md: "280px" }}
            bgGradient="radial(circle at 30% 30%, rgba(59,130,246,0.9), transparent)"
          />
          <Box
            position="absolute"
            bottom="-18%"
            right="-8%"
            w={{ base: "260px", md: "320px" }}
            h={{ base: "260px", md: "320px" }}
            bgGradient="radial(circle at 70% 70%, rgba(244,114,182,0.85), transparent)"
          />
        </Box>

        <Stack
          direction="column"
          spacing={{ base: 5, md: 6 }}
          align="center"
          justify="center"
          position="relative"
          zIndex={1}
        >
          <Box
            as="header"
            textAlign={{ base: "center", md: "center" }}
            mx={{ base: "auto", md: 0 }}
          >
            <Box mb={3}>
              <PillBadge colorScheme="blue" variant="outline" uppercase>
                Финальный шаг
              </PillBadge>
            </Box>
            <Heading
              id="hackathons-final-cta-title"
              as="h2"
              fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
            >
              Готовы попробовать себя в хакатоне или прийти как партнёр?
            </Heading>
            <Text
              id="hackathons-final-cta-description"
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
            direction={{ base: "column", md: "row" }}
            spacing={4}
            w="full"
            justify="center"
            align={{ base: "stretch", md: "center" }}
            maxW={{ base: "full", md: "unset" }}
            mx="auto"
          >
            <Button
              as="a"
              href="https://t.me/nickwhite_web"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              fontWeight="semibold"
              px={{ base: 6, md: 8 }}
              py={{ base: 3, md: 3.5 }}
              w={{ base: "100%", md: "auto" }}
              minW={{ md: "220px" }}
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
              aria-describedby="hackathons-final-cta-description"
            >
              Участвовать в хакатоне
            </Button>
            <Button
              as="a"
              href="/partners"
              variant="outline"
              size="lg"
              fontWeight="semibold"
              px={{ base: 6, md: 8 }}
              py={{ base: 3, md: 3.5 }}
              w={{ base: "100%", md: "auto" }}
              minW={{ md: "220px" }}
              borderColor={partnerBorderColor}
              bg={partnerBg}
              _hover={{
                bg: partnerHoverBg,
                borderColor: accentBorderColor,
              }}
              borderRadius="full"
              aria-describedby="hackathons-final-cta-description"
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


