import React from 'react';
import { HStack, Input, Button } from '@chakra-ui/react';

export type FormProps = {
  value: string;
  onChange: (v: string) => void;
  onImport: () => void;
  isImporting: boolean;
  prefix: string;
};

const Form: React.FC<FormProps> = ({ value, onChange, onImport, isImporting, prefix }) => {
  return (
    <HStack>
      <Input
        id="profile-github"
        name="githubUrl"
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
      <Button onClick={onImport} isLoading={isImporting} loadingText="Импорт" colorScheme="blue" borderRadius="full" px={6}>
        Импорт
      </Button>
    </HStack>
  );
};

export default Form;


