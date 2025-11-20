import React from 'react';
import { ensureHljsScript, ensureHljsTheme, renderHighlight } from './highlight';

export type UseCodeHighlightParams = {
  codeRef: React.RefObject<HTMLElement | null>;
  code: string;
  languageHint?: string;
  isDark: boolean;
};

export const useCodeHighlight = ({
  codeRef,
  code,
  languageHint,
  isDark,
}: UseCodeHighlightParams): string | undefined => {
  const [resolvedLang, setResolvedLang] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await ensureHljsScript();
        if (cancelled) return;
        await ensureHljsTheme(isDark);
        if (cancelled) return;
        const { resolvedLang } = renderHighlight(codeRef.current, code, languageHint);
        if (!cancelled && resolvedLang) setResolvedLang(resolvedLang);
      } catch (error) {
        console.error(error);
      }
    })();

    if ((window as any).hljs) {
      const { resolvedLang } = renderHighlight(codeRef.current, code, languageHint);
      if (!cancelled && resolvedLang) setResolvedLang(resolvedLang);
    }
    return () => { cancelled = true; };
  }, [isDark, languageHint, code, codeRef]);

  return resolvedLang;
};


