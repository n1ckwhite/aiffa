import React from "react";
import { Box, Container, Heading, HStack, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FiAward, FiEdit3, FiGitPullRequest, FiStar } from "react-icons/fi";
import { AppButtonLink } from "@/shared/ui/AppLink";

const HomeCreatorsPreviewSection: React.FC = () => {
  return (
    <Box as="section" aria-labelledby="home-creators-title" px={0} py={{ base: 12, md: 16 }}>
      <Container maxW="1200px">
        <VStack spacing={{ base: 6, md: 10 }} align="center">
          <VStack spacing={3} textAlign="center" maxW="820px">
            <Heading
              id="home-creators-title"
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
            >
              Создатели, награды и уважение к вкладу
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" _dark={{ color: "gray.300" }} lineHeight="1.7">
              В AIFFA ценят не статус, а пользу. Лучшие авторы материалов, задач, статей и проектов получают признание и
              попадают в “Создатели”.
            </Text>
          </VStack>

          <SimpleGrid minChildWidth={{ base: "100%", md: "280px" }} spacing={{ base: 4, md: 5 }} w="full">
            <Box
              borderWidth="1px"
              borderColor="blackAlpha.200"
              _dark={{ borderColor: "whiteAlpha.200" }}
              borderRadius="2xl"
              p={{ base: 5, md: 6 }}
              bg="transparent"
            >
              <HStack spacing={3} align="flex-start">
                <Box
                  w="44px"
                  h="44px"
                  borderRadius="xl"
                  bg="blue.50"
                  color="blue.700"
                  _dark={{ bg: "whiteAlpha.200", color: "blue.200" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FiGitPullRequest} boxSize={5} aria-hidden="true" />
                </Box>
                <Box minW={0}>
                  <Text fontWeight="bold">Вклад</Text>
                  <Text mt={2} fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }} lineHeight="1.6">
                    Добавляй задачи, улучшай материалы, поддерживай проекты, помогай на хакатонах и в обсуждениях.
                  </Text>
                </Box>
              </HStack>
            </Box>

            <Box
              borderWidth="1px"
              borderColor="blackAlpha.200"
              _dark={{ borderColor: "whiteAlpha.200" }}
              borderRadius="2xl"
              p={{ base: 5, md: 6 }}
              bg="transparent"
            >
              <HStack spacing={3} align="flex-start">
                <Box
                  w="44px"
                  h="44px"
                  borderRadius="xl"
                  bg="purple.50"
                  color="purple.700"
                  _dark={{ bg: "whiteAlpha.200", color: "purple.200" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FiStar} boxSize={5} aria-hidden="true" />
                </Box>
                <Box minW={0}>
                  <Text fontWeight="bold">Отклик</Text>
                  <Text mt={2} fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }} lineHeight="1.6">
                    Звёзды и обратная связь показывают, что вклад реально помогает людям — именно это важнее всего.
                  </Text>
                </Box>
              </HStack>
            </Box>

            <Box
              borderWidth="1px"
              borderColor="blackAlpha.200"
              _dark={{ borderColor: "whiteAlpha.200" }}
              borderRadius="2xl"
              p={{ base: 5, md: 6 }}
              bg="transparent"
            >
              <HStack spacing={3} align="flex-start">
                <Box
                  w="44px"
                  h="44px"
                  borderRadius="xl"
                  bg="green.50"
                  color="green.700"
                  _dark={{ bg: "whiteAlpha.200", color: "green.200" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FiAward} boxSize={5} aria-hidden="true" />
                </Box>
                <Box minW={0}>
                  <Text fontWeight="bold">Признание</Text>
                  <Text mt={2} fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }} lineHeight="1.6">
                    Топы по направлениям, победители хакатонов и благодарность комьюнити — это часть культуры.
                  </Text>
                </Box>
              </HStack>
            </Box>
          </SimpleGrid>

          <HStack spacing={{ base: 3, md: 4 }} flexWrap="wrap" justify="center">
            <AppButtonLink to="/creators" borderRadius="full" colorScheme="blue" px={{ base: 6, md: 7 }}>
              Открыть создателей
            </AppButtonLink>
            <AppButtonLink to="/creators" borderRadius="full" variant="outline" px={{ base: 6, md: 7 }}>
              Как попасть в подборку
            </AppButtonLink>
            <AppButtonLink to="/blog" borderRadius="full" variant="outline" px={{ base: 6, md: 7 }} leftIcon={<Icon as={FiEdit3} />}>
              Читать блог
            </AppButtonLink>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default HomeCreatorsPreviewSection;

