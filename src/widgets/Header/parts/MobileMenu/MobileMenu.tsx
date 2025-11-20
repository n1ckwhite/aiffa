import React from 'react';
import { Box, Collapse, VStack, useColorMode } from '@chakra-ui/react';
import { moduleLevelById } from '../../model/levels';
import { getChipColors } from '../../lib/chips';
import type { MobileMenuProps } from './types';
import { useMobileMenuColors } from './colors/useMobileMenuColors';
import { MobileSearch } from './parts/Search';
import { MenuLinks } from './parts/Links';

const MobileMenu: React.FC<MobileMenuProps> = (props) => {
  const {
    isOpen, bg, borderColor, hoverBg, searchQuery, setSearchQuery, searchOpen, setSearchOpen,
    onInputKeyDown, searchBg, searchHoverBg, searchFocusBg, searchPlaceholder, searchIconColor,
    searchIconHoverColor, searchIconHoverBg, ringShadow, mobileDropdownTop, dropdownBg, dropdownBorder,
    dropdownShadow, scrollThumb, scrollThumbHover, emptyStateColor, chevronColor, chevronHoverColor,
    moduleChipOpacity, markBg, results, highlightIndex, setHighlightIndex, onResultClick, onClose, onDonate,
  } = props;

  const { colorMode } = useColorMode();
  const { resultActiveBg, resultHoverBg, donateBg, donateHoverBg, scrollbarStyles } = useMobileMenuColors();

  return (
    <Collapse in={isOpen} animateOpacity style={{ overflow: 'hidden' }}>
      <Box
        display={{ base: 'block', md: 'none' }}
        bg={bg}
        borderTop="1px"
        borderColor={borderColor}
        p={4}
        maxH="calc(100dvh - 56px)"
        overflowY="auto"
        className="mobile-menu"
        sx={scrollbarStyles}
      >
        <VStack gap={4} align="stretch">
          <MobileSearch
            isOpen={isOpen}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            onInputKeyDown={onInputKeyDown}
            searchBg={searchBg}
            searchHoverBg={searchHoverBg}
            searchFocusBg={searchFocusBg}
            searchPlaceholder={searchPlaceholder}
            searchIconColor={searchIconColor}
            searchIconHoverColor={searchIconHoverColor}
            searchIconHoverBg={searchIconHoverBg}
            ringShadow={ringShadow}
            mobileDropdownTop={mobileDropdownTop}
            dropdownBg={dropdownBg}
            dropdownBorder={dropdownBorder}
            dropdownShadow={dropdownShadow}
            scrollThumb={scrollThumb}
            scrollThumbHover={scrollThumbHover}
            emptyStateColor={emptyStateColor}
            chevronColor={chevronColor}
            chevronHoverColor={chevronHoverColor}
            moduleChipOpacity={moduleChipOpacity}
            markBg={markBg}
            results={results}
            highlightIndex={highlightIndex}
            setHighlightIndex={setHighlightIndex}
            onResultClick={onResultClick}
            getChipColors={(level) => getChipColors(colorMode, level)}
            getLevelByModuleId={(m) => (moduleLevelById[m] || 'beginner') as any}
            resultActiveBg={resultActiveBg}
            resultHoverBg={resultHoverBg}
          />

          <MenuLinks
            hoverBg={hoverBg}
            onClose={onClose}
            donateBg={donateBg}
            donateHoverBg={donateHoverBg}
            onDonate={onDonate}
          />
        </VStack>
      </Box>
    </Collapse>
  );
};

export default MobileMenu;



