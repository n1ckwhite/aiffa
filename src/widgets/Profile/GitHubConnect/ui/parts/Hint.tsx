import React from 'react';
import { Text } from '@chakra-ui/react';

export type HintProps = { color: string };

const Hint: React.FC<HintProps> = ({ color }) => {
  return (
    <Text fontSize="sm" color={color}>
      Подключите ссылку на профиль GitHub — мы автоматически загрузим ваше имя, описание и аватар.
    </Text>
  );
};

export default Hint;


