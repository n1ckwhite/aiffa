import React from 'react';
import type { UseTaskRendererParams, UseTaskRendererResult } from '../types';

export const useTaskRenderer = (params: UseTaskRendererParams): UseTaskRendererResult => {
  const { task, onSolvedChange, onValidated } = params;

  const [value, setValue] = React.useState('');
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});
  const [, setResult] = React.useState<string>('');
  const [ok, setOk] = React.useState<boolean | null>(null);
  const [wrongAnimKey, setWrongAnimKey] = React.useState(0);

  const handleValueChange = React.useCallback((nextValue: string) => {
    setValue(nextValue);
  }, []);

  const handleCheckboxToggle = React.useCallback((id: string, isChecked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: isChecked }));
  }, []);

  const applyValidationResult = React.useCallback(
    (pass: boolean) => {
      setOk(pass);
      setResult(pass ? 'Верно' : '');
      onSolvedChange(pass);
      try {
        if (onValidated) {
          onValidated();
        }
      } catch {
        // noop
      }
      if (!pass) {
        setWrongAnimKey((prev) => prev + 1);
      }
    },
    [onSolvedChange, onValidated],
  );

  const handleValidateTerminal = React.useCallback(() => {
    const v = (value || '').toLowerCase().trim().replace(/\s+/g, ' ');
    const must = task.terminal?.expected || [];
    const includes = task.terminal?.includes || [];
    const passExact = must.length ? must.some((m) => v === m.toLowerCase()) : true;
    const passIncludes = includes.every((m) => v.includes(m.toLowerCase()));
    const pass = passExact && passIncludes;
    applyValidationResult(pass);
  }, [applyValidationResult, task.terminal, value]);

  const handleValidateMcq = React.useCallback(() => {
    const pass = value === task.mcq?.correctId;
    applyValidationResult(pass);
  }, [applyValidationResult, task.mcq?.correctId, value]);

  const handleValidateCheckbox = React.useCallback(() => {
    const picked = Object.entries(checked)
      .filter(([, isChecked]) => isChecked)
      .map(([id]) => id)
      .sort()
      .join(',');
    const right = (task.checkbox?.correctIds || [])
      .slice()
      .sort()
      .join(',');
    const pass = picked === right;
    applyValidationResult(pass);
  }, [applyValidationResult, checked, task.checkbox?.correctIds]);

  const handleValidateText = React.useCallback(() => {
    const v = (value || '').toLowerCase().replace(/\s+/g, '').replace(/→/g, '->');
    const pass = (task.text?.allowed || []).some((allowed) => v === allowed.toLowerCase());
    applyValidationResult(pass);
  }, [applyValidationResult, task.text?.allowed, value]);

  const handleInputKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter' || ok) {
        return;
      }
      if (task.type === 'terminal') {
        handleValidateTerminal();
      } else if (task.type === 'text') {
        handleValidateText();
      }
    },
    [handleValidateTerminal, handleValidateText, ok, task.type],
  );

  return {
    value,
    checked,
    ok,
    wrongAnimKey,
    handleValueChange,
    handleCheckboxToggle,
    handleValidateTerminal,
    handleValidateMcq,
    handleValidateCheckbox,
    handleValidateText,
    handleInputKeyDown,
  };
};


