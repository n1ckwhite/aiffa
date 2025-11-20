import React from 'react';
import { Text, useColorModeValue } from '@chakra-ui/react';
import type { LogoProps } from './types';

const Logo: React.FC<LogoProps> = () => {
  const color = useColorModeValue('blue.600', 'blue.200');
  return (
    <Text
      as="a"
      href="/"
      fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
      fontWeight="bold"
      color={color}
      transition="color 0.2s ease-in-out"
      letterSpacing="tight"
      _hover={{ textDecoration: 'none', opacity: 0.9 }}
    >
      Universe
    </Text>
  );
};

export default Logo;



