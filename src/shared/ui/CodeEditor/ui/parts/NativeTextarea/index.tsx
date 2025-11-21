import { FC } from 'react';
import { Textarea } from '@chakra-ui/react';
import type { NativeTextareaProps } from './types';

export const NativeTextarea: FC<NativeTextareaProps> = ({ id, name, value, onChange, placeholder, isCoarse }) => {
  return (
    <Textarea
      id={id}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      borderBottomRadius="lg"
      aria-label={placeholder || 'Редактор контента'}
      resize="none"
      height="100%"
      w="100%"
      fontFamily="mono"
      fontSize={isCoarse ? 'md' : 'sm'}
    />
  );
};


