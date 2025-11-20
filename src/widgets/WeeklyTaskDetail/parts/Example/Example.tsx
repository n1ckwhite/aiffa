import React from 'react';
import { Box } from '@chakra-ui/react';
import CodeExample from 'shared/ui/CodeExample';
import { ExampleProps } from './types';

const Example: React.FC<ExampleProps> = ({ code, language }) => {
  if (!(code || '').trim()) return null;
  return (
    <Box mb={4}>
      <CodeExample minimal showLanguageLabel={false} code={code} languageHint={language} title="Пример решения" />
    </Box>
  );
};

export default Example;


