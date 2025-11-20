import React from 'react';
import { Avatar, Heading, Text, VStack } from '@chakra-ui/react';

export type AvatarBlockProps = {
  name: string;
  bio: string;
  avatarUrl?: string;
};

const AvatarBlock: React.FC<AvatarBlockProps> = ({ name, bio, avatarUrl }) => {
  return (
    <VStack align="center" spacing={4}>
      <Avatar size="xl" name={name || 'User'} src={avatarUrl || undefined} bg={(avatarUrl ? 'transparent' : 'green.400')} />
      <Heading as="span" size="md" noOfLines={1} textAlign="center">
        <Text as="span" noOfLines={1}>{name || 'Пользователь'}</Text>
      </Heading>
      <Text textAlign="center" maxW="600px" sx={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
        {bio || 'Описание'}
      </Text>
    </VStack>
  );
};

export default AvatarBlock;


