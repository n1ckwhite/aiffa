import React from "react";
import { Box } from "@chakra-ui/react";
import FAQ from "widgets/Modules/FAQ/FAQ";

const FaqSection: React.FC = () => {
  return (
    <Box
      as="section"
      aria-labelledby="partners-faq-heading"
      pt={{ base: 4, md: 6 }}
      zIndex={100}
    >
      <FAQ
        title="Частые вопросы о партнёрстве"
        variant="partners"
        showSupportBlock={false}
      />
    </Box>
  );
};

export default FaqSection;


