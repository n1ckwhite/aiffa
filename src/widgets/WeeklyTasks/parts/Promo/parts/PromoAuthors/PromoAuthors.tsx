import React from 'react';
import { HStack, Text, Avatar, AvatarGroup } from '@chakra-ui/react';
import { usePromoColors } from '../../colors/usePromoColors';
import { weeklyAuthors } from '../../data/authors';

const PromoAuthors: React.FC = () => {
  const { statsTextColor } = usePromoColors();
  return (
    <HStack justify="center" spacing={3} wrap="wrap">
      <AvatarGroup
        size="md"
        max={3}
        // On mobile the default negative spacing makes it very hard to tap a non-top avatar.
        // Keep overlap on desktop, but make avatars more tappable on small screens.
        spacing={{ base: -2, md: -3 }}
        position="relative"
        zIndex={1}
      >
        {weeklyAuthors.map((a) => (
          <Avatar
            key={a.username}
            as="a"
            href={`https://github.com/${a.username}`}
            target="_blank"
            rel="noopener noreferrer"
            name={a.name}
            aria-label={`GitHub ${a.name || a.username}`}
            src={`https://avatars.githubusercontent.com/${a.username}?s=80`}
            srcSet={`https://avatars.githubusercontent.com/${a.username}?s=40 1x, https://avatars.githubusercontent.com/${a.username}?s=80 2x`}
            loading="lazy"
            boxSize={{ base: '38px', md: '40px' }}
          />
        ))}
      </AvatarGroup>
      <Text
        fontSize={{ base: 'sm', md: 'sm' }}
        color={statsTextColor}
        w={{ base: '100%', md: 'auto' }}
        textAlign={{ base: 'center', md: 'left' }}
      >
        Уже <b>9 участников</b> добавили свои задачи.
      </Text>
    </HStack>
  );
};

export default PromoAuthors;


