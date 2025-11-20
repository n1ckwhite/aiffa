export const prettyLanguage = (l?: string): string | undefined => {
  if (!l) return undefined;
  const map: Record<string, string> = {
    javascript: 'JAVASCRIPT',
    typescript: 'TYPESCRIPT',
    html: 'HTML',
    css: 'CSS',
    json: 'JSON',
    bash: 'BASH',
    shell: 'BASH',
    sh: 'BASH',
    markdown: 'MARKDOWN',
    xml: 'XML',
    yaml: 'YAML',
    yml: 'YAML',
  };
  const key = l.toLowerCase();
  return map[key] || l.toUpperCase();
};


