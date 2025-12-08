import React from 'react';
import { Box, SimpleGrid, Text, HStack, Avatar, AvatarGroup } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronRightIcon, StarIcon, ViewIcon } from '@chakra-ui/icons';
import { arrowLoop } from './animations';
import type { ProjectsGridProps } from './types';

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ modId, projects, colors }) => {
  if (projects.length === 0) {
    return (
      <Box borderWidth="2px" borderColor={colors.borderColor} bg={colors.cardBg} p={5} borderRadius="xl">
        <Text color={colors.descColor}>Проектов пока нет.</Text>
      </Box>
    );
  }
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      {projects.map((p) => (
        <Box key={p.id} as={RouterLink} to={`/learn/${modId}/projects/${p.id}`} aria-label={`Открыть проект: ${p.title}`} w="100%" borderWidth="2px" borderColor={colors.borderColor} bg={colors.cardBg} transition="all 180ms ease" p={5} borderRadius="xl" display="flex" gap={3} alignItems="flex-start" position="relative" overflow="hidden" boxShadow={'none'} _before={{ content: '""', position: 'absolute', top: 0, bottom: 0, left: 0, width: '4px', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px', background: colors.headerAccent, opacity: 0.9 }} _hover={{ background: colors.cardHoverBg, textDecoration: 'none', transform: 'translateY(-4px)', borderColor: colors.heroBorder, boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)' }}>
          <Box position="relative" minW="28px" h="28px" display="flex" alignItems="center" justifyContent="center">
            <Box borderRadius="full" bg={colors.indexBg} color={colors.indexTextColor} display="flex" alignItems="center" justifyContent="center" fontSize="sm" fontWeight="bold" w="28px" h="28px" borderWidth="2px" borderColor={colors.chipBorder}>P</Box>
          </Box>
          <Box flex="1" minW={0}>
            <Text fontWeight="semibold" noOfLines={2} wordBreak="break-word" overflowWrap="anywhere" style={{ hyphens: 'auto' }}>{p.title}</Text>
            <HStack spacing={3} fontSize="xs" color={colors.descColor} mt={1}>
              <HStack spacing={1}>
                <StarIcon boxSize={3} color="yellow.400" />
                <Box as="span">{typeof (p as any).ratingCount === 'number' ? (p as any).ratingCount : 0}</Box>
              </HStack>
              <HStack spacing={1}>
                <ViewIcon boxSize={3} />
                <Box as="span">{typeof (p as any).views === 'number' ? (p as any).views : 0}</Box>
              </HStack>
            </HStack>
            <HStack spacing={2} flexWrap="wrap" mt="auto" pt={1}>
              {Array.isArray(p.authors) && p.authors.length > 0 && (
                <Box fontSize="xs" color={colors.accent} bg="transparent" px={2.5} py={1} borderRadius="full" borderWidth="1px" borderStyle="dashed" borderColor={colors.chipBorder} display="inline-flex" alignItems="center" gap={2} onClick={(e: React.MouseEvent<HTMLDivElement>) => { e.stopPropagation(); }}>
                  <AvatarGroup size="sm" max={3} spacing="-8px">
                    {p.authors.map((a: { username: string; name?: string }) => (
                      <Avatar key={a.username} as="button" onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); try { window.open(`https://github.com/${a.username}`, '_blank', 'noopener,noreferrer'); } catch {} }} onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); }} onTouchStart={(e: React.TouchEvent<HTMLButtonElement>) => { e.stopPropagation(); }} name={a.name} src={`https://avatars.githubusercontent.com/${a.username}?s=40`} boxSize="24px" border="0" aria-label={`GitHub ${a.name}`} />
                    ))}
                  </AvatarGroup>
                  {p.authors.length === 1 ? 'Автор' : 'Авторы'}
                </Box>
              )}
              <Box as="span" fontSize="xs" color={colors.accent} bg={colors.chipBg} borderWidth="1px" borderColor={colors.chipBorder} px={2.5} py={1} borderRadius="full" display="inline-flex" alignItems="center" gap={1}>
                Открыть проект
                <Box as={ChevronRightIcon} boxSize={3.5} ml={0.5} animation={`${arrowLoop} 900ms ease-in-out infinite`} />
              </Box>
            </HStack>
          </Box>
          <Box as={ChevronRightIcon} boxSize={5} color={colors.accent} opacity={0.7} ml={2} alignSelf="start" animation={`${arrowLoop} 1200ms ease-in-out infinite`} display={{ base: 'none', md: 'block' }} />
        </Box>
      ))}
    </SimpleGrid>
  );
};


