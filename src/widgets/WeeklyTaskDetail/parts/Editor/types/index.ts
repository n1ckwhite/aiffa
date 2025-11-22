export type EditorProps = {
    value: string;
    onChange: (v: string) => void;
    language: string;
    overlay: boolean;
    onStart: () => void;
    toolbarTitle?: string;
    onReady?: () => void;
  };