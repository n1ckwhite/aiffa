import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserProfile } from 'entities/user';
import { useLoadMdMeta } from '../../../hooks/useLoadMdMeta';
import { useExternalLinks } from '../../../hooks/useExternalLinks';
import { iconByTag } from '../../../lib/iconByTag';
import { colorByTag } from '../../../lib/colorByTag';
import { useScrollToTop } from 'shared/hooks/useScrollToTop';

export type CheckResult = { ok: boolean; msg: string } | null;

export const useTaskDetail = (initialTaskId?: string) => {
  const params = useParams();
  const taskId = initialTaskId || (params as any)?.taskId || '';
  const navigate = useNavigate();
  const { profile, setWeeklyTask, updateProfile } = useUserProfile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useScrollToTop();

  const task = React.useMemo(() => {
    const t = Array.isArray((profile as any).weeklyTasks)
      ? (profile as any).weeklyTasks.find((x: any) => x.id === taskId)
      : undefined;
    return t || { id: taskId, label: 'Задача', description: '', done: false };
  }, [profile, taskId]);

  const mdMeta = useLoadMdMeta(taskId, task.label, task.description);
  const externalLinks = useExternalLinks(taskId);

  const lang = (mdMeta?.editorLanguage || '').toLowerCase();
  const computedTag = (mdMeta?.tag || (
    lang === 'html' ? 'HTML'
    : lang === 'go' ? 'GO'
    : lang === 'javascript' ? 'JS'
    : lang === 'css' ? 'CSS'
    : 'TASK'
  ));
  const computedIcon = iconByTag(computedTag);
  const computedColor = colorByTag(computedTag);
  const reward = 50;
  const meta = React.useMemo(() => ({
    tag: computedTag,
    icon: computedIcon,
    color: computedColor,
    reward,
    placeholder: '',
    validator: (s: string) => (s || '').trim().length > 0,
  }), [computedTag, computedIcon, computedColor]);

  const author = React.useMemo(() => {
    return { name: mdMeta?.authorName || 'Nick White', username: mdMeta?.authorUsername || 'n1ckwhite' };
  }, [mdMeta]);
  const authorHref = mdMeta?.authorUrl || (author.username ? `https://github.com/${author.username}` : '#');
  const authorAvatar = author.username ? `https://avatars.githubusercontent.com/${author.username}?s=80` : undefined;
  const authorNote = React.useMemo(() => {
    return mdMeta?.tip || 'Спасибо, что выполняете задачи. Ваши решения помогают развивать экосистему и сообщество!';
  }, [mdMeta]);

  const [input, setInput] = React.useState('');
  const [result, setResult] = React.useState<CheckResult>(null);
  const [checking, setChecking] = React.useState(false);
  const [congratsAll, setCongratsAll] = React.useState(false);
  const [showVsOverlay, setShowVsOverlay] = React.useState<boolean>(true);

  const openVSCode = React.useCallback(() => {
    setShowVsOverlay(false);
    try {
      setTimeout(() => {
        const monacoEl = document.querySelector('[class*="monaco-editor"]') as HTMLElement | null;
        if (monacoEl) { monacoEl.focus?.(); return; }
        const nativeTextarea = document.querySelector('textarea[name="code-editor-input"]') as HTMLTextAreaElement | null;
        nativeTextarea?.focus?.();
      }, 0);
    } catch {}
  }, []);

  

  const onCheck = React.useCallback(async () => {
    if (task.done) {
      setResult({ ok: true, msg: 'Задача уже выполнена 🎉' });
      return;
    }
    setChecking(true);
    try {
      let ok = false as boolean;
      if (mdMeta?.validator) {
        const res = mdMeta.validator(input);
        ok = typeof res === 'boolean' ? res : !!(res as any).ok;
        if (!ok && res && typeof res === 'object' && 'msg' in (res as any)) {
          setResult({ ok: false, msg: String((res as any).msg || 'Пока не совсем. Попробуйте ещё раз.') });
          return;
        }
      } else {
        ok = !!meta.validator(input);
      }
      if (ok) {
        const list = Array.isArray((profile as any).weeklyTasks) ? (profile as any).weeklyTasks : [];
        const willAllDone = list.length > 0 && list.every((t: any) => (t.id === task.id ? true : !!t.done));
        setCongratsAll(willAllDone);
        setWeeklyTask(task.id, { done: true });
        const reward = meta.reward ?? 50;
        const xp = Math.max(0, (profile as any).xp || 0) + reward;
        updateProfile({ xp });
        setResult(null);
        onOpen();
      } else {
        setResult({ ok: false, msg: 'Пока не совсем. Попробуйте ещё раз.' });
      }
    } finally {
      setChecking(false);
    }
  }, [task, mdMeta, input, profile, meta, setWeeklyTask, updateProfile, onOpen]);

  return {
    navigate,
    taskId,
    task,
    mdMeta,
    meta,
    author, authorHref, authorAvatar, authorNote,
    input, setInput,
    result, checking, congratsAll,
    showVsOverlay, openVSCode,
    onCheck,
    isOpen, onClose,
    externalLinks,
  };
};


