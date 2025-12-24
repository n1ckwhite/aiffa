import React from 'react';
import { Box, HStack, Heading, Text, Stack, Button } from '@chakra-ui/react';
import { useModuleLevel } from '../../../../hooks/useModuleLevel';
import { moduleDescriptions } from '../ProjectLink/data';
import type { HeaderProps } from './types';
import { glowLine } from '../ProjectLink/animations';
import { ModuleIcon } from './parts/ModuleIcon';
import { LessonsCountBadge } from './parts/LessonsCountBadge';
import { LevelBadge } from './parts/LevelBadge';
import { useHeaderDeco } from './model/useHeaderDeco';
import { moduleIconById } from 'shared/lessons/moduleIcons';
import { AppButtonLink } from 'shared/ui/AppLink';

export const Header: React.FC<HeaderProps> = ({ mod, colors }) => {
  const { level, levelLabel, levelScheme } = useModuleLevel(mod?.id);
  const levelBorderColor = level === 'beginner' ? colors.beginnerBorder : level === 'intermediate' ? colors.intermediateBorder : colors.advancedBorder;
  const lessonsCount = (mod?.lessons || []).length;

  const headerDeco = useHeaderDeco(level);
  const backgroundIcon = React.useMemo(() => {
    const iconNode = moduleIconById[mod.id];
    if (!React.isValidElement(iconNode)) {
      return null;
    }

    return React.cloneElement(iconNode as React.ReactElement<any>, {
      boxSize: { base: '120px', md: '170px' },
      'aria-hidden': true,
      focusable: false,
    });
  }, [mod.id]);

  return (
    <Box
      bg={colors.headerCardBg}
      borderWidth="2px"
      borderColor={levelBorderColor}
      borderRadius="xl"
      p={{ base: 4, md: 6 }}
      position="relative"
      boxShadow={{ base: 'sm', md: 'md' }}
      overflow="hidden"
      _after={{ content: '""', position: 'absolute', left: 6, right: 6, bottom: 0, height: '4px', bg: `linear-gradient(90deg, ${colors.headerAccent}, ${colors.headerGlow})`, transformOrigin: 'left', animation: `${glowLine} 700ms ease-out 1 both`, borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}
      _before={{ content: '""', position: 'absolute', inset: 0, bgImage: headerDeco, pointerEvents: 'none' }}
    >
      {backgroundIcon ? (
        <Box
          aria-hidden="true"
          position="absolute"
          right={{ base: '-14px', md: '-20px' }}
          top="50%"
          transform="translateY(-50%) rotate(-14deg)"
          opacity={{ base: 0.1, md: 0.14 }}
          color={levelBorderColor}
          pointerEvents="none"
          zIndex={0}
        >
          {backgroundIcon}
        </Box>
      ) : null}

      <Box position="relative" zIndex={1}>
        <HStack align="center" spacing={{ base: 2, md: 3 }} mb={2}>
          <ModuleIcon modId={mod.id} colors={colors} />
          <Heading as="h1" color={colors.titleColor} letterSpacing="-0.02em" fontSize={{ base: '20px', sm: 'xl', md: '2xl' }}>{mod.title}</Heading>
        </HStack>
        <HStack gap={3} align="center" flexWrap="wrap">
          <LessonsCountBadge count={lessonsCount} />
          <LevelBadge levelLabel={levelLabel} levelScheme={levelScheme as any} />
          <Text fontSize="sm" color={colors.descColor}>Выберите материал, чтобы начать</Text>
        </HStack>
        <Text mt={3} fontSize={{ base: 'sm', md: 'md' }} lineHeight={1.7} color={colors.descColor} maxW={{ base: '100%', md: '74%' }}>
          {moduleDescriptions[mod.id] || 'Короткий материал с объяснениями и практикой по теме.'}
        </Text>
        <Stack
          direction={{ base: 'column', xl: 'row' }}
          spacing={{ base: 2.5, md: 3 }}
          pt={3}
          align={{ base: 'stretch', xl: 'center' }}
        >
          <AppButtonLink to="/learn" variant="outline" borderRadius="full">
            К материалам
          </AppButtonLink>
          <Button
            as="a"
            href="https://github.com/n1ckwhite/JavaScript-Universe"
            target="_blank"
            rel="noopener noreferrer"
            borderRadius="full"
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
          >
            Предложить материал
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};


