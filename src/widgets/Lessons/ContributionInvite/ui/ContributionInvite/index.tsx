import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { useContributionInviteColors } from '../../colors';
import type { ContributionInviteProps } from '../../types';
import { BadgeIcon } from '../parts/BadgeIcon';
import { ContributionHeader } from '../parts/Header';
import { ContributionActions } from '../parts/Actions';

const ContributionInvite: React.FC<ContributionInviteProps> = ({ variant = 'materials' }) => {
  const { containerBorder, containerBg, boxShadow } = useContributionInviteColors();
  return (
    <Box zIndex={10} borderWidth="1px" borderColor={containerBorder} borderRadius="2xl" p={{ base: 4, md: 5 }} bg={containerBg} boxShadow={boxShadow} mt={4}>
      <Stack direction={{ base: 'column', md: 'row' }} align={{ base: 'stretch', md: 'flex-start' }} spacing={5}>
        <BadgeIcon />
        <Box flex={1}>
          <ContributionHeader variant={variant} />
          <ContributionActions />
        </Box>
      </Stack>
    </Box>
  );
};

export default ContributionInvite;


