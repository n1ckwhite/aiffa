import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { BusinessWorkshopIcon } from "@/shared/icons/components-icon";
import { rulesCardFloat } from "./animations";
import { useHackathonsRulesSectionColors } from "./colors/useHackathonsRulesSectionColors";
import { useHackathonsRuleCards } from "./data";

const HackathonsRulesSection: React.FC = () => {
  const {
    mutedTextColor,
    sectionCardBg,
    cardBorderColor,
    accentBorderColor,
    deadlinesCircleBg,
    formatCircleBg,
    codeCircleBg,
    limitsCircleBg,
  } = useHackathonsRulesSectionColors();
  const ruleCards = useHackathonsRuleCards();

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-rules-title"
    >
      <Box aria-hidden="true">
        <BusinessWorkshopIcon />
      </Box>
      <Stack spacing={{ base: 4, md: 6 }} align="center">
        <Box
          as="header"
          maxW={{ base: "full", md: "720px" }}
          textAlign="center"
        >
          <Heading
            id="hackathons-rules-title"
            as="h2"
            size="lg"
          >
            Правила участия
          </Heading>
          <Text
            id="hackathons-rules-description"
            mt={3}
            fontSize={{ base: "md", md: "lg" }}
            color={mutedTextColor}
          >
            Минимальный набор правил, чтобы формат оставался честным и комфортным
            для всех участников.
          </Text>
        </Box>

        <SimpleGrid
          as="ul"
          role="list"
          listStyleType="none"
          pl={0}
          minChildWidth={{ base: "100%", sm: "400px" }}
          spacing={{ base: 4, md: 6 }}
          w="full"
          maxW="1200px"
          mx="auto"
        >
          {ruleCards.map((card, index) => {
            const animationDurationSeconds = 20 + index * 2;

            let circleBg = deadlinesCircleBg;
            if (card.id === "format") {
              circleBg = formatCircleBg;
            } else if (card.id === "code") {
              circleBg = codeCircleBg;
            } else if (card.id === "limits") {
              circleBg = limitsCircleBg;
            }

            return (
              <Box
                key={card.id}
                as="li"
                role="listitem"
                bg={sectionCardBg}
                borderRadius="2xl"
                borderWidth="1px"
                borderColor={cardBorderColor}
                p={{ base: 4, md: 5 }}
                animation={`${rulesCardFloat} ${animationDurationSeconds}s ease-in-out infinite`}
                transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
                _hover={{
                  transform: "translateY(-6px)",
                  boxShadow: "xl",
                  borderColor: accentBorderColor,
                }}
              >
                <Stack spacing={2}>
                  <Stack direction="row" align="center" spacing={3}>
                    <Box
                      borderRadius="full"
                      bg={circleBg}
                      boxSize={8}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      aria-hidden="true"
                    >
                      <CheckCircleIcon color="white" boxSize={4} />
                    </Box>
                    <Text fontWeight="semibold">{card.title}</Text>
                  </Stack>
                  <Text fontSize={{ base: "sm", md: "md" }} color={mutedTextColor}>
                    {card.description}
                  </Text>
                </Stack>
              </Box>
            );
          })}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default HackathonsRulesSection;


