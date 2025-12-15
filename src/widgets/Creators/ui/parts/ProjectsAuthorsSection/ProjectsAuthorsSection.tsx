import React from "react";
import { Box, Heading, HStack, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FiLayers } from "react-icons/fi";
import { useCreatorsData } from "../../hooks/useCreatorsData";
import CreatorCard from "../CreatorCard";
import { useProjectsAuthorsColors } from "./colors/useProjectsAuthorsColors";
import { getFeaturedProjectCreators } from "./helpers/getFeaturedProjectCreators";
import type { Creator } from "../../../model/types";

const headingId = "creators-projects-heading";

const ProjectsAuthorsSection: React.FC = () => {
  const { items } = useCreatorsData();
  const { subtitleColor, iconBorderColor, iconBg, iconColor } = useProjectsAuthorsColors();

  const featuredProjectCreators = React.useMemo(() => getFeaturedProjectCreators(items as Creator[]), [items]);

  if (featuredProjectCreators.length === 0) {
    return null;
  }

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
              <Icon as={FiLayers} boxSize={3.5} aria-hidden="true" color={iconColor} />
            </Box>
            <Heading id={headingId} as="h2" size="md" letterSpacing="-0.02em">
              Авторы проектов AIFFA
            </Heading>
          </HStack>
          <Text fontSize="sm" color={subtitleColor} maxW={{ base: "full", md: "640px" }}>
            Здесь мы отмечаем авторов и мейнтейнеров проектов AIFFA: ценим не просто число проектов, а их качество и звёзды, которые ставит сообщество
            за вклад и полезность.
          </Text>
        </VStack>

        <Box w="full">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 5 }} alignItems="stretch">
            {featuredProjectCreators.map((creator, index) => (
              <CreatorCard key={creator.id} creator={creator} index={index + 1} mode="projects" />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default ProjectsAuthorsSection;


