import React from 'react';
import type { ProfileHeaderProps } from '../types/Header.types';
import { VStack } from '@chakra-ui/react';
import { AvatarBlock, ActionsRow } from './parts';

const Header: React.FC<ProfileHeaderProps> = ({ name, bio, avatarUrl, onOpenEdit, onReset, resetColor, resetHoverBg, resetActiveBg }) => {
  return (
    <VStack align="center" spacing={4}>
      <AvatarBlock name={name} bio={bio} avatarUrl={avatarUrl} />
      <ActionsRow onOpenEdit={onOpenEdit} onReset={onReset} resetColor={resetColor} resetHoverBg={resetHoverBg} resetActiveBg={resetActiveBg} />
    </VStack>
  );
};

export default Header;


