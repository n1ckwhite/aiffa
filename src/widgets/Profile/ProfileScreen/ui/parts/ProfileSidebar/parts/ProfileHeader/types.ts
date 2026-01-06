export type ProfileBadgeModel = {
  label: string;
  colorScheme: string;
};

export type ProfileHeaderProps = {
  avatarUrl: string;

  name: string;
  bio: string;
  xp: number;
  profileBadge: ProfileBadgeModel;

  isEditing: boolean;
  editSessionId: number;
  editInitial: { name: string; bio: string } | null;
  saveAction: (formData: FormData) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleStopHotkeys: (e: any) => void;
  handleStartEdit: () => void;
};


