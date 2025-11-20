import React from 'react';
import { Heading, Text, VStack } from '@chakra-ui/react';
import { useContributionInviteColors } from '../../../colors';
import type { ContributionInviteProps } from '../../../types';
import { getContributionTexts } from '../../../model/texts';

export const ContributionHeader: React.FC<ContributionInviteProps> = ({ variant }) => {
  const { titleColor, descColor } = useContributionInviteColors();
  const { title, description } = getContributionTexts(variant);
  return (
    <VStack align="start" spacing={3} flex={1}>
      <Heading as="h2" size="md" color={titleColor} letterSpacing="-0.01em">{title}</Heading>
      <Text fontSize={{ base: 'sm', md: 'md' }} color={descColor} lineHeight={1.8}>
        {description}
      </Text>
    </VStack>
  );
};


