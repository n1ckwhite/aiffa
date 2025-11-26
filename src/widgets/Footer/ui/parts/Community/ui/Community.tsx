import React from 'react';
import { VStack, Text, Link, HStack, IconButton } from '@chakra-ui/react';
import { useFooterColors } from '../../../colors/useFooterColors';
import type { CommunityProps } from '../types/Community.types';
import { GitHubIcon } from '../../../../icons/GitHub';
import { TelegramIcon } from '../../../../icons/Telegram';

export const Community: React.FC<CommunityProps> = ({
  telegramHref,
  emailHref,
  habrHref,
  habrCareerHref,
  githubHref,
}) => {
  const colors = useFooterColors();
  return (
    <VStack align="start" spacing={3}>
      <Text fontSize="md" fontWeight="bold" color={colors.titleColor}>
        Сообщество
      </Text>
      <VStack align="start" spacing={2}>
        <Link
          href={telegramHref}
          fontSize="sm"
          color={colors.textColor}
          _hover={{ color: colors.linkHover }}
          transition="color 0.2s"
          textAlign="left"
          isExternal
        >
          JS HUB
        </Link>
        <Link
          href={emailHref}
          fontSize="sm"
          color={colors.textColor}
          _hover={{ color: colors.linkHover }}
          transition="color 0.2s"
          textAlign="left"
          isExternal
        >
          Email поддержка
        </Link>
        <Link
          href={habrHref}
          fontSize="sm"
          color={colors.textColor}
          _hover={{ color: colors.linkHover }}
          transition="color 0.2s"
          textAlign="left"
          isExternal
        >
          Статьи на Хабре
        </Link>
        <Link
          href={habrCareerHref}
          fontSize="sm"
          color={colors.textColor}
          _hover={{ color: colors.linkHover }}
          transition="color 0.2s"
          textAlign="left"
          isExternal
        >
          Хабр Карьера
        </Link>
      </VStack>

      <HStack spacing={3} pt={2}>
        <Link href={githubHref} isExternal>
          <IconButton aria-label="GitHub" icon={<GitHubIcon />} variant="ghost" size="sm" color={colors.textColor} _hover={{ color: colors.linkHover }} />
        </Link>
        <Link href={telegramHref} isExternal>
          <IconButton aria-label="Telegram" icon={<TelegramIcon />} variant="ghost" size="sm" color={colors.textColor} _hover={{ color: colors.linkHover }} />
        </Link>
      </HStack>
    </VStack>
  );
};


