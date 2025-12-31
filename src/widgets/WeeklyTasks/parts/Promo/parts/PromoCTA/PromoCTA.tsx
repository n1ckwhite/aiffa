import React from 'react';
import { HStack, Button, Link } from '@chakra-ui/react';
import { AddIcon, ExternalLinkIcon, ChatIcon } from '@chakra-ui/icons';
import { usePromoColors } from '../../colors/usePromoColors';

const PromoCTA: React.FC = () => {
  const { addTaskBg,  addTaskHoverBg } = usePromoColors()

  return (
    <HStack spacing={{ base: 3, md: 4 }} wrap="wrap" justify="center" pt={{ base: 1, md: 2 }}>
      <Link href="https://github.com/n1ckwhite/JavaScript-Universe/issues/new/choose" isExternal>
        <Button
          as="span"
          bg={addTaskBg}
          color="white"
          _hover={{ bg: addTaskHoverBg, transform: 'translateY(-1px)', boxShadow: 'md' }}
          _active={{ bg: addTaskBg, transform: 'translateY(0)' }}
          leftIcon={<AddIcon />}
          borderRadius="full"
          w={{ base: '100%', sm: 'auto' }}
          size={{ base: 'md', md: 'lg' }}
          px={{ base: 6, md: 7 }}
        >
          Добавить задачу недели
        </Button>
      </Link>
      <Link href="https://t.me/nickwhite_web" isExternal>
        <Button
          as="span"
          variant="outline"
          leftIcon={<ChatIcon />}
          rightIcon={<ExternalLinkIcon />}
          borderRadius="full"
          w={{ base: '100%', sm: 'auto' }}
          size={{ base: 'md', md: 'lg' }}
          px={{ base: 6, md: 7 }}
          _hover={{ transform: 'translateY(-1px)', boxShadow: 'sm' }}
          _active={{ transform: 'translateY(0)' }}
        >
          Команда сообщества
        </Button>
      </Link>
    </HStack>
  );
};

export default PromoCTA;


