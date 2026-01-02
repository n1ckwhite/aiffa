import React from 'react';
import { HStack, Avatar, Link, Text } from '@chakra-ui/react';
import { useColors } from './colors/useColors';
import { withGithubAvatarSize } from '@/shared/lib/github/withGithubAvatarSize';

export type UserRowProps = {
  username?: string;
  profileName: string;
  avatarUrl?: string;
};

const UserRow: React.FC<UserRowProps> = ({ username, profileName, avatarUrl }) => {
  const { githubColor } = useColors()
  if (!username) return null;
  const href = `https://github.com/${username}`;
  return (
    <HStack spacing={3} pt={1}>
      <Avatar size="sm" src={withGithubAvatarSize(avatarUrl, 48)} name={profileName || 'User'} />
      <Text fontSize="sm" noOfLines={1}>{profileName}</Text>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        color={githubColor}
        fontSize="sm"
        fontWeight="semibold"
        textDecoration="underline"
        textUnderlineOffset="3px"
        _hover={{ opacity: 0.9 }}
      >
        GitHub профиль
      </Link>
    </HStack>
  );
};

export default UserRow;


