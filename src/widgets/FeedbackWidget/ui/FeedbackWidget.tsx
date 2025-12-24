import React from 'react';
import { Box, VStack, Portal } from '@chakra-ui/react';
import { useOutsideClick } from '@chakra-ui/react';
import { useFeedbackWidgetController } from '../model/useFeedbackWidgetController';
import { Panel, TriggerButton } from './parts';

const FeedbackWidget: React.FC = () => {
  const { isOpen, openWidget, closeWidget, panelRef } = useFeedbackWidgetController();

  const handleSubmit = () => {
    closeWidget();
  };

  useOutsideClick({
    ref: panelRef as unknown as React.RefObject<HTMLElement>,
    handler: () => isOpen && closeWidget(),
  });

  return (
    <Portal>
      <Box
         display={{ base: 'none', lg: 'flex' }}
        position="fixed"
        right={{ base: '16px', md: '24px' }}
        bottom={{ base: `calc(20px + env(safe-area-inset-bottom))`, md: `calc(24px + env(safe-area-inset-bottom))` }}
        zIndex={1200}
        transition="bottom 0.2s ease"
        willChange="bottom"
      >
        <VStack spacing={3} align="end">
          <Panel isOpen={isOpen} onClose={closeWidget} onSubmit={handleSubmit} panelRef={panelRef} />
          {!isOpen && <TriggerButton onClick={openWidget} />}
        </VStack>
      </Box>
    </Portal>
  );
};

export default FeedbackWidget;


