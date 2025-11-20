import React from 'react';
import { HStack, Text, Avatar, Box, Link as ChakraLink } from '@chakra-ui/react';
import { useAuthorColors } from '../../colors/useAuthorColors';
import { AuthorNoteProps } from './types';

const AuthorNote: React.FC<AuthorNoteProps> = ({ name, href, avatar, note }) => {
  const { text, link, noteBg, noteBorder, noteColor } = useAuthorColors();
  return (
    <>
      <HStack spacing={3} mb={4} align="center">
        <Avatar size="sm" name={name} src={avatar} srcSet={avatar ? `${avatar.replace('?s=80','?s=40')} 1x, ${avatar} 2x` : undefined} loading="lazy" />
        <Text fontSize="sm" color={text}>
          Автор изменений:{' '}
          <ChakraLink href={href} isExternal color={link} fontWeight="semibold">
            {name}
          </ChakraLink>
          . Спасибо за вклад в сообщество! &#x2728;
        </Text>
      </HStack>
      <Box role="note" aria-label="Совет автора" bg={noteBg} borderWidth="1px" borderColor={noteBorder} color={noteColor} borderRadius="lg" p={3} mb={4}>
        <Text fontSize="sm">💡 Совет автора: {note}</Text>
      </Box>
    </>
  );
};

export default AuthorNote;


