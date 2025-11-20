import React from 'react';
import { useDisclosure, useBreakpointValue } from '@chakra-ui/react';

export const useFeedbackWidgetController = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hasPushedHistoryRef = React.useRef(false);
  const autoShowTimeoutRef = React.useRef<number | null>(null);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [, setIsScrollTopVisible] = React.useState(false);
  const panelRef = React.useRef<HTMLElement | null>(null);

  const openWidget = React.useCallback(() => {
    if (isOpen) return;
    onOpen();
    try {
      sessionStorage.setItem('feedbackWidgetShown', '1');
    } catch {}
    if (isDesktop) {
      try {
        window.history.pushState({ feedbackOpen: true }, '');
        hasPushedHistoryRef.current = true;
      } catch {}
    }
  }, [isOpen, onOpen, isDesktop]);

  const closeWidget = React.useCallback(() => {
    if (!isOpen) return;
    onClose();
    if (hasPushedHistoryRef.current) {
      try {
        window.history.back();
      } catch {}
      hasPushedHistoryRef.current = false;
    }
  }, [isOpen, onClose]);

  React.useEffect(() => {
    const toggleScrollTopVisibility = () => setIsScrollTopVisible(window.scrollY > 300);
    toggleScrollTopVisibility();
    window.addEventListener('scroll', toggleScrollTopVisibility);
    return () => window.removeEventListener('scroll', toggleScrollTopVisibility);
  }, []);

  React.useEffect(() => {
    if (autoShowTimeoutRef.current !== null) {
      clearTimeout(autoShowTimeoutRef.current);
      autoShowTimeoutRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeWidget();
    };
    const onPopState = () => closeWidget();
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('popstate', onPopState);
    };
  }, [isOpen, closeWidget]);

  React.useEffect(() => {
    const handler = () => openWidget();
    window.addEventListener('feedback:open', handler as EventListener);
    return () => window.removeEventListener('feedback:open', handler as EventListener);
  }, [openWidget]);

  return {
    isOpen,
    openWidget,
    closeWidget,
    isDesktop: !!isDesktop,
    panelRef,
  };
};


