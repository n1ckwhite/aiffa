import React from 'react';
import type { UserProfile, WeeklyTask, UserProfileContextValue } from '../types';
import { loadProfileFromStorage, saveProfileToStorage, clearProfileStorage } from '../storage';
import {
  updateProfileState,
  resetProfileState,
  markTaskSolvedState,
  setWeeklyTaskState,
  resetWeeklyTasksState,
} from '../actions';

const UserProfileContext = React.createContext<UserProfileContextValue | undefined>(undefined);

export const UserProfileProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [profile, setProfile] = React.useState<UserProfile>(() => {
    return loadProfileFromStorage();
  });

  React.useEffect(() => {
    saveProfileToStorage(profile);
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


