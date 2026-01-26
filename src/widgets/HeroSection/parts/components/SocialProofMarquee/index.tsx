import React from "react";
import { Box, usePrefersReducedMotion } from "@chakra-ui/react";
import { marquee } from "./animations/marquee";
import { useSocialProofMarqueeColors } from "./colors";
import type { SocialProofMarqueeProps } from "./types";
import MarqueeRow from "./parts/MarqueeRow/MarqueeRow";
import StaticList from "./parts/StaticList/StaticList";

const SocialProofMarquee: React.FC<SocialProofMarqueeProps> = ({ items }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const colors = useSocialProofMarqueeColors();

  if (prefersReducedMotion) {
    return <StaticList items={items} colors={colors} />;
  }

  return (
    <Box
      w="full"
      maxW={{ base: "280px", sm: "520px", md: "720px", lg: "900px" }}
      px={{ base: 2, md: 0 }}
      mx="auto"
      pt={1}
      overflow="hidden"
      position="relative"
      sx={{
        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
      aria-label="Факты о платформе"
    >
      <Box display="flex" w="max-content" animation={`${marquee} 30s linear infinite`}>
        <MarqueeRow items={items} rowKey="a" colors={colors} />
        <MarqueeRow items={items} rowKey="b" colors={colors} />
      </Box>
    </Box>
  );
};

export default SocialProofMarquee;
