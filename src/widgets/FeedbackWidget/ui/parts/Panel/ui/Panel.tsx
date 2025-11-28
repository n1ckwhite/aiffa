import React from 'react';
import { Box, VStack, HStack, Text, IconButton, Collapse, FocusLock, Link } from '@chakra-ui/react';
import { CloseIcon, ChatIcon } from '@chakra-ui/icons';
import { useFeedbackWidgetColors } from '../../../colors/useFeedbackWidgetColors';
import type { PanelProps } from '../types/Panel.types';

export const Panel: React.FC<PanelProps> = ({ isOpen, onClose, onSubmit, panelRef }) => {
  const colors = useFeedbackWidgetColors();

  return (
    <Box borderRadius="12px" overflow="hidden">
      <Collapse in={isOpen} animateOpacity unmountOnExit>
        <FocusLock restoreFocus={true} autoFocus={true}>
          <Box
            ref={panelRef as unknown as React.RefObject<HTMLDivElement>}
            role="dialog"
            aria-modal="true"
            aria-label="Помогите улучшить экосистему"
            bg={colors.cardBg}
            border="1px"
            borderColor={colors.borderColor}
            borderRadius="12px"
            p={4}
            w={{ base: 'min(92vw, 360px)', sm: '360px' }}
            boxShadow="0 8px 25px rgba(0, 0, 0, 0.15)"
            transition="transform 0.2s ease"
            transform={isOpen ? 'translateY(0) scale(1)' : 'translateY(4px) scale(0.98)'}
            transformOrigin="bottom right"
            willChange="transform"
          >
            <VStack spacing={3} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="md" fontWeight="bold" color={colors.titleColor}>
                  Помогите улучшить экосистему
                </Text>
                <IconButton
                  aria-label="Закрыть"
                  icon={<CloseIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={onClose}
                  _hover={{ bg: colors.neutralHoverBg, color: colors.textColor }}
                  _active={{ bg: colors.neutralHoverBg }}
                  transition="all 0.2s ease-in-out"
                />
              </HStack>

              <Text fontSize="sm" color={colors.textColor} textAlign="left">
                Напишите в Telegram для обратной связи и предложений!
              </Text>

              <Link
                href="https://t.me/iamceob1tch"
                target="_blank"
                rel="noopener noreferrer"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                px={3}
                py={2}
                borderRadius="md"
                bg={colors.primaryBg}
                color="white"
                onClick={onSubmit}
                _hover={{ bg: colors.primaryHoverBg }}
              >
                <ChatIcon style={{ marginRight: '8px' }} />
                Написать в Telegram
              </Link>
            </VStack>
          </Box>
        </FocusLock>
      </Collapse>
    </Box>
  );
};


