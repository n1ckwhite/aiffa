import React from "react";
import { avatarPalettes } from "../data/avatarPalettes";

export const useAvatarPalette = (name: string | undefined) => {
  const avatarIndex = React.useMemo(() => {
    if (!name) return 0;
    const initials = name.trim().slice(0, 2);
    const sum = Array.from(initials).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return sum % avatarPalettes.length;
  }, [name]);

  return { avatarIndex, palette: avatarPalettes[avatarIndex] };
};

