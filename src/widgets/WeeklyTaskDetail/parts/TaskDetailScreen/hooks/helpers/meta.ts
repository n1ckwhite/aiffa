export const getComputedTag = (mdMeta: unknown): string => {
  const lang = String((mdMeta as any)?.editorLanguage || '').toLowerCase();
  return (
    (mdMeta as any)?.tag ||
    (lang === 'html'
      ? 'HTML'
      : lang === 'go'
        ? 'GO'
        : lang === 'javascript'
          ? 'JS'
          : lang === 'css'
            ? 'CSS'
            : 'TASK')
  );
};

