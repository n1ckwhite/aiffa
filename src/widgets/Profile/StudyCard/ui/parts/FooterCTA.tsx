import React from 'react';
import { Box, VStack, Text, Button, Icon } from '@chakra-ui/react';
import { FaBookOpen } from 'react-icons/fa6';

export type FooterCTAProps = { dividerColor: string; hintColor: string; onOpenMaterials: () => void };

const FooterCTA: React.FC<FooterCTAProps> = ({ dividerColor, hintColor, onOpenMaterials }) => {
  return (
    <Box>
      <Box h="1px" w="100%" bg={dividerColor} borderRadius="full" mb={2} />
      <VStack spacing={1.5}>
        <Button onClick={onOpenMaterials} colorScheme="green" size="sm" px={5} borderRadius="full" leftIcon={<Icon as={FaBookOpen as unknown as React.ElementType} boxSize={3.5} />}>
          Открыть материалы
        </Button>
        <Text fontSize="xs" color={hintColor} textAlign="center" maxW="320px">
          Изучая материалы — растёт прогресс «Изучение».
        </Text>
      </VStack>
    </Box>
  );
};

export default FooterCTA;


