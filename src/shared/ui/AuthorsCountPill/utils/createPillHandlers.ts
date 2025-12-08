import type React from 'react';

export const createPillHandlers = (
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void,
) => {
  if (!onClick) {
    return {};
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onClick(event);
  };

  const stop = (event: React.SyntheticEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return {
    onClick: handleClick,
    onMouseDown: stop,
    onTouchStart: stop,
  };
};


