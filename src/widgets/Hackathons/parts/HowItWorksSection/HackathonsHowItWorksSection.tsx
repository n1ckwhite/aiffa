import React from "react";
import { Box, Circle, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import BusinessAnalyticsIcon from "@/shared/icons/components-icon/BusinessAnatyticsIcon";
import { useHackathonsHowItWorksSectionColors } from "./colors/useHackathonsHowItWorksSectionColors";
import { useHackathonsHowItWorksSteps } from "./data";

const HackathonsHowItWorksSection: React.FC = () => {
  const {
    stepLineColor,
    stepNumberBg,
    stepNumberColor,
    stepCardBg,
    mutedTextColor,
  } = useHackathonsHowItWorksSectionColors();
  const steps = useHackathonsHowItWorksSteps();

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-how-title"
    >
      <Box aria-hidden="true">
        <BusinessAnalyticsIcon />
      </Box>
      <Stack spacing={{ base: 4, md: 6 }} align="center" w="full" minW={0}>
        <Box
          as="header"
          maxW={{ base: "full", md: "720px" }}
          textAlign="center"
          w="full"
          minW={0}
        >
          <Heading
            id="hackathons-how-title"
            as="h2"
            size="lg"
          >
            Как проходят хакатоны AIFFA
          </Heading>
          <Text
            id="hackathons-how-description"
            mt={3}
            fontSize={{ base: "md", md: "lg" }}
            color={mutedTextColor}
          >
            Мы стараемся, чтобы формат был одновременно интенсивным и
            поддерживающим: с понятными ожиданиями, прозрачными критериями и
            вниманием к участникам.
          </Text>
        </Box>

        <Box w="full" maxW="1200px" mx="auto" minW={0} px={{ base: 0, md: 0 }}>
          <SimpleGrid
            as="ol"
            role="list"
            listStyleType="none"
            pl={0}
            minChildWidth={{ base: "100%", md: "400px" }}
            spacing={{ base: 4, md: 6 }}
            mt={{ base: 4, md: 6 }}
            w="full"
            minW={0}
            maxW="100%"
            boxSizing="border-box"
          >
          {steps.map((step) => (
            <Stack
              key={step.id}
              as="li"
              role="listitem"
              direction="row"
              spacing={4}
              align="flex-start"
              w="full"
              minW={{ base: "100%", md: "400px" }}
              maxW="100%"
              boxSizing="border-box"
            >
              <Box
                position="relative"
              >
                <Circle
                  size="32px"
                  bg={stepNumberBg}
                  color={stepNumberColor}
                  fontWeight="semibold"
                  fontSize="sm"
                  aria-hidden="true"
                >
                  {step.number}
                </Circle>
              </Box>

              <Box
                flex="1"
                bg={stepCardBg}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={stepLineColor}
                p={{ base: 3, md: 4 }}
                minW={0}
                w="full"
              >
                <Heading as="h3" size="sm" mb={1} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
                  {step.title}
                </Heading>
                <Text fontSize="sm" color={mutedTextColor} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
                  {step.description}
                </Text>
              </Box>
            </Stack>
          ))}
          </SimpleGrid>
        </Box>

        <Box mt={{ base: 4, md: 6 }}>
          <Heading
            as="h3"
            size="md"
            mb={2}
            display="inline-flex"
            alignItems="center"
            gap={2}
          >
            <InfoIcon
              boxSize={4}
              color={mutedTextColor}
              aria-hidden="true"
            />
            Почему это важно
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color={mutedTextColor}>
            Пошаговый и прозрачный формат снимает страх у новичков и помогает понять,
            чего ожидать от хакатона. Когда ясно, что будет происходить на каждом
            этапе, легче решиться на участие, доверять процессу и получать удовольствие
            от работы в команде.
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default HackathonsHowItWorksSection;


