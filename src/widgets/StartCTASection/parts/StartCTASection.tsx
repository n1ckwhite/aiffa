import React from 'react';
import { Box, Container, VStack } from '@chakra-ui/react';
import { useStartCTAColors } from '../colors/useStartCTAColors';
import type { StartCTASectionProps } from '../types';
import { Header, Actions } from './parts';

const StartCTASection: React.FC<StartCTASectionProps> = () => {
  const { bg } = useStartCTAColors();

  return (
    <Box bg={bg} pb={8} px={0}>
      <Container maxW="1200px">
        <VStack spacing={8} align="center" textAlign="center">
          <Header />
          <Actions />
        </VStack>
      </Container>
    </Box>
  );
};

export default StartCTASection;


