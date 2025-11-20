import React from 'react';
import { Button, Icon, useToast } from '@chakra-ui/react';
import { handleDonate as donateHelper } from 'utils/donate';
import { FaHeart } from 'react-icons/fa6';

export const DonateButton: React.FC = () => {
  const toast = useToast();
  return (
    <Button
      onClick={() => donateHelper({ toast, closeAllToasts: toast.closeAll })}
      leftIcon={<Icon as={FaHeart as unknown as React.ElementType} />}
      colorScheme="pink"
      variant="solid"
      borderRadius="full"
      px={{ base: 5, md: 6 }}
      py={{ base: 2.5, md: 3 }}
      w={{ base: '100%', sm: 'auto' }}
      size={{ base: 'md', md: 'lg' }}
      iconSpacing={3}
      fontWeight="semibold"
      _hover={{ transform: 'translateY(-1px)' }}
      _active={{ transform: 'translateY(0)' }}
      aria-label="Поддержать проект"
    >
      Поддержать
    </Button>
  );
};


