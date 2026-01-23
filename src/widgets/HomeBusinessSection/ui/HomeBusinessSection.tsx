"use client";

import React from "react";
import { Box, Container, Heading, HStack, Icon, Stack, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FiCheckCircle } from "react-icons/fi";
import { AppButtonLink } from "@/shared/ui/AppLink";

const HomeBusinessSection: React.FC = () => {
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");

  const values = [
    "Тестовые задания и хакатоны под ваш стек",
    "Топ‑кандидаты по XP, задачам и проектам",
    "Отчёты по вовлечённости и прогрессу",
  ];

  return (
    <Box as="section" px={0} py={{ base: 12, md: 16 }}>
      <Container maxW="1200px">
        <Box borderWidth="1px" borderColor={borderColor} borderRadius="3xl" bg={cardBg} p={{ base: 6, md: 8 }}>
          <Stack spacing={{ base: 5, md: 7 }} align="stretch">
            <VStack spacing={3} align="flex-start" maxW="820px">
              <Heading as="h2" size={{ base: "md", md: "lg" }} letterSpacing="-0.02em" color={titleColor}>
                AIFFA для компаний
              </Heading>
              <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                Платформа, где джуны подтверждают навыки действием: задачи, проекты, хакатоны.
                Для компаний — доступ к кандидатам с живым кодом и понятными метриками.
              </Text>
            </VStack>

            <VStack spacing={3} align="stretch">
              {values.map((item) => (
                <HStack key={item} spacing={3} align="flex-start">
                  <Icon as={FiCheckCircle} color="green.500" boxSize={5} mt={0.5} />
                  <Text color={textColor} fontSize={{ base: "sm", md: "md" }} lineHeight="1.6">
                    {item}
                  </Text>
                </HStack>
              ))}
            </VStack>

            <AppButtonLink to="/partners" colorScheme="yellow" borderRadius="full" px={{ base: 6, md: 7 }} alignSelf="flex-start">
              Перейти в раздел "Партнёрство"
            </AppButtonLink>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeBusinessSection;
