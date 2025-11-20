import React from 'react';
import { HStack, Box, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaBookOpen } from 'react-icons/fa6';

const Header: React.FC = () => {
  return (
    <HStack justify="center" align="center">
      <HStack spacing={3}>
        <Box w="28px" h="28px" borderRadius="full" display="flex" alignItems="center" justifyContent="center" color="white" bgGradient={useColorModeValue('linear(to-br, green.400, teal.300)', 'linear(to-br, green.300, teal.400)')}>
          <Icon as={FaBookOpen as unknown as React.ElementType} boxSize={3.5} />
        </Box>
        <Text fontWeight="bold" fontSize="sm" color={useColorModeValue('gray.800','gray.100')}>Изучение</Text>
      </HStack>
    </HStack>
  );
};

export default Header;


