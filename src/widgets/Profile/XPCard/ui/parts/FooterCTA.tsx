import React from 'react';
import { Box, VStack, Text, Button, HStack, Icon } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaFlagCheckered } from 'react-icons/fa6';

export type FooterCTAProps = { dividerColor: string; hintColor: string };

const FooterCTA: React.FC<FooterCTAProps> = ({ dividerColor, hintColor }) => {
  return (
    <Box>
      <Box h="1px" w="100%" bg={dividerColor} borderRadius="full" mb={2} />
      <VStack spacing={1.5}>
        <Button as={RouterLink} to="/weekly" colorScheme="blue" size="sm" px={5} borderRadius="full" alignSelf="center" leftIcon={<HStack><Icon as={FaFlagCheckered as unknown as React.ElementType} boxSize={3.5} /></HStack> as any}>
          К задачам недели
        </Button>
        <Text fontSize="xs" color={hintColor} textAlign="center" maxW="320px">
          Выполняй задачи недели — за каждую задачу +50 XP.
        </Text>
      </VStack>
    </Box>
  );
};

export default FooterCTA;


