import React from 'react';
import { HStack, Button, Link, Icon } from '@chakra-ui/react';
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
    creatorBtnBg,
    creatorBtnHoverBg,
    creatorBtnBorder,
    creatorBtnText,
  } = useStartCTAColors();

  return (
    <HStack spacing={4} flexWrap="wrap" justify="center" w="full" maxW="720px">
      <AppButtonLink
        to="/weekly"
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
        aria-label="Начать с weekly-задачи"
      >
        <ArrowForwardIcon boxSize="1em" mr={2} aria-hidden />
        Начать с weekly
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
      <AppButtonLink
        to="/creators"
        bg={creatorBtnBg}
        color={creatorBtnText}
        borderWidth="1px"
        borderColor={creatorBtnBorder}
        borderRadius="full"
        px={{ base: 4, md: 6 }}
        h={{ base: 12, md: 12 }}
        fontWeight="bold"
        _hover={{ bg: creatorBtnHoverBg }}
        w={{ base: '100%', sm: 'auto' }}
        aria-label="Открыть страницу создателей"
      >
        <Icon viewBox="0 0 24 24" boxSize="20px" mr={2} aria-hidden>
          <path
            fill="currentColor"
            d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4Zm2 5V6a2 2 0 1 0-4 0v1h4Z"
          />
        </Icon>
        Стать создателем
      </AppButtonLink>
    </HStack>
  );
};

export default Actions;


