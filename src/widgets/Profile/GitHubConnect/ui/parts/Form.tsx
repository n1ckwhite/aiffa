import React from 'react';
import { HStack, Input, Button, useColorModeValue } from '@chakra-ui/react';
import { useColors } from './colors/useColors';

export type FormProps = {
  value: string;
  onChange: (v: string) => void;
  onImport: () => void;
  isImporting: boolean;
  prefix: string;
};

const Form: React.FC<FormProps> = ({ value, onChange, onImport, isImporting, prefix }) => {
  const { borderColor, importBg, importActiveBg, importHoverBg } = useColors()

  return (
    <HStack>
      <Input
        id="profile-github"
        name="githubUrl"
        borderColor={borderColor}
        autoComplete="url"
        value={value}
        onChange={(e) => {
          let v = e.target.value || '';
          if (!v.startsWith(prefix)) {
            const stripped = v.replace(/^https?:\/\/github\.com\//i, '').replace(/^github\.com\//i, '').replace(/^\/+/, '');
            v = prefix + stripped;
          }
          onChange(v);
        }}
        onKeyDown={(e) => {
          try {
            const input = e.currentTarget as HTMLInputElement;
            const pos = input.selectionStart ?? 0;
            if ((e.key === 'Backspace' && pos <= prefix.length) || (e.key === 'Delete' && pos < prefix.length)) {
              e.preventDefault();
              input.setSelectionRange(prefix.length, prefix.length);
            }
          } catch {}
        }}
        onFocus={(e) => {
          try {
            const input = e.currentTarget as HTMLInputElement;
            if (!input.value.startsWith(prefix)) {
              onChange(prefix);
              window.setTimeout(() => input.setSelectionRange(prefix.length, prefix.length), 0);
            } else {
              window.setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
            }
          } catch {}
        }}
        placeholder="https://github.com/username"
        borderRadius="full"
        px={5}
      />
      <Button
        onClick={onImport}
        isLoading={isImporting}
        bg={importBg}
        color="white"
        _hover={{ bg: importHoverBg }}
        _active={{ bg: importActiveBg }}
        borderRadius="full"
        px={6}
        minWidth="100px"
        maxWidth="100px"
        aria-label="Импортировать данные из GitHub"
      >
        {!isImporting && 'Импорт'}
      </Button>
    </HStack>
  );
};

export default Form;


