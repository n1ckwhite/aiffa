import React from 'react';
import { Box, SimpleGrid, VStack } from '@chakra-ui/react';
import CourseCard from 'entities/CourseCard';
import { type CourseGridProps } from './types/CourseGrid.types';
import { HeaderBlock } from './parts';
import { courses } from '../model';

const CourseGrid: React.FC<CourseGridProps> = ({ category = 'all', showHeader = true }) => {

  const filtered = category === 'all' ? courses : courses.filter((c) => c.category === category);

  return (
    <Box>
      <Box maxW="1200px" mx="auto" pb="40px">
        <VStack spacing={{ base: 8, md: 12 }} align="stretch">
          {showHeader && (
            <HeaderBlock
              title="Модули экосистемы"
              subtitle="Изучайте JavaScript экосистему пошагово, от основ до продвинутых технологий"
            />
          )}

          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 5, md: 6 }} w="full">
            {filtered.map((course, index) => (
              <Box key={course.id} data-index={index} sx={{ animation: 'none' }}>
                <CourseCard
                  moduleId={course.moduleId}
                  title={course.title}
                  description={course.description}
                  lessonsCount={course.lessonsCount}
                  studyTime={course.studyTime}
                  level={course.level}
                  icon={course.icon}
                  to={`/learn/${course.moduleId}`}
                />
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </Box>
  );
};

export default CourseGrid;


