import React from 'react';
import { Box } from '@chakra-ui/react';
import type { CodeBlockProps } from '../types/CodeBlock.types';

export const CodeBlock: React.FC<CodeBlockProps> = ({
  codeRef,
  code,
  bg,
  borderRadius,
  minimal,
  defaultCodeTextColor,
}) => {
  return (
    <Box borderBottomLeftRadius={minimal ? 0 : borderRadius} borderBottomRightRadius={minimal ? 0 : borderRadius} bg={bg}>
      <Box
        as="pre"
        m={0}
        p={minimal ? 0 : { base: 4, md: 6 }}
        overflow="auto"
        sx={{
          '.hljs': {
            padding: 0,
            background: 'transparent',
            fontSize: 'sm',
            lineHeight: '1.7',
            color: minimal ? defaultCodeTextColor : 'white',
          },
        }}
      >
        <code ref={codeRef as any}>{code}</code>
      </Box>
    </Box>
  );
};

export default CodeBlock;