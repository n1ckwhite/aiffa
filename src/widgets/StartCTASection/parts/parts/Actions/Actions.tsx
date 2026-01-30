import React from 'react';
import { HStack, Link } from '@chakra-ui/react';
import { ArrowForwardIcon, ChatIcon } from '@chakra-ui/icons';
import { useStartCTAColors } from '../../../colors/useStartCTAColors';
import type { ActionsProps } from './types';
import { AppButtonLink } from '@/shared/ui/AppLink';
import { telegramHref } from '@/widgets/Footer/model/links';

const Actions: React.FC<ActionsProps> = () => {
  const {
    startBtnBg,
    startBtnHoverBg,
    startBtnBorder,
    startBtnText,
    communityBtnBg,
    communityBtnHoverBg,
    communityBtnBorder,
    communityBtnText,
  } = useStartCTAColors();

  return (
    <HStack spacing={4} flexWrap="wrap" justify="center" w="full" maxW="720px">
      <AppButtonLink
        to="/learn"
        bg={startBtnBg}
        color={startBtnText}
        borderWidth="1px"
        borderColor={startBtnBorder}
        borderRadius="full"
        px={{ base: 4, md: 6 }}
        h={{ base: 12, md: 12 }}
        fontWeight="bold"
        _hover={{ bg: startBtnHoverBg }}
        w={{ base: '100%', sm: 'auto' }}
        aria-label="Начать с материалов"
      >
        <ArrowForwardIcon boxSize="1em" mr={2} aria-hidden />
        Начать с материалов
      </AppButtonLink>
      <Link
        href={telegramHref}
        target="_blank"
        rel="noopener noreferrer"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="full"
        px={{ base: 4, md: 6 }}
        h={{ base: 12, md: 12 }}
        fontWeight="bold"
        bg={communityBtnBg}
        color={communityBtnText}
        borderWidth="1px"
        borderColor={communityBtnBorder}
        _hover={{ bg: communityBtnHoverBg }}
        w={{ base: '100%', sm: 'auto' }}
      >
        <ChatIcon boxSize="1em" mr={2} aria-hidden />
        К сообществу
      </Link>
    </HStack>
  );
};

export default Actions;


