import React from 'react';
import { useToast, useColorMode } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDesktopSearchOverlayLock } from '../../../hooks/useDesktopSearchOverlayLock';
import { useMobileMenuLock } from '../../../hooks/useMobileMenuLock';
import { useMobileDropdownPosition } from '../../../hooks/useMobileDropdownPosition';
import { useSearchHotkeys } from '../../../hooks/useSearchHotkeys';
import { useSearchOutsideClick } from '../../../hooks/useSearchOutsideClick';
import { useBroadcastMobileMenu } from '../../../hooks/useBroadcastMobileMenu';
import { useDebouncedLessonsSearch } from '../../../hooks/useDebouncedLessonsSearch';

export const useHeaderController = () => {
  const navigate = useNavigate();
  const { toggleColorMode } = useColorMode();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [highlightIndex, setHighlightIndex] = React.useState(0);
  const [results, setResults] = React.useState<
    Array<{
      route: string;
      lessonId: string;
      lessonTitle: string;
      moduleId: string;
      moduleTitle: string;
      score: number;
    }>
  >([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [searchErrorShown, setSearchErrorShown] = React.useState(false);
  const [mobileDropdownTop, setMobileDropdownTop] = React.useState<number | string>('96px');

  const mobileScrollYRef = React.useRef(0);
  const restoreOverrideYRef = React.useRef<number | null>(null);

  useDesktopSearchOverlayLock(searchOpen, isMobileMenuOpen);
  useMobileMenuLock(isMobileMenuOpen, searchOpen, restoreOverrideYRef, mobileScrollYRef);
  useMobileDropdownPosition(isMobileMenuOpen, searchOpen, setMobileDropdownTop);
  useDebouncedLessonsSearch(searchQuery, setResults, setHighlightIndex, toast, searchErrorShown, setSearchErrorShown);
  useSearchHotkeys(setSearchOpen);
  useSearchOutsideClick(searchOpen, setSearchOpen);
  useBroadcastMobileMenu(isMobileMenuOpen);

  const resetSearch = React.useCallback(() => {
    setSearchQuery('');
    setResults([]);
    setHighlightIndex(0);
    setSearchOpen(false);
    try {
      document.querySelectorAll('.search-input').forEach((node) => {
        (node as HTMLInputElement).value = '';
      });
    } catch {}
  }, []);

  const handleResultClick = (route: string) => {
    restoreOverrideYRef.current = 0;
    navigate(route);
    resetSearch();
    setIsMobileMenuOpen(false);
  };

  const onInputKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      setSearchOpen(true);
      setHighlightIndex((i) => Math.min(results.length - 1, i + 1));
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      setSearchOpen(true);
      setHighlightIndex((i) => Math.max(0, i - 1));
    } else if (ev.key === 'Enter') {
      if (searchOpen && results[highlightIndex]) {
        ev.preventDefault();
        restoreOverrideYRef.current = 0;
        navigate(results[highlightIndex].route);
        resetSearch();
        setIsMobileMenuOpen(false);
      }
    } else if (ev.key === 'Escape') {
      setSearchOpen(false);
    }
  };

  React.useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const clickedInsideMenu = target.closest('.mobile-menu');
      const clickedTrigger = target.closest('[data-menu-trigger="true"]');
      const clickedSearch =
        target.closest('.search-area') ||
        target.closest('.search-input') ||
        target.closest('.search-overlay') ||
        target.closest('.search-results');
      if (!clickedInsideMenu && !clickedTrigger && !clickedSearch) {
        setIsMobileMenuOpen(false);
        try {
          setSearchQuery('');
          setSearchOpen(false);
          setResults([]);
          document.querySelectorAll('.search-input').forEach((node) => {
            (node as HTMLInputElement).value = '';
          });
        } catch {}
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  return {
    // chakra helpers
    toggleColorMode,
    // search state
    searchQuery, setSearchQuery,
    searchOpen, setSearchOpen,
    highlightIndex, setHighlightIndex,
    results, setResults,
    isSearchFocused, setIsSearchFocused,
    // mobile
    isMobileMenuOpen, setIsMobileMenuOpen,
    mobileDropdownTop,
    // handlers
    onInputKeyDown,
    handleResultClick,
    resetSearch,
  };
};



