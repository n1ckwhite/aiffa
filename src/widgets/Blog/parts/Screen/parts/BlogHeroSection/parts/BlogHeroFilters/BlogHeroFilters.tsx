import React from "react";
import { Button, HStack, Icon, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Text, VStack } from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { BLOG_TAG_FILTERS, TAG_ICONS } from "../../../../lib/tags/tags";
import type { BlogTagFilter } from "../../../../lib/tags/types";
import { BlogHeroFiltersProps } from "./types";

export const BlogHeroFilters: React.FC<BlogHeroFiltersProps> = ({
  theme,
  tagFilter,
  setTagFilter,
  rightAddon,
  filterButtonBg,
  filterButtonBorder,
  filterButtonHoverBg,
  filterMenuBorder,
  filterMenuShadow,
  searchShadow,
  searchHoverShadow,
}) => {
  return (
    <VStack spacing={2} align="stretch" justify="center" w="full" maxW={{ base: "340px", sm: "560px" }}>
      <Text fontSize="sm" color={theme.descColor} fontWeight="semibold" whiteSpace="nowrap">
        Фильтры:
      </Text>

      <HStack spacing={2} align="center" justify="center" w="full">
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
            w="auto"
            flexShrink={0}
            justifyContent="space-between"
            boxShadow={searchShadow}
            transition="background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease"
            _hover={{ bg: filterButtonHoverBg, boxShadow: searchHoverShadow }}
            _active={{ bg: filterButtonHoverBg }}
            _focusVisible={{ boxShadow: "none" }}
            type="button"
          >
            <HStack spacing={2} minW={0} align="center">
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
            borderRadius="xl"
            boxShadow={filterMenuShadow}
            py={0}
            minW="240px"
          >
            <MenuOptionGroup
              type="radio"
              value={tagFilter}
              onChange={(v) => setTagFilter((v as BlogTagFilter) || "Все")}
            >
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
                  <HStack spacing={2} align="center">
                    <Icon as={TAG_ICONS[t]} aria-hidden="true" boxSize={4} color={theme.descColor} />
                    <Text>{t}</Text>
                  </HStack>
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>

        {rightAddon}
      </HStack>
    </VStack>
  );
};


