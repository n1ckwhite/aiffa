import React from 'react';
import { Box, HStack, Heading, Text, Stack, Button } from '@chakra-ui/react';
import { moduleIconById } from '../constants';
import type { HeaderCardProps } from './types/types';
import { getModuleProjectsDescription } from '../../data';
import PillBadge from 'shared/ui/PillBadge';
import { AppButtonLink } from 'shared/ui/AppLink';

export const HeaderCard: React.FC<HeaderCardProps> = ({ mod, projectsCount, projectsLabel, levelLabel, colors }) => {
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
      bg={colors.heroBg}
      borderWidth="2px"
      borderColor={colors.heroBorder}
      borderRadius="xl"
      p={{ base: 4, md: 6 }}
      position="relative"
      boxShadow={{ base: 'sm', md: 'md' }}
      overflow="hidden"
      _after={{ content: '""', position: 'absolute', left: 6, right: 6, top: 0, height: '4px', bg: `linear-gradient(90deg, ${colors.headerAccent}, rgba(167,139,250,0.25))`, transformOrigin: 'left', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', zIndex: 2 }}
      _before={{ content: '""', position: 'absolute', inset: 0, bgImage: 'radial-gradient(120px 120px at 12% 22%, rgba(167,139,250,0.16), transparent 55%), radial-gradient(160px 160px at 88% 18%, rgba(167,139,250,0.12), transparent 55%)', pointerEvents: 'none', zIndex: 0 }}
    >
      {backgroundIcon ? (
        <Box
          aria-hidden="true"
          position="absolute"
          right={{ base: '-14px', md: '-20px' }}
          top="50%"
          transform="translateY(-50%) rotate(-14deg)"
          opacity={{ base: 0.1, md: 0.14 }}
          color={colors.heroBorder}
          pointerEvents="none"
          zIndex={0}
        >
          {backgroundIcon}
        </Box>
      ) : null}

      <Box position="relative" zIndex={1}>
        <HStack align="center" spacing={{ base: 2, md: 3 }} mb={1}>
          <Box w={{ base: '40px', sm: '44px', md: '52px' }} h={{ base: '40px', sm: '44px', md: '52px' }} borderRadius="lg" bg={`linear-gradient(135deg, ${colors.iconBg}, ${colors.iconGradientEnd})`} color={colors.headerAccent} display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
            <Box position="relative" zIndex={1}>{moduleIconById[mod.id]}</Box>
          </Box>
          <Heading as="h1" color={colors.titleColor} letterSpacing="-0.02em" fontSize={{ base: '20px', sm: 'xl', md: '2xl' }}>{mod.title}</Heading>
        </HStack>
        <HStack gap={3} align="center" flexWrap="wrap" mt={1}>
          <PillBadge colorScheme="purple">
            {projectsCount > 0 ? `${projectsCount} ${projectsLabel}` : 'Проекты'}
          </PillBadge>
          <PillBadge
            colorScheme={
              (levelLabel === 'Начальный'
                ? 'green'
                : levelLabel === 'Средний'
                ? 'yellow'
                : 'red') as any
            }
            variant="outline"
          >
            {levelLabel}
          </PillBadge>
          <PillBadge colorScheme="purple" variant="outline">
            Практика
          </PillBadge>
        </HStack>
        <Text
          mt={3}
          fontSize={{ base: 'sm', md: 'md' }}
          lineHeight={1.7}
          color={colors.descColor}
          maxW={{ base: '100%', md: '74%' }}
        >
          {getModuleProjectsDescription(mod.id)}
        </Text>
        <Stack
          direction={{ base: 'column', xl: 'row' }}
          spacing={{ base: 2.5, md: 3 }}
          pt={3}
          align={{ base: 'stretch', xl: 'center' }}
        >
          <AppButtonLink to={`/learn/${mod.id}`} variant="outline" borderRadius="full">
            К материалам
          </AppButtonLink>
        </Stack>
      </Box>
    </Box>
  );
};


