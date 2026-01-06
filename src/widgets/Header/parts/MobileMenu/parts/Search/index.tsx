import React from 'react';
import { Box, Input, List, Portal, Text, VStack } from '@chakra-ui/react';
import type { MobileSearchProps } from './types';
import { ClearButton } from './parts/ClearButton';
import { ResultItem } from './parts/ResultItem';
import { useAppColors } from '@/shared/theme/colors';

export const MobileSearch: React.FC<MobileSearchProps> = (props) => {
  const { titleColor } = useAppColors();
  const {
    isOpen, searchQuery, setSearchQuery, searchOpen, setSearchOpen, onInputKeyDown,
    searchBg, searchHoverBg, searchPlaceholder, searchIconColor, searchIconHoverColor, searchIconHoverBg,
    mobileDropdownTop, dropdownBg, dropdownBorder, dropdownShadow, scrollThumb, scrollThumbHover,
    emptyStateColor, chevronColor, chevronHoverColor, moduleChipOpacity, markBg,
    results, highlightIndex, setHighlightIndex, onResultClick,
    getChipColors, getLevelByModuleId, resultActiveBg, resultHoverBg,
  } = props;

  const highlightText = (text: string, query: string, mark: string) => {
    const q = (query || '').trim();
    if (!q) return text;
    const parts = text.split(new RegExp(`(${q})`, 'ig'));
    const markColor = mark === 'whiteAlpha.300' ? 'blue.100' : 'inherit';
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === q.toLowerCase()
            ? (
              <Box
                as="mark"
                key={i}
                bg={mark}
                color={markColor}
                borderRadius="sm"
                px={0.5}
              >
                {part}
              </Box>
            )
            : <React.Fragment key={i}>{part}</React.Fragment>
        )}
      </>
    );
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (results.length) onResultClick(results[Math.min(highlightIndex, results.length - 1)].route); }}>
      <Box position="relative">
        <Input
          id="site-search-mobile"
          name="search"
          placeholder="Поиск"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
          bg={searchBg}
          border="none"
          pl="40px"
          pr={searchQuery ? "40px" : "12px"}
          h="44px"
          borderRadius="22px"
          fontSize="md"
          type="search"
          inputMode="search"
          className="search-input"
          onFocus={() => searchQuery.trim() && setSearchOpen(true)}
          onKeyDown={onInputKeyDown}
          _placeholder={{ color: searchPlaceholder, fontSize: 'sm' }}
          _focus={{ bg: searchBg, outline: 'none', boxShadow: 'none' }}
          _focusVisible={{ bg: searchBg, outline: 'none', boxShadow: 'none' }}
          _hover={{ bg: searchHoverBg }}
          transition="all 0.2s ease-in-out"
          sx={{
            '&::-webkit-search-cancel-button': { WebkitAppearance: 'none', appearance: 'none', display: 'none' },
            '&::-webkit-search-decoration': { display: 'none' },
          }}
        />
        <Box position="absolute" left="12px" top="50%" transform="translateY(-50%)" color={searchIconColor} pointerEvents="none" zIndex={1201} className="search-icon">
          <Box as="svg" w="18px" h="18px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ verticalAlign: 'middle' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </Box>
        </Box>
        <ClearButton
          visible={!!searchQuery}
          color={searchIconColor}
          hoverColor={searchIconHoverColor}
          hoverBg={searchIconHoverBg}
          onClear={() => { setSearchOpen(false); setSearchQuery(''); }}
        />
        {isOpen && searchOpen && searchQuery.trim() && (
          <>
            <Portal>
              <Box position="fixed" left={4} right={4} top={mobileDropdownTop} bg={dropdownBg} borderWidth="1px" borderColor={dropdownBorder} borderRadius="lg" boxShadow={dropdownShadow} zIndex={200100} overflow="hidden">
                <List color={titleColor} role="listbox" maxH={{ base: 'min(64dvh, 520px)', md: 'min(60vh, 520px)' }} overflowY="auto" overflowX="hidden" sx={{ scrollbarWidth: 'thin', scrollbarColor: `${scrollThumb} transparent`, '&::-webkit-scrollbar': { width: '6px', height: '6px' }, '&::-webkit-scrollbar-thumb': { background: scrollThumb, borderRadius: '8px' }, '&::-webkit-scrollbar-thumb:hover': { background: scrollThumbHover }, '&::-webkit-scrollbar-track': { background: 'transparent' }, '@media (orientation: landscape) and (max-width: 900px)': { maxHeight: '48vh' } }}>
                  {results.length === 0 && searchQuery.trim().length >= 2 && (
                    <Box as="li" px={3} py={6} color={emptyStateColor} listStyleType="none">
                      <VStack spacing={1} align="center" justify="center">
                        <Text fontSize="2xl" lineHeight="1">😕</Text>
                        <Text fontWeight="semibold">Ничего не найдено</Text>
                        <Text fontSize="sm" opacity={0.8}>Попробуйте другой запрос</Text>
                      </VStack>
                    </Box>
                  )}
                  {results.map((r, idx) => (
                    <ResultItem
                      key={`m-${r.moduleId}/${r.lessonId}`}
                      result={r}
                      idx={idx}
                      isActive={idx === highlightIndex}
                      chevronColor={chevronColor}
                      chevronHoverColor={chevronHoverColor}
                      moduleChipOpacity={moduleChipOpacity}
                      markBg={markBg}
                      searchQuery={searchQuery}
                      onMouseEnter={() => setHighlightIndex(idx)}
                      onResultClick={() => onResultClick(r.route)}
                      getChipColors={(moduleId) => getChipColors(getLevelByModuleId(moduleId))}
                      resultActiveBg={resultActiveBg}
                      resultHoverBg={resultHoverBg}
                      highlightText={highlightText}
                    />
                  ))}
                </List>
              </Box>
            </Portal>
          </>
        )}
      </Box>
    </form>
  );
};



