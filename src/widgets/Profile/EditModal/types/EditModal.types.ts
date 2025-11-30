export type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  editName: string;
  editBio: string;
  setEditName: (v: string) => void;
  setEditBio: (v: string) => void;
  onSave: () => void;
  resetColor: string;
  resetHoverBg: string;
  resetActiveBg: string;
  resetHoverBgDark: string;
  resetActiveBgDark: string;
};


