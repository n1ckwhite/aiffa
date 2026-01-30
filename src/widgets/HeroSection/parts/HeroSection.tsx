import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { useHeroColors } from '../colors/useHeroColors';
import { heroContent } from './data/heroContent';
import HeroHeader from './components/HeroHeader';
import HeroDescription from './components/HeroDescription';
import HeroActions from './components/HeroActions';
import { PeopleLottieIcon } from '@/shared/icons/components-icon';

const HeroSection: React.FC = () => {

  const { bg, textColor, titleColor, mutedColor } = useHeroColors();

  const { overline, titleLines, description, actions } = heroContent;

  return (
    <Box
      as="section"
      bg={bg}
      pt={{ base: 8, md: 16 }}
      px={4}
      aria-labelledby="homepage-hero-title"
      aria-describedby="homepage-hero-description"
    >
      <Box maxW="1200px" mx="auto">
        <VStack align="center">
          <VStack spacing="4" textAlign="center">
            <HeroHeader
              overline={overline}
              titleLines={titleLines}
              titleId="homepage-hero-title"
              mutedColor={mutedColor}
              titleColor={titleColor}
            />
            <HeroDescription descriptionId="homepage-hero-description" description={description} textColor={textColor} />

            <PeopleLottieIcon />

            <Text
              fontSize={{ base: "sm", md: "md" }}
              color={textColor}
              lineHeight="1.6"
              maxW={{ base: "520px", md: "720px" }}
              mx="auto"
            >
              Короткий путь к собеседованию: без воды, только ключевые темы и формулировки.
            </Text>

            <HeroActions actions={actions} />

          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default HeroSection;



