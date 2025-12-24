import React from "react";
import { Box, Heading, HStack, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FiCode } from "react-icons/fi";
import { hackathonWinners } from "../../../model/hackathonWinners";
import HackathonWinnerCard from "./parts/HackathonWinnerCard";
import { useHackathonWinnersColors } from "./colors/useHackathonWinnersColors";
import { getSortedHackathonWinners } from "./helpers/getSortedHackathonWinners";
import type { HackathonWinner } from "../../../model/hackathonWinners";

const headingId = "creators-hackathons-heading";

const HackathonWinnersSection: React.FC = () => {
  const { subtitleColor, iconBorderColor, iconBg, iconColor } = useHackathonWinnersColors();

  if (!hackathonWinners.length) {
    return null;
  }

  const sorted = React.useMemo(() => getSortedHackathonWinners(hackathonWinners as HackathonWinner[]), []);

  return (
    <Box as="section" aria-labelledby={headingId} bg="transparent">
      <VStack align="stretch" spacing={4}>
        <VStack align="center" spacing={3} textAlign="center">
          <HStack spacing={2} align="center" justify="center">
            <Box
              as="span"
              px={2.5}
              py={1.5}
              borderRadius="full"
              borderWidth="1px"
              borderColor={iconBorderColor}
              bg={iconBg}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FiCode} boxSize={3.5} aria-hidden="true" color={iconColor} />
            </Box>
            <Heading id={headingId} as="h2" size="md" letterSpacing="-0.02em">
              Победители Хакатона
            </Heading>
          </HStack>
          <Text fontSize="md" color={subtitleColor} maxW={{ base: "full", md: "640px" }}>
            Здесь мы отмечаем команды, которые заняли призовые места в последнем AIFFA Hackathon #1 — Задача старта. В рамках одного общего задания
            они предложили решения, которые особенно помогли продукту и комьюнити.
          </Text>
        </VStack>

        <Box w="full" minW={0} maxW="100%">
          <SimpleGrid as="ul" listStyleType="none" m={0} p={0} minChildWidth={{ base: "100%", md: "320px" }} spacing={{ base: 4, md: 5 }} alignItems="stretch" w="full" minW={0} maxW="100%">
            {sorted.map((winner) => (
              <Box as="li" key={winner.id} minW={0} w="full" h="full" display="flex">
                <HackathonWinnerCard {...winner} />
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default HackathonWinnersSection;


