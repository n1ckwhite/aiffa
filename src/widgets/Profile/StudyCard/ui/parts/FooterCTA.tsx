import React from 'react';
import { Box, VStack, Text, Button, Icon } from '@chakra-ui/react';
import { FaBookOpen } from 'react-icons/fa6';
import { AppButtonLink } from 'shared/ui/AppLink';

export type FooterCTAProps = { dividerColor: string; hintColor: string };

const FooterCTA: React.FC<FooterCTAProps> = ({ dividerColor, hintColor }) => {
  return (
    <Box>
      <Box h="1px" w="100%" bg={dividerColor} borderRadius="full" mb={2} />
      <VStack spacing={1.5}>
        <AppButtonLink
          to="/learn"
          colorScheme="green"
          size="sm"
          px={5}
          borderRadius="full"
          leftIcon={<Icon as={FaBookOpen as unknown as React.ElementType} boxSize={3.5} />}
        >
          Открыть материалы
        </AppButtonLink>
        <Text fontSize="xs" color={hintColor} textAlign="center" maxW="320px">
          Изучая материалы — растёт прогресс «Изучение».
        </Text>
      </VStack>
    </Box>
  );
};

export default FooterCTA;


