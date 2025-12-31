export const ensureHljsScript = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if ((window as any).hljs) { resolve(); return; }
    const existing = document.getElementById('hljs-cdn');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', reject as any);
      return;
    }
    const s = document.createElement('script');
    s.id = 'hljs-cdn';
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = (e) => reject(e);
    document.body.appendChild(s);
  });
};

export const ensureHljsTheme = (isDark: boolean): Promise<void> => {
  return new Promise<void>((resolve) => {
    const id = 'hljs-theme';
    const href = isDark
    ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github-dark.min.css'
    : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/a11y-light.min.css';
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => resolve();
      document.head.appendChild(link);
      return;
    }
    if (link.href.includes(href)) { resolve(); return; }
    link.onload = () => resolve();
    link.href = href;
  });
};

export const renderHighlight = (
  codeEl: HTMLElement | null,
  code: string,
  languageHint?: string,
): { resolvedLang?: string } => {
  const hljs = (window as any).hljs;
  if (!hljs || !codeEl) return {};
  try {
    let html = '';
    let resolvedLang: string | undefined = undefined;
    if (languageHint) {
      const res = hljs.highlight(code, { language: languageHint });
      html = res.value;
      resolvedLang = languageHint;
    } else {
      const res = hljs.highlightAuto(code);
      html = res.value;
      resolvedLang = res.language || undefined;
    }
    codeEl.className = `hljs${resolvedLang ? ` language-${resolvedLang}` : ''}`;
    codeEl.innerHTML = html;
    return { resolvedLang };
  } catch {
    codeEl.className = 'hljs';
    codeEl.textContent = code;
    return {};
  }
};


