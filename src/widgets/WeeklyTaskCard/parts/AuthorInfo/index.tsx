import React from 'react';
import { Box, HStack, Image, Text } from '@chakra-ui/react';
import { AuthorInfoProps } from './types';
import { getAvatarFromGithub } from './data';

export const AuthorInfo: React.FC<AuthorInfoProps> = ({ authorName, authorUrl, authorAvatarUrl, authorMutedColor, authorBorderColor, authorLinkColor }) => {
  return (
    <HStack spacing={2} mt={1.5} color={authorMutedColor}>
      <Image
        src={authorAvatarUrl || getAvatarFromGithub(authorUrl, 'octocat', 40)}
        srcSet={`${authorAvatarUrl || getAvatarFromGithub(authorUrl, 'octocat', 40)} 1x, ${authorAvatarUrl || getAvatarFromGithub(authorUrl, 'octocat', 80)} 2x`}
        loading="lazy"
        decoding="async"
        alt={authorName || 'author avatar'}
        boxSize={{ base: '18px', md: '20px' }}
        borderRadius="full"
        borderWidth="1px"
        borderColor={authorBorderColor}
        referrerPolicy="no-referrer"
      />
      <Text fontSize="xs">
        Автор изменений:{' '}
        {authorUrl ? (
          <Box
            as="span"
            color={authorLinkColor}
            fontWeight="semibold"
            textDecoration="underline"
            cursor="pointer"
            onClick={(e: any) => { e.preventDefault?.(); e.stopPropagation?.(); try { window.open(authorUrl, '_blank', 'noopener'); } catch {} }}
          >
            {authorName || 'octocat'}
          </Box>
        ) : (
          <Text as="span" fontWeight="semibold">{authorName || 'octocat'}</Text>
        )}
      </Text>
    </HStack>
  );
};


