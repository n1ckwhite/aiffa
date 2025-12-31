type HljsModule = typeof import("highlight.js");

let hljsPromise: Promise<HljsModule> | null = null;

const loadHljs = async (): Promise<any> => {
  if (!hljsPromise) hljsPromise = import("highlight.js");
  const mod: any = await hljsPromise;
  return mod?.default ?? mod;
};

export const renderHighlight = async (
  codeEl: HTMLElement | null,
  code: string,
  languageHint?: string,
): Promise<{ resolvedLang?: string }> => {
  if (!codeEl) return {};
  const hljs = await loadHljs();
  if (!hljs) return {};

  try {
    let html = "";
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

    codeEl.className = `hljs${resolvedLang ? ` language-${resolvedLang}` : ""}`;
    codeEl.innerHTML = html;
    return { resolvedLang };
  } catch {
    codeEl.className = "hljs";
    codeEl.textContent = code;
    return {};
  }
};


