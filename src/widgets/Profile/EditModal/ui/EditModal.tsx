import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, VStack, FormControl, FormLabel, Input, Textarea, Button, HStack } from '@chakra-ui/react';
import type { EditModalProps } from '../types/EditModal.types';
import { useEditModalColors } from './colors/useEditModalColors';

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  editName,
  editBio,
  setEditName,
  setEditBio,
  onSave,
  resetColor,
  resetHoverBg,
  resetActiveBg,
  resetHoverBgDark,
  resetActiveBgDark,
}) => {
  const { borderColor } = useEditModalColors()
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale" blockScrollOnMount={true} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent mx={{ base: 4, sm: 6 }} w={{ base: '100%', sm: '90%', md: '560px' }} maxH="calc(100dvh - 24px)" overflow="hidden" borderRadius={{ base: 'md', md: 'lg' }}>
        <ModalHeader>Редактирование профиля</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" py={{ base: 3, md: 4 }}>
          <VStack spacing={{ base: 3, md: 4 }} align="stretch">
            <FormControl>
              <FormLabel htmlFor="profile-name">Имя</FormLabel>
              <Input borderColor={borderColor} id="profile-name" name="name" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Пользователь" autoFocus borderRadius="md" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="profile-bio">Описание</FormLabel>
              <Textarea borderColor={borderColor} id="profile-bio" name="bio" value={editBio} onChange={(e) => setEditBio(e.target.value)} placeholder="Описание" resize="vertical" minH={{ base: '80px', md: '100px' }} />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter pt={{ base: 2, md: 3 }}>
          <HStack spacing={{ base: 2, md: 3 }} w="100%" justify="flex-end">
            <Button colorScheme="blue" onClick={onSave}>Сохранить</Button>
            <Button
              variant="ghost"
              onClick={onClose}
              color={resetColor}
              _light={{ _hover: { bg: resetHoverBg }, _active: { bg: resetActiveBg } }}
              _dark={{ _hover: { bg: resetHoverBgDark }, _active: { bg: resetActiveBgDark } }}
            >
              Отменить
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;