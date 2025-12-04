import React from 'react';
import { Box, HStack, Input, IconButton, Portal, Text, List, ListItem } from '@chakra-ui/react';
import { CloseIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { popIn } from '../../animations/popIn';
import { highlightText } from '../../lib/highlight';
import { moduleLevelById } from '../../model/levels';
import type { SearchBarProps } from './types';
import { useSearchBarColors } from './colors/useSearchBarColors';
import PillBadge from 'shared/ui/PillBadge';

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const {
    searchQuery, setSearchQuery, searchOpen, setSearchOpen, isSearchFocused, setIsSearchFocused,
    onInputKeyDown, results, highlightIndex, setHighlightIndex, onResultClick,
    ringShadow, dropdownShadow, overlayBg, dropdownBg, dropdownBorder, searchBg, searchHoverBg, searchFocusBg,
    searchPlaceholder, searchIconColor, searchIconHoverColor, searchIconHoverBg, scrollThumb, scrollThumbHover,
    emptyStateColor, chevronColor, chevronHoverColor, moduleChipOpacity, markBg, isMobileMenuOpen,
  } = props;

  const {
    paletteTopBg,
    resultActiveBg,
    resultHoverBg,
    resultHoverShadow,
    resultHoverBorder,
  } = useSearchBarColors();

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (results.length) onResultClick(results[Math.min(highlightIndex, results.length - 1)].route); }}>
      <Box position="relative" className="search-area" zIndex={200000} w="100%">
        <Input
          id="site-search"
          name="search"
          placeholder="Поиск"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
          bg={searchBg}
          border="none"
          w="100%"
          pl={{ base: '44px', md: '56px', lg: '60px', xl: '64px' }}
          pr={{ base: isSearchFocused && searchQuery ? '44px' : '16px', md: isSearchFocused && searchQuery ? '40px' : '16px', lg: isSearchFocused && searchQuery ? '144px' : '120px' }}
          h={{ base: '40px', md: '34px', lg: '38px' }}
          borderRadius={{ base: '20px', md: '17px', lg: '19px' }}
          fontSize="sm"
          className="search-input"
          onFocus={() => { setIsSearchFocused(true); if (searchQuery.trim()) setSearchOpen(true); }}
          onBlur={() => setIsSearchFocused(false)}
          onKeyDown={onInputKeyDown}
          _placeholder={{
            color: searchPlaceholder,
            fontSize: 'sm',
            opacity: 0.9,
          }}
          _focus={{
            bg: searchFocusBg,
            boxShadow: `${ringShadow}, 0 4px 12px rgba(0, 0, 0, 0.15)`,
            outline: 'none',
          }}
          _hover={{ bg: searchHoverBg }}
          transition="all 0.2s ease-in-out"
        />
        <Box
          position="absolute"
          left="32px"
          top="50%"
          transform="translateY(-50%)"
          color={searchIconColor}
          pointerEvents="none"
          zIndex={2}
        >
          <Box as="svg" w="18px" h="18px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.8-4.8M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15z" />
          </Box>
        </Box>
        {isSearchFocused && searchQuery && (
          <IconButton
            aria-label="Очистить поиск"
            icon={<CloseIcon boxSize={2.5} />}
            size="xs"
            variant="ghost"
            position="absolute"
            right={{ md: '8px', lg: '10px' }}
            top="50%"
            transform="translateY(-50%)"
            color={searchIconColor}
            _hover={{ color: searchIconHoverColor, bg: searchIconHoverBg }}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setSearchQuery('');
              setSearchOpen(false);
            }}
            zIndex={3}
          />
        )}
        <HStack
          spacing={1}
          position="absolute"
          right={{ md: '36px', lg: '16px' }}
          top="50%"
          transform="translateY(-50%)"
          display={{ base: 'none', lg: 'flex' }}
          opacity={0.7}
        >
          <Box as="kbd" px={1.5} py={0.5} borderRadius="md" borderWidth="1px" borderColor={dropdownBorder} fontSize="10px">⌘</Box>
          <Box as="kbd" px={1.5} py={0.5} borderRadius="md" borderWidth="1px" borderColor={dropdownBorder} fontSize="10px">K</Box>
        </HStack>
        {!isMobileMenuOpen && searchOpen && searchQuery.trim() && (
          <Portal>
            <Box
              position="fixed"
              left={0}
              right={0}
              bottom={0}
              top={{ base: '56px', md: '64px' }}
              bg={overlayBg}
              zIndex={300000}
              className="search-overlay"
              onClick={() => setSearchOpen(false)}
              sx={{ overscrollBehavior: 'contain' }}
            />
          </Portal>
        )}
        {!isMobileMenuOpen && searchOpen && searchQuery.trim() && (
          <Portal>
            <Box
              position="fixed"
              left={8}
              right={8}
              top={{ base: '72px', md: '64px' }}
              mx="auto"
              maxW={{ base: 'min(680px, 92vw)', md: 'min(780px, 92vw)' }}
              bg={dropdownBg}
              borderWidth="1px"
              borderColor={dropdownBorder}
              borderRadius="lg"
              boxShadow={dropdownShadow}
              zIndex={300100}
              className="search-results"
              overflow="hidden"
              sx={{
                animation: `${popIn} 160ms cubic-bezier(0.22, 1, 0.36, 1) both`,
                backdropFilter: 'saturate(1.1) blur(6px)'
              }}
            >
              <Box px={{ base: 2.5, md: 3 }} py={{ base: 1.5, md: 2 }} bg={paletteTopBg} borderBottomWidth="1px" borderColor={dropdownBorder}>
                <HStack justify="space-between" align="center">
                  <Text fontSize={{ base: '10px', md: 'xs' }} opacity={0.7}>Нажмите Enter, чтобы открыть</Text>
                  <HStack spacing={2} opacity={0.8} display={{ base: 'none', md: 'flex' }}>
                    <Box as="kbd" px={2} py={0.5} borderRadius="md" borderWidth="1px" borderColor={dropdownBorder} fontSize="10px">↑</Box>
                    <Box as="kbd" px={2} py={0.5} borderRadius="md" borderWidth="1px" borderColor={dropdownBorder} fontSize="10px">↓</Box>
                    <Text as="span" fontSize="xs">навигация</Text>
                  </HStack>
                </HStack>
              </Box>
              <List
                role="listbox"
                maxH={{ base: 'min(64dvh, 520px)', md: 'min(50dvh, 480px)' }}
                overflowY="auto"
                overflowX="hidden"
                pt={{ base: 1.5, md: 2 }}
                sx={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: `${scrollThumb} transparent`,
                  '&::-webkit-scrollbar': { width: '6px', height: '6px' },
                  '&::-webkit-scrollbar-thumb': { background: scrollThumb, borderRadius: '8px', minHeight: '24px' },
                  '&::-webkit-scrollbar-thumb:hover': { background: scrollThumbHover },
                  '&::-webkit-scrollbar-track': { background: 'transparent' },
                  '&::-webkit-scrollbar-corner': { background: 'transparent' },
                  '@media (orientation: landscape) and (max-width: 900px)': { maxHeight: '42dvh' }
                }}
              >
                {results.length === 0 && searchQuery.trim().length >= 2 && (
                  <ListItem px={3} py={6} color={emptyStateColor}>
                    <HStack spacing={1} align="center" justify="center">
                      <Text fontSize="2xl" lineHeight="1">😕</Text>
                      <Text fontWeight="semibold">Ничего не найдено</Text>
                    </HStack>
                  </ListItem>
                )}
                {results.map((r, idx) => {
                  const level = moduleLevelById[r.moduleId] || 'beginner';
                  const levelScheme =
                    (level === 'beginner'
                      ? 'green'
                      : level === 'intermediate'
                      ? 'yellow'
                      : 'red') as 'green' | 'yellow' | 'red';
                  return (
                    <ListItem
                      key={`${r.moduleId}/${r.lessonId}`}
                      role="option"
                      aria-selected={idx === highlightIndex}
                      bg={idx === highlightIndex ? resultActiveBg : 'transparent'}
                      _hover={{ bg: resultHoverBg, cursor: 'pointer' }}
                      px={{ base: 2, md: 3 }}
                      py={{ base: 2, md: 2.5 }}
                      position="relative"
                      borderWidth="1px"
                      borderColor="transparent"
                      borderRadius="lg"
                      transition="background-color 180ms ease, box-shadow 180ms ease, transform 140ms ease, border-color 180ms ease"
                      sx={{
                        '&:hover': { boxShadow: resultHoverShadow, borderColor: resultHoverBorder, transform: 'translateY(-1px)' },
                        '&[aria-selected=true]': { boxShadow: resultHoverShadow, borderColor: resultHoverBorder },
                        '&:hover .result-chevron, &[aria-selected=true] .result-chevron': { color: chevronHoverColor, transform: 'translateX(3px)' },
                      }}
                      onMouseEnter={() => setHighlightIndex((_) => idx)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => onResultClick(r.route)}
                    >
                      <HStack align="center" justify="space-between" gap={3}>
                        <Box flex={1} minW={0}>
                          <Text noOfLines={2} fontWeight="semibold">{highlightText(r.lessonTitle, searchQuery, markBg)}</Text>
                          <HStack mt={1} spacing={2}>
                            <PillBadge
                              colorScheme={levelScheme}
                              variant="outline"
                            >
                              {r.moduleTitle}
                            </PillBadge>
                          </HStack>
                        </Box>
                        <Box
                          as={ChevronRightIcon}
                          color={idx === highlightIndex ? chevronHoverColor : chevronColor}
                          transition="transform 200ms ease, color 180ms ease"
                          className="result-chevron"
                          boxSize={{ base: 4, md: 5 }}
                        />
                      </HStack>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Portal>
        )}
      </Box>
    </form>
  );
};

export default SearchBar;



