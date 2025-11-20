import React from 'react';
import { HStack, Box, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaFire } from 'react-icons/fa6';

const Header: React.FC = () => {
  return (
    <HStack justify="center" align="center">
      <HStack spacing={3}>
        <Box w="28px" h="28px" borderRadius="full" display="flex" alignItems="center" justifyContent="center" color="white" bgGradient={useColorModeValue('linear(to-br, orange.400, yellow.300)', 'linear(to-br, orange.300, yellow.400)')}>
          <Icon as={FaFire as unknown as React.ElementType} boxSize={3.5} />
        </Box>
        <Text fontWeight="bold" fontSize="sm" color={useColorModeValue('gray.800','gray.100')}>Опыт</Text>
      </HStack>
    </HStack>
  );
};

export default Header;


