import React from 'react';

type UseModulesFaqControllerParams = {
  variantKey: string;
  itemsCount: number;
};

type UseModulesFaqControllerResult = {
  openIdx: number | null;
  toggleIdx: (idx: number) => void;
};

export const useModulesFaqController = ({
  variantKey,
  itemsCount,
}: UseModulesFaqControllerParams): UseModulesFaqControllerResult => {
  const [openIdx, setOpenIdx] = React.useState<number | null>(itemsCount > 0 ? 0 : null);

  React.useEffect(() => {
    // When variant changes, keep behavior consistent: first item opened by default.
    setOpenIdx(itemsCount > 0 ? 0 : null);
  }, [variantKey, itemsCount]);

  const toggleIdx = React.useCallback((idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  }, []);

  return { openIdx, toggleIdx };
};

