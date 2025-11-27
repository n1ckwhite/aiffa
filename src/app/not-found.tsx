import React from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Box
      as="section"
      aria-label="Страница не найдена"
      py={{ base: 8, md: 24 }}
      px={{ base: 4, md: 0 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        position="relative"
        maxW={{ base: "100%", sm: "540px", md: "640px" }}
        w="full"
        borderRadius={{ base: "xl", md: "2xl" }}
      >
        <VStack
          spacing={{ base: 6, md: 8 }}
          align="center"
          textAlign="center"
        >
          <Box
            mb={2}
            borderRadius="full"
            boxSize={{ base: 20, md: 24 }}
            backgroundColor={"blue.600"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 18px 45px rgba(15, 23, 42, 0.45)"
          >
            <Box
              as="svg"
              viewBox="0 0 24 24"
              boxSize={{ base: 10, md: 12 }}
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="2" />
              <path
                d="M9 9h.01M15 9h.01M9 15c.8-1 1.9-1.5 3-1.5s2.2.5 3 1.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Box>
          </Box>
          <HStack spacing={5} align="center" justify="center">
            <Heading
              as="h1"
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              fontWeight="extrabold"
              lineHeight={{ base: "1.15", md: "1.1" }}
            >
              404 — страница не найдена
            </Heading>
          </HStack>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="text"
            maxW="32rem"
          >
            Похоже, вы попали на страницу, которой ещё нет.
            Возможно, ссылка устарела или в адресе есть опечатка.
          </Text>

          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={3}
            w="full"
            justify="center"
          >
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
              w={{ base: "full", sm: "auto" }}
            >
              К материалам
            </Button>
          </Stack>

          <Text fontSize="sm" color="text" maxW="32rem">
            Если вы пришли по нашей ссылке, дайте знать в виджете обратной
            связи внизу — это поможет нам сделать AIFFA лучше.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default NotFound;


