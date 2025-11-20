import React from 'react';
import { Box, Button, HStack, Icon, Text } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronDownIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { CodeBlock } from '../CodeBlock';
import { useDetailsBlockColors } from './colors/useDetailsBlockColors';
import type { DetailsBlockProps } from './types';
import { SmoothCollapse } from '../SmoothCollapse';

export const DetailsBlock: React.FC<DetailsBlockProps> = ({ summary, body, bodyNode, idx, open, onToggle }) => {
  const colors = useDetailsBlockColors();
  let badge: string | undefined;
  let titleText = summary;
  const m1 = /^\s*\[(.+?)\]\s*(.*)$/.exec(summary);
  if (m1) {
    badge = m1[1];
    titleText = m1[2] || titleText;
  } else if (summary.includes('|')) {
    const [b, ...rest] = summary.split('|');
    if (b && rest.length) {
      badge = b.trim();
      titleText = rest.join('|').trim();
    }
  }
  const mdTitleSrc = titleText.replace(/<code>([\s\S]*?)<\/code>/gi, '`$1`').replace(/<em>([\s\S]*?)<\/em>/gi, '*$1*');

  return (
    <Box my={6} borderWidth="1px" borderColor={colors.detailsCardBorder} borderRadius="xl" bg={colors.detailsCardBg} p={{ base: 5, md: 8 }} minH={{ base: '120px', md: '160px' }} sx={{ overflowAnchor: 'none' }}>
      <HStack spacing={2} mb={3} color={colors.detailsBadgeColor}>
        <Icon as={InfoOutlineIcon} boxSize={4} />
        <Text fontSize="xs" textTransform="uppercase" letterSpacing="widest" fontWeight="bold">
          {(badge && badge.trim().length > 0 ? badge : 'Глубокое погружение')}
        </Text>
      </HStack>
      <Box mb={3}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: (p) => <Text as="span" fontWeight="semibold" color={colors.detailsTitle} fontSize={{ base: 'md', md: 'lg' }} {...(p as any)} />,
            em: (p) => <Box as="em" fontStyle="italic">{(p as any).children}</Box>,
            code: CodeBlock as any,
          }}
        >
          {mdTitleSrc}
        </ReactMarkdown>
      </Box>
      <Box mt={2}>
        <Button
          size="md"
          onClick={onToggle}
          w={{ base: '160px', md: '170px' }}
          borderRadius="full"
          px={5}
          bg="blue.600"
          color="white"
          boxShadow="none"
          _hover={{ bg: 'blue.700', boxShadow: 'none' }}
          _active={{ bg: 'blue.800', boxShadow: 'none' }}
          aria-expanded={open}
          sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <Icon as={ChevronDownIcon} color="white" transform={open ? 'rotate(180deg)' : 'rotate(0deg)'} transition="transform 300ms cubic-bezier(0.22, 1, 0.36, 1)" />
          <Text as="span">{open ? 'Скрыть' : 'Подробнее'}</Text>
        </Button>
      </Box>
      <SmoothCollapse open={open}>
        <Box px={{ base: 0, md: 1 }} pt={4}>
          {bodyNode}
        </Box>
      </SmoothCollapse>
    </Box>
  );
};

