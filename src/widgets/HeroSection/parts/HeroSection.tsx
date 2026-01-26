import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { useHeroColors } from '../colors/useHeroColors';
import { useHackathonsCommunityMetrics } from '@/widgets/Hackathons/parts/CommunityGrowthSection/data';
import SocialProofMarquee from './components/SocialProofMarquee';
import { buildSocialProofItems } from './data/socialProof';
import { heroContent } from './data/heroContent';
import { getHeroMetricsValues } from './data/heroMetrics';
import HeroHeader from './components/HeroHeader';
import HeroDescription from './components/HeroDescription';
import HeroActions from './components/HeroActions';

const HeroSection: React.FC = () => {

  const { bg, textColor, titleColor, mutedColor } = useHeroColors();
  const metrics = useHackathonsCommunityMetrics();
  const { participantsValue, participantsLabel, weeklyValue, weeklyLabel } = getHeroMetricsValues(metrics);

  const socialProofItems = buildSocialProofItems({
    participantsValue,
    participantsLabel,
    weeklyValue,
    weeklyLabel,
  });

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
          <VStack spacing={{ base: 3, md: 5 }} textAlign="center">
            <HeroHeader
              overline={overline}
              titleLines={titleLines}
              titleId="homepage-hero-title"
              mutedColor={mutedColor}
              titleColor={titleColor}
            />

            <HeroDescription descriptionId="homepage-hero-description" description={description} textColor={textColor} />

            <HeroActions actions={actions} />

            <SocialProofMarquee items={socialProofItems} />
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default HeroSection;



