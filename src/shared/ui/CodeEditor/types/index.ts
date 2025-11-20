export type MonacoEditorParams = {
  isReady: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  value: string;
  language: string;
  isDark: boolean;
  isCoarse: boolean;
  enabled: boolean;
  preferNative?: boolean;
  onChange: (next: string) => void;
  inputId: string;
  inputName: string;
  placeholder?: string;
};


