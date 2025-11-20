import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { ModuleProjectsView } from 'widgets/ModuleProjects';
import { useModuleProjectsLoad } from 'widgets/ModuleProjects/hooks/useModuleProjectsLoad';

const ModuleProjectsPage: FC = () => {
  const params = useParams();
  const { mod, loading } = useModuleProjectsLoad(params.moduleId);
  if (loading || !mod) return (<Box pb="32px" />);
  return (<ModuleProjectsView mod={mod} />);
};

export default ModuleProjectsPage;


