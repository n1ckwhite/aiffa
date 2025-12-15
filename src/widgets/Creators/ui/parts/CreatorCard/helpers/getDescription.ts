import { gratitudeMessagesByMode } from "../data/gratitudeMessages";
import type { CreatorCardMode } from "../types";

export const getDescription = (mode: CreatorCardMode, index: number) => {
  const messages = gratitudeMessagesByMode[mode];
  return messages[index - 1] ?? messages[messages.length - 1];
};


