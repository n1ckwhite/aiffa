export const linkifyTextLines = (md: string): string => {
  const lines = md.split('\n');
  let inFence = false;
  for (let i = 0; i < lines.length; i += 1) {
    const t = lines[i].trim();
    if (t.startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const re = /^(\s*(?:[-*]\s+|\d+\.\s+)?)(.+?)\s*(?:[:—-])\s+(https?:\/\/\S+)(\s*)$/;
    const m = lines[i].match(re);
    if (m) {
      const [, prefix, text, url, trail] = m;
      lines[i] = `${prefix}[${text}](${url})${trail}`;
    }
  }
  return lines.join('\n');
};


