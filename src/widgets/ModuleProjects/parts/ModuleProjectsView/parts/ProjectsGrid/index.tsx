import React from 'react';
import { Box, SimpleGrid, Text, HStack, Avatar, Icon } from '@chakra-ui/react';
import { ChevronRightIcon, StarIcon } from '@chakra-ui/icons';
import { FiEye, FiMessageCircle } from 'react-icons/fi';
import { arrowLoop } from './animations';
import type { ProjectsGridProps } from './types';
import { formatCount } from 'shared/functions/formatCount';
import { AppBoxLink } from 'shared/ui/AppLink';
import { OpenLinkBadge } from 'widgets/ModuleLessons/parts/LessonCard/parts/Badges/OpenLinkBadge';
import { formatRuDate } from 'shared/functions/formatRuDate';

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ modId, projects, colors }) => {
  if (projects.length === 0) {
    return (
      <Box borderWidth="2px" borderColor={colors.borderColor} bg={colors.cardBg} p={5} borderRadius="xl">
        <Text color={colors.descColor}>Проектов пока нет.</Text>
      </Box>
    );
  }
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} w="full" minW={0}>
      {projects.map((p) => {
        const iso =
          typeof (p as any)?.updatedAt === "string" && String((p as any).updatedAt).trim()
            ? String((p as any).updatedAt).trim()
            : typeof (p as any)?.createdAt === "string" && String((p as any).createdAt).trim()
              ? String((p as any).createdAt).trim()
              : undefined;
        const dateLabel = formatRuDate(iso);
        return (
        <AppBoxLink key={p.id} to={`/learn/${modId}/projects/${p.id}`} aria-label={`Открыть проект: ${p.title}`} w="full" minW={0} borderWidth="2px" borderColor={colors.borderColor} bg={colors.cardBg} transition="all 180ms ease" p={5} borderRadius="xl" display="flex" gap={3} alignItems="flex-start" position="relative" overflow="hidden" boxShadow={'none'} _before={{ content: '""', position: 'absolute', top: 0, bottom: 0, left: 0, width: '4px', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px', background: colors.headerAccent, opacity: 0.9 }} _hover={{ background: colors.cardHoverBg, textDecoration: 'none', transform: 'translateY(-4px)', borderColor: colors.heroBorder, boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)' }}>
          <Box position="relative" minW="28px" h="28px" display="flex" alignItems="center" justifyContent="center">
            <Box borderRadius="full" bg={colors.indexBg} color={colors.indexTextColor} display="flex" alignItems="center" justifyContent="center" fontSize="sm" fontWeight="bold" w="28px" h="28px" borderWidth="2px" borderColor={colors.chipBorder}>P</Box>
          </Box>
          <Box flex="1" minW={0} display="flex" flexDirection="column" h="100%">
            <Text fontWeight="semibold" noOfLines={2} wordBreak="break-word" overflowWrap="anywhere" style={{ hyphens: 'auto' }}>{p.title}</Text>
            <HStack spacing={3} rowGap={1} flexWrap="wrap" fontSize="xs" color={colors.descColor} mt={1} minW={0}>
              <HStack spacing={1} flexShrink={0}>
                <Box as="span">
                  {formatCount(Number((p as any).ratingCount ?? 0))}
                </Box>
                <StarIcon boxSize={3} color="yellow.400" />
              </HStack>
              <HStack spacing={1} flexShrink={0}>
                <Box as="span">
                  {formatCount(Number((p as any).views ?? 0))}
                </Box>
                <Icon as={FiEye} boxSize={3.5} flexShrink={0} />
              </HStack>
              <HStack spacing={1} flexShrink={0}>
                <Box as="span">
                  {formatCount(Number((p as any).commentsCount ?? 0))}
                </Box>
                <Icon as={FiMessageCircle} boxSize={3.5} flexShrink={0} />
              </HStack>
            </HStack>
            <Box mt="auto" pt={1} display="flex" flexDirection="column" gap={1} minW={0}>
              <HStack spacing={2} flexWrap="wrap" minW={0}>
                {Array.isArray(p.authors) && p.authors.length > 0 && p.authors[0] && (
                  <Box
                    fontSize="xs"
                    color={colors.accent}
                    bg="transparent"
                    px={2.5}
                    py={1}
                    borderRadius="full"
                    borderWidth="1px"
                    borderStyle="dashed"
                    borderColor={colors.chipBorder}
                    display="inline-flex"
                    alignItems="center"
                    gap={2}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                      e.stopPropagation();
                    }}
                  >
                    <Avatar
                      as="button"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        try {
                          window.open(
                            `https://github.com/${p.authors![0].username}`,
                            '_blank',
                            'noopener,noreferrer',
                          );
                        } catch {}
                      }}
                      onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
                        e.stopPropagation()
                      }
                      onTouchStart={(
                        e: React.TouchEvent<HTMLButtonElement>,
                      ) => e.stopPropagation()}
                      name={p.authors[0].name}
                      src={`https://avatars.githubusercontent.com/${p.authors[0].username}?s=40`}
                      boxSize="24px"
                      border="0"
                      aria-label={`GitHub ${p.authors[0].name}`}
                    />
                    Автор
                  </Box>
                )}
                <Box as="span" fontSize="xs" color={colors.accent} bg={colors.chipBg} borderWidth="1px" borderColor={colors.chipBorder} px={2.5} py={1} borderRadius="full" display="inline-flex" alignItems="center" gap={1} whiteSpace="nowrap">
                  Открыть проект
                  <Box as={ChevronRightIcon} boxSize={3.5} ml={0.5} animation={`${arrowLoop} 900ms ease-in-out infinite`} />
                </Box>
              </HStack>
              {dateLabel ? (
                <Box as="span" display="inline-flex" alignItems="center" minW={0}>
                  <OpenLinkBadge accentColor={colors.accent} chipBorder={colors.chipBorder} dateLabel={dateLabel} />
                </Box>
              ) : null}
            </Box>
          </Box>
          <Box as={ChevronRightIcon} boxSize={5} color={colors.accent} opacity={0.7} ml={2} alignSelf="start" animation={`${arrowLoop} 1200ms ease-in-out infinite`} display={{ base: 'none', md: 'block' }} />
        </AppBoxLink>
      )})}
    </SimpleGrid>
  );
};


