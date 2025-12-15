import React from "react";
import { Box, Heading, Text, SimpleGrid, VStack, HStack, Icon, useColorModeValue } from "@chakra-ui/react";
import { FiLayers } from "react-icons/fi";
import { useCreatorsData } from "../hooks/useCreatorsData";
import CreatorCard from "./CreatorCard";

const ProjectsAuthorsSection: React.FC = () => {
  const { items } = useCreatorsData();
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const iconBorderColor = useColorModeValue("teal.400", "teal.300");
  const iconBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const iconColor = useColorModeValue("teal.500", "teal.300");

  const projectCreators = React.useMemo(() => {
    if (!items || items.length === 0) {
      return [];
    }
    return items.filter((creator) => creator.areas?.includes("projects"));
  }, [items]);

  const featuredProjectCreators = React.useMemo(() => {
    if (projectCreators.length === 0) {
      return [];
    }

    return [...projectCreators].sort((a, b) => b.contributions.projects - a.contributions.projects);
  }, [projectCreators]);

  if (featuredProjectCreators.length === 0) {
    return null;
  }

  return (
    <Box as="section" aria-label="Авторы проектов AIFFA" bg="transparent">
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
            <Heading as="h2" size="md" letterSpacing="-0.02em">
              Авторы проектов AIFFA
            </Heading>
          </HStack>
          <Text fontSize="sm" color={subtitleColor} maxW={{ base: "full", md: "640px" }}>
            Здесь мы отмечаем авторов и мейнтейнеров проектов AIFFA: ценим не просто число проектов, а их качество и звёзды,
            которые ставит сообщество за вклад и полезность.
          </Text>
        </VStack>

        <Box w="full">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 5 }} alignItems="stretch">
            {featuredProjectCreators.slice(0, 3).map((creator, index) => (
              <CreatorCard key={creator.id} creator={creator} index={index + 1} mode="projects" />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default ProjectsAuthorsSection;


