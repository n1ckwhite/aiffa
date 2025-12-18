import React from 'react';
import {
  Box,
  Flex,
  HStack,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { handleDonate as donateHelper } from '../../../utils/donate';
import { useHeaderColors } from './Header/colors/useHeaderColors';
import Logo from './Logo';
import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';
import { DesktopActions } from './Header/parts/DesktopActions';
import { MobileControls } from './Header/parts/MobileControls';
import { useHeaderController } from './Header/hooks/useHeaderController';
import { useScrollToTop } from 'shared/hooks/useScrollToTop';

const Header: React.FC = React.memo(() => {
  const scrollTop = useScrollToTop({ immediate: false });
  const {
    toggleColorMode,
    searchQuery, setSearchQuery,
    searchOpen, setSearchOpen,
    highlightIndex, setHighlightIndex,
    results, setResults,
    isSearchFocused, setIsSearchFocused,
    isMobileMenuOpen, setIsMobileMenuOpen,
    mobileDropdownTop,
    onInputKeyDown,
    handleResultClick,
  } = useHeaderController();
  const toast = useToast();
  const isAnyModalOpen = false;

  const c = useHeaderColors();
  const ringShadow = c.ringShadow;
  const dropdownShadow = c.dropdownShadow;
  const overlayBg = c.overlayBg;
  const dropdownBg = c.dropdownBg;
  const dropdownBorder = c.dropdownBorder;
  const searchBgNew = c.searchBg;
  const searchBgNewHover = c.searchHoverBg;
  const searchBgNewFocus = c.searchFocusBg;
  const searchPlaceholderColorNew = c.searchPlaceholder;
  const searchIconColor = c.searchIcon;
  const searchIconHoverColor = c.searchIconHover;
  const searchIconHoverBg = c.searchIconHoverBg;
  const hoverBg = c.hoverBg;
  const bg = c.bg;
  const borderColor = c.borderColor;
  const scrollThumb = c.scrollThumb;
  const scrollThumbHover = c.scrollThumbHover;
  const markBg = c.markBg;
  const emptyStateColor = c.emptyStateColor;
  const chevronColor = c.chevronColor;
  const chevronHoverColor = c.chevronHoverColor;
  const moduleChipOpacity = useColorModeValue(c.moduleChipOpacityLight, c.moduleChipOpacityDark);

  const handleDonate = () => donateHelper({ toast, closeAllToasts: toast.closeAll });

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={900}
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      backdropFilter={{ base: 'none', md: 'blur(10px)' }}
      bgColor={`${bg}CC`}
      pointerEvents={isAnyModalOpen ? 'none' : 'auto'}
      sx={{
        transform: 'translateZ(0)',
        willChange: 'transform',
        WebkitTransform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        contain: 'paint layout style',
      }}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 6 }}
        py={3}
        align="center"
        justify="space-between"
        gap={{ base: 3, md: 4, lg: 6 }}
      >
        <Flex align="center" gap={3} flexShrink={0}>
          <Logo />
        </Flex>

        <HStack
          gap={{ md: 2, lg: 3, xl: 4 }}
          display={{ base: 'none', md: 'flex' }}
          flex="1"
          justify="flex-start"
        >
          <Box flex="1">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchOpen={searchOpen}
              setSearchOpen={setSearchOpen}
              isSearchFocused={isSearchFocused}
              setIsSearchFocused={setIsSearchFocused}
              onInputKeyDown={onInputKeyDown}
              results={results}
              highlightIndex={highlightIndex}
              setHighlightIndex={(fn: (i: number) => number) => setHighlightIndex((i) => fn(i))}
              onResultClick={handleResultClick}
              ringShadow={ringShadow}
              dropdownShadow={dropdownShadow}
              overlayBg={overlayBg}
              dropdownBg={dropdownBg}
              dropdownBorder={dropdownBorder}
              searchBg={searchBgNew}
              searchHoverBg={searchBgNewHover}
              searchFocusBg={searchBgNewFocus}
              searchPlaceholder={searchPlaceholderColorNew}
              searchIconColor={searchIconColor}
              searchIconHoverColor={searchIconHoverColor}
              searchIconHoverBg={searchIconHoverBg}
              scrollThumb={scrollThumb}
              scrollThumbHover={scrollThumbHover}
              emptyStateColor={emptyStateColor}
              chevronColor={chevronColor}
              chevronHoverColor={chevronHoverColor}
              moduleChipOpacity={moduleChipOpacity}
              markBg={markBg}
              isMobileMenuOpen={isMobileMenuOpen}
            />
          </Box>

          <DesktopActions
            hoverBg={hoverBg}
            scrollTop={scrollTop}
            onDonate={handleDonate}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </HStack>

        <MobileControls
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setSearchQuery={setSearchQuery}
          setSearchOpen={setSearchOpen}
          setResults={setResults as any}
          toggleColorMode={toggleColorMode}
        />
      </Flex>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        bg={bg}
        borderColor={borderColor}
        hoverBg={hoverBg}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        onInputKeyDown={onInputKeyDown}
        searchBg={searchBgNew}
        searchHoverBg={searchBgNewHover}
        searchFocusBg={searchBgNewFocus}
        searchPlaceholder={searchPlaceholderColorNew}
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
        setHighlightIndex={(i: number) => setHighlightIndex(i)}
        onResultClick={handleResultClick}
        onClose={() => setIsMobileMenuOpen(false)}
        onDonate={handleDonate}
      />
    </Box>
  );
});

export default Header;



