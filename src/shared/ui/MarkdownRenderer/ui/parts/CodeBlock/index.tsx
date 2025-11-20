import React from 'react';
import { Box, Code, HStack, IconButton, Text, Tooltip } from '@chakra-ui/react';
import { CheckIcon, CopyIcon } from '@chakra-ui/icons';
import { copyTextToClipboard } from 'utils/clipboard';
import { extractText } from '../../../model/extractText';
import { useCodeBlockColors } from './colors/useCodeBlockColors';
import { useCodeBlockDarkBg } from './model/useCodeBlockDarkBg';
import type { CodeBlockProps } from './types';

export const CodeBlock: React.FC<CodeBlockProps> = (nodeProps) => {
  const colors = useCodeBlockColors();
  const monoFont = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace";
  const { inline, className, children, ...props } = nodeProps as any;
  const textFallback = extractText(children);
  const isInline = inline ?? (!className && !/\n/.test(textFallback));
  const [copied, setCopied] = React.useState(false);
  const preRef = React.useRef<HTMLPreElement | null>(null);
  const isDarkBg = useCodeBlockDarkBg(preRef as React.RefObject<HTMLElement>, colors.fallbackIsDark);
  const langMatch = /language-([a-z0-9+-]+)/i.exec(className || '');
  const lang = langMatch?.[1];

  if (isInline) {
    return (
      <Code
        className={className}
        display="inline-block"
        px={1}
        py={0}
        borderRadius="md"
        bg={colors.inlineBg}
        color={colors.inlineColor}
        borderWidth="1px"
        borderColor={colors.inlineBorderColor}
        fontSize="0.8em"
        lineHeight="1.1"
        verticalAlign="baseline"
        whiteSpace="normal"
        wordBreak="break-word"
        maxW="100%"
        sx={{ boxShadow: '0 1px 0 rgba(0,0,0,0.04)' }}
        {...props}
      >
        {children as any}
      </Code>
    );
  }
  const raw = textFallback.replace(/\n$/, '');
  return (
    <Box my={6} className="md-codeblock">
      <Box borderRadius="md" overflow="hidden" boxShadow="none">
        <HStack justify="space-between" align="center" px={3} py={1} bg={colors.headerBg} borderBottomWidth="1px" borderColor={colors.headerBorder}>
          <Text fontSize={{ base: '10px', md: '11px', lg: '12px' }} color={colors.headerTextColor} opacity={0.9} textTransform="uppercase" letterSpacing="wider">
            {lang || 'text'}
          </Text>
          <Tooltip label={copied ? 'Скопировано!' : 'Скопировать'} openDelay={150}>
            <IconButton
              aria-label={copied ? 'Скопировано' : 'Скопировать'}
              size="xs"
              variant="ghost"
              bg="transparent"
              color={copied ? 'green.400' : colors.iconBaseColor}
              _hover={{ bg: isDarkBg ? colors.btnHoverBg : 'blackAlpha.100' }}
              _active={{ bg: isDarkBg ? colors.btnActiveBg : 'blackAlpha.200' }}
              borderRadius="md"
              onClick={() => {
                copyTextToClipboard(raw);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1500);
              }}
              icon={copied ? <CheckIcon /> : <CopyIcon />}
            />
          </Tooltip>
        </HStack>
        <Box
          as="pre"
          ref={preRef}
          overflowX="auto"
          m={0}
          px={0}
          py={0}
          bg={colors.blockBg}
          fontFamily={monoFont}
          fontSize={{ base: 'xs', md: 'sm' }}
          lineHeight={1.65}
          width="100%"
          sx={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '::-webkit-scrollbar': { width: '0px', height: '0px' },
            '::-webkit-scrollbar-thumb': { background: 'transparent' },
            '::-webkit-scrollbar-track': { background: 'transparent' },
            '& *::-webkit-scrollbar': { width: '0px', height: '0px' },
            '& *': { scrollbarWidth: 'none' },
          }}
        >
          <Box
            as="code"
            className={className ? `${className} hljs` : 'hljs'}
            sx={{
              display: 'block',
              p: 4,
              background: 'transparent !important',
              color: `${colors.codeTextColor} !important`,
              '.hljs-comment, .hljs-quote, .hljs-meta': { color: `${colors.codeCommentColor} !important` },
              '.hljs-title, .hljs-section, .hljs-selector-id, .hljs-selector-class': { color: `${colors.codeTitleColor} !important` },
              '.hljs-keyword, .hljs-meta .hljs-keyword, .hljs-doctag': { color: `${colors.codeKeywordColor} !important` },
              '.hljs-name, .hljs-tag, .hljs-selector-tag': { color: `${colors.codeTagColor} !important` },
              '.hljs-attr, .hljs-attribute': { color: `${colors.codeAttrColor} !important` },
              '.hljs-string, .hljs-template-tag, .hljs-template-variable': { color: `${colors.codeStringColor} !important` },
              '.hljs-number, .hljs-literal': { color: `${colors.codeNumberColor} !important` },
              '.hljs-built_in, .hljs-type, .hljs-variable, .hljs-symbol': { color: `${colors.codeBuiltInColor} !important` },
            }}
          >
            {children as any}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};


