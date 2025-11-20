import React from 'react';
import type { WeeklyTasksHeaderProps } from './types';
import { useHeaderColors } from './colors/useHeaderColors';
import { Title, SubTitle } from './parts';

const Header: React.FC<WeeklyTasksHeaderProps> = () => {
  const { iconColor } = useHeaderColors();
  return (
    <>
      <Title iconColor={iconColor} />
      <SubTitle />
    </>
  );
};

export default Header;


