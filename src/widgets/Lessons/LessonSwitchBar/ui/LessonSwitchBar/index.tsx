import React from 'react';
import { Box, HStack, Menu, MenuButton, MenuItem, MenuList, Text, Button, VStack, IconButton, Flex, Circle, Portal, useDisclosure } from '@chakra-ui/react';
import { ChevronDownIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';
import type { LessonSwitchBarProps } from '../../types';
import { useLessonSwitchBarColors } from '../../colors';
import { useManifestNav } from '../../hooks/useManifestNav';
import { useKeyboardSwitch } from '../../hooks/useKeyboardSwitch';
import { useAutoHideOnScroll } from '../../hooks/useAutoHideOnScroll';
import { useMenuScrollIntoView } from '../../hooks/useMenuScrollIntoView';

const LessonSwitchBar: React.FC<LessonSwitchBarProps> = ({ moduleId, lessonId, inline = false }) => {
  const location = useLocation();
  const menu = useDisclosure();
  const { onClose } = menu;
  const menuButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const menuListRef = React.useRef<HTMLDivElement | null>(null);

  const { accent, countColor, itemHover, trackBg, pillBg, borderColor } = useLessonSwitchBarColors();
  const { mod, currentIndex, prev, next, progress, goPrev, goNext, goTo } = useManifestNav(moduleId, lessonId);

  useKeyboardSwitch({ onPrev: () => { if (prev && mod?.id) goPrev(); }, onNext: () => { if (next && mod?.id) goNext(); } });
  const isHidden = useAutoHideOnScroll(inline);
  useMenuScrollIntoView(menu.isOpen, currentIndex, menuButtonRef, menuListRef);

  React.useEffect(() => { onClose(); }, [location.pathname, onClose]);

  return (
    <Box position={inline ? 'static' : ({ base: 'fixed', md: 'fixed' } as any)} left={inline ? (undefined as any) : '50%'} transform={inline ? (undefined as any) : 'translateX(-50%)'} bottom={inline ? (undefined as any) : ({ base: 'calc(env(safe-area-inset-bottom) + 10px)', md: 8 } as any)} zIndex={inline ? 'auto' : 850} pointerEvents={inline ? 'auto' : 'none'} w={inline ? '100%' : undefined} mt={0}>
      <Box
        w={inline ? '100%' : ({ base: 'min(96vw, 680px)', md: 'min(92vw, 880px)' } as any)}
        maxW={inline ? '840px' : undefined}
        mx={inline ? 'auto' : 0}
        pointerEvents={(!inline && isHidden) ? 'none' : 'auto'}
        px={{ base: 2.5, md: 5 }}
        py={{ base: 2.5, md: 4 }}
        transition="transform 280ms ease, opacity 220ms ease, box-shadow 200ms ease"
        transform={!inline && isHidden ? 'translateY(28px)' : 'translateY(0)'}
        opacity={!inline && isHidden ? 0.2 : 1}
        overflow="hidden"
      >
        <Flex align="center" gap={{ base: 1, md: 4 }}>
          <IconButton aria-label="Предыдущий урок" icon={<ArrowBackIcon />} size="sm" variant="ghost" color={accent} isDisabled={!prev || !mod?.id} onClick={goPrev} _hover={{ bg: itemHover }} display={{ base: 'none', md: 'inline-flex' }} />
          <Box flex="1">
            <Menu autoSelect={false} matchWidth placement="top" strategy="fixed" isOpen={menu.isOpen} onOpen={menu.onOpen} onClose={menu.onClose}>
              {({ isOpen }) => (
                <>
                  <MenuButton ref={menuButtonRef} as={Button} variant="ghost" w="100%" maxW="100%" px={{ base: 2, md: 3 }} py={{ base: inline ? 1 : 1.5, md: inline ? 1.5 : 2 }} _hover={{ bg: 'transparent' }} _active={{ bg: 'transparent' }} borderRadius="lg">
                    <VStack spacing={{ base: 1.5, md: 2 }} align="stretch" w="100%">
                      <HStack spacing={{ base: 1, md: 2 }} align="center" justify="center" w="full" minW={0}>
                        <Circle size={{ base: '20px', md: '22px' }} color={countColor} fontSize="sm" fontWeight="bold" display={{ base: 'none', sm: 'flex' }}>
                          {mod ? `${currentIndex + 1}/${mod.lessons.length}` : '—'}
                        </Circle>
                        <Text textAlign="center" fontSize={{ base: 'sm', md: 'lg' }} noOfLines={{ base: 2, md: 1 }} maxW="100%" fontWeight="semibold" flexShrink={1} flexGrow={1} minW={0} wordBreak="break-word" whiteSpace="normal">
                          {mod?.lessons?.[currentIndex]?.title || ''}
                        </Text>
                        <Box as={ChevronDownIcon} boxSize={{ base: 4, md: 5 }} color={accent} flexShrink={0} transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'} transition="transform 200ms ease" />
                      </HStack>
                      <Box position="relative" w="full" h={{ base: inline ? '3px' : '4px', md: inline ? '4px' : '6px' }} borderRadius="full" bg={trackBg} overflow="hidden" aria-hidden>
                        <Box position="absolute" left={0} top={0} bottom={0} width={`${progress}%`} bg={accent} />
                      </Box>
                    </VStack>
                  </MenuButton>
                  <Portal>
                    <MenuList
                      zIndex={860}
                      maxH={{ base: 'min(40vh, 220px)', sm: 'min(48vh, 260px)', md: '60vh' }}
                      overflowY="auto"
                      minW={{ base: 'unset', md: inline ? '720px' : '600px' }}
                      maxW={{ base: '96vw', md: 'unset' }}
                      w={{ base: 'auto', md: 'auto' }}
                      py={inline ? 0.5 : 1}
                      px={1}
                      borderColor={borderColor}
                      ref={menuListRef}
                      borderRadius="24px"
                      overflowX="hidden"
                      sx={{
                        WebkitOverflowScrolling: 'touch',
                        overscrollBehaviorY: 'contain',
                        scrollSnapType: 'y proximity',
                        paddingBottom: 'calc(env(safe-area-inset-bottom) + 6px)',
                        scrollPaddingTop: '8px',
                        scrollPaddingBottom: '16px',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(148,163,184,0.7) transparent',
                        '&::-webkit-scrollbar': {
                          width: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                          background: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          background: 'whiteAlpha.300',
                          borderRadius: '999px',
                        },
                        '&:hover::-webkit-scrollbar-thumb': {
                          background: 'whiteAlpha.500',
                        },
                        '& > *:first-of-type': { borderTopLeftRadius: '24px', borderTopRightRadius: '24px' },
                        '& > *:last-of-type': { borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px' },
                      }}
                    >
                      {(mod?.lessons || []).map((l, idx) => (
                        <MenuItem
                          key={l.id}
                          onPointerUp={(e) => {
                            e.preventDefault();
                            menu.onClose();
                            goTo(l.id);
                          }}
                          bg={idx === currentIndex ? itemHover : 'transparent'}
                          _hover={{ bg: itemHover, color: accent }}
                          py={{ base: inline ? 2 : 2.5, md: inline ? 1.5 : 2 }}
                          minH={{ base: '44px', md: '40px' }}
                          scrollSnapAlign="start"
                          mb={idx === (mod?.lessons?.length || 0) - 1 ? 1 : 0}
                          data-lesson-index={idx}
                        >
                          <HStack spacing={3} align="center" w="full">
                            <Circle size="24px" bg={pillBg} color={accent} fontSize="xs" fontWeight="bold">
                              {idx + 1}
                            </Circle>
                            <Text noOfLines={2} fontWeight={idx === currentIndex ? 'semibold' : 'normal'}>{l.title}</Text>
                          </HStack>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Portal>
                </>
              )}
            </Menu>
          </Box>
          <IconButton aria-label="Следующий урок" icon={<ArrowForwardIcon />} size="sm" variant="ghost" color={accent} isDisabled={!next || !mod?.id} onClick={goNext} _hover={{ bg: itemHover }} display={{ base: 'none', md: 'inline-flex' }} />
        </Flex>
      </Box>
    </Box>
  );
};

export default LessonSwitchBar;


