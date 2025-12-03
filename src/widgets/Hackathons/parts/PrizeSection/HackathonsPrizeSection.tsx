import React from "react";
import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useHackathonsPrizeSectionColors } from "./colors/useHackathonsPrizeSectionColors";
import { prizeBlobA, prizeBlobB, prizeGlow, prizeShimmer } from "./animations";
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
        animation={`${prizeGlow} 5s ease-out infinite`}
      >
        <Box
          position="absolute"
          inset="-40px"
          opacity={0.6}
          filter="blur(44px)"
          pointerEvents="none"
          zIndex={0}
        >
          <Box
            position="absolute"
            top={{ base: "55%", md: "25%" }}
            left="-8%"
            w={{ base: "220px", md: "260px" }}
            h={{ base: "220px", md: "260px" }}
            bgGradient="radial(pink.400, transparent)"
            animation={`${prizeBlobA} 20s ease-in-out infinite`}
          />
          <Box
            position="absolute"
            bottom="-12%"
            right="-6%"
            w={{ base: "260px", md: "320px" }}
            h={{ base: "260px", md: "320px" }}
            bgGradient="radial(purple.500, transparent)"
            animation={`${prizeBlobB} 24s ease-in-out infinite`}
          />
        </Box>

        <Box
          position="absolute"
          top="0"
          left="-40%"
          h="3px"
          w="40%"
          bgGradient="linear(to-r, transparent, whiteAlpha.900, transparent)"
          opacity={0.9}
          animation={`${prizeShimmer} 7s ease-in-out infinite`}
          zIndex={1}
        />

        <Stack
          spacing={0}
          align="center"
          position="relative"
          zIndex={2}
        >
          <Box textAlign="center">
            <PillBadge colorScheme="purple" variant="solid">
              Призовой фонд
            </PillBadge>
            <Heading
              id="hackathons-prize-title"
              as="h2"
              size="lg"
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

          <SimpleGrid
            as="ul"
            role="list"
            listStyleType="none"
            pl={0}
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 4, md: 6 }}
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
              >
                <Stack
                  direction="row"
                  align="center"
                  justify="center"
                  spacing={2}
                  mb={2}
                >
                  <StarIcon color={tier.accentColor} />
                  <Heading
                    as="h3"
                    fontSize="sm"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="0.08em"
                  >
                    {tier.placeLabel}
                  </Heading>
                </Stack>
                <Text
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="bold"
                >
                  {tier.amountLabel}
                </Text>
                <Text
                  mt={2}
                  fontSize="sm"
                  color={mutedTextColor}
                >
                  {tier.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Box>
    </Box>
  );
};

export default HackathonsPrizeSection;


