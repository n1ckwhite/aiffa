import React from 'react';
import type { TaskCompletionModalProps } from '../types';
import { useModalScrollLock } from '../hooks/useModalScrollLock';
import { Overlay, Content } from './parts';

const TaskCompletionModal: React.FC<TaskCompletionModalProps> = ({ onClose, onContinue, completed = true }) => {
  useModalScrollLock();
  return (
    <Overlay>
      <Content completed={completed} onClose={onClose} onContinue={onContinue} />
    </Overlay>
  );
};

export default TaskCompletionModal;


