import type { ValidatorResult } from '../types';

export const getValidatorResult = (
  mdMeta: unknown,
  fallbackValidator: (s: string) => boolean,
  input: string,
): ValidatorResult => {
  const validator = (mdMeta as any)?.validator || fallbackValidator;
  const res = validator(input);
  if (typeof res === 'boolean') return { ok: res, msg: '' };

  const ok = !!(res as any)?.ok;
  const msg = String((res as any)?.msg || '');
  return { ok, msg };
};

