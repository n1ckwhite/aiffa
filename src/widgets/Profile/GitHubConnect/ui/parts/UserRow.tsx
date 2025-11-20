import React from 'react';
import { HStack, Avatar, Text } from '@chakra-ui/react';

export type UserRowProps = {
  username?: string;
  profileName: string;
  avatarUrl?: string;
};

const UserRow: React.FC<UserRowProps> = ({ username, profileName, avatarUrl }) => {
  if (!username) return null;
  const href = `https://github.com/${username}`;
  return (
    <HStack spacing={3} pt={1}>
      <Avatar size="sm" src={avatarUrl || undefined} name={profileName || 'User'} />
      <Text fontSize="sm" noOfLines={1}>{profileName}</Text>
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#3182CE', fontSize: '0.875rem' }}>GitHub профиль</a>
    </HStack>
  );
};

export default UserRow;


