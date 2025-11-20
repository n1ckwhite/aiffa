import React from 'react';
import { Box, HStack, Heading, Badge, Text, Stack, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { moduleIconById } from '../constants';
import type { HeaderCardProps } from './types/types';
import { getModuleProjectsDescription } from '../../data';

export const HeaderCard: React.FC<HeaderCardProps> = ({ mod, projectsCount, projectsLabel, levelLabel, colors }) => {
  return (
    <Box bg={colors.heroBg} borderWidth="2px" borderColor={colors.heroBorder} borderRadius="xl" p={{ base: 4, md: 6 }} position="relative" boxShadow={{ base: 'sm', md: 'md' }} overflow="hidden" _after={{ content: '""', position: 'absolute', left: 6, right: 6, top: 0, height: '4px', bg: `linear-gradient(90deg, ${colors.headerAccent}, rgba(167,139,250,0.25))`, transformOrigin: 'left', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} _before={{ content: '""', position: 'absolute', inset: 0, bgImage: 'radial-gradient(120px 120px at 12% 22%, rgba(167,139,250,0.16), transparent 55%), radial-gradient(160px 160px at 88% 18%, rgba(167,139,250,0.12), transparent 55%)', pointerEvents: 'none' }}>
      <HStack align="center" spacing={{ base: 2, md: 3 }} mb={1}>
        <Box w={{ base: '40px', sm: '44px', md: '52px' }} h={{ base: '40px', sm: '44px', md: '52px' }} borderRadius="lg" bg={`linear-gradient(135deg, ${colors.iconBg}, ${colors.iconGradientEnd})`} color={colors.headerAccent} display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
          <Box position="relative" zIndex={1}>{moduleIconById[mod.id]}</Box>
        </Box>
        <Heading as="h1" color={colors.titleColor} letterSpacing="-0.02em" fontSize={{ base: '20px', sm: 'xl', md: '2xl' }}>{mod.title}</Heading>
      </HStack>
      <HStack gap={3} align="center" flexWrap="wrap" mt={1}>
        <Badge colorScheme="purple" borderRadius="full" px={3} py={1} fontWeight="semibold" fontSize="xs">{projectsCount > 0 ? `${projectsCount} ${projectsLabel}` : 'Проекты'}</Badge>
        <Badge colorScheme={levelLabel === 'Начальный' ? 'green' : levelLabel === 'Средний' ? 'yellow' : 'red'} borderRadius="full" px={3} py={1} fontWeight="semibold" fontSize="xs">{levelLabel}</Badge>
        <Badge colorScheme="purple" variant="outline" borderRadius="full" px={3} py={1} fontWeight="semibold" fontSize="xs">Практика</Badge>
      </HStack>
      <Text
        mt={3}
        fontSize={{ base: 'sm', md: 'md' }}
        lineHeight={1.7}
        color={colors.descColor}
        maxW={{ base: '100%', md: '80%' }}
      >
        {getModuleProjectsDescription(mod.id)}
      </Text>
      <Stack direction={{ base: 'column', sm: 'row' }} spacing={{ base: 2.5, md: 3 }} pt={3} align={{ base: 'stretch', sm: 'center' }}>
        <Button
          as={RouterLink}
          to={`/learn/${mod.id}`}
          variant="outline"
          borderRadius="full"
        >
          К материалам
        </Button>
        <Button
          as="a"
          href="https://github.com/n1ckwhite/JavaScript-Universe"
          target="_blank"
          rel="noopener noreferrer"
          borderRadius="full"
          bg="purple.200"
          color="gray.900"
          _hover={{ bg: 'purple.300' }}
        >
          Предложить проект
        </Button>
      </Stack>
    </Box>
  );
};


