import React from 'react';
import { Box, VStack, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaBookOpen } from 'react-icons/fa6';
import { AppButtonLink } from 'shared/ui/AppLink';

export type FooterCTAProps = { dividerColor: string; hintColor: string };

const FooterCTA: React.FC<FooterCTAProps> = ({ dividerColor, hintColor }) => {
  const ctaBg = useColorModeValue("green.700", "green.600");
  const ctaHoverBg = useColorModeValue("green.800", "green.700");
  const ctaActiveBg = useColorModeValue("green.900", "green.800");

  return (
    <Box>
      <Box h="1px" w="100%" bg={dividerColor} borderRadius="full" mb={2} />
      <VStack spacing={1.5}>
        <AppButtonLink
          to="/learn"
          size="sm"
          px={5}
          borderRadius="full"
          bg={ctaBg}
          color="white"
          _hover={{ bg: ctaHoverBg }}
          _active={{ bg: ctaActiveBg }}
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


