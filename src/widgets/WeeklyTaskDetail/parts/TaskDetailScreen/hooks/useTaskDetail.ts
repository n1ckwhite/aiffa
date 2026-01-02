import React from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserProfile } from 'entities/user';
import { useLoadMdMeta } from '../../../hooks/useLoadMdMeta';
import { useExternalLinks } from '../../../hooks/useExternalLinks';
import { iconByTag } from '../../../lib/iconByTag';
import { colorByTag } from '../../../lib/colorByTag';

import { computeWillAllDone } from './helpers/progress';
import { getComputedTag } from './helpers/meta';
import { getWeeklyTask } from './helpers/task';
import { getValidatorResult } from './helpers/validator';

export const useTaskDetail = (initialTaskId?: string, initialMd?: string) => {
  const params = useParams();
  const taskId = initialTaskId || (params as any)?.taskId || '';
  const navigate = useNavigate();
  const { profile, setWeeklyTask, updateProfile } = useUserProfile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const task = React.useMemo(() => getWeeklyTask(profile as any, taskId), [profile, taskId]);

  const mdMeta = useLoadMdMeta(taskId, task.label, task.description, initialMd);
  const externalLinks = useExternalLinks(taskId);

  const computedTag = React.useMemo(() => getComputedTag(mdMeta as any), [mdMeta]);
  const computedIcon = React.useMemo(() => iconByTag(computedTag), [computedTag]);
  const computedColor = React.useMemo(() => colorByTag(computedTag), [computedTag]);
  const reward = 50;
  const meta = React.useMemo(() => ({
    tag: computedTag,
    icon: computedIcon,
    color: computedColor,
    reward,
    placeholder: '',
    validator: (s: string) => (s || '').trim().length > 0,
  }), [computedTag, computedIcon, computedColor]);

  const author = React.useMemo(
    () => ({ name: (mdMeta as any)?.authorName || 'Nick White', username: (mdMeta as any)?.authorUsername || 'n1ckwhite' }),
    [mdMeta],
  );
  const authorHref = mdMeta?.authorUrl || (author.username ? `https://github.com/${author.username}` : '#');
  const authorAvatar = author.username ? `https://avatars.githubusercontent.com/${author.username}?s=80` : undefined;
  const authorNote = React.useMemo(() => {
    return mdMeta?.tip || 'Спасибо, что выполняете задачи. Ваши решения помогают развивать экосистему и сообщество!';
  }, [mdMeta]);

  const [input, setInput] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [checking, setChecking] = React.useState(false);
  const [congratsAll, setCongratsAll] = React.useState(false);

  const openVSCode = React.useCallback(() => {
    try {
      setTimeout(() => {
        const monacoEl = document.querySelector('[class*="monaco-editor"]') as HTMLElement | null;
        if (monacoEl) {
          monacoEl.focus?.();
        } else {
          const nativeTextarea = document.querySelector(
            'textarea[name="code-editor-input"]'
          ) as HTMLTextAreaElement | null;
          nativeTextarea?.focus?.();
        }
      }, 400);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onCheck = React.useCallback(async () => {
    const wasAlreadyDone = !!task.done;
    setErrorMessage(null);
    setChecking(true);
    try {
      const { ok, msg } = getValidatorResult(mdMeta as any, meta.validator, input);
      if (!ok) {
        const nextMsg = msg || 'Пока не совсем. Попробуйте ещё раз.';
        setErrorMessage(nextMsg);
        toast({
          status: 'error',
          title: 'Пока не совсем',
          description: nextMsg,
          isClosable: true,
          duration: 6000,
          position: 'top',
        });
        return;
      }

      const willAllDone = computeWillAllDone(profile as any, task.id);

      // Успех: открываем модалку и при необходимости начисляем XP.
      setCongratsAll(willAllDone);
      if (wasAlreadyDone) {
        onOpen();
        return;
      }

      setWeeklyTask(task.id, { done: true });
      const nextXp = Math.max(0, (profile as any).xp || 0) + (meta.reward ?? 50);
      updateProfile({ xp: nextXp });
      onOpen();
    } finally {
      setChecking(false);
    }
  }, [task, mdMeta, input, profile, meta, setWeeklyTask, updateProfile, onOpen, toast]);

  const handleContinueAfterCompletion = React.useCallback(() => {
    onClose();
    navigate('/weekly');
  }, [navigate, onClose]);

  return {
    navigate,
    taskId,
    task,
    mdMeta,
    meta,
    author, authorHref, authorAvatar, authorNote,
    input, setInput,
    errorMessage,
    checking,
    congratsAll,
    openVSCode,
    onCheck,
    isOpen,
    onClose,
    externalLinks,
    handleContinueAfterCompletion,
  };
};


