import React from "react";
import NextLink from "next/link";
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Box
      as="section"
      aria-label="Страница не найдена"
      py={{ base: 16, md: 24 }}
      minH="60vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        position="relative"
        maxW="640px"
        w="full"
        px={{ base: 5, md: 8 }}
        py={{ base: 7, md: 10 }}
        borderRadius="2xl"
        bg="surface.elevated"
      >
        <VStack
          spacing={{ base: 6, md: 8 }}
          align="center"
          textAlign="center"
        >
          <HStack spacing={5} align="center" justify="center">
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="extrabold"
              lineHeight="1.1"
            >
              404 — страница не найдена
            </Heading>
          </HStack>

          <Text fontSize={{ base: "md", md: "lg" }} color="text.muted">
            Похоже, вы попали на страницу, которой ещё нет в нашей вселенной.
            Возможно, ссылка устарела или в адресе есть опечатка.
          </Text>

          <HStack spacing={3} pt={2} flexWrap="wrap">
            <Button
              as={NextLink}
              href="/"
              borderRadius="full"
              size="lg"
              bg="blue.600"
              color="white"
              _hover={{ bg: "blue.700" }}
              _active={{ bg: "blue.800" }}
              _focusVisible={{
                boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.9)"
              }}
            >
              На главную
            </Button>
            <Button
              as={NextLink}
              href="/learn"
              variant="ghost"
              borderRadius="full"
              size="lg"
              _light={{ _hover: { bg: "blackAlpha.50" } }}
              _dark={{ _hover: { bg: "whiteAlpha.100" } }}
            >
              К материалам
            </Button>
          </HStack>

          <Text fontSize="sm" color="text.muted">
            Если вы пришли по нашей ссылке, дайте знать в виджете обратной
            связи внизу — это поможет нам сделать Universe лучше.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default NotFound;


