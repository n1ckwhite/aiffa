import { FC } from 'react';
import { VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import LessonPageSkeleton from './Skeleton';
import { LessonPageView } from 'widgets/LessonPageView';
import { useLessonLoad } from 'widgets/LessonPageView/hooks/useLessonLoad';

const LessonPage: FC = () => {
  const params = useParams();
  const { lesson, mod, loading } = useLessonLoad(params.moduleId, params.lessonId);

  if (loading || !lesson || !mod) {
    return (<VStack align="stretch" gap={6} pb="32px"><LessonPageSkeleton /></VStack>);
  }

  return (
    <VStack align="stretch" gap={6} pb="32px">
      <LessonPageView lesson={lesson} mod={mod} />
    </VStack>
  );
};

export default LessonPage;


