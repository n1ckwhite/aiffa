import React from 'react';
import { HStack, Text } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { usePromoColors } from '../../colors/usePromoColors';

const PromoHeading: React.FC = () => {
  const { headingColor } = usePromoColors();
  return (
    <HStack spacing={2} justify="center" color={headingColor}>
      <StarIcon />
      <Text as="span" fontWeight="semibold">Стань автором изменений</Text>
    </HStack>
  );
};

export default PromoHeading;


