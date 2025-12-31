import React from 'react';
import { Button, Icon, useColorModeValue, useToast } from '@chakra-ui/react';
import { handleDonate as donateHelper } from 'utils/donate';
import { FaHeart } from 'react-icons/fa6';
import { useSupportBlockColors } from '../../colors';

export const DonateButton: React.FC = () => {
  const toast = useToast();
  const { donateBg, donateHoverBg } = useSupportBlockColors()

  return (
    <Button
      onClick={() => donateHelper({ toast, closeAllToasts: toast.closeAll })}
      leftIcon={<Icon as={FaHeart as unknown as React.ElementType} />}
      // Force strong contrast in light theme (Lighthouse a11y)
      bg={donateBg}
      color="white"
      borderRadius="full"
      px={{ base: 5, md: 6 }}
      py={{ base: 2.5, md: 3 }}
      w={{ base: '100%', sm: 'auto' }}
      size={{ base: 'md', md: 'lg' }}
      iconSpacing={3}
      fontWeight="semibold"
      _hover={{ bg: donateHoverBg, transform: 'translateY(-1px)' }}
      _active={{ bg: donateBg, transform: 'translateY(0)' }}
      aria-label="Поддержать проект"
    >
      Поддержать
    </Button>
  );
};


