import React from 'react';
import { Box, Link, Skeleton, Text, VStack } from '@chakra-ui/react';
import type { TocPanelProps } from './types';
import { useLessonNavPending } from 'shared/hooks/useLessonNavPending';

export const TocPanel: React.FC<TocPanelProps> = ({ tocItems, activeTocId, setActiveTocId, isReady, colors }) => {
  const isNavigating = useLessonNavPending();
  const panelTop = 88;
  const panelBottomGap = 24;
  // Keep TOC from covering too much of the screen: cap by 60vh, but also respect header offset.
  const panelMaxH = `min(calc(100vh - ${panelTop + panelBottomGap}px), 30vh)`;
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const hiddenScrollbarSx = {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
  } as const;

  const escapeAttr = (value: string) => value.replace(/["\\]/g, '\\$&');

  React.useLayoutEffect(() => {
    if (!activeTocId) return;
    const container = listRef.current;
    if (!container) return;

    const selector = `[data-toc-id="${escapeAttr(activeTocId)}"]`;
    const target = container.querySelector<HTMLElement>(selector);
    if (!target) return;

    // Run after layout so sizes/scrollHeight are stable.
    const rafId = window.requestAnimationFrame(() => {
      const cTop = container.scrollTop;
      const cBottom = cTop + container.clientHeight;
      const tTop = target.offsetTop;
      const tBottom = tTop + target.offsetHeight;

      const isVisible = tTop >= cTop && tBottom <= cBottom;
      if (isVisible) return;

      // Prefer native nearest scroll inside the container.
      try {
        target.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
      } catch {
        // Fallback: center it.
        const nextTop = tTop - (container.clientHeight / 2 - target.offsetHeight / 2);
        const maxTop = Math.max(0, container.scrollHeight - container.clientHeight);
        container.scrollTop = Math.max(0, Math.min(nextTop, maxTop));
      }
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [activeTocId]);

  if (isNavigating) {
    return (
      <Box
        w={{ base: '0', lg: '280px' }}
        display="none"
        position="sticky"
        top="88px"
        sx={{ '@media (min-width: 1440px)': { display: 'block' } }}
      >
        <Box maxH={panelMaxH} display="flex" flexDirection="column" minH={0} overflow="hidden">
          <Skeleton h="10px" w="140px" borderRadius="md" mb={3} />
          <VStack
            ref={listRef}
            align="stretch"
            spacing={2}
            flex="1 1 auto"
            minH={0}
            overflowY="auto"
            overscrollBehavior="contain"
            sx={hiddenScrollbarSx}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                h="14px"
                w={i % 3 === 0 ? '96%' : i % 3 === 1 ? '84%' : '72%'}
                borderRadius="md"
              />
            ))}
          </VStack>
        </Box>
      </Box>
    );
  }

  if (!isReady) {
    return (
      <Box
        w={{ base: '0', lg: '280px' }}
        display="none"
        position="sticky"
        top="88px"
        sx={{ '@media (min-width: 1440px)': { display: 'block' } }}
      >
        <Box maxH={panelMaxH} display="flex" flexDirection="column" minH={0} overflow="hidden">
          <Skeleton h="10px" w="140px" borderRadius="md" mb={3} />
          <VStack
            ref={listRef}
            align="stretch"
            spacing={2}
            flex="1 1 auto"
            minH={0}
            overflowY="auto"
            overscrollBehavior="contain"
            sx={hiddenScrollbarSx}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                h="14px"
                w={i % 3 === 0 ? '96%' : i % 3 === 1 ? '84%' : '72%'}
                borderRadius="md"
              />
            ))}
          </VStack>
        </Box>
      </Box>
    );
  }

  if (!tocItems.length) return null;
  const {
    tocTitleColor, tocItemRadius, tocItemPxBase, tocItemPxLg, tocItemPyBase, tocItemPyLg,
    tocItemGap, tocItemMinHBase, tocItemMinHLg, tocActiveBg, tocInactiveColor, linkColor,
  } = colors;
  return (
    <Box w={{ base: '0', lg: '280px' }} display="none" position="sticky" top="88px" sx={{ '@media (min-width: 1440px)': { display: 'block' } }}>
      <Box maxH={panelMaxH} display="flex" flexDirection="column" minH={0} overflow="hidden">
        <Text fontSize="xs" fontWeight="bold" letterSpacing="wider" textTransform="uppercase" mb={3} color={tocTitleColor}>
          На этой странице
        </Text>
        <VStack
          ref={listRef}
          align="stretch"
          gap={tocItemGap}
          flex="1 1 auto"
          minH={0}
          overflowY="auto"
          overscrollBehavior="contain"
          sx={hiddenScrollbarSx}
        >
          {tocItems.map((item) => {
            const isActive = activeTocId === item.id;
            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                data-toc-id={item.id}
                _hover={{ textDecoration: 'none' }}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(item.id);
                  if (!el) return;
                  const y = el.getBoundingClientRect().top + window.scrollY - 84;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                  setActiveTocId(item.id);
                  window.history.replaceState(null, '', `#${item.id}`);
                }}
              >
                <Box
                  pl={{ base: tocItemPxBase, lg: tocItemPxLg }}
                  pr={{ base: isActive ? 0 : tocItemPxBase, lg: isActive ? 0 : tocItemPxLg }}
                  py={{ base: tocItemPyBase, lg: tocItemPyLg }}
                  ml={0}
                  // borderRadius={tocItemRadius}
                  borderTopLeftRadius={tocItemRadius}
                  borderBottomLeftRadius={tocItemRadius}
                  borderTopRightRadius="0"
                  borderBottomRightRadius="0"
                  minH={{ base: tocItemMinHBase, lg: tocItemMinHLg }}
                  display="flex"
                  alignItems="center"
                  bg={isActive ? tocActiveBg : 'transparent'}
                  color={isActive ? linkColor : tocInactiveColor}
                  transition="background-color 120ms ease, color 120ms ease"
                  _hover={{ bg: tocActiveBg, color: linkColor, pr: { base: tocItemPxBase, lg: tocItemPxLg } }}
                >
                  <Text fontSize="sm" lineHeight={1.4} m={0} noOfLines={2} fontWeight={isActive ? 'semibold' : 'normal'}>{item.text}</Text>
                </Box>
              </Link>
            );
          })}
        </VStack>
      </Box>
    </Box>
  );
};


