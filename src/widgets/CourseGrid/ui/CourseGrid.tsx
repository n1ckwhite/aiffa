import React from 'react';
import { Box, SimpleGrid, VStack } from '@chakra-ui/react';
import CourseCard from 'entities/CourseCard';
import { type CourseGridProps } from './types/CourseGrid.types';
import { HeaderBlock } from './parts';
import { useCourseGridData } from './hooks/useCourseGridData';

const CourseGrid: React.FC<CourseGridProps> = ({ category = 'all', showHeader = true }) => {
  const { courses, moduleMeta } = useCourseGridData(category);

  return (
    <Box w="full" minW={0} maxW="1200px" mx="auto" pb="40px">
      <VStack spacing={{ base: 8, md: 12 }} align="stretch" w="full" minW={0}>
          {showHeader && (
            <HeaderBlock
              title="Модули экосистемы"
              subtitle="Изучайте JavaScript экосистему пошагово, от основ до продвинутых технологий"
            />
          )}

          <SimpleGrid
            minChildWidth={{ base: "100%", md: "360px", xl: "380px" }}
            spacing={{ base: 5, md: 6 }}
            w="full"
            minW={0}
            alignItems="stretch"
          >
            {courses.map((course, index) => (
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
        </VStack>
    </Box>
  );
};

export default CourseGrid;


