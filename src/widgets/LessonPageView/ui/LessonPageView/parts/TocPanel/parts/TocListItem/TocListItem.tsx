import React from 'react';
import { Box, Link, Text } from '@chakra-ui/react';
import { handleTocLinkClick } from '../../helpers/helpers';
import { TocListItemProps } from './types';

export const TocListItem: React.FC<TocListItemProps> = ({ item, isActive, setActiveTocId, colors }) => {
  const {
    tocItemRadius,
    tocItemPxBase,
    tocItemPxLg,
    tocItemPyBase,
    tocItemPyLg,
    tocItemMinHBase,
    tocItemMinHLg,
    tocActiveBg,
    tocInactiveColor,
    linkColor,
  } = colors;

  return (
    <Link
      href={`#${item.id}`}
      _hover={{ textDecoration: 'none' }}
      aria-current={isActive ? 'location' : undefined}
      onClick={(e) => handleTocLinkClick(e, item.id, setActiveTocId)}
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
        <Text
          fontSize="sm"
          lineHeight={1.4}
          m={0}
          noOfLines={2}
          fontWeight={isActive ? 'semibold' : 'normal'}
        >
          {item.text}
        </Text>
      </Box>
    </Link>
  );
};


