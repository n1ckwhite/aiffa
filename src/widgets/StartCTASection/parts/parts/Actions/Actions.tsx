import React from 'react';
import { HStack, Button, Link, Icon } from '@chakra-ui/react';
import { ArrowForwardIcon, ChatIcon } from '@chakra-ui/icons';
import { useStartCTAColors } from '../../../colors/useStartCTAColors';
import { useStartCTAHandlers } from '../../../hooks/useStartCTAHandlers';
import type { ActionsProps } from './types';

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
    donateBtnBg,
    donateBtnHoverBg,
    donateBtnBorder,
    donateBtnText,
    heartIconColor,
  } = useStartCTAColors();
  const { handleDonate, openModules } = useStartCTAHandlers();

  return (
    <HStack spacing={4} flexWrap="wrap" justify="center" w="full" maxW="720px">
      <Button
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
        onClick={openModules}
      >
        <ArrowForwardIcon boxSize="1em" mr={2} aria-hidden />
        Начать изучение
      </Button>
      <Link
        href="https://t.me/nickwhite_web"
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
      <Button
        bg={donateBtnBg}
        color={donateBtnText}
        borderRadius="full"
        px={{ base: 4, md: 6 }}
        h={{ base: 12, md: 12 }}
        fontWeight="bold"
        borderWidth="1px"
        borderColor={donateBtnBorder}
        _hover={{ bg: donateBtnHoverBg }}
        w={{ base: '100%', sm: 'auto' }}
        onClick={handleDonate}
      >
        <Icon viewBox="0 0 24 24" boxSize="1em" mr={2} aria-hidden color={heartIconColor}>
          <path
            fill="currentColor"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.53C11.09 5.01 12.76 4 14.5 4 17 4 19 6 19 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </Icon>
        Поддержать проект
      </Button>
    </HStack>
  );
};

export default Actions;


