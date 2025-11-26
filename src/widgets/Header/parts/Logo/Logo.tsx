import React from 'react';
import { HStack, Image } from '@chakra-ui/react';
import type { LogoProps } from './types';

const Logo: React.FC<LogoProps> = () => {
  return (
    <HStack
      as="a"
      href="/"
      aria-label="AIFFA — главная страница"
      title="AIFFA — главная страница"
      spacing={2}
      align="center"
      flexShrink={0}
      _hover={{ textDecoration: 'none', opacity: 0.9 }}
    >
      <Image
        src="/aiffa.svg"
        alt="Логотип AIFFA"
        boxSize={{ base: 8, md: 9, lg: 10 }}
        flexShrink={0}
        pointerEvents="none"
      />
    </HStack>
  );
};

export default Logo;

