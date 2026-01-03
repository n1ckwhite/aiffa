import React from 'react';
import { Box, Link, Skeleton, Text, VStack } from '@chakra-ui/react';
import type { TocPanelProps } from './types';
import { useLessonNavPending } from 'shared/hooks/useLessonNavPending';

export const TocPanel: React.FC<TocPanelProps> = ({ tocItems, activeTocId, setActiveTocId, isReady, colors }) => {
  const isNavigating = useLessonNavPending();
  const tocMaxVisibleItems = 10;
  /**
   * ~10 пунктов вмещается без растягивания страницы.
   * Если пунктов больше — появляется внутренний скролл.
   * 44px ~= 36px minH + 8px gap (chakra space=2) на десктопе.
   */
  const tocListMaxHeight = `min(${tocMaxVisibleItems * 44 - 8}px, calc(100vh - 88px - 56px))`;
  const tocScrollSx = {
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(120,120,120,0.45) transparent',
    '&::-webkit-scrollbar': { width: '6px' },
    '&::-webkit-scrollbar-thumb': { background: 'rgba(120,120,120,0.45)', borderRadius: '999px' },
    '&::-webkit-scrollbar-track': { background: 'transparent' },
  } as const;

  if (isNavigating) {
    return (
      <Box
        w={{ base: '0', lg: '280px' }}
        display="none"
        position="sticky"
        top="88px"
        sx={{ '@media (min-width: 1440px)': { display: 'block' } }}
      >
        <Box>
          <Skeleton h="10px" w="140px" borderRadius="md" mb={3} />
          <Box maxH={tocListMaxHeight} pr={1} sx={tocScrollSx}>
            <VStack align="stretch" spacing={2}>
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
        <Box>
          <Skeleton h="10px" w="140px" borderRadius="md" mb={3} />
          <Box maxH={tocListMaxHeight} pr={1} sx={tocScrollSx}>
            <VStack align="stretch" spacing={2}>
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
      <Box>
        <Text fontSize="xs" fontWeight="bold" letterSpacing="wider" textTransform="uppercase" mb={3} color={tocTitleColor}>
          На этой странице
        </Text>
        <Box maxH={tocListMaxHeight} pr={1} sx={tocScrollSx}>
          <VStack align="stretch" gap={tocItemGap}>
            {tocItems.map((item) => {
              const isActive = activeTocId === item.id;
              return (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
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
                    px={{ base: tocItemPxBase, lg: tocItemPxLg }}
                    py={{ base: tocItemPyBase, lg: tocItemPyLg }}
                    ml={0}
                    borderRadius={tocItemRadius}
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
    </Box>
  );
};