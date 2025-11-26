import React from 'react';
import { HStack, Image, Text, useColorModeValue } from '@chakra-ui/react';
import type { LogoProps } from './types';

const Logo: React.FC<LogoProps> = () => {
  const textColor = useColorModeValue('blue.700', 'blue.200');

  return (
    <HStack
      as="a"
      href="/"
      spacing={2}
      align="center"
      _hover={{ textDecoration: 'none', opacity: 0.9 }}
    >
      <Image
        src="/aiffa.svg"
        alt="Логотип AIFFA"
        boxSize={{ base: 7, md: 8 }}
        pointerEvents="none"
      />
    </HStack>
  );
};

export default Logo;

