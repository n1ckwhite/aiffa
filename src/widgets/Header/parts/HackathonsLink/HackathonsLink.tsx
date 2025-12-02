import React from 'react';
import { Link, Icon, Text } from '@chakra-ui/react';
import { FaCode } from 'react-icons/fa';
import type { HackathonsLinkProps } from './types';

const HackathonsLink: React.FC<HackathonsLinkProps> = ({ hoverBg, showTextFrom = '2xl' }) => {
  return (
    <Link
      href="/hackathons"
      aria-label="Хакатоны — открыть страницу хакатонов"
      display="inline-flex"
      alignItems="center"
      px={2}
      py={1.5}
      borderRadius="md"
      _hover={{ bg: hoverBg }}
    >
      <Icon as={FaCode} boxSize={4} aria-hidden="true" />
      <Text
        ml={2}
        display={{ base: "none", [showTextFrom]: "inline" }}
        fontSize="sm"
        fontWeight="semibold"
      >
        Хакатоны
      </Text>
    </Link>
  );
};

export default HackathonsLink;



