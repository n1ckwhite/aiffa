import React from 'react';
import type { Components } from 'react-markdown';
import { Box, Divider, Heading, HStack, Icon, Image, Link as ChakraLink, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react';
import { ChevronDownIcon, InfoOutlineIcon, LinkIcon, StarIcon, WarningIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/react';
import { CodeBlock } from '../ui/parts/CodeBlock';
import { extractText } from './extractText';

export const buildComponents = (colors: any) => {
  const {
    linkColor,
    underlineColor,
    borderCol,
    textColor,
    listMarker,
    listMarkerAlt,
    emBg,
    detailsBg,
    detailsBorder,
    detailsHover,
    detailsTitle,
    anchorIdle,
    anchorHover,
  } = colors as any;

  const headingSx = {
    'a.md-anchor': {
      opacity: 0,
      ml: 2,
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      color: anchorIdle,
      transition: 'opacity 120ms ease, color 120ms ease',
    },
    '&:hover a.md-anchor': { opacity: 1, color: anchorHover },
    scrollMarginTop: '90px',
  } as const;

  let isFirstParagraph = true;

  const components: Components = {
    h1: (p) => (
      <Heading as="h2" my={6} sx={headingSx} fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }} lineHeight={{ base: 1.25, md: 1.25, lg: 1.2 }} letterSpacing="-0.01em" {...(p as any)} />
    ),
    h2: (p) => (
      <Heading as="h3" mt={10} mb={4} sx={headingSx} fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }} lineHeight={{ base: 1.3, md: 1.25, lg: 1.2 }} letterSpacing="-0.005em" {...(p as any)} />
    ),
    h3: (p) => (
      <Heading as="h3" mt={8} mb={3} sx={headingSx} fontSize={{ base: 'md', md: 'lg', lg: 'xl' }} lineHeight={{ base: 1.35, md: 1.3, lg: 1.25 }} {...(p as any)} />
    ),
    h4: (p) => (
      <Heading as="h3" mt={7} mb={2.5} sx={headingSx} fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} lineHeight={{ base: 1.45, md: 1.4, lg: 1.35 }} {...(p as any)} />
    ),
    p: (p) => {
      const lead = isFirstParagraph;
      isFirstParagraph = false;
      return (
        <Text my={lead ? 4 : 3.5} lineHeight={lead ? 2 : 1.9} fontSize={lead ? { base: 'lg', md: 'xl' } : { base: 'md', md: 'lg' }} color={textColor} opacity={lead ? 0.9 : 1} {...(p as any)} />
      );
    },
    a: (p) => {
      const className = (p as any).className || '';
      if (typeof className === 'string' && className.includes('md-anchor')) {
        const href = String((p as any).href || '');
        const slug = href.startsWith('#') ? href.slice(1) : href;
        const human = decodeURIComponent(slug).replace(/[-_]+/g, ' ').trim();
        const aria = human ? `Ссылка на раздел: ${human}` : 'Ссылка на этот раздел';
        return (
          <ChakraLink {...(p as any)} color={anchorIdle} _hover={{ color: anchorHover }} textDecoration="none" aria-label={aria} title={aria}>
            <Icon as={LinkIcon} boxSize="0.5em" aria-hidden="true" focusable={false} />
          </ChakraLink>
        );
      }
      return (
        <Link
          color={linkColor}
          textDecoration="none"
          position="relative"
          transition="color 160ms ease"
          _hover={{ textDecoration: 'none' }}
          isExternal
          sx={{
            '&::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: '-1px',
              height: '1px',
              backgroundColor: underlineColor,
              width: '0%',
              transition: 'width 180ms ease',
              borderRadius: '1px',
            },
            '&:hover::after': {
              width: '100%',
            },
          }}
          fontWeight="semibold"
          _focusVisible={{ boxShadow: '0 0 0 3px rgba(66,153,225,0.6)', borderRadius: '2px' }}
          {...(p as any)}
        />
      );
    },
    ul: (p) => (
      <UnorderedList pl={6} my={3.5} spacing={2.5} sx={{ 'li::marker': { color: listMarker }, 'input[type="checkbox"]': { marginRight: '8px' } }} {...(p as any)} />
    ),
    ol: (p) => (
      <OrderedList pl={6} my={3.5} spacing={2.5} sx={{ 'li::marker': { color: listMarkerAlt, fontWeight: 700 }, 'input[type="checkbox"]': { marginRight: '8px' } }} {...(p as any)} />
    ),
    li: (p) => {
      const node: any = (p as any).node;
      try {
        const kids: any[] = node?.children || [];
        const last = kids[kids.length - 1];
        const prev = kids[kids.length - 2];
        const isAnchor = last && last.type === 'element' && last.tagName === 'a' && last.properties?.href;
        const prevText = prev ? extractText(prev) : '';
        if (isAnchor && /:\s*$/.test(prevText)) {
          const label = prevText.replace(/:\s*$/, '');
          const href = String(last.properties.href);
          return (
            <ListItem my={2}>
              <ChakraLink href={href} color={linkColor} isExternal>
                {label}
              </ChakraLink>
            </ListItem>
          );
        }
      } catch {}
      return <ListItem my={2} {...(p as any)} />;
    },
    em: (p) => (
      <Box as="em" fontStyle="italic" px={1} mx={0.5} borderRadius="sm" bg={emBg}>
        {(p as any).children}
      </Box>
    ),
    hr: () => <Divider my={8} opacity={0.3} />,
    details: (p) => (
      <Box
        as="details"
        my={4}
        borderWidth="1px"
        borderColor={detailsBorder}
        borderRadius="md"
        bg={detailsBg}
        overflow="hidden"
        sx={{ '&[open] > summary .md-caret': { transform: 'rotate(180deg)' }, overflowAnchor: 'none' }}
        {...(p as any)}
      />
    ),
    summary: (p) => (
      <HStack as="summary" listStyleType="none" cursor="pointer" px={3} py={2} _hover={{ bg: detailsHover }} transition="background-color 120ms ease">
        <Icon as={ChevronDownIcon} className="md-caret" boxSize={4} color={anchorHover} transition="transform 150ms ease" />
        <Text as="span" fontWeight="semibold" color={detailsTitle}>
          {(p as any).children}
        </Text>
      </HStack>
    ),
    blockquote: (nodeProps) => {
      const children = (nodeProps as any).children as React.ReactNode;
      const raw = extractText(children).trim();
      let kind: 'note' | 'tip' | 'warn' | 'info' = 'info';
      const lowered = raw.toLowerCase();
      if (/^(note:|примечание:|заметка:)/i.test(lowered)) kind = 'note';
      else if (/^(tip:|совет:|подсказка:)/i.test(lowered)) kind = 'tip';
      else if (/^(warn:|warning:|предупреждение:|важно:|осторожно:)/i.test(lowered)) kind = 'warn';
      else if (/^(info:|инфо:|информация:)/i.test(lowered)) kind = 'info';
      const markerRe = /^\s*(?:note:|примечание:|заметка:|tip:|совет:|подсказка:|warn:|warning:|предупреждение:|важно:|осторожно:|info:|инфо:|информация:)\s*/i;
      const label: string = kind === 'note' ? 'Заметка' : kind === 'tip' ? 'Подсказка' : kind === 'warn' ? 'Осторожно' : 'Информация';
      const styleMap = {
        note: { bg: colors.noteBg, br: colors.noteBorder, icon: InfoOutlineIcon },
        tip: { bg: colors.tipBg, br: colors.tipBorder, icon: StarIcon },
        warn: { bg: colors.warnBg, br: colors.warnBorder, icon: WarningIcon },
        info: { bg: colors.infoBg, br: colors.infoBorder, icon: InfoOutlineIcon },
      } as const;
      const style = styleMap[kind];
      const headingColorMap = { note: colors.noteHeadingColor, tip: colors.tipHeadingColor, warn: colors.warnHeadingColor, info: colors.infoHeadingColor } as const;
      let removed = false;
      const stripMarkerDeep = (node: React.ReactNode): React.ReactNode => {
        if (removed) return node;
        if (typeof node === 'string') {
          const original = node as string;
          const replaced = original.replace(markerRe, '');
          if (replaced !== original) {
            removed = true;
            return replaced;
          }
          if (original.trim().length === 0) return original;
          return original;
        }
        if (Array.isArray(node)) {
          const arr = node as React.ReactNode[];
          const out: React.ReactNode[] = [];
          for (let i = 0; i < arr.length; i += 1) {
            const processed = stripMarkerDeep(arr[i]);
            out.push(processed);
            if (removed && i + 1 < arr.length) {
              for (let j = i + 1; j < arr.length; j += 1) out.push(arr[j]);
              break;
            }
          }
          return out as any;
        }
        if (React.isValidElement(node)) {
          const kids = React.Children.toArray((node as any).props?.children);
          const outKids: React.ReactNode[] = [];
          for (let i = 0; i < kids.length; i += 1) {
            const processed = stripMarkerDeep(kids[i]);
            outKids.push(processed);
            if (removed && i + 1 < kids.length) {
              for (let j = i + 1; j < kids.length; j += 1) outKids.push(kids[j]);
              break;
            }
          }
          return React.cloneElement(node as any, { ...(node as any).props, children: outKids } as any);
        }
        return node;
      };
      const strippedOnce = stripMarkerDeep(children);
      const dropLeadingEmpty = (node: React.ReactNode): React.ReactNode => {
        const arr = React.Children.toArray(node);
        if (arr.length === 0) return node;
        const markerHeadRe = /^(?:note|примечание|заметка|tip|совет|подсказка|warn|warning|предупреждение|важно|осторожно|info|инфо|информация)\s*:?$/i;
        let i = 0;
        while (i < arr.length) {
          const t = (extractText as any)(arr[i]).trim();
          if (t.length === 0 || markerHeadRe.test(t)) {
            i += 1;
            continue;
          }
          break;
        }
        if (i === 0) return node;
        return arr.slice(i) as any;
      };
      const contentChildren = dropLeadingEmpty(strippedOnce);
      return (
        <Box my={6} p={{ base: 4, md: 5 }} bg={style.bg} borderWidth="1px" borderColor={style.br} borderRadius="xl">
          <HStack align="center" gap={3} mb={2}>
            <Icon as={style.icon} color={headingColorMap[kind]} boxSize={5} />
            <Text as="span" fontWeight="bold" color={headingColorMap[kind]} fontSize={{ base: 'md', md: 'lg' }}>
              {label}
            </Text>
          </HStack>
          <Box>{contentChildren as any}</Box>
        </Box>
      );
    },
    table: (p) => (
      <Box overflowX="auto" my={6}>
        <Box as="table" width="100%" sx={{ borderCollapse: 'separate', borderSpacing: 0, 'th, td': { borderBottom: '1px solid', borderColor: borderCol, px: 3, py: 2 }, th: { textAlign: 'left', bg: 'blackAlpha.200' } }} {...(p as any)} />
      </Box>
    ),
    img: (p) => {
      const title = (p as any).title as string | undefined;
      const alt = (p as any).alt as string | undefined;
      const caption = title || undefined;
      return (
        <Box my={6} textAlign="center">
          <Image
            src={(p as any).src}
            alt={alt}
            loading="lazy"
            decoding="async"
            mx="auto"
            borderRadius="lg"
            boxShadow="xl"
            maxH="520px"
            objectFit="contain"
            borderWidth="1px"
            borderColor={borderCol}
          />
          {caption && <Text mt={2} fontSize="sm" opacity={0.7}>{caption}</Text>}
        </Box>
      );
    },
    code: CodeBlock as any,
  };

  return components;
};


