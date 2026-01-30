import React from 'react';
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  Text,
  VisuallyHidden,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import CourseCard from 'entities/CourseCard';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FiSearch, FiX } from 'react-icons/fi';
import { useDebouncedCallback } from 'use-debounce';
import { Pagination } from 'shared/ui/Pagination';
import { ResultsEmptyState } from 'shared/ui/ResultsEmptyState';
import { useAppColors } from 'shared/theme/colors';
import { type CourseGridProps } from 'widgets/CourseGrid';
import { HeaderBlock } from './parts';
import { useCourseGridData } from './hooks/useCourseGridData';

const clampPage = (value: number, totalPages: number) => {
  const safe = Number.isFinite(value) ? value : 1;
  const safeTotal = Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1;
  return Math.min(Math.max(safe, 1), safeTotal);
};

const makePageItems = (total: number, current: number, radius = 2, fullLimit = 7) => {
  if (total <= fullLimit) return Array.from({ length: total }, (_, i) => i + 1) as (number | string)[];
  const items: (number | string)[] = [];
  items.push(1);
  const left = Math.max(2, current - radius);
  const right = Math.min(total - 1, current + radius);
  if (left > 2) items.push('…');
  for (let i = left; i <= right; i++) items.push(i);
  if (right < total - 1) items.push('…');
  items.push(total);
  return items;
};

const CourseGrid: React.FC<CourseGridProps> = ({ category = 'all', showHeader = true }) => {
  const { courses, moduleMeta } = useCourseGridData(category);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const theme = useAppColors();

  const perPage = 6;
  const rawQueryFromUrl = (searchParams.get('q') ?? '').toString();
  const rawPageFromUrl = searchParams.get('page') ?? '1';

  const searchInputRef = React.useRef<HTMLInputElement | null>(null);
  const [draftQuery, setDraftQuery] = React.useState<string>(rawQueryFromUrl);

  // Keep input in sync with external updates (back/forward, manual URL edits),
  // but don't override while user is typing (prevents “lost characters”).
  React.useEffect(() => {
    const isFocused =
      typeof document !== 'undefined' &&
      !!searchInputRef.current &&
      document.activeElement === searchInputRef.current;

    if (isFocused) {
      if (!rawQueryFromUrl && draftQuery) setDraftQuery('');
      return;
    }

    setDraftQuery(rawQueryFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawQueryFromUrl]);

  const normalizedQuery = React.useMemo(() => rawQueryFromUrl.trim().toLowerCase(), [rawQueryFromUrl]);
  const filteredCourses = React.useMemo(() => {
    if (!normalizedQuery) return courses;
    return courses.filter((course) => {
      const haystack = `${course.title} ${course.description}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [courses, normalizedQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / perPage));
  const parsedPage = Number(rawPageFromUrl);
  const safePage = Number.isFinite(parsedPage) ? Math.trunc(parsedPage) : 1;
  const currentPage = clampPage(safePage, totalPages);

  const pageSliceStart = (currentPage - 1) * perPage;
  const paginatedCourses = filteredCourses.slice(pageSliceStart, pageSliceStart + perPage);

  const controlsBg = useColorModeValue('white', 'gray.800');
  const controlsBorder = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
  const controlsHoverBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.200');
  const controlsIcon = useColorModeValue('gray.700', 'gray.200');

  const searchBg = useColorModeValue('white', 'gray.800');
  const searchBorder = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
  const searchShadow = useColorModeValue('0 10px 26px rgba(15, 23, 42, 0.08)', '0 14px 28px rgba(0, 0, 0, 0.35)');
  const searchHoverShadow = useColorModeValue(
    '0 14px 34px rgba(15, 23, 42, 0.12)',
    '0 16px 34px rgba(0, 0, 0, 0.45)',
  );
  const searchHoverBorder = useColorModeValue('blackAlpha.300', 'whiteAlpha.300');
  const searchPlaceholder = useColorModeValue('gray.500', 'whiteAlpha.700');
  const searchIconBg = useColorModeValue('blue.50', 'whiteAlpha.200');
  const clearButtonHoverBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.200');
  const clearButtonActiveBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.300');

  const paginationColors = React.useMemo(
    () => ({
      controlsBg,
      controlsBorder,
      controlsHoverBg,
      controlsIcon,
      descColor: theme.descColor,
    }),
    [controlsBg, controlsBorder, controlsHoverBg, controlsIcon, theme.descColor],
  );

  const buildLearnHref = React.useCallback(
    (params: { page: number; q?: string }) => {
      const safe = Number.isFinite(params.page) && params.page > 0 ? params.page : 1;
      const basePath = safe <= 1 ? pathname : `${pathname}?page=${safe}`;
      const sp = new URLSearchParams();
      const q = (params.q ?? '').toString();
      if (q) sp.set('q', q);
      const nextSearch = sp.toString();
      return nextSearch ? `${basePath}${basePath.includes('?') ? '&' : '?'}${nextSearch}` : basePath;
    },
    [pathname],
  );

  const handleNavigate = React.useCallback(
    (next: { page: number; q?: string }) => {
      router.replace(buildLearnHref(next), { scroll: false });
    },
    [router, buildLearnHref],
  );

  const debouncedNavigateByQuery = useDebouncedCallback((nextQuery: string) => {
    // Filter changes reset page to 1
    handleNavigate({ page: 1, q: nextQuery });
  }, 220);

  React.useEffect(() => {
    if (safePage !== currentPage) {
      handleNavigate({ page: currentPage, q: rawQueryFromUrl });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safePage, currentPage]);

  const pageItems = React.useMemo<(number | string)[]>(
    () => makePageItems(totalPages, currentPage, 2, 7),
    [totalPages, currentPage],
  );
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const getPageHref = React.useCallback(
    (targetPage: number) => buildLearnHref({ page: targetPage, q: rawQueryFromUrl }),
    [buildLearnHref, rawQueryFromUrl],
  );

  return (
    <Box w="full" minW={0} maxW="1200px" mx="auto" pb="40px">
      <VStack spacing={{ base: 8, md: 12 }} align="stretch" w="full" minW={0}>
          {showHeader && (
            <HeaderBlock
              title="Материалы экосистемы"
              subtitle="Изучайте JavaScript экосистему пошагово, от основ до продвинутых технологий"
            />
          )}

          <Box w="full" minW={0} display="flex" justifyContent="center">
            <Box
              as="form"
              role="search"
              aria-label="Поиск по материалам"
              onSubmit={(e: React.FormEvent) => e.preventDefault()}
              w="full"
              maxW="560px"
            >
              <HStack spacing={3} justify="flex-start" flexWrap="wrap" w="full">
                <InputGroup
                  size="lg"
                  h="56px"
                  bg={searchBg}
                  borderWidth="1px"
                  borderColor={searchBorder}
                  borderRadius="full"
                  boxShadow={searchShadow}
                  transition="box-shadow 180ms ease, border-color 180ms ease, transform 180ms ease"
                  _hover={{ boxShadow: searchHoverShadow, borderColor: searchHoverBorder }}
                  w="full"
                  maxW="full"
                >
                  <VisuallyHidden as="label" htmlFor="learn-search">
                    Поиск по материалам
                  </VisuallyHidden>

                  <InputLeftElement pointerEvents="none" h="56px" w="56px">
                    <Box
                      boxSize="40px"
                      borderRadius="full"
                      bg={searchIconBg}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color={theme.blue.accent}
                    >
                      <Icon as={FiSearch} aria-hidden="true" boxSize={5} />
                    </Box>
                  </InputLeftElement>

                  <Input
                    ref={searchInputRef}
                    value={draftQuery}
                    onChange={(e) => {
                      const next = e.target.value;
                      setDraftQuery(next);
                      debouncedNavigateByQuery(next);
                    }}
                    placeholder="Найти материал"
                    aria-label="Поиск по материалам"
                    id="learn-search"
                    name="learn-search"
                    autoComplete="off"
                    h="56px"
                    border="none"
                    bg="transparent"
                    pl="60px"
                    pr={draftQuery ? '56px' : 6}
                    fontWeight="semibold"
                    color={theme.titleColor}
                    _placeholder={{ color: searchPlaceholder, fontWeight: 'medium' }}
                    _focusVisible={{ boxShadow: 'none' }}
                  />

                  {draftQuery.trim() && (
                    <InputRightElement h="56px" w="56px">
                      <IconButton
                        aria-label="Очистить поиск"
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          debouncedNavigateByQuery.cancel();
                          setDraftQuery('');
                          handleNavigate({ page: 1, q: '' });
                          window.setTimeout(() => searchInputRef.current?.focus(), 0);
                        }}
                        icon={<Icon as={FiX} aria-hidden="true" boxSize={5} />}
                        boxSize="40px"
                        p={0}
                        borderRadius="full"
                        color={theme.descColor}
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                        _hover={{ bg: clearButtonHoverBg }}
                        _active={{ bg: clearButtonActiveBg }}
                      />
                    </InputRightElement>
                  )}
                </InputGroup>
              </HStack>
            </Box>
          </Box>

          {filteredCourses.length === 0 ? (
            <ResultsEmptyState colors={theme} query={rawQueryFromUrl} variant="search" allItemsLabel="материалы" />
          ) : (
            <SimpleGrid
              columns={{ base: 1, md: 2, xl: 3 }}
              spacing={{ base: 5, md: 6 }}
              w="full"
              minW={0}
              alignItems="stretch"
            >
              {paginatedCourses.map((course, index) => (
                <Box key={course.id} data-index={index} sx={{ animation: 'none' }} h="full" w="full" minW={0}>
                  <CourseCard
                    moduleId={course.moduleId}
                    title={course.title}
                    description={course.description}
                    lessonsCount={course.lessonsCount}
                    studyTime={course.studyTime}
                    starsCount={moduleMeta[course.moduleId]?.stars ?? 0}
                    views={moduleMeta[course.moduleId]?.views ?? 0}
                    commentsCount={moduleMeta[course.moduleId]?.comments ?? 0}
                    topAuthors={(moduleMeta[course.moduleId]?.authors ?? []).slice(0, 3)}
                    otherAuthorsCount={Math.max(
                      0,
                      (moduleMeta[course.moduleId]?.authors?.length ?? 0) -
                        (moduleMeta[course.moduleId]?.authors ?? []).slice(0, 3).length,
                    )}
                    level={course.level}
                    icon={course.icon}
                    to={`/learn/${course.moduleId}`}
                  />
                </Box>
              ))}
            </SimpleGrid>
          )}

          {filteredCourses.length > 0 && totalPages > 1 && (
            <Box as="nav" aria-label="Пагинация материалов" w="full" maxW="100%" mt={{ base: 2, md: 3 }}>
              <Pagination
                pageItems={pageItems}
                page={currentPage}
                canPrev={canPrev}
                canNext={canNext}
                onPrev={() => handleNavigate({ page: Math.max(1, currentPage - 1), q: rawQueryFromUrl })}
                onNext={() => handleNavigate({ page: Math.min(totalPages, currentPage + 1), q: rawQueryFromUrl })}
                onSelect={(p) => handleNavigate({ page: p, q: rawQueryFromUrl })}
                getPageHref={getPageHref}
                colors={paginationColors}
              />
            </Box>
          )}
        </VStack>
    </Box>
  );
};

export default CourseGrid;


