import React from "react";
import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi";
import type { useAppColors } from "@/shared/theme/colors";
import { BLOG_TAG_FILTERS, TAG_ICONS } from "../../lib/tags/tags";
import type { BlogTagFilter } from "../../lib/tags/types";

export type BlogHeroSectionProps = {
  theme: ReturnType<typeof useAppColors>;
  isEmptyResults: boolean;

  query: string;
  setQuery: (next: string) => void;
  tagFilter: BlogTagFilter;
  setTagFilter: (next: BlogTagFilter) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;

  searchBg: string;
  searchBorder: string;
  searchShadow: string;
  searchHoverShadow: string;
  searchHoverBorder: string;
  searchPlaceholder: string;
  searchIconBg: string;
  clearButtonHoverBg: string;
  clearButtonActiveBg: string;

  filterButtonBg: string;
  filterButtonBorder: string;
  filterButtonHoverBg: string;
  filterMenuBorder: string;
  filterMenuShadow: string;
};

export const BlogHeroSection: React.FC<BlogHeroSectionProps> = ({
  theme,
  isEmptyResults,
  query,
  setQuery,
  tagFilter,
  setTagFilter,
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
  filterButtonBg,
  filterButtonBorder,
  filterButtonHoverBg,
  filterMenuBorder,
  filterMenuShadow,
}) => {
  return (
    <Box as="section" aria-labelledby="blog-title">
      <VStack as="header" spacing={3} align="center" textAlign="center" pb={isEmptyResults ? { base: 3, md: 5 } : { base: 6, md: 8 }}>
        <Heading id="blog-title" as="h1" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color={theme.titleColor}>
          Блог AIFFA
        </Heading>
        <Text fontSize={{ base: "sm", md: "lg" }} color={theme.descColor} maxW={{ base: "100%", md: "820px" }}>
          Читай разборы и практику от участников AIFFA — и делись своим опытом. Здесь ценят вклад: кейсы, ошибки, находки и решения, которые помогают сообществу расти.
        </Text>

        <Box
          as="form"
          role="search"
          aria-label="Поиск и фильтры статей"
          onSubmit={(e: React.FormEvent) => e.preventDefault()}
          w="full"
          maxW={{ base: "100%", sm: "560px" }}
          pt={isEmptyResults ? 1 : 2}
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по статьям"
                aria-label="Поиск по статьям"
                id="blog-search"
                name="blog-search"
                autoComplete="off"
                h="56px"
                border="none"
                bg="transparent"
                pl="60px"
                pr={query ? "56px" : 6}
                fontWeight="semibold"
                color={theme.titleColor}
                _placeholder={{ color: searchPlaceholder, fontWeight: "medium" }}
                _focusVisible={{ boxShadow: "none" }}
              />

              {query.trim() && (
                <InputRightElement h="56px" w="56px">
                  <IconButton
                    aria-label="Очистить поиск"
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => {
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

            <HStack spacing={2} align="center">
              <Text fontSize="sm" color={theme.descColor} fontWeight="semibold" whiteSpace="nowrap">
                Фильтры:
              </Text>

              <Menu placement="bottom-end" gutter={10}>
                <MenuButton
                  as={Button}
                  aria-label="Фильтры статей"
                  rightIcon={<Icon as={FiChevronDown} aria-hidden="true" boxSize={5} color={theme.descColor} />}
                  variant="outline"
                  borderWidth="1px"
                  borderColor={filterButtonBorder}
                  bg={filterButtonBg}
                  borderRadius="full"
                  h="45px"
                  px={3}
                  minW={{ base: "150px", sm: "150px" }}
                  justifyContent="space-between"
                  boxShadow={searchShadow}
                  transition="background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease"
                  _hover={{ bg: filterButtonHoverBg, boxShadow: searchHoverShadow }}
                  _active={{ bg: filterButtonHoverBg }}
                  _focusVisible={{ boxShadow: "none" }}
                  type="button"
                >
                  <HStack spacing={2} minW={0}>
                    <Icon as={TAG_ICONS[tagFilter]} aria-hidden="true" boxSize={5} color={theme.titleColor} opacity={0.9} />
                    <Text fontWeight="semibold" color={theme.titleColor} fontSize="sm" noOfLines={1} lineHeight="1">
                      {tagFilter}
                    </Text>
                  </HStack>
                </MenuButton>

                <MenuList
                  overflow="hidden"
                  bg={filterButtonBg}
                  borderColor={filterMenuBorder}
                  borderWidth="1px"
                  borderRadius="2xl"
                  boxShadow={filterMenuShadow}
                  py={0}
                  minW="240px"
                >
                  <MenuOptionGroup type="radio" value={tagFilter} onChange={(v) => setTagFilter((v as BlogTagFilter) || "Все")}>
                    {BLOG_TAG_FILTERS.map((t) => (
                      <MenuItemOption
                        key={t}
                        value={t}
                        fontWeight="semibold"
                        color={theme.titleColor}
                        py={2.5}
                        _hover={{ bg: filterButtonHoverBg }}
                        _focus={{ bg: filterButtonHoverBg }}
                      >
                        <HStack spacing={2}>
                          <Icon as={TAG_ICONS[t]} aria-hidden="true" boxSize={4} color={theme.descColor} />
                          <Text>{t}</Text>
                        </HStack>
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </HStack>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};


