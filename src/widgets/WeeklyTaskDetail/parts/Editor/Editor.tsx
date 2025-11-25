import React from 'react';
import { Box, Button, HStack, Spinner, Text } from '@chakra-ui/react';
import { useEditorColors } from '../../colors/useEditorColors';
import { CodeEditor } from 'shared/ui/CodeEditor';
import { EditorProps } from './types';
import { useEditorStart } from './hooks/useEditorStart';

const Editor: React.FC<EditorProps> = ({ value, onChange, language, overlay, onStart, onReady }) => {
  const { border, titleBarBg, editorBg, overlayBg, startBg, startHoverBg, startActiveBg, strongBorder } = useEditorColors();
  const { isStarting, handleStartClick } = useEditorStart({ onStart });

  return (
    <Box borderWidth="1px" borderColor={border} borderRadius="lg" position="relative">
      <HStack h="30px" px={3} align="center" gap={2} bg={titleBarBg} borderBottomWidth="1px" borderColor={border} borderTopRadius="lg">
        <Box w="12px" h="12px" borderRadius="full" bg="#ff5f56" boxShadow="0 0 0 1px rgba(0,0,0,0.2) inset" />
        <Box w="12px" h="12px" borderRadius="full" bg="#ffbd2e" boxShadow="0 0 0 1px rgba(0,0,0,0.2) inset" />
        <Box w="12px" h="12px" borderRadius="full" bg="#27c93f" boxShadow="0 0 0 1px rgba(0,0,0,0.2) inset" />
      </HStack>
      <Box bg={editorBg} p={0} borderBottomRadius="lg">
        <CodeEditor
          value={value}
          onChange={onChange}
          language={language}
          height={'clamp(240px, 60vh, 720px)'}
          enabled={!overlay}
          onReady={onReady}
        />
      </Box>
      {overlay && (
        <Box position="absolute" inset={0} zIndex={3} display="flex" alignItems="center" justifyContent="center" bg={overlayBg} borderRadius="lg">
          {isStarting ? (
            <HStack spacing={3}>
              <Spinner color="blue.300" thickness="3px" />
              <Text fontSize="lg" fontWeight="semibold" color="whiteAlpha.900">
                Загрузка Vscode
              </Text>
            </HStack>
          ) : (
            <Button
              colorScheme="blue"
              size="lg"
              borderRadius="full"
              onClick={handleStartClick}
              bg={startBg}
              _hover={{ bg: startHoverBg }}
              _active={{ bg: startActiveBg }}
            >
              Начать
            </Button>
          )}
        </Box>
      )}
      <Box position="absolute" inset={0} borderRadius="lg" borderWidth="2px" borderColor={strongBorder} pointerEvents="none" zIndex={2} />
    </Box>
  );
};

export default Editor;


