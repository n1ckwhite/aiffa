"use client";

import React from "react";
import { Box, Container, Stack } from "@chakra-ui/react";
import { PartnersLottieIcon } from "@/shared/icons/components-icon";
import { businessContent } from "../data/content";
import { useHomeBusinessColors } from "../colors";
import BusinessHeader from "../components/BusinessHeader";
import HighlightsList from "../components/HighlightsList";

const HomeBusinessSection: React.FC = () => {
  const { titleColor, textColor, badgeBg, badgeColor, linkColor, iconColors, iconFallback } = useHomeBusinessColors();
  const { header, highlights } = businessContent;

  return (
    <Box as="section" px={0} pt={{ base: 10, md: 14 }} aria-labelledby="home-business-title" aria-describedby="home-business-desc">
      <Container maxW="1200px">
        <Box
          borderWidth="0"
          borderRadius="0"
          bg="transparent"
          boxShadow="none"
        >
          <Stack spacing={{ base: 6, md: 10 }}>
            <Stack direction={{ base: "column", lg: "row" }} spacing={{ base: 6, md: 10 }} align={{ base: "flex-start", md: "center" }}>
              <BusinessHeader
                badge={header.badge}
                title={header.title}
                description={header.description}
                linkLabel={header.linkLabel}
                linkTo={header.linkTo}
                titleId="home-business-title"
                descriptionId="home-business-desc"
                badgeBg={badgeBg}
                badgeColor={badgeColor}
                titleColor={titleColor}
                textColor={textColor}
                linkColor={linkColor}
              />

              <Box
                w="full"
                maxW={{ base: "420px", md: "520px" }}
                ml={{ base: 0, lg: "auto" }}
                mx={{ base: "auto", lg: 0 }}
                flex={{ base: "none", md: 1 }}
              >
                <PartnersLottieIcon />
              </Box>
            </Stack>

            <HighlightsList items={highlights} titleColor={titleColor} textColor={textColor} iconColors={iconColors} iconFallback={iconFallback} />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeBusinessSection;
