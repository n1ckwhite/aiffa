import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { handleDonate as donateHelper } from '../../../utils/donate';
import { useScrollToTop } from 'shared/hooks/useScrollToTop';

export const useStartCTAHandlers = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const scrollTop = useScrollToTop({ immediate: false });

  const handleDonate = () =>
    donateHelper({
      toast,
      closeAllToasts: toast.closeAll,
    });

  const openModules = () => {
    navigate('/learn');
    scrollTop();
  };

  return { handleDonate, openModules };
};


