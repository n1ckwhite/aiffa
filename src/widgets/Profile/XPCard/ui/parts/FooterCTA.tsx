import React from 'react';
import { Box, VStack, Text, Icon } from '@chakra-ui/react';
import { FaFlagCheckered } from 'react-icons/fa6';
import { AppButtonLink } from 'shared/ui/AppLink';
import { useXpColors } from '../../colors/useXpColors';

export type FooterCTAProps = { dividerColor: string; hintColor: string };

const FooterCTA: React.FC<FooterCTAProps> = ({ dividerColor, hintColor }) => {
  const { ctaActiveBg, ctaBg, ctaHoverBg } = useXpColors()

  return (
    <Box>
      <Box h="1px" w="100%" bg={dividerColor} borderRadius="full" mb={2} />
      <VStack spacing={1.5}>
        <AppButtonLink
          to="/weekly"
          size="sm"
          px={5}
          borderRadius="full"
          alignSelf="center"
          bg={ctaBg}
          color="white"
          _hover={{ bg: ctaHoverBg }}
          _active={{ bg: ctaActiveBg }}
          leftIcon={<Icon as={FaFlagCheckered as unknown as React.ElementType} boxSize={3.5} />}
        >
          К задачам недели
        </AppButtonLink>
        <Text fontSize="xs" color={hintColor} textAlign="center" maxW="320px">
          Выполняй задачи недели — за каждую задачу +50 XP.
        </Text>
      </VStack>
    </Box>
  );
};

export default FooterCTA;


