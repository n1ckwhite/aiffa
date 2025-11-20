import React from 'react';
import { Box, VStack, Accordion } from '@chakra-ui/react';
import { useFaqColors } from './colors';
import { defaultFaqItems } from './data';
import { FAQHeader } from './parts/Header';
import FAQItem from './parts/Item';
import type { FAQProps } from './types';

const FAQ: React.FC<FAQProps> = ({ items }) => {
  const { faqHeadingColor, faqBorderColor, faqTitleColor, faqTextColor } = useFaqColors();
  const list = items && items.length > 0 ? items : defaultFaqItems;
  return (
    <Box px={{ base: 4, md: 6 }} pb={0}>
      <VStack align="stretch" gap={{ base: 5, md: 7 }} maxW={{ base: '100%', md: '900px' }} mx="auto">
        <FAQHeader color={faqHeadingColor} />
        <Box borderWidth="1px" borderColor={faqBorderColor} borderRadius="2xl" p={{ base: 3, md: 4 }} bg="transparent">
          <Accordion allowToggle>
            {list.map((it, idx) => (
              <FAQItem key={idx} item={it} titleColor={faqTitleColor} textColor={faqTextColor} />
            ))}
          </Accordion>
        </Box>
      </VStack>
    </Box>
  );
};

export default FAQ;


