export const tabIndexByHasTooltip = [undefined, 0] as const;

export const buildFocusVisibleByHasTooltip = (focusRing: string) =>
  [undefined, { outline: "none", boxShadow: focusRing }] as const;


