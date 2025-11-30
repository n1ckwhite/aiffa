import React from 'react';
import { Box, Button, HStack, Spinner, Text } from '@chakra-ui/react';
import { useEditorColors } from '../../colors/useEditorColors';
import { CodeEditor } from 'shared/ui/CodeEditor';
import { EditorProps } from './types';
import { useEditorStart } from './hooks/useEditorStart';
import { useResizableEditorHeight } from './hooks/useResizableEditorHeight';
import { useEditorReady } from './hooks/useEditorReady';

const Editor: React.FC<EditorProps> = ({ value, onChange, language, overlay, onStart, onReady }) => {
  const {
    border,
    titleBarBg,
    editorBg,
    overlayBg,
    startBg,
    startHoverBg,
    startActiveBg,
    resizeHandleBg,
    resizeHandleHoverBg,
  } = useEditorColors();
  const { isStarting, handleStartClick } = useEditorStart({ onStart });
  const { editorHeight, editorContainerRef, handleResizeStart } = useResizableEditorHeight();
  const { isEditorReady, handleEditorReady } = useEditorReady({ onReady });

  return (
    <Box borderRadius="lg" position="relative">
      <HStack h="30px" px={3} align="center" gap={2} bg={titleBarBg} borderBottomWidth="1px" borderColor={border} borderTopRadius="lg">
        <Box w="12px" h="12px" borderRadius="full" bg="#ff5f56" boxShadow="0 0 0 1px rgba(0,0,0,0.2) inset" />
        <Box w="12px" h="12px" borderRadius="full" bg="#ffbd2e" boxShadow="0 0 0 1px rgba(0,0,0,0.2) inset" />
        <Box w="12px" h="12px" borderRadius="full" bg="#27c93f" boxShadow="0 0 0 1px rgba(0,0,0,0.2) inset" />
      </HStack>
      <Box bg={editorBg} p={0} borderBottomRadius="lg" ref={editorContainerRef}>
        <CodeEditor
          value={value}
          onChange={onChange}
          language={language}
          height={editorHeight}
          enabled={isStarting}
          onReady={handleEditorReady}
        />
        <Box
          role="separator"
          aria-orientation="horizontal"
          tabIndex={0}
          h="16px"
          mt={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="ns-resize"
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
        >
          <Box
            w="40px"
            h="4px"
            borderRadius="full"
            bg={resizeHandleBg}
            _hover={{ bg: resizeHandleHoverBg }}
          />
        </Box>
      </Box>
      {overlay && !isEditorReady && (
        <Box
          position="absolute"
          inset={0}
          zIndex={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg={overlayBg}
          borderRadius="lg"
        >
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
    </Box>
  );
};

export default Editor;


