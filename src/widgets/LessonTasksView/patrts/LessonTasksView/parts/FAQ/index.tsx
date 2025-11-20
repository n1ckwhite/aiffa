import React from 'react';
import { Accordion, Box } from '@chakra-ui/react';
import type { FAQSectionProps } from './types';
import { FAQItem } from './parts/FAQItem';

export const FAQSection: React.FC<FAQSectionProps> = ({ borderColor, titleColor, textColor }) => {
  return (
    <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={{ base: 3, md: 4 }} bg="transparent">
      <Accordion allowToggle>
        <FAQItem
          title="Как понять, что ответ засчитан?"
          text="Кнопка «Проверить» станет неактивной, а индикатор задачи окрасится зелёным. Прогресс в шапке обновится."
          titleColor={titleColor}
          textColor={textColor}
        />
        <FAQItem
          title="Почему ответ не принимается?"
          text="Проверьте формат: регистр, пробелы и точность формулировки. В задачах с несколькими вариантами отметьте все правильные."
          titleColor={titleColor}
          textColor={textColor}
        />
        <FAQItem
          title="Где взять подсказку?"
          text="Нажмите «Подсказка» под заголовком задачи. Если её нет — обратитесь в поддержку или откройте материалы этапа."
          titleColor={titleColor}
          textColor={textColor}
        />
      </Accordion>
    </Box>
  );
};


