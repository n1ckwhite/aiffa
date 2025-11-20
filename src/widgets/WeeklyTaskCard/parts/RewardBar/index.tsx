import React from 'react';
import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import type { Ring } from '../../types';

export const RewardBar: React.FC<{ ring: Ring; borderColor: string }> = ({ ring, borderColor }) => {
  return (
    <HStack
      px={{ base: 4, md: 5 }}
      py={{ base: 2, md: 2.5 }}
      borderRadius="full"
      borderWidth="1px"
      borderColor={borderColor}
      bgGradient={`linear(to-r, ${ring.from}22, ${ring.to}22)`}
      backdropFilter="blur(4px)"
      fontSize={{ base: 'sm', md: 'md' }}
      fontWeight="bold"
      justifySelf="center"
      spacing={2.5}
      boxShadow="0 6px 18px rgba(0,0,0,0.12)"
    >
      <Box w="20px" h="20px" borderRadius="full" display="flex" alignItems="center" justifyContent="center" bgGradient={`linear(to-br, ${ring.from}, ${ring.to})`} color="white">
        <Icon as={require('react-icons/fa6').FaMedal as any} boxSize={3} />
      </Box>
      <Text as="span">Награда: 50 XP</Text>
    </HStack>
  );
};


