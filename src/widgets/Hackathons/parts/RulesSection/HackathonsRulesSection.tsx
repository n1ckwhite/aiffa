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
      w="full"
      minW={0}
      maxW="100%"
    >
      <Box aria-hidden="true">
        <BusinessWorkshopIcon />
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

        <Box 
          w="full" 
          maxW="1200px" 
          mx="auto" 
          minW={0} 
          px={{ base: 0, md: 0 }}
          boxSizing="border-box"
        >
          <SimpleGrid
            as="ul"
            role="list"
            listStyleType="none"
            pl={0}
            minChildWidth={{ base: "100%", sm: "250px", md: "400px" }}
            spacing={{ base: 4, md: 6 }}
            w="full"
            minW={0}
            maxW="100%"
            boxSizing="border-box"
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
                w="full"
                minW={{ base: "100%", sm: "250px", md: "400px" }}
                maxW="100%"
                boxSizing="border-box"
              >
                <Stack spacing={2} w="full" minW={0}>
                  <Stack direction="row" align="center" spacing={3} w="full" minW={0}>
                    <Box
                      borderRadius="full"
                      bg={circleBg}
                      boxSize={8}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      aria-hidden="true"
                      flexShrink={0}
                    >
                      <CheckCircleIcon color="white" boxSize={4} />
                    </Box>
                    <Text fontWeight="semibold" wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal" minW={0} flex={1}>{card.title}</Text>
                  </Stack>
                  <Text fontSize={{ base: "sm", md: "md" }} color={mutedTextColor} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
                    {card.description}
                  </Text>
                </Stack>
              </Box>
            );
          })}
          </SimpleGrid>
        </Box>
      </Stack>
    </Box>
  );
};

export default HackathonsRulesSection;


