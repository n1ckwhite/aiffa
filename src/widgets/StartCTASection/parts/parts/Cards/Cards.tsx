import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { useStartCTAColors } from '../../../colors/useStartCTAColors';
import Card from '../Card/Card';
import { CardsProps } from './types';

const Cards: React.FC<CardsProps> = () => {
  const {
    card1Gradient,
    card2Gradient,
    card3Gradient,
    card1LinkBg,
    card2LinkBg,
    card3LinkBg,
  } = useStartCTAColors();
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full" maxW="1000px" pt={4}>
      <Card
        dotColor="blue.400"
        dotShadow="0 0 0 4px rgba(66,153,225,0.25)"
        badgeScheme="blue"
        badgeText="GitHub"
        title="Код и материалы экосистемы"
        description="Исходники, примеры и дополнительные репозитории."
        linkHref="https://github.com/n1ckwhite/JavaScript-Universe"
        linkText="Открыть"
        gradientBg={card1Gradient}
        linkBg={card1LinkBg}
      />
      <Card
        dotColor="purple.400"
        dotShadow="0 0 0 4px rgba(159,122,234,0.25)"
        badgeScheme="purple"
        badgeText="Доп. материалы"
        title="Шпаргалки и статьи"
        description="Подборки ссылок, чеклисты и полезные заметки."
        linkHref="https://habr.com/ru/users/n1ckwhite/"
        linkText="Читать"
        gradientBg={card2Gradient}
        linkBg={card2LinkBg}
      />
      <Card
        dotColor="green.400"
        dotShadow="0 0 0 4px rgba(72,187,120,0.25)"
        badgeScheme="green"
        badgeText="Обратная связь"
        title="Поддержка и вопросы"
        description="Задавайте вопросы, предлагайте улучшения и делитесь идеями."
        linkHref="https://t.me/iamceob1tch"
        linkText="Написать"
        gradientBg={card3Gradient}
        linkBg={card3LinkBg}
      />
    </SimpleGrid>
  );
};

export default Cards;


