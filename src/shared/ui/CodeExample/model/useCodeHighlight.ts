import React from 'react';
import { renderHighlight } from './highlight';

export type UseCodeHighlightParams = {
  codeRef: React.RefObject<HTMLElement | null>;
  code: string;
  languageHint?: string;
};

export const useCodeHighlight = ({
  codeRef,
  code,
  languageHint,
}: UseCodeHighlightParams): string | undefined => {
  const [resolvedLang, setResolvedLang] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { resolvedLang } = await renderHighlight(codeRef.current, code, languageHint);
        if (!cancelled && resolvedLang) setResolvedLang(resolvedLang);
      } catch (error) {
        console.error(error);
      }
    })();
    return () => { cancelled = true; };
  }, [languageHint, code, codeRef]);

  return resolvedLang;
};


