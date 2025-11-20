import React from 'react';
import { Avatar, Box, HStack, Link, Text, VStack } from '@chakra-ui/react';
import type { AuthorCardProps } from './types';

export const AuthorCard: React.FC<AuthorCardProps> = ({ author, borderColor, descColor, linkColor }) => {
  if (!author) return null;
  return (
    <Box borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={{ base: 3, md: 4 }} bg="transparent">
      <HStack spacing={3} align="center">
        <Avatar name={author.name} src={`https://avatars.githubusercontent.com/${author.username}?s=80`} boxSize={{ base: '32px', md: '36px' }} />
        <VStack spacing={0.5} align="start">
          <Text fontSize="sm" color={descColor}>
            Автор:{' '}
            <Link href={`https://github.com/${author.username}`} isExternal color={linkColor} fontWeight="semibold">
              {author.name}
            </Link>
          </Text>
          <Text fontSize="xs" color={descColor}>Спасибо за вклад в сообщество! &#x2728;</Text>
        </VStack>
      </HStack>
    </Box>
  );
};


