export type PanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  panelRef: React.RefObject<HTMLElement | null>;
};


