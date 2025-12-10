import { WeeklyTaskParsed } from "./types";

  function parseJsonFrontmatter(md: string): { meta: any; body: string } {
    const fmMatch = md.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
    if (!fmMatch) {
      return { meta: {}, body: md };
    }
    const jsonText = fmMatch[1].trim();
    let meta: any = {};
    try {
      meta = JSON.parse(jsonText);
    } catch {
      meta = {};
    }
    const body = md.slice(fmMatch[0].length);
    return { meta, body };
  }
  
  function extractCodeBlocks(md: string) {
    const blocks: Array<{ info: string; code: string }> = [];
    const re = /```([^\n]*)\n([\s\S]*?)```/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(md)) != null) {
      blocks.push({ info: (m[1] || '').trim(), code: m[2] });
    }
    return blocks;
  }
  
  export function parseWeeklyTaskMd(md: string): WeeklyTaskParsed {
    const { meta, body } = parseJsonFrontmatter(md);
    const blocks = extractCodeBlocks(body);
    const examples: Array<{ lang: string; code: string }> = [];
    let validatorSource: string | undefined;
  
    for (const b of blocks) {
      if (/^example\s*:/i.test(b.info)) {
        const lang = b.info.split(':')[1]?.trim() || 'text';
        examples.push({ lang, code: b.code.trim() });
        continue;
      }
      if (/^validator(\s*:\s*\w+)?$/i.test(b.info)) {
        validatorSource = b.code.trim();
        continue;
      }
    }
  
    const id: string = String(meta.id || '').trim();
    const title: string = String(meta.title || '').trim();
    const description: string = String(meta.description || '').trim();
    const author = {
      name: String(meta.author?.name || '').trim(),
      github: meta.author?.github ? String(meta.author.github).trim() : undefined,
      url: meta.author?.url ? String(meta.author.url).trim() : undefined,
      avatar: meta.author?.avatar ? String(meta.author.avatar) : undefined,
    };
    const tip: string | undefined = meta.tip ? String(meta.tip) : undefined;
    const editorLanguage: string = typeof meta.editorLanguage === 'string' && meta.editorLanguage.trim().length > 0
      ? String(meta.editorLanguage).trim()
      : 'shell';
    let level: 'Начальный' | 'Средний' | 'Продвинутый' | undefined;
    const lvl = meta.level ? String(meta.level).toLowerCase() : '';
    if (['начальный','beginner'].includes(lvl)) level = 'Начальный';
    else if (['средний','intermediate','medium'].includes(lvl)) level = 'Средний';
    else if (['продвинутый','advanced'].includes(lvl)) level = 'Продвинутый';
    const tag = meta.tag ? String(meta.tag).toUpperCase() : undefined;
    const color = meta.color ? String(meta.color) : undefined;
    const reward = typeof meta.reward === 'number' && isFinite(meta.reward) ? meta.reward : undefined;
    const stars = typeof meta.stars === 'number' && isFinite(meta.stars) ? meta.stars : undefined;
    const comments = typeof meta.comments === 'number' && isFinite(meta.comments) ? meta.comments : undefined;
    const solvedCount = typeof meta.solvedCount === 'number' && isFinite(meta.solvedCount) ? meta.solvedCount : undefined;
  
    return { id, title, description, author, tip, examples, validatorSource, editorLanguage, level, tag, color, reward, stars, comments, solvedCount };
  }
  
  export type ValidateResult = { ok: boolean; msg?: string } | boolean;
  
  export function compileValidator(validatorSource?: string): ((input: string) => ValidateResult) | null {
    if (!validatorSource || validatorSource.trim().length === 0) return null;
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function('input', `'use strict';\n${validatorSource}\nif (typeof validate !== 'function') { throw new Error('validate() is not defined'); }\nreturn validate(input);`);
      return (input: string) => {
        try {
          return fn(input);
        } catch {
          return false;
        }
      };
    } catch {
      return null;
    }
  }
  
  
  