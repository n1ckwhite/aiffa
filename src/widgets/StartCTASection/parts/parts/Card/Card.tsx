import React from 'react';
import { VStack, HStack, Box, Badge, Text, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useStartCTAColors } from '../../../colors/useStartCTAColors';
import type { CardProps } from './types';

const Card: React.FC<CardProps> = ({
  dotColor,
  dotShadow,
  badgeScheme,
  badgeText,
  title,
  description,
  linkHref,
  linkText,
  gradientBg,
  linkBg,
}) => {
  const { cardBg, titleColor, textColor } = useStartCTAColors();
  return (
    <VStack
      spacing={4}
      p={6}
      bg={cardBg}
      borderRadius="xl"
      align="center"
      justify="space-between"
      h="full"
      textAlign="center"
      boxShadow={{ base: 'sm', md: 'lg' }}
      backdropFilter="auto"
      backdropBlur="8px"
      position="relative"
      _active={{ transform: 'translateY(-2px)' }}
      onTouchStart={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--chakra-shadows-xl)'; }}
      onTouchEnd={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
      onTouchCancel={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
      _before={{
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'xl',
        bgGradient: gradientBg,
        pointerEvents: 'none',
      }}
      _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
      transition="all 0.25s ease"
    >
      <HStack spacing={3} justify="center" align="center">
        <Box w="10px" h="10px" borderRadius="full" bg={dotColor} boxShadow={dotShadow} />
        <Badge colorScheme={badgeScheme} variant="subtle">{badgeText}</Badge>
      </HStack>
      <Text fontWeight="semibold" color={titleColor} fontSize="lg">{title}</Text>
      <Text fontSize="sm" color={textColor}>{description}</Text>
      <Link
        href={linkHref}
        target="_blank"
        rel="noopener noreferrer"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        px={3}
        py={2}
        borderRadius="md"
        bg={linkBg}
        color="white"
        _hover={{ filter: 'brightness(0.95)' }}
      >
        {linkText}
        <ExternalLinkIcon ml={2} />
      </Link>
    </VStack>
  );
};

export default Card;


