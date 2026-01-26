"use client";

import React from "react";
import { Box, Container, SimpleGrid, Stack, VStack, useColorMode } from "@chakra-ui/react";
import { BusinessTeamLottieIcon } from "@/shared/icons/components-icon";
import { progressItems } from "../data/progressItems";
import { achievements } from "../data/achievements";
import { progressMechanicsContent } from "../data/content";
import { useHomeProgressMechanicsColors } from "../colors";
import ProgressHeader from "../components/ProgressHeader";
import ProgressList from "../components/ProgressList";
import AchievementsList from "../components/AchievementsList";
import ProfilePanel from "../components/ProfilePanel";

const HomeProgressMechanicsSection: React.FC = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const { titleColor, textColor, accentLabel, tone } = useHomeProgressMechanicsColors();
  const { header, profile } = progressMechanicsContent;

  return (
    <Box
      as="section"
      px={0}
      pt={{ base: 10, md: 14 }}
      aria-labelledby="home-progress-title"
      aria-describedby="home-progress-desc"
    >
      <Container maxW="1200px">
        <VStack spacing={{ base: 6, md: 8 }} align="stretch">
          <Stack direction={{ base: "column", lg: "row" }} spacing={{ base: 4, md: 8 }} align="center" justify="space-between">
            <ProgressHeader
              overline={header.overline}
              title={header.title}
              description={header.description}
              titleId="home-progress-title"
              descriptionId="home-progress-desc"
              titleColor={titleColor}
              textColor={textColor}
              accentLabel={accentLabel}
            />

            <Box
              aria-hidden="true"
              w="350px"
              flexShrink={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                "& svg, & canvas": {
                  width: "100% !important",
                  height: "100% !important",
                },
              }}
            >
              <BusinessTeamLottieIcon />
            </Box>
          </Stack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, md: 8 }} alignItems="stretch">
            <Stack spacing={4} h="full" align="flex-start">
              <ProgressList items={progressItems} isDark={isDark} titleColor={titleColor} textColor={textColor} />
              <AchievementsList items={achievements} title="Примеры достижений" accentLabel={accentLabel} />
            </Stack>

            <Stack spacing={4} h="full" justify="space-between" mt={{ base: 6, md: 0 }}>
              <ProfilePanel
                overline={profile.overline}
                title={profile.title}
                description={profile.description}
                bullets={profile.bullets}
                titleColor={titleColor}
                textColor={textColor}
                accentLabel={accentLabel}
                tone={tone}
              />
            </Stack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default HomeProgressMechanicsSection;

