import React from "react";
import {
  Box,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { StarIcon, ChatIcon, ArrowUpIcon } from "@chakra-ui/icons";
import PillBadge from "@/shared/ui/PillBadge";
import PersonLottieIcon from "@/shared/icons/components-icon/PersonLottieIcon";
import { overviewCardFloat } from "./animations";
import { useHackathonsOverviewSectionColors } from "./colors/useHackathonsOverviewSectionColors";
import { useHackathonsOverviewCards } from "./data";

const HackathonsOverviewSection: React.FC = () => {
  const {
    sectionCardBg,
    cardBorderColor,
    mutedTextColor,
    accentBorderColor,
    iconCircleBg,
  } = useHackathonsOverviewSectionColors();
  const overviewCards = useHackathonsOverviewCards();

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-overview-title"
    >
      <Box aria-hidden="true">
        <PersonLottieIcon />
      </Box>
      <Stack spacing={{ base: 4, md: 6 }} align="center">
        <Box
          as="header"
          maxW={{ base: "full", md: "720px" }}
          textAlign="center"
        >
          <Box mb={3}>
            <PillBadge colorScheme="purple" variant="outline" uppercase>
              Для кого подойдут хакатоны
            </PillBadge>
          </Box>
          <Heading
            id="hackathons-overview-title"
            as="h2"
            fontSize={{ base: "xl", md: "2xl" }}
          >
            Формат для разработчиков, которые хотят расти быстрее
          </Heading>
          <Text
            id="hackathons-overview-description"
            mt={3}
            fontSize={{ base: "md", md: "lg" }}
            color={mutedTextColor}
          >
            Хакатоны AIFFA подойдут тем, кто уже пишет код и хочет попробовать
            себя в боевых задачах: от джунов и мидлов до тимлидов, которые
            хотят поддерживать форму и прокачивать софтскиллы.
          </Text>
        </Box>

        <SimpleGrid
          as="ul"
          role="list"
          listStyleType="none"
          pl={0}
          minChildWidth={{ base: "100%", sm: "360px" }}
          spacing={{ base: 4, md: 6 }}
          mt={{ base: 4, md: 6 }}
          w="full"
          maxW="1200px"
          mx="auto"
        >
          {overviewCards.map((card, index) => {
            const animationDurationSeconds = 18 + index * 2;

            let iconNode: React.ReactNode;
            if (card.id === "practice") {
              iconNode = <StarIcon boxSize={4} color="yellow.400" />;
            } else if (card.id === "teamwork") {
              iconNode = <Icon as={ChatIcon} boxSize={4} color="blue.400" />;
            } else {
              iconNode = <Icon as={ArrowUpIcon} boxSize={4} color="purple.400" />;
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
                animation={`${overviewCardFloat} ${animationDurationSeconds}s ease-in-out infinite`}
                transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
                _hover={{
                  transform: "translateY(-6px)",
                  boxShadow: "xl",
                  borderColor: accentBorderColor,
                }}
              >
                <HStack align="flex-start" spacing={3} mb={2.5}>
                  <Box
                    borderRadius="full"
                    bg={iconCircleBg}
                    boxSize={8}
                    flexShrink={0}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    aria-hidden="true"
                  >
                    {iconNode}
                  </Box>
                  <Heading as="h3" size="md">
                    {card.title}
                  </Heading>
                </HStack>
                <Text fontSize="sm" color={mutedTextColor}>
                  {card.description}
                </Text>
              </Box>
            );
          })}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default HackathonsOverviewSection;


