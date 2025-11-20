import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export const useOpenModuleId = () => {
  const location = useLocation();
  const params = useParams();
  const [openModuleId, setOpenModuleId] = React.useState<string>(() => params.moduleId || '');

  React.useEffect(() => {
    const parts = location.pathname.split('/');
    const idx = parts.indexOf('learn');
    const modId = idx >= 0 ? parts[idx + 1] : undefined;
    if (modId && modId !== openModuleId) setOpenModuleId(modId);
  }, [location.pathname, openModuleId]);

  return { openModuleId };
};


