export type CodeEditorProps = {
  value: string;
  onChange: (next: string) => void;
  language?: string;
  height?: number | string;
  placeholder?: string;
  preferNative?: boolean;
  enabled?: boolean;
};


