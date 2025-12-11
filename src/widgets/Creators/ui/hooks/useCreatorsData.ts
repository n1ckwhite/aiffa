import React from "react";
import { creators } from "../../model/creators";

export const useCreatorsData = () => {
  const items = React.useMemo(() => creators, []);
  return { items };
};


