import React from "react";
import { Box } from "@chakra-ui/react";
import FAQ from "widgets/Modules/FAQ/FAQ";

const HackathonsFaqSection: React.FC = () => {
  return (
    <Box
      as="section"
      aria-labelledby="hackathons-faq-heading"
      pt={{ base: 4, md: 6 }}
      zIndex={100}
    >
      <FAQ
        title="Частые вопросы о хакатонах"
        variant="hackathons"
        showSupportBlock={false}
      />
    </Box>
  );
};

export default HackathonsFaqSection;


