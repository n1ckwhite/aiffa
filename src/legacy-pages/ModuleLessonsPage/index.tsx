import { FC, useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useUserProfile } from 'entities/user';
import { ModuleLessonsView } from 'widgets/ModuleLessons';
import { useModuleLessonsLoad } from 'widgets/ModuleLessons/hooks/useModuleLessonsLoad';
import { useScrollTopOnChange } from 'widgets/ModuleLessons/hooks/useScrollTopOnChange';

const ModuleLessonsPage: FC = () => {
  const params = useParams();
  const { profile } = useUserProfile();
  const { mod, loading } = useModuleLessonsLoad(params.moduleId);
  useScrollTopOnChange([mod?.id]);

  const solvedMap = useMemo(() => (profile as any)?.solvedTaskIds || {}, [profile]);
  if (loading || !mod) return (<Box pb="32px" />);
  return (<ModuleLessonsView mod={mod} profileSolvedTaskIds={solvedMap} />);
};

export default ModuleLessonsPage;


