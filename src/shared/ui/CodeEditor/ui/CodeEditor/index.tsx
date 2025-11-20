import React from 'react';
import { Box } from '@chakra-ui/react';
import { useCodeEditorColors } from '../colors/useCodeEditorColors';
import type { CodeEditorProps } from './types';
import { useMonacoLoader } from '../../model/useMonacoLoader';
import { useMonacoEditor } from '../../model/useMonacoEditor';
import { usePointerCoarse } from '../../model/usePointerCoarse';
import { NativeTextarea, MonacoPlaceholder } from '../parts';

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'plaintext',
  height = 220,
  placeholder,
  preferNative,
  enabled = true,
}) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { isDark, placeholderColor } = useCodeEditorColors();
  const inputId = React.useMemo(() => `code-editor-input-${Math.random().toString(36).slice(2, 10)}`, []);
  const inputName = React.useMemo(() => `code-editor-input`, []);
  const isCoarse = usePointerCoarse();
  const isReady = useMonacoLoader(!(preferNative || !enabled) && enabled);
  useMonacoEditor({
    isReady,
    containerRef,
    value,
    language,
    isDark,
    isCoarse,
    enabled,
    preferNative,
    onChange,
    inputId,
    inputName,
    placeholder,
  });

  const computedHeight = typeof height === 'number' ? `${height}px` : height || '220px';

  return (
    <Box position="relative" height={computedHeight}>
      {preferNative || !enabled ? (
        <NativeTextarea
          id={inputId}
          name={inputName}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          isCoarse={isCoarse}
        />
      ) : (
        <>
          <Box ref={containerRef} position="absolute" inset={0} />
          {!value && placeholder && (
            <MonacoPlaceholder placeholder={placeholder} color={placeholderColor} />
          )}
        </>
      )}
    </Box>
  );
};

export default CodeEditor;


