"use client";

import { useEffect } from "react";
import {
  Box,
  Heading,
  HStack,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { ErrorIcon } from "@/shared/icons/components-icon";
import { AppButtonLink } from "@/shared/ui/AppLink";

const NotFound = () => {

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.scrollTo(0, 0);
  }, []);

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
          <ErrorIcon />
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
            <AppButtonLink
              to="/"
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
            </AppButtonLink>
            <AppButtonLink
              to="/learn"
              variant="ghost"
              borderRadius="full"
              size="lg"
              _hover={{ bg: "blackAlpha.50" }}
              _dark={{ _hover: { bg: "whiteAlpha.100" } }}
              w={{ base: "full", sm: "auto" }}
            >
              К материалам
            </AppButtonLink>
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


