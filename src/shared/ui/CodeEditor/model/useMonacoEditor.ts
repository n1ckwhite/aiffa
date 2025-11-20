import React from 'react';
import type { MonacoEditorParams } from '../types';

export const useMonacoEditor = ({
  isReady,
  containerRef,
  value,
  language,
  isDark,
  isCoarse,
  enabled,
  preferNative,
  onChange,
  inputId,
  inputName,
  placeholder,
}: MonacoEditorParams) => {
  const editorRef = React.useRef<any>(null);
  const modelRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (preferNative || !enabled) return;
    if (!isReady || !containerRef.current) return;
    const monaco = (window as any).monaco;
    if (!monaco) return;

    modelRef.current = monaco.editor.createModel(value ?? '', language || 'plaintext');
    editorRef.current = monaco.editor.create(containerRef.current, {
      model: modelRef.current,
      language,
      theme: isDark ? 'vs-dark' : 'vs',
      fontFamily: "Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      fontSize: isCoarse ? 16 : 14,
      minimap: { enabled: false },
      automaticLayout: true,
      wordWrap: 'on',
      smoothScrolling: true,
      roundedSelection: true,
      scrollBeyondLastLine: false,
      padding: { top: 0, bottom: 0 },
      renderLineHighlight: value && value.length > 0 ? 'line' : 'none',
      renderWhitespace: 'none',
    });

    try {
      const rootEl = (editorRef.current?.getDomNode?.() as HTMLElement | null) || containerRef.current;
      if (rootEl) {
        const input = rootEl.querySelector('textarea.inputarea') as HTMLTextAreaElement | null;
        if (input) {
          input.setAttribute('id', inputId);
          input.setAttribute('name', inputName);
          if (placeholder) input.setAttribute('aria-label', placeholder);
          if (isCoarse) input.style.fontSize = '16px';
        }
      }
    } catch {}

    const sub = editorRef.current.onDidChangeModelContent(() => {
      try {
        const next = editorRef.current.getValue();
        onChange(next);
      } catch {}
    });

    return () => {
      try { sub?.dispose(); } catch {}
      try { modelRef.current?.dispose?.(); } catch {}
      try { editorRef.current?.dispose?.(); } catch {}
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, containerRef.current, isDark, isCoarse, preferNative, enabled]);

  React.useEffect(() => {
    if (preferNative || !enabled) return;
    const monaco = (window as any).monaco;
    if (!monaco || !modelRef.current) return;
    if (value !== modelRef.current.getValue()) {
      modelRef.current.setValue(value ?? '');
    }
  }, [value, preferNative, enabled]);

  React.useEffect(() => {
    if (preferNative || !enabled) return;
    const ed = editorRef.current;
    if (!ed) return;
    try { ed.updateOptions({ renderLineHighlight: value && value.length > 0 ? 'line' : 'none' }); } catch {}
  }, [value, preferNative, enabled]);

  React.useEffect(() => {
    if (preferNative || !enabled) return;
    const monaco = (window as any).monaco;
    if (!monaco || !modelRef.current) return;
    try { monaco.editor.setModelLanguage(modelRef.current, language || 'plaintext'); } catch {}
  }, [language, preferNative, enabled]);

  React.useEffect(() => {
    if (preferNative || !enabled) return;
    const monaco = (window as any).monaco;
    if (!monaco || !editorRef.current) return;
    try { monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs'); } catch {}
  }, [isDark, preferNative, enabled]);

  return { editorRef, modelRef };
};


