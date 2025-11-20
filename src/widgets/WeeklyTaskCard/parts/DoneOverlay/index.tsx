import React from 'react';
import { Box, HStack, Icon, Text } from '@chakra-ui/react';

export const DoneOverlay: React.FC = () => {
  return (
    <>
      <Box position="absolute" inset={0} borderRadius="20px" bg="green.500" opacity={0.06} pointerEvents="none" zIndex={20} sx={{ mixBlendMode: 'multiply' }} />
      <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" opacity={0.14} pointerEvents="none" zIndex={25} filter="drop-shadow(0 8px 22px rgba(16,185,129,0.35))">
        <Icon as={require('react-icons/fa6').FaCircleCheck as any} boxSize={{ base: 24, md: 28 }} color="green.400" />
      </Box>
      <Box position="absolute" top="18px" left="-40px" right="-40px" transform="rotate(-10deg)" bgGradient="linear(to-r, green.500, green.400)" color="white" py={1.5} textAlign="center" fontWeight="semibold" letterSpacing="wider" borderWidth="1px" borderColor="green.300" boxShadow="0 10px 24px rgba(16,185,129,0.35)" pointerEvents="none" zIndex={30}>
        <HStack spacing={2} justify="center">
          <Icon as={require('react-icons/fa6').FaCircleCheck as any} />
          <Text>Выполнено</Text>
        </HStack>
      </Box>
    </>
  );
};


