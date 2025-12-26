import React from "react";
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FiSearch, FiX } from "react-icons/fi";
import { useDebouncedCallback } from "use-debounce";
import { BlogHeroSearchProps } from "./types";

export const BlogHeroSearch: React.FC<BlogHeroSearchProps> = ({
  theme,
  query,
  setQuery,
  searchInputRef,
  searchBg,
  searchBorder,
  searchShadow,
  searchHoverShadow,
  searchHoverBorder,
  searchPlaceholder,
  searchIconBg,
  clearButtonHoverBg,
  clearButtonActiveBg,
}) => {
  const [draftQuery, setDraftQuery] = React.useState<string>(query);

  // Keep input in sync with external updates (URL sync / hotkeys)
  React.useEffect(() => {
    const isFocused =
      typeof document !== "undefined" &&
      !!searchInputRef.current &&
      document.activeElement === searchInputRef.current;

    // Пока пользователь печатает (фокус в инпуте), не перетираем локальный ввод внешним state,
    // иначе может “пропадать символ” из-за асинхронной синхронизации/навигации.
    if (isFocused) {
      if (!query && draftQuery) setDraftQuery("");
      return;
    }

    setDraftQuery(query);
  }, [query]);

  const debouncedSetQuery = useDebouncedCallback((next: string) => {
    setQuery(next);
  }, 220);

  return (
    <Box
      as="form"
      role="search"
      aria-label="Поиск и фильтры статей"
      onSubmit={(e: React.FormEvent) => e.preventDefault()}
      w="full"
      maxW={{ base: "100%", sm: "560px" }}
    >
      <HStack spacing={3} justify="center" flexWrap="wrap">
        <InputGroup
          size="lg"
          h="56px"
          bg={searchBg}
          borderWidth="1px"
          borderColor={searchBorder}
          borderRadius="full"
          boxShadow={searchShadow}
          transition="box-shadow 180ms ease, border-color 180ms ease, transform 180ms ease"
          _hover={{ boxShadow: searchHoverShadow, borderColor: searchHoverBorder }}
          maxW={{ base: "100%", sm: "440px" }}
        >
          <VisuallyHidden as="label" htmlFor="blog-search">
            Поиск по статьям
          </VisuallyHidden>
          <InputLeftElement pointerEvents="none" h="56px" w="56px">
            <Box
              boxSize="40px"
              borderRadius="full"
              bg={searchIconBg}
              display="flex"
              alignItems="center"
              justifyContent="center"
              color={theme.blue.accent}
            >
              <Icon as={FiSearch} aria-hidden="true" boxSize={5} />
            </Box>
          </InputLeftElement>

          <Input
            ref={searchInputRef}
            value={draftQuery}
            onChange={(e) => {
              const next = e.target.value;
              setDraftQuery(next);
              debouncedSetQuery(next);
            }}
            placeholder="Поиск по статьям"
            aria-label="Поиск по статьям"
            id="blog-search"
            name="blog-search"
            autoComplete="off"
            h="56px"
            border="none"
            bg="transparent"
            pl="60px"
            pr={draftQuery ? "56px" : 6}
            fontWeight="semibold"
            color={theme.titleColor}
            _placeholder={{ color: searchPlaceholder, fontWeight: "medium" }}
            _focusVisible={{ boxShadow: "none" }}
          />

          {draftQuery.trim() && (
            <InputRightElement h="56px" w="56px">
              <IconButton
                aria-label="Очистить поиск"
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  debouncedSetQuery.cancel();
                  setDraftQuery("");
                  setQuery("");
                  window.setTimeout(() => searchInputRef.current?.focus(), 0);
                }}
                icon={<Icon as={FiX} aria-hidden="true" boxSize={5} />}
                boxSize="40px"
                p={0}
                borderRadius="full"
                color={theme.descColor}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                _hover={{ bg: clearButtonHoverBg }}
                _active={{ bg: clearButtonActiveBg }}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </HStack>
    </Box>
  );
};


