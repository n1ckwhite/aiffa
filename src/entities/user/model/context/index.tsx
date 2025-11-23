import React from 'react';
import type { UserProfile, WeeklyTask, UserProfileContextValue } from '../types';
import { loadProfileFromStorage, saveProfileToStorage, clearProfileStorage } from '../storage';
import { DEFAULT_PROFILE, PROFILE_COOKIE_KEY } from '../constants';
import {
  updateProfileState,
  resetProfileState,
  markTaskSolvedState,
  setWeeklyTaskState,
  resetWeeklyTasksState,
} from '../actions';

const UserProfileContext = React.createContext<UserProfileContextValue | undefined>(undefined);

type UserProfileProviderProps = React.PropsWithChildren<{
  initialProfile?: UserProfile;
}>;

export const UserProfileProvider: React.FC<UserProfileProviderProps> = ({
  children,
  initialProfile,
}) => {
  const [profile, setProfile] = React.useState<UserProfile>(initialProfile ?? DEFAULT_PROFILE);

  React.useEffect(() => {
    if (initialProfile) return;
    // На клиенте, если нет профиля из куки, подменяем данными из localStorage
    try {
      const stored = loadProfileFromStorage();
      setProfile(stored);
    } catch {
      // игнорируем ошибки чтения и остаёмся на профиле по умолчанию
    }
  }, [initialProfile]);

  React.useEffect(() => {
    saveProfileToStorage(profile);
    try {
      if (typeof document === 'undefined') return;
      const encoded = encodeURIComponent(JSON.stringify(profile));
      document.cookie = `${PROFILE_COOKIE_KEY}=${encoded}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      // игнорируем ошибки записи куки
    }
  }, [profile]);

  const updateProfile = React.useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => updateProfileState(prev, updates));
  }, []);

  const resetProfile = React.useCallback(() => {
    setProfile(resetProfileState());
    clearProfileStorage();
  }, []);

  const markTaskSolved = React.useCallback((moduleId: string, lessonId: string, taskId: string, solved: boolean) => {
    setProfile((prev) => markTaskSolvedState(prev, moduleId, lessonId, taskId, solved));
  }, []);

  const setWeeklyTask = React.useCallback((id: string, updates: Partial<WeeklyTask>) => {
    setProfile((prev) => setWeeklyTaskState(prev, id, updates));
  }, []);

  const resetWeeklyTasks = React.useCallback(() => {
    setProfile((prev) => resetWeeklyTasksState(prev))
  }, []);

  const value = React.useMemo<UserProfileContextValue>(
    () => ({ profile, updateProfile, resetProfile, markTaskSolved, setWeeklyTask, resetWeeklyTasks }),
    [profile, updateProfile, resetProfile, markTaskSolved, setWeeklyTask, resetWeeklyTasks]
  );

  return (
    <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>
  );
};

export function useUserProfile(): UserProfileContextValue {
  const ctx = React.useContext(UserProfileContext);
  if (!ctx) throw new Error('useUserProfile must be used within UserProfileProvider');
  return ctx;
}


