import React from 'react';
import { Box, Heading, Text, VStack, Stack } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { useSupportBlockColors } from './colors';
import type { SupportBlockProps } from './types';
import { IconBadge } from './parts/IconBadge';
import { TelegramLink } from './parts/TelegramLink';
import { HubLink } from './parts/HubLink';
import { DonateButton } from './parts/DonateButton';

const SupportBlock: React.FC<SupportBlockProps> = ({ borderColor, containerBg, accentScheme = 'blue', variant = 'modules' }) => {
  const colors = useSupportBlockColors();
  const headerCardBg = containerBg ?? colors.defaultHeaderBg;
  const levelScheme = accentScheme;

  return (
    <Box
      bg={headerCardBg}
      borderWidth="1px"
      borderColor={borderColor ?? colors.defaultBorder}
      borderRadius="2xl"
      py={{ base: 3, md: 4, lg: 5 }}
      px={{ base: 3, md: 4, lg: 5 }}
      position="relative"
      overflow="hidden"
      boxShadow={colors.boxShadow}
    >
      <Stack direction={{ base: 'column', md: 'row' }} align={{ base: 'stretch', md: 'flex-start' }} spacing={5} w="100%">
        <IconBadge levelScheme={levelScheme} borderColor={colors.defaultBorder}>
          <ChatIcon boxSize={6} />
        </IconBadge>
        <VStack align="start" spacing={3} flex={1}>
          <Heading as="h2" size="md" color={colors.titleColor} letterSpacing="-0.01em">
            Поддержка и сообщество
          </Heading>
          {variant === 'weekly' && (
            <Text fontSize={{ base: 'sm', md: 'md' }} color={colors.descColor} lineHeight={1.8}>
              Мы растём вместе — это <b>сообщество</b>. Если по <b>задачам недели</b> есть вопросы — напишите в Telegram.
              Предложите новую задачу или улучшение в JS HUB: ваша идея может попасть в следующую неделю и помочь сотням участников.
              Делайте вклад — и платформа станет сильнее.
            </Text>
          )}
          {variant === 'modules' && (
            <Text fontSize={{ base: 'sm', md: 'md' }} color={colors.descColor} lineHeight={1.8}>
              Если по материалам, задачам что‑то непонятно — пишите в Telegram. Обсуждайте идеи и предлагайте улучшения в JS HUB — обратная связь помогает делать материалы лучше.
            </Text>
          )}
          {variant === 'blog' && (
            <Text fontSize={{ base: 'sm', md: 'md' }} color={colors.descColor} lineHeight={1.8}>
              Хотите стать автором или предложить тему? Напишите в Telegram — поможем упаковать идею в структуру и довести до публикации. Черновик, план или ссылка на документ — всё ок.
            </Text>
          )}
          {variant === 'project' && (
            <Text fontSize={{ base: 'sm', md: 'md' }} color={colors.descColor} lineHeight={1.8}>
              Делаете <b>проект</b> и застряли — задайте вопрос в Telegram. Покажите свой PR в JS HUB, получите обратную связь и помогите другим участникам. Мы рядом, чтобы вы довели проект до результата.
            </Text>
          )}
          <Stack direction={{ base: 'column', md: 'row' }} align={{ base: 'stretch', md: 'flex-start' }} spacing={{ base: 2.5, md: 3 }} pt={1} w="100%" flexWrap={{ base: 'nowrap', md: 'wrap' }}>
            <TelegramLink
              colors={colors}
              label={variant === 'blog' ? 'Редакция в Telegram' : undefined}
              ariaLabel={variant === 'blog' ? 'Редакция в Telegram (откроется в новой вкладке)' : undefined}
            />
            <HubLink
              colors={colors}
              label={variant === 'blog' ? 'Предложить статью' : undefined}
              ariaLabel={variant === 'blog' ? 'Предложить статью (откроется в новой вкладке)' : undefined}
            />
            {variant === 'weekly' && <DonateButton />}
          </Stack>
        </VStack>
      </Stack>
    </Box>
  );
};

export default SupportBlock;


