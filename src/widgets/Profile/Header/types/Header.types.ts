export type ProfileHeaderProps = {
  name: string;
  bio: string;
  avatarUrl?: string;
  onOpenEdit: () => void;
  onReset: () => void;
  resetColor: string;
  resetHoverBg: string;
  resetActiveBg: string;
};


