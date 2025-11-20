import { useState, useEffect } from 'react';

export const useMonacoLoader = (enabled: boolean): boolean => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    const ensureLoader = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if ((window as any).monaco && (window as any).require) {
          resolve();
          return;
        }
        const existing = document.getElementById('monaco-loader');
        if (existing) {
          existing.addEventListener('load', () => resolve());
          existing.addEventListener('error', (e) => reject(e));
          return;
        }
        const script = document.createElement('script');
        script.id = 'monaco-loader';
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs/loader.min.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = (e) => reject(e);
        document.body.appendChild(script);
      });
    };

    const loadMonaco = async () => {
      try {
        await ensureLoader();
        const base = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs';
        const req = (window as any).require;
        if (!req) return;
        req.config({ paths: { vs: base } });
        (window as any).MonacoEnvironment = { baseUrl: base + '/' };
        req(['vs/editor/editor.main'], () => {
          try {
            req(['vs/basic-languages/monaco.contribution', 'vs/language/typescript/monaco.contribution'], () => {
              if (cancelled) return;
              setIsReady(true);
            });
          } catch {
            if (cancelled) return;
            setIsReady(true);
          }
        });
      } catch {
        console.error('Monaco load error');
      }
    };

    loadMonaco();
    return () => { cancelled = true; };
  }, [enabled]);

  return isReady;
};


