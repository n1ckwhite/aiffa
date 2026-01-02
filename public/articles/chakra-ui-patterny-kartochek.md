# Chakra UI: паттерны карточек и сеток для продакшена

## Карточка как базовый строительный блок

```tsx
import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const Card = ({ title }: { title: string }) => {
  return (
    <Box borderWidth="1px" borderRadius="16px" p={5}>
      <Text fontWeight={700}>{title}</Text>
    </Box>
  );
};
```

## Сетка

### SimpleGrid

Хорошо подходит для адаптивных списков.

## Заключение

Держи карточки простыми, а интерактив (hover/active) делай предсказуемым.


