import React from 'react';
import { Text } from '@chakra-ui/react';
import { useHeaderColors } from '../../colors/useHeaderColors';

const SubTitle: React.FC = () => {
  const { mutedTextColor } = useHeaderColors();
  return (
    <Text fontSize="sm" color={mutedTextColor} textAlign="center">
      Прокачивай XP — уровень растёт, а задачи становятся сложнее и полезнее под твой текущий прогресс.
    </Text>
  );
};

export default SubTitle;


