import React from "react";
import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useHackathonsPrizeSectionColors } from "./colors/useHackathonsPrizeSectionColors";
import { useHackathonsPrizeTiers } from "./data";
import { BusinessTeamLottieIcon } from "@/shared/icons/components-icon";
import PillBadge from "@/shared/ui/PillBadge";

const HackathonsPrizeSection: React.FC = () => {
  const { sectionCardBg, cardBorderColor, mutedTextColor, prizeBgGradient } =
    useHackathonsPrizeSectionColors();
  const prizeTiers = useHackathonsPrizeTiers();

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-prize-title"
      w="full"
      minW={0}
      maxW="100%"
    >
      <Box
        position="relative"
        overflow="hidden"
        bgGradient={prizeBgGradient}
        borderRadius="3xl"
        borderWidth="1px"
        borderColor={cardBorderColor}
        px={{ base: 5, md: 8 }}
        pt={{ base: 6, md: 8 }}
        pb={{ base: 6, md: 8 }}
        w="full"
        minW={0}
        maxW="100%"
        boxSizing="border-box"
      >
        <Stack
          spacing={0}
          align="center"
          position="relative"
          zIndex={2}
          w="full"
          minW={0}
        >
          <Box textAlign="center" w="full" minW={0}>
            <Box mb={3}>
            <PillBadge colorScheme="purple" variant="outline">
              Призовой фонд
            </PillBadge>
            </Box>
            <Heading
              id="hackathons-prize-title"
              as="h2"
              size={{ base: "md", md: "lg" }}
            >
              100&nbsp;000&nbsp;₽ — призы для трёх сильнейших команд
            </Heading>
            <Text
              mt={3}
              fontSize={{ base: "md", md: "lg" }}
              color={mutedTextColor}
            >
              Мы хотим, чтобы участие было не только про опыт и портфолио, но и
              про заметную награду для команд, которые выложились по максимуму.
              Помимо денежного приза, победители и призёры получают мерч AIFFA —
              чтобы хакатон остался с вами не только в резюме, но и в вещах.
            </Text>
          </Box>

          <Box aria-hidden="true">
            <BusinessTeamLottieIcon />
          </Box>

          <Box w="full" maxW="980px" mx="auto" minW={0} boxSizing="border-box" px={{ base: 0, md: 0 }}>
            <SimpleGrid
              as="ul"
              role="list"
              listStyleType="none"
              pl={0}
              minChildWidth={{ base: "100%", sm: "200px" }}
              w="full"
              minW={0}
              maxW="100%"
              spacing={{ base: 4, md: 6 }}
              boxSizing="border-box"
            >
            {prizeTiers.map((tier) => (
              <Box
                key={tier.id}
                as="li"
                role="listitem"
                bg={sectionCardBg}
                borderRadius="2xl"
                borderWidth="1px"
                borderColor={cardBorderColor}
                p={{ base: 4, md: 5 }}
                textAlign="center"
                w="full"
                minW={{ base: "100%", sm: "200px" }}
                maxW="100%"
                boxSizing="border-box"
                flexShrink={0}
              >
                <Stack
                  direction="row"
                  align="center"
                  justify="center"
                  spacing={2}
                  mb={2}
                  w="full"
                  minW={0}
                >
                  <StarIcon color={tier.accentColor} flexShrink={0} />
                  <Heading
                    as="h3"
                    fontSize="sm"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="0.08em"
                    wordBreak="break-word"
                    overflowWrap="anywhere"
                    whiteSpace="normal"
                    minW={0}
                  >
                    {tier.placeLabel}
                  </Heading>
                </Stack>
                <Text
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="bold"
                  wordBreak="break-word"
                  overflowWrap="anywhere"
                  whiteSpace="normal"
                >
                  {tier.amountLabel}
                </Text>
                <Text
                  mt={2}
                  fontSize="sm"
                  color={mutedTextColor}
                  wordBreak="break-word"
                  overflowWrap="anywhere"
                  whiteSpace="normal"
                >
                  {tier.description}
                </Text>
              </Box>
            ))}
            </SimpleGrid>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default HackathonsPrizeSection;


