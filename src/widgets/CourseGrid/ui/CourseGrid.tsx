import React from 'react';
import { Box, SimpleGrid, VStack } from '@chakra-ui/react';
import CourseCard from 'entities/CourseCard';
import { type CourseGridProps } from './types/CourseGrid.types';
import { HeaderBlock } from './parts';
import { courses } from '../model';
import { manifest } from 'shared/lessons/manifest';

type ModuleMeta = {
  stars: number;
  views: number;
  authors: { username: string; name: string; stars: number }[];
  comments: number;
};

const moduleMeta: Record<string, ModuleMeta> = (() => {
  const stats: Record<string, ModuleMeta> = {};

  for (const mod of manifest.modules) {
    let stars = 0;
    let views = 0;
    let comments = 0;
    const authorMap: Record<string, { username: string; name: string; stars: number }> = {};

    const addStarsForAuthors = (
      entry: { authors?: Array<{ username: string; name: string }> },
      starsToAdd: number,
    ) => {
      if (!entry.authors || starsToAdd <= 0) return;
      for (const author of entry.authors) {
        if (!authorMap[author.username]) {
          authorMap[author.username] = {
            username: author.username,
            name: author.name,
            stars: 0,
          };
        }
        authorMap[author.username].stars += starsToAdd;
      }
    };

    for (const lesson of mod.lessons || []) {
      const anyLesson = lesson as any;
      const lessonStars = Number(anyLesson.ratingCount ?? 0);
      const lessonViews = Number(anyLesson.views ?? 0);
      const lessonComments = Number(anyLesson.commentsCount ?? 0);
      stars += lessonStars;
      views += lessonViews;
      comments += lessonComments;
      addStarsForAuthors(anyLesson, lessonStars);
    }

    if (mod.project) {
      const anyProject = mod.project as any;
      const projectStars = Number(anyProject.ratingCount ?? 0);
      const projectViews = Number(anyProject.views ?? 0);
      const projectComments = Number(anyProject.commentsCount ?? 0);
      stars += projectStars;
      views += projectViews;
      comments += projectComments;
      addStarsForAuthors(anyProject, projectStars);
    }

    const authors = Object.values(authorMap).sort((a, b) => b.stars - a.stars);

    stats[mod.id] = {
      stars,
      views,
      authors,
      comments,
    };
  }

  return stats;
})();

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
    </Box>
  );
};

export default CourseGrid;


