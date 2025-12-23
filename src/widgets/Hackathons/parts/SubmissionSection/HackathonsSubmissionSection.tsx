import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CheckCircleIcon, EditIcon, ExternalLinkIcon, ViewIcon } from "@chakra-ui/icons";
import PillBadge from "@/shared/ui/PillBadge";
import { useHackathonsSubmissionSectionColors } from "./colors/useHackathonsSubmissionSectionColors";
import { useHackathonsSubmissionCards } from "./data";

const HackathonsSubmissionSection: React.FC = () => {
  const {
    mutedTextColor,
    sectionCardBg,
    cardBorderColor,
    accentBorderColor,
    submissionBgGradient,
    requirementsCircleBg,
    githubCircleBg,
    readmeCircleBg,
    demoCircleBg,
    descriptionColor,
  } = useHackathonsSubmissionSectionColors();
  const cards = useHackathonsSubmissionCards();

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-submit-title"
    >
      <Box
        position="relative"
        overflow="hidden"
        bgGradient={submissionBgGradient}
        borderRadius="3xl"
        borderWidth="1px"
        borderColor={cardBorderColor}
        px={{ base: 4, md: 8 }}
        py={{ base: 5, md: 8 }}
      >
        <Box
          position="absolute"
          inset="-40px"
          opacity={0.5}
          filter="blur(40px)"
          pointerEvents="none"
          aria-hidden="true"
        >
          <Box
            position="absolute"
            top="-8%"
            left="-10%"
            w={{ base: "220px", md: "260px" }}
            h={{ base: "220px", md: "260px" }}
            bgGradient="radial(teal.300, transparent)"
          />
          <Box
            position="absolute"
            bottom="-16%"
            right="-8%"
            w={{ base: "260px", md: "320px" }}
            h={{ base: "260px", md: "320px" }}
            bgGradient="radial(blue.500, transparent)"
          />
        </Box>

        <Stack
          spacing={{ base: 4, md: 6 }}
          align="center"
          position="relative"
          zIndex={1}
        >
          <Box
            as="header"
            maxW={{ base: "full", md: "720px" }}
            textAlign="center"
          >
            <Box mb={3}>
              <PillBadge colorScheme="blue" variant="outline" uppercase>
                Формат решения
              </PillBadge>
            </Box>
            <Heading
              id="hackathons-submit-title"
              as="h2"
              size="lg"
            >
              Как подать решение
            </Heading>
            <Text
              id="hackathons-submit-description"
              mt={3}
              fontSize={{ base: "md", md: "lg" }}
              color={mutedTextColor}
            >
              Мы используем простой и понятный формат, чтобы снизить страх перед
              участием и помочь вам сфокусироваться на сути задачи.
            </Text>
          </Box>

          <SimpleGrid
            as="ul"
            role="list"
            listStyleType="none"
            pl={0}
            minChildWidth={{ base: "100%", sm: "360px" }}
            spacing={{ base: 4, md: 6 }}
            w="full"
            mx="auto"
          >
            {cards.map((card) => {
              let circleBg = requirementsCircleBg;
              let iconNode: React.ReactNode = <CheckCircleIcon color="white" boxSize={4} />;

              if (card.id === "github") {
                circleBg = githubCircleBg;
                iconNode = <ExternalLinkIcon color="white" boxSize={4} />;
              } else if (card.id === "readme") {
                circleBg = readmeCircleBg;
                iconNode = <EditIcon color="white" boxSize={4} />;
              } else if (card.id === "demo") {
                circleBg = demoCircleBg;
                iconNode = <ViewIcon color="white" boxSize={4} />;
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
                  transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "xl",
                    borderColor: "blue.400",
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
                        {iconNode}
                      </Box>
                      <Text fontWeight="semibold">
                        {card.title}
                      </Text>
                    </Stack>
                    <Text fontSize={{ base: "sm", md: "md" }} color={mutedTextColor}>
                      {card.description}
                    </Text>
                  </Stack>
                </Box>
              );
            })}
          </SimpleGrid>

          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={accentBorderColor}
            p={{ base: 4, md: 5 }}
            w="full"
            boxShadow="0 0 0 1px rgba(59,130,246,0.35)"
          >
            <Stack spacing={2}>
              <Text
                fontSize="xs"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="0.12em"
                color={descriptionColor}
              >
                Важно для участников
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={mutedTextColor}
              >
                После окончания срока приёма решений мы закрепляем итоговый проект в
                командной доске Trello: так у вас остаётся наглядный след участия и
                удобная точка, чтобы вернуться к проекту позже.
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default HackathonsSubmissionSection;


