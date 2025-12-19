export type ProfileDraft = {
  name: string;
  bio: string;
};

export const DEFAULT_PROFILE: ProfileDraft = {
  name: 'Пользователь',
  bio: 'Описание',
};

export const RESET_TOAST_ID = 'profile-reset-toast';

