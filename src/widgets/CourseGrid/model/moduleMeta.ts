import { manifest } from 'shared/lessons/manifest';
import { ModuleMeta } from './types';

export const buildModuleMeta = (): Record<string, ModuleMeta> => {
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
      comments,
      authors,
    };
  }

  return stats;
};

export const moduleMeta: Record<string, ModuleMeta> = buildModuleMeta();


