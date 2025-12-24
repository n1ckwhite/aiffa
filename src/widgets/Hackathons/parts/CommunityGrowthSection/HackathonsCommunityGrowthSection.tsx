import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import PillBadge from "@/shared/ui/PillBadge";
import { communityCardFloat, communityMetricPulse } from "./animations";
import { useHackathonsCommunityGrowthSectionColors } from "./colors/useHackathonsCommunityGrowthSectionColors";
import { useHackathonsCommunityMetrics } from "./data";

const HackathonsCommunityGrowthSection: React.FC = () => {
  const {
    sectionCardBg,
    cardBorderColor,
    mutedTextColor,
    communityBgGradient,
  } = useHackathonsCommunityGrowthSectionColors();
  const metrics = useHackathonsCommunityMetrics();

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-community-growth-title"
    >
      <Box
        position="relative"
        overflow="hidden"
        bgGradient={communityBgGradient}
        borderRadius="3xl"
        borderWidth="1px"
        borderColor={cardBorderColor}
        px={{ base: 4, md: 8 }}
        py={{ base: 5, md: 8 }}
      >
        <Stack
          spacing={{ base: 4, md: 6 }}
          align="center"
          position="relative"
          zIndex={1}
          w="full"
          minW={0}
        >
          <Box
            as="header"
            textAlign="center"
            maxW={{ base: "full", md: "640px" }}
            w="full"
            minW={0}
          >
            <Box mb={3}>
              <PillBadge colorScheme="blue" variant="outline" uppercase>
                Рост коммьюнити
              </PillBadge>
            </Box>
            <Heading
              id="hackathons-community-growth-title"
              as="h2"
              fontSize={{ base: "xl", md: "2xl" }}
            >
              Рост коммьюнити AIFFA
            </Heading>
            <Text
              id="hackathons-community-growth-description"
              mt={3}
              fontSize={{ base: "md", md: "lg" }}
              color={mutedTextColor}
            >
              Живое сообщество и регулярная активность создают среду, в
              которой хочется расти и возвращаться к задачам и хакатонам.
            </Text>
          </Box>

          <Box w="full" maxW="1200px" mx="auto" minW={0} boxSizing="border-box">
            <SimpleGrid
              as="ul"
              role="list"
              listStyleType="none"
              pl={0}
              minChildWidth={{ base: "100%", sm: "180px", md: "200px" }}
              spacing={{ base: 4, md: 6 }}
              mt={{ base: 2, md: 4 }}
              w="full"
              minW={0}
              maxW="100%"
              boxSizing="border-box"
            >
            {metrics.map((metric, index) => {
              const animationDurationSeconds = 18 + index * 2;

              return (
                <Box
                  key={metric.id}
                  as="li"
                  role="listitem"
                  bg={sectionCardBg}
                  borderRadius="2xl"
                  borderWidth="1px"
                  borderColor={cardBorderColor}
                  p={{ base: 4, md: 5 }}
                  textAlign="center"
                  animation={`${communityCardFloat} ${animationDurationSeconds}s ease-in-out infinite`}
                  aria-describedby="hackathons-community-growth-description"
                  w="full"
                  minW={{ base: "100%", sm: "180px", md: "200px" }}
                  maxW="100%"
                  boxSizing="border-box"
                >
                  <Text
                    fontSize={{ base: "2xl", md: "3xl" }}
                    fontWeight="bold"
                    bgGradient="linear(to-r, teal.300, blue.400)"
                    _dark={{ bgGradient: "linear(to-r, teal.200, blue.300)" }}
                    bgClip="text"
                    animation={`${communityMetricPulse} 7s ease-in-out infinite`}
                    wordBreak="break-word"
                    overflowWrap="anywhere"
                    whiteSpace="normal"
                  >
                    {metric.valueLabel}
                  </Text>
                  <Text
                    mt={1}
                    fontSize={{ base: "sm", md: "md" }}
                    color={mutedTextColor}
                    wordBreak="break-word"
                    overflowWrap="anywhere"
                    whiteSpace="normal"
                  >
                    {metric.description}
                  </Text>
                </Box>
              );
            })}
            </SimpleGrid>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default HackathonsCommunityGrowthSection;


