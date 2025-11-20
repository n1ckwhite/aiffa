import React from 'react';
import { Box, Link, Text, VStack } from '@chakra-ui/react';
import type { TocPanelProps } from './types';

export const TocPanel: React.FC<TocPanelProps> = ({ tocItems, activeTocId, setActiveTocId, colors }) => {
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
                  pl={{ base: tocItemPxBase, lg: tocItemPxLg }}
                  pr={{ base: isActive ? 0 : tocItemPxBase, lg: isActive ? 0 : tocItemPxLg }}
                  py={{ base: tocItemPyBase, lg: tocItemPyLg }}
                  ml={0}
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


